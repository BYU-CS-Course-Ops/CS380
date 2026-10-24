const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const FA = require("react-icons/fa");

const C = {
  navy: "14233A", navy2: "1E3352", teal: "12908F", tealDk: "0E6E6D",
  amber: "E8A33D", coral: "D9614C", green: "3E9C6B",
  ink: "1E2A36", slate: "5F7284", cardBg: "F2F6F8", ice: "E4EEF1", white: "FFFFFF",
  weakBg: "FBECE8", strongBg: "EAF4EE", amberBg: "FBEEDA",
  code: "E8EEF3", codeDim: "9FB4C7", codeAdd: "9FE0B5", codeDel: "F4A99A"
};
const F = { head: "Cambria", body: "Calibri", mono: "Consolas" };

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

const pres = new pptxgen();
pres.defineLayout({ name: "W", width: 13.3, height: 7.5 });
pres.layout = "W"; pres.author = "CS 301R";
pres.title = "CS 301R — Session 18 — Estimation, Sequencing & the Vertical Slice";

let PAGE = 0;
function mk() { PAGE++; return pres.addSlide(); }
function footer(slide, col) {
  const c = col || C.slate;
  slide.addText("CS 301R · Session 18 · Estimation & the Vertical Slice", { x: 6.8, y: 7.04, w: 5.9, h: 0.3, align: "right", color: c, fontFace: F.body, fontSize: 10, margin: 0 });
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
const R = n => (n ? REVEAL(n) : {});

function darkHeader(s, kicker, title) {
  s.addShape(pres.shapes.OVAL, { x: 11.4, y: -1.3, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  s.addShape(pres.shapes.OVAL, { x: 0.62, y: 0.6, w: 0.15, h: 0.15, fill: { color: C.amber } });
  s.addText(kicker.toUpperCase(), { x: 0.87, y: 0.5, w: 11.5, h: 0.34, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText(title, { x: 0.6, y: 0.9, w: 12.1, h: 0.8, color: C.white, fontFace: F.head, fontSize: 32, bold: true, margin: 0 });
}
// A block of issue or code text on a dark card. `lines` is an array of strings,
// or [text, color] pairs to color a line.
function codeBlock(s, x, y, w, h, lines, extra, fontSize) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: C.navy2 }, line: { type: "none" }, rectRadius: 0.08, shadow: mkShadow(), ...extra });
  const runs = lines.map((ln, i) => {
    const [text, color] = Array.isArray(ln) ? ln : [ln, C.code];
    return { text: text === "" ? " " : text, options: { color, breakLine: i < lines.length - 1 } };
  });
  s.addText(runs, { x: x + 0.3, y: y + 0.18, w: w - 0.6, h: h - 0.36, fontFace: F.mono, fontSize: fontSize || 15, valign: "top", margin: 0, lineSpacingMultiple: 1.05, ...extra });
}
// A full-width bar with a bold lead-in, optionally revealed on click n.
function bar(s, y, h, fill, lead, text, n) {
  const extra = R(n);
  const dark = fill === C.navy;
  card(s, 0.6, y, 12.1, h, fill, extra);
  const runs = [];
  if (lead) runs.push({ text: lead + "  ", options: { color: dark ? C.amber : (fill === C.amber ? C.navy : C.tealDk), bold: true } });
  runs.push({ text, options: { color: dark ? C.white : (fill === C.amber ? C.navy : C.ink), bold: fill === C.amber } });
  s.addText(runs, { x: 0.95, y, w: 11.4, h, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, lineSpacingMultiple: 1.04, ...extra });
}
// A size chip: the letter on a colored rounded square.
function chip(s, x, y, w, h, label, fill, extra, fontSize) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: fill }, line: { type: "none" }, rectRadius: 0.08, ...extra });
  s.addText(label, { x, y, w, h, color: fill === C.amber ? C.navy : C.white, fontFace: F.head, fontSize: fontSize || 20, bold: true, align: "center", valign: "middle", margin: 0, ...extra });
}

// One demo-round slide: the issue as a student reads it, then (click 1) the
// maintainer's size, then (click 2) what was hidden and the question to ask.
async function demoIssue(n, title, lines, size, sizeNote, hidden, question, notes) {
  const s = mk(); s.background = { color: C.white };
  header(s, `Demo round · issue ${n} of 3`, "Size it from the text. Fingers up on 3.");
  s.addText("Prop Loft · M1", { x: 0.6, y: 1.85, w: 6.9, h: 0.35, color: C.slate, fontFace: F.body, fontSize: 15, bold: true, margin: 0 });
  codeBlock(s, 0.6, 2.25, 6.9, 4.45, [[title, C.amber], ...lines], {}, 14.5);
  card(s, 7.75, 1.95, 4.95, 1.55, C.navy, REVEAL(1));
  s.addText("THE MAINTAINER'S SIZE", { x: 8.05, y: 2.05, w: 3.0, h: 0.35, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 1, margin: 0, ...REVEAL(1) });
  s.addText(sizeNote, { x: 8.05, y: 2.45, w: 2.9, h: 0.95, color: "CFE0E9", fontFace: F.body, fontSize: 15, valign: "top", margin: 0, ...REVEAL(1) });
  chip(s, 11.05, 2.2, 1.4, 1.05, size, C.amber, REVEAL(1), size.length > 2 ? 18 : 28);
  card(s, 7.75, 3.7, 4.95, 1.75, C.cardBg, REVEAL(2));
  s.addText([
    { text: "What's in the text", options: { bold: true, color: C.tealDk, breakLine: true } },
    { text: hidden, options: { color: C.ink, fontSize: 15 } }
  ], { x: 8.05, y: 3.7, w: 4.4, h: 1.75, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0, lineSpacingMultiple: 1.02, ...REVEAL(2) });
  card(s, 7.75, 5.65, 4.95, 1.05, C.amberBg, REVEAL(2));
  s.addText([
    { text: "Ask:  ", options: { bold: true, color: C.tealDk } },
    { text: question, options: { color: C.ink, italic: true } }
  ], { x: 8.05, y: 5.65, w: 4.4, h: 1.05, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0, ...REVEAL(2) });
  footer(s);
  s.addNotes(notes);
}

