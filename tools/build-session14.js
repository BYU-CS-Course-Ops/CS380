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
  code: "E8EEF3", codeDim: "9FB4C7", codeAdd: "9FE0B5", codeDel: "F2A99B"
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
pres.title = "CS 301R — Session 14 — Git Workflow Lab";

let PAGE = 0;
function mk() { PAGE++; return pres.addSlide(); }
function footer(slide, col) {
  const c = col || C.slate;
  slide.addText("CS 301R · Session 14 · Git Workflow Lab", { x: 7.3, y: 7.04, w: 5.4, h: 0.3, align: "right", color: c, fontFace: F.body, fontSize: 10, margin: 0 });
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

// A block of code on a dark card. `lines` is an array of strings, or [text, color]
// pairs to color a line (comments dimmed, conflict markers highlighted).
function codeBlock(s, x, y, w, h, lines, extra, fontSize) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: C.navy2 }, line: { type: "none" }, rectRadius: 0.08, shadow: mkShadow(), ...extra });
  const runs = lines.map((ln, i) => {
    const [text, color] = Array.isArray(ln) ? ln : [ln, C.code];
    return { text: text === "" ? " " : text, options: { color, breakLine: i < lines.length - 1 } };
  });
  s.addText(runs, { x: x + 0.3, y: y + 0.18, w: w - 0.6, h: h - 0.36, fontFace: F.mono, fontSize: fontSize || 15, valign: "top", margin: 0, lineSpacingMultiple: 1.05, ...extra });
}
// A "Part N" tag in the top-right corner, so a student glancing up knows where the room is.
function partTag(s, label) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 10.55, y: 0.38, w: 2.15, h: 0.46, fill: { color: C.navy }, line: { type: "none" }, rectRadius: 0.08 });
  s.addText(label, { x: 10.55, y: 0.38, w: 2.15, h: 0.46, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, align: "center", valign: "middle", margin: 0 });
}

