const path = require("path");
const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const FA = require("react-icons/fa");

const C = {
  navy: "14233A", navy2: "1E3352", teal: "12908F", tealDk: "0E6E6D",
  amber: "E8A33D", coral: "D9614C", green: "3E9C6B",
  ink: "1E2A36", slate: "5F7284", cardBg: "F2F6F8", ice: "E4EEF1", white: "FFFFFF",
  weakBg: "FBECE8", strongBg: "EAF4EE", amberBg: "FBEEDA"
};
const F = { head: "Cambria", body: "Calibri" };

const iconCache = {};
async function ic(Comp, color) {
  const key = (Comp.displayName || Comp.name || "i") + color;
  if (iconCache[key]) return iconCache[key];
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(Comp, { color: "#" + color, size: "256" }));
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  const d = "image/png;base64," + png.toString("base64");
  iconCache[key] = d; return d;
}
const mkShadow = () => ({ type: "outer", color: "000000", blur: 7, offset: 3, angle: 90, opacity: 0.13 });

// Two decks come out of this one source:
//
//   Session12-ArchitectureWorkshop.pptx          PUBLISHED to Canvas. Stops at
//     Monday's version of each worked-example diagram and carries no presenter
//     notes, so nothing in it answers the Session 11 dissection.
//   Session12-ArchitectureWorkshop-inclass.pptx  The full deck, for teaching off
//     this machine. Upload it over the published one after class if you want
//     students to have the corrected diagrams.
//
// PRECLASS is what separates them; keep any new spoiler behind it.
let PRECLASS = false;
let pres, PAGE;
function newDeck() {
  pres = new pptxgen();
  pres.defineLayout({ name: "W", width: 13.3, height: 7.5 });
  pres.layout = "W"; pres.author = "CS 301R";
  pres.title = "CS 301R — Session 12 — Architecture & Data-Flow Workshop";
  PAGE = 0;
}
function mk() { PAGE++; return pres.addSlide(); }
// Presenter notes are instructor material and several of them name what the
// Session 11 sample gets wrong, so the published deck ships without any.
function speaker(slide, text) { if (!PRECLASS) slide.addNotes(text); }
// Captions and asides that point at what the sample gets wrong: pointed in
// class, neutral in the published deck. The picture itself gives nothing away.
const ed = (pointed, neutral) => (PRECLASS ? neutral : pointed);
function footer(slide, col) {
  const c = col || C.slate;
  slide.addText("CS 301R · Session 12 · Architecture Workshop", { x: 7.3, y: 7.04, w: 5.4, h: 0.3, align: "right", color: c, fontFace: F.body, fontSize: 10, margin: 0 });
  slide.addText(String(PAGE), { x: 0.6, y: 7.04, w: 0.6, h: 0.3, color: c, fontFace: F.body, fontSize: 10, margin: 0 });
}
function header(slide, kicker, title, titleColor) {
  slide.addShape(pres.shapes.OVAL, { x: 0.62, y: 0.55, w: 0.15, h: 0.15, fill: { color: C.amber } });
  slide.addText(kicker.toUpperCase(), { x: 0.87, y: 0.44, w: 11.5, h: 0.34, color: C.teal, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  slide.addText(title, { x: 0.6, y: 0.82, w: 12.1, h: 1.0, color: titleColor || C.ink, fontFace: F.head, fontSize: 31, bold: true, margin: 0, valign: "top" });
}
// `extra` passes pptxgenjs options through — e.g. REVEAL(1) to animate the shape in on a click.
function card(slide, x, y, w, h, fill, extra) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: fill || C.cardBg }, line: { type: "none" }, rectRadius: 0.09, shadow: mkShadow(), ...extra });
}
async function iconCircle(slide, Comp, x, y, d, circleColor, iconColor, extra) {
  slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: circleColor }, ...extra });
  const pad = d * 0.27;
  slide.addImage({ data: await ic(Comp, iconColor || "FFFFFF"), x: x + pad, y: y + pad, w: d - 2 * pad, h: d - 2 * pad, ...extra });
}
// Click-to-reveal: every shape given REVEAL(n) appears together on click n (tools/add-animations.js).
const REVEAL = (n, effect) => ({ objectName: effect ? `click-${n}:${effect}` : `click-${n}` });

