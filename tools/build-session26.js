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
pres.title = "CS 301R — Session 26 — The Dry Run";

let PAGE = 0;
function mk() { PAGE++; return pres.addSlide(); }
function footer(slide, col) {
  const c = col || C.slate;
  slide.addText("CS 301R · Session 26 · The Dry Run", { x: 7.3, y: 7.04, w: 5.4, h: 0.3, align: "right", color: c, fontFace: F.body, fontSize: 10, margin: 0 });
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
  const extra = n ? REVEAL(n) : {};
  const dark = fill === C.navy;
  card(s, 0.6, y, 12.1, h, fill, extra);
  const runs = [];
  if (lead) runs.push({ text: lead + "  ", options: { color: dark ? C.amber : (fill === C.amber ? C.navy : C.tealDk), bold: true } });
  runs.push({ text, options: { color: dark ? C.white : (fill === C.amber ? C.navy : C.ink), bold: fill === C.amber } });
  s.addText(runs, { x: 0.95, y, w: 11.4, h, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, lineSpacingMultiple: 1.04, ...extra });
}


// A numbered row: circle with the number, a bold lead, and a line of detail.
function numRow(s, y, h, n, lead, detail, extra, fill) {
  card(s, 0.6, y, 12.1, h, fill || C.cardBg, extra);
  s.addShape(pres.shapes.OVAL, { x: 0.85, y: y + (h - 0.52) / 2, w: 0.52, h: 0.52, fill: { color: C.teal }, ...extra });
  s.addText(String(n), { x: 0.85, y: y + (h - 0.52) / 2, w: 0.52, h: 0.52, color: C.white, fontFace: F.body, fontSize: 18, bold: true, align: "center", valign: "middle", margin: 0, ...extra });
  s.addText([
    { text: lead + "  ", options: { bold: true, color: C.ink } },
    { text: detail, options: { color: C.slate } }
  ], { x: 1.6, y, w: 10.9, h, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, lineSpacingMultiple: 1.04, ...extra });
}

// Two cards side by side, each with a label line, a bold title, and body text.

// Two cards side by side, each with a label line, a bold title, and body text.
function pairCards(s, y, h, items, extras) {
  for (let i = 0; i < items.length; i++) {
    const [label, title, body, fill, labelColor] = items[i];
    const x = 0.6 + i * 6.15, dark = fill === C.navy;
    const extra = (extras && extras[i]) || {};
    card(s, x, y, 5.95, h, fill, extra);
    s.addText(label, { x: x + 0.3, y: y + 0.18, w: 5.4, h: 0.4, color: labelColor, fontFace: F.body, fontSize: 15, bold: true, charSpacing: 2, margin: 0, ...extra });
    s.addText(title, { x: x + 0.3, y: y + 0.6, w: 5.4, h: 0.75, color: dark ? C.white : C.ink, fontFace: F.head, fontSize: 22, bold: true, valign: "top", margin: 0, ...extra });
    s.addText(body, { x: x + 0.3, y: y + 1.4, w: 5.4, h: h - 1.55, color: dark ? "CFE0E9" : C.ink, fontFace: F.body, fontSize: 17, valign: "top", margin: 0, ...extra });
  }
}

// A segment of the per-project timeline: a colored block sized by its minutes.
function segment(s, x, w, y, h, fill, title, mins, sub, dark) {
  s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: fill }, line: { color: C.white, width: 2 } });
  const narrow = w < 1, pad = narrow ? 0.03 : 0.12;
  s.addText([
    { text: title, options: { bold: true, breakLine: true, fontSize: narrow ? 15 : 18 } },
    { text: mins, options: { bold: true, breakLine: !!sub, fontSize: 16, color: dark ? (fill === C.navy ? C.amber : C.white) : C.navy } },
    ...(sub ? [{ text: sub, options: { fontSize: 15 } }] : [])
  ], { x: x + pad, y, w: w - 2 * pad, h, color: dark ? C.white : C.ink, fontFace: F.body, valign: "middle", align: "center", margin: 0 });
}

