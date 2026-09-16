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

const pres = new pptxgen();
pres.defineLayout({ name: "W", width: 13.3, height: 7.5 });
pres.layout = "W"; pres.author = "CS 301R";
pres.title = "CS 301R — Session 10 — Pitch Day";

// Slides built but hidden in the deck (skipped in slideshow, kept for later terms).
// Fall 2026 has four students, so the pitch-order, between-pitches, and anchor-reveal
// slides aren't needed. Empty this set for a full-size class.
const HIDDEN = new Set(["pitch-order", "between-pitches", "anchor-reveal"]);

let PAGE = 0;
function mk() { PAGE++; return pres.addSlide(); }
function footer(slide, col) {
  const c = col || C.slate;
  slide.addText("CS 301R · Session 10 · Pitch Day", { x: 7.3, y: 7.04, w: 5.4, h: 0.3, align: "right", color: c, fontFace: F.body, fontSize: 10, margin: 0 });
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

// A dark slide header, for the in-room slides that stay up while people work.
function darkHeader(s, kicker, title) {
  s.addShape(pres.shapes.OVAL, { x: 11.4, y: -1.3, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  s.addShape(pres.shapes.OVAL, { x: 0.62, y: 0.6, w: 0.15, h: 0.15, fill: { color: C.amber } });
  s.addText(kicker.toUpperCase(), { x: 0.87, y: 0.5, w: 11.5, h: 0.34, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText(title, { x: 0.6, y: 0.9, w: 12.1, h: 0.8, color: C.white, fontFace: F.head, fontSize: 32, bold: true, margin: 0 });
}
async function workSlide(kicker, title, subtitle, steps, band) {
  const s = mk(); s.background = { color: C.navy };
  darkHeader(s, kicker, title);
  s.addText(subtitle, { x: 0.62, y: 1.78, w: 12, h: 0.4, color: "CFE0E9", fontFace: F.body, fontSize: 16, italic: true, margin: 0 });
  const n = steps.length;
  const gap = 0.14, top = 2.35, bottom = band ? 5.75 : 6.55;
  const h = (bottom - top - gap * (n - 1)) / n;
  for (let i = 0; i < n; i++) {
    const y = top + i * (h + gap);
    card(s, 0.6, y, 12.1, h, "1E3352");
    s.addShape(pres.shapes.OVAL, { x: 0.85, y: y + (h - 0.5) / 2, w: 0.5, h: 0.5, fill: { color: C.amber } });
    s.addText(String(i + 1), { x: 0.85, y: y + (h - 0.5) / 2, w: 0.5, h: 0.5, color: C.navy, fontFace: F.head, fontSize: 20, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(steps[i][0], { x: 1.55, y, w: steps[i][1] ? 9.4 : 10.9, h, color: C.white, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.03 });
    if (steps[i][1]) s.addText(steps[i][1], { x: 11.1, y, w: 1.4, h, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, align: "right", valign: "middle", margin: 0 });
  }
  if (band) {
    card(s, 0.6, 5.95, 12.1, 0.8, C.amber);
    s.addText(band, { x: 1.0, y: 5.95, w: 11.3, h: 0.8, color: C.navy, fontFace: F.body, fontSize: 15, bold: true, valign: "middle", margin: 0 });
  }
  footer(s, "7E92A8");
  return s;
}
// An empty, typeable slot — click into it in PowerPoint and type on the day. The single
// space carries the formatting, so typed text comes out white at a readable size.
function slot(s, x, y, w, h, extra) {
  s.addText(" ", { shape: pres.shapes.ROUNDED_RECTANGLE, x, y, w, h, fill: { color: "1E3352" }, line: { color: "3A5578", width: 1, dashType: "dash" }, rectRadius: 0.08,
    color: C.white, fontFace: F.body, fontSize: 22, bold: true, valign: "middle", margin: [18, 18, 0, 0], ...extra });
}

async function build() {
  let s;

  // 1 Title
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: 10.9, y: -1.4, w: 4.2, h: 4.2, fill: { color: "1C3252" } });
  s.addShape(pres.shapes.OVAL, { x: 12.0, y: 5.1, w: 3.0, h: 3.0, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaFlagCheckered, 0.9, 1.45, 1.0, C.amber, C.navy);
  s.addText("CS 301R · SOFTWARE ENGINEERING STUDIO I", { x: 0.92, y: 2.75, w: 11, h: 0.35, color: "9FB4C7", fontFace: F.body, fontSize: 15, bold: true, charSpacing: 2, margin: 0 });
  s.addText("Pitch Day", { x: 0.9, y: 3.15, w: 12.1, h: 1.3, color: C.white, fontFace: F.head, fontSize: 42, bold: true, margin: 0 });
  s.addText([
    { text: "Session 10 — present, evaluate, select", options: { color: C.amber, bold: true, breakLine: true } },
    { text: "Wednesday, October 7, 2026", options: { color: "9FB4C7" } }
  ], { x: 0.92, y: 4.7, w: 11, h: 0.9, fontFace: F.body, fontSize: 19, margin: 0, lineSpacingMultiple: 1.2 });
  s.addNotes("Hand out evaluation half-sheets at the door — one per pitch each student will watch, plus a spare. Check slides are loaded before the first minute is gone; no dongle fiddling once the clock starts. Open with one line: this is the hinge of the course, individual work ends today, and everyone in the room has two jobs — pitch well and evaluate honestly. Keep this slide up for under a minute; the day belongs to the pitches.");

  // 2 Run of show
  s = mk(); s.background = { color: C.white };
  header(s, "Run of show — 4 min", "Two jobs today: pitch well, evaluate honestly");
  const run = [
    [FA.FaSlidersH, "Calibrate", "4 min"],
    [FA.FaMicrophone, "Pitches", "~50 min"],
    [FA.FaBalanceScale, "Selection", "8 min"],
    [FA.FaListOl, "Preferences", "7 min"],
    [FA.FaCalendarCheck, "What's next", "3 min"]
  ];
  for (let i = 0; i < run.length; i++) {
    const x = 0.6 + i * 2.46, w = 2.22;
    card(s, x, 2.0, w, 1.95, i === 1 ? C.navy : C.cardBg);
    await iconCircle(s, run[i][0], x + (w - 0.64) / 2, 2.22, 0.64, i === 1 ? C.amber : C.teal, i === 1 ? C.navy : "FFFFFF");
    s.addText(run[i][1], { x: x + 0.1, y: 2.98, w: w - 0.2, h: 0.45, color: i === 1 ? C.white : C.ink, fontFace: F.body, fontSize: 18, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(run[i][2], { x: x + 0.1, y: 3.42, w: w - 0.2, h: 0.4, color: i === 1 ? "CFE0E9" : C.slate, fontFace: F.body, fontSize: 15, align: "center", valign: "middle", margin: 0 });
  }
  card(s, 0.6, 4.25, 5.95, 1.5, C.cardBg);
  s.addText([
    { text: "Evaluate today\n", options: { color: C.tealDk, bold: true, fontSize: 18 } },
    { text: "A pitch is a live event, and the room's reaction is real signal. You score every pitch but your own.", options: { color: C.ink } }
  ], { x: 0.92, y: 4.25, w: 5.3, h: 1.5, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  card(s, 6.75, 4.25, 5.95, 1.5, C.strongBg);
  s.addText([
    { text: "Commit Monday\n", options: { color: C.tealDk, bold: true, fontSize: 18 } },
    { text: "You leave with a private, ranked preference — not a team. Teams wait for the proposals.", options: { color: C.ink } }
  ], { x: 7.07, y: 4.25, w: 5.3, h: 1.5, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  card(s, 0.6, 5.95, 12.1, 0.8, C.amber);
  s.addText("Individual work ends today. Everything since Week 1 gets its six minutes.", { x: 0.9, y: 5.95, w: 11.5, h: 0.8, color: C.navy, fontFace: F.body, fontSize: 16, bold: true, align: "center", valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("Walk the five blocks in one breath so nobody wonders what happens after the pitches. The split is the idea to land: evaluating is live, committing waits for the documents — the same diverge-then-converge discipline the course has asked for since Week 1, applied to the biggest decision of the semester. The pitch block is sized for about eight pitches. With a smaller class the block runs short — spend the slack on longer, better Q&A rather than ending early; with a larger one, the split plan announced in Session 9 applies. ~2 min.");

  // 3 Ground rules
  s = mk(); s.background = { color: C.white };
  header(s, "Ground rules", "How the next fifty minutes run");
  const rules = [
    [FA.FaStopwatch, "The clock is real", "6–8 min pitch, 2–3 min Q&A, visible timer. At time, you stop — mid-sentence if needed."],
    [FA.FaPenFancy, "Score during the Q&A", "Finish your sheet before the next pitch begins. Scores written later are scores of a memory."],
    [FA.FaUserSecret, "Keep scores to yourself", "No comparing between pitches. Independent scores are the only useful ones."],
    [FA.FaComments, "Honest, kind questions", "Ask what a skeptical contributor would ask. Aim at the idea, never the person."]
  ];
  for (let i = 0; i < rules.length; i++) {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 0.6 + col * 6.15, y = 2.0 + row * 2.2, w = 5.95, h = 2.0;
    card(s, x, y, w, h, C.cardBg);
    await iconCircle(s, rules[i][0], x + 0.3, y + 0.3, 0.64, C.teal);
    s.addText(rules[i][1], { x: x + 1.15, y: y + 0.3, w: w - 1.4, h: 0.64, color: C.ink, fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0 });
    s.addText(rules[i][2], { x: x + 1.15, y: y + 1.0, w: w - 1.4, h: 0.85, color: C.slate, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0, lineSpacingMultiple: 1.04 });
  }
  footer(s);
  s.addNotes("Say each rule once and move on — they were announced in Session 9, so this is a reminder, not new material. The clock rule is the one to enforce from the first pitch: if the first presenter runs long, every later presenter learns the limit is soft. Cut Q&A before you ever cut a pitch. The keep-your-scores rule matters more than it sounds; two students comparing numbers between pitches quietly turn seven independent evaluations into one. You'll ask one question per pitch yourself if the room doesn't.");

  // 4 Calibration
  s = mk(); s.background = { color: C.white };
  header(s, "Calibrate — the sheet in your hand", "Score the idea as pitched: 1 weak · 2 adequate · 3 strong");
  const crit = [
    ["Value / real need", "A specific, reachable userbase with an evidenced, felt need"],
    ["Feasibility", "Risks named honestly; scope, stack, and mitigation credible"],
    ["Richness / breadth", "Several engineering dimensions; room for a team to grow into"],
    ["Scope realism", "The MVP plausibly fits the real build window — roughly five weeks"],
    ["Extensibility", "Others could credibly keep building on it"],
    ["Maintainability", "A tractable stack the team could own, explain, and support"],
    ["Preparedness", "Knows the idea's weaknesses; answered questions honestly"]
  ];
  s.addText("CRITERION", { x: 0.9, y: 1.9, w: 3.2, h: 0.3, color: C.slate, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 1, margin: 0 });
  s.addText("WHAT A 3 LOOKS LIKE", { x: 4.2, y: 1.9, w: 8, h: 0.3, color: C.slate, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 1, margin: 0 });
  for (let i = 0; i < crit.length; i++) {
    const y = 2.25 + i * 0.52;
    if (i % 2 === 0) s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y, w: 12.1, h: 0.52, fill: { color: C.cardBg }, line: { type: "none" } });
    s.addText(crit[i][0], { x: 0.9, y, w: 3.2, h: 0.52, color: C.ink, fontFace: F.body, fontSize: 16.5, bold: true, valign: "middle", margin: 0 });
    s.addText(crit[i][1], { x: 4.2, y, w: 8.3, h: 0.52, color: C.ink, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0 });
  }
  card(s, 0.6, 6.0, 12.1, 0.8, C.navy);
  s.addText([
    { text: "Each criterion on its own.  ", options: { color: C.amber, bold: true } },
    { text: "Score the evidence, not the confidence.  ", options: { color: C.white, bold: true } },
    { text: "No curve — each pitch against the criteria.", options: { color: "CFE0E9" } }
  ], { x: 0.95, y: 6.0, w: 11.4, h: 0.8, fontFace: F.body, fontSize: 15.5, align: "center", valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("These are the same seven criteria students have scored their own ideas against since Week 3, and the same wording as the half-sheet in their hands — say so, because familiarity is what makes the scores comparable. Don't re-teach them; Session 9 did the calibration with the costume-catalog example. Land the three rules in the band. The one that fails most on the day is 'score the evidence': a fluent, confident presenter pulls feasibility scores up whether or not the risks were named. A pitch can be a 3 on value and a 1 on scope realism, and that is exactly the signal selection needs. ~1 min.");

  // 5 The recruiting question
  s = mk(); s.background = { color: C.navy };
  darkHeader(s, "The recruiting question", "\"Would you join this project?\"");
  card(s, 0.6, 1.95, 12.1, 1.35, C.amber);
  await iconCircle(s, FA.FaEye, 0.95, 2.3, 0.65, C.navy, C.amber);
  s.addText("Answer as an outside observer: if you walked in today with no project of your own, looking for something worth a semester — would this be it?", { x: 1.85, y: 1.95, w: 10.5, h: 1.35, color: C.navy, fontFace: F.body, fontSize: 17, bold: true, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
  s.addText("Then write one line of why. The why is what the presenter actually gets:", { x: 0.62, y: 3.5, w: 12, h: 0.45, color: "CFE0E9", fontFace: F.body, fontSize: 16, italic: true, margin: 0 });
  card(s, 0.6, 4.1, 5.95, 1.75, "1E3352", REVEAL(1));
  s.addText([
    { text: "A why about you\n", options: { color: C.coral, bold: true, fontSize: 17 } },
    { text: "\"I already have my own idea.\"  \"I'm committed elsewhere.\"  →  bias, not information.", options: { color: "CFE0E9" } }
  ], { x: 1.0, y: 4.1, w: 5.2, h: 1.75, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.05, ...REVEAL(1) });
  card(s, 6.75, 4.1, 5.95, 1.75, "1E3352", REVEAL(1));
  s.addText([
    { text: "A why about the project\n", options: { color: C.green, bold: true, fontSize: 17 } },
    { text: "\"The domain doesn't grab me.\"  \"I don't believe the scope.\"  →  something they can use.", options: { color: "CFE0E9" } }
  ], { x: 7.15, y: 4.1, w: 5.2, h: 1.75, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.05, ...REVEAL(1) });
  s.addText("Checking \"Yes\" commits you to nothing. \"No\" beside high scores is a consistent answer.", { x: 0.6, y: 6.1, w: 12.1, h: 0.5, color: "9FB4C7", fontFace: F.body, fontSize: 15.5, italic: true, align: "center", margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("Restate the outside-observer rule before the first pitch — the outline asks for it explicitly, because every evaluator is also a presenter and the defensive 'no' is the path of least resistance. Before you click, ask the room: what makes a 'why' line useful to the person who pitched? Take one or two answers, then click to reveal the two cards. The tell is simple: a reason about you is the bias talking; a reason about the project is information. Close on the bottom line — a strong idea that isn't for you is a perfectly honest 'no'. ~1-2 min.");

  // 6 Pitch order
  s = mk(); s.background = { color: C.navy }; s.hidden = HIDDEN.has("pitch-order");
  darkHeader(s, "Drawn at random — just now", "Pitch order");
  for (let i = 0; i < 8; i++) {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 0.6 + col * 6.15, y = 2.0 + row * 1.12, w = 5.95, h = 0.95;
    s.addShape(pres.shapes.OVAL, { x, y: y + 0.17, w: 0.62, h: 0.62, fill: { color: C.amber } });
    s.addText(String(i + 1), { x, y: y + 0.17, w: 0.62, h: 0.62, color: C.navy, fontFace: F.head, fontSize: 22, bold: true, align: "center", valign: "middle", margin: 0 });
    slot(s, x + 0.82, y, w - 0.82, h);
  }
  s.addText("Everyone was ready to go first. Evaluation sheets out — one per pitch you'll watch.", { x: 0.6, y: 6.5, w: 12.1, h: 0.4, color: "9FB4C7", fontFace: F.body, fontSize: 15.5, italic: true, align: "center", margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("Show the order the moment it's drawn — generate it beforehand if you like, but nobody sees it before this slide. Type names straight into the dashed slots (double-click a slot and type), or paste a screenshot of the draw over them; delete slots you don't need. These edits are day-of and aren't in the build script, so a rebuild resets the slide. Say the consequence of a random order out loud one more time: there was no watching two pitches first, which is why everyone rehearsed as though they were first. ~1 min.");

  // 7 Between pitches — holding slide
  s = mk(); s.background = { color: C.navy }; s.hidden = HIDDEN.has("between-pitches");
  darkHeader(s, "Between pitches", "Up next");
  slot(s, 0.6, 1.95, 12.1, 1.1);
  const beats = [
    [FA.FaMicrophone, "Pitch", "6–8 min", "Listen for evidence, not polish."],
    [FA.FaQuestion, "Q&A", "2–3 min", "Score while they answer. Ask the skeptic's question."],
    [FA.FaPenFancy, "Finish your sheet", "30 sec", "Criteria · would you join? · why · two comment lines."]
  ];
  for (let i = 0; i < beats.length; i++) {
    const x = 0.6 + i * 4.1, w = 3.9;
    card(s, x, 3.35, w, 2.55, "1E3352");
    await iconCircle(s, beats[i][0], x + 0.3, 3.62, 0.64, C.amber, C.navy);
    s.addText(beats[i][1], { x: x + 1.12, y: 3.62, w: w - 1.3, h: 0.64, color: C.white, fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0 });
    s.addText(beats[i][2], { x: x + 0.3, y: 4.42, w: w - 0.6, h: 0.5, color: C.amber, fontFace: F.head, fontSize: 24, bold: true, margin: 0 });
    s.addText(beats[i][3], { x: x + 0.3, y: 4.98, w: w - 0.6, h: 0.8, color: "CFE0E9", fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0, lineSpacingMultiple: 1.04 });
  }
  card(s, 0.6, 6.1, 12.1, 0.72, C.amber);
  s.addText("Sheets are finished before the next pitch begins — not at the end of the block.", { x: 0.9, y: 6.1, w: 11.5, h: 0.72, color: C.navy, fontFace: F.body, fontSize: 16, bold: true, align: "center", valign: "middle", margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("The holding slide between pitches — put it up during each transition while the next presenter loads, and type the presenter's name and project into the top slot if you want it on screen. The thirty-second finish is the part that slips: the next presenter starts talking and the previous sheet is abandoned half-done. Hold the room until pens are down. If a pitch runs long, cut its Q&A, never the next pitch. Run your own timer; a TA or volunteer timekeeper holding up a one-minute card is better still.");

  // 8 Selection — how the blend works
  s = mk(); s.background = { color: C.white };
  header(s, "Selection huddle — 8 min", "Three inputs, one decision, made in the room");
  const inputs = [
    [FA.FaClipboardCheck, "Peer scores", "The seven criteria, tallied across every sheet"],
    [FA.FaHandPaper, "Recruiting interest", "\"Would you join?\" counts — and the whys behind them"],
    [FA.FaUserTie, "Instructor judgment", "Against the same criteria — and the final say"]
  ];
  for (let i = 0; i < inputs.length; i++) {
    const y = 1.95 + i * 1.3;
    card(s, 0.6, y, 6.6, 1.12, C.cardBg);
    await iconCircle(s, inputs[i][0], 0.85, y + 0.22, 0.68, C.teal);
    s.addText(inputs[i][1], { x: 1.75, y: y + 0.1, w: 5.3, h: 0.45, color: C.ink, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
    s.addText(inputs[i][2], { x: 1.75, y: y + 0.55, w: 5.3, h: 0.45, color: C.slate, fontFace: F.body, fontSize: 15, valign: "middle", margin: 0 });
  }
  s.addText("→", { x: 7.25, y: 3.1, w: 0.5, h: 0.7, color: C.tealDk, fontFace: F.body, fontSize: 34, bold: true, align: "center", valign: "middle", margin: 0 });
  card(s, 7.8, 1.95, 4.9, 3.72, C.navy);
  await iconCircle(s, FA.FaAnchor, 8.1, 2.25, 0.7, C.amber, C.navy);
  s.addText("Anchor ideas", { x: 9.0, y: 2.25, w: 3.5, h: 0.7, color: C.white, fontFace: F.body, fontSize: 21, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "The projects that can carry a team of ~2–4", options: { breakLine: true, paraSpaceAfter: 10 } },
    { text: "Plus approved solo paths — at solo scope", options: { breakLine: true, paraSpaceAfter: 10 } },
    { text: "Announced before you leave today", options: { color: C.amber, bold: true } }
  ], { x: 8.1, y: 3.15, w: 4.35, h: 2.3, color: "CFE0E9", fontFace: F.body, fontSize: 16, valign: "top", margin: 0, lineSpacingMultiple: 1.04 });
  card(s, 0.6, 5.95, 12.1, 0.85, C.strongBg);
  s.addText([
    { text: "Not selected isn't losing.  ", options: { color: C.tealDk, bold: true } },
    { text: "Choose an anchor to join, bringing what your discovery taught you — or continue solo.", options: { color: C.ink } }
  ], { x: 0.95, y: 5.95, w: 11.4, h: 0.85, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("Collect the sheets and tally at the front — this is why the mechanics were settled Monday. While you tally, keep this slide up so the room sees exactly what's being weighed: peer scores, recruiting interest, and your own judgment against the same criteria, with you holding final say. Say the bottom band plainly and early. Anyone whose idea drew no interest hears it from you, here, briefly and in person — not by inference from a list posted later; that conversation is the reason selection stays in the room. In a small class, or when every founder would rather build their own, the anchor list may simply be every project on an approved solo path — say so without apology; solo is a first-class outcome, and the preference worksheet is still where each student states it.");

  // 9 Anchor ideas — the reveal
  s = mk(); s.background = { color: C.navy }; s.hidden = HIDDEN.has("anchor-reveal");
  darkHeader(s, "Selection", "Today's anchor ideas");
  for (let i = 0; i < 4; i++) {
    const y = 1.95 + i * 0.98;
    await iconCircle(s, FA.FaAnchor, 0.6, y + 0.1, 0.62, C.amber, C.navy, REVEAL(i + 1));
    slot(s, 1.42, y, 11.28, 0.82, REVEAL(i + 1));
  }
  card(s, 0.6, 5.95, 12.1, 0.85, C.amber);
  s.addText("Not on this list? Rank the anchors you'd join — or choose the solo path. Both are real outcomes.", { x: 0.9, y: 5.95, w: 11.5, h: 0.85, color: C.navy, fontFace: F.body, fontSize: 16, bold: true, align: "center", valign: "middle", margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("Type the anchor ideas into the slots before you advance to this slide (title plus founder), then reveal them one click at a time — four slots, four clicks; delete any you don't need, and remember a rebuild resets these typed edits. Reveal in a neutral order, not ranked, so the list doesn't read as a leaderboard. If solo paths were approved, name them too — a slot can hold 'Solo: [project]'. Then the band: founders of ideas not on the list didn't lose; they now choose where their discovery work goes. ~2 min.");

  // 10 Preferences — work slide
  s = await workSlide(
    "Preferences · 7 min · quiet, private",
    "Rank where you'd build",
    "On the Team Preference Worksheet — paper first, then Canvas:",
    [
      ["First, second, and third choice among the anchors — each with one line of why, in criteria language.", "ranked"],
      ["Would you rather continue solo? If yes, the scope you'd cut to for one person.", "solo box"],
      ["One line on what you'd bring to the team you join.", "1 line"],
      ["Copy it into the Canvas assignment by end of day. It stays editable until Sunday night.", "Canvas"]
    ],
    "Private — nobody sees anyone else's. \"My friend is on it\" is not a reason."
  );
  s.addNotes("Hand out the worksheet and hold the room quiet — the pitches are fresh, and that's why this happens now rather than at home. Say why it's ranked rather than a show of hands: rankings let the instructor honor nearly everyone's first or second choice, where hands only record where people happened to be standing. Say twice that the submission is the Canvas assignment, not the paper, and that it's editable through Sunday — changing your mind after reading the proposals is the system working, and nobody sees the edit. Students who expect to go solo still fill it in: the solo box and its scope line are their submission. Check the Canvas submission list Thursday morning; a missing preference is the one thing that stalls Monday.");

  // 11 Why wait for Monday
  s = mk(); s.background = { color: C.white };
  header(s, "Evaluate live, commit deliberately", "Six minutes of pitch vs. the document");
  card(s, 0.6, 1.95, 5.95, 3.7, C.cardBg);
  await iconCircle(s, FA.FaMicrophone, 0.95, 2.2, 0.62, C.teal);
  s.addText("What a pitch tells you", { x: 1.78, y: 2.2, w: 4.6, h: 0.62, color: C.ink, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "Whether the founder can make a case", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 30 } },
    { text: "Whether the room felt the need", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 30 } },
    { text: "How they handle a hard question", options: { bullet: { indent: 16 } } }
  ], { x: 1.0, y: 3.1, w: 5.3, h: 2.3, color: C.ink, fontFace: F.body, fontSize: 18.5, valign: "top", margin: 0 });
  card(s, 6.75, 1.95, 5.95, 3.7, C.navy);
  await iconCircle(s, FA.FaBookOpen, 7.1, 2.2, 0.62, C.amber, C.navy);
  s.addText("What the proposal tells you", { x: 7.93, y: 2.2, w: 4.6, h: 0.62, color: C.white, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "Whether the scope is real — the arithmetic", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 30 } },
    { text: "Whether the stack is one you want to work in", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 30 } },
    { text: "Whether there's something in it you'd build", options: { bullet: { indent: 16 } } }
  ], { x: 7.15, y: 3.1, w: 5.3, h: 2.3, color: "CFE0E9", fontFace: F.body, fontSize: 18.5, valign: "top", margin: 0 });
  card(s, 0.6, 5.95, 12.1, 0.85, C.amber);
  s.addText("Choose where to spend the semester with the document in hand — not with whoever is standing nearest.", { x: 0.9, y: 5.95, w: 11.5, h: 0.85, color: C.navy, fontFace: F.body, fontSize: 16, bold: true, align: "center", valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("This is the reason Pitch Day no longer ends with people sorting into groups on their feet. The pitch is real evidence, but it's evidence about the presenter and the room; scope, stack, and richness are far better judged from the written proposal than from six spoken minutes. Frame it as a work habit, not a course rule: decisions made in the room that should have waited for the document are one of the most common ways teams commit to the wrong thing. The weekend reading is real work, not a formality. ~1 min.");

  // 12 What happens next
  s = mk(); s.background = { color: C.white };
  header(s, "What happens next — 3 min", "From today to your team");
  const next = [
    [FA.FaListOl, "Today", "Anchors announced · preferences into Canvas"],
    [FA.FaBullhorn, "By Thursday evening", "Anchors, tallies, your anonymized comments, and every anchor's proposal"],
    [FA.FaBookOpen, "The weekend", "Read the proposals. Edit your preference if it changed."],
    [FA.FaLock, "Sunday night", "Preferences close"],
    [FA.FaUsers, "Monday, Oct 12", "Teams announced · charters written in class"]
  ];
  for (let i = 0; i < next.length; i++) {
    const x = 0.6 + i * 2.46, w = 2.22, last = i === next.length - 1;
    card(s, x, 1.95, w, 3.1, last ? C.navy : C.cardBg);
    await iconCircle(s, next[i][0], x + (w - 0.64) / 2, 2.17, 0.64, last ? C.amber : C.teal, last ? C.navy : "FFFFFF");
    s.addText(next[i][1], { x: x + 0.12, y: 2.95, w: w - 0.24, h: 0.62, color: last ? C.white : C.ink, fontFace: F.body, fontSize: 16.5, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(next[i][2], { x: x + 0.12, y: 3.6, w: w - 0.24, h: 1.35, color: last ? "CFE0E9" : C.slate, fontFace: F.body, fontSize: 15, align: "center", valign: "top", margin: 0, lineSpacingMultiple: 1.02 });
  }
  card(s, 0.6, 5.3, 12.1, 1.5, C.cardBg);
  await iconCircle(s, FA.FaHandshake, 0.9, 5.7, 0.68, C.teal);
  s.addText([
    { text: "Recruiting before Monday is normal — founders recruit outside meetings.  ", options: { color: C.ink, bold: true } },
    { text: "Two rules: the instructor holds final say, and nobody gets pressured. If a conversation feels like pressure, it is — say so.", options: { color: C.slate } }
  ], { x: 1.85, y: 5.3, w: 10.6, h: 1.5, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
  footer(s);
  s.addNotes("Make the weekend concrete. By Thursday evening Canvas has the anchor ideas, the tallied scores, each presenter's anonymized comments, and the full proposals for every anchor project — so the reading can actually happen. Preferences close Sunday night; teams are announced at the start of Monday's class and charters are written in that session. Also Monday: Phase 3 begins, so point them at the design-doc reading on the Session 11 page. Say the recruiting norms plainly — recruiting is fine, pressure isn't, and the instructor's final say is what keeps a founder from having to turn down a classmate face to face. If every student is going solo, Monday's announcement is short and the charter work becomes a personal working agreement — still worth writing.");

  // 13 Wrap
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: -1.3, y: 5.2, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaFlagCheckered, 0.9, 1.15, 0.85, C.amber, C.navy);
  s.addText("You evaluated live. Now commit deliberately.", { x: 0.9, y: 2.15, w: 11.9, h: 0.95, color: C.white, fontFace: F.head, fontSize: 28, bold: true, italic: true, margin: 0, lineSpacingMultiple: 1.06 });
  s.addText("BEFORE MONDAY, OCT 12", { x: 0.92, y: 3.3, w: 11, h: 0.35, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText([
    { text: "Today: submit your ranked preference in Canvas — editable until Sunday night", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "This weekend: read the anchor proposals (posted by Thursday evening)", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "Before Monday's class: read the assigned design doc — see the Session 11 page", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "Monday: teams announced at the start of class; charters written in class", options: { bullet: { indent: 16 } } }
  ], { x: 0.95, y: 3.75, w: 11.7, h: 1.95, color: "CBD8E6", fontFace: F.body, fontSize: 16, valign: "top", margin: 0 });
  card(s, 0.6, 5.9, 12.1, 0.85, C.amber);
  s.addText("Preferences close Sunday night. One missing preference stalls Monday for everyone.", { x: 0.9, y: 5.9, w: 11.5, h: 0.85, color: C.navy, fontFace: F.body, fontSize: 16, bold: true, align: "center", valign: "middle", margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("Close fast — it has been a long block of listening. Read the four bullets aloud, and say the Sunday deadline twice; a single missing preference is what stalls Monday's announcement. Thank the room for the evaluating as much as the pitching — scoring peers fairly against shared criteria was a graded act of professional judgment today, and the same one they'll use in design review, code review, and the repo audit later in the term. End on the line at the top.");

  const OUT = "Session10-PitchDay.pptx";
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
