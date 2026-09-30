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
  code: "E8EEF3", codeDim: "9FB4C7", codeAdd: "9FE0B5"
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
pres.title = "CS 301R — Session 13 — Git for Maintainers";

let PAGE = 0;
function mk() { PAGE++; return pres.addSlide(); }
function footer(slide, col) {
  const c = col || C.slate;
  slide.addText("CS 301R · Session 13 · Git for Maintainers", { x: 7.3, y: 7.04, w: 5.4, h: 0.3, align: "right", color: c, fontFace: F.body, fontSize: 10, margin: 0 });
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
// A block of code or commit text on a dark card. `lines` is an array of strings,
// or [text, color] pairs to color a line (diff additions, dimmed context).
function codeBlock(s, x, y, w, h, lines, extra, fontSize) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: C.navy2 }, line: { type: "none" }, rectRadius: 0.08, shadow: mkShadow(), ...extra });
  const runs = lines.map((ln, i) => {
    const [text, color] = Array.isArray(ln) ? ln : [ln, C.code];
    return { text: text === "" ? " " : text, options: { color, breakLine: i < lines.length - 1 } };
  });
  s.addText(runs, { x: x + 0.3, y: y + 0.18, w: w - 0.6, h: h - 0.36, fontFace: F.mono, fontSize: fontSize || 15, valign: "top", margin: 0, lineSpacingMultiple: 1.05, ...extra });
}

// One commit-critique slide: the message, where it came from, and what the room
// should find (revealed on click).
function critique(n, lines, codeH, source, findTitle, find, notes) {
  const s = mk(); s.background = { color: C.white };
  header(s, `Commit critique · ${n} of 8`, "Grade it against the seven rules");
  codeBlock(s, 0.6, 1.9, 12.1, codeH, lines, {}, 16);
  s.addText(source, { x: 0.6, y: 1.98 + codeH, w: 12.1, h: 0.36, color: C.slate, fontFace: F.body, fontSize: 14, italic: true, margin: 0 });
  const fy = 2.5 + codeH, fh = 6.8 - fy;
  card(s, 0.6, fy, 12.1, fh, n === 8 ? C.strongBg : C.amberBg, REVEAL(1));
  s.addText([
    { text: findTitle + "  ", options: { color: n === 8 ? C.green : C.tealDk, bold: true } },
    { text: find, options: { color: C.ink } }
  ], { x: 0.95, y: fy, w: 11.4, h: fh, fontFace: F.body, fontSize: 18, valign: "middle", margin: 0, lineSpacingMultiple: 1.06, ...REVEAL(1) });
  footer(s);
  s.addNotes(notes);
  return s;
}

