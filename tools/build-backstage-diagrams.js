#!/usr/bin/env node
/*
 * build-backstage-diagrams.js — the Backstage diagrams, in two sets.
 *
 *   FLAWED  (Session 11) — the pictures as the sample design doc has them, with
 *           the planted defects intact: an Email notifier that appears here and
 *           nowhere else, Auth missing, unlabeled arrows, no failure case.
 *           Drawn DEADPAN — same palette, no red, no callouts. Students are
 *           meant to find these; a diagram that flags its own defect is a
 *           spoiler and wastes the dissection.
 *   FIXED   (Session 12) — the same diagrams drawn right, the worked example
 *           teams aim at. These may annotate, because here we are teaching.
 *
 * Writes .svg (committed source, referenced by the Canvas pages) into
 * canvas_material/resources/img/. Rasterize with tools/svg-to-png.sh, which
 * screenshots through Windows Chrome so the real Calibri is used — librsvg on
 * this box only has DejaVu.
 */
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "..", "canvas_material", "resources", "img");

const P = {
  navy: "#14233A", navy2: "#1E3352", teal: "#12908F", tealDk: "#0E6E6D",
  amber: "#E8A33D", coral: "#D9614C", green: "#3E9C6B",
  ink: "#1E2A36", slate: "#5F7284", cardBg: "#F2F6F8", ice: "#E4EEF1",
  white: "#FFFFFF", faint: "#CFE0E9", rule: "#B9C7D2"
};
const FONT = "Calibri, Carlito, 'Segoe UI', Arial, sans-serif";
const esc = t => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function open(w, h) {
  const mk = (id, c) => `<marker id="${id}" viewBox="0 0 10 10" refX="9.2" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 1 L 9.5 5 L 0 9 z" fill="${c}"/></marker>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="${FONT}">
<defs>${mk("aSlate", P.slate)}${mk("aCoral", P.coral)}${mk("aTeal", P.teal)}</defs>
<rect x="0" y="0" width="${w}" height="${h}" fill="${P.white}"/>`;
}
const close = () => "</svg>";

function rect(x, y, w, h, o = {}) {
  const d = o.dash ? ` stroke-dasharray="${o.dash}"` : "";
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r ?? 10}" fill="${o.fill || P.white}" stroke="${o.stroke || "none"}" stroke-width="${o.sw || 2}"${d}/>`;
}
function txt(x, y, t, o = {}) {
  const st = [`font-size="${o.size || 17}"`, `fill="${o.fill || P.ink}"`, `text-anchor="${o.anchor || "middle"}"`];
  if (o.weight) st.push(`font-weight="${o.weight}"`);
  if (o.italic) st.push(`font-style="italic"`);
  return `<text x="${x}" y="${y}" ${st.join(" ")}>${esc(t)}</text>`;
}
const stack = (x, y, arr, o = {}) => arr.map((t, i) => txt(x, y + i * (o.lh || 19), t, o)).join("");

