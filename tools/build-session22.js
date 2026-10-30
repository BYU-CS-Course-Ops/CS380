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
pres.title = "CS 301R — Session 22 — Demos & Audit";

let PAGE = 0;
function mk() { PAGE++; return pres.addSlide(); }
function footer(slide, col) {
  const c = col || C.slate;
  slide.addText("CS 301R · Session 22 · Demos & Audit", { x: 7.3, y: 7.04, w: 5.4, h: 0.3, align: "right", color: c, fontFace: F.body, fontSize: 10, margin: 0 });
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
  await iconCircle(s, FA.FaFlagCheckered, 0.9, 1.45, 1.0, C.amber, C.navy);
  s.addText("CS 301R · SOFTWARE ENGINEERING STUDIO I", { x: 0.92, y: 2.75, w: 11, h: 0.35, color: "9FB4C7", fontFace: F.body, fontSize: 15, bold: true, charSpacing: 2, margin: 0 });
  s.addText("Working and Joinable", { x: 0.9, y: 3.15, w: 12.1, h: 1.3, color: C.white, fontFace: F.head, fontSize: 42, bold: true, margin: 0 });
  s.addText([
    { text: "Session 22 — progress demos and the repo audit", options: { color: C.amber, bold: true, breakLine: true } },
    { text: "Wednesday, November 18, 2026", options: { color: "9FB4C7" } }
  ], { x: 0.92, y: 4.7, w: 11, h: 0.9, fontFace: F.body, fontSize: 19, margin: 0, lineSpacingMultiple: 1.2 });
  s.addNotes("Assessment day. Before class: the demo order and audit pairings on the board; the CP10 Scoring Sheet on a clipboard; Demo Feedback Sheets (two pages per student) and one Repo Audit Sheet per auditor on the front table. Open each project's cp10 tag URL from Canvas so you can confirm every tag exists before the first demo. Put the next slide up as students walk in.");

  // 2 Prep check
  s = mk(); s.background = { color: C.navy };
  darkHeader(s, "Prep check · hands up", "Ready to demo, ready to audit?");
  const pc = [
    [FA.FaTag, "cp10 tagged last night", "The demo runs from it, your auditor clones it, grading reads it. This morning's pushes don't count."],
    [FA.FaShieldAlt, "Fallback in pocket", "Seed data or a local mode. A recorded clip only if declared, and it caps Demo readiness."],
    [FA.FaLaptopCode, "You can clone right now", "Laptop on the network, credentials working. Start the clone in a minute."],
    [FA.FaFolderOpen, "CP9 submitted", "It was due before class, not during it."]
  ];
  for (let i = 0; i < pc.length; i++) {
    const y = 1.95 + i * 1.12;
    card(s, 0.6, y, 12.1, 0.98, C.navy2);
    await iconCircle(s, pc[i][0], 0.85, y + 0.2, 0.58, C.amber, C.navy);
    s.addText(pc[i][1], { x: 1.7, y, w: 3.7, h: 0.98, color: C.white, fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0 });
    s.addText(pc[i][2], { x: 5.4, y, w: 7.1, h: 0.98, color: "CFE0E9", fontFace: F.body, fontSize: 16.5, valign: "middle", margin: 0 });
  }
  s.addText("Nothing here is fixable at minute 30. That's why we ask at minute 1.", { x: 0.6, y: 6.45, w: 12.1, h: 0.5, color: C.amber, fontFace: F.body, fontSize: 16, bold: true, italic: true, margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("Ninety seconds, up as students walk in. Ask for hands on each line. A project that isn't demo-ready burns a graded slot, and an auditor who can't clone costs another project its audit, so adjust the run of show now rather than finding out mid-rotation. If a tag is missing, the demo can still run, but say plainly that the grade reads the tag.");

  // 3 Today
  s = mk(); s.background = { color: C.white };
  header(s, "Today", "Two questions: does it work, and could someone join?");
  const plan = [
    [FA.FaCodeBranch, "Setup: start cloning your partner's cp10", "3 min"],
    [FA.FaDesktop, "Progress demos, whole room", "36 min"],
    [FA.FaSearch, "Repo audits, everyone at once", "30 min"],
    [FA.FaListOl, "Debrief: your top-five fix list", "4 min"],
    [FA.FaRoute, "The road to launch", "2 min"]
  ];
  for (let i = 0; i < plan.length; i++) {
    const y = 2.0 + i * 0.92;
    const hi = i === 1 || i === 2;
    card(s, 0.6, y, 12.1, 0.78, hi ? C.navy : C.cardBg);
    await iconCircle(s, plan[i][0], 0.88, y + 0.13, 0.52, hi ? C.amber : C.teal, hi ? C.navy : "FFFFFF");
    s.addText(plan[i][1], { x: 1.65, y, w: 9.0, h: 0.78, color: hi ? C.white : C.ink, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
    s.addText(plan[i][2], { x: 10.6, y, w: 1.8, h: 0.78, color: hi ? C.amber : C.slate, fontFace: F.body, fontSize: 16, bold: true, align: "right", valign: "middle", margin: 0 });
  }
  footer(s);
  s.addNotes("Thirty seconds. The two highlighted blocks are CP10: the demo answers 'does it work?' and the audit answers 'could someone join?'. Those are the two things this course says a founded project must be. Both produce the most useful feedback you'll get before launch, and the last five minutes turn it into a plan.");

  // 4 Setup
  s = mk(); s.background = { color: C.white };
  header(s, "Setup · 3 min", "Start your partner's clone now, then leave it running");
  codeBlock(s, 0.6, 1.95, 12.1, 1.4, [
    ["# in a new folder; their repo URL is on the board", C.codeDim],
    "git clone --branch cp10 https://github.com/THEIR-ORG/THEIR-REPO.git"
  ]);
  numRow(s, 3.65, 0.9, 1, "Demo order, audit pairings, and repo URLs", "are on the board. Find your slot, your partner, and their URL.");
  numRow(s, 4.7, 0.9, 2, "Demos are time-boxed hard.", "Six minutes of demo, two of questions, one to change presenters. Running long takes someone else's time.");
  numRow(s, 5.75, 0.9, 3, "The audit runs from the docs alone.", "Everyone audits at once, so there's no one to ask. That's the point.");
  footer(s);
  s.addNotes("Three minutes. Get every clone started before the first demo so slow wifi doesn't eat the audit block. The clone uses --branch cp10 so it checks out the tag, not main. Pairings are set now from who's actually here, with each project's repo URL beside it (from the CP10 submissions); point at the board. Say the two ground rules once: hard time boxes for demos, and docs-only audits. If a clone fails because a tag is missing, sort it out now, not at minute 40.");

  // 5 Your demo
  s = mk(); s.background = { color: C.white };
  header(s, "Progress demos · 6 min + 2 min questions + 1 to swap", "Prove it, don't just show it");
  const dm = [
    ["Open with the claim", "\"V1 proves a volunteer can find an item and check it out.\" One sentence, first."],
    ["Walk the slice", "End to end, live, from the tag, on real data. The path in your slice statement."],
    ["Name one honest edge", "Something that doesn't work yet, said before anyone has to ask."],
    ["If it breaks", "Run your fallback calmly. No restarts, no apologizing for the rest of the demo."]
  ];
  for (let i = 0; i < dm.length; i++) numRow(s, 1.95 + i * 0.98, 0.86, i + 1, dm[i][0] + ".", dm[i][1]);
  card(s, 0.6, 5.95, 12.1, 0.8, C.navy);
  s.addText([
    { text: "Questions (2 min):  ", options: { bold: true, color: C.amber } },
    { text: "\"Did that prove it, or show it?\" Asked kindly, answered directly.", options: { color: C.white } }
  ], { x: 0.95, y: 5.95, w: 11.4, h: 0.8, fontFace: F.body, fontSize: 18, valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("Leave this up between demos. The example claim is Prop Loft's, so nobody's project is on the screen. Score each demo live on the CP10 Scoring Sheet: Proves key claims, Demo readiness, and the audit later. Run a visible timer. The question register is the proof question from Session 20's review. A declared clip goes in the notes column, with whether the room failed.");

  // 6 Proven or shown
  s = mk(); s.background = { color: C.white };
  header(s, "Proven or shown?", "One question tells them apart");
  card(s, 0.6, 1.95, 12.1, 1.15, C.navy);
  s.addText([
    { text: "If the claim were false, would the demo have looked different?  ", options: { color: C.white, bold: true } },
    { text: "Yes: proven.  No: only shown.", options: { color: C.amber, bold: true } }
  ], { x: 0.95, y: 1.95, w: 11.4, h: 1.15, fontFace: F.body, fontSize: 19, valign: "middle", margin: 0 });
  const ps = [
    ["PROVEN", C.strongBg, C.green, [
      "Real code, real data, live: the search finds the item, checkout saves, the list now says who has it",
      "It could have failed in front of you: a second checkout of the same item is refused",
      "Not proven, and said so: \"we haven't put it in front of a wardrobe lead yet\""
    ]],
    ["ONLY SHOWN", C.weakBg, C.coral, [
      "A screen with hardcoded data, or screenshots of what it will do",
      "\"And then this would save to the database\"",
      "Ten screens toured, nothing connected behind them"
    ]]
  ];
  for (let i = 0; i < 2; i++) {
    const x = 0.6 + i * 6.15;
    card(s, x, 3.35, 5.95, 3.4, ps[i][1], REVEAL(i + 1));
    s.addText(ps[i][0], { x: x + 0.3, y: 3.5, w: 5.4, h: 0.4, color: ps[i][2], fontFace: F.body, fontSize: 15, bold: true, charSpacing: 2, margin: 0, ...REVEAL(i + 1) });
    s.addText(ps[i][3].map((t, j) => ({ text: t, options: { bullet: { indent: 16 }, breakLine: j < 2, paraSpaceAfter: 8 } })),
      { x: x + 0.3, y: 3.95, w: 5.4, h: 2.7, color: C.ink, fontFace: F.body, fontSize: 16.5, valign: "top", margin: 0, lineSpacingMultiple: 1.04, ...REVEAL(i + 1) });
  }
  footer(s);
  s.addNotes("Two minutes, before the first demo. The question is the falsifier from Session 19 turned around: a demo proves a claim only if it could have failed. Prop Loft examples on both sides so nobody's project is on screen. Click for each column. Stress the third proven bullet: an honest 'not proven yet' counts in the presenter's favor on the rubric; a tour that implies more than the code does counts against them.");

  // 6 Demo feedback
  s = mk(); s.background = { color: C.white };
  header(s, "While you watch", "One Demo Feedback Sheet per demo");
  const fb = [
    ["1", "The claim", "What did the demo set out to prove?"],
    ["2", "Proof", "Proven or only shown? Would it have looked different if the claim were false?"],
    ["3", "The walk", "Did the slice walk end to end? An honest edge? In the time box?"],
    ["4", "Your question", "The one the demo left open"]
  ];
  for (let i = 0; i < fb.length; i++) {
    const y = 1.95 + i * 0.95;
    card(s, 0.6, y, 7.6, 0.82, C.cardBg);
    s.addText(fb[i][0], { x: 0.8, y, w: 0.4, h: 0.82, color: C.teal, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
    s.addText([
      { text: fb[i][1], options: { bold: true, color: C.ink, breakLine: true } },
      { text: fb[i][2], options: { color: C.slate, fontSize: 15 } }
    ], { x: 1.3, y, w: 6.75, h: 0.82, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0 });
  }
  card(s, 8.5, 1.95, 4.2, 3.67, C.navy);
  s.addText([
    { text: "Feedback, not a grade", options: { bold: true, color: C.amber, breakLine: true } },
    { text: "I score the demos. Your sheet is for the presenter: hand it over when their questions end. It goes into their fix list.", options: { color: "CFE0E9" } }
  ], { x: 8.8, y: 1.95, w: 3.7, h: 3.67, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, lineSpacingMultiple: 1.06 });
  bar(s, 5.9, 0.85, C.amber, null, "Specific and kind. \"The checkout worked, but I never saw it marked out\" beats \"nice job.\"", null);
  footer(s);
  s.addNotes("One minute, before the first demo. Two pages each, one half per demo. Make it clear the peer sheets don't count toward the grade, which frees people to be honest. The example in the amber bar is the register you want: a specific observation tied to a claim. Collect nothing; the sheets go straight to the presenters.");

  // 7 Audit
  s = mk(); s.background = { color: C.navy };
  darkHeader(s, "Repo audit · 30 min · everyone at once", "Audit your partner while they audit you");
  const au = [
    ["1", "Get it running", "From their README, exactly as written. Each step: as written, a guess, wrong or missing, or couldn't."],
    ["2", "Find your way", "Say what it is; pick a good first issue and find the code you'd change."],
    ["3", "Read the history", "Commit log, pull requests, board, known issues, where to ask."],
    ["4", "Log every stall", "The step, the exact error or confusing line, what you did. Number it."]
  ];
  for (let i = 0; i < au.length; i++) {
    const y = 1.95 + i * 0.92;
    card(s, 0.6, y, 12.1, 0.8, C.navy2);
    s.addText(au[i][0], { x: 0.85, y, w: 0.4, h: 0.8, color: C.amber, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
    s.addText(au[i][1], { x: 1.35, y, w: 2.9, h: 0.8, color: C.white, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
    s.addText(au[i][2], { x: 4.25, y, w: 8.25, h: 0.8, color: "CFE0E9", fontFace: F.body, fontSize: 16, valign: "middle", margin: 0 });
  }
  card(s, 0.6, 5.75, 12.1, 1.0, C.amber);
  s.addText([
    { text: "Docs alone, out loud, every stall written down.  ", options: { bold: true } },
    { text: "Facts, not a score. Sign it and hand it to me; I photograph it and give it to the authors." }
  ], { x: 0.95, y: 5.75, w: 11.4, h: 1.0, color: C.navy, fontFace: F.body, fontSize: 16.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  footer(s, "7E92A8");
  s.addNotes("Leave this up for the block. Every student is an auditor, so nobody watches their own repo; you're the only observer. Move between the four and repeat the hardest step yourself where a stall might be the auditor's rather than the repo's; that's what the Repo audit level rests on. Call time at 15 and 25. Thinking out loud helps you see where they stall.");

  // 8 Debrief
  s = mk(); s.background = { color: C.white };
  header(s, "Debrief · 4 min", "Turn what you got today into a top-five fix list");
  card(s, 0.6, 1.95, 5.95, 2.6, C.cardBg);
  s.addText([
    { text: "From your audit sheet", options: { bold: true, color: C.tealDk, breakLine: true } },
    { text: "Every stall your auditor logged, and the one thing that most stopped them", options: { color: C.ink, breakLine: true } },
    { text: " ", options: { breakLine: true, fontSize: 8 } },
    { text: "From the demo feedback", options: { bold: true, color: C.tealDk, breakLine: true } },
    { text: "What wasn't proven, and the questions people still had", options: { color: C.ink } }
  ], { x: 0.9, y: 1.95, w: 5.4, h: 2.6, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
  card(s, 6.75, 1.95, 5.95, 2.6, C.navy);
  s.addText([
    { text: "Rank by launch impact", options: { bold: true, color: C.amber, breakLine: true } },
    { text: "What would stop a newcomer from joining, or a user from getting through? Those go first. Bring the list Monday: it's the studio agenda until launch.", options: { color: C.white } }
  ], { x: 7.05, y: 1.95, w: 5.4, h: 2.6, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, lineSpacingMultiple: 1.06 });
  card(s, 0.6, 4.85, 12.1, 1.3, C.amber, REVEAL(1));
  s.addText("Round the room: what was the most surprising thing a stranger tripped on?", { x: 0.95, y: 4.85, w: 11.4, h: 1.3, color: C.navy, fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0, ...REVEAL(1) });
  s.addText("Whatever you don't fix gets written down in your known issues.", { x: 0.6, y: 6.4, w: 12.1, h: 0.4, color: C.tealDk, fontFace: F.body, fontSize: 17, bold: true, italic: true, margin: 0 });
  footer(s);
  s.addNotes("Four minutes. Two and a half writing, the rest for the round. Hand back the audit sheets first if you've photographed them. Click for the prompt. Whatever students say, point out that it's never what the authors expected; that's why the audit exists. Anything on the list that won't get fixed before launch belongs in the known-issues log for CP11.");

  // 9 Wrap
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: -1.3, y: 5.2, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaRoute, 0.9, 1.0, 0.85, C.amber, C.navy);
  s.addText("The audit sheet is a gift. The fix list is the plan.", { x: 0.9, y: 2.0, w: 11.9, h: 1.0, color: C.white, fontFace: F.head, fontSize: 26, bold: true, italic: true, margin: 0 });
  s.addText("THE ROAD TO LAUNCH", { x: 0.92, y: 3.2, w: 11, h: 0.35, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText([
    { text: "Monday, Nov 23: contributor readiness, the last teaching session before launch work", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 6 } },
    { text: "Wednesday, Nov 25: no class (Thanksgiving)", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 6 } },
    { text: "Week 13: retrospective and the launch package (CP11, Dec 2)", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 6 } },
    { text: "Week 14: dry run and final studio. Then Demo Day, in finals week.", options: { bullet: { indent: 16 } } }
  ], { x: 0.95, y: 3.62, w: 11.7, h: 2.15, color: "CBD8E6", fontFace: F.body, fontSize: 17, valign: "top", margin: 0 });
  card(s, 0.6, 5.95, 12.1, 0.8, C.amber);
  s.addText("Before Monday: your top-five fix list, written and ranked. Happy Thanksgiving.", { x: 0.9, y: 5.95, w: 11.5, h: 0.8, color: C.navy, fontFace: F.body, fontSize: 16, bold: true, align: "center", valign: "middle", margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("Two minutes. Say the one-liner. Students have now had the most useful feedback of the term; the next three weeks are about acting on it. Monday's session builds the contributor-readiness checklist out of what auditors tripped on today. Score the from-the-tag criteria (Technical coherence, Documentation and honesty, Individual contribution) from each cp10 tag after class.");

  const OUT = "Session22-DemosAndAudit.pptx";
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
