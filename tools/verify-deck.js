#!/usr/bin/env node
/*
 * verify-deck.js — render-free QA linter for the course's pptxgenjs decks.
 *
 * Replaces the LibreOffice "convert to PDF, rasterize, eyeball" loop with a
 * deterministic check that needs no renderer. Because we build the decks
 * ourselves with explicit geometry and known fonts, we can measure text with
 * the *actual* Windows fonts and flag the two defect classes that historically
 * bit us:
 *   - TEXT OVERFLOW — a string that will not fit its box (width or height),
 *   - LOW CONTRAST  — text color too close to the fill *actually* behind it.
 *
 * Contrast resolves z-order: for each text box it finds the topmost filled
 * shape drawn beneath it (card, header band, icon circle) and compares against
 * that, falling back to the slide background — so white-on-a-teal-band reads as
 * white-on-teal, not white-on-the-white-slide. pptxgenjs writes shapes in
 * creation order (= paint order), and virtually every element is a <p:sp>, so
 * array order gives us paint order directly.
 *
 * It parses the .pptx XML, so it works on any deck. Run after every build:
 *     node tools/verify-deck.js canvas_material/lectures/powerpoint/SessionNN-*.pptx
 * Exit code is non-zero when issues are found, so it can gate a build.
 *
 * KNOWN LIMITS (worth an occasional visual pass via render-deck.sh):
 *   - tables (p:graphicFrame) and grouped shapes (p:grpSp) are not geometry-
 *     checked — the historical table-overflow defect still wants human eyes;
 *   - text over a photo (p:pic) with no colored shape behind falls back to the
 *     slide background for contrast;
 *   - overflow height is an estimate (±10% tolerance) — treat flags as "look
 *     here," not gospel.
 *
 * Deps: jszip (bundled via pptxgenjs), fast-xml-parser, opentype.js. Fonts read
 * from /mnt/c/Windows/Fonts (override with WIN_FONTS_DIR).
 */

const fs = require("fs");
const path = require("path");
const JSZip = require("jszip");
const { XMLParser } = require("fast-xml-parser");
const opentype = require("opentype.js");

// ---- units / thresholds -------------------------------------------------
const EMU_PER_PT = 12700;
const LINE_HEIGHT = 1.2;        // rendered line box ≈ 1.2 × font size
const WIDTH_TOL = 0.03;         // a single word wider than the box = real defect
const HEIGHT_TOL = 0.10;        // height is estimated; ignore ≤10% overshoot
const CONTRAST_MIN = 3.0;       // WCAG AA for large text; slides are large text
const DEFAULT_SZ = 18;          // pt, when a run declares no size

// ---- fonts --------------------------------------------------------------
const FONT_DIR = process.env.WIN_FONTS_DIR || "/mnt/c/Windows/Fonts/";
// face|bold|italic -> file. Regular Cambria ships only as cambria.ttc (a
// collection opentype.js can't parse); bold is a safe, slightly-wide proxy.
const FONT_FILES = {
  "cambria|0|0": "cambriab.ttf", "cambria|1|0": "cambriab.ttf",
  "cambria|0|1": "cambriai.ttf", "cambria|1|1": "cambriaz.ttf",
  "calibri|0|0": "calibri.ttf",  "calibri|1|0": "calibrib.ttf",
  "calibri|0|1": "calibrii.ttf", "calibri|1|1": "calibriz.ttf",
};
const DEFAULT_FONT = "calibri.ttf";
const _fontCache = {};
function loadFont(file) {
  if (_fontCache[file]) return _fontCache[file];
  try {
    const buf = fs.readFileSync(path.join(FONT_DIR, file));
    const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    return (_fontCache[file] = opentype.parse(ab));
  } catch (e) {
    if (file !== DEFAULT_FONT) return loadFont(DEFAULT_FONT);
    throw new Error(`Cannot load any font (looked in ${FONT_DIR}): ${e.message}`);
  }
}
function resolveFontFile(face, bold, italic) {
  const key = `${String(face || "calibri").toLowerCase()}|${bold ? 1 : 0}|${italic ? 1 : 0}`;
  return FONT_FILES[key] || DEFAULT_FONT;
}
function advancePt(text, sizePt, face, bold, italic) {
  const font = loadFont(resolveFontFile(face, bold, italic));
  try { return font.getAdvanceWidth(text, sizePt); }
  catch (_) { return text.length * sizePt * 0.5; } // last-ditch average
}