// A component card. `job` lines are the one-line responsibility; omit for the
// flawed set, where boxes carry a name and nothing else.
function comp(x, y, w, h, name, job, o = {}) {
  let s = rect(x, y, w, h, { fill: o.fill || P.navy, stroke: o.stroke, dash: o.dash });
  const cx = x + w / 2;
  if (job && job.length) {
    s += txt(cx, y + 30, name, { size: 18, weight: "bold", fill: P.white });
    s += stack(cx, y + 53, job, { size: 13.5, fill: P.faint, lh: 17 });
  } else {
    s += txt(cx, y + h / 2 + 6, name, { size: 18, weight: "bold", fill: P.white });
  }
  return s;
}
function actor(x, y, w, h, name, sub) {
  let s = rect(x, y, w, h, { fill: P.white, stroke: P.teal, sw: 2, r: 26 });
  const cx = x + w / 2;
  if (sub) {
    s += txt(cx, y + h / 2 - 3, name, { size: 17, weight: "bold", fill: P.tealDk });
    s += txt(cx, y + h / 2 + 17, sub, { size: 12.5, fill: P.slate, italic: true });
  } else s += txt(cx, y + h / 2 + 6, name, { size: 17, weight: "bold", fill: P.tealDk });
  return s;
}
function cylinder(x, y, w, h, name) {
  const ry = 13;
  return `<path d="M ${x} ${y + ry} a ${w / 2} ${ry} 0 0 1 ${w} 0 l 0 ${h - 2 * ry} a ${w / 2} ${ry} 0 0 1 ${-w} 0 z" fill="${P.navy2}"/>`
    + `<path d="M ${x} ${y + ry} a ${w / 2} ${ry} 0 0 0 ${w} 0" fill="none" stroke="${P.slate}" stroke-width="1.5" opacity="0.7"/>`
    + txt(x + w / 2, y + h / 2 + 11, name, { size: 16, weight: "bold", fill: P.white });
}
function poly(pts, o = {}) {
  const c = o.color || P.slate;
  const m = o.marker === false ? "" : ` marker-end="url(#${o.marker || "aSlate"})"`;
  const st = o.start ? ` marker-start="url(#${o.start})"` : "";
  const d = o.dash ? ` stroke-dasharray="${o.dash}"` : "";
  return `<polyline points="${pts.map(p => p.join(",")).join(" ")}" fill="none" stroke="${c}" stroke-width="${o.w || 2.2}"${d}${m}${st}/>`;
}
// Arrow labels never sit on a line and never carry a white plate — the layouts
// below leave real space for them, which is cheaper than masking.
const note = (x, y, t, o = {}) => txt(x, y, t, { size: o.size || 13.5, fill: o.fill || P.slate, anchor: o.anchor || "middle", italic: o.italic });
const badge = (x, y, n, o = {}) => `<circle cx="${x}" cy="${y}" r="${o.r || 12}" fill="${o.fill || P.amber}"/>` + txt(x, y + 5, n, { size: 13.5, weight: "bold", fill: o.color || P.navy });
function title(w, t, sub) {
  return txt(w / 2, 36, t, { size: 21, weight: "bold", fill: P.navy })
    + (sub ? txt(w / 2, 60, sub, { size: 14.5, fill: P.slate, italic: true }) : "");
}
function bar(x, y, w, h, lines, o = {}) {
  let s = rect(x, y, w, h, { fill: o.bg || P.ice, r: 8 });
  if (o.head) s += txt(x + 24, y + 28, o.head, { size: 15.5, weight: "bold", fill: o.headColor || P.navy, anchor: "start" });
  s += stack(x + 24, y + (o.head ? 52 : 26), lines, { size: 13.5, fill: o.color || P.ink, anchor: "start", lh: 19 });
  return s;
}

/* ═══════════════ FLAWED — Session 11, drawn deadpan ═══════════════ */

function contextFlawed() {
  const W = 980, H = 500;
  let s = open(W, H);
  s += title(W, "Backstage — system context");

  s += comp(400, 110, 250, 330, "Backstage", null);
  const who = [[150, "Wardrobe lead"], [250, "Volunteer"], [350, "Actor"]];
  who.forEach(([y, n]) => { s += actor(30, y, 210, 60, n); });

  s += poly([[240, 180], [396, 180]], {});
  s += stack(318, 152, ["edits items,", "manages volunteers"], { size: 12.5, fill: P.slate, lh: 16 });

  s += poly([[240, 280], [396, 280]], {});
  s += stack(318, 252, ["searches, adds items,", "checks out"], { size: 12.5, fill: P.slate, lh: 16 });

  s += poly([[400, 380], [244, 380]], {});
  s += note(318, 368, "overdue reminder email", { size: 12.5 });

  s += actor(760, 250, 190, 60, "Backup storage");
  s += poly([[654, 280], [756, 280]], {});
  s += note(705, 268, "nightly backup", { size: 12.5 });
  s += close();
  return s;
}

function componentsFlawed() {
  const W = 900, H = 430;
  let s = open(W, H);
  s += title(W, "Backstage — components");

  s += comp(30, 100, 210, 70, "Web UI", null);
  s += comp(345, 100, 210, 70, "Catalog", null);
  s += comp(660, 100, 210, 70, "Image store", null);
  s += comp(30, 290, 210, 70, "Checkout", null);
  s += cylinder(345, 280, 210, 90, "Database");
  s += comp(660, 290, 210, 70, "Email notifier", null);

  s += poly([[240, 135], [341, 135]], {});
  s += poly([[555, 135], [656, 135]], {});
  s += poly([[135, 170], [135, 286]], {});
  s += poly([[450, 170], [450, 276]], {});
  s += poly([[240, 325], [341, 325]], {});
  s += poly([[656, 325], [559, 325]], {});
  s += close();
  return s;
}

/* ═══════════════ FIXED — Session 12, the worked example ═══════════════ */