function darkHeader(s, kicker, title) {
  s.addShape(pres.shapes.OVAL, { x: 11.4, y: -1.3, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  s.addShape(pres.shapes.OVAL, { x: 0.62, y: 0.6, w: 0.15, h: 0.15, fill: { color: C.amber } });
  s.addText(kicker.toUpperCase(), { x: 0.87, y: 0.5, w: 11.5, h: 0.34, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText(title, { x: 0.6, y: 0.9, w: 12.1, h: 0.8, color: C.white, fontFace: F.head, fontSize: 32, bold: true, margin: 0 });
}

// The vocabulary slide for a round: light, roomy, one card per term. 3 across, 4 in a 2x2, 5 stacked.
async function wordsSlide(kicker, title, terms, closer) {
  const s = mk(); s.background = { color: C.white };
  header(s, kicker, title);
  if (terms.length === 3) {
    for (let i = 0; i < 3; i++) {
      const x = 0.6 + i * 4.1, w = 3.9;
      card(s, x, 2.0, w, 3.95, C.cardBg);
      await iconCircle(s, terms[i][0], x + (w - 0.76) / 2, 2.42, 0.76, C.teal);
      s.addText(terms[i][1], { x: x + 0.2, y: 3.45, w: w - 0.4, h: 0.58, color: C.ink, fontFace: F.body, fontSize: 19.5, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(terms[i][2], { x: x + 0.24, y: 4.12, w: w - 0.48, h: 1.7, color: C.slate, fontFace: F.body, fontSize: 16, align: "center", valign: "top", margin: 0, lineSpacingMultiple: 1.05 });
    }
  } else if (terms.length === 4) {
    for (let i = 0; i < 4; i++) {
      const col = i % 2, row = Math.floor(i / 2);
      const x = 0.6 + col * 6.15, y = 1.98 + row * 2.36;
      card(s, x, y, 5.95, 2.18, C.cardBg);
      await iconCircle(s, terms[i][0], x + 0.3, y + 0.3, 0.66, C.teal);
      s.addText(terms[i][1], { x: x + 1.18, y: y + 0.3, w: 4.5, h: 0.66, color: C.ink, fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0 });
      s.addText(terms[i][2], { x: x + 0.34, y: y + 1.12, w: 5.28, h: 1.0, color: C.slate, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0, lineSpacingMultiple: 1.05 });
    }
  } else {
    for (let i = 0; i < terms.length; i++) {
      const y = 1.9 + i * 0.93;
      card(s, 0.6, y, 12.1, 0.82, C.cardBg);
      await iconCircle(s, terms[i][0], 0.9, y + 0.11, 0.6, C.teal);
      s.addText(terms[i][1], { x: 1.68, y, w: 3.7, h: 0.82, color: C.ink, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
      s.addText(terms[i][2], { x: 5.5, y, w: 6.95, h: 0.82, color: C.slate, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
    }
  }
  if (closer) {
    const cy = terms.length === 3 ? 6.3 : terms.length >= 5 ? 6.56 : 6.6;
    s.addText(closer, { x: 0.6, y: cy, w: 12.1, h: 0.36, color: C.tealDk, fontFace: F.body, fontSize: 15.5, bold: true, align: "center", margin: 0 });
  }
  footer(s);
  return s;
}

// The working slide for a round: dark, the task in amber, then the forcing questions. Stays up.
async function goSlide(kicker, title, task, asks, strip) {
  const s = mk(); s.background = { color: C.navy };
  darkHeader(s, kicker, title);
  card(s, 0.6, 1.75, 12.1, 0.95, C.amber);
  s.addText(task, { x: 0.98, y: 1.75, w: 11.35, h: 0.95, color: C.navy, fontFace: F.body, fontSize: 17, bold: true, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  const n = asks.length, top = 3.0, bottom = 6.3, gap = 0.14;
  const h = (bottom - top - gap * (n - 1)) / n;
  for (let i = 0; i < n; i++) {
    const y = top + i * (h + gap);
    card(s, 0.6, y, 12.1, h, C.navy2);
    const d = Math.min(0.52, h - 0.18);
    s.addShape(pres.shapes.OVAL, { x: 0.92, y: y + (h - d) / 2, w: d, h: d, fill: { color: C.amber } });
    s.addText(String(i + 1), { x: 0.92, y: y + (h - d) / 2, w: d, h: d, color: C.navy, fontFace: F.head, fontSize: 19, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(asks[i], { x: 1.64, y, w: 10.8, h, color: C.white, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  }
  card(s, 0.6, 6.42, 12.1, 0.64, C.ice);
  s.addText(strip, { x: 0.95, y: 6.42, w: 11.4, h: 0.64, color: C.navy, fontFace: F.body, fontSize: 15, bold: true, valign: "middle", margin: 0 });
  footer(s, "7E92A8");
  return s;
}

// A worked-example diagram, shown against what Monday's sample actually had.
// The "before" is drawn first; one click drops an opaque cover over it and the
// corrected drawing appears in its place. Two of the four sample sections had
// diagrams to be wrong; the other two were prose, so the prose is the "before".
const DIAG = path.join(__dirname, "..", "canvas_material", "resources", "img");
const BOX = { x: 0.5, y: 1.22, w: 12.3, h: 5.66 };

function fit(natW, natH, box) {
  const sc = Math.min(box.w / natW, box.h / natH);
  const w = natW * sc, h = natH * sc;
  return { x: box.x + (box.w - w) / 2, y: box.y + (box.h - h) / 2, w, h };
}
function capStrip(s, text, color, bg, extra) {
  card(s, 0.5, 0.74, 12.3, 0.4, bg, extra);
  s.addText(text, { x: 0.8, y: 0.74, w: 11.7, h: 0.4, color, fontFace: F.body, fontSize: 14, bold: true, valign: "middle", margin: 0, ...(extra || {}) });
}
async function beforeAfterSlide(kicker, heading, before, after, notes) {
  const sl = mk(); sl.background = { color: C.white };
  sl.addShape(pres.shapes.OVAL, { x: 0.62, y: 0.42, w: 0.13, h: 0.13, fill: { color: C.amber } });
  sl.addText(kicker.toUpperCase(), { x: 0.84, y: 0.32, w: 6.0, h: 0.3, color: C.teal, fontFace: F.body, fontSize: 13.5, bold: true, charSpacing: 2, margin: 0 });
  sl.addText(heading, { x: 6.6, y: 0.3, w: 6.1, h: 0.34, color: C.slate, fontFace: F.body, fontSize: 14, italic: true, align: "right", margin: 0 });

  capStrip(sl, before.caption, C.coral, C.weakBg);
  if (before.file) {
    const f = fit(before.w, before.h, BOX);
    sl.addImage({ path: path.join(DIAG, before.file), ...f });
  } else {
    await before.draw(sl);
  }

  // The click: an opaque plate over everything above, then the corrected drawing.
  // The PNG render pass only ever shows the revealed state, so rendering the
  // published deck is also how you eyeball what is on screen pre-click.
  if (!PRECLASS) {
    sl.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 0.7, w: 12.7, h: 6.26, fill: { color: C.white }, line: { type: "none" }, ...REVEAL(1) });
    capStrip(sl, after.caption, C.tealDk, C.strongBg, REVEAL(1));
    const fa = fit(after.w, after.h, BOX);
    sl.addImage({ path: path.join(DIAG, after.file), ...fa, ...REVEAL(1) });
  }

  footer(sl);
  speaker(sl, notes);
  return sl;
}

async function build(preclass, out) {
  PRECLASS = preclass;
  newDeck();
  let s;

  // 1 Title
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: 10.9, y: -1.4, w: 4.2, h: 4.2, fill: { color: "1C3252" } });
  s.addShape(pres.shapes.OVAL, { x: 12.0, y: 5.1, w: 3.0, h: 3.0, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaProjectDiagram, 0.9, 1.45, 1.0, C.amber, C.navy);
  s.addText("CS 301R · SOFTWARE ENGINEERING STUDIO I", { x: 0.92, y: 2.75, w: 11, h: 0.35, color: "9FB4C7", fontFace: F.body, fontSize: 15, bold: true, charSpacing: 2, margin: 0 });
  s.addText("Draw the System", { x: 0.9, y: 3.15, w: 12.1, h: 1.3, color: C.white, fontFace: F.head, fontSize: 42, bold: true, margin: 0 });
  s.addText([
    { text: "Session 12 — architecture & data-flow workshop", options: { color: C.amber, bold: true, breakLine: true } },
    { text: "Wednesday, October 14, 2026", options: { color: "9FB4C7" } }
  ], { x: 0.92, y: 4.7, w: 11, h: 0.9, fontFace: F.body, fontSize: 19, margin: 0, lineSpacingMultiple: 1.2 });
  speaker(s, "A working session: roughly eight minutes of framing, then fifty-seven of teams at whiteboards with you circulating as design reviewer. Each round has two slides — the vocabulary, which you walk in under a minute, and the task, which stays on screen for the whole round so a stuck team can read the wall instead of waiting for you. Before class: boards or big paper per team, markers including red for the failure trace, the Design Document Template on screen, and the Backstage diagrams ready to draw. Plan the circulation route.");

  // 2 What a design document is, and what today produces
  s = mk(); s.background = { color: C.white };
  header(s, "Before we start", "The design document — and what today produces");
  card(s, 0.6, 2.0, 5.95, 3.5, C.navy);
  await iconCircle(s, FA.FaDraftingCompass, 0.95, 2.3, 0.68, C.amber, C.navy);
  s.addText("What it is", { x: 1.8, y: 2.3, w: 4.5, h: 0.68, color: C.white, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "Decides how you'll build it — and why this how", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 9 } },
    { text: "Written for a builder: your teammates, and the contributor who joins in January", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 9 } },
    { text: "Three to six pages plus diagrams, on the course template", options: { bullet: { indent: 16 } } }
  ], { x: 1.0, y: 3.22, w: 5.35, h: 2.1, color: "CFE0E9", fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0 });
  card(s, 6.75, 2.0, 5.95, 3.5, C.cardBg);
  await iconCircle(s, FA.FaMarker, 7.1, 2.3, 0.68, C.teal);
  s.addText("What you leave with", { x: 7.95, y: 2.3, w: 4.5, h: 0.68, color: C.ink, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "A system-context diagram and a component diagram", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 9 } },
    { text: "One core flow traced end to end — and traced again when it breaks", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 9 } },
    { text: "A first-cut data model, and two decisions argued against real alternatives", options: { bullet: { indent: 16 } } }
  ], { x: 7.15, y: 3.22, w: 5.35, h: 2.1, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0 });
  card(s, 0.6, 5.75, 12.1, 1.05, C.amber);
  s.addText("Monday you read a design document and took one apart. Today you build the hard 80% of yours, on a whiteboard, in 57 minutes.", { x: 0.95, y: 5.75, w: 11.4, h: 1.05, color: C.navy, fontFace: F.body, fontSize: 16.5, bold: true, align: "center", valign: "middle", margin: 0 });
  footer(s);
  speaker(s, "Ninety seconds of orientation before anything else, because this is the first working session of the unit and half the room will not have the shape of the deliverable in their head. Recall rather than re-teach: they read Design Docs at Google and dissected the Backstage sample on Monday, so ask rather than tell \u2014 who is the audience for a design doc? The right-hand card is the promise for the period, and it is worth reading aloud item by item, because it tells them what \u201cdone\u201d looks like at 10:45. Then the amber band, which sets the pace expectation honestly.");

  // 2 You have drawn all of this before
  s = mk(); s.background = { color: C.white };
  header(s, "Where today comes from", "You have drawn every one of these before");
  card(s, 0.6, 2.05, 5.95, 3.15, C.cardBg);
  await iconCircle(s, FA.FaChessKnight, 0.95, 2.35, 0.68, C.teal);
  s.addText("CS 240 · chess", { x: 1.8, y: 2.35, w: 4.5, h: 0.68, color: C.ink, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "Seven sequence diagrams, one per endpoint", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 10 } },
    { text: "Server → Handlers → Services → DAOs → Database", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 10 } },
    { text: "ERDs — entities, primary and foreign keys, one-to-many and many-to-many", options: { bullet: { indent: 16 } } }
  ], { x: 1.0, y: 3.28, w: 5.35, h: 1.75, color: C.ink, fontFace: F.body, fontSize: 16, valign: "top", margin: 0 });
  card(s, 6.75, 2.05, 5.95, 3.15, C.cardBg);
  await iconCircle(s, FA.FaCloud, 7.1, 2.35, 0.68, C.teal);
  s.addText("CS 340 · Tweeter", { x: 7.95, y: 2.35, w: 4.5, h: 0.68, color: C.ink, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "UML class and sequence diagrams", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 10 } },
    { text: "Clean Architecture — layers, the dependency rule", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 10 } },
    { text: "Patterns, and the trade-offs behind them", options: { bullet: { indent: 16 } } }
  ], { x: 7.15, y: 3.28, w: 5.35, h: 1.75, color: C.ink, fontFace: F.body, fontSize: 16, valign: "top", margin: 0 });
  card(s, 0.6, 5.5, 12.1, 1.25, C.navy, REVEAL(1));
  s.addText([
    { text: "Both times, the architecture arrived with the assignment.\n", options: { color: "CFE0E9" } },
    { text: "What you have never done is decide what goes in the boxes.", options: { color: C.amber, bold: true } }
  ], { x: 0.98, y: 5.5, w: 11.35, h: 1.25, fontFace: F.body, fontSize: 17.5, align: "center", valign: "middle", margin: 0, lineSpacingMultiple: 1.06, ...REVEAL(1) });
  footer(s);
  speaker(s, "Ninety seconds, and it is the most useful thing you say all period. Name both courses out loud — the room is carrying far more than it thinks it is, and telling them so buys both confidence and speed. Then click the band. If the room is awake, ask it as a question first: who decided that chess needed Handlers, Services and DAOs? The answer is that the assignment did, and the same is true of AWS in Tweeter. That is the gap this whole session is aimed at.");

  // 3 One level up
  s = mk(); s.background = { color: C.white };
  header(s, "The one adjustment", "Everything today is one level up");
  card(s, 0.6, 2.0, 5.95, 3.4, C.cardBg);
  await iconCircle(s, FA.FaCode, 0.95, 2.3, 0.68, C.slate);
  s.addText("What you're used to", { x: 1.8, y: 2.3, w: 4.5, h: 0.68, color: C.ink, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
  s.addText("Class-level. Objects, methods, lifelines, inheritance. The inside of one program.", { x: 1.0, y: 3.25, w: 5.35, h: 1.15, color: C.slate, fontFace: F.body, fontSize: 16, valign: "top", margin: 0, lineSpacingMultiple: 1.05 });
  s.addText("ChessBoard · ChessPiece · UserDAO", { x: 1.0, y: 4.5, w: 5.35, h: 0.7, color: C.tealDk, fontFace: F.body, fontSize: 15.5, italic: true, valign: "top", margin: 0 });
  card(s, 6.75, 2.0, 5.95, 3.4, C.navy);
  await iconCircle(s, FA.FaNetworkWired, 7.1, 2.3, 0.68, C.amber, C.navy);
  s.addText("What today is", { x: 7.95, y: 2.3, w: 4.5, h: 0.68, color: C.white, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
  s.addText("System-level. Components, stores, services, boundaries. How whole pieces fit together.", { x: 7.15, y: 3.25, w: 5.35, h: 1.15, color: "CFE0E9", fontFace: F.body, fontSize: 16, valign: "top", margin: 0, lineSpacingMultiple: 1.05 });
  s.addText("the catalog · the photo store · the theater's wifi", { x: 7.15, y: 4.5, w: 5.35, h: 0.7, color: C.amber, fontFace: F.body, fontSize: 15.5, italic: true, valign: "top", margin: 0 });
  card(s, 0.6, 5.7, 12.1, 1.05, C.amberBg);
  await iconCircle(s, FA.FaLayerGroup, 0.95, 5.93, 0.58, C.amber, C.navy);
  s.addText("Same notation instincts, one level up. If a box on your board has a method list, you dropped a level.", { x: 1.82, y: 5.7, w: 10.6, h: 1.05, color: C.ink, fontFace: F.body, fontSize: 16.5, bold: true, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  footer(s);
  speaker(s, "Ninety seconds, and it prevents half of what you would otherwise spend the period correcting — they will reflexively draw class diagrams, because that is what both prior courses rewarded. The examples on each side are doing real work, so read them out: ChessBoard and UserDAO are things inside a program, while the catalog and the theater's wifi are things the system is made of or depends on. Keep the closing line in your pocket and reuse it verbatim while circulating; it is a fast, non-judgmental correction.");

  // 4 The plan
  s = mk(); s.background = { color: C.white };
  header(s, "The plan", "Five rounds — and the draft writes itself tonight");
  const seq = [
    [FA.FaVectorSquare, "1 · System context", "§3", "10 min"],
    [FA.FaCubes, "2 · Components & interfaces", "§4", "15 min"],
    [FA.FaRoute, "3 · Trace one core flow", "§4", "12 min"],
    [FA.FaDatabase, "4 · Data model, first cut", "§5", "10 min"],
    [FA.FaBalanceScale, "5 · Decisions & alternatives", "§6", "10 min"]
  ];
  for (let i = 0; i < seq.length; i++) {
    const y = 2.0 + i * 0.86;
    card(s, 0.6, y, 12.1, 0.74, C.cardBg);
    await iconCircle(s, seq[i][0], 0.88, y + 0.07, 0.6, C.teal);
    s.addText(seq[i][1], { x: 1.68, y, w: 6.0, h: 0.74, color: C.ink, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
    s.addText("Template " + seq[i][2], { x: 7.8, y, w: 2.6, h: 0.74, color: C.tealDk, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0 });
    s.addText(seq[i][3], { x: 10.5, y, w: 1.9, h: 0.74, color: C.slate, fontFace: F.body, fontSize: 15.5, bold: true, align: "right", valign: "middle", margin: 0 });
  }
  card(s, 0.6, 6.35, 12.1, 0.62, C.navy);
  s.addText("Each round fills a numbered section of the template, in order. Tonight is transcription, not composition.", { x: 0.95, y: 6.35, w: 11.4, h: 0.62, color: C.white, fontFace: F.body, fontSize: 15.5, bold: true, align: "center", valign: "middle", margin: 0 });
  footer(s);
  speaker(s, "One minute. Walk the five rounds and point at the template column — that mapping is the reason the draft is due tomorrow rather than next week. Do not explain the rounds here; each has its own pair of slides. The line at the bottom is the promise worth making explicitly, because students hear whiteboard workshop and assume a second night of writing is coming.");

  // 5 The two rules
  s = mk(); s.background = { color: C.white };
  header(s, "Two rules for the room", "They apply to every board, every round");
  card(s, 0.6, 2.0, 12.1, 1.95, C.navy);
  await iconCircle(s, FA.FaCubes, 0.98, 2.4, 0.72, C.amber, C.navy);
  s.addText("Every box has a job.", { x: 2.0, y: 2.25, w: 10.4, h: 0.6, color: C.amber, fontFace: F.body, fontSize: 21, bold: true, valign: "middle", margin: 0 });
  s.addText("Written on the box, in one sentence. If the sentence needs an \"and,\" that's two boxes.", { x: 2.0, y: 2.95, w: 10.4, h: 0.85, color: "CFE0E9", fontFace: F.body, fontSize: 16.5, valign: "top", margin: 0, lineSpacingMultiple: 1.04 });
  card(s, 0.6, 4.15, 12.1, 1.95, C.navy);
  await iconCircle(s, FA.FaArrowsAltH, 0.98, 4.55, 0.72, C.amber, C.navy);
  s.addText("Every arrow carries something nameable.", { x: 2.0, y: 4.4, w: 10.4, h: 0.6, color: C.amber, fontFace: F.body, fontSize: 21, bold: true, valign: "middle", margin: 0 });
  s.addText("If you can't label it, you haven't found a drawing problem — you've found a design question.", { x: 2.0, y: 5.1, w: 10.4, h: 0.85, color: "CFE0E9", fontFace: F.body, fontSize: 16.5, valign: "top", margin: 0, lineSpacingMultiple: 1.04 });
  card(s, 0.6, 6.3, 12.1, 0.66, C.amberBg);
  s.addText("Marker on a board. Not a diagramming tool, not UML syntax — nothing gets typed until it gets photographed.", { x: 0.95, y: 6.3, w: 11.4, h: 0.66, color: C.ink, fontFace: F.body, fontSize: 15.5, bold: true, align: "center", valign: "middle", margin: 0 });
  footer(s);
  speaker(s, "One minute, and then repeat rule two all period — it is the single most productive sentence you can say to a stuck team, because an unlabelable arrow is the cheapest design question they will ever find. The fidelity line at the bottom matters as much: say explicitly that this is not the polished artifact they exported from sequencediagram.org for CS 240 Phase 2, and that anything they try to make pretty in a tool today is time stolen from the thinking.");

  // 6 The target
  s = mk(); s.background = { color: C.white };
  header(s, "The target", PRECLASS ? "Backstage — the costume catalog from the sample proposals" : "Backstage — the doc you took apart on Monday");
  card(s, 0.6, 2.0, 12.1, 1.1, C.navy);
  await iconCircle(s, FA.FaSearchPlus, 0.95, 2.24, 0.62, C.amber, C.navy);
  s.addText(PRECLASS ? "We work from one project all session — the costume catalog whose design document you dissect on Monday. You already know the domain, so none of today goes on learning it." : "Monday you found what was wrong with these diagrams. Here they are drawn right — at exactly the fidelity you're about to work at.", { x: 1.85, y: 2.0, w: 10.6, h: 1.1, color: C.white, fontFace: F.body, fontSize: 16.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  const fixes = PRECLASS ? [
    [FA.FaSearchPlus, C.teal, C.cardBg, "Same project, start to finish", "The same costume catalog you met in the Session 7 sample proposals and take apart again on Monday. Working from a project you already know means no minute of the workshop goes on learning a new domain."],
    [FA.FaMarker, C.teal, C.cardBg, "Monday's version, and then the fix", "In class you'll see each of its diagrams the way that team actually drew them — and then the version that answers what you found wrong with it."]
  ] : [
    [FA.FaExclamationTriangle, C.coral, C.weakBg, "The diagrams disagreed with the prose", "An email notifier appeared in the picture and nowhere else — and notifications were out of the MVP. Now the picture and the component table say the same thing."],
    [FA.FaBolt, C.amber, C.amberBg, "The failure case was one hand-waved sentence", "The spike proved uploads fail on the shop's wifi, then the trace assumed every request succeeds. Now there's a red trace, and the user keeps their work."]
  ];
  for (let i = 0; i < fixes.length; i++) {
    const y = 3.35 + i * 1.78;
    card(s, 0.6, y, 12.1, 1.6, fixes[i][2]);
    await iconCircle(s, fixes[i][0], 0.95, y + 0.5, 0.62, fixes[i][1], i === 0 ? "FFFFFF" : C.navy);
    s.addText(fixes[i][3], { x: 1.85, y: y + 0.16, w: 10.55, h: 0.52, color: C.ink, fontFace: F.body, fontSize: 18.5, bold: true, valign: "middle", margin: 0 });
    s.addText(fixes[i][4], { x: 1.85, y: y + 0.72, w: 10.55, h: 0.78, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0, lineSpacingMultiple: 1.04 });
  }
  footer(s);
  speaker(s, "Three minutes, and the point is speed — show, do not discuss. Draw or display the four Backstage diagrams in sequence so the room sees the target shape before it starts: one box with things around it, the box opened into components, a numbered trace, then entities. Reusing Monday's domain is deliberate; nobody spends a second learning what a costume catalog is. The two cards are planted defects from the sample, now fixed, and naming them here means teams recognize the same smell on their own boards twenty minutes from now.");

  // 8-11 The worked example: Monday's version, then the same thing drawn right
  await beforeAfterSlide("The target \u00b7 round 1", "System context",
    { caption: "Monday's sample, \u00a73 \u2014 the diagram as the team drew it", file: "backstage-context-flawed.png", w: 980, h: 500 },
    { caption: "Drawn right", file: "backstage-context.png", w: 1360, h: 545 },
    "Hold the first picture long enough for the room to re-find what they caught on Monday, and take one answer out loud before you click \u2014 the Actor and the overdue reminder email, which appear here and in no other part of the document, for a feature the proposal put out of scope. Then click. Two things changed: the notifier is gone, and every arrow now carries a noun. Save the sharper point for after the click, because it is the one that transfers: an actor never touches this system at all. A volunteer checks an item out on their behalf, so Actor is data the system stores, not a user standing outside the box. That distinction is what teams get wrong in round 1.");
  await beforeAfterSlide("The target \u00b7 round 2", "Components and interfaces",
    { caption: ed("Monday's sample, \u00a74 \u2014 six boxes, no labels, an Email notifier, no Auth", "Monday's sample, \u00a74 \u2014 the component diagram as that team drew it"), file: "backstage-components-flawed.png", w: 900, h: 430 },
    { caption: "Drawn right", file: "backstage-components.png", w: 1160, h: 650 },
    "Before clicking, name what the first picture does not tell you: not one arrow is labelled, so you cannot tell what crosses between any two boxes; Auth is in the component table but missing from the drawing; the Email notifier is in the drawing but in no table. After the click, point at Checkout specifically. In the sample it said \u201chandles check-outs\u201d with an interface of TBD, and it was the one component nobody could have built from. Here it owns checkout records, enforces one open checkout per item, handles returns and computes overdue. That is what a one-line job looks like when it is doing its work.");
  await beforeAfterSlide("The target \u00b7 round 3", "One core flow, traced \u2014 and broken",
    { caption: ed("Monday's sample, \u00a74 \u2014 there was no diagram. This was the whole thing.", "Monday's sample, \u00a74 \u2014 the core-flow section, in full"), draw: async (sl) => {
        card(sl, 0.9, 1.35, 11.5, 3.05, C.cardBg);
        sl.addText("Core flow, traced end to end: a volunteer checks out a costume", { x: 1.25, y: 1.5, w: 10.8, h: 0.4, color: C.ink, fontFace: F.body, fontSize: 16, bold: true, italic: true, margin: 0 });
        const NUM = { type: "number", indent: 22 };
        sl.addText([
          { text: "The volunteer searches \u201cbustle\u201d in the Web UI.", options: { bullet: NUM, breakLine: true, paraSpaceAfter: 5 } },
          { text: "Catalog queries the database and returns matching items with photos and bin locations.", options: { bullet: NUM, breakLine: true, paraSpaceAfter: 5 } },
          { text: "The volunteer opens an item and taps Check out, choosing the actor and show from lists and a due date.", options: { bullet: NUM, breakLine: true, paraSpaceAfter: 5 } },
          { text: "Checkout writes a checkout record and marks the item as out.", options: { bullet: NUM, breakLine: true, paraSpaceAfter: 5 } },
          { text: "The Web UI shows the item as out, with the actor's name and due date.", options: { bullet: NUM } }
        ], { x: 1.25, y: 1.98, w: 10.8, h: 2.3, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0 });
        card(sl, 0.9, 4.62, 11.5, 1.5, C.weakBg);
        sl.addText("The failure case", { x: 1.25, y: 4.78, w: 10.8, h: 0.4, color: C.coral, fontFace: F.body, fontSize: 16, bold: true, italic: true, margin: 0 });
        sl.addText("\u201cIf a request fails, the user sees an error message and can try again.\u201d", { x: 1.25, y: 5.25, w: 10.8, h: 0.5, color: C.ink, fontFace: F.body, fontSize: 16.5, margin: 0 });
        sl.addText(ed("That is the entire section.", " "), { x: 1.25, y: 5.68, w: 10.8, h: 0.34, color: C.slate, fontFace: F.body, fontSize: 14, italic: true, margin: 0 });
      } },
    { caption: "Drawn right", file: "backstage-flow.png", w: 1200, h: 730 },
    "The before here is prose, not a bad picture \u2014 the sample had no flow diagram at all, which is itself worth naming. Read step 4 aloud and ask what it assumes. Then read the failure case, the whole of it, and let the room sit with how little it says. Now click. It is a sequence diagram and they should recognise it instantly from CS 240 Phase 2 \u2014 say so, because that recognition is worth six minutes of instruction. Then the half below the line: the write never arrives, the form keeps what was typed, and the item is never shown as out unless the server confirmed it. The red half is not optional; it is a graded criterion on the Design Document.");
  await beforeAfterSlide("The target \u00b7 round 4", "Data model, first cut",
    { caption: ed("Monday's sample, \u00a75 \u2014 the entity table was fine, and then it kept going", "Monday's sample, \u00a75 \u2014 the data-model section, in full"), draw: async (sl) => {
        card(sl, 0.9, 1.35, 11.5, 0.78, C.strongBg);
        sl.addText("Entity table: Item \u00b7 Bin \u00b7 Show \u00b7 Person \u00b7 Checkout \u00b7 PullList \u2014 key fields, relationships, MVP or roadmap." + ed(" Good.", ""), { x: 1.25, y: 1.35, w: 10.8, h: 0.78, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0 });
        card(sl, 0.9, 2.3, 11.5, 2.35, C.cardBg);
        sl.addText("\u201cThe Item table in full:\u201d", { x: 1.25, y: 2.42, w: 10.8, h: 0.36, color: C.coral, fontFace: F.body, fontSize: 15, bold: true, italic: true, margin: 0 });
        sl.addText([
          { text: "id           bigint          no    auto        primary key", options: { breakLine: true } },
          { text: "name         varchar(120)    no    \u2014           indexed", options: { breakLine: true } },
          { text: "category     varchar(40)     no    'costume'   choices in constants.py", options: { breakLine: true } },
          { text: "size_label   varchar(20)     yes   NULL        free text", options: { breakLine: true } },
          { text: "chest_in     numeric(5,2)    yes   NULL", options: { breakLine: true } },
          { text: ed("\u2026 and seven more rows, every one of them stale within a week", "\u2026 and seven more rows"), options: {} }
        ], { x: 1.3, y: 2.82, w: 10.7, h: 1.7, color: C.slate, fontFace: "Consolas", fontSize: 12.5, valign: "top", margin: 0, lineSpacingMultiple: 1.06 });
        card(sl, 0.9, 4.82, 11.5, 1.55, C.cardBg);
        sl.addText("\u201cSearch, as implemented:\u201d", { x: 1.25, y: 4.92, w: 10.8, h: 0.36, color: C.coral, fontFace: F.body, fontSize: 15, bold: true, italic: true, margin: 0 });
        sl.addText([
          { text: "def search(request):", options: { breakLine: true } },
          { text: "    q = request.GET.get(\"q\", \"\").strip()", options: { breakLine: true } },
          { text: "    items = Item.objects.all()          # \u2026 and eleven more lines", options: {} }
        ], { x: 1.3, y: 5.3, w: 10.7, h: 0.95, color: C.slate, fontFace: "Consolas", fontSize: 12.5, valign: "top", margin: 0, lineSpacingMultiple: 1.06 });
      } },
    { caption: "Drawn right", file: "backstage-data.png", w: 1200, h: 640 },
    "Lead with the green strip, because the honest part matters: the entity table in the sample was fine. The failure was not stopping. Then the column dump, and the view source underneath it \u2014 ask what either tells a reader that the codebase does not tell them better, and what happens to both the first time someone adds a column. Click. Six entities, key fields only, five solid and one dashed. Point at PullList: dashed because it belongs to a roadmap feature, which makes the dashed border a scope decision showing up in the data model rather than a drawing convention. Last, walk one step of the traced flow onto an entity so they see the cross-check they are about to run.");

  // 7 Round 1 — words
  s = await wordsSlide("Round 1 · the words", "System context — four terms", [
    [FA.FaVectorSquare, "System boundary", "Everything you will build, own, and can change. If fixing it means filing a bug with someone else, it belongs outside the box."],
    [FA.FaUserFriends, "Actor / user role", "A kind of person, named by their job — not a name. The admin and the setup person count."],
    [FA.FaPlug, "External dependency", "An API, an auth provider, email, hosting, the app store, GitHub itself. Anything you need and don't control."],
    [FA.FaArrowsAltH, "Boundary arrow", "One direction, labeled with the noun that crosses: \"photo upload,\" \"overdue reminder.\" Never \"communicates with.\""]
  ], "Nothing in CS 240 or CS 340 ever asked you where your system ends. That's what makes this the hard one.");
  speaker(s, "Under a minute — walk the four terms and move. The closing line is worth saying because this round looks trivial and is not: it is the only genuinely new diagram of the day, and it will run slower than the fifteen-minute component round. Boundary is the one to dwell on for ten seconds, because students hear it as a description of reality when it is actually a decision: inside means you own it, test it and fix it at eleven at night; outside means you inherit its downtime.");

  // 8 Round 1 — go
  s = await goSlide("Round 1 · 10 min · teams", "Draw the boundary",
    "Your whole system as ONE box. Every user role and every external service around it. Label every arrow with what crosses.",
    [
      "Who are all your user types? Go back to your Product Definition Brief — then add the ones nobody lists: the admin, the person who does setup, you as maintainer.",
      "What do you depend on that you don't control? Include the boring ones: email delivery, hosting, the identity provider.",
      "What does each arrow actually carry? Read one out loud as a sentence: \"the borrower sends ___ to the system.\""
    ],
    "The test: if it vanished tomorrow, would you have to change code? Then it goes outside the box.");
  speaker(s, "Leave this up for the full ten minutes. Half the room will open the box immediately and start drawing components — tell them to close it, and reassure them the work is not wasted, it is the next round. Your circulation targets: teams listing a tech stack around the box rather than people and services, and teams with only the happy user. Done looks like one box, three to six things around it, every arrow a labeled noun, and no component names inside. With a small cohort, have solo students narrate their board to a partner for ninety seconds at the end.");

  // 9 Round 2 — words
  s = await wordsSlide("Round 2 · the words", "Components & interfaces — four terms", [
    [FA.FaCubes, "Component", "One responsibility, one interface, and a name you could put on a contributor's first task. Not a class — it contains classes."],
    [FA.FaCrosshairs, "Responsibility", "One sentence. One reason to change. Chess had five: server, handlers, services, data access, database."],
    [FA.FaExchangeAlt, "Interface", "An in-process call, HTTP + JSON, a WebSocket, a queue, a scheduled job, a file drop. Rough is the right amount."],
    [FA.FaKey, "State owner", "Exactly one box may write each kind of data. Point at it — if your finger lands between two boxes, that's the design question."]
  ], "Three to six boxes. Fifteen means a class diagram; two called \"frontend\" and \"backend\" means you haven't started.");
  speaker(s, "Under a minute. This round is re-aiming rather than teaching, so the useful thing to say is that the CS 240 chess stack is a perfectly respectable default and most of them should land near it — the difference is choosing it on purpose rather than receiving it. The state-owner card is the one that earns its space; un-owned data is the classic gap, and the finger test is a fast way for a team to find it themselves. The closing line gives you both correction scripts in advance.");

  // 10 Round 2 — go
  s = await goSlide("Round 2 · 15 min · teams", "Open the box",
    "Three to six components, each with a one-line job written on it. Draw the arrows between them and name what each one carries.",
    [
      "Say what your system does in one sentence — then break that sentence at every \"and.\" Those are your components.",
      "What's the first self-contained piece of work you'd hand a new contributor? That's a component, and it's a good first issue.",
      "For each arrow: is this a function call, an HTTP request, a queue, or a scheduled job? Rough answers are fine; \"don't know\" is a finding.",
      "Point at the box that owns each kind of data. Every piece of state gets exactly one owner."
    ],
    "Three smells to watch for on your own board: the God component · the mystery arrow · data that no box owns.");
  speaker(s, "The longest round, and the one where circulating pays most. Two corrections you will make repeatedly. Fifteen boxes with method lists is CS 340 muscle memory — ask them to group into four. Two boxes named Frontend and Backend means they have not started — ask what the backend does, in verbs, and split on the answer. If a student proposes a pattern by name, the question is what problem in their system it solves; no answer means it goes in the parking lot. Worth saying aloud once: two people can work in parallel exactly as far as their interface is agreed, which is why this round matters to a solo founder too.");

  // 11 Round 3 — words
  s = await wordsSlide("Round 3 · the words", "One flow, end to end", [
    [FA.FaCrosshairs, "Core flow", "The one action that, if it didn't work, would make the product pointless. Not the most complex one. Signup is never it."],
    [FA.FaRoute, "The trace", "Start at the user's finger, end at what the user sees. Numbered steps across the boxes you just drew."],
    [FA.FaBolt, "The failure case", "The failures that aren't your code: the service is down, the network drops mid-action, two people act in the same second."]
  ], "You did this seven times in CS 240 — one sequence diagram per chess endpoint. Same move, one flow, no tool.");
  speaker(s, "Thirty seconds, because they own this move cold — the closing line is the entire instruction and saying it saves you six minutes. Spend what you save on the part that is new: choosing the flow. The failure-case card is where to add something they do not have. In chess, errors were status codes they returned; here the interesting failures are outside the box, and CS 240 already gave them three words for it — partial failure, the “network is reliable” fallacy, and idempotency. Land on idempotency, because it is the retry problem they are about to hit: “one open checkout per item” on the component diagram two slides back is the guard that makes a retry safe. Skip CAP even though it sits on the same CS 240 page — it governs replicas disagreeing during a partition, and a phone with no signal is not that.");

  // 12 Round 3 — go
  s = await goSlide("Round 3 · 12 min · teams", "Trace it, then break it",
    "Number the steps of your single most important user action across your boxes. Then trace it again in red, when something breaks.",
    [
      "Start at the user's finger. What do they tap, and what do they see one second later?",
      "If the trace needs a box you don't have, add it. If it skips half your boxes, ask whether those are MVP or roadmap.",
      "Now in red: pick one thing outside your box from Round 1, turn it off, and trace it again.",
      "What does the person see, and what can they do next? \"Show an error\" is not an answer."
    ],
    "This flow is your vertical slice — milestone 1, and what you demo in November. Choose it on purpose.");
  speaker(s, "Say the chain in the bottom strip out loud; it is the most valuable sentence in the round, because the core flow chosen here becomes the vertical slice, which is milestone 1 in the implementation plan, which is the progress demo in Week 10. Watch for two things while circulating. A team tracing the admin or signup flow has picked wrong — apply the test from the vocabulary slide. A trace that touches only two boxes usually means the component diagram is decorative, which is a good find, not a failure. Do not let anyone skip the red trace for time; it is a graded Design Document criterion and the commonest gap in Monday's sample.");

  // 13 Round 4 — words
  s = await wordsSlide("Round 4 · the words", "Data model — four reminders", [
    [FA.FaTable, "Entity", "Something the system must remember between visits. Usually a noun your user would recognize. Screens are not entities."],
    [FA.FaKey, "Key fields", "The identifier plus the three to five that matter. Not the column dump — that was Monday's over-specification defect."],
    [FA.FaLink, "Relationships", "One-to-one, one-to-many, many-to-many — and draw the join. Same notation as CS 240, less ceremony."],
    [FA.FaBorderStyle, "MVP or roadmap", "Solid border or dashed. The dashed ones are a scope decision showing up in your data model."]
  ], "Chose a document store after CS 340? Entities and relationships still come first; access patterns come second.");
  speaker(s, "Thirty seconds — CS 240 covered entities, primary and foreign keys, cardinality and ERDs outright, so say so and start the clock. Only two cards need emphasis. Key fields, because a column dump on the whiteboard is the exact defect they diagnosed in the Backstage sample, and catching it here is a free callback. And the dashed border, because it is not a modeling convention at all — it is the scope argument from their proposal showing up in the data model, and a team with more dashed entities than solid ones has just found a scope problem at the cheapest possible moment.");

  // 14 Round 4 — go
  s = await goSlide("Round 4 · 10 min · teams", "What the system remembers",
    "Entities, key fields, relationships — boxes and labelled lines on a whiteboard. Then walk your Round 3 trace across them and check.",
    [
      "What does the user see a list of? That's usually an entity. What has to survive between two visits?",
      "Every step in your trace that reads or writes data must land on an entity. Walk it and point.",
      "Every entity must be touched by something. If nothing touches it, it's a roadmap feature that snuck in — dash it.",
      "Which entities exist only for features you already called roadmap? Dashed border, and out of the MVP schema."
    ],
    "Five to eight boxes is a semester. Fourteen is a scope problem you just found for free.");
  speaker(s, "The cross-check in items two and three is the real point of the round, and it is worth interrupting a team to run it with them — it surfaces the un-owned state from Round 2 a second time, where it is much harder to ignore. Your three corrections: column dumps, entities that are really screens, and many-to-many drawn as a line with no join entity. They know how to fix all three; they skipped, they did not fail. Keep an eye on the kitchen-sink model — dash everything the core flow never touches, then count what is left.");

  // 15 Round 5 — words
  s = await wordsSlide("Round 5 · the words", "A decision, in five lines", [
    [FA.FaCheckDouble, "Chosen", "The option you're going with."],
    [FA.FaBalanceScale, "Alternative considered", "One a reasonable team down the hall would actually have picked. A straw man fools nobody."],
    [FA.FaCrosshairs, "Why it wins, given our goals", "Against YOUR goals and non-goals — not against generic virtues like \"it's faster.\""],
    [FA.FaSearchPlus, "Evidence", "A spike, a benchmark, prior experience — or honestly \"none yet.\" Unlabeled is the only wrong answer."],
    [FA.FaLightbulb, "What would change our mind", "Ten seconds to write. It's what separates a decision from a commitment."]
  ], "Straight out of template §6. Write the five lines and you've drafted the section.");
  speaker(s, "A minute, and give the three words in the third card their weight: given our goals is what turns an assertion into engineering. This is the genuinely new skill of the day — both prior courses compared architectures and patterns in the abstract, and neither asked a student to choose for their own system and defend it in writing. The evidence card is where the spike from their proposal finally pays off, and Monday's sample showed both acceptable ends: a decision argued from a real measurement, and one honestly labeled reasoned, not measured.");

  // 16 Round 5 — go
  s = await goSlide("Round 5 · 10 min · teams", "Argue two decisions",
    "Your two biggest decisions, five lines each. Three sentences of thinking per decision — this is §6 of the template, drafting itself.",
    [
      "Stuck on which? Name the choice you'd be most annoyed to have to redo in November. That's decision one.",
      "Finish this sentence: \"A reasonable team might have picked ___ instead, and here's why we didn't.\"",
      "Is your reason about your users, your team, or the five weeks? If it's none of the three, it isn't a reason yet.",
      "What would have to be true for you to switch? Write it down — that's the last line."
    ],
    "Real criteria here: what your team knows · what five weeks can absorb · what your user's setting requires · what a contributor can install.");
  speaker(s, "The round with the most grade weight behind it. The correction you will make most is scaling cosplay — a team invoking horizontal scaling for forty users is reciting CS 240, not deciding. Say it gently and it lands. Watch also for the humble reason dressed up as a grand one: we chose Python because we all know Python is a legitimate decision at this scale, so let them say it plainly and then be honest in the last line. If a team is genuinely still arguing rather than documenting, that is a fine use of ten minutes, but make them write the block before the bell, even if the chosen line becomes an open question with an owner and a date.");

  // 17 Capture
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: -1.3, y: 5.2, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaCamera, 0.9, 1.3, 0.9, C.amber, C.navy);
  s.addText("Photograph every board before anyone erases anything.", { x: 0.9, y: 2.42, w: 11.9, h: 1.05, color: C.white, fontFace: F.head, fontSize: 29, bold: true, italic: true, margin: 0, lineSpacingMultiple: 1.06 });
  card(s, 0.6, 3.75, 5.95, 1.5, C.navy2);
  s.addText([
    { text: "Everything, not just the neat parts.\n", options: { color: C.amber, bold: true } },
    { text: "Red failure arrows and parked ideas too — those become your risks section.", options: { color: "CFE0E9" } }
  ], { x: 0.95, y: 3.75, w: 5.3, h: 1.5, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
  card(s, 6.75, 3.75, 5.95, 1.5, C.navy2);
  s.addText([
    { text: "Name a person per section, out loud.\n", options: { color: C.amber, bold: true } },
    { text: "§3 context · §4 components + flow · §5 data · §6 decisions. Four sections, four names.", options: { color: "CFE0E9" } }
  ], { x: 7.1, y: 3.75, w: 5.3, h: 1.5, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
  card(s, 0.6, 5.5, 12.1, 1.25, C.amber);
  s.addText("A photo of a whiteboard is a legitimate diagram for the draft. The boards are the work — tonight is transcription.", { x: 0.95, y: 5.5, w: 11.4, h: 1.25, color: C.navy, fontFace: F.body, fontSize: 17, bold: true, align: "center", valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  footer(s, "7E92A8");
  speaker(s, "Five minutes, and the first instruction is non-negotiable — nobody erases until every board is photographed, including the red arrows and the parked ideas, because those are the honest content of the risks and open-questions section. Then make the assignments concrete in the room rather than letting the team agree to sort it out later: name a person per template section out loud. The amber band lowers the bar deliberately, because the failure mode tonight is a team trying to write a polished document instead of transcribing what they already decided.");

  // 18 Wrap
  s = mk(); s.background = { color: C.white };
  header(s, "Before next class", "What's due, and what's coming");
  card(s, 0.6, 2.0, 12.1, 1.6, C.navy);
  await iconCircle(s, FA.FaClipboardList, 0.98, 2.4, 0.7, C.amber, C.navy);
  s.addText([
    { text: "Design Document draft — end of day tomorrow, Thu, Oct 15\n", options: { color: C.amber, bold: true, fontSize: 19 } },
    { text: "Photographed diagrams + skeleton prose + your two argued decisions. That's a complete draft.", options: { color: "CFE0E9" } }
  ], { x: 2.0, y: 2.0, w: 10.4, h: 1.6, fontFace: F.body, fontSize: 16.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.06 });
  card(s, 0.6, 3.8, 5.95, 1.5, C.cardBg);
  await iconCircle(s, FA.FaHistory, 0.95, 4.1, 0.62, C.teal);
  s.addText([
    { text: "Monday, Oct 19\n", options: { color: C.tealDk, bold: true } },
    { text: "Git for maintainers — the branching and PR discipline you'll run to December.", options: { color: C.ink } }
  ], { x: 1.8, y: 3.8, w: 4.6, h: 1.5, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
  card(s, 6.75, 3.8, 5.95, 1.5, C.cardBg);
  await iconCircle(s, FA.FaDraftingCompass, 7.1, 4.1, 0.62, C.teal);
  s.addText([
    { text: "Wednesday, Oct 21\n", options: { color: C.tealDk, bold: true } },
    { text: "CP5 — Design Document (revised), due end of day, alongside CP6 — Git Workflow Lab.", options: { color: C.ink } }
  ], { x: 7.95, y: 3.8, w: 4.6, h: 1.5, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
  card(s, 0.6, 5.5, 12.1, 1.3, C.strongBg);
  s.addText("Draft, review, revise — the same loop as the proposal. The revision is what's graded.", { x: 0.95, y: 5.5, w: 11.4, h: 1.3, color: C.tealDk, fontFace: F.body, fontSize: 17, bold: true, align: "center", valign: "middle", margin: 0 });
  footer(s);
  speaker(s, "Two minutes to close. Say why the draft is due tomorrow rather than tonight: the boards are the work, this is transcription, and a night in between buys a better document while keeping it off the same evening as the team charter. Then the loop — draft, review, revise — named out loud, because it is the same shape as the proposal, and revision is graded on the Design Document exactly as it was on the Written Proposal. If the room looks daunted by Oct 21, remind them the hard eighty percent is already on their phones.");

  await pres.writeFile({ fileName: out });
  console.log("WROTE", out, "\u2014", PAGE, "slides");
  const anim = await require("./add-animations.js").addAnimations(out);
  if (anim.length) console.log("  ANIMATED", anim.join("; "));
  try {
    const { verifyDeck, reportText } = require("./verify-deck.js");
    console.log(" ", reportText(await verifyDeck(out)));
  } catch (e) { console.warn("  verify-deck skipped:", e.message); }
}

(async () => {
  await build(true,  "Session12-ArchitectureWorkshop.pptx");
  await build(false, "Session12-ArchitectureWorkshop-inclass.pptx");
})().catch(e => { console.error(e); process.exit(1); });