async function build() {
  let s;

  // 1 Title
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: 10.9, y: -1.4, w: 4.2, h: 4.2, fill: { color: "1C3252" } });
  s.addShape(pres.shapes.OVAL, { x: 12.0, y: 5.1, w: 3.0, h: 3.0, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaStopwatch, 0.9, 1.45, 1.0, C.amber, C.navy);
  s.addText("CS 301R · SOFTWARE ENGINEERING STUDIO I", { x: 0.92, y: 2.75, w: 11, h: 0.35, color: "9FB4C7", fontFace: F.body, fontSize: 15, bold: true, charSpacing: 2, margin: 0 });
  s.addText("The Dry Run", { x: 0.9, y: 3.15, w: 12.1, h: 1.3, color: C.white, fontFace: F.head, fontSize: 42, bold: true, margin: 0 });
  s.addText([
    { text: "Session 26 — the full rehearsal, under Demo Day conditions", options: { color: C.amber, bold: true, breakLine: true } },
    { text: "Monday, December 7, 2026", options: { color: "9FB4C7" } }
  ], { x: 0.92, y: 4.7, w: 11, h: 0.9, fontFace: F.body, fontSize: 19, margin: 0, lineSpacingMultiple: 1.2 });
  s.addNotes("Before class: print the Dry-Run Score Sheet, two pages per student; bring the question bank and a phone stand; set up the projector the way the finals room will be, with a visible countdown timer you can run from your phone or a second window. Write the four project names on slips for the draw. Students arrive performance-ready: slides final, demo running from main, fallback loaded. This deck is mostly a backdrop; the runs are the session.");

  // 2 Today
  s = mk(); s.background = { color: C.white };
  header(s, "Today", "Four full runs, real clock, real questions");
  const plan = [
    [FA.FaRandom, "Framing, and the draw for run order", "4 min"],
    [FA.FaPlay, "Four dry runs, fifteen minutes each", "60 min"],
    [FA.FaListOl, "Debrief: your polish plan", "8 min"],
    [FA.FaRoute, "The last week", "3 min"]
  ];
  for (let i = 0; i < plan.length; i++) {
    const y = 2.0 + i * 0.95;
    const hi = i === 1 || i === 2;
    card(s, 0.6, y, 12.1, 0.8, hi ? C.navy : C.cardBg);
    await iconCircle(s, plan[i][0], 0.88, y + 0.14, 0.52, hi ? C.amber : C.teal, hi ? C.navy : "FFFFFF");
    s.addText(plan[i][1], { x: 1.65, y, w: 9.0, h: 0.8, color: hi ? C.white : C.ink, fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0 });
    s.addText(plan[i][2], { x: 10.6, y, w: 1.8, h: 0.8, color: hi ? C.amber : C.slate, fontFace: F.body, fontSize: 17, bold: true, align: "right", valign: "middle", margin: 0 });
  }
  bar(s, 6.0, 0.8, C.amber, null, "Everyone performs. Everyone scores. Nobody restarts.", null);
  footer(s);
  s.addNotes("Thirty seconds. Four projects at fifteen minutes is sixty minutes, so the framing is short and the clock is strict from the first run; one overrun steals from the last presenter. The debrief matters as much as the runs: the sheets turn into a polish plan before anyone leaves. Draw the run order right after the next slide, out loud, so nobody can say they weren't ready to go first.");

  // 3 Why rehearse under real conditions
  s = mk(); s.background = { color: C.white };
  header(s, "Rehearse under the real conditions", "Skip the hard part and you rehearse something else");
  const rh = [
    [FA.FaTheaterMasks, "Theater", "The dress rehearsal runs in costume, under the lights, straight through."],
    [FA.FaPlane, "Aviation", "Pilots practice the failure in the simulator, so the real one isn't the first."],
    [FA.FaBriefcase, "At work", "A launch review gets a dry run in front of people who will push back."]
  ];
  for (let i = 0; i < 3; i++) {
    const x = 0.6 + i * 4.1;
    card(s, x, 1.95, 3.9, 2.6, C.cardBg);
    await iconCircle(s, rh[i][0], x + 0.3, 2.2, 0.7, C.teal, "FFFFFF");
    s.addText(rh[i][1], { x: x + 0.3, y: 3.0, w: 3.4, h: 0.5, color: C.ink, fontFace: F.head, fontSize: 20, bold: true, valign: "top", margin: 0 });
    s.addText(rh[i][2], { x: x + 0.3, y: 3.5, w: 3.3, h: 1.0, color: C.slate, fontFace: F.body, fontSize: 16, valign: "top", margin: 0 });
  }
  bar(s, 4.85, 0.85, C.navy, "Today is real:", "the clock, a cold open, a live demo, hard questions. No “and then we’d show…”", null);
  bar(s, 5.9, 0.95, C.cardBg, "No restarts.", "If the demo breaks, run your fallback. Recovering calmly is worth more today than a clean run.", 1);
  footer(s);
  s.addNotes("Two minutes. Start general: every field that performs under pressure rehearses under the real conditions, including the failure, because that's the part that goes wrong when it counts. A dry run that pauses, restarts, or narrates what it would have shown teaches nothing about Demo Day. Click for the rule. If someone's demo breaks today, that's the most useful thing that can happen to them this week.");

  // 4 Two roles
  s = mk(); s.background = { color: C.white };
  header(s, "When you're watching, you play two people", "A classmate, and faculty who've never seen it");
  pairCards(s, 1.95, 2.55, [
    ["THE SCORE SHEET", "One half per run", "For each of the three questions: did it land, the moment that sold it, the moment you doubted. Then the time, the mechanics, and one keep, one fix.", C.cardBg, C.tealDk],
    ["THE QUESTIONS", "Ask what faculty will", "What didn't the first version prove? Which claim held, and how do you know? What would a newcomer do first?", C.navy, C.amber]
  ]);
  const ex = [
    ["NOT THIS", "“Good job.”", C.weakBg, C.coral],
    ["THIS", "“The double-booking refusal sold question 2.”", C.strongBg, C.green]
  ];
  for (let i = 0; i < 2; i++) {
    const x = 0.6 + i * 6.15;
    card(s, x, 4.7, 5.95, 1.25, ex[i][2]);
    s.addText(ex[i][0], { x: x + 0.3, y: 4.82, w: 5.4, h: 0.35, color: ex[i][3], fontFace: F.body, fontSize: 15, bold: true, charSpacing: 2, margin: 0 });
    s.addText(ex[i][1], { x: x + 0.3, y: 5.2, w: 5.4, h: 0.65, color: C.ink, fontFace: F.head, fontSize: 20, bold: true, valign: "top", margin: 0 });
  }
  footer(s);
  s.addNotes("One minute. Hand out the score sheets now, two pages each. The skeptical-faculty role is the point: classmates are kind, and Demo Day's room won't be unkind but it will be curious. Specific is the only useful register; a vague compliment costs the presenter a fix they could have made. After the peers ask, I'll ask one question per project too, so the hard ones get asked either way.");

  // 5 Fifteen minutes
  s = mk(); s.background = { color: C.white };
  header(s, "Fifteen minutes per project", "Demo Day's clock, with a shorter Q&A so four fit");
  // 15 minutes across 12.1 in: 0.8067 in per minute
  const u = 12.1 / 15, y0 = 2.05, hh = 1.55;
  segment(s, 0.6, 2 * u, y0, hh, C.teal, "Need", "~2 min", null, true);
  segment(s, 0.6 + 2 * u, 5 * u, y0, hh, C.navy, "Demo, claim first", "~5 min", "live, from main", true);
  segment(s, 0.6 + 7 * u, 2 * u, y0, hh, C.teal, "Next", "~2 min", null, true);
  segment(s, 0.6 + 9 * u, 3 * u, y0, hh, C.amberBg, "Q&A", "3 min", null, false);
  segment(s, 0.6 + 12 * u, 2 * u, y0, hh, C.cardBg, "Feedback", "2 min", null, false);
  segment(s, 0.6 + 14 * u, 1 * u, y0, hh, C.ice, "Reset", "1 min", null, false);
  s.addShape(pres.shapes.LINE, { x: 0.6, y: y0 + hh + 0.2, w: 9 * u, h: 0, line: { color: C.navy, width: 2.5, beginArrowType: "none", endArrowType: "triangle" } });
  s.addText("9 minutes, hard: the pitch and the demo", { x: 0.6, y: y0 + hh + 0.3, w: 9 * u, h: 0.4, color: C.navy, fontFace: F.body, fontSize: 16, bold: true, align: "center", margin: 0 });
  bar(s, 4.55, 0.85, C.cardBg, "Demo Day:", "the same 9 minutes, then 5 of questions from a room that includes invited faculty.", null);
  bar(s, 5.55, 1.1, C.navy, "Recording, opt-in:", "phone on the stand at the back, or a screen recording, before you start. The file stays with you; nothing is posted.", null);
  footer(s);
  s.addNotes("One minute. Point at the nine-minute block: that is the limit on Demo Day too, and I stop the clock at nine today. Questions are three minutes, not five, so four projects fit; the sheets carry the rest. Feedback is spoken: two classmates each give one keep and one fix, then the sheets go to the presenter. Recording: ask the room once whether anyone minds being heard in someone else's Q&A, then let presenters set it up during the reset.");

  // 6 Run order
  s = mk(); s.background = { color: C.white };
  header(s, "Run order", "Drawn now. Next up sets up during the reset.");
  const slots = [["1", "0:04 – 0:19"], ["2", "0:19 – 0:34"], ["3", "0:34 – 0:49"], ["4", "0:49 – 1:04"]];
  for (let i = 0; i < 4; i++) {
    const y = 1.95 + i * 0.95;
    card(s, 0.6, y, 12.1, 0.8, C.cardBg);
    s.addShape(pres.shapes.OVAL, { x: 0.85, y: y + 0.13, w: 0.54, h: 0.54, fill: { color: C.teal } });
    s.addText(slots[i][0], { x: 0.85, y: y + 0.13, w: 0.54, h: 0.54, color: C.white, fontFace: F.body, fontSize: 19, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText("Project:", { x: 1.65, y, w: 1.3, h: 0.8, color: C.slate, fontFace: F.body, fontSize: 18, valign: "middle", margin: 0 });
    s.addShape(pres.shapes.LINE, { x: 2.95, y: y + 0.58, w: 6.4, h: 0, line: { color: "9BB0BF", width: 1 } });
    s.addText(slots[i][1], { x: 9.6, y, w: 2.85, h: 0.8, color: C.tealDk, fontFace: F.body, fontSize: 17, bold: true, align: "right", valign: "middle", margin: 0 });
  }
  bar(s, 5.95, 0.8, C.amber, null, "Times are minutes from the start of class. Debrief at 1:04.", null);
  footer(s);
  s.addNotes("Draw the slips aloud and type the names into this slide, or write them on the board beside it. The times assume the framing ends at four minutes; if it runs long, the debrief shrinks, not a presenter's slot. Whoever is next plugs in and loads during the one-minute reset, so the laptop swap never comes out of anyone's nine minutes. Leave this up while the first presenter sets up.");

  // 7 Between runs
  s = mk(); s.background = { color: C.navy };
  darkHeader(s, "Up next", "Three questions. Nine minutes.");
  const qs = [
    ["1", "What need does this serve?", "A real user, and evidence the need is real"],
    ["2", "What has been built?", "Claim first, then proven live, not just shown"],
    ["3", "Where does it go next, and how can others join?", "Next steps you'd believe, and a way in shown"]
  ];
  for (let i = 0; i < 3; i++) {
    const y = 2.1 + i * 1.25;
    card(s, 0.6, y, 12.1, 1.05, C.navy2);
    s.addShape(pres.shapes.OVAL, { x: 0.9, y: y + 0.24, w: 0.58, h: 0.58, fill: { color: C.amber } });
    s.addText(qs[i][0], { x: 0.9, y: y + 0.24, w: 0.58, h: 0.58, color: C.navy, fontFace: F.body, fontSize: 20, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText([
      { text: qs[i][1], options: { bold: true, color: C.white, fontSize: 22, fontFace: F.head, breakLine: true } },
      { text: qs[i][2], options: { color: "CBD8E6", fontSize: 16 } }
    ], { x: 1.75, y, w: 10.7, h: 1.05, fontFace: F.body, valign: "middle", margin: 0 });
  }
  s.addText("Scorers: one specific moment, each way, for each question.", { x: 0.6, y: 6.05, w: 12.1, h: 0.5, color: C.amber, fontFace: F.body, fontSize: 17, bold: true, align: "center", margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("Put this up during each reset, while the next presenter loads, and switch to their slides when they're ready. It's the reminder for the room of what they're scoring. During each run, note the demo mechanics yourself: was the login staged, the data ready, the windows set, the text readable from the back? After the peers' questions, ask one from the question bank, picked for what the pitch left open.");

  // 8 Debrief
  s = mk(); s.background = { color: C.white };
  header(s, "Debrief: your polish plan", "Read your sheets, then write the plan before you leave");
  numRow(s, 1.95, 0.8, 1, "List every fix the sheets point to,", "and rank them by how much each improves one of the three answers.");
  numRow(s, 2.85, 0.8, 2, "Polish-sized only.", "Tighten the open, stage the login, fix the demo's bug. No features, no re-architecture.");
  numRow(s, 3.75, 0.8, 3, "Mark each one demo path or not.", "Code, data, and setup are demo path. Slides, notes, and docs aren't.");
  numRow(s, 4.65, 0.8, 4, "Say your top fix out loud.", "One sentence each, round the room.");
  bar(s, 5.7, 1.05, C.amber, null, "No limit on the list. The limit is rehearsal: a change you haven't run since you made it is a Demo Day risk.", null);
  footer(s);
  s.addNotes("Eight minutes. There's no cap on the number of fixes: there are four days to the tag, and a long list worked from the top is fine. What matters is that every change to the demo path gets rehearsed, which is why those land by the end of Wednesday's studio. Demo path is anything that changes what's on screen during the walk-through: its code and anything that code calls, its data, and what it runs on. Give them the test: would I have to run the demo again to know this didn't break it? Yes or not sure means demo path. Rove and push back on anything that's really a feature. The round-the-room top fix is a commitment device; keep it to one sentence.");

  // 9 Wrap
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: -1.3, y: 5.2, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaStopwatch, 0.9, 0.85, 0.85, C.amber, C.navy);
  s.addText("Freeze the demo Wednesday. Polish the words through Thursday.", { x: 0.9, y: 1.85, w: 11.9, h: 0.8, color: C.white, fontFace: F.head, fontSize: 25, bold: true, italic: true, margin: 0 });
  s.addText("THE LAST WEEK", { x: 0.92, y: 2.85, w: 11, h: 0.35, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText([
    { text: "Wednesday, Dec 9: final studio. Demo-path changes done, and the full run once more", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 6 } },
    { text: "Thursday, Dec 10, 11:59 pm: cp12-demo tag pushed. Demo Day runs from it", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 6, bold: true, color: C.white } },
    { text: "Monday, Dec 14, 8:30–10:00 AM: Demo Day. Arrive early, load early", options: { bullet: { indent: 16 }, bold: true, color: C.white } }
  ], { x: 0.95, y: 3.27, w: 11.7, h: 2.2, color: "CBD8E6", fontFace: F.body, fontSize: 17, valign: "top", margin: 0 });
  card(s, 0.6, 5.95, 12.1, 0.8, C.amber);
  s.addText("Watch your recording, if you made one, before Wednesday.", { x: 0.9, y: 5.95, w: 11.5, h: 0.8, color: C.navy, fontFace: F.body, fontSize: 17, bold: true, align: "center", valign: "middle", margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("Three minutes. The one-liner is the whole plan: anything a user would see in the demo is frozen after Wednesday's run, and the words can keep improving until the tag. Thursday night the tag freezes everything; after that, a demo-breaking hotfix needs my approval, an issue, and a new tag. Demo Day starts at 8:30; ask everyone to be in the room by 8:20 to load. Collect nothing: the sheets go home with the presenters.");

  const OUT = "Session26-DryRun.pptx";
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