function contextFixed() {
  const W = 1360, H = 560;
  let s = open(W, H);
  s += title(W, "Backstage — system context", "one box · every role and service around it · every arrow labeled");

  s += rect(584, 144, 332, 292, { fill: "none", stroke: P.teal, dash: "7 6", sw: 2, r: 18 });
  s += rect(600, 160, 300, 260, { fill: P.navy, r: 12 });
  s += txt(750, 275, "Backstage", { size: 24, weight: "bold", fill: P.white });
  s += txt(750, 302, "everything we build and own", { size: 13, fill: P.faint, italic: true });
  s += note(916, 136, "the boundary", { fill: P.tealDk, anchor: "end", italic: true, size: 12.5 });

  s += actor(40, 188, 250, 64, "Wardrobe lead", "a person");
  s += poly([[290, 220], [580, 220]], {});
  s += note(435, 208, "item edits, volunteer accounts");

  s += actor(40, 308, 250, 64, "Volunteer", "a person");
  s += poly([[290, 325], [580, 325]], {});
  s += note(435, 313, "search, new item, check-out");
  s += poly([[580, 358], [292, 358]], {});
  s += note(435, 380, "results, photo, bin location");

  s += actor(1060, 258, 250, 64, "Backup storage", "we don't run it");
  s += poly([[920, 290], [1056, 290]], {});
  s += note(988, 278, "nightly backup");

  s += bar(40, 470, 1280, 58, [
    "Gone: the Actor and the overdue reminder email. Notifications were never in the MVP — and an actor never touches this system anyway.",
    "A volunteer checks an item out on their behalf, so Actor is data the system stores, not a user standing outside the box."
  ]);
  s += close();
  return s;
}

function componentsFixed() {
  const W = 1160, H = 650;
  let s = open(W, H);
  s += title(W, "Backstage — components and interfaces", "five components · a job written on each · every arrow named");

  s += comp(440, 100, 260, 110, "Catalog", ["owns items, bins,", "categories, photos;", "search"]);
  s += comp(840, 100, 250, 110, "Image store", ["saves and serves", "photos behind a", "storage interface"]);
  s += comp(60, 210, 250, 110, "Web UI", ["server-rendered pages;", "downscales photos", "before upload"]);
  s += comp(440, 330, 260, 130, "Checkout", ["owns checkout records;", "one open checkout per", "item; returns; overdue"]);
  s += comp(60, 390, 250, 92, "Auth", ["two roles:", "lead and volunteer"]);
  s += cylinder(440, 500, 260, 90, "Database");

  s += poly([[310, 235], [375, 235], [375, 165], [436, 165]], {});
  s += note(367, 150, "search, item edits", { anchor: "end", size: 12.5 });
  s += poly([[310, 295], [375, 295], [375, 380], [436, 380]], {});
  s += note(367, 345, "check-out / return posts", { anchor: "end", size: 12.5 });
  s += poly([[185, 320], [185, 386]], {});
  s += note(197, 358, "login", { anchor: "start", size: 12.5 });
  s += poly([[700, 155], [836, 155]], {});
  s += note(768, 143, "photo save / fetch", { size: 12.5 });
  s += poly([[700, 180], [770, 180], [770, 545], [704, 545]], {});
  s += note(782, 350, "items, bins, photo paths", { anchor: "start", size: 12.5 });
  s += poly([[570, 460], [570, 496]], {});
  s += note(582, 484, "checkout records", { anchor: "start", size: 12.5 });
  s += poly([[310, 436], [380, 436], [380, 545], [436, 545]], {});
  s += note(392, 508, "users, roles", { anchor: "start", size: 12.5 });

  s += bar(840, 380, 250, 118, ["“Handles check-outs” with", "a TBD interface was the one", "box nobody could build from."], { head: "Every box has a job." });
  s += close();
  return s;
}

function flowFixed() {
  const W = 1200, H = 730;
  let s = open(W, H);
  s += title(W, "Core flow — a volunteer checks out a costume", "the vertical slice: if only this worked, the theater would still use it");

  const lanes = [["Volunteer", 120], ["Web UI", 350], ["Catalog", 580], ["Checkout", 810], ["Database", 1040]];
  lanes.forEach(([n, x]) => {
    s += rect(x - 92, 92, 184, 46, { fill: P.navy, r: 8 });
    s += txt(x, 122, n, { size: 16, weight: "bold", fill: P.white });
    s += poly([[x, 138], [x, 600]], { marker: false, color: P.rule, dash: "5 6", w: 1.6 });
  });

  const step = (a, b, y, n, label, o = {}) => {
    const right = b > a, col = o.color || P.slate;
    let t = poly([[a, y], [b, y]], { color: col, marker: o.marker || "aSlate", dash: o.dash });
    t += badge(a + (right ? 24 : -24), y - 19, n, o.badge ? { fill: P.coral, color: P.white } : {});
    t += note(a + (right ? 44 : -44), y - 13, label, { anchor: right ? "start" : "end", fill: o.text || P.slate });
    return t;
  };
  s += step(120, 350, 185, "1", "searches “bustle”");
  s += step(350, 580, 240, "2", "query");
  s += step(580, 1040, 295, "3", "select items + bin");
  s += step(350, 810, 360, "4", "taps Check out — actor, show, due date");
  s += step(810, 1040, 415, "5", "write checkout record");
  s += step(350, 120, 470, "6", "item shows as out, with actor and due date");

  s += poly([[60, 512], [1140, 512]], { marker: false, color: P.rule, dash: "4 5", w: 1.4 });
  s += note(60, 502, "the same flow, when it breaks — strike night, no signal", { anchor: "start", fill: P.coral, italic: true });
  s += step(810, 1040, 552, "5", "write never arrives", { color: P.coral, marker: "aCoral", dash: "7 5", text: P.coral, badge: 1 });
  s += `<path d="M 915 543 l 18 18 M 933 543 l -18 18" stroke="${P.coral}" stroke-width="2.6" fill="none"/>`;
  s += step(350, 120, 592, "6", "form keeps what you typed; retry", { color: P.coral, marker: "aCoral", text: P.coral, badge: 1 });

  s += bar(60, 630, 1080, 74, [
    "The item is never shown as “out” unless the server confirmed the write. The spike already proved uploads fail on the shop's wifi, so",
    "this is the flow that has to survive it — not a footnote saying “the user sees an error message and can try again.”"
  ]);
  s += close();
  return s;
}

