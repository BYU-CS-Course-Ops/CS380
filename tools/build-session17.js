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
pres.title = "CS 301R — Session 17 — From Design to Work";

let PAGE = 0;
function mk() { PAGE++; return pres.addSlide(); }
function footer(slide, col) {
  const c = col || C.slate;
  slide.addText("CS 301R · Session 17 · From Design to Work", { x: 7.3, y: 7.04, w: 5.4, h: 0.3, align: "right", color: c, fontFace: F.body, fontSize: 10, margin: 0 });
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

async function build() {
  let s;

  // 1 Title
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: 10.9, y: -1.4, w: 4.2, h: 4.2, fill: { color: "1C3252" } });
  s.addShape(pres.shapes.OVAL, { x: 12.0, y: 5.1, w: 3.0, h: 3.0, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaSitemap, 0.9, 1.45, 1.0, C.amber, C.navy);
  s.addText("CS 301R · SOFTWARE ENGINEERING STUDIO I", { x: 0.92, y: 2.75, w: 11, h: 0.35, color: "9FB4C7", fontFace: F.body, fontSize: 15, bold: true, charSpacing: 2, margin: 0 });
  s.addText("From Design to Work", { x: 0.9, y: 3.15, w: 12.1, h: 1.3, color: C.white, fontFace: F.head, fontSize: 42, bold: true, margin: 0 });
  s.addText([
    { text: "Session 17 — epics, milestones, issues, and a board", options: { color: C.amber, bold: true, breakLine: true } },
    { text: "Monday, November 2, 2026", options: { color: "9FB4C7" } }
  ], { x: 0.92, y: 4.7, w: 11, h: 0.9, fontFace: F.body, fontSize: 19, margin: 0, lineSpacingMultiple: 1.2 });
  s.addNotes("Phase 4 begins: the build. Before class: open Prop Loft's issues, the epic 'Find an item', the milestones page, and the project board in tabs, plus the search issue showing its request and its Triaged note. Have the Setting Up Your Board page up; it's the step-by-step students follow in the workshop. Laptops required. CP8 is due end of day Wednesday, Nov 4; today produces most of it.");

  // 2 Today
  s = mk(); s.background = { color: C.white };
  header(s, "Today", "Turn your design into work someone can pick up");
  const plan = [
    [FA.FaBrain, "The build starts today; the tracker is its memory", "7 min"],
    [FA.FaSitemap, "The decomposition ladder: MVP → epics → issues", "14 min"],
    [FA.FaCalendarAlt, "Milestones and the honest calendar", "10 min"],
    [FA.FaColumns, "The board, labels, and pathways in", "10 min"],
    [FA.FaTools, "Workshop: decompose your own MVP", "28 min"],
    [FA.FaRoute, "Wednesday: estimate, sequence, commit", "6 min"]
  ];
  for (let i = 0; i < plan.length; i++) {
    const y = 1.95 + i * 0.8;
    const hi = i === 4;
    card(s, 0.6, y, 12.1, 0.68, hi ? C.navy : C.cardBg);
    await iconCircle(s, plan[i][0], 0.88, y + 0.1, 0.48, hi ? C.amber : C.teal, hi ? C.navy : "FFFFFF");
    s.addText(plan[i][1], { x: 1.6, y, w: 9.0, h: 0.68, color: hi ? C.white : C.ink, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
    s.addText(plan[i][2], { x: 10.6, y, w: 1.8, h: 0.68, color: hi ? C.amber : C.slate, fontFace: F.body, fontSize: 16, bold: true, align: "right", valign: "middle", margin: 0 });
  }
  footer(s);
  s.addNotes("Thirty seconds. Say the headline first: the build starts today, and the next slide says what to build first. The first forty minutes are short teaching blocks, every one shown on Prop Loft. The highlighted row is the point of the day: 28 minutes building your own tracker, live, with me circulating. Anything you build today counts toward CP8, due Wednesday. Keep the teaching blocks moving; the workshop time is the part to protect.");

  // 3 Framing
  s = mk(); s.background = { color: C.white };
  header(s, "The tracker is the project's memory", "Documents become software here");
  const shift = [
    [FA.FaFileAlt, "Weeks 1–8", "Documents: the proposal, the design"],
    [FA.FaClipboardList, "The tracker", "Where the design becomes work"],
    [FA.FaCode, "Weeks 9–13", "Working software, a piece at a time"]
  ];
  for (let i = 0; i < 3; i++) {
    const x = 0.6 + i * 4.15;
    const mid = i === 1;
    card(s, x, 1.95, 3.8, 1.55, mid ? C.navy : C.cardBg);
    await iconCircle(s, shift[i][0], x + 0.25, 2.1, 0.6, mid ? C.amber : C.teal, mid ? C.navy : "FFFFFF");
    s.addText(shift[i][1], { x: x + 1.0, y: 2.1, w: 2.65, h: 0.6, color: mid ? C.amber : C.tealDk, fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0 });
    s.addText(shift[i][2], { x: x + 0.25, y: 2.8, w: 3.3, h: 0.6, color: mid ? C.white : C.ink, fontFace: F.body, fontSize: 16, valign: "top", margin: 0 });
    if (i < 2) s.addText("→", { x: x + 3.8, y: 2.35, w: 0.35, h: 0.6, color: C.teal, fontFace: F.body, fontSize: 24, bold: true, align: "center", valign: "middle", margin: 0 });
  }
  s.addText("WHO READS IT", { x: 0.6, y: 3.75, w: 6, h: 0.35, color: C.slate, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  const readers = [
    ["You, and anyone you build with", "What's next, and who's on it. Solo, it's how you remember."],
    ["Anyone checking on progress", "What you said you'd do, and what you did. (Here: the Week-11 audit.)"],
    ["A future contributor", "Where the project is going, and where there's room to help."]
  ];
  for (let i = 0; i < 3; i++) {
    const x = 0.6 + i * 4.15;
    card(s, x, 4.15, 3.8, 1.45, C.cardBg, REVEAL(i + 1));
    s.addText([
      { text: readers[i][0], options: { bold: true, color: C.ink, breakLine: true } },
      { text: readers[i][1], options: { color: C.slate, fontSize: 15 } }
    ], { x: x + 0.25, y: 4.15, w: 3.3, h: 1.45, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, lineSpacingMultiple: 1.04, ...REVEAL(i + 1) });
  }
  bar(s, 5.85, 0.9, C.amber, null, "Unwritten work doesn't get done. Vaguely written work gets done wrong.", 4);
  footer(s);
  s.addNotes("Five minutes. The shift: until now you've produced documents; from here you produce software, and the tracker is where one turns into the other. One click per reader. The first is obvious. The second is anyone checking on progress: a manager, a sponsor, and in this course the Week-11 auditor. The third is the founder's reason: a plan in public is how a stranger sees there's a future. Fourth click, say it plainly.");

  // 4 The build starts today
  s = mk(); s.background = { color: C.white };
  header(s, "The build starts today", "Your first issue: a walking skeleton");
  s.addText("WHAT IT IS", { x: 0.6, y: 1.9, w: 5.6, h: 0.35, color: C.slate, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  const skel = [
    [FA.FaDownload, "Installs and runs", "On a fresh clone, in the stack your design chose"],
    [FA.FaDesktop, "Shows something", "One page, one command, or one endpoint"],
    [FA.FaCheckCircle, "A test passes", "Even a trivial one: the test command exists"]
  ];
  for (let i = 0; i < skel.length; i++) {
    const y = 2.35 + i * 0.9;
    card(s, 0.6, y, 5.6, 0.8, C.cardBg);
    await iconCircle(s, skel[i][0], 0.82, y + 0.14, 0.52, C.teal, "FFFFFF");
    s.addText([
      { text: skel[i][1], options: { bold: true, color: C.ink, breakLine: true } },
      { text: skel[i][2], options: { color: C.slate, fontSize: 15 } }
    ], { x: 1.55, y, w: 4.5, h: 0.8, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0 });
  }
  s.addText("PROP LOFT · TAG session-13", { x: 6.5, y: 1.9, w: 6.2, h: 0.35, color: C.slate, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  codeBlock(s, 6.5, 2.35, 6.2, 2.6, [
    ["# three commits before any feature", C.codeDim],
    "de16ce5 Add the Django project skeleton",
    "7ba9dd2 Add catalog models for items and bins",
    "6dccb57 Show the catalog as a list of items",
    "",
    "$ python manage.py test",
    ["Ran 2 tests ... OK", C.codeAdd]
  ]);
  bar(s, 5.15, 0.75, C.cardBg, "Why first:", "every later issue lands on it · the stack becomes a fact · your PR workflow gets real code", 1);
  bar(s, 6.05, 0.8, C.amber, null, "File it in today's workshop, first in M1. Open its PR before Wednesday.", 2);
  footer(s);
  s.addNotes("Two minutes, and say the title out loud: until today nobody has told you to start writing code, and now it's time. You don't need Wednesday's sizing for this, because every project's first issue is the same. Prop Loft's skeleton is three small commits and two tests; that's the size. Click: why it goes first, on any project. Click: the ask. If your repo already runs end to end, it's done; start your first slice issue instead.");

  // 4 Five jobs
  s = mk(); s.background = { color: C.white };
  header(s, "What a tracker has to do", "Five jobs, and a good default for each");
  const jobs = [
    ["Describe each piece of work", "What exactly needs doing?", "A task form with acceptance criteria"],
    ["Notice what's new", "What hasn't anyone read?", "A needs triage label"],
    ["Group work by the value it delivers", "What does this add up to?", "Epics: parent issues + sub-issues"],
    ["Group work by when it's due", "What has to be true by when?", "Milestones"],
    ["Show each item's state", "What's happening right now?", "A public project board"]
  ];
  s.addText("THE JOB", { x: 0.85, y: 1.9, w: 4, h: 0.3, color: C.slate, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText("THE DEFAULT", { x: 8.75, y: 1.9, w: 3.8, h: 0.3, color: C.slate, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  for (let i = 0; i < jobs.length; i++) {
    const y = 2.28 + i * 0.7;
    card(s, 0.6, y, 12.1, 0.6, C.cardBg);
    s.addText(jobs[i][0], { x: 0.85, y, w: 4.4, h: 0.6, color: C.ink, fontFace: F.body, fontSize: 17, bold: true, valign: "middle", margin: 0 });
    s.addText(jobs[i][1], { x: 5.3, y, w: 3.35, h: 0.6, color: C.slate, fontFace: F.body, fontSize: 15, italic: true, valign: "middle", margin: 0 });
    s.addText(jobs[i][2], { x: 8.75, y, w: 3.8, h: 0.6, color: C.tealDk, fontFace: F.body, fontSize: 15.5, bold: true, valign: "middle", margin: 0 });
  }
  bar(s, 5.85, 0.9, C.navy, "Defaults, not rules.", "Change any of them; write what you do instead, and why, in CONTRIBUTING. Keep a review state: every project works through PRs.", 1);
  footer(s);
  s.addNotes("Two minutes; this is the map for the rest of the day. Every tracker, on any tool, has to do these five jobs. The right column is what we'll set up, and what Prop Loft uses. Click: these are defaults, the same rule as your git policies in Session 13. Most of you will take them, and that's fine. Change one if your project works differently, and say why in CONTRIBUTING. The only fixed piece is a review state.");

  // 5 Ladder
  s = mk(); s.background = { color: C.white };
  header(s, "The decomposition ladder", "MVP → epics → issues, on Prop Loft");
  const ladder = [
    ["MVP", "What the design commits to", "One theater's costume stock: find it, check it out, add it, from a phone", C.navy],
    ["Epic", "A slice of user-visible value · 3–5 per MVP", "Check out and return", C.teal],
    ["Issue", "One coherent, reviewable change · usually one PR", "Enforce one open checkout per item", C.tealDk]
  ];
  for (let i = 0; i < 3; i++) {
    const y = 1.95 + i * 1.2;
    const dark = i === 0;
    card(s, 0.6, y, 12.1, 1.0, dark ? C.navy : C.cardBg, REVEAL(i + 1));
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.85, y: y + 0.2, w: 1.5, h: 0.6, fill: { color: dark ? C.amber : ladder[i][3] }, line: { type: "none" }, rectRadius: 0.08, ...REVEAL(i + 1) });
    s.addText(ladder[i][0], { x: 0.85, y: y + 0.2, w: 1.5, h: 0.6, color: dark ? C.navy : C.white, fontFace: F.head, fontSize: 19, bold: true, align: "center", valign: "middle", margin: 0, ...REVEAL(i + 1) });
    s.addText(ladder[i][1], { x: 2.6, y, w: 4.3, h: 1.0, color: dark ? C.white : C.ink, fontFace: F.body, fontSize: 16, bold: true, valign: "middle", margin: 0, ...REVEAL(i + 1) });
    s.addText(ladder[i][2], { x: 7.0, y, w: 5.5, h: 1.0, color: dark ? "CFE0E9" : C.tealDk, fontFace: F.body, fontSize: 16, italic: true, valign: "middle", margin: 0, ...REVEAL(i + 1) });
  }
  bar(s, 5.65, 1.1, C.amber, null, "Read epics off the design's goals, not its components. \"Check out and return\" touches the web UI, checkout, and auth. That's normal.", 4);
  footer(s);
  s.addNotes("Two minutes. One click per rung, top down. The MVP is the design doc's commitment. An epic is something a user gets, and Prop Loft has five. An issue is one change a reviewer can review as a unit, usually one pull request. Fourth click is the common mistake: epics named after layers of the code. 'Backend' isn't something a volunteer gets. Epics cut across components, and that's fine.");

  // 6 Prop Loft's epics
  s = mk(); s.background = { color: C.white };
  header(s, "Prop Loft's epics", "Five, each named for what a volunteer gets");
  const epics = [
    ["E1", "Find an item", "\"Do we own this?\" from a phone, in under a minute"],
    ["E2", "Check out and return", "Who has it, for which show, due back when"],
    ["E3", "Add an item", "With a photo, and no one showing you how"],
    ["E4", "Roles and phone layout", "What a volunteer may do; pages that work on a phone"],
    ["E5", "Run it at the theater", "Its own server, and a real strike night"]
  ];
  const ew = 2.3, eg = 0.15;
  for (let i = 0; i < epics.length; i++) {
    const x = 0.6 + i * (ew + eg);
    card(s, x, 1.95, ew, 3.45, C.cardBg);
    s.addText(epics[i][0], { x, y: 2.1, w: ew, h: 0.55, color: C.teal, fontFace: F.head, fontSize: 24, bold: true, align: "center", margin: 0 });
    s.addText(epics[i][1], { x: x + 0.12, y: 2.7, w: ew - 0.24, h: 0.95, color: C.ink, fontFace: F.body, fontSize: 18, bold: true, align: "center", valign: "top", margin: 0 });
    s.addText(epics[i][2], { x: x + 0.15, y: 3.7, w: ew - 0.3, h: 1.6, color: C.slate, fontFace: F.body, fontSize: 15, align: "center", valign: "top", margin: 0 });
  }
  bar(s, 5.65, 1.1, C.navy, "Each traces to a goal in the design.", "If an epic doesn't, either the design is missing a goal or the epic is missing a reason.");
  footer(s);
  s.addNotes("One minute. Read the five aloud and ask which goal in Prop Loft's design each comes from: E1 is goal 1, E2 goal 2, E3 goal 3, E4 and E5 goal 4, running without a developer. The bottom line is the check students run on their own: trace every epic to a goal. Mention that E4 and E5 aren't broken down yet, on purpose; they're on the roadmap, and we'll see why in ten minutes.");

  // 7 Epic on GitHub
  s = mk(); s.background = { color: C.white };
  header(s, "An epic on GitHub", "A parent issue, with the work hung under it");
  card(s, 0.6, 1.95, 6.9, 4.25, C.cardBg);
  s.addText("Epic: Find an item", { x: 0.9, y: 2.1, w: 4.8, h: 0.55, color: C.ink, fontFace: F.head, fontSize: 20, bold: true, valign: "middle", margin: 0 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.95, y: 2.2, w: 1.25, h: 0.4, fill: { color: "3E4B9E" }, line: { type: "none" }, rectRadius: 0.2 });
  s.addText("epic", { x: 5.95, y: 2.2, w: 1.25, h: 0.4, color: C.white, fontFace: F.body, fontSize: 15, bold: true, align: "center", valign: "middle", margin: 0 });
  s.addText("Sub-issues · 2 of 4", { x: 0.9, y: 2.8, w: 4, h: 0.4, color: C.slate, fontFace: F.body, fontSize: 15, bold: true, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.9, y: 3.28, w: 6.3, h: 0.12, fill: { color: "D5DEE5" }, line: { type: "none" } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.9, y: 3.28, w: 3.15, h: 0.12, fill: { color: C.green }, line: { type: "none" } });
  const subs = [
    [true, "Search items by name"],
    [true, "Show an item's detail page"],
    [false, "Filter items by category and size"],
    [false, "Say so when a search finds nothing"]
  ];
  for (let i = 0; i < subs.length; i++) {
    const y = 3.6 + i * 0.6;
    await iconCircle(s, subs[i][0] ? FA.FaCheck : FA.FaRegCircle, 0.9, y + 0.07, 0.4, subs[i][0] ? C.green : "C9D3DC", subs[i][0] ? "FFFFFF" : C.slate);
    s.addText(subs[i][1], { x: 1.5, y, w: 5.7, h: 0.55, color: subs[i][0] ? C.slate : C.ink, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0 });
  }
  const how = [
    ["1", "Label it epic", "Add the label; explain it in CONTRIBUTING"],
    ["2", "Write it like a task", "Done when the slice works and every sub-issue is closed"],
    ["3", "Hang the work under it", "Create sub-issue, or Add existing issue"]
  ];
  for (let i = 0; i < 3; i++) {
    const y = 1.95 + i * 1.45;
    card(s, 7.75, y, 4.95, 1.3, C.white);
    s.addShape(pres.shapes.OVAL, { x: 7.95, y: y + 0.36, w: 0.57, h: 0.57, fill: { color: C.teal } });
    s.addText(how[i][0], { x: 7.95, y: y + 0.36, w: 0.57, h: 0.57, color: C.white, fontFace: F.head, fontSize: 19, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText([
      { text: how[i][1], options: { bold: true, color: C.ink, breakLine: true } },
      { text: how[i][2], options: { color: C.slate, fontSize: 15 } }
    ], { x: 8.7, y, w: 3.85, h: 1.3, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0 });
  }
  s.addText("Also works: an Epic issue type, or one milestone per epic. Keep the sub-issues either way: they give the epic its progress bar.", { x: 0.6, y: 6.35, w: 12.1, h: 0.55, color: C.slate, fontFace: F.body, fontSize: 15, italic: true, valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("Two minutes; switch to the Prop Loft tab if you can. The left is what an epic looks like a week into the build: a parent issue whose sub-issues are the work, with a progress bar that moves as they close. The three steps are the default. Create sub-issue sits at the bottom of the description, not the comments; people miss it. The italic line is the alternatives: an issue type, or a milestone per epic when each epic is also a release.");

  // 8 Two kinds of issues
  s = mk(); s.background = { color: C.white };
  header(s, "Two kinds of issues", "Same tracker, different jobs");
  const kinds = [
    [FA.FaInbox, "Requests", "Session 15's anatomy", [["Written by", "anyone: a user, a stranger"], ["Says", "what's wrong, or what's needed"], ["Shape", "steps, expected vs. actual; or the problem, who has it, the workaround"]]],
    [FA.FaHammer, "Work items", "Today", [["Written by", "a maintainer, while planning"], ["Says", "what will be built, and how you'll know it's done"], ["Shape", "a goal, context, and acceptance criteria"]]]
  ];
  for (let i = 0; i < 2; i++) {
    const x = 0.6 + i * 6.15;
    const dark = i === 1;
    card(s, x, 1.95, 5.95, 3.6, dark ? C.navy : C.cardBg);
    await iconCircle(s, kinds[i][0], x + 0.3, 2.15, 0.66, dark ? C.amber : C.teal, dark ? C.navy : "FFFFFF");
    s.addText([
      { text: kinds[i][1], options: { bold: true, color: dark ? C.white : C.ink, fontSize: 20, breakLine: true } },
      { text: kinds[i][2], options: { color: dark ? C.amber : C.tealDk, fontSize: 15 } }
    ], { x: x + 1.15, y: 2.1, w: 4.6, h: 0.8, fontFace: F.body, valign: "middle", margin: 0 });
    const rows = kinds[i][3];
    for (let j = 0; j < rows.length; j++) {
      const y = 3.1 + j * 0.78;
      s.addText(rows[j][0], { x: x + 0.3, y, w: 1.5, h: 0.7, color: dark ? "9FB4C7" : C.slate, fontFace: F.body, fontSize: 15, bold: true, valign: "top", margin: 0 });
      s.addText(rows[j][1], { x: x + 1.8, y, w: 3.95, h: 0.7, color: dark ? C.white : C.ink, fontFace: F.body, fontSize: 16, valign: "top", margin: 0 });
    }
  }
  bar(s, 5.8, 0.95, C.amber, null, "Triage turns a request into a work item: read it, decide, and add what's missing.", 1);
  footer(s);
  s.addNotes("Two minutes. This answers the question you'll have: the issue forms you built for CP7 don't ask for acceptance criteria, and they shouldn't. They're for requests from anyone, and a request is the problem as the reporter sees it. A work item is the maintainer's decision about what to build. Both live in the same tracker. Click: triage is the bridge, and the next slide is one, on Prop Loft.");

  // 9 Triage before/after
  s = mk(); s.background = { color: C.white };
  header(s, "Triage, on Prop Loft", "The request stays on top. The decision goes below.");
  s.addText("As filed, through the feature form", { x: 0.6, y: 1.85, w: 5.95, h: 0.35, color: C.slate, fontFace: F.body, fontSize: 15, bold: true, margin: 0 });
  codeBlock(s, 0.6, 2.25, 5.95, 3.0, [
    ["Search items by name, category,", C.amber],
    ["and size", C.amber],
    ["The problem", C.codeDim],
    ["A volunteer needs to know whether we", C.code],
    ["own something, from a phone.", C.code],
    ["Who has this problem", C.codeDim],
    ["Wardrobe volunteers, on the shop floor", C.code]
  ], {}, 14.5);
  s.addText("Added by the maintainer", { x: 6.75, y: 1.85, w: 5.95, h: 0.35, color: C.slate, fontFace: F.body, fontSize: 15, bold: true, margin: 0, ...REVEAL(1) });
  codeBlock(s, 6.75, 2.25, 5.95, 3.0, [
    ["Retitled: Search items by name", C.codeAdd],
    ["Goal  A volunteer finds an item by", C.code],
    ["      typing part of its name.", C.code],
    ["Context  Design §2 goal 1 · part of E1", C.code],
    ["[ ] The list filters by name, any case", C.code],
    ["[ ] An empty search shows everything", C.code],
    ["[ ] Tests: a match, case, empty search", C.code]
  ], REVEAL(1), 14.5);
  bar(s, 5.5, 1.25, C.amberBg, "Triage also split it.", "Filtering by category and size became its own task, in the second milestone. Now each one is a single pull request, and the first can ship for the demo.", 2);
  footer(s);
  s.addNotes("Two minutes; open the real issue if you can, since it shows both halves. Left: the request as a stranger filed it, through the feature form. Click: what the maintainer added below it, without editing the request away. Read the acceptance criteria aloud; each is true or false when the PR is ready. Second click: triage doesn't just accept, it can split. One request became two tasks in two milestones.");

  // 10 The task form
  s = mk(); s.background = { color: C.white };
  header(s, "Describing planned work", "Four fields make an issue ready to work");
  const fields = [
    ["Goal", "One sentence: what's true for a user when it's done."],
    ["Context", "Links, not a retelling: the design section, the epic, the request it answers."],
    ["Acceptance criteria", "\"Checkout works\" is a hope. \"An item that's already out can't be checked out again\" is a criterion."],
    ["Where to start (optional)", "For a newcomer: the file, the function to imitate, the test to copy."]
  ];
  for (let i = 0; i < 4; i++) {
    const x = 0.6 + (i % 2) * 6.15, y = 1.95 + Math.floor(i / 2) * 1.75;
    const key = i === 2;
    card(s, x, y, 5.95, 1.55, key ? C.navy : C.cardBg);
    s.addText([
      { text: fields[i][0], options: { bold: true, color: key ? C.amber : C.tealDk, fontSize: 19, breakLine: true } },
      { text: fields[i][1], options: { color: key ? C.white : C.ink } }
    ], { x: x + 0.3, y, w: 5.35, h: 1.55, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  }
  bar(s, 5.6, 1.15, C.amberBg, "Default: a task form,", ".github/ISSUE_TEMPLATE/task.yml (copy Prop Loft's). Also works: a Markdown template, GitHub's Task issue type, or a reviewer who insists on criteria.");
  footer(s);
  s.addNotes("Ninety seconds. The highlighted field is the one that matters most: acceptance criteria are how a reviewer, or the demo, can say 'done' without arguing. A form makes this shape the easy path, the same way the bug form did for reports; it goes in through a PR like any other change. The alternatives are real, and some of you may prefer one. Whatever you pick, the four fields are the point.");

  // 11 Issue size
  s = mk(); s.background = { color: C.white };
  header(s, "How big is an issue?", "The shape of the work, not the clock");
  const tests = [
    [FA.FaBullseye, "One coherent change?"],
    [FA.FaUser, "Can one person carry it?"],
    [FA.FaSearch, "Reviewable as a unit?"],
    [FA.FaChartLine, "Shows progress before it's done?"]
  ];
  for (let i = 0; i < 4; i++) {
    const x = 0.6 + i * 3.075;
    card(s, x, 1.95, 2.9, 1.75, C.cardBg);
    await iconCircle(s, tests[i][0], x + (2.9 - 0.62) / 2, 2.1, 0.62, C.teal);
    s.addText(tests[i][1], { x: x + 0.15, y: 2.8, w: 2.6, h: 0.8, color: C.ink, fontFace: F.body, fontSize: 17, bold: true, align: "center", valign: "middle", margin: 0 });
  }
  card(s, 0.6, 3.9, 5.95, 1.65, C.strongBg, REVEAL(1));
  s.addText([
    { text: "Weeks can be fine. ", options: { bold: true, color: C.green } },
    { text: "A migration or a hard concurrency bug is one thing; split it and the pieces mean nothing. Show progress: a draft PR, a checklist.", options: { color: C.ink } }
  ], { x: 0.9, y: 3.9, w: 5.4, h: 1.65, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0, lineSpacingMultiple: 1.04, ...REVEAL(1) });
  card(s, 6.75, 3.9, 5.95, 1.65, C.weakBg, REVEAL(2));
  s.addText([
    { text: "Split when you can. ", options: { bold: true, color: C.coral } },
    { text: "If it breaks into pieces that are each useful and reviewable alone, it's an epic wearing an issue's costume.", options: { color: C.ink } }
  ], { x: 7.05, y: 3.9, w: 5.4, h: 1.65, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0, lineSpacingMultiple: 1.04, ...REVEAL(2) });
  bar(s, 5.8, 0.95, C.navy, "In this course:", "most land in a few focused hours to a couple of days. A two-week issue is 40% of the build with no checkpoint.", 3);
  footer(s);
  s.addNotes("Two minutes. The four tests are about the work, not time. First click: on real projects, issues that take weeks exist and are fine when the work is one indivisible thing; what they owe everyone is visible progress. Second click: the real rule, split when the pieces stand alone. Third: the course-scale version. With about five build weeks, a two-week issue is a big bet with no checkpoint. Bigger is allowed; say so in the issue.");

  // 12 Quiz
  s = mk(); s.background = { color: C.white };
  header(s, "Quick check", "Which of these is ready to work?");
  const quiz = [
    ["Implement the frontend", "An epic in disguise: it splits into useful pieces", C.coral],
    ["Enforce one open checkout per item", "Ready: one change, one pull request", C.green],
    ["Investigate why checkouts double-post on slow networks", "Ready, even at a week: it's one thing", C.green],
    ["Checkout", "A mystery: no goal, no criteria", C.amber],
    ["Use crispy-forms for the checkout form", "Stale by design: the design doc owns that", C.amber]
  ];
  for (let i = 0; i < quiz.length; i++) {
    const y = 1.95 + i * 0.95;
    card(s, 0.6, y, 12.1, 0.82, C.cardBg);
    s.addText(quiz[i][0], { x: 0.9, y, w: 6.4, h: 0.82, color: C.ink, fontFace: F.body, fontSize: 17, bold: true, valign: "middle", margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: 7.45, y: y + 0.16, w: 0.08, h: 0.5, fill: { color: quiz[i][2] }, line: { type: "none" }, ...REVEAL(i + 1) });
    s.addText(quiz[i][1], { x: 7.7, y, w: 4.85, h: 0.82, color: C.ink, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0, ...REVEAL(i + 1) });
  }
  footer(s);
  s.addNotes("Three minutes. Hands up or call-outs for each before you click. The third is the one people get wrong: it takes a week, and it's still one issue, because there's no useful half of an investigation. The last two are the other anti-patterns: a title with nothing behind it, and an issue that dictates implementation the design doc already decided. That one goes stale the moment the design changes.");

  // 13 Epics × milestones
  s = mk(); s.background = { color: C.white };
  header(s, "Milestones", "Epics are what. Milestones are when. They cut across.");
  const cols = ["M1 · Demo-able core", "M2 · MVP complete", "Roadmap"];
  const grid = [
    ["E1 Find an item", "Search · item page", "Filters · empty search", ""],
    ["E2 Check out, return", "Record · check out · who has it", "Returns · overdue list", ""],
    ["E3 Add an item", "", "Add form · photo · iPhone test", ""],
    ["E4 Roles, layout", "", "", "Roles · phone layout"],
    ["E5 Run it there", "Setup guide", "", "Deploy · 60 items · strike night"]
  ];
  const gx = [0.6, 3.25, 6.43, 9.61], gw = [2.55, 3.08, 3.08, 3.09];
  for (let j = 0; j < 3; j++) {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: gx[j + 1], y: 1.95, w: gw[j + 1], h: 0.5, fill: { color: j === 2 ? C.slate : C.navy }, line: { type: "none" }, rectRadius: 0.06 });
    s.addText(cols[j], { x: gx[j + 1], y: 1.95, w: gw[j + 1], h: 0.5, color: C.white, fontFace: F.body, fontSize: 16, bold: true, align: "center", valign: "middle", margin: 0 });
  }
  for (let i = 0; i < grid.length; i++) {
    const y = 2.55 + i * 0.78;
    s.addShape(pres.shapes.RECTANGLE, { x: gx[0], y, w: gw[0], h: 0.72, fill: { color: C.ice }, line: { type: "none" } });
    s.addText(grid[i][0], { x: gx[0] + 0.15, y, w: gw[0] - 0.2, h: 0.72, color: C.tealDk, fontFace: F.body, fontSize: 16, bold: true, valign: "middle", margin: 0 });
    for (let j = 1; j < 4; j++) {
      const filled = grid[i][j] !== "";
      s.addShape(pres.shapes.RECTANGLE, { x: gx[j], y, w: gw[j], h: 0.72, fill: { color: filled ? C.cardBg : "FAFBFC" }, line: { color: "E1E8ED", width: 0.75 } });
      if (filled) s.addText(grid[i][j], { x: gx[j] + 0.12, y, w: gw[j] - 0.24, h: 0.72, color: C.ink, fontFace: F.body, fontSize: 15, align: "center", valign: "middle", margin: 0 });
    }
  }
  s.addText("Prop Loft. M1 takes a slice of three epics; nothing in E4 is due this term.", { x: 0.6, y: 6.48, w: 12.1, h: 0.42, color: C.slate, fontFace: F.body, fontSize: 15, italic: true, margin: 0 });
  footer(s);
  s.addNotes("Two minutes. Read across a row: an epic spreads over time. Read down a column: a milestone takes slices of several epics. M1 is the thinnest path through E1, E2, and E5 that a volunteer could actually use. On GitHub, a milestone is Issues, Milestones, New: a title that says what it delivers, a due date, and a line on what's true when it closes. Each issue goes in one milestone.");

  // 14 The honest calendar
  s = mk(); s.background = { color: C.white };
  header(s, "The honest calendar", "Count the hours, then cut");
  s.addShape(pres.shapes.LINE, { x: 1.6, y: 2.55, w: 9.9, h: 0, line: { color: C.teal, width: 3 } });
  const marks = [
    [1.6, "Today", "Mon, Nov 2", C.slate],
    [6.55, "M1 · progress demo", "Wed, Nov 18 (CP10)", C.teal],
    [11.5, "M2 · launch package", "Wed, Dec 2 (CP11)", C.navy]
  ];
  for (const [x, a, b, col] of marks) {
    s.addShape(pres.shapes.OVAL, { x: x - 0.17, y: 2.38, w: 0.34, h: 0.34, fill: { color: col }, line: { color: C.white, width: 2 } });
    s.addText([
      { text: a, options: { bold: true, color: C.ink, breakLine: true } },
      { text: b, options: { color: C.slate, fontSize: 15 } }
    ], { x: x - 1.5, y: 2.85, w: 3.0, h: 0.75, fontFace: F.body, fontSize: 17, align: "center", valign: "top", margin: 0 });
  }
  card(s, 0.6, 3.95, 7.3, 1.65, C.navy, REVEAL(1));
  s.addText([
    { text: "Capacity per milestone", options: { color: C.amber, bold: true, fontSize: 16, breakLine: true } },
    { text: "maintainers × ~7 outside hours × 2 weeks, minus review", options: { color: C.white, breakLine: true } },
    { text: "Solo: 1 × 7 × 2 = 14 hours, about 12 after review", options: { color: "CFE0E9" } }
  ], { x: 0.95, y: 3.95, w: 6.8, h: 1.65, fontFace: F.body, fontSize: 18, valign: "middle", margin: 0, lineSpacingMultiple: 1.1, ...REVEAL(1) });
  card(s, 8.15, 3.95, 4.55, 1.65, C.amberBg, REVEAL(2));
  s.addText("Add up the issues. If they don't fit, cut until they do, and write down what moved.", { x: 8.45, y: 3.95, w: 4.0, h: 1.65, color: C.ink, fontFace: F.body, fontSize: 16.5, bold: true, valign: "middle", margin: 0, lineSpacingMultiple: 1.04, ...REVEAL(2) });
  bar(s, 5.85, 0.9, C.cardBg, "Detail M1 fully, M2 loosely.", "Plans sharpen as you get closer; detailed issues for work a month out mostly get rewritten.");
  footer(s);
  s.addNotes("Two minutes. Two fixed dates, so two milestones of about two weeks each. First click: the arithmetic from Session 8, now with real numbers. Seven is the outside hours a week the ten-hour course load leaves after class; on a team, multiply. Second click: count, then cut. A milestone that fits and closes on time beats an impressive one that slips. Wednesday you'll size every M1 issue against this number.");

  // 15 Prop Loft's cut
  s = mk(); s.background = { color: C.white };
  header(s, "Prop Loft's cut", "The design planned five slices. The calendar holds two.");
  const slices = [
    ["1", "Find, open, check out, see it marked out", "M1", C.teal],
    ["2", "Returns and the overdue list", "M2", C.navy],
    ["3", "Add an item, with a photo", "M2", C.navy],
    ["4", "Roles and phone layout", "Roadmap", C.slate],
    ["5", "Deploy, 60 items, strike night", "Roadmap", C.slate]
  ];
  const sw = 2.3, sg = 0.15;
  for (let i = 0; i < slices.length; i++) {
    const x = 0.6 + i * (sw + sg);
    const cut = i >= 3;
    card(s, x, 1.95, sw, 3.0, cut ? "F7F9FA" : C.cardBg, cut ? REVEAL(1) : {});
    s.addText("Slice " + slices[i][0], { x, y: 2.1, w: sw, h: 0.45, color: C.slate, fontFace: F.body, fontSize: 15, bold: true, align: "center", margin: 0, ...(cut ? REVEAL(1) : {}) });
    s.addText(slices[i][1], { x: x + 0.15, y: 2.6, w: sw - 0.3, h: 1.4, color: C.ink, fontFace: F.body, fontSize: 17, bold: true, align: "center", valign: "top", margin: 0, ...(cut ? REVEAL(1) : {}) });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x + 0.35, y: 4.15, w: sw - 0.7, h: 0.5, fill: { color: slices[i][3] }, line: { type: "none" }, rectRadius: 0.08, ...(cut ? REVEAL(1) : {}) });
    s.addText(slices[i][2], { x: x + 0.35, y: 4.15, w: sw - 0.7, h: 0.5, color: C.white, fontFace: F.body, fontSize: 16, bold: true, align: "center", valign: "middle", margin: 0, ...(cut ? REVEAL(1) : {}) });
  }
  bar(s, 5.25, 1.5, C.navy, "docs/roadmap.md says so, out loud.", "What was cut, why, and where a contributor could pick it up. A roadmap isn't where cut work goes to die; it's where the next person finds room.", 2);
  footer(s);
  s.addNotes("Ninety seconds. Prop Loft's design plans five vertical slices before its real-world trial. Counting one maintainer's hours, two milestones hold three slices. Click: four and five move to the roadmap. Second click: the cut is written down in docs/roadmap.md, with reasons, framed as places to help. That's CP8's roadmap criterion, and it's 20% of the grade. Open the file if you have time.");

  // 16 Noticing what's new
  s = mk(); s.background = { color: C.white };
  header(s, "Noticing what's new", "How do you know what's still waiting?");
  const intake = [
    [FA.FaTag, "A label the forms apply", "Removed when a maintainer has read it. Prop Loft's: needs triage."],
    [FA.FaColumns, "A New column", "Auto-add drops new issues there; the column is the queue."],
    [FA.FaEraser, "No labels = untriaged", "Zero setup. Breaks once forms add labels."],
    [FA.FaCalendarCheck, "A person and a day", "Someone reads everything new, every week."]
  ];
  for (let i = 0; i < 4; i++) {
    const x = 0.6 + i * 3.075;
    const def = i === 0;
    card(s, x, 1.95, 2.9, 3.3, def ? C.navy : C.cardBg);
    await iconCircle(s, intake[i][0], x + 0.25, 2.15, 0.6, def ? C.amber : C.teal, def ? C.navy : "FFFFFF");
    s.addText(intake[i][1], { x: x + 0.25, y: 2.9, w: 2.45, h: 0.85, color: def ? C.white : C.ink, fontFace: F.body, fontSize: 17, bold: true, valign: "top", margin: 0 });
    s.addText(intake[i][2], { x: x + 0.25, y: 3.8, w: 2.45, h: 1.35, color: def ? "CFE0E9" : C.slate, fontFace: F.body, fontSize: 15, valign: "top", margin: 0 });
  }
  bar(s, 5.5, 1.25, C.amberBg, "Using a label?", "Create it before a form names it. A form skips labels that don't exist, without a warning. File a test issue to check.");
  footer(s);
  s.addNotes("Two minutes. Callback to Session 16: your communication norms promised a response time, and CP7 asked how you'd know what's waiting. This is that answer, now called triage. The highlighted card is the default; the others are real alternatives. The amber warning is the trap: the forms silently drop a label that doesn't exist yet. Ask who has already filed a test issue through their own form.");

  // 17 The board
  s = mk(); s.background = { color: C.white };
  header(s, "The board", "Columns are the states your work actually passes through");
  const board = [
    ["Backlog", ["Check an item out from its page", "Record a return"]],
    ["Ready", ["Show an item's detail page", "Record checkouts"]],
    ["In progress", ["Search items by name"]],
    ["In review", []],
    ["Done", []]
  ];
  const bw = 2.3, bg = 0.15;
  for (let i = 0; i < board.length; i++) {
    const x = 0.6 + i * (bw + bg);
    const review = i === 3;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.95, w: bw, h: 3.55, fill: { color: review ? C.amberBg : C.cardBg }, line: { type: "none" }, rectRadius: 0.08 });
    s.addText(board[i][0], { x: x + 0.15, y: 2.02, w: bw - 0.3, h: 0.5, color: review ? C.ink : C.tealDk, fontFace: F.body, fontSize: 17, bold: true, valign: "middle", margin: 0 });
    for (let j = 0; j < board[i][1].length; j++) {
      const y = 2.6 + j * 1.0;
      card(s, x + 0.12, y, bw - 0.24, 0.88, C.white);
      s.addText(board[i][1][j], { x: x + 0.25, y, w: bw - 0.5, h: 0.88, color: C.ink, fontFace: F.body, fontSize: 15, valign: "middle", margin: 0 });
    }
    if (review) s.addText("Your review policy lives here", { x: x + 0.15, y: 2.7, w: bw - 0.3, h: 1.2, color: C.slate, fontFace: F.body, fontSize: 15, italic: true, valign: "top", margin: 0 });
    if (i === 4) s.addText("Fills itself: closed issues and merged PRs move here", { x: x + 0.15, y: 2.7, w: bw - 0.3, h: 1.4, color: C.slate, fontFace: F.body, fontSize: 15, italic: true, valign: "top", margin: 0 });
  }
  bar(s, 5.75, 1.0, C.navy, "Default columns.", "Change them to fit how your project works, but keep a review state. Ready means acceptance criteria are written.", 1);
  footer(s);
  s.addNotes("Ninety seconds. This is Prop Loft's board at the start of the build. Walk the columns: Backlog is decided, Ready means anyone could pick it up because the criteria are written, In progress means someone said they're on it. In review is where a PR waits; it's the column that shows whether your review policy is real. Done fills itself. Click for the default rule. A board where everything is In progress tells a reader nothing.");

  // 18 Setting it up
  s = mk(); s.background = { color: C.white };
  header(s, "Setting it up · live", "Five steps, at your organization");
  const setup = [
    ["Create it", "Org → Projects → New project → Board. Check Import items from repository."],
    ["Set the columns", "They're the Status field's options. Edit them from any column's ⋯ menu."],
    ["Set up the workflows", "Workflows: auto-add is:issue is:open; new items → Backlog; closed and merged → Done."],
    ["Make it public, then link it", "A new project is private, even in a public org. Then repo → Projects → Link a project."],
    ["Add two views", "Swimlanes by milestone (what's left?) and by parent issue (how's each epic?). Save each."]
  ];
  for (let i = 0; i < setup.length; i++) {
    const y = 1.95 + i * 0.86;
    const hi = i === 3;
    card(s, 0.6, y, 12.1, 0.76, hi ? C.navy : C.cardBg);
    s.addShape(pres.shapes.OVAL, { x: 0.8, y: y + 0.13, w: 0.5, h: 0.5, fill: { color: hi ? C.amber : C.teal } });
    s.addText(String(i + 1), { x: 0.8, y: y + 0.13, w: 0.5, h: 0.5, color: hi ? C.navy : C.white, fontFace: F.head, fontSize: 18, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(setup[i][0], { x: 1.5, y, w: 3.3, h: 0.76, color: hi ? C.amber : C.tealDk, fontFace: F.body, fontSize: 17, bold: true, valign: "middle", margin: 0 });
    s.addText(setup[i][1], { x: 4.8, y, w: 7.7, h: 0.76, color: hi ? C.white : C.ink, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0 });
  }
  s.addText("Every step, with screenshots: Canvas → Course Resources → Setting Up Your Board.", { x: 0.6, y: 6.32, w: 12.1, h: 0.5, color: C.slate, fontFace: F.body, fontSize: 15, italic: true, valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("Demo it live on Prop Loft or a scratch org, about four minutes, then leave this up during the workshop. Step 1 imports existing issues because auto-add only catches new ones, and free organizations get one auto-add workflow. Step 3: the board holds issues only; a PR shows on the card of the issue it closes. Which workflows start out on varies, so check each one. Step 5: on a board the setting is called Swimlanes, and an unsaved view shows a dot on its tab and reverts. Step 4 is the trap: projects start private, so a stranger or the auditor sees nothing. Say it twice. The page has every click; students don't need to copy this down.");

  // 19 Pathways
  s = mk(); s.background = { color: C.white };
  header(s, "A way in for a newcomer", "Two or three real starting points");
  s.addText("Prop Loft · a good first issue", { x: 0.6, y: 1.85, w: 6.9, h: 0.35, color: C.slate, fontFace: F.body, fontSize: 15, bold: true, margin: 0 });
  codeBlock(s, 0.6, 2.25, 6.9, 3.35, [
    ["Show an item's detail page", C.amber],
    ["good first issue", C.codeAdd],
    ["Where to start", C.codeDim],
    ["- A view beside item_list in", C.code],
    ["  catalog/views.py (get_object_or_404)", C.code],
    ["- Its URL; a template next to the list's", C.code],
    ["- A test modeled on ItemListTests,", C.code],
    ["  plus one for a missing item (404)", C.code]
  ], {}, 14.5);
  const gfi = [
    ["Small, and needs no history", "A newcomer shouldn't need to know why things are the way they are."],
    ["Says where to start", "The file, the function to imitate, the test to copy. Two extra sentences."],
    ["Findable from the front door", "README and CONTRIBUTING link the board and the roadmap."]
  ];
  for (let i = 0; i < 3; i++) {
    const y = 1.95 + i * 1.27;
    card(s, 7.75, y, 4.95, 1.12, C.cardBg);
    s.addText([
      { text: gfi[i][0], options: { bold: true, color: C.ink, breakLine: true } },
      { text: gfi[i][1], options: { color: C.slate, fontSize: 15 } }
    ], { x: 8.0, y, w: 4.5, h: 1.12, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, lineSpacingMultiple: 1.02 });
  }
  bar(s, 5.85, 0.9, C.amber, null, "A good first issue with no context is a trap, not an invitation.");
  footer(s);
  s.addNotes("Ninety seconds. Prop Loft's item-detail issue is the model: a newcomer knows which file to open and what to copy before they've read anything else. good first issue is GitHub's own label for this, so there's rarely a reason to change it. Contribution pathways are 20% of CP8 and they're tested again at launch. Tag two or three in the workshop, and write their Where to start sections, not just the label.");

  // 20 Two layers of done
  s = mk(); s.background = { color: C.white };
  header(s, "Two layers of \"done\"", "This change, and every change");
  card(s, 0.6, 1.95, 5.95, 3.6, C.cardBg);
  s.addText([
    { text: "Acceptance criteria", options: { bold: true, color: C.tealDk, fontSize: 20, breakLine: true } },
    { text: "In each issue: what this change must do", options: { color: C.slate, fontSize: 15 } }
  ], { x: 0.95, y: 2.05, w: 5.3, h: 0.9, fontFace: F.body, valign: "middle", margin: 0 });
  s.addText([
    { text: "The list filters by name, ignoring case", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 6 } },
    { text: "An empty search shows everything", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 6 } },
    { text: "Tests cover a match, case, and empty", options: { bullet: { indent: 16 } } }
  ], { x: 0.95, y: 3.1, w: 5.35, h: 2.3, color: C.ink, fontFace: F.body, fontSize: 16, valign: "top", margin: 0 });
  card(s, 6.75, 1.95, 5.95, 3.6, C.navy);
  s.addText([
    { text: "Definition of done", options: { bold: true, color: C.amber, fontSize: 20, breakLine: true } },
    { text: "In the git standards: what every change must pass", options: { color: "9FB4C7", fontSize: 15 } }
  ], { x: 7.1, y: 2.05, w: 5.3, h: 0.9, fontFace: F.body, valign: "middle", margin: 0 });
  s.addText([
    { text: "Reviewed under the project's rules", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 6 } },
    { text: "Merged; tests pass on main", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 6 } },
    { text: "Docs say what the code now does", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 6 } },
    { text: "Its issue closed, with a note if it differs", options: { bullet: { indent: 16 } } }
  ], { x: 7.1, y: 3.1, w: 5.35, h: 2.3, color: C.white, fontFace: F.body, fontSize: 16, valign: "top", margin: 0 });
  bar(s, 5.8, 0.95, C.amberBg, "You wrote one in CP6.", "Revisit it now there's code: does it name your test command? Keep it in that one place and link it; don't copy it into issues.", 1);
  footer(s);
  s.addNotes("Ninety seconds. Left: acceptance criteria belong to one issue. Right: Prop Loft's definition of done, which every change passes regardless of what it is. Students already wrote one in their git standards for CP6. Click: CP8 grades the revised version, so the question is whether a reviewer could check each item now that there's code. It stays in the git standards; a copy elsewhere drifts.");

  // 21 Workshop
  s = mk(); s.background = { color: C.navy };
  darkHeader(s, "Workshop · 28 min", "Decompose your own MVP, live in your tracker");
  const ws = [
    ["5 min", "Set up", "Create the project (public, linked); add the epic label and a task form, or your alternative with its reason"],
    ["6 min", "Epics", "3–5 parent issues, named for value, each linked to a goal in your design"],
    ["12 min", "M1, in full", "Walking skeleton first, in Ready; sub-issues with real acceptance criteria; triage your CP7 seeds"],
    ["5 min", "Dates and pathways", "M1 and M2 dated; issues placed and given a status; 2–3 good first issues with Where to start"]
  ];
  for (let i = 0; i < ws.length; i++) {
    const y = 1.95 + i * 0.92;
    card(s, 0.6, y, 12.1, 0.8, C.navy2);
    s.addText(ws[i][0], { x: 0.85, y, w: 1.1, h: 0.8, color: C.amber, fontFace: F.body, fontSize: 16, bold: true, valign: "middle", margin: 0 });
    s.addText(ws[i][1], { x: 2.0, y, w: 2.6, h: 0.8, color: C.white, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
    s.addText(ws[i][2], { x: 4.6, y, w: 7.9, h: 0.8, color: "CFE0E9", fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0 });
  }
  card(s, 0.6, 5.75, 12.1, 1.0, C.amber);
  s.addText([
    { text: "I'll ask:  ", options: { bold: true } },
    { text: "Which issue is secretly an epic? · What must be true on Nov 18, and is that M1? · What did you change from the defaults, and why?" }
  ], { x: 0.95, y: 5.75, w: 11.4, h: 1.0, color: C.navy, fontFace: F.body, fontSize: 16.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  footer(s, "7E92A8");
  s.addNotes("Keep time out loud at each step. Most students are solo, so circulate to every repo at least twice. Push epics first: projects that start writing issues before epics end up with a flat pile. Check every board has the walking skeleton first in Ready, with an owner. In the M1 block, read acceptance criteria aloud back to their authors and ask if a reviewer could mark each true or false. Whatever isn't finished, M2 especially, is homework: M2 only needs to be coarse by Wednesday.");

  // 22 Wrap
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: -1.3, y: 5.2, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaSitemap, 0.9, 1.15, 0.85, C.amber, C.navy);
  s.addText("The tracker is your project's public memory, and its welcome mat.", { x: 0.9, y: 2.15, w: 11.9, h: 1.05, color: C.white, fontFace: F.head, fontSize: 26, bold: true, italic: true, margin: 0, lineSpacingMultiple: 1.06 });
  s.addText("BEFORE WEDNESDAY, NOV 4", { x: 0.92, y: 3.4, w: 11, h: 0.35, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText([
    { text: "Start building: open the walking skeleton's PR (or your first slice issue's, if the repo already runs)", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 7, bold: true, color: C.white } },
    { text: "Finish M1's issues; break M2 down coarsely, at the epic or rough-issue level", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "Write docs/roadmap.md, and revisit the definition of done in your git standards", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "Wednesday: size every M1 issue, find the dependencies, and commit to the vertical slice", options: { bullet: { indent: 16 } } }
  ], { x: 0.95, y: 3.8, w: 11.7, h: 2.05, color: "CBD8E6", fontFace: F.body, fontSize: 17, valign: "top", margin: 0 });
  card(s, 0.6, 5.95, 12.1, 0.8, C.amber);
  s.addText("CP8 Project Plan & Roadmap is due end of day Wednesday, Nov 4. Submit your public board's URL.", { x: 0.9, y: 5.95, w: 11.5, h: 0.8, color: C.navy, fontFace: F.body, fontSize: 16, bold: true, align: "center", valign: "middle", margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("Close in a few minutes. Say the one-liner, then say it again: the build has started, and the skeleton's PR is open before Wednesday. M1 fine-grained and M2 coarse is the right shape, not a shortcut. The roadmap and the definition of done are files, so they go in through PRs. Wednesday is estimation and sequencing, and the slice statement on M1 becomes the progress-demo commitment. Remind them to check that the board is public before submitting: a private board can't be graded.");

  const OUT = "Session17-DesignToWork.pptx";
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
