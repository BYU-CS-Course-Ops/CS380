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
pres.title = "CS 301R — Session 16 — Ship the Front Door";

let PAGE = 0;
function mk() { PAGE++; return pres.addSlide(); }
function footer(slide, col) {
  const c = col || C.slate;
  slide.addText("CS 301R · Session 16 · Ship the Front Door", { x: 7.3, y: 7.04, w: 5.4, h: 0.3, align: "right", color: c, fontFace: F.body, fontSize: 10, margin: 0 });
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
const R = n => (n ? REVEAL(n) : {});
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
async function build() {
  let s;

  // 1 Title
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: 10.9, y: -1.4, w: 4.2, h: 4.2, fill: { color: "1C3252" } });
  s.addShape(pres.shapes.OVAL, { x: 12.0, y: 5.1, w: 3.0, h: 3.0, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaHammer, 0.9, 1.45, 1.0, C.amber, C.navy);
  s.addText("CS 301R · SOFTWARE ENGINEERING STUDIO I", { x: 0.92, y: 2.75, w: 11, h: 0.35, color: "9FB4C7", fontFace: F.body, fontSize: 15, bold: true, charSpacing: 2, margin: 0 });
  s.addText("Ship the Front Door", { x: 0.9, y: 3.15, w: 12.1, h: 1.3, color: C.white, fontFace: F.head, fontSize: 42, bold: true, margin: 0 });
  s.addText([
    { text: "Session 16 — infrastructure build workshop", options: { color: C.amber, bold: true, breakLine: true } },
    { text: "Wednesday, October 28, 2026", options: { color: "9FB4C7" } }
  ], { x: 0.92, y: 4.7, w: 11, h: 0.9, fontFace: F.body, fontSize: 19, margin: 0, lineSpacingMultiple: 1.2 });
  s.addNotes("A heads-down build day; the slides are signposts, not a lecture. Before class: cut the Stranger's Read sheets (two per page, one per student plus spares), have spare CP7 Checklists, and open Prop Loft at tag session-16 plus the Contributor Covenant and choosealicense.com. For the templates block, also open: Prop Loft's New issue page (the chooser), its .github folder at session-16, Rich's .github folder, and mdx-canvas's ISSUE_TEMPLATE folder. Settle the reading pairs: two pairs with four students, a rotating triple for an odd count, and you read for anyone whose partner is absent.");

  // 2 The day's order
  s = mk(); s.background = { color: C.white };
  header(s, "Today · the order", "Finish the fast items, start the rest, get read cold");
  const plan = [
    [FA.FaClipboardCheck, "Punch-list check", "Your plan for today and for Friday, written down", "3"],
    [FA.FaFileCode, "Templates, taught", "Where the files go, Markdown or form, the PR template, three real examples", "15"],
    [FA.FaFlagCheckered, "Finish the fast items", "README status, setup placeholder, LICENSE, code of conduct, templates + labels", "15"],
    [FA.FaPenNib, "Start CONTRIBUTING + norms", "Both drafted far enough to read: merged or on an open PR", "15"],
    [FA.FaUserSecret, "Stranger's read", "Your partner reads your README and CONTRIBUTING cold", "15"],
    [FA.FaWrench, "Act on it + seed issues", "Fixes in or filed; seed issues started", "8"],
    [FA.FaRoute, "Wrap", "What's left for Friday, and how to submit", "4"]
  ];
  for (let i = 0; i < plan.length; i++) {
    const y = 1.92 + i * 0.72;
    const hi = i === 1 || i === 4;
    card(s, 0.6, y, 12.1, 0.62, hi ? C.navy : C.cardBg);
    await iconCircle(s, plan[i][0], 0.88, y + 0.08, 0.46, hi ? C.amber : C.teal, hi ? C.navy : "FFFFFF");
    s.addText(plan[i][1], { x: 1.6, y, w: 3.7, h: 0.62, color: hi ? C.white : C.ink, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
    s.addText(plan[i][2], { x: 5.3, y, w: 6.2, h: 0.62, color: hi ? "CFE0E9" : C.slate, fontFace: F.body, fontSize: 15, valign: "middle", margin: 0 });
    s.addText(plan[i][3] + " min", { x: 11.4, y, w: 1.05, h: 0.62, color: hi ? C.amber : C.slate, fontFace: F.body, fontSize: 16, bold: true, align: "right", valign: "middle", margin: 0 });
  }
  footer(s);
  s.addNotes("Leave this up at the start of each block; it's the clock for people working alone. The right column is the target state at each block's end, so a founder can tell whether they're on pace. Two blocks are highlighted: the templates block, the one piece of teaching today, and the stranger's read, the one thing that needs another person. Neither moves. The build blocks are shorter than a full build needs, on purpose: what doesn't finish here finishes by Friday. On a team the same list parallelizes: split the finish items and cross-review the PRs; the order and the stranger's read stay the same.");

  // 3 Punch-list check + rules of the day
  s = mk(); s.background = { color: C.white };
  header(s, "Punch-list check · 3 min", "One sentence each, written on your punch list");
  card(s, 0.6, 1.95, 5.95, 1.55, C.navy);
  s.addText([
    { text: "In class today, I'll finish…", options: { color: C.amber, bold: true, breakLine: true } },
    { text: "Name the items, not \"as much as I can.\"", options: { color: "CFE0E9" } }
  ], { x: 0.95, y: 1.95, w: 5.3, h: 1.55, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, lineSpacingMultiple: 1.1 });
  card(s, 6.75, 1.95, 5.95, 1.55, C.navy);
  s.addText([
    { text: "By Friday, I'll finish…", options: { color: C.amber, bold: true, breakLine: true } },
    { text: "Usually CONTRIBUTING, the norms, and whatever the read turns up.", options: { color: "CFE0E9" } }
  ], { x: 7.1, y: 1.95, w: 5.3, h: 1.55, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, lineSpacingMultiple: 1.1 });
  const rules = [
    ["Adapt, don't invent", "where a standard exists", "License text, the Contributor Covenant, the shape of an issue form. Experts wrote them; fill in your blanks."],
    ["Write, don't copy", "where your project is the content", "README, CONTRIBUTING, communication norms. Nobody else can write these, and a stranger can tell."]
  ];
  for (let i = 0; i < 2; i++) {
    const x = 0.6 + i * 6.15;
    card(s, x, 3.75, 5.95, 2.0, C.cardBg, REVEAL(1));
    s.addText([
      { text: rules[i][0], options: { color: C.tealDk, bold: true, fontSize: 19 } },
      { text: "  " + rules[i][1], options: { color: C.slate, fontSize: 15 } }
    ], { x: x + 0.35, y: 3.9, w: 5.3, h: 0.5, fontFace: F.body, valign: "middle", margin: 0, ...REVEAL(1) });
    s.addText(rules[i][2], { x: x + 0.35, y: 4.45, w: 5.3, h: 1.2, color: C.ink, fontFace: F.body, fontSize: 16, valign: "top", margin: 0, lineSpacingMultiple: 1.04, ...REVEAL(1) });
  }
  card(s, 0.6, 5.95, 12.1, 0.8, C.amber, REVEAL(2));
  s.addText("Every item ships through its own pull request, the way your git standards say. The process documents itself.", { x: 0.95, y: 5.95, w: 11.4, h: 0.8, color: C.navy, fontFace: F.body, fontSize: 16.5, bold: true, valign: "middle", margin: 0, ...REVEAL(2) });
  footer(s);
  s.addNotes("Three minutes, no more. Each founder says both sentences aloud or writes them; push back on 'as much as I can.' First click: the rules of the day. People lose time writing a code of conduct from scratch, or copying a README template that says nothing about their project. Second click: everything goes through a PR, even solo. On a one-person project that's a PR plus a written self-review against the checklist; partners can review later if time allows.");

  // 4 The model
  s = mk(); s.background = { color: C.white };
  header(s, "A worked example", "Prop Loft's front door, at tag session-16");
  const model = [
    ["CONTRIBUTING.md", "Welcome and \"your first contribution\" come first. Policy and the license rationale come last."],
    ["CODE_OF_CONDUCT.md", "Contributor Covenant 3.0, word for word. Only the two blanks are filled in."],
    [".github/", "Bug and feature issue forms, a PR template whose checklist is the git standards."],
    ["docs/communication-norms.md", "Issues and PRs only, replies within a week, who decides, and what's out of scope."],
    ["README.md", "A Contributing section that links all of the above, plus the maintainer's response time."],
    ["Issues tab", "Three seed issues written through the templates. One is a good first issue."]
  ];
  const mw = 3.9, mg = 0.2, mh = 1.95;
  for (let i = 0; i < model.length; i++) {
    const x = 0.6 + (i % 3) * (mw + mg), y = 1.95 + Math.floor(i / 3) * (mh + 0.2);
    card(s, x, y, mw, mh, C.cardBg);
    s.addText(model[i][0], { x: x + 0.25, y: y + 0.12, w: mw - 0.5, h: 0.5, color: C.tealDk, fontFace: F.mono, fontSize: 16, bold: true, margin: 0 });
    s.addText(model[i][1], { x: x + 0.25, y: y + 0.65, w: mw - 0.5, h: mh - 0.75, color: C.ink, fontFace: F.body, fontSize: 15, valign: "top", margin: 0, lineSpacingMultiple: 1.03 });
  }
  card(s, 0.6, 6.25, 12.1, 0.55, C.amberBg);
  s.addText("github.com/prop-loft/prop-loft/tree/session-16   ·   Read it for shape. Your content has to be yours.", { x: 0.95, y: 6.25, w: 11.4, h: 0.55, color: C.ink, fontFace: F.body, fontSize: 15, bold: true, valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("Two minutes, in the browser if you can. Prop Loft is built ahead of the class, and each session's state is a tag; session-16 is today's. Point at two things: CONTRIBUTING opens with a welcome, not rules, and the code of conduct is adopted, not rewritten. Then tell them to close the tab. The example shows what each file is for; copying its sentences produces a front door about someone else's project, and the stranger's read will catch it.");

  // 5 Where the files go
  s = mk(); s.background = { color: C.white };
  header(s, "Templates · 15 min", "Where the files go, and what each one does");
  s.addText("Your repository", { x: 0.6, y: 1.85, w: 6.2, h: 0.35, color: C.slate, fontFace: F.body, fontSize: 15, bold: true, margin: 0 });
  codeBlock(s, 0.6, 2.25, 6.2, 3.45, [
    [".github/", C.amber],
    ["  ISSUE_TEMPLATE/", C.amber],
    ["    bug_report.md   or  .yml", C.codeAdd],
    ["    feature_request.md  or  .yml", C.codeAdd],
    ["    config.yml", C.codeAdd],
    ["  pull_request_template.md", C.codeAdd],
    ["", C.code],
    ["README.md  CONTRIBUTING.md  ...", C.codeDim]
  ], {}, 16);
  const where = [
    ["ISSUE_TEMPLATE/", "Each file is one choice when someone clicks New issue."],
    ["config.yml", "The chooser: allow a blank issue? Send conduct reports somewhere private?"],
    ["pull_request_template.md", "Pre-fills the description of every new pull request."]
  ];
  for (let i = 0; i < 3; i++) {
    const y = 1.95 + i * 1.27;
    card(s, 7.05, y, 5.65, 1.12, C.cardBg, REVEAL(i + 1));
    s.addText([
      { text: where[i][0], options: { bold: true, color: C.tealDk, fontFace: F.mono, breakLine: true } },
      { text: where[i][1], options: { color: C.ink, fontSize: 15.5 } }
    ], { x: 7.3, y, w: 5.2, h: 1.12, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0, ...REVEAL(i + 1) });
  }
  bar(s, 5.95, 0.8, C.navy, "Nothing works until it's merged to main.", "A template on a branch does nothing.", 4);
  footer(s);
  s.addNotes("Two minutes. The whole picture first: everything lives in .github at the root of the repo. One click per file. Then show it live: Prop Loft's New issue page, so they see the chooser that ISSUE_TEMPLATE and config.yml produce, including the conduct-report link. Last click: the most common reason a template 'doesn't work' is that it's still on a branch. Templates take effect from the default branch only.");

  // 6 Markdown or form
  s = mk(); s.background = { color: C.white };
  header(s, "Templates · two formats", "The same bug template, written both ways");
  s.addText("bug_report.md  ·  Markdown template", { x: 0.6, y: 1.85, w: 5.95, h: 0.35, color: C.slate, fontFace: F.body, fontSize: 15, bold: true, margin: 0 });
  codeBlock(s, 0.6, 2.25, 5.95, 2.75, [
    ["---", C.codeDim],
    ["name: Bug report", C.amber],
    ["labels: bug", C.amber],
    ["---", C.codeDim],
    ["**Steps to reproduce**", C.code],
    ["1.", C.code],
    ["**What you expected to happen**", C.code],
    ["**What actually happened**", C.code]
  ], {}, 14.5);
  s.addText("bug_report.yml  ·  issue form", { x: 6.75, y: 1.85, w: 5.95, h: 0.35, color: C.slate, fontFace: F.body, fontSize: 15, bold: true, margin: 0, ...REVEAL(1) });
  codeBlock(s, 6.75, 2.25, 5.95, 2.75, [
    ["name: Bug report", C.amber],
    ["labels: [\"bug\"]", C.amber],
    ["body:", C.codeDim],
    ["  - type: textarea", C.code],
    ["    attributes:", C.code],
    ["      label: Steps to reproduce", C.code],
    ["    validations:", C.code],
    ["      required: true", C.codeAdd]
  ], REVEAL(1), 14.5);
  card(s, 0.6, 5.2, 5.95, 1.55, C.cardBg, REVEAL(2));
  s.addText([
    { text: "One pre-filled text box.  ", options: { bold: true, color: C.tealDk } },
    { text: "The reporter can delete anything. Quick to write; most repos you'll browse use it.", options: { color: C.ink } }
  ], { x: 0.9, y: 5.2, w: 5.4, h: 1.55, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0, lineSpacingMultiple: 1.03, ...REVEAL(2) });
  card(s, 6.75, 5.2, 5.95, 1.55, C.cardBg, REVEAL(2));
  s.addText([
    { text: "Separate fields.  ", options: { bold: true, color: C.tealDk } },
    { text: "required: true means it can't be skipped. More to write, and indentation matters.", options: { color: C.ink } }
  ], { x: 7.05, y: 5.2, w: 5.4, h: 1.55, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0, lineSpacingMultiple: 1.03, ...REVEAL(2) });
  footer(s);
  s.addNotes("About four minutes. Left: a Markdown template is front matter (the name the chooser shows, the labels to apply) and then text that lands in the issue box. Click: the same template as a form; each item under body is a field, and required: true is the one thing Markdown can't do. Second click: the trade. Both are fine; mixing is fine. Ask: which would you pick for bugs on your project, and why? Full skeletons of both are on the templates page in Course Resources.");

  // 7 Two forms, side by side
  s = mk(); s.background = { color: C.white };
  header(s, "Templates · a form in full", "Every required field is a norm you only write once");
  const forms = [
    ["Bug report", "labels: bug · needs triage", [
      ["Before you file (required box)", "I searched open and closed issues: no duplicates"],
      ["Steps to reproduce", "Numbered, from somewhere a stranger can get to"],
      ["Expected  /  What actually happened", "Two fields, so neither gets skipped"],
      ["Environment", "An example shows the shape: \"Firefox 131 on Windows 11\""],
      ["Anything else", "Logs, screenshots, how often: the evidence"]
    ]],
    ["Feature request", "labels: enhancement · needs triage", [
      ["Opening note", "\"Start with the problem, not the solution,\" and a link to the non-goals"],
      ["The problem", "What you're trying to do, and what gets in the way: the need"],
      ["Who has this problem", "The user, named"],
      ["What you do today instead", "The workaround: how much the problem costs now"],
      ["An idea (optional)", "The solution comes last, and it's optional"]
    ]]
  ];
  for (let i = 0; i < 2; i++) {
    const x = 0.6 + i * 6.15, rv = i === 1 ? REVEAL(1) : {};
    card(s, x, 1.9, 5.95, 0.62, i === 0 ? C.coral : C.teal, rv);
    s.addText([
      { text: forms[i][0], options: { bold: true, fontSize: 19, color: C.white } },
      { text: "   " + forms[i][1], options: { fontSize: 15, color: C.white } }
    ], { x: x + 0.3, y: 1.9, w: 5.4, h: 0.62, fontFace: F.body, valign: "middle", margin: 0, ...rv });
    card(s, x, 2.62, 5.95, 3.18, C.cardBg, rv);
    for (let r = 0; r < 5; r++) {
      const y = 2.72 + r * 0.61;
      s.addText(forms[i][2][r][0], { x: x + 0.25, y, w: 2.25, h: 0.58, color: C.ink, fontFace: F.body, fontSize: 15, bold: true, valign: "middle", margin: 0, ...rv });
      s.addText(forms[i][2][r][1], { x: x + 2.6, y, w: 3.15, h: 0.58, color: C.slate, fontFace: F.body, fontSize: 15, valign: "middle", margin: 0, lineSpacingMultiple: 0.98, ...rv });
    }
  }
  card(s, 0.6, 5.98, 12.1, 0.8, C.navy, REVEAL(2));
  s.addText("Each form's labels: line triages it on arrival. Create the labels first: a form silently skips any label the repo doesn't have.", { x: 0.95, y: 5.98, w: 11.4, h: 0.8, color: C.white, fontFace: F.body, fontSize: 16, bold: true, valign: "middle", margin: 0, ...REVEAL(2) });
  footer(s);
  s.addNotes("About two minutes. Prop Loft's two forms, mapped to Monday's anatomy. Left: the bug form turns the anatomy into required fields, so a reporter can't skip steps or expected-versus-actual. Click: the feature form asks for the need, the user, and today's workaround, with the solution last and optional; it points at the design's non-goals where Rich's template says no to features outright. Click: labels, created first. The YAML is in Prop Loft's .github/ISSUE_TEMPLATE at session-16, and a skeleton of each is on the templates page.");

  // 8 Three real projects
  s = mk(); s.background = { color: C.white };
  header(s, "Templates · three real projects", "Read them for what they ask, and what they don't");
  const ex = [
    ["mdx-canvas", "Markdown", "GitHub's generated starter, unchanged. It works, and it asks a command-line tool's users which smartphone they have.", "Adapt the starter."],
    ["Rich", "Markdown", "Search-first checkboxes, a diagnostic command that captures the environment in one paste, and \"we're not accepting new features\" in a comment.", "Say no once, in writing."],
    ["Prop Loft", "Forms", "Required fields, a needs triage label on every new issue, and a config.yml that sends conduct reports somewhere private.", "Make the anatomy the default."]
  ];
  for (let i = 0; i < 3; i++) {
    const x = 0.6 + i * 4.15;
    card(s, x, 1.95, 3.8, 4.0, C.cardBg, REVEAL(i + 1));
    s.addText(ex[i][0], { x: x + 0.25, y: 2.08, w: 2.3, h: 0.5, color: C.ink, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0, ...REVEAL(i + 1) });
    s.addText(ex[i][1], { x: x + 2.45, y: 2.13, w: 1.15, h: 0.4, color: C.white, fontFace: F.body, fontSize: 14, bold: true, align: "center", valign: "middle", margin: 0, fill: { color: i === 2 ? C.teal : C.slate }, ...REVEAL(i + 1) });
    s.addText(ex[i][2], { x: x + 0.25, y: 2.75, w: 3.3, h: 2.35, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0, lineSpacingMultiple: 1.03, ...REVEAL(i + 1) });
    s.addText(ex[i][3], { x: x + 0.25, y: 5.2, w: 3.3, h: 0.6, color: C.tealDk, fontFace: F.body, fontSize: 16, bold: true, italic: true, valign: "middle", margin: 0, ...REVEAL(i + 1) });
  }
  bar(s, 6.15, 0.65, C.amberBg, "Links to all three:", "Canvas → Course Resources → Issue and Pull Request Templates", null);
  footer(s);
  s.addNotes("About three minutes, in the browser if you can: open each project's template folder as you click. mdx-canvas kept GitHub's starter (Settings, Features, Issues, Set up templates), which is fine to start from but asks the wrong questions until you edit it. Rich's Markdown does a lot: the diagnose command is the best environment field you'll see. Prop Loft's forms you've seen. The lesson across all three: a template should ask your project's questions.");

  // 9 The PR template
  s = mk(); s.background = { color: C.white };
  header(s, "Templates · the pull request template", "Your review policy, made unavoidable");
  s.addText(".github/pull_request_template.md  ·  Prop Loft", { x: 0.6, y: 1.85, w: 6.9, h: 0.35, color: C.slate, fontFace: F.body, fontSize: 15, bold: true, margin: 0 });
  codeBlock(s, 0.6, 2.25, 6.9, 4.5, [
    ["**Problem.** What does this change", C.code],
    ["fix or add? Closes #", C.code],
    ["**Approach.** How you solved it.", C.code],
    ["**Where to look first.**", C.code],
    ["**How you tested it.**", C.code],
    ["", C.code],
    ["### Checklist (from our git standards)", C.amber],
    ["- [ ] One logical change", C.codeAdd],
    ["- [ ] Commit messages follow the rules", C.codeAdd],
    ["- [ ] python manage.py test passes", C.codeAdd],
    ["- [ ] Docs updated if behavior changed", C.codeAdd]
  ], {}, 14.5);
  const prParts = [
    ["The top half", "The description you've written by hand since Session 13: the problem, the approach, where to look, how you tested.", C.cardBg, 1],
    ["The checklist", "Copied from your git standards' definition of done. The author checks each box before asking for review.", C.cardBg, 2],
    ["Markdown only", "No form for pull requests. It pre-fills every new PR, once it's on main.", C.amberBg, 3]
  ];
  for (let i = 0; i < 3; i++) {
    const y = 1.95 + i * 1.62;
    card(s, 7.75, y, 4.95, 1.48, prParts[i][2], REVEAL(prParts[i][3]));
    s.addText([
      { text: prParts[i][0], options: { bold: true, color: C.tealDk, breakLine: true } },
      { text: prParts[i][1], options: { color: C.ink, fontSize: 15 } }
    ], { x: 8.0, y, w: 4.5, h: 1.48, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, lineSpacingMultiple: 1.02, ...REVEAL(prParts[i][3]) });
  }
  footer(s);
  s.addNotes("About three minutes. Click one: the top half is the Session 13 description, so they already know how to write it; the template just puts it in the box. Click two: the checklist is their CP6 definition of done, copied, so every author sees the bar before review. Click three: show it live by starting a pull request on Prop Loft and watching the box fill. Rich's PR template is the other example: its checklist says run black and update the changelog.");

  // 10 Build block 1
  s = mk(); s.background = { color: C.white };
  header(s, "Build block 1 · 15 min", "Finish the fast items");
  const fast = [
    [FA.FaBookOpen, "README", "First sentence, rewritten. A status line. How to contribute, and a license line."],
    [FA.FaHourglassHalf, "Setup placeholder", "docs/setup.md: your stack, \"arrives with the first runnable build,\" and the issue tracking it."],
    [FA.FaBalanceScale, "LICENSE", "The exact text. Fill in fields only if it has them (MIT, BSD). Rationale goes in CONTRIBUTING."],
    [FA.FaHandshake, "Code of conduct", "Contributor Covenant, adopted. A contact you'll check, a response time, and a route if it's about you."],
    [FA.FaTags, "Templates + labels", "Labels first. Then a skeleton from the templates page, made yours: bug, feature, PR."]
  ];
  const fw = 2.3, fg = 0.15;
  for (let i = 0; i < fast.length; i++) {
    const x = 0.6 + i * (fw + fg);
    card(s, x, 1.95, fw, 3.7, C.cardBg);
    await iconCircle(s, fast[i][0], x + (fw - 0.72) / 2, 2.2, 0.72, C.teal);
    s.addText(fast[i][1], { x: x + 0.1, y: 3.05, w: fw - 0.2, h: 0.75, color: C.ink, fontFace: F.body, fontSize: 18, bold: true, align: "center", valign: "top", margin: 0 });
    s.addText(fast[i][2], { x: x + 0.15, y: 3.75, w: fw - 0.3, h: 1.85, color: C.slate, fontFace: F.body, fontSize: 15, align: "center", valign: "top", margin: 0 });
  }
  card(s, 0.6, 5.9, 12.1, 0.85, C.navy);
  s.addText("File the setup-guide issue now. It's your first seed issue, and the placeholder links to it.", { x: 0.95, y: 5.9, w: 11.4, h: 0.85, color: C.white, fontFace: F.body, fontSize: 17, bold: true, valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("Fifteen minutes, one small PR per item; templates may finish after class, from the templates page. Rove hard. Spot-check license fields: MIT and BSD need a year and holder; Apache's '[yyyy] [name of copyright owner]' line is a file-header template in the appendix and stays as written, so don't flag it. Check reporting contacts: an address they'll actually read, a response time, and, solo, GitHub's reporting tools for reports about the maintainer. Read README first sentences back to their authors: would a stranger know what this is? The placeholder takes five minutes; don't let anyone write real setup steps for code that doesn't exist yet. That guide comes in Session 20. Warn at ten minutes and at two.");

  // 11 An honest status
  s = mk(); s.background = { color: C.white };
  header(s, "Before there's code", "An honest status beats a quickstart that fails");
  s.addText("README.md", { x: 0.6, y: 1.9, w: 5.95, h: 0.4, color: C.tealDk, fontFace: F.mono, fontSize: 16, bold: true, margin: 0 });
  codeBlock(s, 0.6, 2.35, 5.95, 3.1, [
    ["## Status", C.codeAdd],
    ["", C.code],
    ["Early development. Nothing", C.code],
    ["runs yet: the first build", C.code],
    ["lands in November. Setup", C.code],
    ["instructions will be in", C.code],
    ["docs/setup.md.", C.code]
  ], {}, 18);
  s.addText("docs/setup.md", { x: 6.75, y: 1.9, w: 5.95, h: 0.4, color: C.tealDk, fontFace: F.mono, fontSize: 16, bold: true, margin: 0 });
  codeBlock(s, 6.75, 2.35, 5.95, 3.1, [
    ["# Setting up", C.codeAdd],
    ["", C.code],
    ["Stack: Python 3.12, Django,", C.code],
    ["SQLite", C.code],
    ["", C.code],
    ["Setup instructions arrive", C.code],
    ["with the first runnable", C.code],
    ["build. Tracked in #1.", C.code]
  ], {}, 18);
  card(s, 0.6, 5.7, 12.1, 1.05, C.amberBg);
  s.addText("A stranger who reads \"not yet\" knows what to expect. A stranger whose quickstart fails assumes the whole project is broken.", { x: 0.95, y: 5.7, w: 11.4, h: 1.05, color: C.ink, fontFace: F.body, fontSize: 16.5, bold: true, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  footer(s);
  s.addNotes("One minute, shown during block 1 for anyone stuck on the README. This is the shape the rubric gives full credit for, and it's true of any project in early development: say what state it's in, what's coming, and where that's tracked. The stack line comes straight from the design doc. Install and run get graded later, in the repo audit, once there's something to run. A quickstart that fails costs points twice.");

  // 12 Build block 2
  s = mk(); s.background = { color: C.white };
  header(s, "Build block 2 · 15 min", "Start the write-it-yourself items");
  card(s, 0.6, 1.95, 5.95, 3.75, C.cardBg);
  s.addText("CONTRIBUTING.md", { x: 0.95, y: 2.1, w: 5.3, h: 0.5, color: C.tealDk, fontFace: F.mono, fontSize: 18, bold: true, margin: 0 });
  s.addText("Grow it from your git standards, in this order:", { x: 0.95, y: 2.6, w: 5.3, h: 0.4, color: C.slate, fontFace: F.body, fontSize: 15, italic: true, margin: 0 });
  const order = ["Welcome", "What to do first", "How to pick work", "The PR process and reviews", "Policy, last"];
  for (let i = 0; i < order.length; i++) {
    const y = 3.1 + i * 0.5;
    s.addShape(pres.shapes.OVAL, { x: 0.95, y: y + 0.04, w: 0.36, h: 0.36, fill: { color: i < 2 ? C.amber : C.teal } });
    s.addText(String(i + 1), { x: 0.95, y: y + 0.04, w: 0.36, h: 0.36, color: i < 2 ? C.navy : C.white, fontFace: F.body, fontSize: 14, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(order[i], { x: 1.5, y, w: 4.8, h: 0.44, color: C.ink, fontFace: F.body, fontSize: 17, bold: i < 2, valign: "middle", margin: 0 });
  }
  card(s, 6.75, 1.95, 5.95, 3.75, C.cardBg);
  s.addText("docs/communication-norms.md", { x: 7.1, y: 2.1, w: 5.3, h: 0.5, color: C.tealDk, fontFace: F.mono, fontSize: 18, bold: true, margin: 0 });
  s.addText([
    { text: "Where discussion happens", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "Response times you can keep: \"within a week,\" not \"24/7\"", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "Who maintains", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "How decisions get made. Solo: how does a contributor's proposal get decided, and where?", options: { bullet: { indent: 16 } } }
  ], { x: 7.1, y: 2.7, w: 5.35, h: 2.9, color: C.ink, fontFace: F.body, fontSize: 16, valign: "top", margin: 0 });
  card(s, 0.6, 5.95, 12.1, 0.8, C.navy);
  s.addText("Target: both drafted far enough that a stranger can read them, merged or on an open PR.", { x: 0.95, y: 5.95, w: 11.4, h: 0.8, color: C.white, fontFace: F.body, fontSize: 17, bold: true, valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("Fifteen minutes. These can't be finished here, and that's the plan: get both far enough to be read in the next block. The amber steps are the ones first drafts skip; most CONTRIBUTING files start with rules. Push on 'what should a newcomer do first?' The norms are the public parts of the charter, rewritten for a stranger. Solo founders still owe an answer on decisions. At two minutes: push what you have, even rough.");

  // 13 Stranger's read
  s = mk(); s.background = { color: C.navy };
  darkHeader(s, "Stranger's read · 15 min", "Read your partner's front door cold");
  const steps = [
    ["1", "Open it the way a stranger would", "Private, logged-out browser window. Their repo, not their screen."],
    ["2", "README, then CONTRIBUTING", "About five minutes each. Don't ask the author anything; if you'd have to ask, write it down."],
    ["3", "Fill in the Stranger's Read sheet", "What is this? How would I start helping? The one thing that most stopped me. Tick what the docs told you."],
    ["4", "Hand it back", "The author keeps it, acts on it, and submits a photo of it with CP7."]
  ];
  for (let i = 0; i < steps.length; i++) {
    const y = 1.95 + i * 0.95;
    card(s, 0.6, y, 12.1, 0.82, "1E3352");
    s.addShape(pres.shapes.OVAL, { x: 0.85, y: y + 0.15, w: 0.52, h: 0.52, fill: { color: C.amber } });
    s.addText(steps[i][0], { x: 0.85, y: y + 0.15, w: 0.52, h: 0.52, color: C.navy, fontFace: F.head, fontSize: 18, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(steps[i][1], { x: 1.6, y, w: 4.0, h: 0.82, color: C.white, fontFace: F.body, fontSize: 17, bold: true, valign: "middle", margin: 0 });
    s.addText(steps[i][2], { x: 5.6, y, w: 6.85, h: 0.82, color: "CFE0E9", fontFace: F.body, fontSize: 15, valign: "middle", margin: 0, lineSpacingMultiple: 1.02 });
  }
  card(s, 0.6, 5.85, 12.1, 0.9, C.amber);
  s.addText("The author is the worst reader of their own docs: they already know everything the docs leave out.", { x: 0.95, y: 5.85, w: 11.4, h: 0.9, color: C.navy, fontFace: F.body, fontSize: 17, bold: true, valign: "middle", margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("Hand out the sheets. Pairs swap; in a triple, rotate so each person reads one repo and is read by one; read for anyone whose partner is out. Insist on the logged-out window, because a signed-in view hides what a stranger can't see. Readers who finish early should reread the README's first paragraph only and check whether their 'what is this?' still holds. Ten minutes reading, five writing. Authors stay quiet; explaining your docs is the thing the docs should have done.");

  // 14 Act on the read + seed
  s = mk(); s.background = { color: C.white };
  header(s, "Act on it · 8 min", "Read your sheet, then fix or file");
  card(s, 0.6, 1.95, 12.1, 1.05, C.navy);
  s.addText("If your partner's \"what is this?\" doesn't match what you meant, your first sentence isn't done.", { x: 0.95, y: 1.95, w: 11.4, h: 1.05, color: C.white, fontFace: F.head, fontSize: 20, bold: true, valign: "middle", margin: 0 });
  const act = [
    [FA.FaWrench, "Fix it or file it", "Under ten minutes: fix it now. Bigger: file an issue. Write the number on the sheet and say \"from the stranger's read\" in the description. Keep the sheet: finish the rest by Friday and photograph it for CP7."],
    [FA.FaSeedling, "Seed the tracker", "2–3 real next-work issues, written through your own templates. The setup-guide issue counts as one. They start Monday's backlog."],
    [FA.FaExchangeAlt, "Time left?", "Review your partner's open PRs. A real review comment is CP9 evidence; save the link."]
  ];
  for (let i = 0; i < 3; i++) {
    const x = 0.6 + i * 4.1;
    card(s, x, 3.25, 3.9, 3.5, C.cardBg);
    await iconCircle(s, act[i][0], x + 0.3, 3.5, 0.66, C.teal);
    s.addText(act[i][1], { x: x + 1.15, y: 3.5, w: 2.6, h: 0.66, color: C.ink, fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0 });
    s.addText(act[i][2], { x: x + 0.3, y: 4.35, w: 3.3, h: 2.3, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0, lineSpacingMultiple: 1.03 });
  }
  footer(s);
  s.addNotes("Eight minutes. The top line is the test: ask two or three founders to read their partner's 'what is this?' aloud next to their own first sentence. The citation in the PR or issue is how the fix traces back to the read for grading. Seed issues are real next work, not busywork; they're the first items in Monday's backlog (CP8). Anything unfinished is fine as long as it's done by Friday.");

  // 15 Submitting CP7
  s = mk(); s.background = { color: C.white };
  header(s, "Submitting CP7", "Tag it, the way a project marks a release");
  s.addText("When everything is merged to main:", { x: 0.6, y: 1.9, w: 12, h: 0.4, color: C.slate, fontFace: F.body, fontSize: 16, italic: true, margin: 0 });
  codeBlock(s, 0.6, 2.35, 12.1, 1.75, [
    ["git switch main && git pull", C.code],
    ["git tag -a cp7 -m \"CP7: infrastructure package\"", C.code],
    ["git push origin cp7", C.code]
  ], {}, 18);
  card(s, 0.6, 4.35, 5.95, 2.4, C.cardBg);
  await iconCircle(s, FA.FaLink, 0.9, 4.6, 0.62, C.teal);
  s.addText("In Canvas, paste the tag URL", { x: 1.7, y: 4.6, w: 4.7, h: 0.62, color: C.ink, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
  s.addText("…/YOUR-REPO/tree/cp7. That frozen state is what's graded, so work you merge later doesn't change it.", { x: 0.95, y: 5.35, w: 5.35, h: 1.3, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0, lineSpacingMultiple: 1.03 });
  card(s, 6.75, 4.35, 5.95, 2.4, C.cardBg);
  await iconCircle(s, FA.FaCamera, 7.05, 4.6, 0.62, C.teal);
  s.addText("Add a photo of the sheet", { x: 7.85, y: 4.6, w: 4.7, h: 0.62, color: C.ink, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
  s.addText("Your Stranger's Read sheet, with what you did about it filled in. Flat page, good light, legible.", { x: 7.1, y: 5.35, w: 5.35, h: 1.3, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0, lineSpacingMultiple: 1.03 });
  footer(s);
  s.addNotes("Two minutes. Run the three commands live on Prop Loft or any repo so they see the tag appear on GitHub. A tag is how real projects mark a release: it names a state that doesn't move when main does. To resubmit before the deadline, or for a revision, move the tag with tag -fa and push -f, then resubmit; the handout has the commands. No sheet photo caps Newcomer usability at Proficient.");

  // 16 Wrap
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: -1.3, y: 5.2, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaDoorOpen, 0.9, 1.15, 0.85, C.amber, C.navy);
  s.addText("The bar for every file isn't \"exists.\" It's \"works for a stranger.\"", { x: 0.9, y: 2.15, w: 11.9, h: 1.05, color: C.white, fontFace: F.head, fontSize: 26, bold: true, italic: true, margin: 0, lineSpacingMultiple: 1.06 });
  s.addText("BY END OF DAY FRIDAY, OCT 30", { x: 0.92, y: 3.4, w: 11, h: 0.35, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText([
    { text: "CONTRIBUTING and the norms finished; the read acted on; everything merged to main", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "Tag cp7, then submit the tag URL and a photo of your sheet in Canvas", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "Save today's links for CP9: PR descriptions, review comments, seed issues", options: { bullet: { indent: 16 } } }
  ], { x: 0.95, y: 3.85, w: 11.7, h: 1.95, color: "CBD8E6", fontFace: F.body, fontSize: 17, valign: "top", margin: 0 });
  card(s, 0.6, 5.95, 12.1, 0.8, C.amber);
  s.addText("Monday, Nov 2: Phase 4 begins. Today's seed issues are the first items in your backlog.", { x: 0.9, y: 5.95, w: 11.5, h: 0.8, color: C.navy, fontFace: F.body, fontSize: 16, bold: true, align: "center", valign: "middle", margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("Four minutes. Say the one-liner, then the Friday list. In three weeks a classmate audits these repos cold, for a grade, and adds install and run; today's read was the preview. Remind them that CP9 is due Nov 18 and that today produced good portfolio material. Monday turns the proposal and design into epics, milestones, and a populated tracker (CP8), starting from the seed issues filed today.");

  const OUT = "Session16-FrontDoorWorkshop.pptx";
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
