const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const FA = require("react-icons/fa");

const C = {
  navy: "14233A", navy2: "1E3352", teal: "12908F", tealDk: "0E6E6D",
  amber: "E8A33D", coral: "D9614C", green: "3E9C6B",
  ink: "1E2A36", slate: "5F7284", cardBg: "F2F6F8", ice: "E4EEF1", white: "FFFFFF"
};
const F = { head: "Cambria", body: "Calibri" };

const iconCache = {};
async function ic(Comp, color) {
  const key = (Comp.displayName || Comp.name || "i") + color;
  if (iconCache[key]) return iconCache[key];
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(Comp, { color: "#" + color, size: "256" }));
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  const d = "image/png;base64," + png.toString("base64");
  iconCache[key] = d;
  return d;
}
const mkShadow = () => ({ type: "outer", color: "000000", blur: 7, offset: 3, angle: 90, opacity: 0.13 });

const pres = new pptxgen();
pres.defineLayout({ name: "W", width: 13.3, height: 7.5 });
pres.layout = "W";
pres.author = "CS 301R";
pres.title = "CS 301R — Session 1 — Course Launch";

let PAGE = 0;
function mk() { PAGE++; return pres.addSlide(); }
function footer(slide, col) {
  const c = col || C.slate;
  slide.addText("CS 301R · Session 1 · Course Launch", { x: 8.0, y: 7.06, w: 4.7, h: 0.3, align: "right", color: c, fontFace: F.body, fontSize: 11, margin: 0 });
  slide.addText(String(PAGE), { x: 0.6, y: 7.06, w: 0.6, h: 0.3, color: c, fontFace: F.body, fontSize: 11, margin: 0 });
}
function header(slide, kicker, title, titleColor) {
  slide.addShape(pres.shapes.OVAL, { x: 0.62, y: 0.54, w: 0.14, h: 0.14, fill: { color: C.amber } });
  slide.addText(kicker.toUpperCase(), { x: 0.86, y: 0.45, w: 11.5, h: 0.32, color: C.teal, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  slide.addText(title, { x: 0.6, y: 0.8, w: 12.1, h: 1.0, color: titleColor || C.ink, fontFace: F.head, fontSize: 30, bold: true, margin: 0, valign: "top" });
}
function card(slide, x, y, w, h, fill) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: fill || C.cardBg }, line: { type: "none" }, rectRadius: 0.09, shadow: mkShadow() });
}
async function iconCircle(slide, Comp, x, y, d, circleColor, iconColor) {
  slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: circleColor } });
  const pad = d * 0.27;
  slide.addImage({ data: await ic(Comp, iconColor || "FFFFFF"), x: x + pad, y: y + pad, w: d - 2 * pad, h: d - 2 * pad });
}