function dataFixed() {
  const W = 1200, H = 640;
  let s = open(W, H);
  s += title(W, "Data model — first cut", "key fields only · solid is MVP, dashed is roadmap");

  const ent = (x, y, w, name, fields, road) => {
    const h = 50 + fields.length * 21;
    let t = rect(x, y, w, h, { fill: P.cardBg, stroke: road ? P.slate : P.navy, sw: 2, dash: road ? "7 5" : null, r: 8 });
    t += `<path d="M ${x + 8} ${y} h ${w - 16} a 8 8 0 0 1 8 8 v 26 h ${-w} v -26 a 8 8 0 0 1 8 -8 z" fill="${road ? P.slate : P.navy}"/>`;
    t += txt(x + w / 2, y + 24, name, { size: 16, weight: "bold", fill: P.white });
    t += stack(x + 16, y + 58, fields, { size: 13, fill: P.slate, anchor: "start", lh: 21 });
    return t;
  };
  s += ent(60, 110, 230, "Bin", ["short ID", "description"]);
  s += ent(60, 300, 230, "Item", ["name, category", "size, condition", "photo"]);
  s += ent(455, 300, 250, "Checkout", ["out date", "due date", "returned date"]);
  s += ent(870, 110, 230, "Person", ["name", "phone"]);
  s += ent(870, 300, 230, "Show", ["title", "opening date"]);
  s += ent(870, 480, 230, "PullList", ["items"], true);

  s += poly([[175, 200], [175, 296]], { marker: false, w: 2 });
  s += txt(163, 224, "1", { size: 14, weight: "bold", fill: P.tealDk, anchor: "end" });
  s += txt(163, 288, "N", { size: 14, weight: "bold", fill: P.tealDk, anchor: "end" });
  s += note(187, 252, "holds", { anchor: "start" });

  s += poly([[290, 355], [451, 355]], { marker: false, w: 2 });
  s += txt(300, 345, "1", { size: 14, weight: "bold", fill: P.tealDk, anchor: "start" });
  s += txt(441, 345, "N", { size: 14, weight: "bold", fill: P.tealDk, anchor: "end" });
  s += note(370, 382, "checked out as");

  s += poly([[985, 200], [985, 250], [620, 250], [620, 296]], { marker: false, w: 2 });
  s += txt(997, 224, "1", { size: 14, weight: "bold", fill: P.tealDk, anchor: "start" });
  s += txt(632, 290, "N", { size: 14, weight: "bold", fill: P.tealDk, anchor: "start" });
  s += note(800, 242, "borrows");

  s += poly([[866, 355], [709, 355]], { marker: false, w: 2 });
  s += txt(856, 345, "1", { size: 14, weight: "bold", fill: P.tealDk, anchor: "end" });
  s += txt(719, 345, "N", { size: 14, weight: "bold", fill: P.tealDk, anchor: "start" });
  s += note(788, 382, "for");

  s += poly([[985, 390], [985, 476]], { marker: false, w: 2, dash: "7 5", color: P.slate });
  s += note(997, 438, "roadmap only", { anchor: "start", italic: true });

  s += bar(60, 470, 360, 118, ["types, nullability, defaults, and the", "search view's code. Those live in the", "codebase, not in the design document."], { head: "What isn't here:" });
  s += close();
  return s;
}

const files = {
  "backstage-context-flawed.svg": contextFlawed(),
  "backstage-components-flawed.svg": componentsFlawed(),
  "backstage-context.svg": contextFixed(),
  "backstage-components.svg": componentsFixed(),
  "backstage-flow.svg": flowFixed(),
  "backstage-data.svg": dataFixed()
};
fs.mkdirSync(OUT, { recursive: true });
for (const [n, body] of Object.entries(files)) {
  fs.writeFileSync(path.join(OUT, n), body + "\n");
  console.log("WROTE", n);
}