// ---- xml helpers --------------------------------------------------------
const parser = new XMLParser({
  ignoreAttributes: false, attributeNamePrefix: "@_",
  allowBooleanAttributes: true, parseTagValue: false,
  parseAttributeValue: false, trimValues: false,
});
const toArr = (x) => (x == null ? [] : Array.isArray(x) ? x : [x]);
const num = (x, d = 0) => (x == null || x === "" ? d : Number(x));
function textOf(t) { return t == null ? "" : typeof t === "string" ? t : (t["#text"] != null ? String(t["#text"]) : ""); }
function srgb(node) { const v = node && node["a:srgbClr"] && node["a:srgbClr"]["@_val"]; return v ? "#" + v : null; }

// ---- contrast (WCAG) ----------------------------------------------------
function relLum(hex) {
  const c = hex.replace("#", "");
  const ch = [0, 2, 4].map((i) => {
    const v = parseInt(c.substr(i, 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
}
function contrastRatio(a, b) {
  const L1 = relLum(a), L2 = relLum(b), hi = Math.max(L1, L2), lo = Math.min(L1, L2);
  return (hi + 0.05) / (lo + 0.05);
}

// ---- run/paragraph props ------------------------------------------------
const PARA_DFLT = { size: DEFAULT_SZ, bold: false, italic: false, face: "calibri", color: null };
function truthy(v) { return v === "1" || v === 1 || v === "true"; }
function runProps(rPr, dflt) {
  rPr = rPr || {};
  return {
    size: rPr["@_sz"] != null ? num(rPr["@_sz"]) / 100 : dflt.size,
    bold: truthy(rPr["@_b"]) || dflt.bold,
    italic: truthy(rPr["@_i"]) || dflt.italic,
    face: (rPr["a:latin"] && rPr["a:latin"]["@_typeface"]) || dflt.face,
    color: srgb(rPr["a:solidFill"]) || dflt.color,
  };
}

// Estimate rendered height (pt) of paragraphs wrapped to innerWPt, plus the
// widest single unbreakable token (for width-overflow detection).
function measureText(paras, innerWPt) {
  let heightPt = 0, maxTokenPt = 0;
  paras.forEach((p, pIdx) => {
    const pPr = p["a:pPr"] || {};
    const lnPct = pPr["a:lnSpc"] && pPr["a:lnSpc"]["a:spcPct"] ? num(pPr["a:lnSpc"]["a:spcPct"]["@_val"]) / 100000 : 1.0;
    const spcAftPts = pPr["a:spcAft"] && pPr["a:spcAft"]["a:spcPts"] ? num(pPr["a:spcAft"]["a:spcPts"]["@_val"]) / 100 : 0;

    const tokens = [];
    toArr(p["a:r"]).forEach((r) => {
      const pr = runProps(r["a:rPr"], PARA_DFLT);
      textOf(r["a:t"]).split(/\s+/).filter(Boolean).forEach((w) => tokens.push({ w, ...pr }));
    });
    const forcedBreaks = toArr(p["a:br"]).length;

    if (tokens.length === 0) {
      heightPt += DEFAULT_SZ * LINE_HEIGHT * lnPct;
    } else {
      let curW = 0, lineMax = 0;
      tokens.forEach((tok, i) => {
        const wW = advancePt(tok.w, tok.size, tok.face, tok.bold, tok.italic);
        maxTokenPt = Math.max(maxTokenPt, wW);
        const spaceW = curW === 0 ? 0 : advancePt(" ", tok.size, tok.face, tok.bold, tok.italic);
        if (i === 0 || curW + spaceW + wW <= innerWPt) {
          curW += spaceW + wW; lineMax = Math.max(lineMax, tok.size);
        } else {
          heightPt += lineMax * LINE_HEIGHT * lnPct; // close previous line
          curW = wW; lineMax = tok.size;
        }
      });
      heightPt += lineMax * LINE_HEIGHT * lnPct;                // last line
      heightPt += forcedBreaks * lineMax * LINE_HEIGHT * lnPct; // soft breaks
    }
    if (pIdx < paras.length - 1) heightPt += spcAftPts;         // space-after between paras only
  });
  return { heightPt, maxTokenPt };
}

// ---- geometry -----------------------------------------------------------
function bboxOf(sp) {
  const xf = sp["p:spPr"] && sp["p:spPr"]["a:xfrm"];
  const off = xf && xf["a:off"], ext = xf && xf["a:ext"];
  if (!off || !ext) return null;
  return { x: num(off["@_x"]), y: num(off["@_y"]), w: num(ext["@_cx"]), h: num(ext["@_cy"]) };
}
const contains = (b, cx, cy) => b && cx >= b.x && cx <= b.x + b.w && cy >= b.y && cy <= b.y + b.h;

function checkSlide(xml, slideNo, issues) {
  const doc = parser.parse(xml);
  const sld = doc["p:sld"];
  if (!sld) return;
  const cSld = sld["p:cSld"] || {};
  const bgSf = cSld["p:bg"] && cSld["p:bg"]["p:bgPr"] && cSld["p:bg"]["p:bgPr"]["a:solidFill"];
  const slideBg = srgb(bgSf) || null;
  const tree = cSld["p:spTree"] || {};

  // paint-order list of top-level shapes with geometry + fill + text
  const shapes = toArr(tree["p:sp"]).map((sp) => {
    const tx = sp["p:txBody"];
    return {
      b: bboxOf(sp),
      fill: srgb((sp["p:spPr"] || {})["a:solidFill"]),
      paras: toArr(tx && tx["a:p"]),
      bodyPr: (tx && tx["a:bodyPr"]) || {},
    };
  });

  // topmost filled shape painted beneath shape i whose rect holds i's center
  function bgBehind(i) {
    const b = shapes[i].b;
    if (!b) return slideBg;
    const cx = b.x + b.w / 2, cy = b.y + b.h / 2;
    for (let j = i - 1; j >= 0; j--) if (shapes[j].fill && contains(shapes[j].b, cx, cy)) return shapes[j].fill;
    return slideBg;
  }

  shapes.forEach((s, i) => {
    const hasText = s.paras.some((p) => toArr(p["a:r"]).some((r) => textOf(r["a:t"]).trim()));
    if (!hasText) return;
    const label = s.paras.map((p) => toArr(p["a:r"]).map((r) => textOf(r["a:t"])).join("")).join(" ⏎ ").trim().slice(0, 46);
    const bg = s.fill || bgBehind(i);

    // --- contrast (one representative run per paragraph) ---
    for (const p of s.paras) {
      for (const r of toArr(p["a:r"])) {
        if (!textOf(r["a:t"]).trim()) continue;
        const pr = runProps(r["a:rPr"], PARA_DFLT);
        if (pr.color && bg) {
          const ratio = contrastRatio(pr.color, bg);
          if (ratio < CONTRAST_MIN)
            issues.push({ slide: slideNo, type: "CONTRAST",
              detail: `text ${pr.color} on ${bg} = ${ratio.toFixed(2)}:1 (want ≥ ${CONTRAST_MIN})`,
              text: textOf(r["a:t"]).trim().slice(0, 46) });
        }
        break;
      }
    }

    // --- overflow (needs geometry) ---
    if (!s.b) return;
    const bp = s.bodyPr;
    const lIns = bp["@_lIns"] != null ? num(bp["@_lIns"]) : 91440;
    const rIns = bp["@_rIns"] != null ? num(bp["@_rIns"]) : 91440;
    const tIns = bp["@_tIns"] != null ? num(bp["@_tIns"]) : 45720;
    const bIns = bp["@_bIns"] != null ? num(bp["@_bIns"]) : 45720;
    const innerWpt = (s.b.w - lIns - rIns) / EMU_PER_PT;
    const innerHpt = (s.b.h - tIns - bIns) / EMU_PER_PT;
    const noWrap = bp["@_wrap"] === "none";

    const { heightPt, maxTokenPt } = measureText(s.paras, noWrap ? 1e9 : innerWpt);
    if (!noWrap && maxTokenPt > innerWpt * (1 + WIDTH_TOL)) {
      issues.push({ slide: slideNo, type: "OVERFLOW", text: label,
        detail: `a word needs ${maxTokenPt.toFixed(0)}pt but box inner width is ${innerWpt.toFixed(0)}pt` });
    } else if (heightPt > innerHpt * (1 + HEIGHT_TOL)) {
      issues.push({ slide: slideNo, type: "OVERFLOW", text: label,
        detail: `text needs ~${heightPt.toFixed(0)}pt tall but box inner height is ${innerHpt.toFixed(0)}pt` });
    }
  });
}

// ---- api ----------------------------------------------------------------
// Lint one deck; returns { file, slides, issues }. Throws only on unreadable
// input — never calls process.exit, so it's safe to call from a build script.
async function verifyDeck(file) {
  if (!fs.existsSync(file)) throw new Error(`no such file: ${file}`);
  const zip = await JSZip.loadAsync(fs.readFileSync(file));
  const slideNames = Object.keys(zip.files)
    .filter((n) => /^ppt\/slides\/slide\d+\.xml$/.test(n))
    .sort((a, b) => a.match(/(\d+)/)[1] - b.match(/(\d+)/)[1]);
  const issues = [];
  for (const name of slideNames) {
    const no = Number(name.match(/(\d+)/)[1]);
    checkSlide(await zip.file(name).async("string"), no, issues);
  }
  return { file, slides: slideNames.length, issues };
}

// Human-readable report for a verifyDeck() result.
function reportText(res) {
  const base = path.basename(res.file);
  if (res.issues.length === 0)
    return `✓ ${base}: ${res.slides} slides, no overflow or low-contrast issues found.`;
  const lines = [`✗ ${base}: ${res.issues.length} issue(s) across ${res.slides} slides:`, ""];
  [...res.issues].sort((a, b) => a.slide - b.slide || a.type.localeCompare(b.type)).forEach((it) => {
    lines.push(`  slide ${String(it.slide).padStart(2)} · ${it.type.padEnd(8)} · ${it.detail}`);
    if (it.text) lines.push(`           “${it.text}”`);
  });
  lines.push("", `Review in PowerPoint (or run tools/render-deck.sh for images). ` +
    `Height overflow is estimated (±${Math.round(HEIGHT_TOL * 100)}%); tables & grouped shapes aren't geometry-checked.`);
  return lines.join("\n");
}

module.exports = { verifyDeck, reportText };

// ---- cli ----------------------------------------------------------------
async function main() {
  const args = process.argv.slice(2);
  const asJson = args.includes("--json");
  const file = args.find((a) => !a.startsWith("--"));
  if (!file) { console.error("usage: node verify-deck.js <deck.pptx> [--json]"); process.exit(2); }
  let res;
  try { res = await verifyDeck(file); }
  catch (e) { console.error(e.message); process.exit(2); }
  console.log(asJson ? JSON.stringify(res, null, 2) : reportText(res));
  process.exit(res.issues.length ? 1 : 0);
}
if (require.main === module) main().catch((e) => { console.error(e); process.exit(2); });