async function build() {
  let s;

  // 1 Title
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: 10.9, y: -1.4, w: 4.2, h: 4.2, fill: { color: "1C3252" } });
  s.addShape(pres.shapes.OVAL, { x: 12.0, y: 5.1, w: 3.0, h: 3.0, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaCodeBranch, 0.9, 1.45, 1.0, C.amber, C.navy);
  s.addText("CS 301R · SOFTWARE ENGINEERING STUDIO I", { x: 0.92, y: 2.75, w: 11, h: 0.35, color: "9FB4C7", fontFace: F.body, fontSize: 15, bold: true, charSpacing: 2, margin: 0 });
  s.addText("Run the Loop, Set Your Standards", { x: 0.9, y: 3.15, w: 12.1, h: 1.3, color: C.white, fontFace: F.head, fontSize: 42, bold: true, margin: 0 });
  s.addText([
    { text: "Session 14 — git workflow lab", options: { color: C.amber, bold: true, breakLine: true } },
    { text: "Wednesday, October 21, 2026", options: { color: "9FB4C7" } }
  ], { x: 0.92, y: 4.7, w: 11, h: 0.9, fontFace: F.body, fontSize: 19, margin: 0, lineSpacingMultiple: 1.2 });
  s.addNotes("A lab day: the slides are signposts, not a lecture. Put slide 2 (the prep check) up as students walk in and leave the title for the deck file only. Everything students need is on the Canvas page Git Workflow Lab Guide, linked from the Session 14 page; the slides mirror its four parts so a student who glances up knows where the room is. Before class: confirm every solo founder knows their review partner, and have the CP6 rubric open in a tab.");

  // 2 Prep check
  s = mk(); s.background = { color: C.white };
  header(s, "Prep check · hands up", "Before we start: four yeses");
  const prep = [
    [FA.FaLaptop, "Laptop charged, dev environment runs", "You'll be in a terminal for an hour."],
    [FA.FaUpload, "You can push to your project's repo", "Not just clone. Solo: your review partner is added as a collaborator."],
    [FA.FaListUl, "Leanings on the six standards", "Branch names, commits, PR size, review, merge, \"done.\" Part 4 of the guide."],
    [FA.FaFileAlt, "Design doc revisions done or nearly", "It's due end of today. Lab time isn't revision time."]
  ];
  for (let i = 0; i < prep.length; i++) {
    const y = 1.95 + i * 1.05;
    card(s, 0.6, y, 12.1, 0.92, i === 1 ? C.amberBg : C.cardBg);
    await iconCircle(s, prep[i][0], 0.88, y + 0.14, 0.64, i === 1 ? C.amber : C.teal, i === 1 ? C.navy : "FFFFFF");
    s.addText(prep[i][1], { x: 1.75, y, w: 4.9, h: 0.92, color: C.ink, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
    s.addText(prep[i][2], { x: 6.75, y, w: 5.75, h: 0.92, color: C.slate, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0 });
  }
  s.addText("No push access? Fix it in the next five minutes, not at minute forty. A blocked author blocks their reviewer too.", { x: 0.6, y: 6.25, w: 12.1, h: 0.5, color: C.coral, fontFace: F.body, fontSize: 16, bold: true, italic: true, align: "center", valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("About 90 seconds, up as they walk in. Hands up for each item; a yes/no each. Item 2 is the one that matters: anyone who can't push gets fixed first, by you or a TA, right now. The guide's Before-you-start section has `git push --dry-run` to check it. Solo founders whose partner isn't a collaborator yet can add them in a minute. Anyone still blocked pairs with their reviewer for the solo legs and runs their own loop after class. Item 4 is a nudge, not a gate.");

  // 3 Today
  s = mk(); s.background = { color: C.white };
  header(s, "Today", "Everyone drives the loop, once, for real");
  const plan = [
    [FA.FaCodeBranch, "Part 1 · Your change: issue → branch → commit → pull request", "25 min"],
    [FA.FaComments, "Part 2 · The second reader: review, respond, merge", "15 min"],
    [FA.FaRandom, "Part 3 · A merge conflict, on purpose", "12 min"],
    [FA.FaClipboardCheck, "Part 4 · Your project's git standards, written and merged", "12 min"]
  ];
  for (let i = 0; i < plan.length; i++) {
    const y = 1.95 + i * 0.93;
    card(s, 0.6, y, 12.1, 0.82, C.cardBg);
    await iconCircle(s, plan[i][0], 0.88, y + 0.11, 0.6, C.teal, "FFFFFF");
    s.addText(plan[i][1], { x: 1.68, y, w: 8.9, h: 0.82, color: C.ink, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
    s.addText(plan[i][2], { x: 10.6, y, w: 1.8, h: 0.82, color: C.slate, fontFace: F.body, fontSize: 16, bold: true, align: "right", valign: "middle", margin: 0 });
  }
  card(s, 0.6, 5.8, 12.1, 0.95, C.navy);
  s.addText([
    { text: "Open the lab guide now: ", options: { color: C.amber, bold: true } },
    { text: "Canvas → Session 14 → Git Workflow Lab Guide. Every command is there to copy.", options: { color: C.white } }
  ], { x: 0.95, y: 5.8, w: 11.4, h: 0.95, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("One minute. The changes are trivial on purpose: when the change takes two minutes, all the attention goes to the process, and the process is what's graded. Say plainly that CP6 is read from the repository, so everything they do today is the submission. Get every laptop onto the lab guide before moving on; the slides that follow are signposts for the room, and the guide is what they work from.");

  // 4 Who does what
  s = mk(); s.background = { color: C.white };
  header(s, "Who does what", "Settle this out loud before anyone opens a pull request");
  const roles = [
    ["On a team", C.teal, [
      ["Each member", "one starter task, a different one each"],
      ["Reviews", "round-robin: everyone reviews exactly one teammate's PR"],
      ["The conflict", "two members play A and B; the rest watch"],
      ["The standards", "the whole team decides; one member opens the PR"]
    ]],
    ["Solo", C.amber, [
      ["You", "one starter task (a second if you finish early)"],
      ["Reviews", "your review partner reviews yours; you review theirs"],
      ["The conflict", "you are both A and B"],
      ["The standards", "you decide; your partner reviews the PR"]
    ]]
  ];
  for (let c = 0; c < 2; c++) {
    const x = 0.6 + c * 6.15;
    card(s, x, 1.95, 5.95, 4.75, C.cardBg);
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.95, w: 5.95, h: 0.1, fill: { color: roles[c][1] }, line: { type: "none" } });
    s.addText(roles[c][0], { x: x + 0.35, y: 2.2, w: 5.3, h: 0.5, color: C.ink, fontFace: F.head, fontSize: 21, bold: true, margin: 0 });
    for (let i = 0; i < 4; i++) {
      const y = 2.85 + i * 0.93;
      s.addText(roles[c][2][i][0], { x: x + 0.35, y, w: 5.3, h: 0.34, color: c ? C.ink : C.tealDk, fontFace: F.body, fontSize: 16, bold: true, margin: 0 });
      s.addText(roles[c][2][i][1], { x: x + 0.35, y: y + 0.34, w: 5.3, h: 0.5, color: C.ink, fontFace: F.body, fontSize: 16, valign: "top", margin: 0 });
    }
  }
  footer(s);
  s.addNotes("One minute. The common failure is two people both waiting to be told who reviews whom. Have each team say its round-robin order out loud, and have each solo founder point at their partner. Every pull request merged today needs an approval from someone who didn't write it: that's the lab's rule, because the review is graded, not necessarily the project's rule. Projects set their own in Part 4.");

  // 5 Part 1 · starter tasks
  s = mk(); s.background = { color: C.white };
  header(s, "Part 1 · Pick a starter task", "Small, real, and something your repo actually needs");
  partTag(s, "Part 1 · 25 min");
  const tasks = [
    ["A", "Point readers to the design", "README: link docs/design.md"],
    ["B", "Say what the license means", "README: a License section"],
    ["C", "Keep secrets out", ".gitignore: .env, editor, OS files"],
    ["D", "Fix what's wrong in the README", "a typo, dead link, stale sentence"],
    ["E", "Map the docs folder", "docs/README.md: what's in docs/"]
  ];
  for (let i = 0; i < tasks.length; i++) {
    const y = 1.95 + i * 0.74;
    card(s, 0.6, y, 8.0, 0.64, C.cardBg);
    s.addText(tasks[i][0], { x: 0.75, y, w: 0.55, h: 0.64, color: C.teal, fontFace: F.head, fontSize: 22, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(tasks[i][1], { x: 1.4, y, w: 3.3, h: 0.64, color: C.ink, fontFace: F.body, fontSize: 16.5, bold: true, valign: "middle", margin: 0 });
    s.addText(tasks[i][2], { x: 4.75, y, w: 3.75, h: 0.64, color: C.slate, fontFace: F.body, fontSize: 15, valign: "middle", margin: 0 });
  }
  card(s, 8.85, 1.95, 3.85, 3.6, C.weakBg);
  s.addText("Hands off today", { x: 9.15, y: 2.1, w: 3.3, h: 0.45, color: C.coral, fontFace: F.head, fontSize: 19, bold: true, margin: 0 });
  s.addText([
    { text: "docs/design.md", options: { bold: true, breakLine: true } },
    { text: "Your revisions are their own work, due today.", options: { breakLine: true, paraSpaceAfter: 10 } },
    { text: "The README status line", options: { bold: true, breakLine: true } },
    { text: "Part 3's conflict needs it untouched." }
  ], { x: 9.15, y: 2.65, w: 3.3, h: 2.75, color: C.ink, fontFace: F.body, fontSize: 16, valign: "top", margin: 0 });
  s.addText("On a team, each member picks a different task. Done early? Take a second one around the loop.", { x: 0.6, y: 5.85, w: 12.1, h: 0.8, color: C.slate, fontFace: F.body, fontSize: 16, italic: true, valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("Under a minute; the guide has the details for each. Every task works from what's already in the repo: README, LICENSE, .gitignore, and the design doc. Stress the two hands-off items. Editing design.md today collides with their own CP5 revisions, and anyone who touches the status line will break the conflict recipe in Part 3. If a team has more members than tasks, two can take task D on different parts of the README.");

  // 6 Part 1 · file the issue first
  s = mk(); s.background = { color: C.white };
  header(s, "Part 1 · Step 2", "Before you change anything, say what you're going to change");
  partTag(s, "Part 1 · 25 min");
  await iconCircle(s, FA.FaExclamationCircle, 0.75, 2.05, 0.75, C.teal, "FFFFFF");
  s.addText("File an issue for your task", { x: 1.75, y: 2.05, w: 10.8, h: 0.75, color: C.ink, fontFace: F.head, fontSize: 24, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "Title: ", options: { bold: true, color: C.tealDk } }, { text: "what needs doing, in a few words", options: { breakLine: true } },
    { text: "Description: ", options: { bold: true, color: C.tealDk } }, { text: "what's wrong or missing now, and why it matters", options: { breakLine: true } },
    { text: "Assignee: ", options: { bold: true, color: C.tealDk } }, { text: "yourself, so nobody else picks it up", options: { breakLine: true } },
    { text: "Note the number. ", options: { bold: true, color: C.tealDk } }, { text: "Your pull request will close it." }
  ], { x: 1.75, y: 2.95, w: 10.8, h: 1.75, color: C.ink, fontFace: F.body, fontSize: 17, valign: "top", margin: 0, paraSpaceAfter: 6 });
  card(s, 0.6, 5.0, 12.1, 1.7, C.amberBg, REVEAL(1));
  s.addText([
    { text: "No template. Write it however you think a good issue for your project should read.", options: { bold: true, breakLine: true } },
    { text: "How to write a good issue is Monday's topic, and the ones you file today are what we'll hold up against it." }
  ], { x: 0.95, y: 5.0, w: 11.4, h: 1.7, color: C.navy, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, paraSpaceAfter: 6, ...REVEAL(1) });
  footer(s);
  s.addNotes("Thirty seconds. Why an issue first: on a real project, the issue announces work before anyone starts, so two people don't fix the same thing, and it records why the change was wanted. Click once for the amber card, and say it plainly: you are not teaching issue anatomy today. Let them write it cold. Monday (Session 15 §4) you'll pull up one or two of these and hold them against the anatomy, and each project rereads its own.");

  // 7 Part 1 · the commands
  s = mk(); s.background = { color: C.white };
  header(s, "Part 1 · Steps 3–7", "Branch, commit, push, open the pull request");
  partTag(s, "Part 1 · 25 min");
  codeBlock(s, 0.6, 1.95, 6.3, 4.75, [
    "git switch main",
    "git pull",
    "git switch -c docs/link-design-doc",
    "",
    ["# make the change, then look at it", C.codeDim],
    "git status",
    "git diff",
    "",
    "git add README.md",
    ["git commit        # no -m: write a body", C.code],
    "git log -1",
    "",
    "git push -u origin docs/link-design-doc"
  ], {}, 15);
  card(s, 7.15, 1.95, 5.55, 4.75, C.cardBg);
  s.addText("The pull request description", { x: 7.45, y: 2.1, w: 5.0, h: 0.45, color: C.ink, fontFace: F.head, fontSize: 19, bold: true, margin: 0 });
  s.addText([
    { text: "Problem", options: { bold: true, color: C.tealDk, breakLine: true } },
    { text: "what's wrong or missing now", options: { breakLine: true, paraSpaceAfter: 8 } },
    { text: "Approach", options: { bold: true, color: C.tealDk, breakLine: true } },
    { text: "what this change does, and doesn't", options: { breakLine: true, paraSpaceAfter: 8 } },
    { text: "What to look at first", options: { bold: true, color: C.tealDk, breakLine: true } },
    { text: "where the reviewer should start", options: { breakLine: true, paraSpaceAfter: 8 } },
    { text: "Closes #3", options: { bold: true, fontFace: F.mono, color: C.ink, breakLine: true } },
    { text: "links the issue; the merge closes it", options: {} }
  ], { x: 7.45, y: 2.65, w: 5.0, h: 3.0, color: C.slate, fontFace: F.body, fontSize: 16, valign: "top", margin: 0 });
  s.addText("Then request your reviewer: the gear next to Reviewers.", { x: 7.45, y: 5.85, w: 5.0, h: 0.7, color: C.ink, fontFace: F.body, fontSize: 16, bold: true, valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("Leave this up for most of Part 1 and circulate. Spot-critique commit messages live, against the seven rules: run the 'If applied, this commit will ___' test out loud at a few laptops. Watch for -m one-liners with no body; the guide shows how to amend before pushing. Watch for students on main who forgot to branch; the guide's troubleshooting section covers it. By minute 25 every author should have requested a reviewer.");

  // 8 Part 2 · review and respond
  s = mk(); s.background = { color: C.white };
  header(s, "Part 2 · The second reader", "Review, respond, and only then merge");
  partTag(s, "Part 2 · 15 min");
  const sides = [
    ["As the reviewer", C.teal, [
      "Files changed → the blue + on a line → Start a review",
      "At least two comments, one substantive; mark nitpicks \"nit:\"",
      "What I see · why it matters · a question or suggestion",
      "Finish: Approve, Request changes, or Comment"
    ]],
    ["As the author", C.amber, [
      "Respond to every comment",
      "Agree → fix it on the same branch, push, reply, resolve",
      "Disagree → say why, politely",
      "Good point, different change → open an issue, link it"
    ]]
  ];
  for (let c = 0; c < 2; c++) {
    const x = 0.6 + c * 6.15;
    card(s, x, 1.95, 5.95, 3.45, C.cardBg);
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.95, w: 5.95, h: 0.1, fill: { color: sides[c][1] }, line: { type: "none" } });
    s.addText(sides[c][0], { x: x + 0.35, y: 2.2, w: 5.3, h: 0.5, color: C.ink, fontFace: F.head, fontSize: 21, bold: true, margin: 0 });
    s.addText(sides[c][2].map((t, i) => ({ text: t, options: { bullet: { indent: 16 }, breakLine: i < 3, paraSpaceAfter: 8 } })),
      { x: x + 0.35, y: 2.8, w: 5.3, h: 2.5, color: C.ink, fontFace: F.body, fontSize: 17, valign: "top", margin: 0 });
  }
  card(s, 0.6, 5.65, 12.1, 0.95, C.navy);
  s.addText("Today's rule: nothing merges without an approval from someone who didn't write it.", { x: 0.95, y: 5.7, w: 11.4, h: 0.85, color: C.white, fontFace: F.body, fontSize: 17, bold: true, align: "center", valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("Fifteen minutes on this slide and the next. The rubber stamp is the failure to watch for: 'LGTM!' alone scores Developing at best, so push reviewers to find something real, and a question counts. Authors: every comment gets an answer, even 'fixed in 3f2a91c.' After a fix, the author re-requests review. The approval rule on the bottom card is the lab's rule because the review is graded; projects set their own in Part 4.");

  // 9 Part 2 · merge
  s = mk(); s.background = { color: C.white };
  header(s, "Part 2 · Merge", "Squash, write the message the history keeps, clean up");
  partTag(s, "Part 2 · 15 min");
  const steps = [
    ["Squash and merge", "the suggested default; your project decides in Part 4"],
    ["Edit the message", "PR title as subject; a short why; cut the reviewer-only parts"],
    ["Delete branch", "and check that the issue closed itself"]
  ];
  for (let i = 0; i < steps.length; i++) {
    const y = 1.95 + i * 1.12;
    card(s, 0.6, y, 6.0, 1.0, C.cardBg);
    s.addText(String(i + 1), { x: 0.75, y, w: 0.6, h: 1.0, color: C.teal, fontFace: F.head, fontSize: 24, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText([
      { text: steps[i][0], options: { bold: true, color: C.ink, breakLine: true } },
      { text: steps[i][1], options: { color: C.slate, fontSize: 15 } }
    ], { x: 1.45, y, w: 5.0, h: 1.0, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0 });
  }
  codeBlock(s, 6.85, 1.95, 5.85, 2.35, [
    ["# back on your machine", C.codeDim],
    "git switch main",
    "git pull",
    "git log --oneline -5",
    "git branch -D docs/link-design-doc"
  ], {}, 16);
  s.addText("Why -D? After a squash, main doesn't hold your branch's commits, so git can't tell it merged.", { x: 6.85, y: 4.5, w: 5.85, h: 0.85, color: C.slate, fontFace: F.body, fontSize: 15, italic: true, valign: "top", margin: 0 });
  card(s, 0.6, 5.4, 6.0, 1.3, C.amberBg);
  s.addText("Your branch's commits, the review, and every reply stay in the pull request. That's where the evidence lives.", { x: 0.9, y: 5.4, w: 5.5, h: 1.3, color: C.navy, fontFace: F.body, fontSize: 16, bold: true, valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("Show the squash-message edit once on the projector if several students reach it together: GitHub prefills the message, and the move is to keep the title as subject and a short why, and delete what was only for the reviewer. The amber card answers the question someone will ask: does squashing destroy what's graded? No. The commits and the review stay in the pull request, and that's where CP6 grading reads them. Make sure each student sees their issue closed.");

  // 10 Part 3 · the recipe
  s = mk(); s.background = { color: C.white };
  header(s, "Part 3 · A merge conflict, on purpose", "Two changes to the same line: the README status line");
  partTag(s, "Part 3 · 12 min");
  s.addText("Both branch from the same main, before either merges.", { x: 0.6, y: 1.85, w: 12.1, h: 0.45, color: C.coral, fontFace: F.body, fontSize: 18, bold: true, margin: 0 });
  const ab = [
    ["A", "docs/status-design-complete", "**Status:** Design complete; building the first version."],
    ["B", "docs/status-issue-link", "**Status:** Design in progress. Questions or ideas? [Open an issue](../../issues)."]
  ];
  for (let i = 0; i < 2; i++) {
    const y = 2.45 + i * 1.6;
    card(s, 0.6, y, 12.1, 1.45, C.cardBg);
    s.addShape(pres.shapes.OVAL, { x: 0.85, y: y + 0.375, w: 0.7, h: 0.7, fill: { color: i ? C.amber : C.teal } });
    s.addText(ab[i][0], { x: 0.85, y: y + 0.375, w: 0.7, h: 0.7, color: i ? C.navy : C.white, fontFace: F.head, fontSize: 24, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText([
      { text: ab[i][0] + " branches ", options: { bold: true, color: C.ink } },
      { text: ab[i][1], options: { fontFace: F.mono, color: C.tealDk, bold: true } }
    ], { x: 1.8, y: y + 0.15, w: 10.7, h: 0.5, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0 });
    s.addText(ab[i][2], { x: 1.8, y: y + 0.7, w: 10.7, h: 0.55, color: C.ink, fontFace: F.mono, fontSize: 15, valign: "middle", margin: 0 });
  }
  card(s, 0.6, 5.8, 12.1, 0.95, C.navy);
  s.addText("Both push and open pull requests. Merge A's. Now B's says: \"This branch has conflicts.\"", { x: 0.95, y: 5.8, w: 11.4, h: 0.95, color: C.white, fontFace: F.body, fontSize: 17, bold: true, align: "center", valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("Twelve minutes for the recipe, the resolution, and the debrief. Teams pick two members; solo founders play both A and B, and must create B's branch from main, not from A's branch. The one way this fails is ordering: if A merges before B branches, there's no conflict. If a README has no status line, use the first sentence of its description; all that matters is the same line. A's PR still needs a quick approval before it merges.");

  // 11 Part 3 · resolve
  s = mk(); s.background = { color: C.white };
  header(s, "Part 3 · B resolves it", "Read both sides. Keep what each change was for.");
  partTag(s, "Part 3 · 12 min");
  codeBlock(s, 0.6, 1.95, 4.6, 2.2, [
    "git switch docs/status-issue-link",
    "git fetch origin",
    "git merge origin/main",
    "git status"
  ], {}, 15);
  codeBlock(s, 5.45, 1.95, 7.25, 2.2, [
    ["<<<<<<< HEAD", C.amber],
    "**Status:** Design in progress. Questions",
    "or ideas? [Open an issue](../../issues).",
    ["=======", C.amber],
    "**Status:** Design complete; building the first version.",
    [">>>>>>> origin/main", C.amber]
  ], {}, 14.5);
  card(s, 0.6, 4.3, 12.1, 0.95, C.strongBg, REVEAL(1));
  s.addText([
    { text: "Resolved:  ", options: { bold: true, color: C.green, fontFace: F.body } },
    { text: "**Status:** Design complete; building the first version. Questions or ideas? [Open an issue](../../issues).", options: { color: C.ink, fontFace: F.mono, fontSize: 14.5 } }
  ], { x: 0.9, y: 4.3, w: 11.5, h: 0.95, fontSize: 16, valign: "middle", margin: 0, ...REVEAL(1) });
  codeBlock(s, 0.6, 5.4, 5.6, 1.4, [
    ["# delete all three markers, save", C.codeDim],
    "git add README.md",
    "git commit && git push"
  ], REVEAL(1), 15);
  s.addText([
    { text: "Merge, not rebase, today: the merge commit is the evidence.", options: { breakLine: true, paraSpaceAfter: 6 } },
    { text: "Stuck? ", options: {} },
    { text: "git\u00A0merge\u00A0--abort", options: { fontFace: F.mono, italic: false, color: C.ink } },
    { text: " starts over.", options: {} }
  ], { x: 6.45, y: 5.4, w: 6.25, h: 1.4, color: C.slate, fontFace: F.body, fontSize: 15.5, italic: true, valign: "middle", margin: 0, ...REVEAL(1) });
  footer(s);
  s.addNotes("Before the click, ask the room what the right resolution is. The reflex is to keep HEAD, B's own version, which silently throws away A's news. Click to show the resolution that keeps both. On the command line, not GitHub's web editor: they need the version that works when the conflict is too big for the browser. Rebase is a fine project choice later, but it needs a force-push and erases the merge commit, so not today.");

  // 12 Part 3 · debrief
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: 11.4, y: -1.3, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaRandom, 0.9, 1.3, 0.85, C.amber, C.navy);
  s.addText("What made that conflict easy?", { x: 0.9, y: 2.4, w: 11.9, h: 0.9, color: C.white, fontFace: F.head, fontSize: 32, bold: true, margin: 0 });
  s.addText("Talk it over with your team, or with your review partner.", { x: 0.92, y: 3.3, w: 11.5, h: 0.5, color: "CBD8E6", fontFace: F.body, fontSize: 18, margin: 0 });
  card(s, 0.6, 4.4, 12.1, 1.75, C.navy2, REVEAL(1));
  s.addText([
    { text: "Each change was small, did one thing, and said why.", options: { bold: true, color: C.amber, breakLine: true } },
    { text: "Conflicts are cheap when changes are small and the people making them communicate. That's the whole lesson, and it's why the loop insists on small pull requests.", options: { color: C.white } }
  ], { x: 0.95, y: 4.4, w: 11.4, h: 1.75, fontFace: F.body, fontSize: 18, valign: "middle", margin: 0, paraSpaceAfter: 6, ...REVEAL(1) });
  footer(s, "7E92A8");
  s.addNotes("Two minutes, inside Part 3's twelve. Let a couple of projects answer before the click: small change, one clear purpose each side, a message saying why. Click and land it. Then connect it forward: the conflicts that hurt are big branches that lived for two weeks and did five things. The build phase starts soon, and the habit that prevents those is the one they're practicing now: small pull requests, merged often.");

  // 13 Part 4 · standards
  s = mk(); s.background = { color: C.white };
  header(s, "Part 4 · Your project's git standards", "Decide, write down why, and ship it through the loop");
  partTag(s, "Part 4 · 12 min");
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
    const y = 2.25 + i * 0.58;
    card(s, 0.6, y, 12.1, 0.5, i % 2 ? C.white : C.cardBg);
    s.addText(pol[i][0], { x: 0.95, y, w: 2.8, h: 0.5, color: C.ink, fontFace: F.body, fontSize: 16, bold: true, valign: "middle", margin: 0 });
    s.addText(pol[i][1], { x: 3.85, y, w: 4.2, h: 0.5, color: C.tealDk, fontFace: F.body, fontSize: 16, bold: true, valign: "middle", margin: 0 });
    s.addText(pol[i][2], { x: 8.2, y, w: 4.3, h: 0.5, color: C.slate, fontFace: F.body, fontSize: 15, valign: "middle", margin: 0 });
  }
  card(s, 0.6, 5.85, 12.1, 0.9, C.amber);
  s.addText([
    { text: "docs/git-standards.md", options: { fontFace: F.mono, bold: true } },
    { text: " · one line of why per decision · a branch, a PR, a review · and merge it the way it says.", options: { bold: true } }
  ], { x: 0.95, y: 5.85, w: 11.4, h: 0.9, color: C.navy, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("Monday's table again; the guide's Part 4 adds alternatives and a file skeleton. Defaults are suggestions: a project choosing merge commits or two approvals is fine with a reason written down. Push for the reason line on every decision. The standards go in through the loop like any change, and the pull request must follow the rules it adds. Before anyone leaves, skim each project's file and flag anything unworkable, like a required approval on a solo repo with no partner access.");

  // 14 Before you leave
  s = mk(); s.background = { color: C.white };
  header(s, "Before you leave", "Collect your links: the repository is the submission");
  const links = [
    "The issue you filed",
    "Your pull request, merged, every comment answered",
    "The review you wrote on someone else's pull request",
    "The conflict-resolving pull request (per project)",
    "docs/git-standards.md on main (per project)"
  ];
  for (let i = 0; i < links.length; i++) {
    const y = 1.95 + i * 0.7;
    card(s, 0.6, y, 7.6, 0.6, C.cardBg);
    await iconCircle(s, FA.FaCheck, 0.75, y + 0.1, 0.4, C.green, "FFFFFF");
    s.addText(links[i], { x: 1.35, y, w: 6.7, h: 0.6, color: C.ink, fontFace: F.body, fontSize: 16.5, valign: "middle", margin: 0 });
  }
  card(s, 8.45, 1.95, 4.25, 2.55, C.navy);
  s.addText("DUE END OF DAY TODAY", { x: 8.75, y: 2.15, w: 3.7, h: 0.4, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText([
    { text: "CP6 · Git Workflow Lab", options: { bold: true, color: C.white, breakLine: true } },
    { text: "the repo URL and these links", options: { color: "CFE0E9", breakLine: true, paraSpaceAfter: 14 } },
    { text: "CP5 · Design Document", options: { bold: true, color: C.white, breakLine: true } },
    { text: "the revised version, merged", options: { color: "CFE0E9" } }
  ], { x: 8.75, y: 2.65, w: 3.7, h: 1.75, fontFace: F.body, fontSize: 17, valign: "top", margin: 0 });
  s.addText("Keep these links: a good pull request description and review comment are portfolio material.", { x: 0.6, y: 5.75, w: 12.1, h: 0.8, color: C.slate, fontFace: F.body, fontSize: 16, italic: true, valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("Three minutes of the wrap. Everything is graded from the repository, so the submission is just the repo URL plus these links; the guide's Before-you-leave checklist is the same list. CP5's revision is due end of day too, and should go in through the loop now that the loop is law. Mention the portfolio (CP9): today's pull request description and the review they wrote are the first candidates, so tell them to save the links now.");

  // 15 Wrap
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: -1.3, y: 5.2, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaCodeBranch, 0.9, 1.15, 0.85, C.amber, C.navy);
  s.addText("From now on, every change to your project travels this loop.", { x: 0.9, y: 2.15, w: 11.9, h: 1.05, color: C.white, fontFace: F.head, fontSize: 27, bold: true, italic: true, margin: 0, lineSpacingMultiple: 1.06 });
  s.addText("MONDAY, OCT 26 · YOUR PROJECT'S FRONT DOOR", { x: 0.92, y: 3.4, w: 11, h: 0.35, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText([
    { text: "What a stranger finds when they arrive: README, LICENSE, CONTRIBUTING, code of conduct", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "The anatomy of a good issue, held up against the ones you filed today", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "Today's standards become the heart of your CONTRIBUTING.md", options: { bullet: { indent: 16 } } }
  ], { x: 0.95, y: 3.85, w: 11.7, h: 1.75, color: "CBD8E6", fontFace: F.body, fontSize: 17, valign: "top", margin: 0 });
  card(s, 0.6, 5.95, 12.1, 0.8, C.amber);
  s.addText("The reading is on the Session 15 page.", { x: 0.9, y: 5.95, w: 11.5, h: 0.8, color: C.navy, fontFace: F.body, fontSize: 15.5, bold: true, align: "center", valign: "middle", margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("Close with the one-liner: the loop is now how the project works, through Demo Day, and the git history is the evidence of who did what. Preview Monday: the front door a stranger walks through. Tell them their starter issues will be held up against the issue anatomy, so nobody should go back and polish them tonight; the cold version is the useful one. The standards file graduates into CONTRIBUTING.md next week.");

  const OUT = "Session14-GitWorkflowLab.pptx";
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