async function build() {
  let s;

  // 1 Title
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: 10.9, y: -1.4, w: 4.2, h: 4.2, fill: { color: "1C3252" } });
  s.addShape(pres.shapes.OVAL, { x: 12.0, y: 5.1, w: 3.0, h: 3.0, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaTshirt, 0.9, 1.45, 1.0, C.amber, C.navy);
  s.addText("CS 301R · SOFTWARE ENGINEERING STUDIO I", { x: 0.92, y: 2.75, w: 11, h: 0.35, color: "9FB4C7", fontFace: F.body, fontSize: 15, bold: true, charSpacing: 2, margin: 0 });
  s.addText("Size It, Fit It, Order It", { x: 0.9, y: 3.15, w: 12.1, h: 1.3, color: C.white, fontFace: F.head, fontSize: 42, bold: true, margin: 0 });
  s.addText([
    { text: "Session 18 — estimation, sequencing, and the vertical slice", options: { color: C.amber, bold: true, breakLine: true } },
    { text: "Wednesday, November 4, 2026", options: { color: "9FB4C7" } }
  ], { x: 0.92, y: 4.7, w: 11, h: 0.9, fontFace: F.body, fontSize: 19, margin: 0, lineSpacingMultiple: 1.2 });
  s.addNotes("CP8 is due tonight, and today finishes it. Before class, from the outline's run sheet: the PR branch replayed onto Prop Loft's main (not pushed), the Plan table view added, and tabs open for the board, the Plan view, the M1 issue list, M1's milestone page, and design §6 on main. Print the Fit Check Sheet, one per student. Laptops required. Don't pre-size the board: sizing it is today's demo.");

  // 2 Today
  s = mk(); s.background = { color: C.white };
  header(s, "Today", "Turn the backlog into a plan you can keep");
  const plan = [
    [FA.FaComments, "Estimates are conversations, not promises", "5 min"],
    [FA.FaTshirt, "T-shirt sizes, demonstrated on Prop Loft", "12 min"],
    [FA.FaCut, "The fit check and the cut, then size your own", "18 min"],
    [FA.FaRoute, "Sequencing and the vertical slice", "12 min"],
    [FA.FaColumns, "Order your M1 and commit the slice", "17 min"],
    [FA.FaClipboardCheck, "CP8 check and wrap", "11 min"]
  ];
  for (let i = 0; i < plan.length; i++) {
    const y = 1.95 + i * 0.8;
    const hi = i === 2 || i === 4;
    card(s, 0.6, y, 12.1, 0.68, hi ? C.navy : C.cardBg);
    await iconCircle(s, plan[i][0], 0.88, y + 0.1, 0.48, hi ? C.amber : C.teal, hi ? C.navy : "FFFFFF");
    s.addText(plan[i][1], { x: 1.6, y, w: 9.0, h: 0.68, color: hi ? C.white : C.ink, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
    s.addText(plan[i][2], { x: 10.6, y, w: 1.8, h: 0.68, color: hi ? C.amber : C.slate, fontFace: F.body, fontSize: 16, bold: true, align: "right", valign: "middle", margin: 0 });
  }
  footer(s);
  s.addNotes("Thirty seconds. Every teaching block is shown on Prop Loft first, then you do the same thing to your own tracker. The two highlighted rows are your time: sizing your first milestone, then ordering it and writing the slice statement. Hand out the Fit Check Sheet now; it follows the day from top to bottom. CP8 is due tonight, and a board that leaves here sized, ordered, and with a slice statement is most of it.");

  // 3 Framing
  s = mk(); s.background = { color: C.white };
  header(s, "Why estimate at all", "Estimates are conversations, not promises");
  const why = [
    [FA.FaBalanceScale, "Does it fit?", "Find out now, while cutting is cheap, instead of the night before the demo."],
    [FA.FaComments, "What are you assuming?", "Two people sizing the same issue differently pictured different work. That's the find."]
  ];
  for (let i = 0; i < 2; i++) {
    const x = 0.6 + i * 6.15;
    card(s, x, 1.95, 5.95, 2.3, C.cardBg, REVEAL(i + 1));
    await iconCircle(s, why[i][0], x + 0.3, 2.15, 0.66, C.teal, "FFFFFF", REVEAL(i + 1));
    s.addText(why[i][1], { x: x + 1.15, y: 2.15, w: 4.6, h: 0.66, color: C.ink, fontFace: F.body, fontSize: 21, bold: true, valign: "middle", margin: 0, ...REVEAL(i + 1) });
    s.addText(why[i][2], { x: x + 0.3, y: 3.0, w: 5.35, h: 1.1, color: C.ink, fontFace: F.body, fontSize: 17, valign: "top", margin: 0, ...REVEAL(i + 1) });
  }
  card(s, 0.6, 4.5, 12.1, 1.1, C.cardBg, REVEAL(3));
  s.addText("On any team, the number gets forgotten within a week. \"Wait, you thought it did what?\" doesn't.", { x: 0.95, y: 4.5, w: 11.4, h: 1.1, color: C.slate, fontFace: F.body, fontSize: 17, italic: true, valign: "middle", margin: 0, ...REVEAL(3) });
  bar(s, 5.85, 0.9, C.amber, null, "Honesty rule: padding an estimate for looks and trimming it for optimism both defeat the point.", 4);
  footer(s);
  s.addNotes("Five minutes. Two reasons to estimate at our scale, one click each. First: to learn whether the first milestone fits before the progress demo tells you. Second, the bigger one: sizing forces two people to compare what they pictured. Third click: the number fades; the surfaced assumption is what lasts. Fourth: estimates are internal planning tools. Nobody grades the number; the grade is on whether you did the arithmetic honestly.");

  // 4 The sizes
  s = mk(); s.background = { color: C.white };
  header(s, "T-shirt sizes", "Relative first, tied to the hours you have");
  const sizes = [
    ["XS", "< 1 hour", "A label, a typo, a config line", C.slate],
    ["S", "≈ 2 hours", "One focused sitting", C.teal],
    ["M", "≈ 4 hours", "Two or three sittings: half a week of one person", C.tealDk],
    ["L", "≈ 7 hours", "A whole week of one person. Split it, or schedule it first.", C.amber],
    ["XL", "> a week", "An epic. Split it now.", C.coral]
  ];
  const zw = 2.3, zg = 0.15;
  for (let i = 0; i < sizes.length; i++) {
    const x = 0.6 + i * (zw + zg);
    card(s, x, 1.95, zw, 3.2, C.cardBg);
    chip(s, x + (zw - 1.1) / 2, 2.15, 1.1, 0.85, sizes[i][0], sizes[i][3], {}, 26);
    s.addText(sizes[i][1], { x, y: 3.12, w: zw, h: 0.45, color: C.ink, fontFace: F.body, fontSize: 18, bold: true, align: "center", margin: 0 });
    s.addText(sizes[i][2], { x: x + 0.15, y: 3.62, w: zw - 0.3, h: 1.45, color: C.slate, fontFace: F.body, fontSize: 15, align: "center", valign: "top", margin: 0 });
  }
  bar(s, 5.4, 1.35, C.navy, "Start from an anchor.", "Prop Loft's item list is finished, and it was an S. \"Bigger or smaller than that was?\" is an easier question than \"how many hours?\"", 1);
  footer(s);
  s.addNotes("Two minutes. The hours are tied to this course's week: an L is a whole week of one person's outside hours, so an L in a two-week milestone is half a solo founder's time. That's why an L gets a question and an XL gets split. Click: sizes are relative. Pick something finished that everyone knows and call it an S. Students should write their own anchor on the sheet's first box.");

  // 5 How we vote
  s = mk(); s.background = { color: C.white };
  header(s, "How we'll vote", "Silently, together, then compare pictures");
  const vote = [
    [FA.FaHandPaper, "Read the issue", "Size it from its text alone. One finger is XS, five is XL."],
    [FA.FaUserFriends, "Reveal together", "On \"3, 2, 1.\" Nobody adjusts to the person next to them."],
    [FA.FaComments, "Compare pictures", "Whatever the numbers, someone says what they pictured."]
  ];
  for (let i = 0; i < 3; i++) {
    const x = 0.6 + i * 4.15;
    card(s, x, 1.95, 3.8, 2.3, C.cardBg);
    await iconCircle(s, vote[i][0], x + 0.25, 2.12, 0.6, C.teal);
    s.addText(vote[i][1], { x: x + 1.0, y: 2.12, w: 2.65, h: 0.6, color: C.ink, fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0 });
    s.addText(vote[i][2], { x: x + 0.25, y: 2.9, w: 3.3, h: 1.25, color: C.ink, fontFace: F.body, fontSize: 16, valign: "top", margin: 0 });
  }
  const outcomes = [
    ["The room splits", "Lowest and highest: what did you picture?"],
    ["Everyone agrees", "One of you: what did you picture? Same number, different work is still unclear."],
    ["Room ≠ maintainer", "What must the maintainer have been assuming?"],
    ["Nobody can size it", "The text is missing something. What would you need?"]
  ];
  for (let i = 0; i < 4; i++) {
    const x = 0.6 + (i % 2) * 6.15, y = 4.45 + Math.floor(i / 2) * 1.15;
    card(s, x, y, 5.95, 1.0, i === 2 ? C.amberBg : C.white, REVEAL(1));
    s.addText([
      { text: outcomes[i][0] + "  ", options: { bold: true, color: C.tealDk } },
      { text: outcomes[i][1], options: { color: C.ink } }
    ], { x: x + 0.25, y, w: 5.5, h: 1.0, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0, ...REVEAL(1) });
  }
  footer(s);
  s.addNotes("Ninety seconds. Vote with fingers, revealed together, so nobody anchors on a neighbor. Click: however the vote comes out, the move is the same, and you can't predict which you'll get. A split, ask the extremes. Agreement, ask one person anyway, because the same number can hide different work. If the room disagrees with the maintainer, that's the split. If nobody can size it, the issue needs another acceptance criterion.");

  // 6–8 Demo round
  await demoIssue(1, "Show an item's detail page", [
    ["good first issue", C.codeAdd],
    "",
    ["Acceptance criteria", C.codeDim],
    "[ ] /items/<id>/ shows name, category,",
    "    size, condition, and bin",
    "[ ] Each row of the item list links to it",
    "[ ] A missing item returns 404",
    "[ ] Tests cover both",
    "",
    ["Where to start: a view beside item_list,", C.codeDim],
    ["a template beside the list's, a test", C.codeDim],
    ["modeled on ItemListTests", C.codeDim]
  ], "S", "About the size of the item list it sits next to.",
  "Little. A good first issue with a Where to start can be sized from its own text, by a stranger.",
  "Bigger or smaller than the item list was?",
  "About two minutes. Read the issue aloud, give fifteen seconds, then 3, 2, 1. Whatever the vote, ask the move from the last slide. First click: the maintainer's size. Second click: this one is the calibration. Its Where to start names the file, the view to imitate, and the test to copy, so most rooms land near S. If they don't, ask what made it look bigger. That's useful too.");

  await demoIssue(2, "Record checkouts, at most one open per item", [
    "",
    ["Goal", C.codeDim],
    "Prop Loft records who has an item, for",
    "which show, and when it's due back.",
    "",
    ["Acceptance criteria", C.codeDim],
    "[ ] A Checkout model: item, actor, show,",
    "    due date, optional returned date",
    "[ ] The database refuses a second open",
    "    checkout (a constraint, not just a",
    "    form check)",
    "[ ] Tests: first, refused second, second",
    "    after a return"
  ], "M", "Two or three sittings, once the constraint is counted.",
  "It reads like one model with five fields. The second criterion asks the database to refuse, because three volunteers return items at once on strike night (design §6).",
  "What stops a second checkout of the same item?",
  "About two minutes, and the one most likely to run long. Let it. Ask what people pictured before you click. First click: the maintainer's M. Second: the hidden work is the second criterion. A form check is a few lines; a database constraint is a conditional unique constraint, a migration, and tests that expect the database to refuse, on SQLite and Postgres. Same title, different work.");

  await demoIssue(3, "Check an item out from its page", [
    "",
    ["Goal", C.codeDim],
    "A volunteer checks an item out to an",
    "actor for a show, from its page.",
    "",
    ["Context", C.codeDim],
    "Design §4, Web UI and Checkout.",
    "Needs the checkout model and the",
    "detail page.",
    "",
    ["Acceptance criteria", C.codeDim],
    "[ ] A form: actor, show, due date",
    "[ ] Already out: show who has it",
    "[ ] A failed save keeps what was typed"
  ], "L / M", "L as the design reads, with HTMX. M with plain forms.",
  "Design §6 picks HTMX for the web UI; §7 says it's new to both authors, with a four-hour learning box and plain forms as the fallback.",
  "Did you picture HTMX or a plain form? Have you used HTMX?",
  "About two minutes. Whatever the room says, this one is a risk, not a size: the number depends on whether you count learning HTMX. First click: the maintainer's L, or M without HTMX. Second: point at design §7's risk row, which already names the fallback. Don't resolve it here. Park it; it decides whether Prop Loft's milestone fits, two slides from now.");

  // 9 What the vote was for
  s = mk(); s.background = { color: C.navy };
  darkHeader(s, "What the vote was for", "A size disagreement is a picture disagreement");
  const lessons = [
    ["Nobody was bad at estimating.", "They were estimating different work."],
    ["The issue's text decides which work it is.", "If it can't, it needs another acceptance criterion."],
    ["The number matters less than the picture.", "Write the agreed picture down, where the next reader will see it."]
  ];
  for (let i = 0; i < 3; i++) {
    const y = 1.95 + i * 1.3;
    card(s, 0.6, y, 12.1, 1.12, C.navy2, REVEAL(i + 1));
    s.addText([
      { text: lessons[i][0] + "  ", options: { bold: true, color: C.white } },
      { text: lessons[i][1], options: { color: "CFE0E9" } }
    ], { x: 0.95, y, w: 11.4, h: 1.12, fontFace: F.body, fontSize: 19, valign: "middle", margin: 0, ...REVEAL(i + 1) });
  }
  card(s, 0.6, 5.95, 12.1, 0.8, C.amber, REVEAL(4));
  s.addText("Working solo? Trade with your review partner: each sizes the other's milestone cold.", { x: 0.95, y: 5.95, w: 11.4, h: 0.8, color: C.navy, fontFace: F.body, fontSize: 17, bold: true, valign: "middle", margin: 0, ...REVEAL(4) });
  footer(s, "7E92A8");
  s.addNotes("One minute; land the lesson. Use whatever happened in the room: name the moment someone said what they pictured. One click per line. The third is the habit: when a conversation changes the picture, edit the acceptance criteria so the next reader can't picture it wrong. Fourth click for solo founders: a partner reading your issues cold is the same check, and an issue they can't size is missing something.");

  // 10 The budget
  s = mk(); s.background = { color: C.white };
  header(s, "The budget", "Count the hours that actually exist");
  card(s, 0.6, 1.95, 12.1, 1.3, C.navy);
  s.addText([
    { text: "people  ×  hours a week  ×  weeks  −  review", options: { color: C.white, bold: true, breakLine: true } },
    { text: "Every change goes through a pull request, so review is real time. Count it.", options: { color: "CFE0E9", fontSize: 16 } }
  ], { x: 0.95, y: 1.95, w: 11.4, h: 1.3, fontFace: F.body, fontSize: 22, valign: "middle", margin: 0, lineSpacingMultiple: 1.1 });
  const budgets = [
    ["Solo founder", "1 × 7 × 2", "14 hours", "About 12 after review"],
    ["A team of three", "3 × 7 × 2", "42 hours", "Review is a bigger slice: someone reads every PR"],
    ["Prop Loft", "1 × 10 × 2", "20 hours", "The maintainer isn't taking a class: count their real hours"]
  ];
  for (let i = 0; i < 3; i++) {
    const x = 0.6 + i * 4.15;
    const pl = i === 2;
    card(s, x, 3.5, 3.8, 2.45, pl ? C.amberBg : C.cardBg, REVEAL(i + 1));
    s.addText(budgets[i][0], { x: x + 0.25, y: 3.6, w: 3.3, h: 0.5, color: C.tealDk, fontFace: F.body, fontSize: 18, bold: true, margin: 0, ...REVEAL(i + 1) });
    s.addText(budgets[i][1], { x: x + 0.25, y: 4.1, w: 3.3, h: 0.45, color: C.slate, fontFace: F.body, fontSize: 17, margin: 0, ...REVEAL(i + 1) });
    s.addText(budgets[i][2], { x: x + 0.25, y: 4.55, w: 3.3, h: 0.6, color: C.ink, fontFace: F.head, fontSize: 26, bold: true, margin: 0, ...REVEAL(i + 1) });
    s.addText(budgets[i][3], { x: x + 0.25, y: 5.15, w: 3.3, h: 0.75, color: C.ink, fontFace: F.body, fontSize: 15, valign: "top", margin: 0, ...REVEAL(i + 1) });
  }
  s.addText("Seven is the outside hours a week the course's ten-hour load leaves after class. Two weeks is today to the progress demo.", { x: 0.6, y: 6.2, w: 12.1, h: 0.6, color: C.slate, fontFace: F.body, fontSize: 15, italic: true, valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("Two minutes. The Session 8 arithmetic, with real numbers. One click per case. Solo is most of you: fourteen hours to the progress demo, before review. On a team, multiply, but review grows too. Third click: Prop Loft's maintainer has about ten hours a week, and the roadmap says so. The rule underneath is the same everywhere: count the hours that actually exist, not the ones you wish you had.");

  // 11 Prop Loft's tally
  s = mk(); s.background = { color: C.white };
  header(s, "Prop Loft's first milestone", "The maintainer's sizes, against 20 hours");
  const tally = [
    ["Search items by name", "S", "2", true],
    ["Show an item's detail page", "S", "2", true],
    ["Record checkouts, at most one open per item", "M", "4", true],
    ["Show who has an item and when it's due back", "S", "2", true],
    ["Check an item out from its page (HTMX)", "L", "7", true],
    ["Write a setup guide a newcomer can follow cold", "M", "4", false]
  ];
  s.addText("ISSUE", { x: 0.85, y: 1.85, w: 6, h: 0.3, color: C.slate, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText("SIZE", { x: 8.0, y: 1.85, w: 1.1, h: 0.3, color: C.slate, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, align: "center", margin: 0 });
  s.addText("HOURS", { x: 9.2, y: 1.85, w: 1.2, h: 0.3, color: C.slate, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, align: "center", margin: 0 });
  s.addText("SLICE?", { x: 10.6, y: 1.85, w: 1.8, h: 0.3, color: C.slate, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, align: "center", margin: 0 });
  for (let i = 0; i < tally.length; i++) {
    const y = 2.22 + i * 0.6;
    card(s, 0.6, y, 12.1, 0.52, C.cardBg);
    s.addText(tally[i][0], { x: 0.85, y, w: 7.0, h: 0.52, color: C.ink, fontFace: F.body, fontSize: 16, bold: true, valign: "middle", margin: 0 });
    s.addText(tally[i][1], { x: 8.0, y, w: 1.1, h: 0.52, color: tally[i][1] === "L" ? C.coral : C.tealDk, fontFace: F.head, fontSize: 18, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(tally[i][2], { x: 9.2, y, w: 1.2, h: 0.52, color: C.ink, fontFace: F.body, fontSize: 17, align: "center", valign: "middle", margin: 0 });
    s.addText(tally[i][3] ? "yes" : "no, but kept", { x: 10.4, y, w: 2.2, h: 0.52, color: tally[i][3] ? C.green : C.slate, fontFace: F.body, fontSize: 15, bold: tally[i][3], align: "center", valign: "middle", margin: 0 });
  }
  card(s, 0.6, 5.95, 12.1, 0.85, C.navy, REVEAL(1));
  s.addText([
    { text: "21 hours against 20.  ", options: { color: C.amber, bold: true } },
    { text: "Does it fit?", options: { color: C.white } }
  ], { x: 0.95, y: 5.95, w: 11.4, h: 0.85, fontFace: F.body, fontSize: 21, valign: "middle", margin: 0, ...REVEAL(1) });
  footer(s);
  s.addNotes("Ninety seconds. These are the maintainer's sizes, not the room's vote: the plan runs on the maintainer's numbers whatever the room said. Read down the column. The checkout form is the L, from the HTMX question. The setup guide isn't on the demo's path, but it stays in the first milestone; if someone asks why it isn't simply cut, say the next slide answers it. Click: twenty-one against twenty. Ask the room: does it fit? Take a show of hands before the next slide.");

  // 12 The cut
  s = mk(); s.background = { color: C.white };
  header(s, "Fits on paper means it doesn't", "Prop Loft's cut, and its next one");
  card(s, 0.6, 1.95, 3.8, 3.2, C.weakBg);
  s.addText([
    { text: "21 of 20", options: { fontFace: F.head, fontSize: 32, bold: true, color: C.coral, breakLine: true } },
    { text: "And the written self-review every pull request gets isn't counted yet.", options: { color: C.ink, fontSize: 16, breakLine: true } },
    { text: " ", options: { fontSize: 8, breakLine: true } },
    { text: "Why not cut the setup guide? ", options: { bold: true, color: C.ink, fontSize: 16 } },
    { text: "Its cold reader has a calendar, and contributors need it before the demo.", options: { color: C.ink, fontSize: 16 } }
  ], { x: 0.9, y: 1.95, w: 3.2, h: 3.2, fontFace: F.body, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
  card(s, 4.65, 1.95, 4.0, 3.2, C.strongBg, REVEAL(1));
  s.addText([
    { text: "The cut: take the fallback", options: { bold: true, color: C.green, fontSize: 18, breakLine: true } },
    { text: "Plain forms for the MVP; HTMX after it. Design §7 named this fallback already. The checkout form drops from L to M.", options: { color: C.ink, fontSize: 16, breakLine: true } },
    { text: "18 of 20", options: { fontFace: F.head, fontSize: 28, bold: true, color: C.green } }
  ], { x: 4.95, y: 1.95, w: 3.45, h: 3.2, fontFace: F.body, valign: "middle", margin: 0, lineSpacingMultiple: 1.05, ...REVEAL(1) });
  card(s, 8.9, 1.95, 3.8, 3.2, C.amberBg, REVEAL(2));
  s.addText([
    { text: "The next cut, named now", options: { bold: true, color: C.tealDk, fontSize: 18, breakLine: true } },
    { text: "If the midpoint check shows M1 behind: the list's \"Out\" marker moves to M2. The item page alone still walks the slice.", options: { color: C.ink, fontSize: 16 } }
  ], { x: 9.2, y: 1.95, w: 3.25, h: 3.2, fontFace: F.body, valign: "middle", margin: 0, lineSpacingMultiple: 1.05, ...REVEAL(2) });
  bar(s, 5.45, 1.3, C.navy, "Notice what the cut didn't touch: the slice.", "Cuts come from what's off the demo's path and from how things get built, before they come from what the demo shows.", 3);
  footer(s);
  s.addNotes("Two minutes. Twenty-one against twenty only looks like it fits; review time isn't in it. The first move is off the slice, and the setup guide is the obvious candidate, so answer that before anyone asks: it keeps its place because its cold reader has a calendar and contributors need it before the demo. So the cut has to come from how things get built. First click: the cut is the design's own fallback, named in its risk table, so it's a decision the design already half-made. Second: name the next cut now, so that if the midpoint check shows you behind, the decision is already made and nobody argues about it under pressure. Third: the slice survived both.");

  // 13 Write it down — live PR
  s = mk(); s.background = { color: C.white };
  header(s, "Write it where the design lives · live", "A cut that changes the design is a design change");
  s.addText("Prop Loft · docs/design.md §6, in the pull request", { x: 0.6, y: 1.85, w: 6.9, h: 0.35, color: C.slate, fontFace: F.body, fontSize: 15, bold: true, margin: 0 });
  codeBlock(s, 0.6, 2.25, 6.9, 4.45, [
    ["Decision: plain forms for the MVP,", C.amber],
    ["HTMX later", C.amber],
    "",
    ["+ Chosen: server-rendered forms with", C.codeAdd],
    ["  full-page reloads", C.codeAdd],
    ["+ Alternative: HTMX partial updates", C.codeAdd],
    ["+ Why: the first milestone didn't fit", C.codeAdd],
    ["+ Evidence: the Week 9 sizing", C.codeAdd],
    ["+ What would change our mind: slow", C.codeAdd],
    ["  reloads on the shop's wifi", C.codeAdd],
    "",
    ["- Django, HTMX for partial updates, ...", C.codeDel]
  ], {}, 14.5);
  const prSteps = [
    ["Push the branch", "docs/design-plain-forms"],
    ["Open the PR", "Title: the commit subject, exactly"],
    ["Show Files changed", "§6, §4's row, §7's risk, the history"],
    ["Post the self-review", "One maintainer: say so, in writing"],
    ["Squash and merge", "Then a note on the checkout-form issue"]
  ];
  for (let i = 0; i < prSteps.length; i++) {
    const y = 1.95 + i * 0.97;
    card(s, 7.75, y, 4.95, 0.85, C.cardBg);
    s.addShape(pres.shapes.OVAL, { x: 7.92, y: y + 0.17, w: 0.5, h: 0.5, fill: { color: C.teal } });
    s.addText(String(i + 1), { x: 7.92, y: y + 0.17, w: 0.5, h: 0.5, color: C.white, fontFace: F.head, fontSize: 17, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText([
      { text: prSteps[i][0], options: { bold: true, color: C.ink, breakLine: true } },
      { text: prSteps[i][1], options: { color: C.slate, fontSize: 15 } }
    ], { x: 8.6, y, w: 4.0, h: 0.85, fontFace: F.body, fontSize: 16.5, valign: "middle", margin: 0 });
  }
  footer(s);
  s.addNotes("About three minutes, live; the outline's run sheet, part A, has every command. Push the prepared branch, open the PR in the browser so they see the template fill, and keep the title exactly as the commit subject. In Files changed, point at the decision's shape: chosen, alternative, why, evidence, what would change our mind. Post the self-review, squash-merge, then comment on the checkout-form issue that its size changed because the design did.");

  // 14 M2 check
  s = mk(); s.background = { color: C.white };
  header(s, "And the second milestone?", "Coarse sizes, same budget: 19 of 20");
  const m2 = [
    ["Filter by category and size", "S"], ["Say so when a search finds nothing", "XS"], ["Record a return", "S"],
    ["List overdue items", "M"], ["Add an item from a phone", "M"], ["Attach a photo", "M"], ["Test iPhone photos (HEIC)", "S"]
  ];
  for (let i = 0; i < m2.length; i++) {
    const col = i < 4 ? 0 : 1, row = i < 4 ? i : i - 4;
    const x = 0.6 + col * 3.95, y = 1.95 + row * 0.72;
    card(s, x, y, 3.75, 0.6, C.cardBg);
    s.addText(m2[i][0], { x: x + 0.2, y, w: 2.75, h: 0.6, color: C.ink, fontFace: F.body, fontSize: 15, bold: true, valign: "middle", margin: 0 });
    s.addText(m2[i][1], { x: x + 2.95, y, w: 0.65, h: 0.6, color: C.tealDk, fontFace: F.head, fontSize: 17, bold: true, align: "center", valign: "middle", margin: 0 });
  }
  card(s, 8.6, 1.95, 4.1, 2.76, C.navy, REVEAL(1));
  s.addText([
    { text: "Fits, with an hour to spare", options: { bold: true, color: C.amber, breakLine: true } },
    { text: "and no room for M1 to slip into it. So name M2's next cut too: filters go to the roadmap.", options: { color: C.white, fontSize: 16 } }
  ], { x: 8.9, y: 1.95, w: 3.55, h: 2.76, fontFace: F.body, fontSize: 18, valign: "middle", margin: 0, lineSpacingMultiple: 1.05, ...REVEAL(1) });
  bar(s, 5.0, 1.55, C.amberBg, "Two people are hiding in M2.", "The add-item form is designed with the wardrobe lead, and the iPhone test needs a borrowed iPhone. Ask them now, not when the issue comes up.", 2);
  s.addText("The empty-search issue is a good first issue, but it's counted anyway: a contributor may not come.", { x: 0.6, y: 6.7, w: 12.1, h: 0.3, color: C.slate, fontFace: F.body, fontSize: 15, italic: true, margin: 0 });
  footer(s);
  s.addNotes("Ninety seconds. M2 only needs coarse sizes today, but the check still matters: nineteen of twenty means no slack for anything M1 doesn't finish. First click: so the next cut is named here too. Second click: the dependencies on people. A co-design session and a borrowed phone have calendars that aren't yours. The italic line: don't count on a contributor to do your good first issues; plan as if nobody comes.");

  // 15 Workshop: estimate your M1
  s = mk(); s.background = { color: C.navy };
  darkHeader(s, "Workshop · 11 min", "Size your first milestone, then check that it fits");
  const est = [
    ["1", "Add a Size field", "Board ⋯ → Settings → + New field → Single select, XS to XL. Or your own scheme, with its reason in CONTRIBUTING."],
    ["2", "Size silently, reveal together", "Talk only about the disagreements. Solo: trade with your review partner and size each other's cold."],
    ["3", "Question every L, split every XL", "An L: split it, or schedule it first?"],
    ["4", "Tally against your budget", "Sheet boxes 2 and 3. If it doesn't fit, cut now (box 5), then name your next cut."]
  ];
  for (let i = 0; i < est.length; i++) {
    const y = 1.95 + i * 1.0;
    card(s, 0.6, y, 12.1, 0.88, C.navy2);
    s.addShape(pres.shapes.OVAL, { x: 0.8, y: y + 0.19, w: 0.5, h: 0.5, fill: { color: C.amber } });
    s.addText(est[i][0], { x: 0.8, y: y + 0.19, w: 0.5, h: 0.5, color: C.navy, fontFace: F.head, fontSize: 17, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(est[i][1], { x: 1.5, y, w: 3.6, h: 0.88, color: C.white, fontFace: F.body, fontSize: 17.5, bold: true, valign: "middle", margin: 0 });
    s.addText(est[i][2], { x: 5.1, y, w: 7.4, h: 0.88, color: "CFE0E9", fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0 });
  }
  card(s, 0.6, 6.0, 12.1, 0.8, C.amber);
  s.addText("The cut moves, in order: off the slice first · take a fallback · shrink the criteria · defer to the roadmap", { x: 0.95, y: 6.0, w: 11.4, h: 0.8, color: C.navy, fontFace: F.body, fontSize: 16.5, bold: true, valign: "middle", margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("Eleven minutes; keep time out loud. Most of you are solo, so pair up with your review partner now: size your own milestone, then size theirs from the text alone, and compare. Where a partner can't size an issue, fix its acceptance criteria. Circulate to every pair. Push anyone whose milestone obviously doesn't fit to cut before they leave the table, starting with what's off the slice.");

  // 16 Sequencing heuristics
  s = mk(); s.background = { color: C.white };
  header(s, "Sequencing", "Five rules, strongest first");
  const rules = [
    [FA.FaRoute, "Slice first", "The one end-to-end path the demo walks, walkable as early as possible, then widened."],
    [FA.FaProjectDiagram, "Dependencies", "Only the real edges. Write each as \"Needs …\" in the issue; the order follows."],
    [FA.FaExclamationTriangle, "Risk early", "The scariest issue goes first, while there's still time for it to be wrong."],
    [FA.FaUserClock, "People are dependencies", "A cold reader, a user to design with, a borrowed phone. Ask now; date it."],
    [FA.FaCodeBranch, "Stagger the reviews", "Two big pull requests in review at once stall a small project."]
  ];
  for (let i = 0; i < rules.length; i++) {
    const y = 1.95 + i * 0.95;
    card(s, 0.6, y, 12.1, 0.82, C.cardBg, REVEAL(i + 1));
    await iconCircle(s, rules[i][0], 0.85, y + 0.13, 0.56, C.teal, "FFFFFF", REVEAL(i + 1));
    s.addText(rules[i][1], { x: 1.65, y, w: 3.4, h: 0.82, color: C.ink, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0, ...REVEAL(i + 1) });
    s.addText(rules[i][2], { x: 5.0, y, w: 7.5, h: 0.82, color: C.ink, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0, ...REVEAL(i + 1) });
  }
  footer(s);
  s.addNotes("Three minutes, one click per rule. Slice first: the path from Session 12's traced flow, user interface to logic to data and back. Dependencies: draw only the edges that really block; most issues don't block each other. Risk early: a spike may already have de-risked it. People: their calendars aren't yours. Reviews: solo, your review partner is your only outside reviewer, so stagger harder.");

  // 17 Prop Loft's sequence
  s = mk(); s.background = { color: C.white };
  header(s, "Prop Loft's order", "Ready holds what can start now. Backlog's top is next.");
  const colsQ = [
    ["In progress", [["1", "Search items by name"]], C.cardBg],
    ["Ready", [["2", "Record checkouts"], ["3", "Show an item's detail page"], ["·", "Write a setup guide (alongside)"]], C.cardBg],
    ["Backlog, top", [["4", "Show who has an item"], ["5", "Check an item out"]], C.cardBg]
  ];
  for (let i = 0; i < 3; i++) {
    const x = 0.6 + i * 4.15;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.95, w: 3.8, h: 3.3, fill: { color: colsQ[i][2] }, line: { type: "none" }, rectRadius: 0.08 });
    s.addText(colsQ[i][0], { x: x + 0.2, y: 2.02, w: 3.4, h: 0.5, color: C.tealDk, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
    for (let j = 0; j < colsQ[i][1].length; j++) {
      const y = 2.62 + j * 0.85;
      card(s, x + 0.15, y, 3.5, 0.72, C.white);
      s.addShape(pres.shapes.OVAL, { x: x + 0.27, y: y + 0.13, w: 0.46, h: 0.46, fill: { color: colsQ[i][1][j][0] === "·" ? C.slate : C.teal } });
      s.addText(colsQ[i][1][j][0], { x: x + 0.27, y: y + 0.13, w: 0.46, h: 0.46, color: C.white, fontFace: F.head, fontSize: 16, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(colsQ[i][1][j][1], { x: x + 0.85, y, w: 2.7, h: 0.72, color: C.ink, fontFace: F.body, fontSize: 15, valign: "middle", margin: 0 });
    }
  }
  card(s, 0.6, 5.45, 5.95, 1.35, C.strongBg, REVEAL(1));
  s.addText([
    { text: "After 4, the slice walks: ", options: { bold: true, color: C.green } },
    { text: "search, open, \"out to Sam, due Dec 5,\" with the checkout entered in the admin. That's the skateboard.", options: { color: C.ink } }
  ], { x: 0.9, y: 5.45, w: 5.4, h: 1.35, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0, lineSpacingMultiple: 1.03, ...REVEAL(1) });
  card(s, 6.75, 5.45, 5.95, 1.35, C.amberBg, REVEAL(2));
  s.addText([
    { text: "Why the model is second: ", options: { bold: true, color: C.tealDk } },
    { text: "with HTMX cut, it's the riskiest thing left, and two issues need it.", options: { color: C.ink } }
  ], { x: 7.05, y: 5.45, w: 5.4, h: 1.35, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0, lineSpacingMultiple: 1.03, ...REVEAL(2) });
  footer(s);
  s.addNotes("Two minutes. Ready means nothing it depends on is unfinished, so issues 4 and 5 wait at the top of Backlog until the model merges; the order spans both columns. The setup guide runs alongside, and its cold reader gets asked today. First click: after step 4, the slice already walks, using the admin. Second: the model goes second because it's both the risk and the root of two edges. The form PR opens only after it merges.");

  // 18 Skateboard vs broad-shallow
  s = mk(); s.background = { color: C.white };
  header(s, "Walkable at every stage", "The skateboard, not the pile of parts");
  card(s, 0.6, 1.95, 5.95, 3.55, C.weakBg);
  await iconCircle(s, FA.FaLayerGroup, 0.9, 2.15, 0.62, C.coral);
  s.addText("Broad and shallow", { x: 1.7, y: 2.15, w: 4.6, h: 0.62, color: C.coral, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
  s.addText("A search page, a detail page, and a checkout form, all styled, with no checkout model behind them. Every screen exists; nothing works end to end. It demos badly and proves nothing.", { x: 0.9, y: 2.95, w: 5.35, h: 2.4, color: C.ink, fontFace: F.body, fontSize: 16, valign: "top", margin: 0, lineSpacingMultiple: 1.04 });
  card(s, 6.75, 1.95, 5.95, 3.55, C.strongBg, REVEAL(1));
  await iconCircle(s, FA.FaSkating, 7.05, 2.15, 0.62, C.green, "FFFFFF", REVEAL(1));
  s.addText("A thin slice", { x: 7.85, y: 2.15, w: 4.6, h: 0.62, color: C.green, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0, ...REVEAL(1) });
  s.addText("Search, open, see who has it, check it out: plain pages, no photos, no styling. A volunteer could use it today. Each later issue widens something that already works.", { x: 7.05, y: 2.95, w: 5.35, h: 2.4, color: C.ink, fontFace: F.body, fontSize: 16, valign: "top", margin: 0, lineSpacingMultiple: 1.04, ...REVEAL(1) });
  bar(s, 5.75, 1.0, C.navy, "Kniberg's point:", "each stage is something a person can use and learn from. Plain isn't the same as shoddy.", 2);
  footer(s);
  s.addNotes("Ninety seconds, tied to the Kniberg reading. Left is the trap: every screen built, nothing wired, so the demo is a slideshow. Click: the slice has fewer pieces, all connected, and it demos itself. Second click: the caveat people miss in the skateboard picture. It isn't permission to do sloppy work; it's about delivering something usable at every stage so you learn something real from each one.");

  // 19 The slice statement
  s = mk(); s.background = { color: C.white };
  header(s, "The slice statement", "One sentence: the demo script and the exit test");
  card(s, 0.6, 1.95, 12.1, 1.35, C.cardBg);
  s.addText([
    { text: "On the demo day we will demo: ", options: { color: C.slate } },
    { text: "[user]", options: { color: C.tealDk, bold: true } },
    { text: " does ", options: { color: C.slate } },
    { text: "[end-to-end action]", options: { color: C.tealDk, bold: true } },
    { text: " and sees ", options: { color: C.slate } },
    { text: "[result]", options: { color: C.tealDk, bold: true } },
    { text: ".", options: { color: C.slate } }
  ], { x: 0.95, y: 1.95, w: 11.4, h: 1.35, fontFace: F.body, fontSize: 22, valign: "middle", margin: 0 });
  s.addText("Prop Loft · M1's milestone description", { x: 0.6, y: 3.5, w: 12.1, h: 0.35, color: C.slate, fontFace: F.body, fontSize: 15, bold: true, margin: 0, ...REVEAL(1) });
  card(s, 0.6, 3.9, 12.1, 1.55, C.navy, REVEAL(1));
  s.addText("On Nov 18 we will demo: a wardrobe volunteer searches \"waistcoat,\" opens the men's size M waistcoat, checks it out to an actor for the fall show, due back Dec 5, and sees it marked out to that actor.", { x: 0.95, y: 3.9, w: 11.4, h: 1.55, color: C.white, fontFace: F.head, fontSize: 20, italic: true, valign: "middle", margin: 0, lineSpacingMultiple: 1.06, ...REVEAL(1) });
  bar(s, 5.7, 1.05, C.amber, null, "Specific enough to rehearse: a real search term, a real item, a real date. If you can't rehearse it, it isn't done.", 2);
  footer(s);
  s.addNotes("Ninety seconds. The format first; then click for Prop Loft's. Notice how specific it is: you could rehearse it tonight, and on demo day it's literally the script. It also defines the end of M1: when that sentence is true on main, the milestone's job is done. Second click. It goes in the first milestone's description, and the issues on its path get the slice label. That's in a minute, live.");

  // 20 Live board steps
  s = mk(); s.background = { color: C.white };
  header(s, "On the board · live", "Five changes, then your turn");
  const boardSteps = [
    ["Size field", "⋯ → Settings → + New field → Single select: XS, S, M, L, XL"],
    ["Sizes", "Fill them in from a table view; it's faster than opening each card"],
    ["slice label", "Create it, then put it on the issues the demo walks, and only those"],
    ["Order", "Ready top to bottom in sequence; what's blocked waits at the top of Backlog"],
    ["Slice statement", "Milestones → M1 → Edit: replace the description with the sentence"]
  ];
  for (let i = 0; i < boardSteps.length; i++) {
    const y = 1.95 + i * 0.86;
    card(s, 0.6, y, 12.1, 0.76, C.cardBg);
    s.addShape(pres.shapes.OVAL, { x: 0.8, y: y + 0.13, w: 0.5, h: 0.5, fill: { color: C.teal } });
    s.addText(String(i + 1), { x: 0.8, y: y + 0.13, w: 0.5, h: 0.5, color: C.white, fontFace: F.head, fontSize: 18, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(boardSteps[i][0], { x: 1.5, y, w: 3.0, h: 0.76, color: C.tealDk, fontFace: F.body, fontSize: 17, bold: true, valign: "middle", margin: 0 });
    s.addText(boardSteps[i][1], { x: 4.5, y, w: 8.0, h: 0.76, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0 });
  }
  s.addText("The Size field step is in Canvas → Course Resources → Setting Up Your Board, §5.", { x: 0.6, y: 6.32, w: 12.1, h: 0.5, color: C.slate, fontFace: F.body, fontSize: 15, italic: true, valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("About four minutes, live on Prop Loft; the run sheet, part B, has the sizes table and the exact statement. Use the Plan table view for sizes. Leave the setup guide off the slice label: it's in M1 but not on the demo's path, and that distinction is the point. When you reorder, say out loud why the blocked issues wait in Backlog. Leave this slide up while they work.");

  // 21 Workshop: order + commit
  s = mk(); s.background = { color: C.navy };
  darkHeader(s, "Workshop · 13 min", "Order your first milestone and commit the slice");
  const ord = [
    ["Order it", "Ready in sequence; blocked issues at the top of Backlog; \"Needs …\" written into each issue that has one"],
    ["Label the slice", "Create slice; put it on the issues the demo walks"],
    ["Owners and people", "Assign the first week's issues; ask anyone you depend on, today"],
    ["Write the sentence", "The slice statement, in your first milestone's description"]
  ];
  for (let i = 0; i < ord.length; i++) {
    const y = 1.95 + i * 0.92;
    card(s, 0.6, y, 12.1, 0.8, C.navy2);
    s.addText(ord[i][0], { x: 0.9, y, w: 3.2, h: 0.8, color: C.white, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
    s.addText(ord[i][1], { x: 4.1, y, w: 8.4, h: 0.8, color: "CFE0E9", fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0 });
  }
  card(s, 0.6, 5.75, 12.1, 1.0, C.amber);
  s.addText([
    { text: "I'll ask:  ", options: { bold: true } },
    { text: "If the demo were tomorrow, what breaks first? That issue goes earlier." }
  ], { x: 0.95, y: 5.75, w: 11.4, h: 1.0, color: C.navy, fontFace: F.body, fontSize: 18, valign: "middle", margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("Thirteen minutes. Circulate with the one question. For Prop Loft the honest answer is that the checkout form doesn't exist yet, and the order's answer is that the admin carries the slice until it does; look for the same reasoning in theirs. Read each slice statement back to its author: could you rehearse it? Anyone with a person dependency should send the ask before they leave the room.");

  // 22 CP8 check
  s = mk(); s.background = { color: C.white };
  header(s, "CP8 · before you submit tonight", "Check your board against Prop Loft's");
  const cp8 = [
    "Milestones dated, M1 and M2",
    "Epics, with their issues as sub-issues",
    "M1 sized, ordered, and the slice labeled",
    "The slice statement on M1",
    "The fit check done, and the cut made if needed",
    "good first issue × 2–3, each with Where to start",
    "Definition of done revisited in your git standards",
    "docs/roadmap.md: past December, and the cut said out loud"
  ];
  for (let i = 0; i < cp8.length; i++) {
    const x = 0.6 + (i % 2) * 6.15, y = 1.95 + Math.floor(i / 2) * 0.88;
    card(s, x, y, 5.95, 0.76, C.cardBg);
    await iconCircle(s, FA.FaCheck, x + 0.2, y + 0.15, 0.46, C.teal);
    s.addText(cp8[i], { x: x + 0.85, y, w: 4.95, h: 0.76, color: C.ink, fontFace: F.body, fontSize: 16, bold: true, valign: "middle", margin: 0 });
  }
  bar(s, 5.7, 1.05, C.amber, null, "Submit your public board's URL. Open it in a logged-out window first: a private board can't be graded.");
  footer(s);
  s.addNotes("Five minutes. Read the list and have students tick it against their own board, with Prop Loft's board open beside it as the model; it now shows sizes, the slice label, the order, and the statement, all made live today. The bottom line is the most common way to lose CP8 points: the board is still private. Have everyone open their board URL in a private window before they leave.");

  // 23 Wrap
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: -1.3, y: 5.2, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaTshirt, 0.9, 1.15, 0.85, C.amber, C.navy);
  s.addText("Sizing surfaces assumptions. The fit check makes you cut while it's cheap. The order protects the slice.", { x: 0.9, y: 2.15, w: 11.9, h: 1.15, color: C.white, fontFace: F.head, fontSize: 25, bold: true, italic: true, margin: 0, lineSpacingMultiple: 1.06 });
  s.addText("BEFORE MONDAY, NOV 9", { x: 0.92, y: 3.5, w: 11, h: 0.35, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText([
    { text: "Start the first slice issue; have it in progress before Monday", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "Send every ask to a person you depend on, with a date", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "Monday: what must v1 prove, and a method for debugging. Kniberg carries over.", options: { bullet: { indent: 16 } } }
  ], { x: 0.95, y: 3.95, w: 11.7, h: 1.85, color: "CBD8E6", fontFace: F.body, fontSize: 17, valign: "top", margin: 0 });
  card(s, 0.6, 5.95, 12.1, 0.8, C.amber);
  s.addText("CP8 Project Plan & Roadmap is due end of day today. Submit your public board's URL.", { x: 0.9, y: 5.95, w: 11.5, h: 0.8, color: C.navy, fontFace: F.body, fontSize: 16, bold: true, align: "center", valign: "middle", margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("Close in a minute or two. Say the one-liner. The slice statement is now the progress-demo script, and the next cut is already decided, so the midpoint check next Wednesday is a yes-or-no question: is the skateboard walking? Monday is MVP thinking and debugging, right before the heaviest build fortnight. Keep the Fit Check Sheet; it's a working copy, not a turn-in.");

  const OUT = "Session18-SizeFitOrder.pptx";
  await pres.writeFile({ fileName: OUT });
  console.log("WROTE", PAGE, "slides");
  const anim = await require("./add-animations.js").addAnimations(OUT);
  if (anim.length) console.log("ANIMATED", anim.join("; "));
  try {
    const { verifyDeck, reportText } = require("./verify-deck.js");
    console.log(reportText(await verifyDeck(OUT)));
  } catch (e) { console.warn("verify-deck skipped:", e.message); }
}
build().catch(e => { console.error(e); process.exit(1); });