async function build() {
  let s;

  // 1 Title
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: 10.9, y: -1.4, w: 4.2, h: 4.2, fill: { color: "1C3252" } });
  s.addShape(pres.shapes.OVAL, { x: 12.0, y: 5.1, w: 3.0, h: 3.0, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaCodeBranch, 0.9, 1.45, 1.0, C.amber, C.navy);
  s.addText("CS 301R · SOFTWARE ENGINEERING STUDIO I", { x: 0.92, y: 2.75, w: 11, h: 0.35, color: "9FB4C7", fontFace: F.body, fontSize: 15, bold: true, charSpacing: 2, margin: 0 });
  s.addText("The Workflow You'll Enforce", { x: 0.9, y: 3.15, w: 12.1, h: 1.3, color: C.white, fontFace: F.head, fontSize: 42, bold: true, margin: 0 });
  s.addText([
    { text: "Session 13 — git for maintainers", options: { color: C.amber, bold: true, breakLine: true } },
    { text: "Monday, October 19, 2026", options: { color: "9FB4C7" } }
  ], { x: 0.92, y: 4.7, w: 11, h: 0.9, fontFace: F.body, fontSize: 19, margin: 0, lineSpacingMultiple: 1.2 });
  s.addNotes("Phase 3's second week, and the first day in the repository. Everyone has used git; today re-aims it. You've always been the contributor asking to get code in. Now you're the maintainer deciding how code gets in, and that decision is governance. Before class: the demo kit is reset (`demo-upstream.sh local`), the student reviewer has accepted the invite, the Canvas message is sent, and the terminal font is large. Run sheet: demos/session13-git-workflow/DEMO-SCRIPT.md.");

  // 2 Today
  s = mk(); s.background = { color: C.white };
  header(s, "Today", "The loop, the craft behind it, and Wednesday");
  const plan = [
    [FA.FaGavel, "The workflow is governance", "6 min"],
    [FA.FaCodeBranch, "The whole loop, live, on a real repo", "22 min"],
    [FA.FaPenNib, "Commit messages: eight real ones, graded", "15 min"],
    [FA.FaComments, "Pull requests and code review", "18 min"],
    [FA.FaListUl, "Wednesday's decisions for your project", "8 min"]
  ];
  for (let i = 0; i < plan.length; i++) {
    const y = 1.95 + i * 0.93;
    card(s, 0.6, y, 12.1, 0.82, i === 1 ? C.navy : C.cardBg);
    await iconCircle(s, plan[i][0], 0.88, y + 0.11, 0.6, i === 1 ? C.amber : C.teal, i === 1 ? C.navy : "FFFFFF");
    s.addText(plan[i][1], { x: 1.68, y, w: 8.9, h: 0.82, color: i === 1 ? C.white : C.ink, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
    s.addText(plan[i][2], { x: 10.6, y, w: 1.8, h: 0.82, color: i === 1 ? C.amber : C.slate, fontFace: F.body, fontSize: 16, bold: true, align: "right", valign: "middle", margin: 0 });
  }
  s.addText("Wednesday is a lab: you run this loop yourselves, on your own project's repository.", { x: 0.6, y: 6.5, w: 12.1, h: 0.4, color: C.slate, fontFace: F.body, fontSize: 15, italic: true, align: "center", margin: 0 });
  footer(s);
  s.addNotes("Thirty seconds. The highlighted row is most of the session and it's live, not slides. Name the payoff up front: by the end of today they should be able to run the whole loop, write a commit message a stranger can use, and review a change without making it personal. Wednesday they do it for real on their own repositories, so today is the model they copy. Keep moving; the framing slide is next.");

  // 3 You're the maintainer now
  s = mk(); s.background = { color: C.white };
  header(s, "The workflow is governance", "You've been the contributor. Now you're the maintainer.");
  card(s, 0.6, 2.0, 5.95, 3.35, C.cardBg);
  await iconCircle(s, FA.FaHandPaper, 0.95, 2.3, 0.66, C.slate);
  s.addText("The contributor", { x: 1.8, y: 2.37, w: 4.6, h: 0.5, color: C.ink, fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0 });
  s.addText("Asks to get code in. Follows the project's rules: its branch names, its review process, its idea of \"done.\"", { x: 1.0, y: 3.2, w: 5.3, h: 2.0, color: C.ink, fontFace: F.body, fontSize: 17.5, valign: "top", margin: 0, lineSpacingMultiple: 1.06 });
  card(s, 6.75, 2.0, 5.95, 3.35, C.navy);
  await iconCircle(s, FA.FaGavel, 7.1, 2.3, 0.66, C.amber, C.navy);
  s.addText("The maintainer", { x: 7.95, y: 2.37, w: 4.6, h: 0.5, color: C.white, fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0 });
  s.addText("Decides how code gets in. Every rule a contributor follows was a choice a maintainer made, and wrote down.", { x: 7.15, y: 3.2, w: 5.3, h: 2.0, color: "CFE0E9", fontFace: F.body, fontSize: 17.5, valign: "top", margin: 0, lineSpacingMultiple: 1.06 });
  card(s, 0.6, 5.6, 12.1, 1.15, C.amber);
  await iconCircle(s, FA.FaCodeBranch, 0.92, 5.87, 0.6, C.navy, C.amber);
  s.addText("The one fixed rule in this course: every project uses pull requests, even solo. Everything else about your workflow is your project's call.", { x: 1.85, y: 5.6, w: 10.6, h: 1.15, color: C.navy, fontFace: F.body, fontSize: 16.5, bold: true, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  footer(s);
  s.addNotes("Six minutes with the next slide. The reframe: in most tutorials you're the contributor. Here you set the rules, and what you choose is what a future contributor will experience, so this is Session 3's governance made real in tooling. Say why PRs are required even for a solo project: the PR is where the reasoning is recorded and where a second reader gets a chance to look, and a solo founder needs that record most. Everything else is theirs to decide Wednesday.");

  // 4 The loop
  s = mk(); s.background = { color: C.white };
  header(s, "The loop", "Six steps, every change, every time");
  const loop = [
    [FA.FaCodeBranch, "Branch", "from main, named for the change"],
    [FA.FaCubes, "Logical commits", "one nameable thing each"],
    [FA.FaFileAlt, "Draft PR", "open early, describe it well"],
    [FA.FaUserCheck, "Request review", "someone who didn't write it"],
    [FA.FaRedo, "Revise", "answer every comment"],
    [FA.FaCodeBranch, "Merge", "under your project's policy"]
  ];
  const lw = 1.88, lg = 0.16;
  for (let i = 0; i < loop.length; i++) {
    const x = 0.6 + i * (lw + lg);
    const dark = i === 5;
    card(s, x, 2.1, lw, 3.3, dark ? C.navy : C.cardBg, REVEAL(i + 1));
    await iconCircle(s, loop[i][0], x + (lw - 0.72) / 2, 2.35, 0.72, dark ? C.amber : C.teal, dark ? C.navy : "FFFFFF", REVEAL(i + 1));
    s.addText(String(i + 1), { x, y: 3.2, w: lw, h: 0.4, color: dark ? C.amber : C.teal, fontFace: F.head, fontSize: 18, bold: true, align: "center", margin: 0, ...REVEAL(i + 1) });
    s.addText(loop[i][1], { x: x + 0.1, y: 3.6, w: lw - 0.2, h: 0.75, color: dark ? C.white : C.ink, fontFace: F.body, fontSize: 18, bold: true, align: "center", valign: "top", margin: 0, ...REVEAL(i + 1) });
    s.addText(loop[i][2], { x: x + 0.12, y: 4.35, w: lw - 0.24, h: 0.95, color: dark ? "CFE0E9" : C.slate, fontFace: F.body, fontSize: 15, align: "center", valign: "top", margin: 0, ...REVEAL(i + 1) });
  }
  card(s, 0.6, 5.7, 12.1, 1.05, C.navy, REVEAL(7));
  s.addText("Not the fork-and-upstream dance of contributing to a stranger's project. This is the loop of a project that owns its repository.", { x: 0.95, y: 5.7, w: 11.4, h: 1.05, color: C.white, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0, ...REVEAL(7) });
  footer(s);
  s.addNotes("One click per step, a sentence each. Don't teach the steps here; the demo does. This slide is the map they carry into it. The seventh click lands the contrast: this is the maintainer-centered loop of a project whose people own the repository, not forking a stranger's project and asking permission. Tell them to watch for all six in the next twenty minutes, and that Wednesday's lab grades the same six.");

  // 5 Meet Prop Loft
  s = mk(); s.background = { color: C.white };
  header(s, "The demo project", "Monday's Backstage, built for real, under a new name");
  card(s, 0.6, 2.0, 5.95, 2.5, C.cardBg);
  s.addText("Backstage", { x: 0.6, y: 2.25, w: 5.95, h: 0.9, color: C.slate, fontFace: F.head, fontSize: 38, bold: true, align: "center", valign: "middle", strike: "sngStrike", margin: 0 });
  s.addText("Already taken: Spotify's open-source developer portal, backstage.io", { x: 0.95, y: 3.25, w: 5.25, h: 1.0, color: C.ink, fontFace: F.body, fontSize: 16, align: "center", valign: "top", margin: 0 });
  card(s, 6.75, 2.0, 5.95, 2.5, C.navy, REVEAL(1));
  s.addText("Prop Loft", { x: 6.75, y: 2.25, w: 5.95, h: 0.9, color: C.amber, fontFace: F.head, fontSize: 38, bold: true, align: "center", valign: "middle", margin: 0, ...REVEAL(1) });
  s.addText("Every item a production stores: costumes first, then props and set pieces", { x: 7.1, y: 3.25, w: 5.25, h: 1.0, color: "CFE0E9", fontFace: F.body, fontSize: 16, align: "center", valign: "top", margin: 0, ...REVEAL(1) });
  card(s, 0.6, 4.8, 12.1, 0.9, C.amberBg, REVEAL(2));
  s.addText("Name for where the project is going. Scope for where it starts.", { x: 0.95, y: 4.8, w: 11.4, h: 0.9, color: C.ink, fontFace: F.head, fontSize: 21, bold: true, align: "center", valign: "middle", margin: 0, ...REVEAL(2) });
  s.addText("Django · Apache-2.0 · public · github.com/prop-loft/prop-loft", { x: 0.6, y: 6.0, w: 12.1, h: 0.45, color: C.slate, fontFace: F.body, fontSize: 15, align: "center", margin: 0 });
  footer(s);
  s.addNotes("About a minute. The design doc they dissected called it Backstage. When it came time to create the repo, we checked the name, the way the repository guide says to, and it belonged to a widely used project. First click: Prop Loft, deliberately broader than version 1. Second click: the line to say out loud. The best name is often taken, and a founder picks the best available one and moves on. Mention the demo runs on a disposable copy so the practice PR stays out of the real history.");

  // 6 Live
  s = await (async () => {
    const t = mk(); t.background = { color: C.navy };
    darkHeader(t, "Live · 20 min", "The loop, once, start to finish");
    t.addText("Watch for each step. Wednesday you'll do all of them yourselves.", { x: 0.62, y: 1.78, w: 12, h: 0.4, color: "CFE0E9", fontFace: F.body, fontSize: 16, italic: true, margin: 0 });
    const live = [
      ["Branch, and four logical commits", "feat/item-search"],
      ["Push, and open a draft pull request", "problem · approach · look here first"],
      ["A classmate reviews it", "one real bug, one scope question"],
      ["Fix one comment with a commit; answer the other with reasons", "and an issue"],
      ["Merge, and read the history it leaves", "merge · squash · rebase"]
    ];
    const top = 2.35, gap = 0.14, h = (5.75 - top - gap * 4) / 5;
    for (let i = 0; i < live.length; i++) {
      const y = top + i * (h + gap);
      card(t, 0.6, y, 12.1, h, "1E3352");
      t.addShape(pres.shapes.OVAL, { x: 0.85, y: y + (h - 0.5) / 2, w: 0.5, h: 0.5, fill: { color: C.amber } });
      t.addText(String(i + 1), { x: 0.85, y: y + (h - 0.5) / 2, w: 0.5, h: 0.5, color: C.navy, fontFace: F.head, fontSize: 20, bold: true, align: "center", valign: "middle", margin: 0 });
      t.addText(live[i][0], { x: 1.55, y, w: 6.9, h, color: C.white, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0 });
      t.addText(live[i][1], { x: 8.5, y, w: 4.0, h, color: C.amber, fontFace: F.body, fontSize: 15, bold: true, align: "right", valign: "middle", margin: 0 });
    }
    card(t, 0.6, 5.95, 12.1, 0.8, C.amber);
    t.addText("Follow along: github.com/prop-loft/prop-loft-demo", { x: 1.0, y: 5.95, w: 11.3, h: 0.8, color: C.navy, fontFace: F.body, fontSize: 17, bold: true, valign: "middle", margin: 0 });
    footer(t, "7E92A8");
    return t;
  })();
  s.addNotes("Leave this up while you switch to the terminal, and come back to it between steps if the room loses the thread. Everything is in DEMO-SCRIPT.md, steps B1 to B12, with the conflict sidebar optional if you're under time. The code is pre-written; every git and GitHub step is live. Keep narrating the decision behind each step rather than the keystrokes. Budget: branch and commits 6 min, PR 4, review and revisions 7, merge 3. Next slide is for the merge step.");

  // 7 Merge strategies
  s = mk(); s.background = { color: C.white };
  header(s, "Merge under policy", "Three ways to merge, three different histories");
  const strat = [
    ["Merge commit", "Keeps every branch commit, plus a commit that joins them.", "Full history; a busier log.", "merge"],
    ["Squash and merge", "The whole pull request becomes one commit on main.", "Linear; one revert undoes the change.", "squash"],
    ["Rebase and merge", "Replays each commit onto main. No merge commit.", "Linear, with every commit kept.", "rebase"]
  ];
  const sw = 3.9, sg = 0.2;
  for (let i = 0; i < 3; i++) {
    const x = 0.6 + i * (sw + sg);
    const pick = i === 1;
    card(s, x, 1.95, sw, 4.0, pick ? C.navy : C.cardBg, REVEAL(i + 1));
    s.addText(strat[i][0], { x: x + 0.25, y: 2.1, w: sw - 0.5, h: 0.5, color: pick ? C.amber : C.ink, fontFace: F.body, fontSize: 19, bold: true, margin: 0, ...REVEAL(i + 1) });
    // mini history: main line of dots, with the branch shape per strategy
    const lineY = 3.05, dx = 0.45, x0 = x + 0.4;
    const dot = (cx, cy, color) => s.addShape(pres.shapes.OVAL, { x: cx - 0.11, y: cy - 0.11, w: 0.22, h: 0.22, fill: { color }, line: { type: "none" }, ...REVEAL(i + 1) });
    const seg = (x1, y1, x2, y2, color) => s.addShape(pres.shapes.LINE, { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1) || 0.001, h: Math.abs(y2 - y1) || 0.001, flipV: (y2 < y1) !== (x2 < x1), line: { color, width: 2.25 }, ...REVEAL(i + 1) });
    const mainC = pick ? "CFE0E9" : C.slate, featC = pick ? C.amber : C.teal;
    if (strat[i][3] === "merge") {
      seg(x0, lineY, x0 + 6 * dx, lineY, mainC);
      seg(x0 + dx, lineY, x0 + 2 * dx, lineY + 0.5, featC); seg(x0 + 2 * dx, lineY + 0.5, x0 + 4 * dx, lineY + 0.5, featC); seg(x0 + 4 * dx, lineY + 0.5, x0 + 5 * dx, lineY, featC);
      [0, 1, 5, 6].forEach(k => dot(x0 + k * dx, lineY, mainC));
      [2, 3, 4].forEach(k => dot(x0 + k * dx, lineY + 0.5, featC));
    } else if (strat[i][3] === "squash") {
      seg(x0, lineY, x0 + 6 * dx, lineY, mainC);
      [0, 1, 2, 6].forEach(k => dot(x0 + k * dx, lineY, mainC));
      dot(x0 + 4 * dx, lineY, featC);
    } else {
      seg(x0, lineY, x0 + 6 * dx, lineY, mainC);
      [0, 1, 6].forEach(k => dot(x0 + k * dx, lineY, mainC));
      [3, 4, 5].forEach(k => dot(x0 + k * dx, lineY, featC));
    }
    s.addText(strat[i][1], { x: x + 0.25, y: 3.85, w: sw - 0.5, h: 1.0, color: pick ? C.white : C.ink, fontFace: F.body, fontSize: 16, valign: "top", margin: 0, lineSpacingMultiple: 1.04, ...REVEAL(i + 1) });
    s.addText(strat[i][2], { x: x + 0.25, y: 4.95, w: sw - 0.5, h: 0.85, color: pick ? "CFE0E9" : C.slate, fontFace: F.body, fontSize: 15, italic: true, valign: "top", margin: 0, ...REVEAL(i + 1) });
  }
  card(s, 0.6, 6.15, 12.1, 0.65, C.amber, REVEAL(4));
  s.addText("Each project picks one on Wednesday. Our suggested default: squash.", { x: 0.95, y: 6.15, w: 11.4, h: 0.65, color: C.navy, fontFace: F.body, fontSize: 16.5, bold: true, valign: "middle", margin: 0, ...REVEAL(4) });
  footer(s);
  s.addNotes("Bring this up at the merge step (B11), just before choosing in GitHub's dropdown. One click per strategy; the dots are commits, grey for main, colored for the branch. Merge commit keeps everything plus a join. Squash collapses the pull request into one commit, which is why the squash message deserves editing. Rebase replays each commit with no join. The fourth click is the suggestion, not a rule: squash keeps main linear and easy to revert at this project size. After squashing, raise the question and leave it open: why write careful commits if squash makes them one? It's answered after the commit-message section.");

  // 8 The seven rules
  s = mk(); s.background = { color: C.white };
  header(s, "Commit messages", "The seven rules, from the reading");
  const rules = [
    "Separate the subject from the body with a blank line",
    "Limit the subject line to about 50 characters",
    "Capitalize the subject line",
    "Don't end the subject line with a period",
    "Use the imperative mood in the subject line",
    "Wrap the body at about 72 characters",
    "Use the body to explain what and why, not how"
  ];
  for (let i = 0; i < rules.length; i++) {
    const y = 1.95 + i * 0.64;
    const key = i === 4 || i === 6;
    card(s, 0.6, y, 7.3, 0.54, key ? C.navy : C.cardBg);
    s.addText(String(i + 1), { x: 0.75, y, w: 0.45, h: 0.54, color: key ? C.amber : C.teal, fontFace: F.head, fontSize: 18, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(rules[i], { x: 1.3, y, w: 6.5, h: 0.54, color: key ? C.white : C.ink, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0 });
  }
  card(s, 8.15, 1.95, 4.55, 4.38, C.amberBg);
  s.addText("The imperative test", { x: 8.45, y: 2.15, w: 4.0, h: 0.5, color: C.tealDk, fontFace: F.body, fontSize: 19, bold: true, margin: 0 });
  s.addText([
    { text: "\"If applied, this commit will ", options: { color: C.ink } },
    { text: "___", options: { color: C.coral, bold: true } },
    { text: ".\"", options: { color: C.ink } }
  ], { x: 8.45, y: 2.75, w: 4.0, h: 1.0, fontFace: F.head, fontSize: 20, italic: true, valign: "top", margin: 0 });
  s.addText("Your subject line should fill the blank. \"Add search\" passes. \"Added search\" and \"Search stuff\" don't.", { x: 8.45, y: 3.95, w: 4.0, h: 2.2, color: C.ink, fontFace: F.body, fontSize: 16, valign: "top", margin: 0, lineSpacingMultiple: 1.06 });
  footer(s);
  s.addNotes("Two minutes; they read cbeams, so recall rather than teach. The highlighted two do most of the work: imperative mood, and a body that explains why. The imperative test is the one tool to leave with. Try it on the demo's own commits from ten minutes ago: \"If applied, this commit will filter the item list by a name query.\" Then set up the critique: eight real messages, one at a time, and the room grades each before you click to reveal.");

  // 9–16 Critique
  critique(1, [["e66f6cc WIP", C.code], ["…", C.codeDim], ["be46e3c Revert \"WIP\"", C.code]], 1.3,
    "git log --oneline · mdxcanvas, a public BYU course-tools repository",
    "What to notice:",
    "\"WIP\" says nothing. The revert is worse: a future reader learns that something was undone, but not what, or why. A commit message is written for someone who can't ask you.",
    "Ask the room first: what does this log tell you? Nothing, twice. The revert is the teaching point: git dutifully records that the WIP was undone, and the reader is no wiser. Name the audience, the person who can't ask you, including yourself in six months. The critique set is real messages from public repos; the ones that aren't mine are shown without author names on purpose. The point is the message, not the person. About ninety seconds per message.");
  critique(2, [["Updates", C.code]], 0.85,
    "mdxcanvas, a public BYU course-tools repository",
    "What to notice:",
    "A subject that fits every commit ever made tells you nothing about this one. Run the imperative test: \"If applied, this commit will updates.\" It fails even as grammar.",
    "Quick one. Let someone run the imperative test out loud; the grammar failure gets a laugh and makes the rule stick. Then ask what they'd need to know to find this commit a year from now, searching the log for when something changed. \"Updates\" can't be found by searching for anything. Move on in under a minute; the next one is mine.");
  critique(3, [["FIxed exception error", C.code]], 0.85,
    "Mine: dagorym/StarshipConstruction",
    "What to notice:",
    "Past tense, a typo, and which exception? It reads like a bug fix. The diff shows it only changed an error message, from \"class 1-4\" to \"class 1-5\", after the previous commit added class 5. The message hid what actually happened.",
    "Own it: this one's mine. Let the room find past tense, the typo, and \"which error?\" first. Then the reveal, the part they can't see from the message: the diff wasn't a bug fix at all, just a stale error message updated after adding a fifth class. That's the real cost of a vague message: not ugliness, but a history that misleads. We'll rewrite this one after the critique.");
  critique(4, [["Fixed Test Suite. Fixed --auto-open flag. Fixed attempting to run on", C.code], ["file that doesn't exist making an html anyway.", C.code]], 1.15,
    "code-recording-analysis, a public BYU course-tools repository",
    "What to notice:",
    "Three changes, three \"Fixed\"s. When a subject needs \"and\", or three sentences, the commit wants to be split. One commit, one nameable thing, so each can be reviewed, found, and reverted on its own.",
    "The subject is really three commit subjects joined together. Ask: if the --auto-open fix broke something, how would you revert just that? You couldn't. That's the practical argument for logical commits, and it's the same discipline the demo showed when four files became four commits. Point back to the demo log. We'll rewrite this one too, as three commits.");
  critique(5, [["Minor Updates", C.code], ["", C.code], ["- jinja updates to accept jinja args", C.code], ["- fix to deploy quiz not retuning info", C.code], ["- update to result object to show error local or server errors", C.code], ["- fix to common child quiz tag fields", C.code]], 2.1,
    "mdxcanvas, a public BYU course-tools repository",
    "What to notice:",
    "The body contradicts the subject: four unrelated changes to templating, deploying, error reporting, and a quiz tag. None is minor, and none can be reverted without the other three.",
    "Pairs with the last one. This author did write a body, which is better than most, and the body is what gives it away: four bullets, four different parts of the system. Ask the room how many commits this should have been. Four. \"Minor\" is a warning word in a subject; it usually means \"I didn't want to describe this.\" The typo is verbatim; don't dwell on it.");
  critique(6, [["test(forums): add ST2 resolveTopicLastActivity primitive coverage - isReply", C.code], ["flag, opening-post fallback, soft-delete fallback, mixed topics - 174/174", C.code], ["tests pass, lint and typecheck clean", C.code]], 1.45,
    "Mine: dagorym/sfus, written by an AI coding agent",
    "What to notice:",
    "About 200 characters: the body crammed into line one, which git log --oneline, GitHub, and every other tool will cut off. The test(forums): prefix is a good convention, wasted. An AI agent wrote it. The log still has to serve people, whoever writes it.",
    "Also mine, and written by an AI agent working in my repository. Let them find the length first; ask where GitHub will truncate it. Then the point worth making in 2026: agents write a lot of commit messages now, and the seven rules don't care who typed the message. If your tools write your commits, you're still responsible for what the history says. The next slide after the critique comes back to AI from the other direction.");
  critique(7, [["Update main to call Integrator::integrate()", C.code], ["", C.code], ["Add in some constants for number of steps and step size and the loop", C.code], ["to call the integrate() function.  Also add a final print statement", C.code], ["call to display the output.", C.code]], 1.85,
    "Mine: dagorym/StarSystemChecker",
    "What to notice:",
    "The subject is fine. The body narrates the diff: constants, a loop, a print statement. That's the how, and git already shows it line by line. The missing piece is the why: what does calling integrate() make possible?",
    "Mine again, and closer to good: imperative subject, a body, wrapped lines. Ask what the body tells you that the diff doesn't. Nothing. Rule seven is the hardest one because narrating what you did feels like explaining. The test: delete every sentence the diff already shows, and see what's left. Here, nothing. A good body would say what running the integrator now lets you do, or why it's wired in this way.");
  critique(8, [["Use buffered GZip Writer", C.code], ["", C.code], ["I've observed instances where a recording has been corrupted and have", C.code], ["even implemented a raw zlib decoder in the processor for this case when", C.code], ["gzip headers are faulty.", C.code], ["", C.code], ["The goal is that using a buffered writer will help prevent this from", C.code], ["happening.", C.code]], 2.6,
    "jetbrains-recorder, a public BYU course-tools repository",
    "The model.",
    "An imperative 24-character subject. The body gives the failure that motivated it, the fix, and honest confidence: \"the goal is,\" not \"this fixes.\" Two years from now, a reader knows why this line exists.",
    "End the set on a good one, and let the room find why it's good before revealing. Three things: the failure that motivated it, which is why; what changed; and calibrated confidence. \"The goal is\" is honest; the author doesn't know for sure yet, and says so. That honesty helps the next person debugging a corrupted recording: they know this was a mitigation, not a proven fix. Short subject, wrapped body, imperative.");

  // 17 AI disclosure
  s = mk(); s.background = { color: C.white };
  header(s, "One more: AI in the log", "What does the last sentence ask a reviewer to do?");
  codeBlock(s, 0.6, 1.9, 12.1, 2.75, [
    ["Fix cross reference algorithm", C.code], ["", C.code],
    ["The fix changes the logic so that all nodes in an SCC (not just the", C.code],
    ["cycle breaker) filter out edges to other nodes in the same SCC. This", C.code],
    ["ensures the acyclic graph is truly acyclic.", C.code], ["", C.code],
    ["This was written primarily by Copilot, however I have tested and", C.codeAdd],
    ["verified the results.", C.codeAdd]
  ], {}, 16);
  s.addText("mdxcanvas, a public BYU course-tools repository (body shortened)", { x: 0.6, y: 4.73, w: 12.1, h: 0.36, color: C.slate, fontFace: F.body, fontSize: 14, italic: true, margin: 0 });
  card(s, 0.6, 5.3, 12.1, 1.5, C.navy, REVEAL(1));
  s.addText("Read the reasoning with extra care: a tool wrote it. And know the author tested it and stands behind it. That's the course's AI policy: use it, understand it, stand behind it, and say so where the next maintainer will look.", { x: 0.95, y: 5.3, w: 11.4, h: 1.5, color: C.white, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0, lineSpacingMultiple: 1.04, ...REVEAL(1) });
  footer(s);
  s.addNotes("Two minutes. A good message on its own merits, and the last sentence is the point. Ask what it changes for a reviewer: they know to scrutinize the reasoning, because a tool generated it, and they know the author tested it and vouches for the result. That's the course AI policy, written where it matters. Point out the demo's own commits carry a Co-Authored-By line for the same reason. The honest version is simply to say so.");

  // 18a Rewrite message 3
  s = mk(); s.background = { color: C.white };
  header(s, "Your turn · rewrite message 3", "You now know what the commit did. Say so.");
  s.addText("The message", { x: 0.6, y: 1.85, w: 12.1, h: 0.4, color: C.slate, fontFace: F.body, fontSize: 15, bold: true, margin: 0 });
  codeBlock(s, 0.6, 2.25, 12.1, 0.62, [["FIxed exception error", C.code]], {}, 16);
  s.addText("What the commit actually changed (its whole diff)", { x: 0.6, y: 3.05, w: 12.1, h: 0.4, color: C.slate, fontFace: F.body, fontSize: 15, bold: true, margin: 0 });
  codeBlock(s, 0.6, 3.45, 12.1, 0.95, [
    ["-raise Exception( \"Only class 1-4 starship construction centers are defined.\" )", "F4A99A"],
    ["+raise Exception( \"Only class 1-5 starship construction centers are defined.\" )", C.codeAdd]
  ], {}, 15);
  s.addText([
    { text: "The commit just before it: ", options: { color: C.slate } },
    { text: "Added a generic SCC as type 5", options: { color: C.ink, fontFace: F.mono } }
  ], { x: 0.6, y: 4.5, w: 12.1, h: 0.4, fontFace: F.body, fontSize: 15, margin: 0 });
  codeBlock(s, 0.6, 5.1, 12.1, 1.65, [
    ["Include class 5 in unknown-SCC-class error message", C.codeAdd], ["", C.code],
    ["The previous commit added class 5, but the error for an unknown class", C.code],
    ["still said only classes 1-4 exist.", C.code]
  ], REVEAL(1), 16);
  footer(s);
  s.addNotes("Pairs, ninety seconds: write the message this commit should have had, with everything they need on the slide. Take two answers aloud before the click. Strong answers name what changed (the error message), not the symptom, and a good body says why (class 5 was just added). Make the point that matters: the author knew all of this at the time and didn't write it down, and the message \"FIxed exception error\" actively misdescribes a text change as a bug fix. It's mine; say so again.");

  // 18b Rewrite message 4
  s = mk(); s.background = { color: C.white };
  header(s, "Your turn · rewrite message 4", "One commit, 23 files. How many changes?");
  s.addText("The message, complete: a subject line and no body", { x: 0.6, y: 1.85, w: 12.1, h: 0.4, color: C.slate, fontFace: F.body, fontSize: 15, bold: true, margin: 0 });
  codeBlock(s, 0.6, 2.25, 12.1, 0.95, [
    ["Fixed Test Suite. Fixed --auto-open flag. Fixed attempting to run on file", C.code],
    ["that doesn't exist making an html anyway.", C.code]
  ], {}, 16);
  card(s, 0.6, 3.45, 6.2, 3.3, C.cardBg);
  s.addText("What the diff contains", { x: 0.9, y: 3.6, w: 5.7, h: 0.45, color: C.tealDk, fontFace: F.body, fontSize: 17, bold: true, margin: 0 });
  s.addText([
    { text: "--auto-open could never be turned off; now --no-auto-open works", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 5 } },
    { text: "A pattern matching no files still wrote an HTML report; now it's an error", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 5 } },
    { text: "Old tests removed, regression tests added", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 5 } },
    { text: "Not in the message: ", options: { bold: true, color: C.coral } },
    { text: "names escaped in the player's HTML, with a security test; edits checked to arrive in time order", options: { breakLine: false } }
  ], { x: 0.9, y: 4.1, w: 5.7, h: 2.55, color: C.ink, fontFace: F.body, fontSize: 15, valign: "top", margin: 0, lineSpacingMultiple: 1.02 });
  codeBlock(s, 7.0, 3.45, 5.7, 3.3, [
    ["Five commits, one subject each:", C.codeDim],
    ["Allow --no-auto-open to skip", C.codeAdd],
    ["  opening the browser", C.codeAdd],
    ["Report an error when no", C.codeAdd],
    ["  recording files match", C.codeAdd],
    ["Escape recording names in", C.codeAdd],
    ["  the player's HTML", C.codeAdd],
    ["Reject out-of-order edits", C.codeAdd],
    ["Replace the old tests with", C.codeAdd],
    ["  regression tests", C.codeAdd]
  ], REVEAL(1), 15);
  footer(s);
  s.addNotes("The message is the complete text: one 115-character subject, no body. Pairs, two minutes: from the message and the list on the left, how many commits should this have been, and what are their subjects? The coral line is the reveal before the reveal: the diff has two changes the message never mentions, and one is a security fix, HTML escaping in the report viewer. A reviewer reading the message would never look for it. Click for five commits, one subject each (the indented lines are wrapped subjects). The lesson: a message that lists fixes with periods between them is several commits, and the ones it leaves out are the ones a reviewer most needed to see.");

  // 19 Why maintainers care
  s = mk(); s.background = { color: C.white };
  header(s, "Why maintainers care", "The log is free documentation, if you keep it");
  const uses = [
    [FA.FaHistory, "git log", "What happened, and in what order"],
    [FA.FaSearch, "git blame", "Why is this line here? The commit says."],
    [FA.FaUndo, "git revert", "Undo one change cleanly, if it's one change"],
    [FA.FaBullhorn, "Release notes", "Written from subjects, if they're good"],
    [FA.FaUserFriends, "The newcomer", "Reads your history to learn the project"]
  ];
  const uw = 2.3, ug = 0.15;
  for (let i = 0; i < uses.length; i++) {
    const x = 0.6 + i * (uw + ug);
    card(s, x, 2.0, uw, 3.4, i === 4 ? C.navy : C.cardBg);
    await iconCircle(s, uses[i][0], x + (uw - 0.72) / 2, 2.3, 0.72, i === 4 ? C.amber : C.teal, i === 4 ? C.navy : "FFFFFF");
    s.addText(uses[i][1], { x: x + 0.1, y: 3.2, w: uw - 0.2, h: 0.5, color: i === 4 ? C.white : C.ink, fontFace: F.body, fontSize: 18, bold: true, align: "center", margin: 0 });
    s.addText(uses[i][2], { x: x + 0.15, y: 3.8, w: uw - 0.3, h: 1.45, color: i === 4 ? "CFE0E9" : C.slate, fontFace: F.body, fontSize: 15, align: "center", valign: "top", margin: 0 });
  }
  card(s, 0.6, 5.65, 12.1, 1.1, C.amber);
  s.addText("Your project will outlast your memory of it. Write each message for the contributor who joins next year, and for you in six months.", { x: 0.95, y: 5.65, w: 11.4, h: 1.1, color: C.navy, fontFace: F.body, fontSize: 16.5, bold: true, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  footer(s);
  s.addNotes("One minute to close the section. Each card is a tool that only works as well as the messages it reads. Blame is the one to demonstrate if there's a spare minute: on GitHub, open any file in Prop Loft and click Blame, and every line links to the commit and its why. The highlighted card is the contributor-ready thread: the history is part of what a newcomer inherits. This is also why commit quality is graded in CP6. Then the next slide: if we squash, which commits end up in that log? The question from the demo, answered.");

  // 19b Logical commits, then squash? (answers the question left open at the demo's merge step)
  s = mk(); s.background = { color: C.white };
  header(s, "The question from the demo", "Logical commits, then squash them?");
  card(s, 0.6, 1.95, 5.95, 3.55, C.cardBg);
  await iconCircle(s, FA.FaCubes, 0.95, 2.2, 0.66, C.teal);
  s.addText([
    { text: "The branch commits", options: { color: C.ink, bold: true, fontSize: 19, breakLine: true } },
    { text: "serve the reviewer, during review", options: { color: C.tealDk, italic: true, fontSize: 16 } }
  ], { x: 1.8, y: 2.15, w: 4.6, h: 0.8, fontFace: F.body, valign: "middle", margin: 0 });
  s.addText([
    { text: "Read the change one step at a time", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 8 } },
    { text: "See exactly what changed to answer a comment", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Stay in the pull request after the merge", options: { bullet: { indent: 16 } } }
  ], { x: 1.0, y: 3.15, w: 5.35, h: 2.2, color: C.ink, fontFace: F.body, fontSize: 16, valign: "top", margin: 0 });
  card(s, 6.75, 1.95, 5.95, 3.55, C.navy, REVEAL(1));
  await iconCircle(s, FA.FaCodeBranch, 7.1, 2.2, 0.66, C.amber, C.navy, REVEAL(1));
  s.addText([
    { text: "The squash commit", options: { color: C.white, bold: true, fontSize: 19, breakLine: true } },
    { text: "serves the maintainer, for years", options: { color: C.amber, italic: true, fontSize: 16 } }
  ], { x: 7.95, y: 2.15, w: 4.6, h: 0.8, fontFace: F.body, valign: "middle", margin: 0, ...REVEAL(1) });
  s.addText([
    { text: "It's what lands on main, so the seven rules apply here", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Subject: the pull request's title", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Body: why the change exists, not a list of the steps", options: { bullet: { indent: 16 } } }
  ], { x: 7.15, y: 3.15, w: 5.35, h: 2.2, color: "CFE0E9", fontFace: F.body, fontSize: 16, valign: "top", margin: 0, ...REVEAL(1) });
  card(s, 0.6, 5.75, 12.1, 1.0, C.amber, REVEAL(2));
  s.addText("If a pull request needs more than one line of history on main, it's more than one change.", { x: 0.95, y: 5.75, w: 11.4, h: 1.0, color: C.navy, fontFace: F.body, fontSize: 17, bold: true, align: "center", valign: "middle", margin: 0, ...REVEAL(2) });
  footer(s);
  s.addNotes("Close the loop on the question you left open at the demo's merge step: why write four careful commits if squash turns them into one? They weren't thrown away. The branch commits serve the reviewer and stay in the pull request, which the squash commit links to by number; if the demo PR is still open in a browser tab, click its Commits tab to show them. The squash commit is what lands on main, so the seven rules apply to it: the PR title as its subject, the why as its body, not GitHub's default pile of bullets. Tip: GitHub can default the squash message to the PR's title and description (Settings, Pull Requests), which is another reason to write good descriptions. The alternative is real: projects like git itself and the Linux kernel keep every commit on main, rebase-merging, and pay for it by making every branch commit clean. That's why merge strategy is Wednesday's decision.");

  // 20 The author's job
  s = mk(); s.background = { color: C.white };
  header(s, "Pull requests · the author's side", "Make it easy to review, or it won't really get reviewed");
  const author = [
    [FA.FaCompressArrowsAlt, "Small", "One logical change. Big pull requests get skimmed and approved; small ones get read."],
    [FA.FaFileAlt, "Described", "Problem · approach · what to look at first. The description is for the reviewer, not for you."],
    [FA.FaEye, "Self-reviewed", "Read your own diff on GitHub before asking anyone else to. You'll find the first two comments yourself."]
  ];
  for (let i = 0; i < 3; i++) {
    const x = 0.6 + i * 4.1;
    card(s, x, 2.0, 3.9, 3.6, C.cardBg);
    await iconCircle(s, author[i][0], x + 0.3, 2.3, 0.7, C.teal);
    s.addText(author[i][1], { x: x + 1.2, y: 2.3, w: 2.5, h: 0.7, color: C.ink, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
    s.addText(author[i][2], { x: x + 0.3, y: 3.25, w: 3.3, h: 2.2, color: C.ink, fontFace: F.body, fontSize: 16, valign: "top", margin: 0, lineSpacingMultiple: 1.06 });
  }
  card(s, 0.6, 5.85, 12.1, 0.9, C.amberBg);
  s.addText("The demo's pull request said what it left out, too: category search. Saying what a change doesn't do keeps it small.", { x: 0.95, y: 5.85, w: 11.4, h: 0.9, color: C.ink, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("Eighteen minutes for this section with the exercise. Three author habits, each with a reason. Small, because reviewers approve what they can't absorb. Described, because a reviewer who knows where to start reviews the part that matters. Self-reviewed, because reading your own diff in the browser, not the editor, catches the debug print and the stray file. Tie back to the demo's PR description, which the class just watched being written.");

  // 21 The reviewer's standard
  s = mk(); s.background = { color: C.white };
  header(s, "Code review · the reviewer's side", "Approve what makes the code healthier");
  card(s, 0.6, 1.95, 5.5, 4.8, C.navy);
  s.addText("The standard", { x: 0.95, y: 2.15, w: 4.9, h: 0.5, color: C.amber, fontFace: F.body, fontSize: 19, bold: true, margin: 0 });
  s.addText("Google's guide: a reviewer should favor approving a change once it definitely improves the overall health of the code, even if it isn't perfect. There is no perfect code, only better code.", { x: 0.95, y: 2.8, w: 4.85, h: 3.7, color: C.white, fontFace: F.body, fontSize: 16.5, valign: "top", margin: 0, lineSpacingMultiple: 1.08 });
  s.addText("What to look at, most important first", { x: 6.4, y: 1.95, w: 6.3, h: 0.45, color: C.tealDk, fontFace: F.body, fontSize: 17, bold: true, margin: 0 });
  const order = ["Design: does this belong here, built this way?", "Functionality: does it do what it says?", "Complexity: could it be simpler?", "Tests: do they test the behavior?", "Naming: do names say what things are?", "Comments: do they say why?"];
  for (let i = 0; i < order.length; i++) {
    const y = 2.5 + i * 0.72;
    const w = 6.3 - i * 0.35;
    card(s, 6.4, y, w, 0.6, i < 2 ? C.teal : C.cardBg);
    s.addText(order[i], { x: 6.65, y, w: w - 0.35, h: 0.6, color: i < 2 ? C.white : C.ink, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0 });
  }
  footer(s);
  s.addNotes("From the reading's reviewer guide. The standard is the most misunderstood part of review: students think reviewing means finding everything wrong and withholding approval until it's perfect. Google's standard is about direction. Does this change make the code better? Then approve, and leave the nits as nits. The order matters: a design problem makes naming comments irrelevant, so look at the shape before the spelling. The narrowing bars show that.");

  // 22 The human side
  s = mk(); s.background = { color: C.white };
  header(s, "Code review · the human side", "Review the code, not the coder");
  const human = [
    ["Comment on the code, not the person", "\"This loop loads every item\" — not \"you didn't think about performance\""],
    ["Ask rather than rule", "\"Could this filter in the query instead?\" invites a reason; a verdict invites a defense"],
    ["Label the small stuff", "Start with \"nit:\" so the author knows it's optional"],
    ["The author answers every comment", "Fix it, or explain why not. Silence isn't an answer."]
  ];
  for (let i = 0; i < human.length; i++) {
    const y = 1.95 + i * 1.12;
    card(s, 0.6, y, 12.1, 0.98, i === 3 ? C.navy : C.cardBg);
    s.addText(human[i][0], { x: 0.95, y, w: 4.6, h: 0.98, color: i === 3 ? C.amber : C.tealDk, fontFace: F.body, fontSize: 17, bold: true, valign: "middle", margin: 0 });
    s.addText(human[i][1], { x: 5.7, y, w: 6.75, h: 0.98, color: i === 3 ? C.white : C.ink, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0 });
  }
  s.addText("The same register as the proposal peer review in Session 8: same skill, new artifact.", { x: 0.6, y: 6.5, w: 12.1, h: 0.4, color: C.slate, fontFace: F.body, fontSize: 15, italic: true, align: "center", margin: 0 });
  footer(s);
  s.addNotes("Connect to Session 8: they've done this with prose, and code review is the same social skill. The fourth row is the one that got modeled in the demo: every comment answered, one with a fix and one with reasons. On a small team this is also self-protection, because review comments are how resentment starts if they're careless. Keep this to three minutes; the exercise is next and it's where the register gets practiced.");

  // 23 Exercise
  s = mk(); s.background = { color: C.white };
  header(s, "Practice · in pairs, 5 min", "Review this change: write two comments");
  s.addText("Pull request: Show only the items in one bin", { x: 0.6, y: 1.85, w: 12.1, h: 0.45, color: C.slate, fontFace: F.body, fontSize: 16, bold: true, margin: 0 });
  codeBlock(s, 0.6, 2.35, 7.9, 3.35, [
    ["+def get(request):", C.codeAdd],
    ["+    l = Item.objects.all()", C.codeAdd],
    ["+    result = []", C.codeAdd],
    ["+    # loop over the items", C.codeAdd],
    ["+    for i in l:", C.codeAdd],
    ["+        if i.bin.label == request.GET.get(\"bin\"):", C.codeAdd],
    ["+            result.append(i)", C.codeAdd],
    ["+    return render(request, \"catalog/item_list.html\",", C.codeAdd],
    ["+                  {\"items\": result})", C.codeAdd]
  ]);
  card(s, 8.75, 2.35, 3.95, 3.35, C.cardBg);
  s.addText([
    { text: "Three problems are planted: one in the design, one in the naming, and one nit.", options: { breakLine: true, paraSpaceAfter: 12 } },
    { text: "Write two comments the way you'd want to receive them.", options: { bold: true } }
  ], { x: 9.05, y: 2.5, w: 3.4, h: 3.05, color: C.ink, fontFace: F.body, fontSize: 16, valign: "top", margin: 0, lineSpacingMultiple: 1.06 });
  card(s, 0.6, 5.95, 12.1, 0.8, C.amberBg);
  s.addText("Order: design → functionality → complexity → tests → naming → comments.   Ask; don't rule.   Mark nits.", { x: 0.95, y: 5.95, w: 11.4, h: 0.8, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("Five minutes in pairs, then the debrief slide. It's Prop Loft code, so they know the model: an Item belongs to a Bin. The design problem is the one to push them toward: the loop loads every item in the catalog and then fetches each item's bin one at a time, when the database could do the filtering in one query. Naming: get, l, i, result. The nit: the comment restates the next line. Circulate and read comments for register as much as for content.");

  // 24 Debrief
  s = mk(); s.background = { color: C.white };
  header(s, "Debrief", "Three comments, in the register");
  const debrief = [
    ["Design", "This loads every item, then looks up each item's bin one at a time, so it gets slower as the catalog grows. Could we filter in the query instead, with Item.objects.filter(bin__label=label)?", C.teal],
    ["Naming", "With get, l, and i, I have to read the whole function to know what each holds. Maybe items_in_bin and item?", C.tealDk],
    ["Nit", "nit: this comment says what the next line already says. Fine to drop it.", C.slate]
  ];
  for (let i = 0; i < 3; i++) {
    const y = 1.95 + i * 1.55;
    card(s, 0.6, y, 12.1, 1.4, i === 0 ? C.navy : C.cardBg, REVEAL(i + 1));
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.85, y: y + 0.42, w: 1.55, h: 0.56, fill: { color: i === 0 ? C.amber : debrief[i][2] }, line: { type: "none" }, rectRadius: 0.08, ...REVEAL(i + 1) });
    s.addText(debrief[i][0], { x: 0.85, y: y + 0.42, w: 1.55, h: 0.56, color: i === 0 ? C.navy : C.white, fontFace: F.body, fontSize: 15, bold: true, align: "center", valign: "middle", margin: 0, ...REVEAL(i + 1) });
    s.addText(debrief[i][1], { x: 2.7, y, w: 9.75, h: 1.4, color: i === 0 ? C.white : C.ink, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0, lineSpacingMultiple: 1.04, ...REVEAL(i + 1) });
  }
  s.addText("Each one: what I see, why it matters, a question or suggestion.", { x: 0.6, y: 6.55, w: 12.1, h: 0.4, color: C.slate, fontFace: F.body, fontSize: 15, italic: true, align: "center", margin: 0, ...REVEAL(3) });
  footer(s);
  s.addNotes("Take a pair's comment for each problem before clicking to the model. The design comment is the important one; if nobody found it, say so plainly and explain it, because it's a problem students will write constantly in Django: fetching everything and filtering in Python. Point out the shape all three share: what I see, why it matters, a question or a suggestion. That's the register. Note the nit is labeled and optional; the author can decline it without a discussion.");

  // 25 Wednesday's decisions
  s = mk(); s.background = { color: C.white };
  header(s, "Wednesday: your project's standards", "Decide these for your project, and write down why");
  const pol = [
    ["Branch names", "type/short-description", "Scannable branch lists"],
    ["Commit messages", "The seven rules", "A readable log, and free release notes"],
    ["PR size", "One logical change", "Big PRs get skimmed, not reviewed"],
    ["Review", "One approval from a non-author", "A second reader is the point"],
    ["Merge strategy", "Squash and merge", "Linear main; the PR keeps the steps"],
    ["\"Done\"", "Reviewed, merged, runs, docs updated", "Not \"done on my machine\""]
  ];
  s.addText("Decision", { x: 0.95, y: 1.85, w: 2.8, h: 0.35, color: C.slate, fontFace: F.body, fontSize: 14, bold: true, margin: 0 });
  s.addText("Suggested default", { x: 3.85, y: 1.85, w: 4.2, h: 0.35, color: C.slate, fontFace: F.body, fontSize: 14, bold: true, margin: 0 });
  s.addText("Why", { x: 8.2, y: 1.85, w: 4.3, h: 0.35, color: C.slate, fontFace: F.body, fontSize: 14, bold: true, margin: 0 });
  for (let i = 0; i < pol.length; i++) {
    const y = 2.25 + i * 0.6;
    card(s, 0.6, y, 12.1, 0.52, i % 2 ? C.white : C.cardBg);
    s.addText(pol[i][0], { x: 0.95, y, w: 2.8, h: 0.52, color: C.ink, fontFace: F.body, fontSize: 16, bold: true, valign: "middle", margin: 0 });
    s.addText(pol[i][1], { x: 3.85, y, w: 4.2, h: 0.52, color: C.tealDk, fontFace: F.body, fontSize: 16, bold: true, valign: "middle", margin: 0 });
    s.addText(pol[i][2], { x: 8.2, y, w: 4.3, h: 0.52, color: C.slate, fontFace: F.body, fontSize: 15, valign: "middle", margin: 0 });
  }
  card(s, 0.6, 6.0, 12.1, 0.8, C.amber);
  s.addText("Suggestions, not rules: every one is your project's call. Choose differently, and write down why. It becomes CONTRIBUTING.md.", { x: 0.95, y: 6.0, w: 11.4, h: 0.8, color: C.navy, fontFace: F.body, fontSize: 15.5, bold: true, valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("Eight minutes. This is Wednesday's agenda: come ready to decide. Walk the six rows, a reason each. The defaults are suggestions; say plainly that a project choosing merge commits over squash, or two approvals instead of one, is fine, as long as it writes down the rationale. Solo students: the review row means their review partner. These decisions get written in the lab and formalized as CONTRIBUTING.md in Week 8, where a stranger will read them.");

  // 26 Wrap
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: -1.3, y: 5.2, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaCodeBranch, 0.9, 1.15, 0.85, C.amber, C.navy);
  s.addText("The loop, the log, and the review are all governance, and you own it now.", { x: 0.9, y: 2.15, w: 11.9, h: 1.05, color: C.white, fontFace: F.head, fontSize: 27, bold: true, italic: true, margin: 0, lineSpacingMultiple: 1.06 });
  s.addText("BEFORE WEDNESDAY, OCT 21", { x: 0.92, y: 3.4, w: 11, h: 0.35, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText([
    { text: "Wednesday is a lab: bring a charged laptop with your dev environment running", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "Make sure you can push to your project's repository, not just clone it", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "Come ready to decide your project's six git standards", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "Finish your design document revisions before class, not during the lab", options: { bullet: { indent: 16 } } }
  ], { x: 0.95, y: 3.85, w: 11.7, h: 1.95, color: "CBD8E6", fontFace: F.body, fontSize: 17, valign: "top", margin: 0 });
  card(s, 0.6, 5.95, 12.1, 0.8, C.amber);
  s.addText("CP5 (revised design doc) and CP6 (the git lab, done in class) are both due end of day Wednesday.", { x: 0.9, y: 5.95, w: 11.5, h: 0.8, color: C.navy, fontFace: F.body, fontSize: 15.5, bold: true, align: "center", valign: "middle", margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("Close in a few minutes. Say the one-liner, then the logistics, which are Wednesday's prep check in advance: laptop, push access, the six decisions, design doc nearly done. Push access is the one that costs a teammate their lab if it's missing, so ask anyone who hasn't pushed to their repo yet to do it tonight. Both CP5 and CP6 are due end of day Wednesday; CP6 happens in the lab itself. The Session 14 page has the details.");

  const OUT = "Session13-GitForMaintainers.pptx";
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