async function build() {
  let s;

  // ===== 1 Title =====
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: 10.9, y: -1.4, w: 4.2, h: 4.2, fill: { color: "1C3252" } });
  s.addShape(pres.shapes.OVAL, { x: 12.0, y: 5.1, w: 3.0, h: 3.0, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaRocket, 0.9, 1.5, 0.95, C.amber, C.navy);
  s.addText("CS 301R · SOFTWARE ENGINEERING STUDIO I", { x: 0.92, y: 2.75, w: 11, h: 0.35, color: "9FB4C7", fontFace: F.body, fontSize: 16, bold: true, charSpacing: 2, margin: 0 });
  s.addText("Founding an Open-Source Project", { x: 0.9, y: 3.15, w: 11.5, h: 1.3, color: C.white, fontFace: F.head, fontSize: 50, bold: true, margin: 0 });
  s.addText([
    { text: "Session 1 — Course Launch", options: { color: C.amber, bold: true, breakLine: true } },
    { text: "Wednesday, September 2, 2026", options: { color: "9FB4C7" } }
  ], { x: 0.92, y: 4.55, w: 11, h: 0.8, fontFace: F.body, fontSize: 19, margin: 0, lineSpacingMultiple: 1.2 });
  s.addNotes("Open the room and set the tone. Welcome them, read the energy, keep personal intros light (name, major, one thing they've built) but don't let intros eat the clock — there's a lot to cover. Land the promise plainly: by finals, each of them will have founded and launched a real open-source project that others actually want to help build. Signal early that this course works differently from the assignment-driven courses they're used to. ~2-3 min.");

  // ===== 2 Hook =====
  s = mk(); s.background = { color: C.navy };
  s.addImage({ data: await ic(FA.FaQuoteLeft, "2A3F5E"), x: 0.75, y: 0.75, w: 1.0, h: 1.0 });
  s.addText("Nearly every big open-source project you rely on started as one or two people deciding a problem was worth solving.", { x: 1.0, y: 2.0, w: 11.3, h: 2.4, color: C.white, fontFace: F.head, fontSize: 34, bold: true, margin: 0, lineSpacingMultiple: 1.08 });
  s.addText("This semester, that's you.", { x: 1.0, y: 4.75, w: 11.3, h: 0.9, color: C.amber, fontFace: F.head, fontSize: 33, bold: true, italic: true, margin: 0 });
  s.addNotes("This is the emotional open — deliver it, don't read it. Say the line, then name two or three open-source projects you personally love as living proof that big things start small. Then land the turn slowly: \"…and this semester, that's you — maybe with a teammate,\" and let it sit a beat before advancing. The goal is to make founding feel attainable rather than mythical. ~2 min.");

  // ===== 3 Founders bench (4 examples w/ 'now') =====
  s = mk(); s.background = { color: C.white };
  header(s, "It starts with one or two people", "They all began as somebody's decision");
  const founders = [
    ["Linux", "Linus Torvalds · 1991", "A free Unix-like kernel for his own PC — \"just a hobby.\"", "Runs most of the internet, all Android phones, and the world's supercomputers."],
    ["Python", "Guido van Rossum · 1989", "A holiday side project: a language he'd actually enjoy using.", "A top-tier language powering the web, data science, and most of modern AI."],
    ["OBS Studio", "Hugh \"Jim\" Bailey · 2012", "A free way to record and stream video.", "What essentially every streamer and screen-recorder uses."],
    ["MySQL", "Widenius & Axmark · 1995", "A fast, free relational database when the options were costly or slow.", "One of the most widely used databases in the world."]
  ];
  const fcw = 5.9, fch = 2.0, fgx = 0.3, fgy = 0.2, fx0 = 0.6, fy0 = 2.1;
  founders.forEach((f, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = fx0 + col * (fcw + fgx), y = fy0 + row * (fch + fgy);
    card(s, x, y, fcw, fch, C.cardBg);
    s.addText(f[0], { x: x + 0.25, y: y + 0.15, w: fcw - 0.5, h: 0.4, color: C.teal, fontFace: F.body, fontSize: 20.5, bold: true, margin: 0 });
    s.addText(f[1], { x: x + 0.25, y: y + 0.56, w: fcw - 0.5, h: 0.28, color: C.slate, fontFace: F.body, fontSize: 13.5, margin: 0 });
    s.addText([{ text: "The itch:  ", options: { bold: true, color: C.ink } }, { text: f[2], options: { color: C.ink } }], { x: x + 0.25, y: y + 0.86, w: fcw - 0.5, h: 0.5, fontFace: F.body, fontSize: 14, margin: 0, lineSpacingMultiple: 1.0 });
    s.addText([{ text: "Now:  ", options: { bold: true, color: C.tealDk } }, { text: f[3], options: { color: C.ink } }], { x: x + 0.25, y: y + 1.37, w: fcw - 0.5, h: 0.5, fontFace: F.body, fontSize: 14, margin: 0, lineSpacingMultiple: 1.0 });
  });
  s.addText([
    { text: "MySQL shows the pattern that matters most for you: ", options: { color: C.ink } },
    { text: "two founders with a shared itch — the shape your teams will be.", options: { color: C.tealDk, bold: true } }
  ], { x: 0.6, y: 6.45, w: 12.1, h: 0.45, fontFace: F.body, fontSize: 15.5, italic: true, align: "center", margin: 0 });
  footer(s);
  s.addNotes("Only four examples, on purpose, so you can dwell on each — resist rushing. For each, contrast the humble \"itch\" with the \"now\" to show the arc from one person's decision to world-scale impact. The through-line to stress: every one of them attracted collaborators fast, which is exactly the arc this course puts students on. End on MySQL — two founders with a shared itch is the shape most of their teams will take. ~3-4 min.");

  // ===== 4 What this course is =====
  s = mk(); s.background = { color: C.white };
  header(s, "What this course is", "From building assignments → to founding a project");
  const wtc = [
    [FA.FaSearch, "Find a problem worth solving", "Most courses hand you the problem. Here you go looking for a real one."],
    [FA.FaCheckCircle, "Prove it's worth solving", "Show there's a real need, a real user, and a feasible path."],
    [FA.FaLayerGroup, "Lay a foundation others build on", "Not just code — the docs, norms, and on-ramps a project needs to grow."]
  ];
  for (let i = 0; i < wtc.length; i++) {
    const y = 2.05 + i * 1.15;
    card(s, 0.6, y, 8.7, 1.0, C.cardBg);
    await iconCircle(s, wtc[i][0], 0.85, y + 0.24, 0.52, C.teal);
    s.addText(wtc[i][1], { x: 1.6, y: y + 0.14, w: 7.5, h: 0.36, color: C.ink, fontFace: F.body, fontSize: 18.5, bold: true, margin: 0 });
    s.addText(wtc[i][2], { x: 1.6, y: y + 0.5, w: 7.55, h: 0.42, color: C.slate, fontFace: F.body, fontSize: 14.5, margin: 0 });
  }
  card(s, 9.55, 2.05, 3.15, 3.25, C.navy);
  await iconCircle(s, FA.FaUserCog, 10.75, 2.5, 0.75, C.amber, C.navy);
  s.addText("You are the founder / maintainer", { x: 9.8, y: 3.4, w: 2.65, h: 1.0, color: C.white, fontFace: F.head, fontSize: 21.5, bold: true, align: "center", margin: 0 });
  s.addText("You understand the need, make the calls, write the norms, and open the doors.", { x: 9.8, y: 4.4, w: 2.65, h: 0.8, color: "AEC2D3", fontFace: F.body, fontSize: 14.5, align: "center", margin: 0 });
  footer(s);
  s.addNotes("The core reframe of the whole course, so slow down. Most of their courses hand them the problem; here they go find a real one, prove it's worth solving, and lay a foundation others can build on. The navy card is the punchline: they are the founder/maintainer, not a contributor to someone else's vision. Tee up the contributor-vs-founder table on the next slide, which makes this concrete. ~2-3 min.");

  // ===== 5 Contributor vs Founder =====
  s = mk(); s.background = { color: C.white };
  header(s, "The shift we're after", "Contributor vs. Founder");
  const rows = [
    ["The problem", "Picks up an existing issue", "Find and prove a problem worth solving"],
    ["The users", "Already known to the maintainers", "You discover who they are & what they need"],
    ["Decisions", "Work within maintainers' direction", "Make and defend architecture, scope, tech"],
    ["The rules", "Learn and follow the norms", "Write the norms (license, CONTRIBUTING, CoC)"],
    ["Future contributors", "The newcomer being welcomed", "Build the on-ramps that welcome newcomers"],
    ["Success looks like", "A merged pull request", "A launched project people want to help build"]
  ];
  const tHead = [
    { text: "", options: { fill: { color: C.white } } },
    { text: "CONTRIBUTOR", options: { fill: { color: C.slate }, color: C.white, bold: true, align: "center", fontFace: F.body, fontSize: 15 } },
    { text: "FOUNDER  ·  YOU, THIS COURSE", options: { fill: { color: C.teal }, color: C.white, bold: true, align: "center", fontFace: F.body, fontSize: 15 } }
  ];
  const tBody = rows.map((r, i) => {
    const z = i % 2 ? "EEF3F6" : C.white;
    return [
      { text: r[0], options: { fill: { color: z }, color: C.tealDk, bold: true, fontFace: F.body, fontSize: 15 } },
      { text: r[1], options: { fill: { color: z }, color: C.slate, fontFace: F.body, fontSize: 14.5 } },
      { text: r[2], options: { fill: { color: z }, color: C.ink, bold: true, fontFace: F.body, fontSize: 14.5 } }
    ];
  });
  s.addTable([tHead, ...tBody], { x: 0.6, y: 2.05, w: 12.1, colW: [2.3, 4.6, 5.2], rowH: 0.62, valign: "middle", margin: [3, 6, 3, 6], border: { type: "solid", color: "FFFFFF", pt: 2 } });
  s.addText("Don't disparage the contributor role — it's valuable. Founding just demands an extra set of muscles.", { x: 0.6, y: 6.7, w: 12.1, h: 0.35, color: C.slate, fontFace: F.body, fontSize: 14, italic: true, align: "center", margin: 0 });
  footer(s);
  s.addNotes("Walk the table row by row and read the founder (right) column aloud — that entire column IS the course. Be explicit that you're not disparaging the contributor role: it's valuable and most of them have done it; founding just demands an extra set of muscles — finding the problem, deciding, writing the norms, building the on-ramps. Pause on the last row: success here isn't a merged PR, it's a launched project people want to help build. ~3 min.");

  // ===== 6 Where we're headed =====
  s = mk(); s.background = { color: C.white };
  header(s, "Where we're headed", "The culminating experience");
  const dest = [
    [FA.FaLaptopCode, "Working MVP", "A vertical slice that proves the project's core viability."],
    [FA.FaFolderOpen, "Open-source-ready repo", "License, governance, onboarding — ready for contributors."],
    [FA.FaBoxOpen, "Launch & Onboarding Package", "Roadmap, known issues, architecture — so others can join."],
    [FA.FaUsers, "Final pitch + demo", "Public demo day — capstone faculty invited."]
  ];
  const dw = 2.92, dh = 2.5, dgx = 0.14;
  for (let i = 0; i < 4; i++) {
    const x = 0.6 + i * (dw + dgx);
    card(s, x, 2.05, dw, dh, C.cardBg);
    await iconCircle(s, dest[i][0], x + dw / 2 - 0.35, 2.32, 0.7, C.teal);
    s.addText(dest[i][1], { x: x + 0.16, y: 3.15, w: dw - 0.32, h: 0.6, color: C.ink, fontFace: F.body, fontSize: 17, bold: true, align: "center", margin: 0 });
    s.addText(dest[i][2], { x: x + 0.18, y: 3.75, w: dw - 0.36, h: 0.75, color: C.slate, fontFace: F.body, fontSize: 14, align: "center", margin: 0 });
  }
  card(s, 0.6, 4.95, 12.1, 0.95, C.navy);
  s.addText([
    { text: "What distinguishes a passing student is not strong code alone — but a ", options: { color: C.white } },
    { text: "founded, defensible, contributor-ready project.", options: { color: C.amber, bold: true } }
  ], { x: 0.9, y: 4.95, w: 11.5, h: 0.95, fontFace: F.body, fontSize: 18, align: "center", valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("Show the destination so every later assignment has a visible target: a working MVP, an open-source-ready repo, a launch & onboarding package, and the public demo. Land the navy banner hard — what distinguishes a passing student is not strong code alone but a founded, defensible, contributor-ready project. This is where you gently preempt the \"I'll just build something cool\" instinct. ~2 min.");

  // ===== 7 Roadmap today -> demo day =====
  s = mk(); s.background = { color: C.white };
  header(s, "The roadmap", "From today to Demo Day");
  s.addText("Every assignment is a step toward one public demo.", { x: 0.6, y: 1.6, w: 12.1, h: 0.35, color: C.slate, fontFace: F.body, fontSize: 16, italic: true, margin: 0 });
  const road = [
    ["Sep 2", "Kickoff", false],
    ["Wks 1–3", "Discover — Idea Briefs", false],
    ["Week 5", "Pitch & form teams", false],
    ["Wks 6–8", "Design & found the repo", false],
    ["Wks 9–12", "Build the MVP", false],
    ["Finals", "Launch & Demo Day", true]
  ];
  const lineY = 3.7, x0 = 1.5, x1 = 12.4, step = (x1 - x0) / (road.length - 1);
  s.addShape(pres.shapes.LINE, { x: x0, y: lineY, w: x1 - x0, h: 0, line: { color: C.teal, width: 2.5 } });
  for (let i = 0; i < road.length; i++) {
    const cx = x0 + i * step, hi = road[i][2];
    const dd = hi ? 0.5 : 0.34;
    s.addShape(pres.shapes.OVAL, { x: cx - dd / 2, y: lineY - dd / 2, w: dd, h: dd, fill: { color: hi ? C.amber : C.teal }, line: { color: C.white, width: 2 } });
    s.addText(road[i][0], { x: cx - 1.05, y: lineY - 1.15, w: 2.1, h: 0.6, color: hi ? C.amber : C.tealDk, fontFace: F.body, fontSize: 17, bold: true, align: "center", valign: "bottom", margin: 0 });
    s.addText(road[i][1], { x: cx - 1.05, y: lineY + 0.35, w: 2.1, h: 0.9, color: C.ink, fontFace: F.body, fontSize: 14.5, bold: hi, align: "center", valign: "top", margin: 0, lineSpacingMultiple: 1.0 });
  }
  await iconCircle(s, FA.FaFlagCheckered, x1 - 0.28, lineY + 1.35, 0.56, C.navy, C.amber);
  footer(s);
  s.addNotes("Orient them in time. Discovery is individual for the first five weeks; teams form at the Week-5 pitch; then design, build, and launch, all landing on one public demo day. Stress that every assignment is a deliberate step toward that demo, not busywork. Reassure anyone anxious about teams — that's weeks away and they'll have real data by then. ~2 min.");

  // ===== 8 Course outcomes (+ communication through-line) =====
  s = mk(); s.background = { color: C.white };
  header(s, "What you'll be able to do", "By the end of the course");
  const outs = [
    [FA.FaSearch, "Discover a real need", "Find a real user; articulate the problem and success criteria.", false],
    [FA.FaBalanceScale, "Judge feasibility & scope", "Weigh risk and breadth; cut an ambitious vision to a one-semester MVP.", false],
    [FA.FaProjectDiagram, "Design the system & the project", "Architecture, data, interfaces, and the technology choices behind them.", false],
    [FA.FaCodeBranch, "Found & build it in the open", "License, governance, git workflows, and a working MVP others can join.", false],
    [FA.FaComments, "Communicate it — persuasively & precisely", "Proposals, pitches, design docs, issues, PRs, reviews, launch docs.", true]
  ];
  for (let i = 0; i < outs.length; i++) {
    const y = 2.05 + i * 0.9, hi = outs[i][3];
    if (hi) card(s, 0.6, y - 0.04, 7.7, 0.82, "FCF3E3");
    await iconCircle(s, outs[i][0], 0.75, y + 0.06, 0.55, hi ? C.amber : C.teal, hi ? C.white : C.white);
    s.addText(outs[i][1], { x: 1.55, y: y + 0.0, w: 6.6, h: 0.36, color: C.ink, fontFace: F.body, fontSize: 17, bold: true, margin: 0 });
    s.addText(outs[i][2], { x: 1.55, y: y + 0.37, w: 6.65, h: 0.4, color: C.slate, fontFace: F.body, fontSize: 14, margin: 0 });
  }
  card(s, 8.5, 2.0, 4.2, 4.55, C.navy);
  await iconCircle(s, FA.FaComments, 8.8, 2.3, 0.6, C.amber, C.navy);
  s.addText("The through-line: technical communication", { x: 9.55, y: 2.32, w: 3.0, h: 0.6, color: C.white, fontFace: F.body, fontSize: 17, bold: true, valign: "middle", margin: 0 });
  s.addText("Almost everything you produce here is an act of technical communication — the proposal, the pitch, the design doc, the issues, the PRs, the reviews, the launch docs.\n\nWe treat writing and reviewing clearly as core engineering work, not a soft skill — you'll do more of it than writing fresh code.", { x: 8.75, y: 2.95, w: 3.75, h: 3.45, color: "CFE0E9", fontFace: F.body, fontSize: 13, margin: 0, lineSpacingMultiple: 1.03 });
  s.addText("These are the course outcomes — what you'll do by end of term — distinct from today's session objectives.", { x: 0.6, y: 6.65, w: 7.7, h: 0.35, color: C.slate, fontFace: F.body, fontSize: 13.5, italic: true, margin: 0 });
  footer(s);
  s.addNotes("Distinguish these from today's session objectives — these are what they'll be able to DO by end of term. Walk the five capabilities briefly, then spotlight the navy card: technical communication is the through-line — proposals, pitches, design docs, issues, PRs, reviews, launch docs. Say plainly they'll do more writing and reviewing than fresh coding, and that we treat it as core engineering work, not a soft skill. This is the outcome students most underrate. ~2-3 min.");

  // ===== 9 BYU education =====
  s = mk(); s.background = { color: "EEF4F3" };
  header(s, "Why this fits a BYU education", "Skill, put to work, in service of others");
  const aims = [
    [FA.FaHandsHelping, "Serve a real need", "Build for real people, not a toy."],
    [FA.FaBookReader, "Teach yourself", "Learn what you don't yet know — the habit of a lifetime."],
    [FA.FaBalanceScale, "Act with integrity", "Toward users, teammates, and those who join you."],
    [FA.FaStar, "Do work of consequence", "Something real, that lasts, that others build on."]
  ];
  for (let i = 0; i < 4; i++) {
    const y = 2.0 + i * 0.98;
    await iconCircle(s, aims[i][0], 0.7, y, 0.62, C.teal);
    s.addText(aims[i][1], { x: 1.5, y: y + 0.02, w: 6.7, h: 0.35, color: C.ink, fontFace: F.body, fontSize: 19, bold: true, margin: 0 });
    s.addText(aims[i][2], { x: 1.5, y: y + 0.38, w: 6.7, h: 0.3, color: C.slate, fontFace: F.body, fontSize: 14.5, margin: 0 });
  }
  card(s, 8.7, 2.0, 4.0, 3.9, C.white);
  s.addText("The five C's this course leans on", { x: 8.95, y: 2.25, w: 3.5, h: 0.5, color: C.tealDk, fontFace: F.body, fontSize: 16, bold: true, align: "center", margin: 0 });
  const cs = ["Curious", "Christlike", "Collaborative", "Capable", "Creative"];
  cs.forEach((c, i) => {
    const y = 2.9 + i * 0.57;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 9.1, y, w: 3.2, h: 0.46, fill: { color: "EAF3F2" }, line: { type: "none" }, rectRadius: 0.23 });
    s.addText(c, { x: 9.1, y, w: 3.2, h: 0.46, color: C.tealDk, fontFace: F.body, fontSize: 16, bold: true, align: "center", valign: "middle", margin: 0 });
  });
  footer(s);
  s.addNotes("Keep this brief and authentic — the gospel and eternal-perspective framing lands best from you, live, not from the slide. The four aims map cleanly: serve a real need, teach yourself, act with integrity, do work of consequence. Touch the five C's lightly rather than laboring them. Don't over-spiritualize; let the connection feel natural. ~1-2 min.");

  // ===== 10 Good vs weak =====
  s = mk(); s.background = { color: C.white };
  header(s, "Good vs. weak project ideas", "Would it survive a semester? Could a team grow into it? Does anyone need it?");
  card(s, 0.6, 2.15, 5.9, 4.15, "EAF4EE");
  await iconCircle(s, FA.FaCheckCircle, 0.9, 2.42, 0.6, C.green);
  s.addText("STRONG", { x: 1.65, y: 2.5, w: 4.5, h: 0.45, color: C.green, fontFace: F.body, fontSize: 19.5, bold: true, valign: "middle", margin: 0 });
  const strong = [
    ["Campus resource reservation", "Practice rooms, lab gear, makerspace. Real reachable users; rich; clear one-semester MVP; extensible."],
    ["Volunteer / shift coordination", "For a nonprofit or a ward activity. Service-oriented; roles, scheduling, reminders, reporting."]
  ];
  strong.forEach((it, i) => {
    const y = 3.25 + i * 1.45;
    s.addText(it[0], { x: 0.95, y, w: 5.25, h: 0.4, color: C.ink, fontFace: F.body, fontSize: 17.5, bold: true, margin: 0 });
    s.addText(it[1], { x: 0.95, y: y + 0.4, w: 5.25, h: 0.95, color: C.slate, fontFace: F.body, fontSize: 14.5, margin: 0, lineSpacingMultiple: 1.03 });
  });
  card(s, 6.8, 2.15, 5.9, 4.15, "FBECE8");
  await iconCircle(s, FA.FaTimesCircle, 7.1, 2.42, 0.6, C.coral);
  s.addText("WEAK", { x: 7.85, y: 2.5, w: 4.5, h: 0.45, color: C.coral, fontFace: F.body, fontSize: 19.5, bold: true, valign: "middle", margin: 0 });
  const weak = [
    ["Generic to-do / habit tracker", "No unmet need, no external users, low richness."],
    ["A clone of a major app (Twitter, Spotify)", "Great for learning — which is why design courses build them — but not founding: the need is already met."]
  ];
  weak.forEach((it, i) => {
    const y = 3.25 + i * 1.45;
    s.addText(it[0], { x: 7.15, y, w: 5.25, h: 0.4, color: C.ink, fontFace: F.body, fontSize: 17.5, bold: true, margin: 0 });
    s.addText(it[1], { x: 7.15, y: y + 0.4, w: 5.25, h: 0.95, color: C.slate, fontFace: F.body, fontSize: 14.5, margin: 0, lineSpacingMultiple: 1.03 });
  });
  footer(s);
  s.addNotes("Show about two examples per side; don't read all the text. Strong ideas have real, reachable users, richness, and a clear one-semester MVP; weak ones have no unmet need (the generic to-do app) or a need already met (a clone). Handle the clone point gently — cloning is great for LEARNING, which is exactly why the design prereq builds them, just not for FOUNDING. Let that distinction surface in discussion rather than lecturing it. ~2-3 min.");

  // ===== 11 Selection criteria =====
  s = mk(); s.background = { color: C.white };
  header(s, "The shared yardstick", "What we're selecting for");
  const crit = [
    ["Serves a real need for a real, reachable userbase", true],
    ["Rich / broad — exercises many engineering dimensions", true],
    ["Open-source-worthy", false],
    ["Has a one-semester MVP (~5 real build weeks)", false],
    ["Extensible", false],
    ["Tractable stack — complexity only where it earns its keep", false],
    ["Room to grow — others can join and build on it", false]
  ];
  for (let i = 0; i < crit.length; i++) {
    const y = 2.0 + i * 0.58;
    const star = crit[i][1];
    await iconCircle(s, star ? FA.FaStar : FA.FaCheck, 0.7, y, 0.46, star ? C.amber : C.teal);
    s.addText(crit[i][0], { x: 1.4, y, w: 8.0, h: 0.46, color: C.ink, fontFace: F.body, fontSize: 17.5, bold: star, valign: "middle", margin: 0 });
  }
  card(s, 9.7, 2.0, 3.0, 4.0, C.navy);
  await iconCircle(s, FA.FaBullseye, 10.75, 2.35, 0.9, C.amber, C.navy);
  s.addText("The north star", { x: 9.9, y: 3.4, w: 2.6, h: 0.4, color: C.white, fontFace: F.head, fontSize: 19.5, bold: true, align: "center", margin: 0 });
  s.addText("The two starred criteria — real need and richness — are the ones students most often miss.", { x: 9.9, y: 3.85, w: 2.6, h: 1.6, color: "AEC2D3", fontFace: F.body, fontSize: 15, align: "center", margin: 0 });
  card(s, 0.6, 6.1, 12.1, 0.64, C.amber);
  s.addText([
    { text: "A skill, not just a checklist:  ", options: { bold: true, color: C.navy } },
    { text: "you'll score ideas against criteria all semester — and the method transfers to any idea you'll ever weigh (a startup, a proposal at work).", options: { color: C.navy } }
  ], { x: 0.9, y: 6.1, w: 11.5, h: 0.64, fontFace: F.body, fontSize: 13.5, valign: "middle", align: "center", margin: 0, lineSpacingMultiple: 1.02 });
  footer(s);
  s.addNotes("This is the shared yardstick for the Idea Briefs. Walk the list but linger on the two starred criteria — a real need for a real, reachable userbase, and richness/breadth — because those are the two students most often miss. Note that solo projects and smaller scope are welcome. Seed the throughline (amber bar): scoring ideas against explicit criteria is a portable skill they'll use all semester — on their own ideas, on peers' pitches, on design docs and demos — and beyond the class; these seven are just what \"good\" means here. Preview that Value vs. Do-ability (Week 3) is how they'll weigh these formally. ~2 min.");

  // ===== 12 Weak -> strong =====
  s = mk(); s.background = { color: C.white };
  header(s, "Convergence in action", "Reshape a weak idea until it passes");
  const pairs = [
    ["\"A to-do app\"", "A shared task board for one specific volunteer group", "Role-based assignments and reminders. Same domain — now real users and real richness."],
    ["\"A new social network\"", "A focused coordination tool for a single community", "One club, one ward, one lab. The unbuildable version becomes a tractable vertical slice."]
  ];
  for (let i = 0; i < 2; i++) {
    const y = 2.2 + i * 1.95;
    card(s, 0.6, y, 3.4, 1.5, "FBECE8");
    s.addText(pairs[i][0], { x: 0.7, y, w: 3.2, h: 1.5, color: C.coral, fontFace: F.head, fontSize: 19.5, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addImage({ data: await ic(FA.FaArrowRight, C.amber), x: 4.15, y: y + 0.5, w: 0.55, h: 0.5 });
    card(s, 4.9, y, 7.8, 1.5, "EAF4EE");
    s.addText(pairs[i][1], { x: 5.15, y: y + 0.2, w: 7.35, h: 0.5, color: C.ink, fontFace: F.body, fontSize: 18.5, bold: true, margin: 0 });
    s.addText(pairs[i][2], { x: 5.15, y: y + 0.72, w: 7.35, h: 0.65, color: C.slate, fontFace: F.body, fontSize: 14.5, margin: 0 });
  }
  s.addText("This is the convergence move they'll make for real in the Week-3 workshop.", { x: 0.6, y: 6.35, w: 12.1, h: 0.35, color: C.slate, fontFace: F.body, fontSize: 14.5, italic: true, align: "center", margin: 0 });
  footer(s);
  s.addNotes("Model the convergence move live rather than just showing it. Take a too-small idea (\"a to-do app\") or a too-big one (\"a new social network\") and reshape it out loud against the criteria until it passes — same domain, now with real users and real richness. Tell them this is exactly the move they'll make for real in the Week-3 workshop. If time allows, invite a student to reshape one of their own. ~2 min.");

  // ===== 13 Founder mindset =====
  s = mk(); s.background = { color: C.white };
  header(s, "The founder / maintainer mindset", "What a founder owns");
  const owns = [
    [FA.FaUsers, "The user need", "Understood deeply enough to speak for it."],
    [FA.FaBalanceScale, "The decisions", "Made and defended — architecture, scope, stack."],
    [FA.FaRoute, "The pathways", "On-ramps that turn strangers into contributors."],
    [FA.FaGavel, "The norms", "The rules the project runs by — you write them."]
  ];
  const ow = 2.92, oh = 2.35;
  for (let i = 0; i < 4; i++) {
    const x = 0.6 + i * (ow + 0.14);
    card(s, x, 2.05, ow, oh, C.cardBg);
    await iconCircle(s, owns[i][0], x + 0.25, 2.3, 0.62, C.teal);
    s.addText(owns[i][1], { x: x + 0.2, y: 3.05, w: ow - 0.4, h: 0.4, color: C.ink, fontFace: F.body, fontSize: 18, bold: true, margin: 0 });
    s.addText(owns[i][2], { x: x + 0.2, y: 3.45, w: ow - 0.4, h: 0.85, color: C.slate, fontFace: F.body, fontSize: 14.5, margin: 0 });
  }
  card(s, 0.6, 4.72, 12.1, 1.15, C.navy);
  await iconCircle(s, FA.FaHandshake, 0.95, 5.0, 0.6, C.amber, C.navy);
  s.addText([
    { text: "The sponsor idea:  ", options: { color: C.amber, bold: true } },
    { text: "understand a real user's need well enough to speak for it — that's a central job of this course.", options: { color: C.white } }
  ], { x: 1.75, y: 4.72, w: 10.7, h: 1.15, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("Four things a founder owns: the user need, the decisions, the pathways, and the norms. Land the navy banner hard — the central job of the course is to understand a real user's need well enough to speak for it. Set expectations honestly: real users are the ideal we push toward, and a documented persona/proxy is an accepted substitute this iteration (they'll build one in Week 2). ~2 min.");

  // ===== 14 Founder decisions (with setup) =====
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: 0.62, y: 0.54, w: 0.14, h: 0.14, fill: { color: C.amber } });
  s.addText("A FOUNDER DECISION", { x: 0.86, y: 0.45, w: 11.5, h: 0.32, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText("What would you do?", { x: 0.6, y: 0.8, w: 12.1, h: 0.7, color: C.white, fontFace: F.head, fontSize: 28, bold: true, margin: 0 });
  const vig = [
    [FA.FaBan, "Saying no to a feature",
      "Your campus-resource reservation tool is catching on. A prominent user asks for polished Google Calendar sync.",
      "But v1 still can't reliably prevent double-bookings. You log it \"later\" and keep the team on the core booking flow.",
      "A contributor picks from the tickets that exist; a founder decides which tickets exist."],
    [FA.FaTools, "Choosing the boring stack",
      "For the volunteer-coordination tool, you can reach for a hot new framework — or the plain stack you and your teammate already know.",
      "You'll debug it at 1 a.m. and onboard the next contributor into it. You pick boring.",
      "Technology you can own, explain, and support — not just show off."],
    [FA.FaUserPlus, "The first outside contributor",
      "A stranger opens a PR on your hobby-community tracker: a feature you didn't ask for, in a style that doesn't fit.",
      "Reject it and lose a collaborator — or thank them, request changes, and keep them engaged?",
      "How you treat a stranger's PR is the project's culture."]
  ];
  const vw = 3.95, vgx = 0.13;
  for (let i = 0; i < 3; i++) {
    const x = 0.6 + i * (vw + vgx);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.75, w: vw, h: 4.95, fill: { color: "1E3352" }, line: { type: "none" }, rectRadius: 0.09, shadow: mkShadow() });
    await iconCircle(s, vig[i][0], x + 0.3, 2.0, 0.56, C.amber, C.navy);
    s.addText(vig[i][1], { x: x + 0.28, y: 2.72, w: vw - 0.56, h: 0.45, color: C.white, fontFace: F.body, fontSize: 18, bold: true, margin: 0 });
    s.addText([{ text: "Setup — ", options: { bold: true, color: "8FA6BC" } }, { text: vig[i][2], options: { color: "D5E1EC" } }], { x: x + 0.28, y: 3.2, w: vw - 0.56, h: 1.3, fontFace: F.body, fontSize: 13.5, margin: 0, lineSpacingMultiple: 1.02 });
    s.addText(vig[i][3], { x: x + 0.28, y: 4.5, w: vw - 0.56, h: 1.15, color: "AEC2D3", fontFace: F.body, fontSize: 13.5, margin: 0, lineSpacingMultiple: 1.02 });
    s.addText(vig[i][4], { x: x + 0.28, y: 5.68, w: vw - 0.56, h: 0.95, color: C.amber, fontFace: F.body, fontSize: 14, italic: true, bold: true, margin: 0, lineSpacingMultiple: 1.02 });
  }
  footer(s, "7E92A8");
  s.addNotes("The interactive beat — three vignettes. For each, pose \"what would you do?\" and give ~30 seconds for reactions before you reveal the call. Structure each as setup, then the tension, then the lesson: saying no to a feature (a founder decides which tickets exist), the boring stack (own it, don't show off), the first outside PR (how you treat a stranger's PR IS the culture). The unifying lesson: serve the user, not your ego. ~4-5 min.");

  // ===== 15 Course session flow (studio + workshop) =====
  s = mk(); s.background = { color: C.white };
  header(s, "How the semester works — part 1", "The studio model: how a typical week runs");
  card(s, 0.6, 2.05, 5.95, 3.5, C.cardBg);
  await iconCircle(s, FA.FaChalkboardTeacher, 0.9, 2.32, 0.6, C.teal);
  s.addText("Monday — Session A", { x: 1.65, y: 2.39, w: 4.6, h: 0.45, color: C.ink, fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "Short lecture + worked examples", options: { bullet: { indent: 15 }, breakLine: true, paraSpaceAfter: 10 } },
    { text: "Guided discussion and critique", options: { bullet: { indent: 15 }, breakLine: true, paraSpaceAfter: 10 } },
    { text: "We frame the topic and look at strong vs. weak examples together", options: { bullet: { indent: 15 } } }
  ], { x: 0.95, y: 3.25, w: 5.3, h: 2.2, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0 });
  card(s, 6.75, 2.05, 5.95, 3.5, C.cardBg);
  await iconCircle(s, FA.FaTools, 7.05, 2.32, 0.6, C.amber, C.white);
  s.addText("Wednesday — Session B", { x: 7.8, y: 2.39, w: 4.6, h: 0.45, color: C.ink, fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "Workshop, lab, peer review, or demo", options: { bullet: { indent: 15 }, breakLine: true, paraSpaceAfter: 10 } },
    { text: "Studio work with the instructor as coach", options: { bullet: { indent: 15 }, breakLine: true, paraSpaceAfter: 10 } },
    { text: "Often released early — we won't always use the full 75 minutes", options: { bullet: { indent: 15 } } }
  ], { x: 7.1, y: 3.25, w: 5.3, h: 2.2, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0 });
  s.addText("The repeating cycle", { x: 0.6, y: 5.75, w: 12.1, h: 0.35, color: C.tealDk, fontFace: F.body, fontSize: 16, bold: true, align: "center", margin: 0 });
  const cyc = ["Draft", "Review", "Revise", "Build", "Reflect"];
  const cw2 = 2.05, cgap = 0.35, ctot = cyc.length * cw2 + (cyc.length - 1) * cgap, cstart = (13.3 - ctot) / 2;
  for (let i = 0; i < cyc.length; i++) {
    const x = cstart + i * (cw2 + cgap);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 6.2, w: cw2, h: 0.62, fill: { color: "EAF3F2" }, line: { type: "none" }, rectRadius: 0.12 });
    s.addText(cyc[i], { x, y: 6.2, w: cw2, h: 0.62, color: C.tealDk, fontFace: F.body, fontSize: 16, bold: true, align: "center", valign: "middle", margin: 0 });
    if (i < cyc.length - 1) s.addImage({ data: await ic(FA.FaArrowRight, C.slate), x: x + cw2 + 0.06, y: 6.37, w: 0.24, h: 0.28 });
  }
  footer(s);
  s.addNotes("Explain the studio rhythm concretely: Monday teaches (short lecture, worked examples, critique), Wednesday does (workshop, lab, peer review, or demo — often released early). The repeating engine is draft, review, revise, build, reflect — call that the loop that drives the whole course. Reassure them Wednesdays won't always use the full 75 minutes. ~2 min.");

  // ===== 16 The CPS method + four stages =====
  s = mk(); s.background = { color: C.white };
  header(s, "How the semester works — part 2", "The CPS method — how we'll work through problems");
  s.addText([
    { text: "Creative Problem Solving (Osborn–Parnes) ", options: { bold: true, color: C.ink } },
    { text: "is a structured way to move from a messy problem to a chosen solution. The premise: creativity is a skill you can practice — how you approach a problem changes your odds of a breakthrough. It runs in four stages.", options: { color: C.ink } }
  ], { x: 0.6, y: 1.65, w: 12.1, h: 0.8, fontFace: F.body, fontSize: 16.5, margin: 0, lineSpacingMultiple: 1.05 });
  const stages = [
    ["1", "Clarification", "Explore the problem space; gather facts; frame the real problem."],
    ["2", "Ideation", "Generate many ideas; defer judgment; prefer quantity."],
    ["3", "Development", "Strengthen and refine the best ideas against goals and constraints."],
    ["4", "Implementation", "Plan, act, and socialize the chosen solution."]
  ];
  const sw = 2.92, sgx = 0.14;
  for (let i = 0; i < 4; i++) {
    const x = 0.6 + i * (sw + sgx);
    card(s, x, 2.7, sw, 2.9, C.cardBg);
    s.addShape(pres.shapes.OVAL, { x: x + sw / 2 - 0.42, y: 2.95, w: 0.84, h: 0.84, fill: { color: C.teal } });
    s.addText(stages[i][0], { x: x + sw / 2 - 0.42, y: 2.95, w: 0.84, h: 0.84, color: C.white, fontFace: F.head, fontSize: 31, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(stages[i][1], { x: x + 0.15, y: 3.95, w: sw - 0.3, h: 0.45, color: C.ink, fontFace: F.body, fontSize: 18, bold: true, align: "center", margin: 0 });
    s.addText(stages[i][2], { x: x + 0.2, y: 4.42, w: sw - 0.4, h: 1.0, color: C.slate, fontFace: F.body, fontSize: 14, align: "center", margin: 0, lineSpacingMultiple: 1.03 });
    if (i < 3) s.addImage({ data: await ic(FA.FaChevronRight, C.amber), x: x + sw + 0.0, y: 4.0, w: 0.22, h: 0.3 });
  }
  s.addText("We'll map these four stages onto the five phases of the course next.", { x: 0.6, y: 5.85, w: 12.1, h: 0.4, color: C.slate, fontFace: F.body, fontSize: 15, italic: true, align: "center", margin: 0 });
  footer(s);
  s.addNotes("They've done no reading yet — this is their first exposure to Creative Problem Solving, so keep it light. Give the premise (creativity is a practicable skill; how you approach a problem changes your odds of a breakthrough) and the four stage names with one line each: Clarification, Ideation, Development, Implementation. Don't drill it — the Session 2 reading and workshop go deep. This just sets up the CPS-to-phases mapping. ~2 min.");

  // ===== 17 Divergent vs Convergent =====
  s = mk(); s.background = { color: C.white };
  header(s, "The heart of CPS", "Two modes: divergent & convergent thinking");
  s.addText("Every stage uses both. Generate many options before you narrow to one.", { x: 0.6, y: 1.62, w: 12.1, h: 0.35, color: C.slate, fontFace: F.body, fontSize: 16, italic: true, margin: 0 });
  card(s, 0.6, 2.2, 5.9, 3.35, "EAF4EE");
  await iconCircle(s, FA.FaExpandArrowsAlt, 0.9, 2.5, 0.62, C.green);
  s.addText("Divergent", { x: 1.7, y: 2.57, w: 4.5, h: 0.5, color: C.green, fontFace: F.body, fontSize: 20.5, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "Generate many different ideas", options: { bullet: { indent: 15 }, breakLine: true, paraSpaceAfter: 9 } },
    { text: "Defer judgment — no evaluating yet", options: { bullet: { indent: 15 }, breakLine: true, paraSpaceAfter: 9 } },
    { text: "Prefer quantity; welcome wild ideas", options: { bullet: { indent: 15 }, breakLine: true, paraSpaceAfter: 9 } },
    { text: "Build on others' ideas", options: { bullet: { indent: 15 } } }
  ], { x: 0.95, y: 3.35, w: 5.25, h: 2.1, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0 });
  card(s, 6.8, 2.2, 5.9, 3.35, "E9F0F4");
  await iconCircle(s, FA.FaCompressArrowsAlt, 7.1, 2.5, 0.62, C.teal);
  s.addText("Convergent", { x: 7.9, y: 2.57, w: 4.5, h: 0.5, color: C.tealDk, fontFace: F.body, fontSize: 20.5, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "Narrow many ideas to the best", options: { bullet: { indent: 15 }, breakLine: true, paraSpaceAfter: 9 } },
    { text: "Apply judgment against goals & constraints", options: { bullet: { indent: 15 }, breakLine: true, paraSpaceAfter: 9 } },
    { text: "Decide with logic and evidence", options: { bullet: { indent: 15 }, breakLine: true, paraSpaceAfter: 9 } },
    { text: "Keep the novelty alive", options: { bullet: { indent: 15 } } }
  ], { x: 7.15, y: 3.35, w: 5.25, h: 2.1, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0 });
  card(s, 0.6, 5.75, 12.1, 1.0, C.navy);
  await iconCircle(s, FA.FaLightbulb, 0.95, 6.0, 0.5, C.amber, C.navy);
  s.addText([
    { text: "Why diverge first?  ", options: { color: C.amber, bold: true } },
    { text: "Groups that generate a pile of ideas before judging any produce better solutions than those that judge as they go. (It's why the Idea Briefs ask for three, not one.)", options: { color: C.white } }
  ], { x: 1.65, y: 5.75, w: 10.8, h: 1.0, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.02 });
  footer(s);
  s.addNotes("This is the heart of what we emphasize, so give it a moment. Every stage uses both modes: generate widely (defer judgment, prefer quantity, welcome wild ideas, build on others') before you narrow (judge against goals and constraints, decide with evidence, keep the novelty alive). Use the research hook in the navy banner to motivate deferring judgment — groups that pile up ideas before judging outperform those that judge as they go, which is why the Idea Briefs ask for three, not one. The full CPS run and the egg-drop exercise come Sep 9. ~2-3 min.");

  // ===== 18 CPS -> phases =====
  s = mk(); s.background = { color: C.white };
  header(s, "The arc of the semester", "The four CPS stages → the five course phases");
  const ph = [
    ["Clarification", "Clarify & Explore", "1–3"],
    ["Ideation", "Ideate & Pitch → form teams", "4–5"],
    ["Development", "Develop & Design", "6–8"],
    ["Implementation", "Implement, Build → Launch & Reflect", "9–14"]
  ];
  const phHead = ["CPS STAGE", "COURSE PHASE", "WEEKS"].map(h => ({ text: h, options: { fill: { color: C.teal }, color: C.white, bold: true, fontFace: F.body, fontSize: 15, align: "left" } }));
  const phBody = ph.map((r, i) => {
    const z = i % 2 ? "EEF3F6" : C.white;
    return [
      { text: r[0], options: { fill: { color: z }, color: C.tealDk, bold: true, fontFace: F.body, fontSize: 16 } },
      { text: r[1], options: { fill: { color: z }, color: C.ink, fontFace: F.body, fontSize: 16 } },
      { text: r[2], options: { fill: { color: z }, color: C.ink, bold: true, fontFace: F.body, fontSize: 16, align: "center" } }
    ];
  });
  s.addTable([phHead, ...phBody], { x: 0.6, y: 2.1, w: 12.1, colW: [3.2, 6.9, 2.0], rowH: 0.6, valign: "middle", margin: [3, 8, 3, 8], border: { type: "solid", color: "FFFFFF", pt: 2 } });
  card(s, 0.6, 5.85, 12.1, 0.95, "EEF4F3");
  s.addText([
    { text: "Weeks 1–5 individual", options: { bold: true, color: C.tealDk } },
    { text: "  →  teams form at the Week-5 pitch  →  ", options: { color: C.ink } },
    { text: "Weeks 6–14 team", options: { bold: true, color: C.tealDk } },
    { text: "   (a solo path is welcome — no one's idea gets killed out from under them).", options: { color: C.ink } }
  ], { x: 0.9, y: 5.85, w: 11.5, h: 0.95, fontFace: F.body, fontSize: 16, valign: "middle", align: "center", margin: 0 });
  footer(s);
  s.addNotes("Now that the four stages are familiar, this mapping lands: the four CPS stages map onto the five course phases across the term. The Week-5 pitch is the hinge — where individual work becomes team work. Reassure them explicitly that a solo path is welcome and no one's idea gets killed out from under them. ~2 min.");

  // ===== 19 Logistics =====
  s = mk(); s.background = { color: C.white };
  header(s, "How it runs", "The practical stuff that matters today");
  const log = [
    [FA.FaClock, "~10 hours / week", "≈2.5 in class + ≈7.5 outside. Say it plainly."],
    [FA.FaChartPie, "Process + founding artifacts", "Discovery, proposal, design, governance, launch all carry weight — strong code alone can't compensate."],
    [FA.FaRobot, "AI is a tool, not the topic", "Allowed for brainstorming, learning, drafting — but understand and be able to defend everything you submit."]
  ];
  for (let i = 0; i < 3; i++) {
    const y = 2.05 + i * 1.15;
    card(s, 0.6, y, 7.4, 1.0, C.cardBg);
    await iconCircle(s, log[i][0], 0.85, y + 0.24, 0.52, C.teal);
    s.addText(log[i][1], { x: 1.6, y: y + 0.13, w: 6.2, h: 0.36, color: C.ink, fontFace: F.body, fontSize: 18, bold: true, margin: 0 });
    s.addText(log[i][2], { x: 1.6, y: y + 0.49, w: 6.25, h: 0.45, color: C.slate, fontFace: F.body, fontSize: 14, margin: 0 });
  }
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 8.2, y: 2.05, w: 4.5, h: 3.45, fill: { color: "FCF3E3" }, line: { color: C.amber, width: 1.5, dashType: "dash" }, rectRadius: 0.09 });
  await iconCircle(s, FA.FaFileAlt, 8.5, 2.35, 0.55, C.amber, C.white);
  s.addText("SYLLABUS TOPICS", { x: 9.2, y: 2.42, w: 3.3, h: 0.4, color: "A9791F", fontFace: F.body, fontSize: 16, bold: true, valign: "middle", margin: 0 });
  s.addText("[ PLACEHOLDER — add your syllabus items ]", { x: 8.5, y: 3.15, w: 3.9, h: 0.35, color: "A9791F", fontFace: F.body, fontSize: 14, italic: true, bold: true, margin: 0 });
  s.addText([
    { text: "grading breakdown", options: { bullet: { indent: 14 }, breakLine: true, paraSpaceAfter: 6 } },
    { text: "late work & attendance", options: { bullet: { indent: 14 }, breakLine: true, paraSpaceAfter: 6 } },
    { text: "collaboration & Honor Code", options: { bullet: { indent: 14 }, breakLine: true, paraSpaceAfter: 6 } },
    { text: "accommodations & support", options: { bullet: { indent: 14 }, breakLine: true, paraSpaceAfter: 6 } },
    { text: "where everything lives (LMS)", options: { bullet: { indent: 14 } } }
  ], { x: 8.55, y: 3.6, w: 3.9, h: 1.8, color: C.ink, fontFace: F.body, fontSize: 14.5, valign: "top", margin: 0 });
  s.addText("Keep this segment tight — resist reading the syllabus aloud; point them to the LMS.", { x: 0.6, y: 5.75, w: 7.4, h: 0.5, color: C.slate, fontFace: F.body, fontSize: 14, italic: true, margin: 0 });
  footer(s);
  s.addNotes("Keep this tight — do NOT read the syllabus aloud; point them to the LMS. Say the workload plainly: about 10 hours a week (roughly 2.5 in class, 7.5 outside). Stress that process and founding artifacts carry real weight — strong code alone won't compensate. On AI: it's a tool, not the topic — fine for brainstorming, learning, and drafting, but they must understand and be able to defend everything they submit. Fill the placeholder card with your actual syllabus items before class. ~2-3 min.");

  // ===== 20 Idea Briefs + Idea Journal intro =====
  s = mk(); s.background = { color: "0E7C7B" };
  s.addShape(pres.shapes.OVAL, { x: 11.2, y: -1.2, w: 3.6, h: 3.6, fill: { color: "127D7C" } });
  s.addText("YOUR FIRST MOVE", { x: 0.7, y: 0.55, w: 11, h: 0.35, color: "BFE7E4", fontFace: F.body, fontSize: 15, bold: true, charSpacing: 2, margin: 0 });
  s.addText("Idea Briefs — due Wednesday, Sep 23", { x: 0.68, y: 0.92, w: 12, h: 0.8, color: C.white, fontFace: F.head, fontSize: 31, bold: true, margin: 0 });
  card(s, 0.6, 2.05, 7.5, 4.05, C.white);
  await iconCircle(s, FA.FaClipboardList, 0.9, 2.35, 0.6, C.teal);
  s.addText("What to produce", { x: 1.65, y: 2.42, w: 6.2, h: 0.45, color: C.ink, fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "Three genuinely different one-page problem concepts", options: { bullet: { indent: 15 }, breakLine: true, paraSpaceAfter: 10, bold: true } },
    { text: "Plus a short reflection: \"What makes a software project worth building to last?\"", options: { bullet: { indent: 15 }, breakLine: true, paraSpaceAfter: 10 } },
    { text: "Individual work — three flavors of the same app doesn't count", options: { bullet: { indent: 15 }, breakLine: true, paraSpaceAfter: 10 } },
    { text: "They come from three weeks of noticing — start an idea journal today", options: { bullet: { indent: 15 } } }
  ], { x: 0.95, y: 3.2, w: 6.9, h: 2.7, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0 });
  card(s, 8.3, 2.05, 4.4, 4.05, "0A6362");
  await iconCircle(s, FA.FaBookOpen, 8.6, 2.35, 0.55, C.amber, "0A6362");
  s.addText("Start an idea journal — today", { x: 9.3, y: 2.4, w: 3.2, h: 0.55, color: C.white, fontFace: F.body, fontSize: 17.5, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "A running, low-effort log of problems worth solving — kept over the next three weeks.", options: { bullet: { indent: 14 }, breakLine: true, paraSpaceAfter: 9, color: "D6EFED" } },
    { text: "Capture needs, not solutions: the problem, who has it, where you noticed it.", options: { bullet: { indent: 14 }, breakLine: true, paraSpaceAfter: 9, color: "D6EFED" } },
    { text: "Good briefs come from weeks of noticing — not a night-before scramble.", options: { bullet: { indent: 14 }, breakLine: true, paraSpaceAfter: 9, color: "D6EFED" } },
    { text: "Full guide + prompts: the Idea Journal handout.", options: { bullet: { indent: 14 }, italic: true, color: C.amber } }
  ], { x: 8.6, y: 3.15, w: 4.0, h: 2.85, fontFace: F.body, fontSize: 14.5, valign: "top", margin: 0, lineSpacingMultiple: 1.03 });
  footer(s, "BFE7E4");
  s.addNotes("Their first move. Point them to the CP1 assignment: three genuinely DIFFERENT one-page problem concepts (not three flavors of one app), plus a short reflection on what makes a project worth building to last, due Wed Sep 23. Then introduce the idea journal — a low-effort running log of problems (needs, not solutions) kept over three weeks. Emphasize that good briefs come from weeks of noticing, not a night-before scramble. The next slide starts the journal in class. ~3 min.");

  // ===== 21 In-class activity: first journal page =====
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: 11.4, y: -1.3, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  s.addShape(pres.shapes.OVAL, { x: 0.62, y: 0.54, w: 0.14, h: 0.14, fill: { color: C.amber } });
  s.addText("IN-CLASS · 3 MINUTES · SOLO", { x: 0.86, y: 0.45, w: 11.5, h: 0.32, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText("Fill your first journal page — right now", { x: 0.6, y: 0.8, w: 12.1, h: 0.7, color: C.white, fontFace: F.head, fontSize: 29, bold: true, margin: 0 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 1.95, w: 4.5, h: 3.7, fill: { color: "1E3352" }, line: { type: "none" }, rectRadius: 0.09, shadow: mkShadow() });
  await iconCircle(s, FA.FaLightbulb, 0.9, 2.2, 0.55, C.amber, C.navy);
  s.addText("Why we're doing this", { x: 1.6, y: 2.25, w: 3.3, h: 0.5, color: C.white, fontFace: F.body, fontSize: 17.5, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "Divergent thinking in miniature — generate widely, defer judgment.", options: { bullet: { indent: 14 }, breakLine: true, paraSpaceAfter: 11 } },
    { text: "You'll leave with a page already full — not a blank one to face later.", options: { bullet: { indent: 14 }, breakLine: true, paraSpaceAfter: 11 } },
    { text: "The problems around you are the seedbed for your three Idea Briefs.", options: { bullet: { indent: 14 } } }
  ], { x: 0.95, y: 3.05, w: 3.9, h: 2.5, color: "CFE0E9", fontFace: F.body, fontSize: 15, valign: "top", margin: 0, lineSpacingMultiple: 1.04 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.3, y: 1.95, w: 7.4, h: 3.7, fill: { color: C.white }, line: { type: "none" }, rectRadius: 0.09, shadow: mkShadow() });
  s.addText("THE PROMPT", { x: 5.6, y: 2.2, w: 6.8, h: 0.3, color: C.teal, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText("\"List as many problems as you can — things that are broken, annoying, tedious, slow, or missing — for you or the people around you: clubs, job, major, ward, roommates, hobbies.\"", { x: 5.6, y: 2.55, w: 6.85, h: 1.55, color: C.ink, fontFace: F.head, fontSize: 19, italic: true, margin: 0, lineSpacingMultiple: 1.05 });
  s.addText([
    { text: "Don't judge. Don't solve. Aim for at least 8.", options: { bold: true, color: C.tealDk, breakLine: true } },
    { text: "Stuck? What did you complain about this week? What takes too many steps? What tool do you wish existed?", options: { color: C.slate, italic: true } }
  ], { x: 5.6, y: 4.25, w: 6.85, h: 1.2, fontFace: F.body, fontSize: 14.5, margin: 0, lineSpacingMultiple: 1.05 });
  const rules = ["Defer judgment", "Prefer quantity", "No solutions yet", "Aim for 8+"];
  const rcw = 2.7, rgap = 0.25, rtot = rules.length * rcw + (rules.length - 1) * rgap, rstart = (13.3 - rtot) / 2;
  for (let ri = 0; ri < rules.length; ri++) {
    const rx = rstart + ri * (rcw + rgap);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rx, y: 5.95, w: rcw, h: 0.55, fill: { color: "1E3352" }, line: { type: "none" }, rectRadius: 0.27 });
    s.addText(rules[ri], { x: rx, y: 5.95, w: rcw, h: 0.55, color: C.amber, fontFace: F.body, fontSize: 15, bold: true, align: "center", valign: "middle", margin: 0 });
  }
  s.addText("Keep your list as entry #1 in your idea journal.", { x: 0.6, y: 6.62, w: 12.1, h: 0.35, color: "9FB4C7", fontFace: F.body, fontSize: 14.5, italic: true, align: "center", margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("Run this for real. Solo and silent first for three minutes — this protects individual generation before any group influence. The prompt: list as many problems (broken, annoying, tedious, slow, missing) as you can, aim for 8+, and don't judge or solve. Then collect a few aloud with PURE acceptance — no evaluating — to model deferring judgment. Don't collect or grade; the list becomes journal entry #1 and a taste of the Sep 9 divergent workshop. ~5 min.");

  // ===== 22 Wrap =====
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: -1.3, y: 5.2, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaFlagCheckered, 0.9, 1.35, 0.85, C.amber, C.navy);
  s.addText("Founders find and prove problems.\nWe start by exploring widely.", { x: 0.9, y: 1.85, w: 11.5, h: 1.4, color: C.white, fontFace: F.head, fontSize: 31, bold: true, margin: 0, lineSpacingMultiple: 1.05 });
  s.addText("BEFORE WEDNESDAY, SEP 9", { x: 0.92, y: 3.5, w: 11, h: 0.35, color: C.amber, fontFace: F.body, fontSize: 15, bold: true, charSpacing: 2, margin: 0 });
  s.addText("READ", { x: 0.95, y: 3.98, w: 6.0, h: 0.3, color: "8FA6BC", fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText([
    { text: "The Idea Briefs (CP1) assignment", options: { bullet: { indent: 15 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "The Idea Journal guide", options: { bullet: { indent: 15 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "The CPS handbook — the assigned excerpt", options: { bullet: { indent: 15 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "\"Channeling Your Creativity\" — Elder Hales", options: { bullet: { indent: 15 } } }
  ], { x: 1.0, y: 4.35, w: 6.1, h: 2.5, color: "CBD8E6", fontFace: F.body, fontSize: 16.5, valign: "top", margin: 0 });
  s.addText("DO", { x: 7.4, y: 3.98, w: 5.2, h: 0.3, color: "8FA6BC", fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText([
    { text: "Keep feeding your idea journal", options: { bullet: { indent: 15 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "Come with raw problems for the divergent workshop", options: { bullet: { indent: 15 } } }
  ], { x: 7.45, y: 4.35, w: 5.2, h: 2.5, color: "CBD8E6", fontFace: F.body, fontSize: 16.5, valign: "top", margin: 0 });
  s.addNotes("Recap the one big idea: founders find and prove problems, and we start by exploring widely. Point them to the two handouts (CP1 Idea Briefs and the Idea Journal guide) and the two readings for Sep 9 (the assigned CPS handbook excerpt and Elder Hales, \"Channeling Your Creativity\"). Flag the shift explicitly — from here on, sessions expect pre-reading. Send them off to keep feeding the journal and bring raw problems to the divergent workshop. ~1-2 min.");

  const OUT = "Session01-CourseLaunch.pptx";
  await pres.writeFile({ fileName: OUT });
  console.log("WROTE", PAGE, "slides");
  try {
    const { verifyDeck, reportText } = require("./verify-deck.js");
    console.log(reportText(await verifyDeck(OUT)));
  } catch (e) { console.warn("verify-deck skipped:", e.message); }
}
build().catch(e => { console.error(e); process.exit(1); });
