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
pres.title = "CS 301R — Session 23 — Built to Be Joined";

let PAGE = 0;
function mk() { PAGE++; return pres.addSlide(); }
function footer(slide, col) {
  const c = col || C.slate;
  slide.addText("CS 301R · Session 23 · Built to Be Joined", { x: 7.3, y: 7.04, w: 5.4, h: 0.3, align: "right", color: c, fontFace: F.body, fontSize: 10, margin: 0 });
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
  await iconCircle(s, FA.FaDoorOpen, 0.9, 1.45, 1.0, C.amber, C.navy);
  s.addText("CS 301R · SOFTWARE ENGINEERING STUDIO I", { x: 0.92, y: 2.75, w: 11, h: 0.35, color: "9FB4C7", fontFace: F.body, fontSize: 15, bold: true, charSpacing: 2, margin: 0 });
  s.addText("Built to Be Joined", { x: 0.9, y: 3.15, w: 12.1, h: 1.3, color: C.white, fontFace: F.head, fontSize: 42, bold: true, margin: 0 });
  s.addText([
    { text: "Session 23 — what every newcomer needs, and how a project answers it", options: { color: C.amber, bold: true, breakLine: true } },
    { text: "Monday, November 23, 2026", options: { color: "9FB4C7" } }
  ], { x: 0.92, y: 4.7, w: 11, h: 0.9, fontFace: F.body, fontSize: 19, margin: 0, lineSpacingMultiple: 1.2 });
  s.addNotes("The last teaching session of the course; everything after is studio, rehearsal, and the demo. Before class: pick three or four anonymized findings from last Wednesday's audit sheets to write on the board for slide 7. Print the Contributor-Readiness Checklist, one per student. Students bring their audit sheet and top-five fix list. This week turns outward again: lead every block with the general case.");

  // 2 Today
  s = mk(); s.background = { color: C.white };
  header(s, "Today", "From a project people can use to one people can join");
  const plan = [
    [FA.FaDoorOpen, "Joined, not just used", "6 min"],
    [FA.FaQuestionCircle, "The five questions every newcomer asks", "15 min"],
    [FA.FaBalanceScale, "What any codebase owes the next person", "12 min"],
    [FA.FaBoxOpen, "The launch package, laid out", "12 min"],
    [FA.FaTools, "Workshop: your launch punch list", "25 min"],
    [FA.FaRoute, "Thanksgiving, then the last stretch", "5 min"]
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
  s.addNotes("Thirty seconds. For three weeks class has been about your own repository, out of necessity. Today steps back out: what we cover applies to any project anyone ever joins, at work or in open source, and your project is the example rather than the subject. The highlighted workshop is where it turns into a plan for the next nine days.");

  // 3 Last time you were new
  s = mk(); s.background = { color: C.navy };
  darkHeader(s, "Think back", "The last time you were new to a codebase");
  const nw = [
    [FA.FaBriefcase, "A job or internship", "The team's repository, on your first day"],
    [FA.FaCodeBranch, "An open-source project", "A library you wanted to fix or extend"],
    [FA.FaUserGraduate, "A class or a lab", "Code someone else wrote, handed to you"]
  ];
  for (let i = 0; i < 3; i++) {
    const x = 0.6 + i * 4.1;
    card(s, x, 1.95, 3.9, 1.9, C.navy2);
    await iconCircle(s, nw[i][0], x + 0.3, 2.2, 0.62, C.amber, C.navy);
    s.addText(nw[i][1], { x: x + 1.1, y: 2.2, w: 2.7, h: 0.62, color: C.white, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
    s.addText(nw[i][2], { x: x + 0.3, y: 3.0, w: 3.3, h: 0.7, color: "CFE0E9", fontFace: F.body, fontSize: 16, valign: "top", margin: 0 });
  }
  card(s, 0.6, 4.15, 12.1, 1.35, C.amber);
  s.addText("What did you need before you could do anything useful?", { x: 0.95, y: 4.15, w: 11.4, h: 1.35, color: C.navy, fontFace: F.head, fontSize: 26, bold: true, valign: "middle", margin: 0 });
  s.addText("Two or three answers, out loud. Then we'll name them.", { x: 0.6, y: 5.8, w: 12.1, h: 0.5, color: "CFE0E9", fontFace: F.body, fontSize: 17, italic: true, margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("Three minutes. Take two or three answers and write them on the board in the students' words. Expect things like: how to get it running, who to ask, what the code is even for, which part is safe to touch. You'll map their answers onto the five needs on slide 5, which makes the list feel discovered rather than handed down. Every student has been a newcomer somewhere.");

  // 4 Usable vs joinable
  s = mk(); s.background = { color: C.white };
  header(s, "Joined, not just used", "A stranger survived your repo. Would they stay?");
  const uj = [
    ["USABLE", "Serves its users", "Someone can run it and get value from it", C.cardBg, C.tealDk],
    ["JOINABLE", "Grows its builders", "Someone new can understand it, change it safely, and want to come back", C.navy, C.amber]
  ];
  for (let i = 0; i < 2; i++) {
    const x = 0.6 + i * 6.15, dark = i === 1;
    card(s, x, 1.95, 5.95, 2.3, uj[i][3]);
    s.addText(uj[i][0], { x: x + 0.3, y: 2.1, w: 5.4, h: 0.4, color: uj[i][4], fontFace: F.body, fontSize: 15, bold: true, charSpacing: 2, margin: 0 });
    s.addText(uj[i][1], { x: x + 0.3, y: 2.5, w: 5.4, h: 0.6, color: dark ? C.white : C.ink, fontFace: F.head, fontSize: 24, bold: true, margin: 0 });
    s.addText(uj[i][2], { x: x + 0.3, y: 3.15, w: 5.4, h: 0.95, color: dark ? "CFE0E9" : C.ink, fontFace: F.body, fontSize: 17, valign: "top", margin: 0 });
  }
  bar(s, 4.55, 0.95, C.cardBg, "Last Wednesday:", "a stranger got in, or didn't. That's your baseline.", 1);
  bar(s, 5.7, 1.05, C.amber, null, "Where does it go next, and how can others join? On Demo Day, you answer that with artifacts, not hopes.", 2);
  footer(s);
  s.addNotes("Three minutes. Most projects stop at usable: they work, and only their authors can change them. A founded project has to be joinable too, and that's what makes it last past its founder's attention. Click: the audit measured whether a stranger survived your front door. Second click: the final demo's third question is answered by what you write down in the next nine days.");

  // 5 Five needs
  s = mk(); s.background = { color: C.white };
  header(s, "The five newcomer needs", "Every project answers them, on purpose or by accident");
  s.addText("ON AN OPEN-SOURCE PROJECT", { x: 5.45, y: 1.85, w: 3.6, h: 0.35, color: C.slate, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 1, margin: 0 });
  s.addText("ON A TEAM AT WORK", { x: 9.25, y: 1.85, w: 3.4, h: 0.35, color: C.slate, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 1, margin: 0 });
  const nd = [
    ["What is this?", "The README's first screen", "The team's one-page overview"],
    ["Am I welcome?", "CONTRIBUTING, code of conduct, past replies", "How the team treats new people's questions"],
    ["How do I start?", "The setup guide, followed exactly", "The new-hire setup doc"],
    ["Where do I start?", "Good first issues, the roadmap", "A starter task, picked for you"],
    ["Will anyone respond?", "Communication norms, the record", "Who reviews your work, and when"]
  ];
  for (let i = 0; i < nd.length; i++) {
    const y = 2.25 + i * 0.9;
    card(s, 0.6, y, 12.1, 0.78, C.cardBg);
    s.addShape(pres.shapes.OVAL, { x: 0.82, y: y + 0.13, w: 0.52, h: 0.52, fill: { color: C.teal } });
    s.addText(String(i + 1), { x: 0.82, y: y + 0.13, w: 0.52, h: 0.52, color: C.white, fontFace: F.body, fontSize: 18, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(nd[i][0], { x: 1.55, y, w: 3.8, h: 0.78, color: C.ink, fontFace: F.head, fontSize: 20, bold: true, valign: "middle", margin: 0 });
    s.addText(nd[i][1], { x: 5.45, y, w: 3.65, h: 0.78, color: C.ink, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0 });
    s.addText(nd[i][2], { x: 9.25, y, w: 3.3, h: 0.78, color: C.slate, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0 });
  }
  footer(s);
  s.addNotes("Four minutes. Map the students' answers from slide 3 onto these five; most will land on 1, 3, and 4. Point out that the right column is the same need inside a company: good teams onboard a new hire in days instead of months because they answer these on purpose. The middle column is what your repository answers with, and Prop Loft has one artifact for each.");

  // 6 The bars
  s = mk(); s.background = { color: C.white };
  header(s, "The bar for each", "How you'd know a need is actually met");
  const br = [
    ["What is this?", "A stranger explains it back in one sentence after 60 seconds, and the status matches what runs."],
    ["Am I welcome?", "The small signals say yes. The reading: people decide whether to stay from small signals, fast."],
    ["How do I start?", "Running, with tests passing, from the docs alone. Nothing anyone had to guess."],
    ["Where do I start?", "A starter issue with enough context to attempt without asking anyone."],
    ["Will anyone respond?", "Promises you'll keep. \"Reviews within a week,\" not \"24/7.\""]
  ];
  for (let i = 0; i < br.length; i++) numRow(s, 1.95 + i * 0.95, 0.82, i + 1, br[i][0], br[i][1]);
  footer(s);
  s.addNotes("Four minutes. Each bar is something a stranger could check, not something an author feels. Need 2 is the one the reading is about: newcomers decide from a first reply, a tone, a closed issue nobody answered. Need 5 is where student projects most often overpromise; a response time you can't keep after the term ends is worse than an honest slower one.");

  // 7 Audit by need
  s = mk(); s.background = { color: C.white };
  header(s, "Your audit, by need", "What last Wednesday tested, and what it didn't");
  const ab = [
    ["1", "What is this?", true], ["2", "Am I welcome?", false], ["3", "How do I start?", true], ["4", "Where do I start?", true], ["5", "Will anyone respond?", false]
  ];
  for (let i = 0; i < ab.length; i++) {
    const x = 0.6 + i * 2.46;
    card(s, x, 1.95, 2.3, 2.1, ab[i][2] ? C.strongBg : C.amberBg);
    s.addText(ab[i][0], { x: x + 0.2, y: 2.05, w: 1.9, h: 0.55, color: ab[i][2] ? C.green : C.coral, fontFace: F.head, fontSize: 26, bold: true, margin: 0 });
    s.addText(ab[i][1], { x: x + 0.2, y: 2.6, w: 1.95, h: 0.75, color: C.ink, fontFace: F.body, fontSize: 17, bold: true, valign: "top", margin: 0 });
    s.addText(ab[i][2] ? "Tested" : "Not tested", { x: x + 0.2, y: 3.45, w: 1.9, h: 0.45, color: ab[i][2] ? C.green : C.coral, fontFace: F.body, fontSize: 15, bold: true, margin: 0 });
  }
  card(s, 0.6, 4.35, 12.1, 1.35, C.navy);
  s.addText([
    { text: "From your audit sheets:  ", options: { bold: true, color: C.amber } },
    { text: "the stalls on the board. Which need does each one belong to?", options: { color: C.white } }
  ], { x: 0.95, y: 4.35, w: 11.4, h: 1.35, fontFace: F.body, fontSize: 19, valign: "middle", margin: 0 });
  bar(s, 5.95, 0.8, C.amber, null, "Welcome and response are the two no one has checked yet. They're on Dec 2's test.", null);
  footer(s);
  s.addNotes("Three minutes. Point at the anonymized findings you wrote on the board before class, such as 'three of four auditors stalled at the same configuration step', and ask which need each belongs to. Most will be need 3. Then the amber line: the audit never asked whether a newcomer would feel welcome or get a reply, and the onboarding test on Dec 2 does.");

  // 8 What any codebase owes
  s = mk(); s.background = { color: C.white };
  header(s, "What any codebase owes the next person", "At work, in open source, or to you in eight months");
  const ow = [
    [FA.FaVial, "A way to know they didn't break it", "Tests on the logic that matters. Not coverage theater."],
    [FA.FaBookOpen, "Docs that are true", "A short, accurate overview beats a complete, stale one. Newcomers trust what they read."],
    [FA.FaClipboardList, "What's broken, written down", "Every shortcut, cut, and known bug, where a newcomer will see it."]
  ];
  for (let i = 0; i < 3; i++) {
    const x = 0.6 + i * 4.1;
    card(s, x, 1.95, 3.9, 3.3, C.cardBg);
    await iconCircle(s, ow[i][0], x + 0.3, 2.2, 0.7, C.teal, "FFFFFF");
    s.addText(ow[i][1], { x: x + 0.3, y: 3.05, w: 3.3, h: 0.9, color: C.ink, fontFace: F.body, fontSize: 19, bold: true, valign: "top", margin: 0 });
    s.addText(ow[i][2], { x: x + 0.3, y: 3.95, w: 3.3, h: 1.2, color: C.slate, fontFace: F.body, fontSize: 16, valign: "top", margin: 0 });
  }
  bar(s, 5.55, 1.2, C.navy, "For an MVP:", "not a polished product, just these three, honestly. The next two slides are what that means here.", null);
  footer(s);
  s.addNotes("Two minutes. This is the general principle: whoever changes the code next, a teammate, a contributor, or you after a long break, needs these three things. Nothing about it is specific to this course. An MVP doesn't owe a contributor polish or completeness, but it does owe them these. The next two slides are this course's version.");

  // 9 The testing floor
  s = mk(); s.background = { color: C.white };
  header(s, "The testing floor", "By launch, a newcomer can tell if they broke something");
  card(s, 0.6, 1.95, 12.1, 1.5, C.navy);
  s.addText("At least one automated test on your slice's core logic, run by the command your setup guide names, passing at the launch tag.", { x: 0.95, y: 1.95, w: 11.4, h: 1.5, color: C.white, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
  const tf = [
    ["Why now", "CP10 asked whether it works, so a test was extra credit. CP11 asks whether someone else can safely change it."],
    ["What counts", "A test that would fail if the core logic broke. One real test beats twenty that assert nothing."],
    ["What happens without one", "Contributor-readiness on CP11 caps at Developing, however good the rest is."]
  ];
  for (let i = 0; i < 3; i++) {
    const x = 0.6 + i * 4.1;
    card(s, x, 3.75, 3.9, 2.95, C.cardBg, REVEAL(i + 1));
    s.addText([
      { text: tf[i][0], options: { bold: true, color: C.tealDk, breakLine: true } },
      { text: tf[i][1], options: { color: C.ink } }
    ], { x: x + 0.3, y: 3.75, w: 3.3, h: 2.95, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, lineSpacingMultiple: 1.06, ...REVEAL(i + 1) });
  }
  footer(s);
  s.addNotes("Three minutes. Read the floor aloud. One click per card. The first is the reasoning: the bar went up because the audience changed. The second matters most: a test that can't fail proves nothing, which is the same idea as last week's proven-or-shown. If a project has no test yet, the slice's single most important rule is the place to start; Prop Loft's is one open checkout per item.");

  // 10 Debt, documented
  s = mk(); s.background = { color: C.white };
  header(s, "Technical debt", "Debt isn't shameful. Undocumented debt is.");
  const kd = [
    ["Throwaway corners", "the mocks, hardcoded settings, and stand-ins you labeled in Week 10"],
    ["Deliberate cuts", "what you dropped to make the demo, and why"],
    ["Unfixed findings", "whatever the audit or the onboarding test turned up that you haven't fixed"]
  ];
  for (let i = 0; i < kd.length; i++) numRow(s, 1.95 + i * 1.05, 0.9, i + 1, kd[i][0] + ":", kd[i][1]);
  card(s, 0.6, 5.25, 12.1, 1.45, C.navy);
  s.addText([
    { text: "Every entry:  ", options: { bold: true, color: C.amber } },
    { text: "what happens, when it bites, any workaround, and the issue that tracks it. An honest log tells a newcomer what's real, which is why it's a joinability feature, not a confession.", options: { color: C.white } }
  ], { x: 0.95, y: 5.25, w: 11.4, h: 1.45, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
  footer(s);
  s.addNotes("Two minutes. Every real codebase carries debt; the professional move is to write it down where the next person will look. The three sources are all things students already have: corners from Session 19, cuts from Session 21, and findings from last Wednesday. The known-issues log they started for CP10 becomes CP11's known-issues and tech-debt log; it's one file.");

  // 11 Launch package
  s = mk(); s.background = { color: C.white };
  header(s, "The launch package", "Assembly and honesty, not new invention");
  const lp = [
    ["Architecture overview", "Your design diagrams, redrawn as built", "refresh"],
    ["Setup verification", "Your setup guide, passed by a fresh tester on Dec 2", "test"],
    ["Roadmap", "Beyond December, framed as an invitation", "refresh"],
    ["Known issues and tech debt", "One log: corners, cuts, open findings", "grow"],
    ["Onboarding guide", "The five needs, answered in one place", "write"],
    ["A test a newcomer can run", "The testing floor", "check"]
  ];
  s.addText("FOR EACH, MARK:  EXISTS · NEEDS REFRESH · NEEDS WRITING", { x: 0.6, y: 1.85, w: 12.1, h: 0.35, color: C.slate, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 1, margin: 0 });
  for (let i = 0; i < lp.length; i++) {
    const x = 0.6 + (i % 2) * 6.15, y = 2.3 + Math.floor(i / 2) * 1.45;
    card(s, x, y, 5.95, 1.28, C.cardBg);
    s.addText([
      { text: lp[i][0], options: { bold: true, color: C.ink, breakLine: true } },
      { text: lp[i][1], options: { color: C.slate, fontSize: 16 } }
    ], { x: x + 0.3, y, w: 5.4, h: 1.28, fontFace: F.body, fontSize: 18, valign: "middle", margin: 0 });
  }
  s.addText("Each piece traces to something you already have in draft. CP11 is due Dec 2.", { x: 0.6, y: 6.5, w: 12.1, h: 0.4, color: C.tealDk, fontFace: F.body, fontSize: 17, bold: true, italic: true, margin: 0 });
  footer(s);
  s.addNotes("Four minutes. Walk the six pieces and, for each, ask where its draft already lives: the design doc, the setup guide, the roadmap from CP8, the known-issues file from CP10, CONTRIBUTING and the norms, the test command. The point to land is that the package is mostly refresh and verify. Students mark each one exists, needs refresh, or needs writing during the workshop.");

  // 12 The checklist
  s = mk(); s.background = { color: C.white };
  header(s, "Contributor-Readiness Checklist", "One page, two uses");
  const cl = [
    [FA.FaUserCheck, "Today: a self-check", "Mark your own project against the five needs, honestly. Every stall or fail goes on your punch list."],
    [FA.FaUserSecret, "Dec 2: the test script", "A classmate who's never seen your project works through it cold and signs it. That's CP11's evidence."]
  ];
  for (let i = 0; i < 2; i++) {
    const x = 0.6 + i * 6.15;
    card(s, x, 1.95, 5.95, 2.5, C.cardBg);
    await iconCircle(s, cl[i][0], x + 0.3, 2.2, 0.65, C.teal, "FFFFFF");
    s.addText(cl[i][1], { x: x + 1.15, y: 2.2, w: 4.6, h: 0.65, color: C.ink, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
    s.addText(cl[i][2], { x: x + 0.3, y: 3.05, w: 5.35, h: 1.3, color: C.ink, fontFace: F.body, fontSize: 17, valign: "top", margin: 0 });
  }
  bar(s, 4.75, 0.95, C.cardBg, "Under the hood:", "the test, the known-issues log, an architecture that matches, a roadmap, promises you'll keep.", null);
  bar(s, 5.85, 0.9, C.amber, "Since the audit:", "before Dec 2, write your two worst audit stalls. The tester checks each one.", null);
  footer(s);
  s.addNotes("Two minutes; hand out the checklist. It isn't the audit sheet again on purpose: the audit tested whether a stranger could get in, and this tests whether they'd stay, including welcome and response. The Since the audit section ties the two together: authors write their two worst stalls from last Wednesday, and the Dec 2 tester marks each fixed, logged, or still there.");

  // 13 Workshop
  s = mk(); s.background = { color: C.navy };
  darkHeader(s, "Workshop · 25 min", "One launch punch list, in your tracker");
  const wk = [
    ["Three inputs", "Your top-five fix list · today's self-check (every stall or fail) · the package map (what needs writing)"],
    ["Merge and rank", "By joinability: what would stop a newcomer first goes first"],
    ["Into the tracker", "Each item an issue, like everything else. Assigned, in a milestone, on the board"],
    ["Fill in Since the audit", "Your two worst audit stalls, written on the checklist now"]
  ];
  for (let i = 0; i < wk.length; i++) {
    const y = 1.95 + i * 0.92;
    card(s, 0.6, y, 12.1, 0.8, C.navy2);
    s.addText(String(i + 1), { x: 0.85, y, w: 0.4, h: 0.8, color: C.amber, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
    s.addText(wk[i][0], { x: 1.35, y, w: 3.3, h: 0.8, color: C.white, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
    s.addText(wk[i][1], { x: 4.65, y, w: 7.85, h: 0.8, color: "CFE0E9", fontFace: F.body, fontSize: 16, valign: "middle", margin: 0 });
  }
  card(s, 0.6, 5.75, 12.1, 1.0, C.amber);
  s.addText([
    { text: "I'll ask:  ", options: { bold: true } },
    { text: "If someone forked this in January, with no one to ask, what would stop them first? That item goes to the top." }
  ], { x: 0.95, y: 5.75, w: 11.4, h: 1.0, color: C.navy, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  footer(s, "7E92A8");
  s.addNotes("Twenty-five minutes; leave this up. Circulate to every project at least twice with the January question. Most punch lists come out top-heavy with features; push joinability items up. Each item becomes an issue so the tracker stays the source of truth to the end. Make sure every student has filled in Since the audit before they leave; the Dec 2 tester needs it.");

  // 14 Wrap
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: -1.3, y: 5.2, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaDoorOpen, 0.9, 1.0, 0.85, C.amber, C.navy);
  s.addText("Five needs, honest quality, and a package that's mostly assembly.", { x: 0.9, y: 2.0, w: 11.9, h: 1.0, color: C.white, fontFace: F.head, fontSize: 25, bold: true, italic: true, margin: 0 });
  s.addText("WHAT'S NEXT", { x: 0.92, y: 3.2, w: 11, h: 0.35, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText([
    { text: "Wednesday, Nov 25: no class. No expectation over Thanksgiving; enjoy it", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 6, bold: true, color: C.white } },
    { text: "Want to keep going anyway? Your punch list is ready. That's up to you.", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 6 } },
    { text: "Monday, Nov 30: the retrospective, and framing your final pitch", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 6 } },
    { text: "Wednesday, Dec 2: launch studio and the onboarding test", options: { bullet: { indent: 16 } } }
  ], { x: 0.95, y: 3.62, w: 11.7, h: 2.15, color: "CBD8E6", fontFace: F.body, fontSize: 17, valign: "top", margin: 0 });
  card(s, 0.6, 5.95, 12.1, 0.8, C.amber);
  s.addText("CP11 Launch Package + Retrospective is due end of day Wednesday, Dec 2.", { x: 0.9, y: 5.95, w: 11.5, h: 0.8, color: C.navy, fontFace: F.body, fontSize: 16, bold: true, align: "center", valign: "middle", margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("Two minutes. Say the one-liner. Be clear that nothing is expected over Thanksgiving: this is a real break. Anyone who wants to close issues may, and the punch list makes that easy, but don't imply it. Monday after the break is the retrospective and the pitch frame; Wednesday is assembly and the onboarding test, with CP11 due that night.");

  const OUT = "Session23-BuiltToBeJoined.pptx";
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
