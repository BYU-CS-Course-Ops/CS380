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
pres.title = "CS 301R — Session 21 — Check-in & Studio";

let PAGE = 0;
function mk() { PAGE++; return pres.addSlide(); }
function footer(slide, col) {
  const c = col || C.slate;
  slide.addText("CS 301R · Session 21 · Check-in & Studio", { x: 7.3, y: 7.04, w: 5.4, h: 0.3, align: "right", color: c, fontFace: F.body, fontSize: 10, margin: 0 });
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

async function build() {
  let s;

  // 1 Title
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: 10.9, y: -1.4, w: 4.2, h: 4.2, fill: { color: "1C3252" } });
  s.addShape(pres.shapes.OVAL, { x: 12.0, y: 5.1, w: 3.0, h: 3.0, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaTools, 0.9, 1.45, 1.0, C.amber, C.navy);
  s.addText("CS 301R · SOFTWARE ENGINEERING STUDIO I", { x: 0.92, y: 2.75, w: 11, h: 0.35, color: "9FB4C7", fontFace: F.body, fontSize: 15, bold: true, charSpacing: 2, margin: 0 });
  s.addText("Make Wednesday Boring", { x: 0.9, y: 3.15, w: 12.1, h: 1.3, color: C.white, fontFace: F.head, fontSize: 42, bold: true, margin: 0 });
  s.addText([
    { text: "Session 21 — check-in, triage, and a working studio", options: { color: C.amber, bold: true, breakLine: true } },
    { text: "Monday, November 16, 2026", options: { color: "9FB4C7" } }
  ], { x: 0.92, y: 4.7, w: 11, h: 0.9, fontFace: F.body, fontSize: 19, margin: 0, lineSpacingMultiple: 1.2 });
  s.addNotes("Before class: draw the blocker board, a column headed Blocked > 30 min, and pre-load anything you saw over the weekend in the MVP Plans, the repos, and the Session 20 cold-test issues. Have Wednesday's demo order and audit pairings ready to write up. Bring a few printed audit sheets to pass around; the PDF is on Canvas. Two days before CP10 and CP9. Keep the talking short.");

  // 2 Today
  s = mk(); s.background = { color: C.white };
  header(s, "Today", "Honest state, deliberate cuts, then build");
  const plan = [
    [FA.FaClipboardList, "Framing, and the blocker board", "3 min"],
    [FA.FaStopwatch, "Lightning check-in: every project, two minutes", "15 min"],
    [FA.FaCut, "Triage: the board, worked out loud", "12 min"],
    [FA.FaTools, "Studio: build, and get audit-ready", "40 min"],
    [FA.FaCalendarCheck, "Wednesday's run of show", "5 min"]
  ];
  for (let i = 0; i < plan.length; i++) {
    const y = 2.0 + i * 0.92;
    const hi = i === 3;
    card(s, 0.6, y, 12.1, 0.78, hi ? C.navy : C.cardBg);
    await iconCircle(s, plan[i][0], 0.88, y + 0.13, 0.52, hi ? C.amber : C.teal, hi ? C.navy : "FFFFFF");
    s.addText(plan[i][1], { x: 1.65, y, w: 9.0, h: 0.78, color: hi ? C.white : C.ink, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
    s.addText(plan[i][2], { x: 10.6, y, w: 1.8, h: 0.78, color: hi ? C.amber : C.slate, fontFace: F.body, fontSize: 16, bold: true, align: "right", valign: "middle", margin: 0 });
  }
  footer(s);
  s.addNotes("Thirty seconds. Two days before the progress demo, the worst thing class could be is a lecture. The first half hour makes every project's true state visible and decides the cuts; the highlighted block is the point: forty minutes of building with help on hand. Today exists to make Wednesday boring, in the good way: no surprises at midnight Tuesday.");

  // 3 Blocker board
  s = mk(); s.background = { color: C.white };
  header(s, "Starting today", "The blocker board");
  card(s, 0.6, 2.0, 5.2, 4.1, C.navy);
  s.addText("BLOCKED > 30 MIN", { x: 0.9, y: 2.2, w: 4.6, h: 0.4, color: C.amber, fontFace: F.body, fontSize: 16, bold: true, charSpacing: 2, margin: 0 });
  const bl = ["Prop Loft · photo upload fails on HEIC", "Project A · can't deploy the database", "Project B · which test framework?", "Project C · the cut: drop or shrink search?"];
  for (let i = 0; i < bl.length; i++) {
    s.addShape(pres.shapes.LINE, { x: 0.9, y: 2.85 + i * 0.75, w: 4.6, h: 0, line: { color: "3A5373", width: 1 } });
    s.addText(bl[i], { x: 0.9, y: 2.9 + i * 0.75, w: 4.6, h: 0.65, color: "CFE0E9", fontFace: F.body, fontSize: 16, valign: "middle", margin: 0, italic: i > 0 });
  }
  const why = [
    ["Anything that stopped you 30 minutes", "One line, your project's name. It's the queue, not a confession."],
    ["Stuck in private costs an hour", "On the board, it gets worked in order, today."],
    ["A second pair of eyes", "Talking it through with someone outside the problem often turns up the next step."]
  ];
  for (let i = 0; i < why.length; i++) {
    const y = 2.0 + i * 1.4;
    card(s, 6.1, y, 6.6, 1.25, C.cardBg, REVEAL(i + 1));
    s.addText([
      { text: why[i][0], options: { bold: true, color: C.tealDk, breakLine: true } },
      { text: why[i][1], options: { color: C.ink } }
    ], { x: 6.4, y, w: 6.1, h: 1.25, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, lineSpacingMultiple: 1.05, ...REVEAL(i + 1) });
  }
  s.addText("It stays up in every studio session from here to the end of term.", { x: 0.6, y: 6.35, w: 12.1, h: 0.45, color: C.tealDk, fontFace: F.body, fontSize: 17, bold: true, italic: true, margin: 0 });
  footer(s);
  s.addNotes("Two minutes. The left side is what it looks like; the first line is Prop Loft's real HEIC question, the others are placeholders. One click per reason. Say plainly that putting something on the board is not admitting you're behind; hiding it is what costs the hour. The check-in fills it today; after today, students add to it themselves in every studio session.");

  // 4 Lightning check-in
  s = mk(); s.background = { color: C.navy };
  darkHeader(s, "Lightning check-in · 2 min each", "Every project, out loud, no slides");
  const ci = [
    ["1", "The slice you'll demo", "The path in your slice statement. Works end to end today?  yes · almost · no"],
    ["2", "Your first milestone", "Done vs. remaining, in numbers, not adjectives"],
    ["3", "Top blocker", "One. It goes on the board as you say it."],
    ["4", "The cut you're considering", "Every project names one, even the ones that are ahead"]
  ];
  for (let i = 0; i < ci.length; i++) {
    const y = 1.95 + i * 1.0;
    card(s, 0.6, y, 12.1, 0.86, C.navy2);
    s.addShape(pres.shapes.OVAL, { x: 0.85, y: y + 0.17, w: 0.52, h: 0.52, fill: { color: C.amber } });
    s.addText(ci[i][0], { x: 0.85, y: y + 0.17, w: 0.52, h: 0.52, color: C.navy, fontFace: F.body, fontSize: 18, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(ci[i][1], { x: 1.6, y, w: 3.6, h: 0.86, color: C.white, fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0 });
    s.addText(ci[i][2], { x: 5.2, y, w: 7.3, h: 0.86, color: "CFE0E9", fontFace: F.body, fontSize: 17, valign: "middle", margin: 0 });
  }
  card(s, 0.6, 6.05, 12.1, 0.7, C.amber);
  s.addText("Two minutes, hard stop. Honest beats impressive: nobody is graded on today's answers.", { x: 0.95, y: 6.05, w: 11.4, h: 0.7, color: C.navy, fontFace: F.body, fontSize: 16.5, bold: true, valign: "middle", margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("Fifteen minutes; leave this up for the whole round and run a visible timer. Write each blocker and each cut on the board as it's said: that's the triage queue. The fourth item is the important one: every project names a cut, which makes cutting normal instead of shameful. Numbers, not adjectives, on the milestone: 'six of nine issues closed' not 'going well'.");

  // 5 Triage
  s = mk(); s.background = { color: C.white };
  header(s, "Triage · 12 min", "Four kinds of blocker, four different moves");
  const tri = [
    [FA.FaCode, "Technical", "Find the next step: the cheapest test, someone outside who'd know, or treat it as scope.", C.teal],
    [FA.FaCut, "Scope", "Decide now: cut it, shrink its acceptance criteria, or plan the fallback.", C.coral],
    [FA.FaDesktop, "Demo mechanics", "Match it to a fallback: seed data, a local mode, a declared clip.", C.teal],
    [FA.FaUserFriends, "Team or process", "Take it to the instructor one on one, during studio.", C.slate]
  ];
  for (let i = 0; i < tri.length; i++) {
    const x = 0.6 + (i % 2) * 6.15, y = 2.0 + Math.floor(i / 2) * 2.15;
    card(s, x, y, 5.95, 1.95, C.cardBg);
    await iconCircle(s, tri[i][0], x + 0.3, y + 0.25, 0.62, tri[i][3], "FFFFFF");
    s.addText(tri[i][1], { x: x + 1.1, y: y + 0.25, w: 4.6, h: 0.62, color: C.ink, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
    s.addText(tri[i][2], { x: x + 0.3, y: y + 1.0, w: 5.35, h: 0.85, color: C.ink, fontFace: F.body, fontSize: 17, valign: "top", margin: 0 });
  }
  s.addText("Ahead of schedule? Spend it on audit readiness, not new features.", { x: 0.6, y: 6.35, w: 12.1, h: 0.45, color: C.tealDk, fontFace: F.body, fontSize: 17, bold: true, italic: true, margin: 0 });
  footer(s);
  s.addNotes("Twelve minutes, working the board out loud. Sort each blocker into one of the four as you go. Scope problems get decided in the room, now, using the next slide. Technical ones get worked in studio: the aim isn't for me to solve them, it's to help find the next step, whether that's the cheapest test from the debugging loop, an outside source (the library's issue tracker, its docs, a forum), or a scope decision. Team or process issues never get worked in public. If a project is ahead, say so and redirect them: Wednesday rewards a repo a stranger can enter, not one more feature.");

  // 6 The scope test
  s = mk(); s.background = { color: C.white };
  header(s, "The scope test", "Two questions for anything you might cut");
  numRow(s, 2.0, 1.15, 1, "Does keeping it prove one of your v1 claims?", "The claims in your MVP Plan, in rank order.");
  numRow(s, 3.35, 1.15, 2, "Does cutting it break the slice?", "The path your demo walks, end to end.");
  card(s, 0.6, 4.8, 12.1, 1.9, C.navy, REVEAL(1));
  s.addText([
    { text: "No and no: cut it.  ", options: { bold: true, color: C.amber } },
    { text: "Then amend the MVP Plan in the repo, so the change is visible. A visible cut is honesty; a quiet one reads as a miss on Wednesday. Every cut is also a line for your known-issues list and, later, your retrospective.", options: { color: C.white } }
  ], { x: 0.95, y: 4.8, w: 11.4, h: 1.9, fontFace: F.body, fontSize: 18, valign: "middle", margin: 0, lineSpacingMultiple: 1.06, ...REVEAL(1) });
  footer(s);
  s.addNotes("Use this on every scope blocker in triage. Read both questions, get a yes or no for each from the project, then click. Stress the amendment: the demo is scored against the MVP Plan, so a cut made in the plan is fine and a cut made silently looks like a failure to deliver. Cuts made today are content for the known-issues list and the Week 13 retrospective, not embarrassments.");

  // 7 Studio
  s = mk(); s.background = { color: C.navy };
  darkHeader(s, "Studio · 40 min", "Build with help on hand, then get audit-ready");
  const st = [
    [FA.FaTools, "Build, about 30 min", "I go down the board in order, helping you find the next step. Add to it if you get stuck."],
    [FA.FaSearch, "Audit-readiness pass, last 10 min", "Every project, before you leave. The next slide is the list."],
    [FA.FaFolderOpen, "CP9 corner", "Missing portfolio pieces? This week's PRs, demo-path issues, and cold-test replies all count."]
  ];
  for (let i = 0; i < st.length; i++) {
    const y = 1.95 + i * 1.3;
    card(s, 0.6, y, 12.1, 1.12, C.navy2);
    await iconCircle(s, st[i][0], 0.85, y + 0.24, 0.62, C.amber, C.navy);
    s.addText(st[i][1], { x: 1.7, y, w: 3.8, h: 1.12, color: C.white, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
    s.addText(st[i][2], { x: 5.5, y, w: 7.0, h: 1.12, color: "CFE0E9", fontFace: F.body, fontSize: 16.5, valign: "middle", margin: 0 });
  }
  card(s, 0.6, 5.95, 12.1, 0.8, C.amber);
  s.addText("CP9 is due before class Wednesday. CP10's demo and audit happen in class.", { x: 0.95, y: 5.95, w: 11.4, h: 0.8, color: C.navy, fontFace: F.body, fontSize: 17, bold: true, valign: "middle", margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("Forty minutes; leave this up. Work the blocker board in triage order, not by raised hands. On a technical blocker, coach rather than fix: what have you tried, what's the cheapest next test, who outside would know, and is it worth a cut instead? Call the audit-readiness pass at the 30-minute mark and make every project do it before leaving, even the ones mid-fix. Point anyone short on CP9 artifacts at what already exists: legitimate pieces are everywhere by now.");

  // 8 Audit readiness
  s = mk(); s.background = { color: C.white };
  header(s, "Audit-readiness pass · 10 min", "Look at main the way a stranger will on Wednesday");
  const ar = [
    ["Fresh clone, one more time", "New folder, main, your own setup guide, exactly as written. Is it still true after this week's changes?"],
    ["The board tells the truth", "In progress means someone is on it today. A stale board reads badly in an audit."],
    ["Good first issues are still good", "Still open, still approachable, and the where-to-start still points at real code."],
    ["The README's first paragraph", "Still says what the project is, and what works, this week."]
  ];
  for (let i = 0; i < ar.length; i++) numRow(s, 1.95 + i * 1.12, 0.98, i + 1, ar[i][0] + ".", ar[i][1]);
  s.addText("Whatever you find, fix it on main before you tag cp10.", { x: 0.6, y: 6.5, w: 12.1, h: 0.4, color: C.tealDk, fontFace: F.body, fontSize: 17, bold: true, italic: true, margin: 0 });
  footer(s);
  s.addNotes("Ten minutes at the end of studio. The fresh clone is the Session 20 cold test run by the author, on main, after a week of changes; things drift. The board check matters because the auditor skims it. A good first issue whose file moved this week sends a stranger to nothing. The README is the first thing anyone reads; it should describe this week's project, not last month's plan.");

  // 9 The audit, preview
  s = mk(); s.background = { color: C.white };
  header(s, "Wednesday's audit · the sheet", "What your auditor will do, in order");
  const au = [
    ["1", "Get it running", "From the README: prerequisites, install, configure, tests, run"],
    ["2", "Find their way", "Say what the project is; pick a good first issue and find the code to change"],
    ["3", "Read the history", "Commit log, pull requests, board, known issues, where to ask"],
    ["4", "Log every stall", "The step, the exact error or confusing line, and what they did about it"]
  ];
  for (let i = 0; i < au.length; i++) {
    const y = 1.95 + i * 0.95;
    card(s, 0.6, y, 7.4, 0.82, C.cardBg);
    s.addText(au[i][0], { x: 0.8, y, w: 0.4, h: 0.82, color: C.teal, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
    s.addText([
      { text: au[i][1], options: { bold: true, color: C.ink, breakLine: true } },
      { text: au[i][2], options: { color: C.slate, fontSize: 15 } }
    ], { x: 1.3, y, w: 6.55, h: 0.82, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0 });
  }
  card(s, 8.3, 1.95, 4.4, 3.67, C.navy);
  s.addText("EACH SETUP STEP", { x: 8.6, y: 2.1, w: 3.9, h: 0.35, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  const lv = ["As written", "A guess or workaround", "Step wrong or missing", "Couldn't get past it"];
  for (let i = 0; i < lv.length; i++) {
    s.addShape(pres.shapes.RECTANGLE, { x: 8.6, y: 2.68 + i * 0.7, w: 0.28, h: 0.28, fill: { color: C.navy }, line: { color: C.amber, width: 1.5 } });
    s.addText(lv[i], { x: 9.05, y: 2.58 + i * 0.7, w: 3.5, h: 0.5, color: C.white, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0 });
  }
  bar(s, 5.9, 0.85, C.amber, null, "The sheet is on Canvas now. Read it tonight and audit your own repo against it.", 1);
  footer(s);
  s.addNotes("Three minutes; pass a few printed sheets around. This is the whole sheet in four parts. The right side is how each setup step is recorded, and those four results line up with the rubric's levels for the repo audit: as written is Exemplary territory, couldn't is Beginning. Click: nothing on Wednesday should be a surprise, so the best preparation is running the sheet on your own repo.");

  // 10 Facts, not a score
  s = mk(); s.background = { color: C.white };
  header(s, "Wednesday's audit · the rules", "The sheet records facts. I assign the level.");
  const ru = [
    [FA.FaCodeBranch, "From the tag", "Your auditor clones cp10, not main. What's on the tag is what's audited."],
    [FA.FaUserFriends, "Everyone at once", "You audit your partner's repo while they audit yours. Nobody to ask: the docs are all you get."],
    [FA.FaClipboardCheck, "Facts, not a score", "The auditor records what happened. I watch, repeat the hardest step if needed, and assign the level."],
    [FA.FaListOl, "Then a fix list", "The signed sheet comes back to you; it becomes your top five fixes for the launch."]
  ];
  for (let i = 0; i < ru.length; i++) {
    const x = 0.6 + (i % 2) * 6.15, y = 2.0 + Math.floor(i / 2) * 2.2;
    card(s, x, y, 5.95, 2.0, C.cardBg, REVEAL(i + 1));
    await iconCircle(s, ru[i][0], x + 0.3, y + 0.25, 0.62, C.teal, "FFFFFF", REVEAL(i + 1));
    s.addText(ru[i][1], { x: x + 1.1, y: y + 0.25, w: 4.6, h: 0.62, color: C.ink, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0, ...REVEAL(i + 1) });
    s.addText(ru[i][2], { x: x + 0.3, y: y + 1.0, w: 5.35, h: 0.9, color: C.ink, fontFace: F.body, fontSize: 17, valign: "top", margin: 0, ...REVEAL(i + 1) });
  }
  footer(s);
  s.addNotes("Ninety seconds, one click per rule. Everyone audits at the same time, so nobody is watching their own repo being audited and there's no one to ask; that's the point, because a future contributor won't have anyone to ask either. The auditor isn't grading a classmate; they're reporting what happened, which takes the social pressure off both sides. The sheet goes back to the authors and drives the studio work after Thanksgiving.");

  // 11 Run of show
  s = mk(); s.background = { color: C.white };
  header(s, "Wednesday, Nov 18", "The run of show");
  const rs = [
    ["4 min", "Setup", "Auditors start cloning their partner's cp10 tag right away"],
    ["~34 min", "Progress demos, whole room", "About 6 min each, then 3 min of questions. Read ahead: the CP10 assignment and the Session 22 page."],
    ["30 min", "Repo audits", "Everyone at once: you audit your partner's repo while they audit yours."],
    ["5 min", "Debrief", "Your audit sheet and demo feedback become a top-five fix list"]
  ];
  for (let i = 0; i < rs.length; i++) {
    const y = 1.95 + i * 0.95;
    card(s, 0.6, y, 12.1, 0.82, i === 1 || i === 2 ? C.ice : C.cardBg);
    s.addText(rs[i][0], { x: 0.85, y, w: 1.3, h: 0.82, color: C.teal, fontFace: F.body, fontSize: 17, bold: true, valign: "middle", margin: 0 });
    s.addText(rs[i][1], { x: 2.15, y, w: 3.5, h: 0.82, color: C.ink, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
    s.addText(rs[i][2], { x: 5.65, y, w: 6.85, h: 0.82, color: C.slate, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0 });
  }
  card(s, 0.6, 5.85, 12.1, 0.9, C.navy);
  s.addText([
    { text: "On the board now:  ", options: { bold: true, color: C.amber } },
    { text: "demo order and audit pairings. Write yours down.", options: { color: C.white } }
  ], { x: 0.95, y: 5.85, w: 11.4, h: 0.9, fontFace: F.body, fontSize: 18, valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("Five minutes with the next two slides. Write the demo order and audit pairings on the board before you show this; pairings are the review partners from Session 20. Time-boxes are hard on Wednesday: a demo that runs long takes time from someone else's. Class barely touches demo craft today, so point them at the CP10 assignment and the Session 22 page tonight. CP9 goes in through Canvas before class, not during it.");

  // 12 Freeze by tag
  s = mk(); s.background = { color: C.white };
  header(s, "Freeze by tag", "By 11:59 pm Tuesday, main becomes cp10");
  codeBlock(s, 0.6, 1.95, 12.1, 1.75, [
    ["# merge everything to main first", C.codeDim],
    "git switch main && git pull",
    "git tag -a cp10 -m \"CP10: progress demo\"",
    "git push origin cp10"
  ]);
  const fz = [
    ["Paste its URL in Canvas", "…/tree/cp10: the evidence for everything read from the repo"],
    ["Rehearse from the tag", "Once, fallback included, in a fresh clone of cp10"],
    ["Don't move it after midnight", "Keep working on main; it just isn't what's graded"]
  ];
  for (let i = 0; i < fz.length; i++) {
    const x = 0.6 + i * 4.1;
    card(s, x, 3.95, 3.9, 1.35, C.cardBg);
    s.addText([
      { text: fz[i][0], options: { bold: true, color: C.tealDk, breakLine: true } },
      { text: fz[i][1], options: { color: C.ink, fontSize: 15 } }
    ], { x: x + 0.25, y: 3.95, w: 3.45, h: 1.35, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0 });
  }
  bar(s, 5.55, 1.15, C.navy, "Why a tag:", "the demo runs from it, the auditor clones it, and grading reads it, so all three see the same thing. It's how a project marks a release.", null);
  footer(s);
  s.addNotes("Two minutes. The tag is the freeze: whatever is on main at 11:59 pm Tuesday, tagged and pushed, is what gets demoed, audited, and graded. A push to main Wednesday morning doesn't count. Rehearse from a fresh clone of the tag, not your working folder, because that's exactly what your auditor will do. This is the same move every release uses.");

  // 13 Wrap
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: -1.3, y: 5.2, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaFlagCheckered, 0.9, 1.0, 0.85, C.amber, C.navy);
  s.addText("Cut now, while it's a choice. Wednesday morning it's a failure.", { x: 0.9, y: 2.0, w: 11.9, h: 1.05, color: C.white, fontFace: F.head, fontSize: 25, bold: true, italic: true, margin: 0, lineSpacingMultiple: 1.06 });
  s.addText("BEFORE WEDNESDAY", { x: 0.92, y: 3.25, w: 11, h: 0.35, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText([
    { text: "Finish the slice; amend the MVP Plan for any cut you made today", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "Tag cp10 and push it by 11:59 pm Tuesday; paste its URL in Canvas", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 7, bold: true, color: C.white } },
    { text: "Rehearse the demo once from a fresh clone of the tag, fallback included", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "Read the audit sheet, and submit CP9 before class", options: { bullet: { indent: 16 } } }
  ], { x: 0.95, y: 3.68, w: 11.7, h: 2.1, color: "CBD8E6", fontFace: F.body, fontSize: 17, valign: "top", margin: 0 });
  card(s, 0.6, 5.95, 12.1, 0.8, C.amber);
  s.addText("Wednesday, Nov 18: CP10 demo + repo audit, live. CP9 due before class.", { x: 0.9, y: 5.95, w: 11.5, h: 0.8, color: C.navy, fontFace: F.body, fontSize: 16, bold: true, align: "center", valign: "middle", margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("One minute. Say the one-liner: a cut made today is a decision you get credit for; the same cut at 9 am Wednesday is a demo that breaks. The tag is the bolded line because it's the one with a hard deadline. The blocker board stays up; anything still on it gets a nudge from me before Tuesday.");

  const OUT = "Session21-CheckInStudio.pptx";
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
