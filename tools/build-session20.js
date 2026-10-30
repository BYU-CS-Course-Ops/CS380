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
pres.title = "CS 301R — Session 20 — Review & Cold Test";

let PAGE = 0;
function mk() { PAGE++; return pres.addSlide(); }
function footer(slide, col) {
  const c = col || C.slate;
  slide.addText("CS 301R · Session 20 · Review & Cold Test", { x: 7.3, y: 7.04, w: 5.4, h: 0.3, align: "right", color: c, fontFace: F.body, fontSize: 10, margin: 0 });
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
  await iconCircle(s, FA.FaClipboardCheck, 0.9, 1.45, 1.0, C.amber, C.navy);
  s.addText("CS 301R · SOFTWARE ENGINEERING STUDIO I", { x: 0.92, y: 2.75, w: 11, h: 0.35, color: "9FB4C7", fontFace: F.body, fontSize: 15, bold: true, charSpacing: 2, margin: 0 });
  s.addText("A Promise, Then a Stranger", { x: 0.9, y: 3.15, w: 12.1, h: 1.3, color: C.white, fontFace: F.head, fontSize: 42, bold: true, margin: 0 });
  s.addText([
    { text: "Session 20 — MVP-plan review and the setup guide's cold test", options: { color: C.amber, bold: true, breakLine: true } },
    { text: "Wednesday, November 11, 2026", options: { color: "9FB4C7" } }
  ], { x: 0.92, y: 4.7, w: 11, h: 0.9, fontFace: F.body, fontSize: 19, margin: 0, lineSpacingMultiple: 1.2 });
  s.addNotes("Before class: the review sheets printed, one per pairing, and pairings on the board. Open Prop Loft's docs/setup.md at the session-20 tag in a tab. Check the night before which projects have a setup-guide PR open; anyone without one still cold-tests, on whatever the README says, and writes the guide tonight. Laptops required. The MVP Plan revision is due end of day.");

  // 2 Today
  s = mk(); s.background = { color: C.white };
  header(s, "Today", "One outside read, then a stranger runs your guide");
  const plan = [
    [FA.FaBullseye, "The plan is a promise; the guide needs a stranger", "4 min"],
    [FA.FaComments, "MVP-plan review: three questions, project to project", "24 min"],
    [FA.FaListOl, "Your setup guide against the five parts", "7 min"],
    [FA.FaUserSecret, "The cold test: your partner follows your guide", "30 min"],
    [FA.FaRedo, "Read it back, and the week ahead", "10 min"]
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
  s.addNotes("Thirty seconds. Two halves. The review is familiar by now, so it runs fast. The highlighted row is the reason today needs the room: a cold test only works with someone else at the keyboard and the author kept out of it. Nobody writes their guide in class; it was due on a PR before you walked in. If the review runs long, take time from it, never from the cold test.");

  // 3 Framing
  s = mk(); s.background = { color: C.white };
  header(s, "Why today", "Two things you can't check yourself");
  const two = [
    [FA.FaFileSignature, "Your MVP Plan", "A one-page promise: what's in, what's deferred, the risk it retires, and the demo. Get an outside read before you're bound by it, while changing it is cheap."],
    [FA.FaTerminal, "Your setup guide", "Instructions only a stranger can test. Your machine already has everything the guide forgot. Today one follows it, a week before the audit."]
  ];
  for (let i = 0; i < 2; i++) {
    const x = 0.6 + i * 6.15;
    card(s, x, 2.0, 5.95, 2.75, C.cardBg);
    await iconCircle(s, two[i][0], x + 0.3, 2.25, 0.65, C.teal, "FFFFFF");
    s.addText(two[i][1], { x: x + 1.15, y: 2.25, w: 4.6, h: 0.65, color: C.tealDk, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
    s.addText(two[i][2], { x: x + 0.3, y: 3.05, w: 5.35, h: 1.55, color: C.ink, fontFace: F.body, fontSize: 17, valign: "top", margin: 0, lineSpacingMultiple: 1.05 });
  }
  bar(s, 5.15, 0.95, C.amber, null, "What's demoed on Wednesday, Nov 18 is what exists on main by Tuesday night.", 1);
  footer(s);
  s.addNotes("Four minutes. Both halves of today are things an author can't check alone: you can't review your own plan with fresh eyes, and you can't follow your own guide as a stranger. Click: write the arithmetic on the board. Seven days, and the last one is a freeze, because the cp10 tag goes up the night before. Everything in today's review is judged against that.");

  // 4 Review protocol
  s = mk(); s.background = { color: C.white };
  header(s, "MVP-plan review · 24 min", "Swap plans with your partner project");
  const steps = [
    ["5 min", "Read", "Their plan, all of it, before you write anything"],
    ["5 min", "Write", "Three answers on the review sheet: scope, proof, risk"],
    ["7 min", "Talk: you → them", "Go through your sheet; the authors take notes"],
    ["7 min", "Talk: them → you", "Swap; hand the sheet to the authors at the end"]
  ];
  for (let i = 0; i < 4; i++) {
    const x = 0.6 + i * 3.08;
    card(s, x, 2.0, 2.86, 2.6, i < 2 ? C.cardBg : C.ice);
    s.addText(steps[i][0], { x: x + 0.25, y: 2.15, w: 2.4, h: 0.45, color: C.teal, fontFace: F.body, fontSize: 16, bold: true, margin: 0 });
    s.addText(steps[i][1], { x: x + 0.25, y: 2.6, w: 2.4, h: 0.55, color: C.ink, fontFace: F.body, fontSize: 19, bold: true, margin: 0 });
    s.addText(steps[i][2], { x: x + 0.25, y: 3.2, w: 2.4, h: 1.3, color: C.slate, fontFace: F.body, fontSize: 16, valign: "top", margin: 0 });
  }
  bar(s, 4.95, 0.8, C.cardBg, "Same register as always:", "specific, tied to the criteria, kind. Name the line, not the vibe.", null);
  bar(s, 5.95, 0.8, C.navy, "Authors:", "you keep the sheet. You revise after class, not now; the revision is due tonight.", 1);
  footer(s);
  s.addNotes("Thirty seconds to set up, then run the clock out loud. Most of you are solo, so pairing is founder with review partner. Writing before talking matters: a reviewer who talks first reviews what they remember, not what's on the page. Click: no revision block in class anymore. The sheet goes home with the authors, and the revised plan is due end of day.");

  // 5 Three questions
  s = mk(); s.background = { color: C.white };
  header(s, "The review sheet", "Three questions, answered in writing");
  numRow(s, 2.0, 1.2, 1, "Scope:", "does the \"in\" list actually fit the days left? What would you cut first?", REVEAL(1));
  numRow(s, 3.4, 1.2, 2, "Proof:", "does the demo plan prove the plan's claims (need, technical, usability), or does it just show screens?", REVEAL(2));
  numRow(s, 4.8, 1.2, 3, "Risk:", "what's most likely to go wrong in the demo itself, and is there a fallback?", REVEAL(3));
  s.addText("If you can't answer one from the page, that's your answer: the plan doesn't say.", { x: 0.6, y: 6.25, w: 12.1, h: 0.5, color: C.tealDk, fontFace: F.body, fontSize: 17, italic: true, bold: true, margin: 0 });
  footer(s);
  s.addNotes("Ninety seconds, one click per question. Scope: ask what they would cut first, because a reviewer naming the cut makes it easy for the author to accept. Proof: the most common gap is a demo that tours screens instead of walking the claims in rank order. Risk: the next slide. The bottom line matters: a plan that needs its author to explain it isn't finished.");

  // 6 Fallbacks
  s = mk(); s.background = { color: C.white };
  header(s, "The risk question", "Demos fail for boring reasons. Stage the fallback.");
  const fb = [
    [FA.FaDatabase, "Seed data", "An empty database demos nothing. Script the data, and rerun it before you present.", C.cardBg],
    [FA.FaWifi, "Local mode", "No wifi, no outside service, no login that can expire mid-demo.", C.cardBg],
    [FA.FaVideo, "Recorded clip", "A declared last resort. Using it caps Demo readiness at Proficient, unless the room failed.", C.weakBg]
  ];
  for (let i = 0; i < 3; i++) {
    const x = 0.6 + i * 4.1;
    card(s, x, 2.0, 3.9, 3.0, fb[i][3]);
    await iconCircle(s, fb[i][0], x + 0.3, 2.25, 0.65, i === 2 ? C.coral : C.teal, "FFFFFF");
    s.addText(fb[i][1], { x: x + 1.1, y: 2.25, w: 2.7, h: 0.65, color: i === 2 ? C.coral : C.tealDk, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
    s.addText(fb[i][2], { x: x + 0.3, y: 3.1, w: 3.3, h: 1.75, color: C.ink, fontFace: F.body, fontSize: 17, valign: "top", margin: 0, lineSpacingMultiple: 1.05 });
  }
  bar(s, 5.35, 0.95, C.amber, null, "Wifi, login state, an empty database: stage a fallback for all three before Tuesday night.", 1);
  footer(s);
  s.addNotes("Ninety seconds. These are patterns for the reviewer to look for in the plan's fallback line. Seed data and local mode are the real fallbacks; they make the live demo survivable. The clip is in red on purpose: it's allowed, but declared in advance, and it costs a level on Demo readiness unless the failure was the room's. Click: the fallback isn't pessimism; it's craft.");

  // 7 Revise after class
  s = mk(); s.background = { color: C.white };
  header(s, "After class, tonight", "Revise the plan from the sheet");
  const rev = [
    [FA.FaCut, "Move one thing to deferred", "If your reviewer named a cut, take it or say in the plan why not"],
    [FA.FaListOl, "Tighten the demo script", "Three lines, the claims in rank order, nothing that only shows a screen"],
    [FA.FaShieldAlt, "Add the fallback", "Seed data ready, local mode tested; the clip only if declared"]
  ];
  for (let i = 0; i < 3; i++) {
    const y = 2.0 + i * 1.0;
    card(s, 0.6, y, 12.1, 0.85, C.cardBg);
    await iconCircle(s, rev[i][0], 0.85, y + 0.14, 0.57, C.teal, "FFFFFF");
    s.addText([
      { text: rev[i][1] + "  ", options: { bold: true, color: C.ink } },
      { text: rev[i][2], options: { color: C.slate } }
    ], { x: 1.65, y, w: 10.85, h: 0.85, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0 });
  }
  card(s, 0.6, 5.2, 12.1, 1.5, C.navy);
  s.addText([
    { text: "Due end of day: ", options: { bold: true, color: C.amber } },
    { text: "the URL of docs/mvp-plan.md on main. ", options: { color: C.white, bold: true } },
    { text: "This is the version scored, as CP10's MVP plan quality criterion. Change it later if you must, visibly: the demo is judged against the plan as amended.", options: { color: "CBD8E6" } }
  ], { x: 0.95, y: 5.2, w: 11.4, h: 1.5, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
  footer(s);
  s.addNotes("One minute, as the review closes. The revision used to happen in class; it's homework now, so say what a revision is: at least one thing moved or tightened. The navy box answers the question students ask: yes, this one is graded. The Canvas entry is complete or incomplete, but the plan is scored once, from tonight's version, inside CP10. Later amendments change what the demo is judged against, not this score.");

  // 8 Why a cold test
  s = mk(); s.background = { color: C.white };
  header(s, "The setup guide", "You are the worst tester of your own instructions");
  s.addText("YOUR MACHINE HIDES THINGS", { x: 0.6, y: 1.95, w: 6, h: 0.35, color: C.slate, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  const hid = [
    "The environment variable you set three weeks ago",
    "The tool you installed for another class and forgot",
    "The .env file and the database that already exist",
    "The step you do without thinking, so you never wrote it"
  ];
  for (let i = 0; i < hid.length; i++) {
    const y = 2.4 + i * 0.78;
    card(s, 0.6, y, 6.6, 0.66, C.cardBg);
    s.addText(hid[i], { x: 0.9, y, w: 6.2, h: 0.66, color: C.ink, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0 });
  }
  card(s, 7.55, 2.4, 5.15, 3.0, C.navy, REVEAL(1));
  await iconCircle(s, FA.FaUserSecret, 7.85, 2.65, 0.65, C.amber, C.navy, REVEAL(1));
  s.addText("A stranger has none of it", { x: 8.65, y: 2.65, w: 3.9, h: 0.65, color: C.amber, fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0, ...REVEAL(1) });
  s.addText("So the first stranger to follow your guide finds, in fifteen minutes, what five rereads by you will miss.", { x: 7.85, y: 3.5, w: 4.6, h: 1.75, color: C.white, fontFace: F.body, fontSize: 17, valign: "top", margin: 0, lineSpacingMultiple: 1.05, ...REVEAL(1) });
  bar(s, 5.85, 0.9, C.amber, null, "On any project, the setup guide is the first thing a contributor tries. If it fails, most leave without telling you.", 2);
  footer(s);
  s.addNotes("Ninety seconds. Read the left column and ask for hands: who has one of these on their own machine right now? Everyone does. Click: that's why a cold reader is the only real test. Second click: the general point. Nobody files an issue saying your setup broke; they close the tab. In this course the same guide is followed cold at the audit next Wednesday, for a grade. Today is the practice round.");

  // 9 Anatomy
  s = mk(); s.background = { color: C.white };
  header(s, "What a guide needs", "Five parts, each shown in Prop Loft's guide");
  const parts = [
    ["Prerequisites, with versions", "Python 3.12 or newer · check: python --version · a link to install it"],
    ["Numbered steps, one command each", "Copy, paste, run. No \"set up the database as usual.\""],
    ["\"You should see…\" checkpoints", "(.venv) at the start of your prompt; each migration ending in OK"],
    ["How to run the tests", "python manage.py test, and what passing looks like: OK"],
    ["When a step fails", "KeyError: 'DJANGO_SECRET_KEY' → your .env is missing or its key is empty"]
  ];
  for (let i = 0; i < parts.length; i++) numRow(s, 1.95 + i * 0.95, 0.82, i + 1, parts[i][0] + ":", parts[i][1]);
  footer(s);
  s.addNotes("Two minutes. You read this on the Session 20 page before writing, so this is a reminder, not a lesson. Each row shows the part and Prop Loft's version of it. The ones students skip: versions, because their version works for them; and When a step fails, because they fixed those failures and forgot. If you hit a failure while writing, that's the entry.");

  // 10 Prop Loft excerpt
  s = mk(); s.background = { color: C.white };
  header(s, "Prop Loft · docs/setup.md · session-20", "Two habits worth copying");
  codeBlock(s, 0.6, 1.95, 5.95, 2.75, [
    ["### 5. Create the database", C.codeDim],
    "",
    "python manage.py migrate",
    "",
    ["You should see a list of migrations,", C.codeAdd],
    ["each ending in OK, with", C.codeAdd],
    ["catalog.0001_initial among them.", C.codeAdd]
  ]);
  codeBlock(s, 6.75, 1.95, 5.95, 2.75, [
    ["## When a step fails", C.codeDim],
    "",
    ["KeyError: 'DJANGO_SECRET_KEY'", C.codeDel],
    "at the end of a long error, on any",
    "manage.py command.",
    "Django can't find your settings file.",
    "Make sure .env exists …"
  ]);
  card(s, 0.6, 4.95, 5.95, 1.8, C.cardBg, REVEAL(1));
  s.addText([
    { text: "Checkpoints go where it fails silently", options: { bold: true, color: C.tealDk, breakLine: true } },
    { text: "Not after every step. After the ones where a reader can't tell whether it worked.", options: { color: C.ink } }
  ], { x: 0.9, y: 4.95, w: 5.4, h: 1.8, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, lineSpacingMultiple: 1.05, ...REVEAL(1) });
  card(s, 6.75, 4.95, 5.95, 1.8, C.cardBg, REVEAL(2));
  s.addText([
    { text: "Lead with the exact error text", options: { bold: true, color: C.tealDk, breakLine: true } },
    { text: "It's what the reader pastes into a search, or into a find on this page.", options: { color: C.ink } }
  ], { x: 7.05, y: 4.95, w: 5.4, h: 1.8, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, lineSpacingMultiple: 1.05, ...REVEAL(2) });
  footer(s);
  s.addNotes("One minute; open the real file in the tab if you can. Left: one step, one command, and a You should see after a step that could fail without saying so. Click: put checkpoints where a reader can't tell, not after every line. Right: a failure entry. Second click: it starts with the error text exactly as the terminal prints it, because that's what a stuck reader searches for.");

  // 11 Self-check
  s = mk(); s.background = { color: C.navy };
  darkHeader(s, "Self-check · 4 min", "Your guide against the five parts");
  const chk = ["Prerequisites, with versions", "Numbered steps, one command each", "\"You should see…\" checkpoints", "How to run the tests", "When a step fails"];
  for (let i = 0; i < chk.length; i++) {
    const y = 1.95 + i * 0.68;
    card(s, 0.6, y, 7.2, 0.56, C.navy2);
    s.addShape(pres.shapes.RECTANGLE, { x: 0.85, y: y + 0.13, w: 0.3, h: 0.3, fill: { color: C.navy2 }, line: { color: C.amber, width: 2 } });
    s.addText(chk[i], { x: 1.4, y, w: 6.2, h: 0.56, color: C.white, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0 });
  }
  card(s, 8.1, 1.95, 4.6, 3.28, C.navy2);
  s.addText([
    { text: "Then fix one", options: { bold: true, color: C.amber, breakLine: true } },
    { text: "The missing part you can fix in two minutes, on the PR. Usually a version or a You should see.", options: { color: "CFE0E9" } }
  ], { x: 8.4, y: 1.95, w: 4.1, h: 3.28, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, lineSpacingMultiple: 1.06 });
  card(s, 0.6, 5.65, 12.1, 1.05, C.amber);
  s.addText("README's quickstart: the short version, with a link to the guide. Then send your partner the repo URL and the branch.", { x: 0.95, y: 5.65, w: 11.4, h: 1.05, color: C.navy, fontFace: F.body, fontSize: 17, bold: true, valign: "middle", margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("Four minutes, timed. Authors mark their own guide against the five, honestly; a missing part found now is cheaper than one the partner finds. One fix only: the cold test starts in four minutes, and the point is to test the guide as it is. Anyone without a guide on a PR: your partner tests your README instead, and you write the guide tonight. Make sure branch names are exchanged before the clock starts.");

  // 12 Cold test
  s = mk(); s.background = { color: C.navy };
  darkHeader(s, "The cold test · 30 min", "Follow your partner's guide, exactly as written");
  const ct = [
    [FA.FaCodeBranch, "Fresh clone", "Of the guide's branch, in a new folder. Keep tools you already have; install nothing the guide doesn't say to."],
    [FA.FaListOl, "Exactly as written", "Don't fill gaps from what you know. A gap you fill quietly is one the next reader falls into."],
    [FA.FaHandPaper, "Don't ask the author", "They're running your guide right now. Questions go in an issue, unless the 5-minute rule below applies."],
    [FA.FaBug, "Every stumble → an issue", "On the author's repo, through their bug template, naming the step."]
  ];
  for (let i = 0; i < ct.length; i++) {
    const y = 1.95 + i * 0.9;
    card(s, 0.6, y, 12.1, 0.78, C.navy2);
    await iconCircle(s, ct[i][0], 0.85, y + 0.13, 0.52, C.amber, C.navy);
    s.addText(ct[i][1], { x: 1.6, y, w: 2.9, h: 0.78, color: C.white, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
    s.addText(ct[i][2], { x: 4.5, y, w: 8.0, h: 0.78, color: "CFE0E9", fontFace: F.body, fontSize: 16, valign: "middle", margin: 0 });
  }
  card(s, 0.6, 5.75, 12.1, 1.0, C.amber);
  s.addText([
    { text: "Stuck 5 minutes on one step?  ", options: { bold: true } },
    { text: "File the issue, ask the author for just enough to get past it, and say in the issue that you needed help." }
  ], { x: 0.95, y: 5.75, w: 11.4, h: 1.0, color: C.navy, fontFace: F.body, fontSize: 16.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  footer(s, "7E92A8");
  s.addNotes("Leave this up for the whole block. Both partners test at once, so everyone is a reader and an author. Fresh clone is the bar, not a clean machine. Circulate; the most common failure is a prerequisite the author forgot they had. Nobody watches their own guide being run, because everyone is busy running someone else's; the rule is not to lean over and ask. The five-minute rule keeps a bad step from eating the block; a guide nobody can finish in thirty minutes is a finding, not the reader's failure. Call time at 15 and 25.");

  // 13 A good cold-test issue
  s = mk(); s.background = { color: C.white };
  header(s, "Filing what you hit", "An issue the author can fix without asking you anything");
  codeBlock(s, 0.6, 1.95, 7.0, 4.0, [
    ["Title: Step 3 fails: npm install needs Node 20", C.white],
    "",
    ["Step:     3, Install the dependencies", C.code],
    ["Did:      ran npm install, as written", C.code],
    ["Saw:      EBADENGINE Unsupported engine", C.codeDel],
    ["          required: node >=20, current 18.19", C.codeDel],
    ["Expected: it to install. Prerequisites", C.code],
    ["          doesn't name a Node version.", C.code],
    ["Help:     asked the author which version", C.codeDim]
  ]);
  s.addText("An example, not from a real project", { x: 0.6, y: 6.05, w: 7.0, h: 0.4, color: C.slate, fontFace: F.body, fontSize: 14, italic: true, margin: 0 });
  const good = [
    ["Name the step", "by number, so the fix lands in the right place"],
    ["Paste the exact output", "not \"it errored\""],
    ["Say what you expected", "that's the missing line in the guide"],
    ["Note any help you needed", "that step isn't fixed until nobody does"]
  ];
  for (let i = 0; i < good.length; i++) {
    const y = 1.95 + i * 1.02;
    card(s, 7.85, y, 4.85, 0.88, C.cardBg, REVEAL(1));
    s.addText([
      { text: good[i][0], options: { bold: true, color: C.tealDk, breakLine: true } },
      { text: good[i][1], options: { color: C.ink, fontSize: 15 } }
    ], { x: 8.1, y, w: 4.45, h: 0.88, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, ...REVEAL(1) });
  }
  footer(s);
  s.addNotes("One minute, before the block starts or at the first check-in. The example is invented, in a stack none of you use, so nobody's guide is on the screen. Click: the four habits. These issues are good technical writing in miniature, and they count for both of you: CP9 accepts the issues your cold tester filed and your replies to them. A one-line issue that says step 3 broke is a missed portfolio piece.");

  // 14 Read it back
  s = mk(); s.background = { color: C.white };
  header(s, "Read it back · 5 min", "Read now. Fix before Monday.");
  numRow(s, 2.0, 0.95, 1, "Read every issue,", "all of them, before you plan a single fix.");
  numRow(s, 3.1, 0.95, 2, "Group them by cause.", "Several often share one, usually a missing prerequisite or a step you do without thinking.");
  numRow(s, 4.2, 0.95, 3, "Put them at the top of Ready.", "Fix, merge, and close before Monday. Leave the closed issues visible; they're the record of the fix.");
  card(s, 0.6, 5.45, 12.1, 1.3, C.navy, REVEAL(1));
  s.addText([
    { text: "Exit check, out loud:  ", options: { bold: true, color: C.amber } },
    { text: "review sheet in hand? Setup guide on a PR? Cold-test issues filed, both directions?", options: { color: C.white } }
  ], { x: 0.95, y: 5.45, w: 11.4, h: 1.3, fontFace: F.body, fontSize: 18, valign: "middle", margin: 0, ...REVEAL(1) });
  footer(s);
  s.addNotes("Five minutes, and nobody fixes anything in class: there isn't time, and a rushed fix is how a guide gets a second bug. Reading all the issues first matters, because three issues often trace to one missing line. The fixes go first in Ready, ahead of new features, because the audit follows this guide next Wednesday. Closed issues are evidence, so don't delete or hide them; the auditor next week sees a guide that was tested and fixed. Click: go round the room, one project at a time, and ask the three questions. Anyone missing one leaves with a specific thing to do tonight.");

  // 15 Wrap
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: -1.3, y: 5.2, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaClipboardCheck, 0.9, 1.0, 0.85, C.amber, C.navy);
  s.addText("A plan someone else has questioned. A guide someone else has followed.", { x: 0.9, y: 2.0, w: 11.9, h: 1.05, color: C.white, fontFace: F.head, fontSize: 25, bold: true, italic: true, margin: 0, lineSpacingMultiple: 1.06 });
  s.addText("THE WEEK AHEAD", { x: 0.92, y: 3.25, w: 11, h: 0.35, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText([
    { text: "Tonight: revise the MVP Plan and submit its URL on main", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 7, bold: true, color: C.white } },
    { text: "Before Monday: fix and merge the guide, close its issues; walk your slice on main and file every break", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "Monday, Nov 16: check-in and troubleshooting. We rerun the fresh clone on main. Bring problems, not polish.", options: { bullet: { indent: 16 } } }
  ], { x: 0.95, y: 3.68, w: 11.7, h: 2.1, color: "CBD8E6", fontFace: F.body, fontSize: 17, valign: "top", margin: 0 });
  card(s, 0.6, 5.95, 12.1, 0.8, C.amber);
  s.addText("Wednesday, Nov 18: CP10 demo + repo audit, and CP9 is due. Build the portfolio this weekend.", { x: 0.9, y: 5.95, w: 11.5, h: 0.8, color: C.navy, fontFace: F.body, fontSize: 16, bold: true, align: "center", valign: "middle", margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("Two minutes. Say the one-liner. Tonight is the plan; the guide can wait until the weekend, but not past Monday, because Monday reruns the fresh clone on main. Rehearse the demo path on main, not on your branch: that's what the cp10 tag will hold. CP9 is quality-graded and due the same day as the demo, so the portfolio goes together this weekend, not Tuesday night.");

  const OUT = "Session20-ReviewAndColdTest.pptx";
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
