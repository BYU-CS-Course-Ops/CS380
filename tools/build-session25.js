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
pres.title = "CS 301R — Session 25 — Launch Studio";

let PAGE = 0;
function mk() { PAGE++; return pres.addSlide(); }
function footer(slide, col) {
  const c = col || C.slate;
  slide.addText("CS 301R · Session 25 · Launch Studio", { x: 7.3, y: 7.04, w: 5.4, h: 0.3, align: "right", color: c, fontFace: F.body, fontSize: 10, margin: 0 });
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

// One row of the tester's moves: number, the need, what to do, and its time box.
function moveRow(s, y, h, n, need, todo, min) {
  card(s, 0.6, y, 12.1, h, C.cardBg);
  s.addShape(pres.shapes.OVAL, { x: 0.82, y: y + (h - 0.5) / 2, w: 0.5, h: 0.5, fill: { color: C.teal } });
  s.addText(String(n), { x: 0.82, y: y + (h - 0.5) / 2, w: 0.5, h: 0.5, color: C.white, fontFace: F.body, fontSize: 18, bold: true, align: "center", valign: "middle", margin: 0 });
  s.addText(need, { x: 1.5, y, w: 2.75, h, color: C.ink, fontFace: F.head, fontSize: 18, bold: true, valign: "middle", margin: 0 });
  s.addText(todo, { x: 4.3, y, w: 7.1, h, color: C.ink, fontFace: F.body, fontSize: 15, valign: "middle", margin: 0, lineSpacingMultiple: 1.02 });
  s.addText(min, { x: 11.45, y, w: 1.05, h, color: C.tealDk, fontFace: F.body, fontSize: 17, bold: true, align: "right", valign: "middle", margin: 0 });
}

async function build() {
  let s;

  // 1 Title
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: 10.9, y: -1.4, w: 4.2, h: 4.2, fill: { color: "1C3252" } });
  s.addShape(pres.shapes.OVAL, { x: 12.0, y: 5.1, w: 3.0, h: 3.0, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaRocket, 0.9, 1.45, 1.0, C.amber, C.navy);
  s.addText("CS 301R · SOFTWARE ENGINEERING STUDIO I", { x: 0.92, y: 2.75, w: 11, h: 0.35, color: "9FB4C7", fontFace: F.body, fontSize: 15, bold: true, charSpacing: 2, margin: 0 });
  s.addText("Launch Studio", { x: 0.9, y: 3.15, w: 12.1, h: 1.3, color: C.white, fontFace: F.head, fontSize: 42, bold: true, margin: 0 });
  s.addText([
    { text: "Session 25 — assemble the package, test the on-ramp", options: { color: C.amber, bold: true, breakLine: true } },
    { text: "Wednesday, December 2, 2026", options: { color: "9FB4C7" } }
  ], { x: 0.92, y: 4.7, w: 11, h: 0.9, fontFace: F.body, fontSize: 19, margin: 0, lineSpacingMultiple: 1.2 });
  s.addNotes("Before class: print the Launch Package Checklist and a clean Contributor-Readiness Checklist, one each per student; draw the status grid on the whiteboard; write the test pairings and repo URLs beside it (rotate the Session 22 pairs: A with C, B with D). Hand both sheets out at the door. This is a shipping studio: almost no talking from the front. The slides are for the transitions; leave each one up while its segment runs.");

  // 2 Today
  s = mk(); s.background = { color: C.white };
  header(s, "Today", "Two work blocks, one stranger's test, and a release");
  const plan = [
    [FA.FaTasks, "Standup: mark your sheet, pick your block-1 item", "8 min"],
    [FA.FaWrench, "Block 1: fix what your tester is about to hit", "20 min"],
    [FA.FaUserSecret, "The onboarding test, both directions at once", "22 min"],
    [FA.FaWrench, "Block 2: one fix, the worst that fits", "15 min"],
    [FA.FaPenFancy, "Retrospective cross-check", "5 min"],
    [FA.FaTag, "Before you tag, and what's next", "5 min"]
  ];
  for (let i = 0; i < plan.length; i++) {
    const y = 1.95 + i * 0.8;
    const hi = i >= 1 && i <= 3;
    card(s, 0.6, y, 12.1, 0.68, hi ? C.navy : C.cardBg);
    await iconCircle(s, plan[i][0], 0.88, y + 0.1, 0.48, hi ? C.amber : C.teal, hi ? C.navy : "FFFFFF");
    s.addText(plan[i][1], { x: 1.6, y, w: 9.0, h: 0.68, color: hi ? C.white : C.ink, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
    s.addText(plan[i][2], { x: 10.6, y, w: 1.8, h: 0.68, color: hi ? C.amber : C.slate, fontFace: F.body, fontSize: 16, bold: true, align: "right", valign: "middle", margin: 0 });
  }
  footer(s);
  s.addNotes("Thirty seconds. The three highlighted rows are the day: two short blocks of work and the test in between. One item per block, because one person does one thing well in twenty minutes; the sheet has a rule for choosing it. CP11 isn't due tonight: it's due Thursday at 11:59 pm, so there's a day to fix what the test turns up. Say that now so nobody spends block 1 panicking.");

  // 3 Shipping is its own skill
  s = mk(); s.background = { color: C.white };
  header(s, "Shipping is its own skill", "Separate from building, and every team that releases does it");
  const sh = [
    [FA.FaCheckDouble, "Make it true", "Each piece meets its bar. Not new writing: the release checklist."],
    [FA.FaUserSecret, "Have someone else test it", "An acceptance test, a release candidate. The author is the worst tester."],
    [FA.FaTag, "Release on purpose", "Tag it, with everything still broken written down."]
  ];
  for (let i = 0; i < 3; i++) {
    const x = 0.6 + i * 4.1;
    card(s, x, 1.95, 3.9, 2.75, C.cardBg);
    await iconCircle(s, sh[i][0], x + 0.3, 2.2, 0.7, C.teal, "FFFFFF");
    s.addText(sh[i][1], { x: x + 0.3, y: 3.0, w: 3.4, h: 0.6, color: C.ink, fontFace: F.head, fontSize: 20, bold: true, valign: "top", margin: 0 });
    s.addText(sh[i][2], { x: x + 0.3, y: 3.6, w: 3.3, h: 1.0, color: C.slate, fontFace: F.body, fontSize: 16, valign: "top", margin: 0 });
  }
  bar(s, 5.0, 0.85, C.navy, "Fix it or log it.", "Silence is the only failure. Nothing ships undocumented; nothing documented is untrue.", null);
  bar(s, 6.0, 0.8, C.cardBg, "Yours:", "the launch package, tested by a classmate today, tagged by Thursday night.", 1);
  footer(s);
  s.addNotes("Two minutes, the only real talk today. Start general: a team at work runs a release checklist and an acceptance test; an open-source project puts out a release candidate for a few outside people before the tag. The work is making things true and getting someone who didn't write them to check. Then the rule from Session 23, now operational: whatever the tester hits is fixed or written down before the tag. Click for the course version.");

  // 4 Two sheets
  s = mk(); s.background = { color: C.white };
  header(s, "Two sheets today", "One is yours all day; the other is your tester's");
  pairCards(s, 1.95, 3.0, [
    ["YOURS, ALL DAY", "Launch Package Checklist", "What's in the repository at the tag, row by row. Mark it today, and again as each row is ready to tag. Both block rules and the before-you-tag order are on it.", C.cardBg, C.tealDk],
    ["YOUR TESTER'S", "Contributor-Readiness Checklist", "The script your partner works through on your repo. They sign it and hand it back; you photograph it. It goes in your CP11 submission.", C.navy, C.amber]
  ]);
  bar(s, 5.25, 0.8, C.cardBg, "Needs 1–5", "on your sheet are the five newcomer questions on your tester's.", null);
  bar(s, 6.2, 0.7, C.amber, null, "Hand your clean Contributor-Readiness Checklist to your tester before the test.", null);
  footer(s);
  s.addNotes("One minute. Hold both up. The Launch Package Checklist stays with the student: it's where they mark status, choose each block's item, and track the order before tagging. The Contributor-Readiness Checklist is the one from Session 23, clean copy; the student fills in its Since the audit box during the standup, then hands it to their tester. The tester signs it, and the photo of the signed copy is CP11's Setup verification evidence.");

  // 5 Standup
  s = mk(); s.background = { color: C.white };
  header(s, "Standup", "Eight minutes: where you are, and what you'll do first");
  numRow(s, 1.95, 0.85, 1, "Mark the Today column.", "Done: on main and at the bar. Draft: on main, not there yet. Missing: not on main.");
  numRow(s, 2.95, 0.85, 2, "Copy your row to the board.", "One mark per item. It shows the room, and me, where the day goes.");
  numRow(s, 3.95, 0.85, 3, "Fill in Since the audit.", "On the tester's sheet: the two stalls that most stopped your Session 22 auditor.");
  numRow(s, 4.95, 0.85, 4, "Name your block-1 item.", "Sixty seconds each, round the room. The rule is on the next slide, and on your sheet.");
  bar(s, 6.05, 0.75, C.navy, "A branch doesn't count.", "If it isn't merged to main, it's missing.", null);
  footer(s);
  s.addNotes("Eight minutes. Students mark the sheet as they arrive, then copy the row to the whiteboard grid. Read the board while they fill in Since the audit: a row of missing marks means a private word now, not in block 2. In the round, each student says their row in one breath and their block-1 item; confirm or redirect using the rule. Anyone who names the retrospective gets redirected: it doesn't change what the tester sees.");

  // 6 Block 1
  s = mk(); s.background = { color: C.white };
  header(s, "Block 1: fix what your tester is about to hit", "One item, twenty minutes. Take the first of these that applies:");
  numRow(s, 1.95, 0.78, 1, "The test floor.", "No test on the core logic, the setup guide's command doesn't run it, or it fails.");
  numRow(s, 2.85, 0.78, 2, "A file the tester reads.", "Setup, onboarding, the README's first screen, or the starter issues: missing or false.");
  numRow(s, 3.75, 0.78, 3, "An audit stall that's still there.", "Your tester checks both by name.");
  numRow(s, 4.65, 0.78, 4, "Otherwise:", "the item furthest from its bar, usually the architecture overview or the roadmap.");
  bar(s, 5.7, 1.05, C.amber, null, "Pencils down at minute 28. Merge it or leave it on the branch, push main, and write the commit on your tester's sheet.", null);
  footer(s);
  s.addNotes("Twenty minutes; leave this up. Branch, PR, merge, even solo. Done means the row meets its bar on the sheet, not that it improved. If it won't finish, cut it to what's true and merge that: a short, accurate setup guide beats a half-edited long one. Rove with one question: when your tester opens this in five minutes, what will they trip on first? If it isn't what they're working on, switch. Call time at minute 28 sharp.");

  // 7 The test
  s = mk(); s.background = { color: C.white };
  header(s, "The onboarding test", "Everyone tests at once, so nobody can rescue their own repo");
  const tr = [
    [FA.FaCodeBranch, "Clone fresh", "Into a new folder, at the commit on the sheet."],
    [FA.FaBook, "The repo is your only help", "Don't ask the author. They're busy testing yours."],
    [FA.FaComments, "Think out loud", "And write what happened: facts, not a grade."],
    [FA.FaFileSignature, "Sign it", "Hand it back. The authors photograph it."]
  ];
  for (let i = 0; i < 4; i++) {
    const x = 0.6 + i * 3.075;
    card(s, x, 1.95, 2.9, 2.85, C.cardBg);
    await iconCircle(s, tr[i][0], x + 0.28, 2.2, 0.66, C.teal, "FFFFFF");
    s.addText(tr[i][1], { x: x + 0.28, y: 3.0, w: 2.4, h: 0.75, color: C.ink, fontFace: F.head, fontSize: 19, bold: true, valign: "top", margin: 0 });
    s.addText(tr[i][2], { x: x + 0.28, y: 3.75, w: 2.4, h: 1.0, color: C.slate, fontFace: F.body, fontSize: 15, valign: "top", margin: 0 });
  }
  bar(s, 5.05, 0.85, C.navy, "Pairings are on the board.", "Each repo gets a stranger who didn't audit it in Session 22.", null);
  bar(s, 6.05, 0.75, C.cardBg, "Twenty-two minutes,", "five questions. The next slide stays up the whole time.", null);
  footer(s);
  s.addNotes("One minute, then go. Point at the pairings. This runs the way the Session 22 audit did: both directions at the same moment, so no author is free to help, and the repository has to stand on its own. You are the only observer. Spend your time on question 3, setup: when someone stalls, repeat the step yourself, because a stall can be the tester's rather than the repo's. Note those for grading.");

  // 8 Five questions
  s = mk(); s.background = { color: C.white };
  header(s, "Five questions, twenty-two minutes", "What the tester does for each, and how long to spend");
  moveRow(s, 1.85, 0.78, 1, "What is this?", "Read the README's first screen for 60 seconds, look away, write one sentence. After setup, check the status line.", "2 min");
  moveRow(s, 2.7, 0.78, 2, "Am I welcome?", "First lines of CONTRIBUTING; the conduct contact; two or three closed outside issues or PRs.", "3 min");
  moveRow(s, 3.55, 0.78, 3, "How do I start?", "Follow docs/setup.md exactly, run the test command, run it. At 10 minutes, stop and mark where you got to.", "10 min");
  moveRow(s, 4.4, 0.78, 4, "Where do I start?", "Pick a good first issue. Find the file and function to change, docs first, search last. Write the path.", "4 min");
  moveRow(s, 5.25, 0.78, 5, "Will anyone respond?", "Find the response time and where to ask. Check how long recent issues and PRs waited.", "2 min");
  bar(s, 6.15, 0.72, C.navy, "Pass:", "from the docs alone.   Stall: guessed, searched, or worked around.   Fail: couldn't.", null);
  footer(s);
  s.addNotes("Leave this up for all twenty-two minutes. Call the time at 2, 5, 15, 19, and 21 so testers move on. The 10-minute stop on setup matters most: a tester stuck there never reaches questions 4 and 5, and the author loses that evidence. Stopped means fail, with where they got to. Remind testers to write why in a line for every mark; a bare stall teaches the author nothing.");

  // 9 Last minute
  s = mk(); s.background = { color: C.white };
  header(s, "In the last minute", "Finish the sheet, then hand it back");
  numRow(s, 1.95, 0.78, 1, "Under the hood:", "tick what you confirmed along the way. The test ran in question 3; known issues are linked from the README.");
  numRow(s, 2.85, 0.78, 2, "Since the audit:", "mark each of the two stalls fixed, logged, or still there.");
  numRow(s, 3.75, 0.78, 3, "The closing question:", "with no one to ask, what would stop someone first?");
  numRow(s, 4.65, 0.78, 4, "Sign and hand it back.", "Authors: initial it and photograph it now. It goes in your Canvas submission.");
  bar(s, 5.7, 1.0, C.cardBg, "Done early?", "Don't help. Reread the onboarding guide and note every place the docs and the repo disagree.", null);
  footer(s);
  s.addNotes("Put this up at minute 21 of the test. The photo now is the important instruction: a lost sheet costs the student CP11's evidence. Testers who finish early are tempted to start helping; they shouldn't, because help hides what the repo is missing. The closing question is often the most useful line on the sheet: it's the January question from Session 23, answered by a real stranger.");

  // 10 Block 2
  s = mk(); s.background = { color: C.white };
  header(s, "Block 2: one fix, the worst that fits", "The earliest fail on your sheet, or else the earliest stall");
  pairCards(s, 1.95, 2.75, [
    ["FITS IN 12 MINUTES", "Fix it", "Branch, PR, merge. Then check your tester's step again yourself.", C.strongBg, C.green],
    ["TOO BIG", "Log it properly", "A known-issues entry with the workaround, and its issue. Could a newcomer fix it? Label it good first issue, with where to start.", C.amberBg, C.tealDk]
  ], [REVEAL(1), REVEAL(2)]);
  bar(s, 5.0, 0.95, C.navy, "Everything else on the sheet:", "fixed or logged by Thursday night. List it on the back, each marked fix or log.", 3);
  bar(s, 6.1, 0.72, C.cardBg, "Thursday is for findings and drafts.", "No new features.", 3);
  footer(s);
  s.addNotes("Fifteen minutes; leave it up. Earliest fail first, because the questions are in the order a newcomer meets them: a fail at setup blocks everything after it. Logging well counts as the block's item when the fix won't fit, and a gap that becomes a starter issue is the system working. Rove with Setup verification in mind: Exemplary reads anything they hit is fixed or logged. Confirm every student leaves with a fix-or-log list.");

  // 11 Retrospective cross-check
  s = mk(); s.background = { color: C.white };
  header(s, "Retrospective cross-check", "Your draft, beside your signed sheet: three checks");
  numRow(s, 1.95, 0.85, 1, "Contradiction.", "Does a sentence claim what the sheet shows false? “Setup is straightforward” over a stall. Mark it.");
  numRow(s, 2.95, 0.85, 2, "New evidence.", "Does a claim about newcomers or the docs now have evidence? A pass counts. Cite it.");
  numRow(s, 3.95, 0.85, 3, "Next steps.", "Does “where it goes next” agree with the roadmap and with what the tester found?");
  bar(s, 5.1, 0.85, C.navy, "Evidence, not verdict.", "If a claim held, the test is the evidence. Don't go looking for a setback.", null);
  bar(s, 6.1, 0.7, C.cardBg, "A roadmap that starts with a feature", "when the tester couldn't install it is out of order.", null);
  footer(s);
  s.addNotes("Five minutes, marking only; the rewriting happens before Thursday's tag. The cross-check runs both ways, the same as Monday: a claim the test contradicts gets rewritten, and a claim the test supports gets the test cited as its evidence. Nobody should invent a setback to look reflective. The roadmap check catches the common mismatch: next steps that skip the problem the tester just hit.");

  // 12 Before you tag
  s = mk(); s.background = { color: C.white };
  header(s, "Before you tag, in this order", "It's on your sheet; it ends in the CP11 submission");
  numRow(s, 1.85, 0.62, 1, "Fix or log", "every remaining stall and fail from the test.");
  numRow(s, 2.55, 0.62, 2, "Bring every draft or missing row", "up to its bar, and tick Tagged.");
  numRow(s, 3.25, 0.62, 3, "Finish the retrospective", "with today's marks, and merge it.");
  numRow(s, 3.95, 0.62, 4, "Run the test command", "from the setup guide, on main. It passes.");
  numRow(s, 4.65, 0.62, 5, "Tag and push", "git tag -a v0.1-launch -m \"CP11: launch\", then git push origin v0.1-launch");
  numRow(s, 5.35, 0.62, 6, "Submit on Canvas:", "the tag's URL, your reflection, the photo of your signed checklist.");
  bar(s, 6.15, 0.72, C.amber, null, "Due Thursday, Dec 3, 11:59 pm. The extra day is for the package; the pitch gets the weekend.", null);
  footer(s);
  s.addNotes("Two minutes. Walk the order once. Step 4 is the one people skip: a last-minute merge breaks the test, and the testing floor caps Contributor-readiness at Developing. Say the trade-off out loud: the extra day comes out of pitch time, so Thursday is fixes and drafts, not features, and Monday's dry run still needs the pitch performance-ready. Grading reads the tag; work pushed after it isn't seen.");

  // 13 Wrap
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: -1.3, y: 5.2, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaRocket, 0.9, 0.85, 0.85, C.amber, C.navy);
  s.addText("After the tag, the project is launched.", { x: 0.9, y: 1.85, w: 11.9, h: 0.8, color: C.white, fontFace: F.head, fontSize: 25, bold: true, italic: true, margin: 0 });
  s.addText("WHAT'S LEFT IS TELLING ITS STORY WELL", { x: 0.92, y: 2.85, w: 11, h: 0.35, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText([
    { text: "Thursday, Dec 3, 11:59 pm: v0.1-launch tagged, CP11 submitted", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 6, bold: true, color: C.white } },
    { text: "Monday, Dec 7: the dry run, the full 9-minute pitch and live demo, then questions", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 6 } },
    { text: "Wednesday, Dec 9: final studio, polish only", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 6 } },
    { text: "Thursday, Dec 10, 11:59 pm: cp12-demo tag pushed", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 6 } },
    { text: "Monday, Dec 14, 8:30–10:00 AM: Demo Day", options: { bullet: { indent: 16 }, bold: true, color: C.white } }
  ], { x: 0.95, y: 3.27, w: 11.7, h: 2.5, color: "CBD8E6", fontFace: F.body, fontSize: 17, valign: "top", margin: 0 });
  card(s, 0.6, 5.95, 12.1, 0.8, C.amber);
  s.addText("Monday's dry run is performance-ready, not draft-ready.", { x: 0.9, y: 5.95, w: 11.5, h: 0.8, color: C.navy, fontFace: F.body, fontSize: 17, bold: true, align: "center", valign: "middle", margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("One minute. Name the moment: once the tag is pushed, the project is launched, publicly, with an honest account of itself. Walk the dates once. Monday is a full rehearsal under Demo Day conditions, nine minutes on the clock, so the pitch has to exist by then; the weekend is for it. Demo Day starts at 8:30. Collect nothing today: the signed sheets go home with their authors in a photo and on paper.");

  const OUT = "Session25-LaunchStudio.pptx";
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
