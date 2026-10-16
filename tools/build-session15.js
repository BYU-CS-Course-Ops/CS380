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
pres.title = "CS 301R — Session 15 — The Front Door of Your Project";

let PAGE = 0;
function mk() { PAGE++; return pres.addSlide(); }
function footer(slide, col) {
  const c = col || C.slate;
  slide.addText("CS 301R · Session 15 · The Front Door", { x: 7.3, y: 7.04, w: 5.4, h: 0.3, align: "right", color: c, fontFace: F.body, fontSize: 10, margin: 0 });
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
// A finding card that appears on click: bold lead-in plus the point.
function finding(s, y, h, lead, text, fill, n) {
  card(s, 0.6, y, 12.1, h, fill || C.amberBg, REVEAL(n || 1));
  s.addText([
    { text: lead + "  ", options: { color: fill === C.strongBg ? C.green : C.tealDk, bold: true } },
    { text, options: { color: C.ink } }
  ], { x: 0.95, y, w: 11.4, h, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, lineSpacingMultiple: 1.05, ...REVEAL(n || 1) });
}

async function build() {
  let s;

  // 1 Title
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: 10.9, y: -1.4, w: 4.2, h: 4.2, fill: { color: "1C3252" } });
  s.addShape(pres.shapes.OVAL, { x: 12.0, y: 5.1, w: 3.0, h: 3.0, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaDoorOpen, 0.9, 1.45, 1.0, C.amber, C.navy);
  s.addText("CS 301R · SOFTWARE ENGINEERING STUDIO I", { x: 0.92, y: 2.75, w: 11, h: 0.35, color: "9FB4C7", fontFace: F.body, fontSize: 15, bold: true, charSpacing: 2, margin: 0 });
  s.addText("The Front Door of Your Project", { x: 0.9, y: 3.15, w: 12.1, h: 1.3, color: C.white, fontFace: F.head, fontSize: 42, bold: true, margin: 0 });
  s.addText([
    { text: "Session 15 — repo infrastructure", options: { color: C.amber, bold: true, breakLine: true } },
    { text: "Monday, October 26, 2026", options: { color: "9FB4C7" } }
  ], { x: 0.92, y: 4.7, w: 11, h: 0.9, fontFace: F.body, fontSize: 19, margin: 0, lineSpacingMultiple: 1.2 });
  s.addNotes("First half of Week 8. Session 3 was why governance matters; Session 13 set the workflow. Today it all becomes files a stranger reads. Before class: open tabs for Textualize/rich, dagorym/SSW, and (optional) prop-loft/prop-loft, plus the bug-report bank in the outline's Appendix. Have the CP7 Checklist printed, one per student, and the License Cheat Sheet page up. Wednesday is the build workshop; CP7 is due end of day Friday, Oct 30.");

  // 2 Today
  s = mk(); s.background = { color: C.white };
  header(s, "Today", "Compare two front doors, then design yours");
  const plan = [
    [FA.FaDoorOpen, "The stranger at the door", "5 min"],
    [FA.FaSearch, "Two front doors, walked live", "15 min"],
    [FA.FaBalanceScale, "License clinic: decide for real", "12 min"],
    [FA.FaBug, "Anatomy of a good issue", "18 min"],
    [FA.FaClipboardCheck, "Audit your own repo, sketch your templates", "18 min"],
    [FA.FaRoute, "Wednesday: the build", "7 min"]
  ];
  for (let i = 0; i < plan.length; i++) {
    const y = 1.95 + i * 0.8;
    const hi = i === 1;
    card(s, 0.6, y, 12.1, 0.68, hi ? C.navy : C.cardBg);
    await iconCircle(s, plan[i][0], 0.88, y + 0.1, 0.48, hi ? C.amber : C.teal, hi ? C.navy : "FFFFFF");
    s.addText(plan[i][1], { x: 1.6, y, w: 9.0, h: 0.68, color: hi ? C.white : C.ink, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
    s.addText(plan[i][2], { x: 10.6, y, w: 1.8, h: 0.68, color: hi ? C.amber : C.slate, fontFace: F.body, fontSize: 16, bold: true, align: "right", valign: "middle", margin: 0 });
  }
  footer(s);
  s.addNotes("Thirty seconds. Name the shape of the day: look at two real repositories through a stranger's eyes, settle each project's license, learn what makes an issue usable, then turn the same eyes on your own repo. The last block produces a punch list, and that punch list is Wednesday's work. The highlighted row is live, in the browser, not slides. Keep moving.");

  // 3 The stranger's questions
  s = mk(); s.background = { color: C.white };
  header(s, "The stranger at the door", "Six questions, asked in this order");
  const qs = [
    [FA.FaQuestion, "What is this?", "README, first paragraph"],
    [FA.FaPlay, "Can I run it?", "Quickstart, setup guide"],
    [FA.FaBalanceScale, "May I use it?", "LICENSE"],
    [FA.FaHandsHelping, "How do I help?", "CONTRIBUTING, templates"],
    [FA.FaUsers, "What's it like here?", "Code of conduct, issue tone"],
    [FA.FaMapSigns, "Where's it going?", "Roadmap"]
  ];
  const qw = 1.89, qg = 0.15;
  for (let i = 0; i < qs.length; i++) {
    const x = 0.6 + i * (qw + qg);
    card(s, x, 2.0, qw, 3.35, C.cardBg, REVEAL(i + 1));
    await iconCircle(s, qs[i][0], x + (qw - 0.72) / 2, 2.25, 0.72, C.teal, "FFFFFF", REVEAL(i + 1));
    s.addText(qs[i][1], { x: x + 0.1, y: 3.15, w: qw - 0.2, h: 0.95, color: C.ink, fontFace: F.body, fontSize: 18, bold: true, align: "center", valign: "top", margin: 0, ...REVEAL(i + 1) });
    s.addText(qs[i][2], { x: x + 0.12, y: 4.15, w: qw - 0.24, h: 1.05, color: C.tealDk, fontFace: F.body, fontSize: 15, align: "center", valign: "top", margin: 0, ...REVEAL(i + 1) });
  }
  card(s, 0.6, 5.65, 12.1, 1.1, C.navy, REVEAL(7));
  s.addText("A stranger gives a project about ninety seconds. Every question they can't answer in that time is a reason to leave.", { x: 0.95, y: 5.65, w: 11.4, h: 1.1, color: C.white, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, lineSpacingMultiple: 1.04, ...REVEAL(7) });
  footer(s);
  s.addNotes("One click per question. Ask the room to answer each from the stranger's side before you click: what would you look for first? The order matters, because a stranger who can't tell what the project is never gets as far as the license. This is true of any repository: an open-source project, a team repo at work, a library you're evaluating. These six questions are the frame for the live walk-through and for your own audit later today.");

  // 4 Why it matters
  s = mk(); s.background = { color: C.white };
  header(s, "Why it matters", "Writing things down is how you scale yourself");
  card(s, 0.6, 2.0, 5.95, 3.4, C.cardBg);
  await iconCircle(s, FA.FaBook, 0.95, 2.3, 0.66, C.teal);
  s.addText("From the reading", { x: 1.8, y: 2.37, w: 4.6, h: 0.5, color: C.ink, fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0 });
  s.addText("Documented processes answer questions before anyone asks them, and they make \"no\" less personal. A founder who writes things down can step away without the project stalling.", { x: 1.0, y: 3.2, w: 5.3, h: 2.1, color: C.ink, fontFace: F.body, fontSize: 17, valign: "top", margin: 0, lineSpacingMultiple: 1.06 });
  card(s, 6.75, 2.0, 5.95, 3.4, C.navy, REVEAL(1));
  await iconCircle(s, FA.FaUserCheck, 7.1, 2.3, 0.66, C.amber, C.navy, REVEAL(1));
  s.addText("The stakes, Nov 18", { x: 7.95, y: 2.37, w: 4.6, h: 0.5, color: C.white, fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0, ...REVEAL(1) });
  s.addText("A classmate audits your repo cold: clones it, builds it, runs it, and tries to find a way in, using only what you wrote. Today decides what they find.", { x: 7.15, y: 3.2, w: 5.3, h: 2.1, color: "CFE0E9", fontFace: F.body, fontSize: 17, valign: "top", margin: 0, lineSpacingMultiple: 1.06, ...REVEAL(1) });
  card(s, 0.6, 5.65, 12.1, 1.1, C.amber, REVEAL(2));
  s.addText("The honest test of documentation isn't whether the author is satisfied. It's whether a cold reader succeeds.", { x: 0.95, y: 5.65, w: 11.4, h: 1.1, color: C.navy, fontFace: F.body, fontSize: 17, bold: true, valign: "middle", margin: 0, lineSpacingMultiple: 1.04, ...REVEAL(2) });
  footer(s);
  s.addNotes("Two minutes. The left card is the reading's central idea; ask someone for an example of a question they've answered more than once on their own project already. First click: the stakes. The Week-11 audit is a classmate following your docs with no help from you, for a grade. Second click is the line to say slowly: the author is the worst possible tester of their own docs, because they already know everything. That's why CP7 requires a cold test.");

  // 5 Live
  s = mk(); s.background = { color: C.navy };
  darkHeader(s, "Live · 15 min", "Two front doors, walked as a stranger");
  s.addText("Ask the six questions of each, in order. Narrate what you find, and what you can't.", { x: 0.62, y: 1.78, w: 12, h: 0.4, color: "CFE0E9", fontFace: F.body, fontSize: 16, italic: true, margin: 0 });
  const doors = [
    [FA.FaCheck, "Strong", "Textualize/rich", "A Python library for rich text in the terminal. Maintainer-led, widely used, readable.", C.green],
    [FA.FaTimes, "Weak", "dagorym/SSW", "The instructor's own game project. Real code, real history, and no front door.", C.coral]
  ];
  for (let i = 0; i < 2; i++) {
    const x = 0.6 + i * 6.15;
    card(s, x, 2.45, 5.95, 2.95, "1E3352");
    await iconCircle(s, doors[i][0], x + 0.35, 2.7, 0.66, doors[i][4]);
    s.addText(doors[i][1], { x: x + 1.2, y: 2.7, w: 4.4, h: 0.66, color: C.amber, fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0 });
    s.addText(doors[i][2], { x: x + 0.35, y: 3.55, w: 5.3, h: 0.5, color: C.white, fontFace: F.mono, fontSize: 19, bold: true, margin: 0 });
    s.addText(doors[i][3], { x: x + 0.35, y: 4.1, w: 5.3, h: 1.15, color: "CFE0E9", fontFace: F.body, fontSize: 16, valign: "top", margin: 0, lineSpacingMultiple: 1.04 });
  }
  card(s, 0.6, 5.65, 12.1, 1.1, C.amber);
  s.addText("Optional third tab, prop-loft/prop-loft: a README and a LICENSE, nothing else yet. That's probably where your repo is today.", { x: 0.95, y: 5.65, w: 11.4, h: 1.1, color: C.navy, fontFace: F.body, fontSize: 16.5, bold: true, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  footer(s, "7E92A8");
  s.addNotes("Leave this up while you switch to the browser. Walk Rich first, about seven minutes, then SSW, about five, using the six questions from slide 3 in order. The next two slides summarize what to point at; use them to recap after each tab, not instead of the tabs. Say plainly that SSW is yours, so nobody else's work is the bad example. Prop Loft is optional: it's the 'you are here' between the two, and it sets up Wednesday.");

  // 6 Rich
  s = mk(); s.background = { color: C.white };
  header(s, "Strong · Textualize/rich", "What a stranger finds, and what it costs");
  const rich = [
    ["README", "One line on what it is, then a screenshot. But it sits under twenty lines of badges and translations. Even a strong door has a weak spot."],
    ["CONTRIBUTING", "Opens with a welcome and a rule: typo fixes go straight to a PR, features start as an issue. Then setup, step by step."],
    ["AI_POLICY.md", "Three rules for AI-generated PRs: fill in the template, name the agent, link an approved issue. Decided once, in writing."],
    ["Bug template", "Search closed issues first. Give a runnable example. Run one command, python -m rich.diagnose, to capture the environment."],
    ["Saying no", "The template says Rich isn't taking new features. The reading's \"learning to say no,\" done once instead of in every thread."],
    ["Triage labels", "Needs triage · more information needed · Can't reproduce · good first issue"]
  ];
  const rw = 3.9, rg = 0.2, rh = 2.25;
  for (let i = 0; i < rich.length; i++) {
    const x = 0.6 + (i % 3) * (rw + rg), y = 1.95 + Math.floor(i / 3) * (rh + 0.2);
    card(s, x, y, rw, rh, C.cardBg);
    s.addText(rich[i][0], { x: x + 0.25, y: y + 0.12, w: rw - 0.5, h: 0.5, color: C.tealDk, fontFace: F.body, fontSize: 18, bold: true, margin: 0 });
    s.addText(rich[i][1], { x: x + 0.25, y: y + 0.62, w: rw - 0.5, h: rh - 0.75, color: C.ink, fontFace: F.body, fontSize: 15, valign: "top", margin: 0, lineSpacingMultiple: 1.03 });
  }
  footer(s);
  s.addNotes("Recap after the Rich tab, or use it as your checklist while you're in it. The point to land: almost everything here is cheap. A template, a policy file, a few labels: an hour each, and they shape every interaction the project will ever have. The README weakness is deliberate: ask how far they scrolled before learning what Rich is. A strong front door isn't a perfect one; it's one where the questions get answered.");

  // 7 SSW
  s = mk(); s.background = { color: C.white };
  header(s, "Weak · dagorym/SSW", "The content exists. The front door doesn't.");
  card(s, 0.6, 1.95, 5.95, 3.55, C.weakBg);
  s.addText("What a stranger can't find", { x: 0.95, y: 2.1, w: 5.3, h: 0.5, color: C.coral, fontFace: F.body, fontSize: 19, bold: true, margin: 0 });
  s.addText([
    { text: "No README: GitHub shows a file list as the front page", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "No LICENSE: legally, all rights reserved. Nobody may use it.", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "No CONTRIBUTING, code of conduct, or templates", options: { bullet: { indent: 16 } } }
  ], { x: 0.95, y: 2.7, w: 5.35, h: 2.7, color: C.ink, fontFace: F.body, fontSize: 16.5, valign: "top", margin: 0 });
  card(s, 6.75, 1.95, 5.95, 3.55, C.cardBg);
  s.addText("What's committed instead", { x: 7.1, y: 2.1, w: 5.3, h: 0.5, color: C.tealDk, fontFace: F.body, fontSize: 19, bold: true, margin: 0 });
  s.addText([
    { text: "AGENTS.md, CLAUDE.md, and Copilot instructions", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "An IDE settings folder, .idea/", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "A real user's guide and roadmap, buried in doc/", options: { bullet: { indent: 16 } } }
  ], { x: 7.1, y: 2.7, w: 5.35, h: 2.7, color: C.ink, fontFace: F.body, fontSize: 16.5, valign: "top", margin: 0 });
  card(s, 0.6, 5.75, 12.1, 1.0, C.navy, REVEAL(1));
  s.addText("The AI agents get a better front door than the humans do.", { x: 0.95, y: 5.75, w: 11.4, h: 1.0, color: C.white, fontFace: F.head, fontSize: 21, bold: true, align: "center", valign: "middle", margin: 0, ...REVEAL(1) });
  footer(s);
  s.addNotes("Own it: this is my repository. The missing LICENSE is the one to dwell on. Without one, the default is all rights reserved, so the honest answer to 'may I use it?' is no, whatever I intended. Then the right column: the documentation exists, it's just aimed at coding agents or hidden in a folder a stranger won't open. Click for the punchline. The fix is cheap, because the content already exists; that's the gap CP7 closes.");

  // 8 README anatomy
  s = mk(); s.background = { color: C.white };
  header(s, "README anatomy", "An onboarding document, not a spec");
  const readme = [
    ["One line: what it is, and who it's for", "If a stranger can't repeat it, rewrite it"],
    ["A screenshot or demo, if it's visual", "Showing beats describing"],
    ["A quickstart that actually works", "Nothing runs yet? Say so, and point to docs/setup.md"],
    ["How to contribute", "One line and a link to CONTRIBUTING"],
    ["The license", "One line and a link to LICENSE"]
  ];
  for (let i = 0; i < readme.length; i++) {
    const y = 1.95 + i * 0.85;
    const key = i === 0 || i === 2;
    card(s, 0.6, y, 7.6, 0.73, key ? C.navy : C.cardBg);
    s.addText(String(i + 1), { x: 0.75, y, w: 0.5, h: 0.73, color: key ? C.amber : C.teal, fontFace: F.head, fontSize: 20, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText([
      { text: readme[i][0], options: { bold: true, color: key ? C.white : C.ink, breakLine: true } },
      { text: readme[i][1], options: { color: key ? "CFE0E9" : C.slate, fontSize: 15 } }
    ], { x: 1.35, y, w: 6.7, h: 0.73, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0 });
  }
  card(s, 8.45, 1.95, 4.25, 4.13, C.amberBg);
  await iconCircle(s, FA.FaPenNib, 8.75, 2.2, 0.66, C.amber, C.navy);
  s.addText("The hardest sentence of the week", { x: 8.75, y: 3.0, w: 3.7, h: 0.8, color: C.tealDk, fontFace: F.body, fontSize: 18, bold: true, valign: "top", margin: 0 });
  s.addText("Your README's first sentence. Most first drafts describe the technology. A stranger needs the problem and who has it.", { x: 8.75, y: 3.85, w: 3.7, h: 2.1, color: C.ink, fontFace: F.body, fontSize: 16, valign: "top", margin: 0, lineSpacingMultiple: 1.05 });
  footer(s);
  s.addNotes("Two minutes. Five parts, in this order, because it's the order of the stranger's questions. The highlighted two do the most work: the first line, and a quickstart that works on a machine that isn't yours. Their repos have nothing to run until the build starts, so for CP7 the honest version is a status line and a pointer to a setup placeholder, docs/setup.md: the stack, 'instructions arrive with the first runnable build,' and a link to the issue tracking it. The real setup guide is written and partner-tested in Session 20. A broken quickstart is worse than an honest 'not yet.' Read Prop Loft's first sentence aloud as an example if you opened the tab. The amber card sets up the self-audit: every project will write its first sentence before leaving today, and most will rewrite it.");

  // 9 Cheap now
  s = mk(); s.background = { color: C.white };
  header(s, "Process capital", "Cheap to build now, expensive to retrofit");
  const cheap = [
    [FA.FaBug, "Issue templates", "Every report arrives in the shape you asked for"],
    [FA.FaClipboardList, "A PR template", "Your git standards, as a checklist the author sees"],
    [FA.FaTags, "Labels", "bug · enhancement · good first issue: triage becomes possible"],
    [FA.FaHandshake, "Code of conduct", "Adopt Contributor Covenant 3.0; fill in how to report"],
    [FA.FaMapSigns, "A roadmap", "Where it's going, so newcomers can find a place in it"]
  ];
  const cw = 2.3, cg = 0.15;
  for (let i = 0; i < cheap.length; i++) {
    const x = 0.6 + i * (cw + cg);
    card(s, x, 1.95, cw, 3.5, C.cardBg);
    await iconCircle(s, cheap[i][0], x + (cw - 0.72) / 2, 2.2, 0.72, C.teal);
    s.addText(cheap[i][1], { x: x + 0.1, y: 3.1, w: cw - 0.2, h: 0.75, color: C.ink, fontFace: F.body, fontSize: 18, bold: true, align: "center", valign: "top", margin: 0 });
    s.addText(cheap[i][2], { x: x + 0.15, y: 3.85, w: cw - 0.3, h: 1.5, color: C.slate, fontFace: F.body, fontSize: 15, align: "center", valign: "top", margin: 0 });
  }
  card(s, 0.6, 5.7, 12.1, 1.05, C.amber);
  s.addText("Adapt, don't invent, where a standard exists: license text, code of conduct. Write, don't copy, where your project is the content: README, setup, norms.", { x: 0.95, y: 5.7, w: 11.4, h: 1.05, color: C.navy, fontFace: F.body, fontSize: 16, bold: true, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  footer(s);
  s.addNotes("One minute. These are the pieces a stranger rarely notices when they're present and always notices when they're missing. Contributor Covenant is the most widely adopted open-source code of conduct; GitHub offers it when you add a CODE_OF_CONDUCT.md file. Adopt it rather than write your own, but fill in the reporting contact, which the text leaves as a placeholder. The amber rule is from the CP7 handout and is worth saying aloud.");

  // 10 Saying no
  s = mk(); s.background = { color: C.white };
  header(s, "Learning to say no", "A written boundary is a promise you can keep");
  card(s, 0.6, 1.95, 5.95, 3.5, C.cardBg);
  s.addText("Rich, in its issue template", { x: 0.95, y: 2.1, w: 5.3, h: 0.5, color: C.tealDk, fontFace: F.body, fontSize: 18, bold: true, margin: 0 });
  s.addText("\"Rich isn't accepting new features. If it can be implemented in a third-party library, then that is what I recommend.\"", { x: 0.95, y: 2.75, w: 5.3, h: 2.5, color: C.ink, fontFace: F.head, fontSize: 18, italic: true, valign: "top", margin: 0, lineSpacingMultiple: 1.06 });
  card(s, 6.75, 1.95, 5.95, 3.5, C.cardBg, REVEAL(1));
  s.addText("lazygit, first line of CONTRIBUTING", { x: 7.1, y: 2.1, w: 5.3, h: 0.5, color: C.tealDk, fontFace: F.body, fontSize: 18, bold: true, margin: 0, ...REVEAL(1) });
  s.addText("\"This project does not accept pull requests.\"", { x: 7.1, y: 2.75, w: 5.3, h: 1.0, color: C.ink, fontFace: F.head, fontSize: 18, italic: true, valign: "top", margin: 0, ...REVEAL(1) });
  s.addText("Then it explains why, honestly, and lists the contributions it does want: bug reports, feature ideas.", { x: 7.1, y: 3.8, w: 5.3, h: 1.5, color: C.slate, fontFace: F.body, fontSize: 16, valign: "top", margin: 0, ...REVEAL(1) });
  card(s, 0.6, 5.7, 12.1, 1.05, C.navy, REVEAL(2));
  s.addText("\"Reviews within a week\" is credible from a student project. \"24/7 support\" isn't. Promise only what you'll actually do.", { x: 0.95, y: 5.7, w: 11.4, h: 1.05, color: C.white, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, ...REVEAL(2) });
  footer(s);
  s.addNotes("Two minutes. Both are real, and both are unusual choices made honestly. Rich says no once, in the template, instead of in a hundred threads. lazygit goes further than you will, and the reason to show it isn't to copy it: its maintainer wrote down a boundary he could keep, explained it without apology, and pointed people at what he does want. Second click: this is the CP7 requirement that promises be keepable. Credibility is graded.");

  // 11 License clinic
  s = mk(); s.background = { color: C.white };
  header(s, "License clinic · 12 min", "Decide for real, as a project");
  const axes = [
    [FA.FaUsers, "Who should be able to use it?", "Anyone, freely, even in closed products: permissive. Improvements must come back: copyleft."],
    [FA.FaShieldAlt, "Do you want a patent grant?", "Apache-2.0 is permissive with explicit patent protection. MIT is silent on patents."],
    [FA.FaLink, "What do your dependencies require?", "A GPL dependency brings GPL obligations with it. Check before you choose."]
  ];
  for (let i = 0; i < 3; i++) {
    const x = 0.6 + i * 4.1;
    card(s, x, 1.95, 3.9, 3.45, C.cardBg);
    await iconCircle(s, axes[i][0], x + 0.3, 2.2, 0.66, C.teal);
    s.addText(axes[i][1], { x: x + 0.3, y: 3.0, w: 3.3, h: 0.85, color: C.ink, fontFace: F.body, fontSize: 18, bold: true, valign: "top", margin: 0 });
    s.addText(axes[i][2], { x: x + 0.3, y: 3.9, w: 3.3, h: 1.4, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0, lineSpacingMultiple: 1.04 });
  }
  card(s, 0.6, 5.65, 12.1, 1.1, C.navy);
  s.addText([
    { text: "Write it down: ", options: { color: C.amber, bold: true } },
    { text: "the license, and one paragraph on why it fits this project's goals. It goes in CP7. Not MIT by reflex.", options: { color: C.white } }
  ], { x: 0.95, y: 5.65, w: 11.4, h: 1.1, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("The Session 3 short response was individual and provisional; this is the project's real decision. Each project answers the three questions, picks, and writes the paragraph now, with the License Cheat Sheet page open. Circulate for edge cases: copyleft dependencies, datasets with their own terms, app-store distribution, and any project whose stack already carries a license. Background, not legal advice. Most projects will land on MIT or Apache-2.0; the paragraph is what's graded.");

  // 12 Vocabulary
  s = mk(); s.background = { color: C.white };
  header(s, "Anatomy of a good issue", "Four words that make reports precise");
  const chain = [
    ["Error", "A human mistake", "misreading the spec"],
    ["Defect", "The flaw it leaves in the artifact", "the bug in the code"],
    ["Fault", "What goes wrong inside, at runtime", "bad data, a wrong branch"],
    ["Failure", "What someone can observe", "the crash, the wrong output"]
  ];
  const vw = 2.75, vg = 0.37;
  for (let i = 0; i < chain.length; i++) {
    const x = 0.6 + i * (vw + vg);
    const last = i === 3;
    card(s, x, 2.0, vw, 3.15, last ? C.navy : C.cardBg, REVEAL(i + 1));
    s.addText(chain[i][0], { x, y: 2.2, w: vw, h: 0.6, color: last ? C.amber : C.tealDk, fontFace: F.head, fontSize: 24, bold: true, align: "center", margin: 0, ...REVEAL(i + 1) });
    s.addText(chain[i][1], { x: x + 0.2, y: 3.0, w: vw - 0.4, h: 1.1, color: last ? C.white : C.ink, fontFace: F.body, fontSize: 17, bold: true, align: "center", valign: "top", margin: 0, ...REVEAL(i + 1) });
    s.addText(chain[i][2], { x: x + 0.2, y: 4.15, w: vw - 0.4, h: 0.85, color: last ? "CFE0E9" : C.slate, fontFace: F.body, fontSize: 15, italic: true, align: "center", valign: "top", margin: 0, ...REVEAL(i + 1) });
    if (i < 3) s.addText("→", { x: x + vw, y: 3.2, w: vg, h: 0.6, color: C.teal, fontFace: F.body, fontSize: 24, bold: true, align: "center", valign: "middle", margin: 0, ...REVEAL(i + 2) });
  }
  card(s, 0.6, 5.45, 12.1, 1.3, C.amber, REVEAL(5));
  s.addText("A report describes the failure. Investigation walks the chain backward. Most bad reports skip straight to a guess about the defect.", { x: 0.95, y: 5.45, w: 11.4, h: 1.3, color: C.navy, fontFace: F.body, fontSize: 17, bold: true, valign: "middle", margin: 0, lineSpacingMultiple: 1.04, ...REVEAL(5) });
  footer(s);
  s.addNotes("Eighteen minutes for this section. The vocabulary is from IEEE 1044, used in the prior version of this course. One click per term. The precision isn't pedantry: the reporter sees only the failure, so that's what a report can describe reliably. Everything to the left is investigation. The fifth click is the habit to break: a report that opens with 'the problem is in dialog.py' has skipped the one part only the reporter could supply.");

  // 13 Chain in a real report
  s = mk(); s.background = { color: C.white };
  header(s, "The chain in a real report", "SSW #14: \"Data corruption when conducting battle\"");
  const real = [
    ["Failure", "The program stops: \"Run-Time Check Failure #0 — The value of ESP was not properly saved across a function call.\" On Linux it just crashes.", C.navy],
    ["Fault", "In memory, the ships' defenses read as garbage. Everything else in the object looks fine.", C.cardBg],
    ["Defect", "Not known when filed. The closing comment suspects a bad save file: a clean game didn't reproduce it.", C.cardBg],
    ["Error", "Unknown, and a report doesn't need it.", C.cardBg]
  ];
  for (let i = 0; i < real.length; i++) {
    const y = 1.95 + i * 1.1;
    const dark = real[i][2] === C.navy;
    card(s, 0.6, y, 12.1, 0.98, real[i][2], REVEAL(i + 1));
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.85, y: y + 0.215, w: 1.6, h: 0.55, fill: { color: dark ? C.amber : C.teal }, line: { type: "none" }, rectRadius: 0.08, ...REVEAL(i + 1) });
    s.addText(real[i][0], { x: 0.85, y: y + 0.215, w: 1.6, h: 0.55, color: dark ? C.navy : C.white, fontFace: F.body, fontSize: 16, bold: true, align: "center", valign: "middle", margin: 0, ...REVEAL(i + 1) });
    s.addText(real[i][1], { x: 2.7, y, w: 9.75, h: 0.98, color: dark ? C.white : C.ink, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0, lineSpacingMultiple: 1.03, ...REVEAL(i + 1) });
  }
  s.addText("Also in the report: \"If you start up the tactical game directly, there is no issue.\" That one sentence of narrowing saves the fixer an hour.", { x: 0.6, y: 6.33, w: 12.1, h: 0.6, color: C.slate, fontFace: F.body, fontSize: 15, italic: true, valign: "middle", margin: 0, ...REVEAL(5) });
  footer(s);
  s.addNotes("Mine, from SSW. One click per level, top down, which is the order a reporter knows them. The failure is verbatim, which is what makes it searchable. The fault is something the reporter happened to observe in a debugger; most reporters won't have it, and that's fine. The defect wasn't known when the issue was filed, and the fix was partly a workaround. The last click: narrowing. Knowing where the failure doesn't happen is often worth more than any guess about the cause.");

  // 14 The anatomy
  s = mk(); s.background = { color: C.white };
  header(s, "The Mozilla-grade report", "Six parts, from the reading");
  const parts = [
    [FA.FaBug, "One failure per report", "Two failures, two issues: each can be fixed and closed alone"],
    [FA.FaFileAlt, "A title that names the failure", "What a person sees, not a guess at why"],
    [FA.FaListOl, "Steps to reproduce", "Numbered, minimal, from a known starting point"],
    [FA.FaExclamationTriangle, "Expected vs. actual", "Both. \"It's broken\" is only half"],
    [FA.FaTerminal, "Environment and version", "OS, browser, version, commit"],
    [FA.FaImage, "Evidence", "The verbatim error, a log, a screenshot, a file"]
  ];
  const pw = 3.9, pg = 0.2, ph = 2.05;
  for (let i = 0; i < parts.length; i++) {
    const x = 0.6 + (i % 3) * (pw + pg), y = 1.95 + Math.floor(i / 3) * (ph + 0.2);
    card(s, x, y, pw, ph, C.cardBg);
    await iconCircle(s, parts[i][0], x + 0.25, y + 0.25, 0.6, C.teal);
    s.addText(parts[i][1], { x: x + 1.0, y: y + 0.18, w: pw - 1.2, h: 0.75, color: C.ink, fontFace: F.body, fontSize: 17, bold: true, valign: "middle", margin: 0 });
    s.addText(parts[i][2], { x: x + 0.25, y: y + 1.0, w: pw - 0.5, h: ph - 1.1, color: C.slate, fontFace: F.body, fontSize: 15, valign: "top", margin: 0 });
  }
  s.addText("Next: real reports, weakest first, from repositories the instructor works in.", { x: 0.6, y: 6.5, w: 12.1, h: 0.4, color: C.slate, fontFace: F.body, fontSize: 15, italic: true, align: "center", margin: 0 });
  footer(s);
  s.addNotes("Two minutes; they read Mozilla's guidelines, so recall rather than teach. Ask which part they think is skipped most. Usually it's expected versus actual: reporters describe what happened and assume everyone knows what should have happened. Then say where the next reports come from: my own repositories and BYU course-tools repositories I work in. They're real, and they're shown for the report, not the person. The bank in the outline has more if there's time.");

  // 15 Weak
  s = mk(); s.background = { color: C.white };
  header(s, "Weak", "The failure never makes it onto the page");
  s.addText("SSW #11", { x: 0.6, y: 1.85, w: 5.95, h: 0.4, color: C.slate, fontFace: F.body, fontSize: 15, bold: true, margin: 0 });
  codeBlock(s, 0.6, 2.25, 5.95, 1.65, [["Map occasionally vanished from", C.code], ["frame on Windows", C.code], ["", C.code], ["(no description)", C.codeDim]], {}, 16);
  s.addText("byu_pytest_utils #16", { x: 6.75, y: 1.85, w: 5.95, h: 0.4, color: C.slate, fontFace: F.body, fontSize: 15, bold: true, margin: 0 });
  codeBlock(s, 6.75, 2.25, 5.95, 1.65, [["Not including error when output", C.code], ["file is not found.", C.code], ["", C.code], ["See dialog.py line 216", C.codeDim]], {}, 16);
  finding(s, 4.2, 2.55, "What's missing:", "#11: which window, doing what, and how often is \"occasionally\"? It got fixed only because the reporter was also the fixer. #16 never says what a user sees; it points at a line of code. The reporter skipped the failure and went straight to where they thought the defect was.");
  footer(s);
  s.addNotes("#11 is mine; #16 is from a BYU course-tools repository. Give the room thirty seconds to list what's missing against the six parts before you click. The point of #11: it was fine for me, because I was going to fix it myself and I remembered what I'd seen. The moment anyone else is on the project, that stops working. #16 ties back to the vocabulary: it names a suspected defect and never states the failure, the one part only the reporter could supply.");

  // 16 Template filled
  s = mk(); s.background = { color: C.white };
  header(s, "Middle", "The template is filled in. The report still isn't written.");
  s.addText("mdx-canvas #93 · \"Cannot link to syllabus\"", { x: 0.6, y: 1.85, w: 12.1, h: 0.4, color: C.slate, fontFace: F.body, fontSize: 15, bold: true, margin: 0 });
  codeBlock(s, 0.6, 2.25, 12.1, 2.55, [
    ["Describe the bug", C.codeDim],
    ["With the latest update to mdx-canvas, you cannot link to a syllabus using the <course-link> tag", C.code],
    ["To Reproduce", C.codeDim],
    ["Attempt to deploy any file with a <course-link type=\"syllabus\" title=\"Syllabus\"/> tag in it.", C.code],
    ["Expected behavior", C.codeDim],
    ["We should be able to link to it in the above fashion as before, or something similar.", C.code]
  ], {}, 14.5);
  finding(s, 5.05, 1.7, "What to notice:", "Every heading is there, and the reproduction step is good. But \"the latest update\" isn't a version, and \"cannot\" doesn't say what happened: an error? A broken link? Nothing at all? Actual behavior is the missing half.");
  footer(s);
  s.addNotes("A public BYU course-tools repository; shown for the report, not the person. This one is close, and that's why it's useful: the template did its job, and the reporter still left out what happened. Ask the room what a maintainer's first reply would be. It would be 'which version, and what did you see?', a round trip that costs a day. The template asks; only the writer can answer. Expected without actual is half a report.");

  // 17 Title names the failure
  s = mk(); s.background = { color: C.white };
  header(s, "Middle", "The title names the failure, not a guess");
  s.addText("mdx-canvas #139 · mine", { x: 0.6, y: 1.85, w: 12.1, h: 0.4, color: C.slate, fontFace: F.body, fontSize: 15, bold: true, margin: 0 });
  codeBlock(s, 0.6, 2.25, 12.1, 2.55, [
    ["deploy fails when answer contains a URL with an IP address", C.amber],
    ["", C.code],
    ["Apparently mdxcanvas can't handle URLs with IP addresses in them and tries to", C.code],
    ["follow the link and fails?", C.code],
    ["  … the question's full source …", C.codeDim],
    ["ERROR - Error deploying quiz_question RQ_HYP|q18  Forbidden: 403 ERROR … cloudfront", C.codeDel]
  ], {}, 14.5);
  finding(s, 5.05, 1.7, "What to notice:", "Full input and the verbatim error: good. But the title asserts a cause the reporter was guessing at. The failure is \"deploy returns 403 Forbidden.\" The guess goes in the body, labelled as a guess.");
  footer(s);
  s.addNotes("Mine again. This is the best example of why the vocabulary matters. The question mark in the body admits the cause is a guess, but the title states it as fact, and titles are what people search and triage by. If the guess is wrong, the issue is misfiled forever. The 403 from CloudFront actually suggests something upstream blocked the request, not that the tool followed a link. Title: the failure. Body: the evidence, then the hypothesis, marked as one.");

  // 18 The model
  s = mk(); s.background = { color: C.white };
  header(s, "Strong · mdx-canvas #74 · tables with <br/> fail to render", "Every part present, and the guess kept apart");
  const model = [
    ["The input", "The exact Markdown table that fails, pasted in full"],
    ["Actual", "A screenshot of what Canvas rendered"],
    ["Steps", "Push this table with mdxcanvas, view the result"],
    ["Expected", "A screenshot of the table it should have been"],
    ["Environment", "OS, browser, version"],
    ["A hypothesis, kept apart", "Under Additional context: \"In my personal testing, this is fixed by adding br to…\" with a link to the line"]
  ];
  for (let i = 0; i < model.length; i++) {
    const y = 1.95 + i * 0.72;
    const last = i === 5;
    card(s, 0.6, y, 12.1, last ? 0.95 : 0.6, last ? C.strongBg : C.cardBg);
    await iconCircle(s, FA.FaCheck, 0.8, y + ((last ? 0.95 : 0.6) - 0.4) / 2, 0.4, C.green);
    s.addText(model[i][0], { x: 1.4, y, w: 3.2, h: last ? 0.95 : 0.6, color: last ? C.green : C.tealDk, fontFace: F.body, fontSize: 16, bold: true, valign: "middle", margin: 0 });
    s.addText(model[i][1], { x: 4.6, y, w: 7.9, h: last ? 0.95 : 0.6, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0 });
  }
  footer(s);
  s.addNotes("Open the issue in the browser if you can; the screenshots make the point better than a description. Every part of the anatomy is here, and the reporter did more: they found the probable fix and put it under Additional context, separate from the failure. That's the difference from #139. The hypothesis is offered, not asserted, so if it's wrong, the report is still right. This is the bar for the two bug reports in CP9.");

  // 19 Your turn
  s = mk(); s.background = { color: C.white };
  header(s, "Your turn · pairs, 3 min", "Rewrite jetbrains-recorder #3 so a stranger could act on it");
  codeBlock(s, 0.6, 1.95, 12.1, 1.3, [
    ["No recording generated when file is nested in subdirectories", C.code],
    ["I had a student who observed no recording file generated unless she was", C.codeDim],
    ["in the directory that the file she was editing was in.", C.codeDim]
  ], {}, 15);
  codeBlock(s, 0.6, 3.45, 12.1, 3.3, [
    ["No recording file created when the edited file is in a subdirectory", C.codeAdd],
    ["", C.code],
    ["1. Open a project in [IDE + version] with the recorder [version] installed", C.code],
    ["2. Open [project]/[subdirectory]/[file] and edit it", C.code],
    ["3. Save, then look for the recording in [where it should appear]", C.code],
    ["Expected     [a recording for that file, at that location]", C.code],
    ["Actual       [no recording anywhere? or somewhere unexpected?]", C.code],
    ["Narrowing    Works when [the file is in the directory you opened]", C.code],
    ["Note         Reported secondhand; not yet reproduced by me", C.code]
  ], REVEAL(1), 14.5);
  footer(s);
  s.addNotes("A public BYU course-tools repository; shown for the report, not the person. Pairs, three minutes, against the six parts. Credit what's there: the last clause is real narrowing, which is the most useful sentence in it. Take two rewrites aloud, then click. The reveal is a skeleton, not an answer; every blank is a question a maintainer would otherwise have to ask. Point at the last line: a secondhand report should say it's secondhand, so the maintainer knows nothing is confirmed yet.");

  // 20 Your own starter issues
  s = mk(); s.background = { color: C.white };
  header(s, "Now yours", "The starter issues from Wednesday's lab");
  card(s, 0.6, 1.95, 7.3, 3.5, C.cardBg);
  await iconCircle(s, FA.FaFolderOpen, 0.9, 2.2, 0.66, C.teal);
  s.addText("Open your project's issues", { x: 1.75, y: 2.2, w: 6.0, h: 0.66, color: C.ink, fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "You wrote these before any of this was taught", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Hold each one against the six parts", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Which part is missing most often?", options: { bullet: { indent: 16 } } }
  ], { x: 1.0, y: 3.1, w: 6.7, h: 2.2, color: C.ink, fontFace: F.body, fontSize: 17, valign: "top", margin: 0 });
  card(s, 8.15, 1.95, 4.55, 3.5, C.navy);
  s.addText("Fix one now", { x: 8.45, y: 2.15, w: 4.0, h: 0.5, color: C.amber, fontFace: F.body, fontSize: 19, bold: true, margin: 0 });
  s.addText("Edit the weakest issue until a stranger could act on it. Editing your own issue is normal, and nobody loses anything.", { x: 8.45, y: 2.8, w: 4.0, h: 2.5, color: C.white, fontFace: F.body, fontSize: 16.5, valign: "top", margin: 0, lineSpacingMultiple: 1.05 });
  card(s, 0.6, 5.7, 12.1, 1.05, C.amberBg);
  s.addText("Start saving links now. CP9 asks for your two best bug reports and your best feature request, from this semester.", { x: 0.95, y: 5.7, w: 11.4, h: 1.05, color: C.ink, fontFace: F.body, fontSize: 16.5, valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("Three or four minutes. Each project rereads the starter issues it filed in the Session 14 lab, written cold. Most will be missing expected-versus-actual or steps; that's the expected result, not a failure. Have each project edit its weakest one now. Mention CP9: the portfolio wants your best bug reports and a feature request, with links, so a rewritten issue today can be one of them. Circulate and read a few.");

  // 21 The founder's move
  s = mk(); s.background = { color: C.white };
  header(s, "The founder's move", "You don't just write reports. You design the norms.");
  const norms = [
    [FA.FaBug, "Bug template", "Asks for the six parts. Borrow Rich's trick: if one command can capture the environment, put it in the template."],
    [FA.FaLightbulb, "Feature template", "The need, the user, today's workaround. Your product-definition thinking, in miniature."],
    [FA.FaTags, "Labels", "bug · enhancement · good first issue, plus one or two your project needs to triage."]
  ];
  for (let i = 0; i < 3; i++) {
    const x = 0.6 + i * 4.1;
    card(s, x, 1.95, 3.9, 2.55, C.cardBg);
    await iconCircle(s, norms[i][0], x + 0.3, 2.2, 0.66, C.teal);
    s.addText(norms[i][1], { x: x + 1.15, y: 2.2, w: 2.55, h: 0.66, color: C.ink, fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0 });
    s.addText(norms[i][2], { x: x + 0.3, y: 3.0, w: 3.3, h: 1.45, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0, lineSpacingMultiple: 1.03 });
  }
  card(s, 0.6, 5.75, 12.1, 1.0, C.navy, REVEAL(1));
  s.addText([
    { text: "Not every issue is a bug.  ", options: { color: C.amber, bold: true } },
    { text: "SSW #6, \"Can't move off the map,\" is a reminder that a feature isn't built yet, filed in bug language. As a feature, it would say what the rules call for at the map edge.", options: { color: C.white } }
  ], { x: 0.95, y: 5.75, w: 11.4, h: 1.0, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0, lineSpacingMultiple: 1.03, ...REVEAL(1) });
  card(s, 0.6, 4.7, 12.1, 0.85, C.amber);
  s.addText("Whatever your template asks for is what you'll get. Ask for reproduction steps now, or beg for them forever.", { x: 0.95, y: 4.7, w: 11.4, h: 0.85, color: C.navy, fontFace: F.body, fontSize: 17, bold: true, valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("Two minutes, and the bridge to the self-audit. Everything in the last fifteen minutes becomes a template field. The feature template is the one projects forget: a feature request that states the need and who has it can be weighed; 'add dark mode' can't. Labels make triage possible once issues pile up, and good first issue is how a newcomer finds a way in. Click for SSW #6, mine: a placeholder reminding me a feature isn't built, filed as if it were a bug. Placeholders are fine; the fix is the right type, the enhancement label, and a sentence on what should happen. A bug template would have asked it for steps that don't exist. They'll sketch all three in the next block.");

  // 22 Self-audit
  s = mk(); s.background = { color: C.white };
  header(s, "Your repo · 18 min", "Audit it as a stranger, then sketch the fixes");
  const steps = [
    ["1", "Audit · 8 min", "Walk your repo with the CP7 Checklist. Mark each item done, weak, or missing. Write the punch list at the bottom, in the order you'll fix it."],
    ["2", "Sketch · 7 min", "Your bug template's fields. Your PR template's checklist, pulled from your git standards. The 3–5 labels you'll start with."],
    ["3", "Write · 3 min", "Your README's first sentence. Read it to someone outside your project. Can they repeat back what it is?"]
  ];
  for (let i = 0; i < 3; i++) {
    const y = 1.95 + i * 1.3;
    card(s, 0.6, y, 12.1, 1.15, i === 2 ? C.navy : C.cardBg);
    s.addShape(pres.shapes.OVAL, { x: 0.85, y: y + 0.29, w: 0.57, h: 0.57, fill: { color: i === 2 ? C.amber : C.teal } });
    s.addText(steps[i][0], { x: 0.85, y: y + 0.29, w: 0.57, h: 0.57, color: i === 2 ? C.navy : C.white, fontFace: F.head, fontSize: 20, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(steps[i][1], { x: 1.65, y, w: 2.5, h: 1.15, color: i === 2 ? C.amber : C.tealDk, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
    s.addText(steps[i][2], { x: 4.2, y, w: 8.25, h: 1.15, color: i === 2 ? C.white : C.ink, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  }
  card(s, 0.6, 5.95, 12.1, 0.8, C.amberBg);
  s.addText("The punch list is Wednesday's agenda. Bring it.", { x: 0.95, y: 5.95, w: 11.4, h: 0.8, color: C.ink, fontFace: F.body, fontSize: 17, bold: true, align: "center", valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("Hand out the CP7 Checklist if you haven't. Keep time out loud at each step. In the audit, push them to open the repo in a private browser window, logged out, so they see what a stranger sees. Circulate during the sketch; most first-draft templates ask for too little. The README sentence is the one to insist on. Every project writes it before leaving, and you should hear a few read aloud. Expect rewrites.");

  // 23 Wrap
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: -1.3, y: 5.2, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaDoorOpen, 0.9, 1.15, 0.85, C.amber, C.navy);
  s.addText("Governance became files. Issues have an anatomy. The front door is something you design.", { x: 0.9, y: 2.15, w: 11.9, h: 1.05, color: C.white, fontFace: F.head, fontSize: 26, bold: true, italic: true, margin: 0, lineSpacingMultiple: 1.06 });
  s.addText("BEFORE WEDNESDAY, OCT 28", { x: 0.92, y: 3.4, w: 11, h: 0.35, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText([
    { text: "Bring your punch list: Wednesday is a build workshop", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "Bring your review partner's repo link: you'll read each other's README cold", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "Start saving links for CP9: bug reports, feature requests, PR descriptions, review comments, replies", options: { bullet: { indent: 16 } } }
  ], { x: 0.95, y: 3.85, w: 11.7, h: 1.95, color: "CBD8E6", fontFace: F.body, fontSize: 17, valign: "top", margin: 0 });
  card(s, 0.6, 5.95, 12.1, 0.8, C.amber);
  s.addText("CP7 is due end of day Friday, Oct 30, merged to main. CP9 (eight artifacts) is due Nov 18.", { x: 0.9, y: 5.95, w: 11.5, h: 0.8, color: C.navy, fontFace: F.body, fontSize: 16, bold: true, align: "center", valign: "middle", margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("Close in a few minutes. Say the one-liner, then the logistics. Wednesday starts every piece of CP7 and finishes the quick ones; the rest is due Friday, so nobody has to build the whole front door alone in 75 minutes. The review partner matters: after the fast items, partners read each other's README and CONTRIBUTING cold. The setup guide is only a placeholder for now; say so, so nobody spends Tuesday night writing setup steps for code that doesn't exist. CP9 opens today: anything good they write from now on can go in the portfolio, so tell them to save links as they go.");

  const OUT = "Session15-FrontDoor.pptx";
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
