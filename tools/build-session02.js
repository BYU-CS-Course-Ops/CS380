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
pres.title = "CS 301R — Session 2 — Divergent Problem-Space Workshop";

let PAGE = 0;
function mk() { PAGE++; return pres.addSlide(); }
function footer(slide, col) {
  const c = col || C.slate;
  slide.addText("CS 301R · Session 2 · Divergent Workshop", { x: 8.0, y: 7.04, w: 4.7, h: 0.3, align: "right", color: c, fontFace: F.body, fontSize: 10, margin: 0 });
  slide.addText(String(PAGE), { x: 0.6, y: 7.04, w: 0.6, h: 0.3, color: c, fontFace: F.body, fontSize: 10, margin: 0 });
}
function header(slide, kicker, title, titleColor) {
  slide.addShape(pres.shapes.OVAL, { x: 0.62, y: 0.55, w: 0.15, h: 0.15, fill: { color: C.amber } });
  slide.addText(kicker.toUpperCase(), { x: 0.87, y: 0.44, w: 11.5, h: 0.34, color: C.teal, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  slide.addText(title, { x: 0.6, y: 0.82, w: 12.1, h: 1.0, color: titleColor || C.ink, fontFace: F.head, fontSize: 31, bold: true, margin: 0, valign: "top" });
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

  // 1 Title
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: 10.9, y: -1.4, w: 4.2, h: 4.2, fill: { color: "1C3252" } });
  s.addShape(pres.shapes.OVAL, { x: 12.0, y: 5.1, w: 3.0, h: 3.0, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaLightbulb, 0.9, 1.45, 1.0, C.amber, C.navy);
  s.addText("CS 301R · SOFTWARE ENGINEERING STUDIO I", { x: 0.92, y: 2.75, w: 11, h: 0.35, color: "9FB4C7", fontFace: F.body, fontSize: 15, bold: true, charSpacing: 2, margin: 0 });
  s.addText("Divergent Problem-Space Workshop", { x: 0.9, y: 3.15, w: 12.0, h: 1.3, color: C.white, fontFace: F.head, fontSize: 46, bold: true, margin: 0 });
  s.addText([
    { text: "Session 2 — Creative Problem Solving in Action", options: { color: C.amber, bold: true, breakLine: true } },
    { text: "Wednesday, September 9, 2026", options: { color: "9FB4C7" } }
  ], { x: 0.92, y: 4.75, w: 11, h: 0.9, fontFace: F.body, fontSize: 19, margin: 0, lineSpacingMultiple: 1.2 });
  s.addNotes("First true workshop, and the first session that assumed pre-reading (the CPS handbook excerpt and Elder Hales). Set expectations immediately: minimal lecture, maximum doing — today they practice the CPS process, then turn it on the real world to generate problems. Keep the energy up; this is a hands-on day. ~1 min.");

  // 2 Recap + journal check-in
  s = mk(); s.background = { color: C.white };
  header(s, "Where we are", "Recap & journal check-in");
  card(s, 0.6, 2.05, 5.95, 3.85, C.cardBg);
  await iconCircle(s, FA.FaExchangeAlt, 0.9, 2.35, 0.66, C.teal);
  s.addText("From Session 1", { x: 1.72, y: 2.42, w: 4.6, h: 0.5, color: C.ink, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "CPS = generate many options, then narrow.", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 13 } },
    { text: "Divergent (open up) → convergent (choose).", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 13 } },
    { text: "Today: practice the process, then use it to find real problems.", options: { bullet: { indent: 16 } } }
  ], { x: 0.98, y: 3.35, w: 5.35, h: 2.45, color: C.ink, fontFace: F.body, fontSize: 16, valign: "top", margin: 0 });
  card(s, 6.75, 2.05, 5.95, 3.85, C.navy);
  await iconCircle(s, FA.FaBookOpen, 7.05, 2.35, 0.66, C.amber, C.navy);
  s.addText("Journal check-in", { x: 7.87, y: 2.42, w: 4.6, h: 0.5, color: C.white, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
  s.addText("How many entries so far?", { x: 7.1, y: 3.35, w: 5.35, h: 0.55, color: C.amber, fontFace: F.head, fontSize: 25, bold: true, margin: 0 });
  s.addText("Hands up by range. Quantity is the whole point right now — we'll add a lot more today.", { x: 7.1, y: 4.1, w: 5.35, h: 1.6, color: "CFE0E9", fontFace: F.body, fontSize: 16, margin: 0, lineSpacingMultiple: 1.06 });
  footer(s);
  s.addNotes("Quick recap from Session 1: CPS means generate many options, then narrow — divergent opens up, convergent chooses. Then run the journal check-in as a live temperature read: \"how many entries so far?\", hands up by range. Celebrate quantity and don't judge quality — volume is the whole point right now, and they'll add a lot more today. If entries look thin, gently reset the expectation before you move on. ~2-3 min.");

  // 3 CPS four stages
  s = mk(); s.background = { color: C.white };
  header(s, "From the reading", "Creative Problem Solving — the four stages");
  const stages = [
    ["1", "Clarification", "Explore the problem space; gather facts; frame the real problem."],
    ["2", "Ideation", "Generate many ideas; defer judgment; prefer quantity."],
    ["3", "Development", "Strengthen and refine the best ideas against goals and constraints."],
    ["4", "Implementation", "Plan, act, and socialize the chosen solution."]
  ];
  const sw = 2.92, sgx = 0.14;
  for (let i = 0; i < 4; i++) {
    const x = 0.6 + i * (sw + sgx);
    card(s, x, 2.15, sw, 2.95, C.cardBg);
    s.addShape(pres.shapes.OVAL, { x: x + sw / 2 - 0.45, y: 2.4, w: 0.9, h: 0.9, fill: { color: C.teal } });
    s.addText(stages[i][0], { x: x + sw / 2 - 0.45, y: 2.4, w: 0.9, h: 0.9, color: C.white, fontFace: F.head, fontSize: 32, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(stages[i][1], { x: x + 0.12, y: 3.45, w: sw - 0.24, h: 0.5, color: C.ink, fontFace: F.body, fontSize: 18, bold: true, align: "center", margin: 0 });
    s.addText(stages[i][2], { x: x + 0.18, y: 3.98, w: sw - 0.36, h: 1.05, color: C.slate, fontFace: F.body, fontSize: 14, align: "center", margin: 0, lineSpacingMultiple: 1.04 });
    if (i < 3) s.addImage({ data: await ic(FA.FaChevronRight, C.amber), x: x + sw + 0.0, y: 3.55, w: 0.22, h: 0.3 });
  }
  card(s, 0.6, 5.5, 12.1, 1.0, C.navy);
  await iconCircle(s, FA.FaExchangeAlt, 0.95, 5.75, 0.55, C.amber, C.navy);
  s.addText([
    { text: "Every stage uses both:  ", options: { color: C.amber, bold: true } },
    { text: "divergent thinking to generate, then convergent thinking to narrow.", options: { color: C.white } }
  ], { x: 1.7, y: 5.5, w: 10.8, h: 1.0, fontFace: F.body, fontSize: 16.5, valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("This is now review from the reading, not new material — move briskly and check comprehension rather than lecturing. Name the four stages with a line each, and ask the room to supply the definitions if they did the reading. Land the banner: every stage uses both divergent and convergent thinking. Keep it to a few minutes; the doing is what matters today. ~3 min.");

  // 4 Channeling Your Creativity
  s = mk(); s.background = { color: "EEF4F3" };
  header(s, "From the reading — discuss", "\"Channeling Your Creativity\" — Elder Hales");
  card(s, 0.6, 2.05, 12.1, 1.55, C.white);
  await iconCircle(s, FA.FaComments, 0.98, 2.42, 0.66, C.teal);
  s.addText("The CPS process gives you the mechanics; Elder Hales speaks to the purpose — creativity as a gift to develop and use, not just a technique.", { x: 1.85, y: 2.05, w: 10.6, h: 1.55, color: C.ink, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
  s.addText("Talk about it", { x: 0.6, y: 3.9, w: 12, h: 0.4, color: C.tealDk, fontFace: F.body, fontSize: 16, bold: true, margin: 0 });
  s.addText([
    { text: "What does the article add beyond the CPS mechanics?", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 15 } },
    { text: "Creativity as a gift to develop and use — in service, not just to produce.", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 15 } },
    { text: "What difference might that make in how you find a project worth founding?", options: { bullet: { indent: 16 } } }
  ], { x: 1.0, y: 4.4, w: 11.5, h: 2.1, color: C.ink, fontFace: F.body, fontSize: 17, valign: "top", margin: 0 });
  footer(s);
  s.addNotes("A short discussion beat tied to the Hales reading. The CPS handbook gives the mechanics; Hales speaks to the purpose — creativity as a gift to develop and use in service, not just a technique. Pose the questions and let students talk; resist filling the silence too quickly. Aim to connect that sense of purpose to how they'll choose a project worth founding. ~4-5 min.");

  // 5 Tools table
  s = mk(); s.background = { color: C.white };
  header(s, "The toolkit", "The tools we'll use today");
  const tHead = ["TOOL", "MODE", "WHAT IT IS"].map(h => ({ text: h, options: { fill: { color: C.teal }, color: C.white, bold: true, fontFace: F.body, fontSize: 14 } }));
  const toolRows = [
    ["Post-It brainstorming", "Diverge", "Rapid capture — one idea per sticky, say it aloud, go for quantity."],
    ["Brainwriting", "Diverge", "Write a few ideas on a sheet, swap, build on others' — silent, so no one dominates."],
    ["\"How might we…?\"", "Diverge", "Reframe a problem as an open question that invites many answers."],
    ["Ladder of Abstraction", "Both", "Ask \"what's stopping you?\" to get specific, or \"why does it matter?\" to go broader."],
    ["Value vs. Do-ability", "Converge", "Score options on two axes — value × feasibility — to narrow the list."]
  ];
  const tBody = toolRows.map((r, i) => {
    const z = i % 2 ? "EEF3F6" : C.white;
    const mc = r[1] === "Diverge" ? C.green : (r[1] === "Converge" ? C.coral : C.tealDk);
    return [
      { text: r[0], options: { fill: { color: z }, color: C.tealDk, bold: true, fontFace: F.body, fontSize: 14.5 } },
      { text: r[1], options: { fill: { color: z }, color: mc, bold: true, fontFace: F.body, fontSize: 14.5, align: "center" } },
      { text: r[2], options: { fill: { color: z }, color: C.ink, fontFace: F.body, fontSize: 14.5 } }
    ];
  });
  s.addTable([tHead, ...tBody], { x: 0.6, y: 2.2, w: 12.1, colW: [3.3, 1.7, 7.1], rowH: 0.76, valign: "middle", margin: [4, 10, 4, 10], border: { type: "solid", color: "FFFFFF", pt: 2 } });
  footer(s);
  s.addNotes("Introduce the toolkit — don't drill each tool. Name each one and its mode: Post-It burst and brainwriting and \"how might we\" (diverge), the ladder of abstraction (both), and Value vs. Do-ability (converge). Tell them today leans on Post-It, brainwriting, and the ladder, and that Value vs. Do-ability returns in Week 3 when they narrow. This is a reference slide — keep it short. ~2 min.");

  // 6 Egg-drop process
  s = mk(); s.background = { color: C.white };
  header(s, "Warm-up — the CPS process", "Egg-drop: a run through the process (paper only)");
  s.addText("Protect an egg dropped from increasing heights. Paper only — design and reason; no build, no drop. It's here to make the process visible.", { x: 0.6, y: 1.7, w: 12.1, h: 0.6, color: C.slate, fontFace: F.body, fontSize: 15.5, margin: 0, lineSpacingMultiple: 1.05 });
  const flow = [
    [FA.FaSearch, "Clarify", "Just the goal for now — protect the egg. (Ask questions if you want to know more.)"],
    [FA.FaLightbulb, "Ideate", "Generate many protection ideas. Defer judgment, go wild — no constraints yet."],
    [FA.FaFilter, "Develop", "Now the constraints appear. Narrow your wild ideas to the one you'd build."]
  ];
  const ew = 3.9, egx = 0.2;
  for (let i = 0; i < 3; i++) {
    const x = 0.6 + i * (ew + egx);
    card(s, x, 2.55, ew, 3.0, C.cardBg);
    await iconCircle(s, flow[i][0], x + ew / 2 - 0.35, 2.82, 0.7, C.teal);
    s.addText(flow[i][1], { x: x + 0.15, y: 3.7, w: ew - 0.3, h: 0.5, color: C.ink, fontFace: F.body, fontSize: 20, bold: true, align: "center", margin: 0 });
    s.addText(flow[i][2], { x: x + 0.28, y: 4.22, w: ew - 0.56, h: 1.25, color: C.slate, fontFace: F.body, fontSize: 15, align: "center", margin: 0, lineSpacingMultiple: 1.05 });
  }
  s.addImage({ data: await ic(FA.FaArrowRight, C.amber), x: 4.6, y: 3.85, w: 0.24, h: 0.28 });
  s.addImage({ data: await ic(FA.FaArrowRight, C.amber), x: 8.7, y: 3.85, w: 0.24, h: 0.28 });
  s.addText("Groups of 3–4 · a facilitator each · expect interruptions and feedback.", { x: 0.6, y: 5.8, w: 12.1, h: 0.4, color: C.slate, fontFace: F.body, fontSize: 14, italic: true, align: "center", margin: 0 });
  footer(s);
  s.addNotes("Set up the warm-up clearly: it exists to make the CPS process VISIBLE, not to build anything — paper only, design and reason, no drop. Walk the three beats: Clarify (just the goal for now), Ideate (generate wild protection ideas, no constraints yet), Develop (constraints appear, narrow to one). Put them in groups of 3-4 with a facilitator each. The trap you WANT them to fall into is not asking about constraints early. ~3 min to set up.");

  // 7 Egg-drop constraints (reveal) — big
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: 0.62, y: 0.55, w: 0.15, h: 0.15, fill: { color: C.amber } });
  s.addText("REVEAL AT DEVELOPMENT (OR ON REQUEST)", { x: 0.87, y: 0.44, w: 11.5, h: 0.34, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText("Now narrow your ideas against these constraints", { x: 0.6, y: 0.82, w: 12.1, h: 0.7, color: C.white, fontFace: F.head, fontSize: 30, bold: true, margin: 0 });
  const cons = [
    ["Materials", "Only: 1 sheet of paper · 12 in of tape · 5 straws · 8 in of string · 10 cotton balls · 2 rubber bands · 1 sandwich bag."],
    ["Size", "Must fit inside an 8-inch cube."],
    ["Weight", "Under 2 oz (without the egg)."],
    ["Build time", "Assembled in 10 minutes or less."],
    ["Reusable", "Survive three increasing drops — 3 ft, 6 ft, 9 ft. No one-shot designs."],
    ["Egg access", "The egg must go in and come out without cutting or destroying it."],
    ["Success", "Egg uncracked after the 9-ft drop. Tiebreaker: fewer materials & lighter wins."]
  ];
  let cy = 1.78;
  for (let i = 0; i < cons.length; i++) {
    const twoLine = (cons[i][1].length > 62);
    s.addText(cons[i][0], { x: 0.9, y: cy, w: 2.55, h: 0.7, color: C.amber, fontFace: F.body, fontSize: 19, bold: true, valign: "top", margin: 0 });
    s.addText(cons[i][1], { x: 3.55, y: cy, w: 9.1, h: 0.8, color: "DCE7F0", fontFace: F.body, fontSize: 16.5, valign: "top", margin: 0, lineSpacingMultiple: 1.03 });
    cy += twoLine ? 0.92 : 0.68;
  }
  footer(s, "7E92A8");
  s.addNotes("Do not show this until the Development stage — OR reward any team that asks good Clarification questions by revealing it to them early; that reward IS the lesson. When it appears, their wild ideas (giant pillow, huge parachute) suddenly meet real limits, forcing convergence. Read the constraints once, then let them narrow to a single design. This is where \"understand constraints before solutioning\" gets felt rather than told. The exercise runs ~10-12 min total.");

  // 8 Debrief
  s = mk(); s.background = { color: C.white };
  header(s, "Debrief", "What just happened");
  card(s, 0.6, 2.05, 5.95, 3.75, "FCF3E3");
  await iconCircle(s, FA.FaKey, 0.9, 2.38, 0.66, C.amber, C.white);
  s.addText("The Clarification lesson", { x: 1.72, y: 2.45, w: 4.6, h: 0.5, color: C.ink, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
  s.addText("The teams that asked about constraints early had it far easier. That's exactly why real founding work starts by understanding the problem, its users, and its constraints — before racing to solutions.", { x: 0.98, y: 3.35, w: 5.35, h: 2.3, color: C.ink, fontFace: F.body, fontSize: 16, valign: "top", margin: 0, lineSpacingMultiple: 1.06 });
  card(s, 6.75, 2.05, 5.95, 3.75, C.cardBg);
  await iconCircle(s, FA.FaArrowRight, 7.05, 2.38, 0.66, C.teal);
  s.addText("The pivot", { x: 7.87, y: 2.45, w: 4.6, h: 0.5, color: C.ink, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
  s.addText("The same divergent discipline — generate widely, defer judgment — is exactly how we'll find real problems worth founding on. Now we point it at the real world.", { x: 7.13, y: 3.35, w: 5.35, h: 2.3, color: C.ink, fontFace: F.body, fontSize: 16, valign: "top", margin: 0, lineSpacingMultiple: 1.06 });
  footer(s);
  s.addNotes("The payoff slide — draw the lesson OUT of them rather than stating it. Ask which teams asked about constraints early and how much easier it made things. The Clarification lesson: real founding work starts by understanding the problem, its users, and its constraints before racing to solutions. Then pivot: the same divergent discipline — generate widely, defer judgment — is exactly how we'll find real problems worth founding on. ~3-4 min.");

  // 9 Workshop how it runs
  s = mk(); s.background = { color: C.white };
  header(s, "The main event — how it runs", "Find problems worth founding on");
  s.addText("Three tools, one growing pool. All three keep generating — breadth, then build, then depth.", { x: 0.6, y: 1.72, w: 12.1, h: 0.5, color: C.slate, fontFace: F.body, fontSize: 15.5, italic: true, margin: 0 });
  const seq = [
    [FA.FaStickyNote, "1 · Post-It burst", "Breadth · ~9 min", "Loud and fast: one problem per sticky, say it aloud, fill the wall. Push past the obvious."],
    [FA.FaPenFancy, "2 · Brainwriting", "Build · ~9 min", "Silent: write a few on a sheet, swap, build on others'. New problems keep coming."],
    [FA.FaSitemap, "3 · Ladder", "Depth · ~7 min", "Take 2–3 notes and ask \"why does it matter?\" / \"what specifically?\" for sharper problems."]
  ];
  const qw = 3.9, qgx = 0.2;
  for (let i = 0; i < 3; i++) {
    const x = 0.6 + i * (qw + qgx);
    card(s, x, 2.4, qw, 3.55, C.cardBg);
    await iconCircle(s, seq[i][0], x + 0.3, 2.68, 0.68, C.teal);
    s.addText(seq[i][1], { x: x + 0.27, y: 3.52, w: qw - 0.5, h: 0.45, color: C.ink, fontFace: F.body, fontSize: 18, bold: true, margin: 0 });
    s.addText(seq[i][2], { x: x + 0.27, y: 3.98, w: qw - 0.5, h: 0.34, color: C.tealDk, fontFace: F.body, fontSize: 14, bold: true, margin: 0 });
    s.addText(seq[i][3], { x: x + 0.27, y: 4.38, w: qw - 0.54, h: 1.5, color: C.slate, fontFace: F.body, fontSize: 14.5, margin: 0, lineSpacingMultiple: 1.05 });
  }
  s.addText("Tag who feels each problem — a person or group, not \"everyone.\" (Deep needfinding is next week.)", { x: 0.6, y: 6.15, w: 12.1, h: 0.4, color: C.slate, fontFace: F.body, fontSize: 14, italic: true, align: "center", margin: 0 });
  footer(s);
  s.addNotes("The main event. Three tools, one growing pool, run back to back: breadth (Post-It burst, ~9 min), build (brainwriting, ~9 min), depth (ladder, ~7 min). Explain each briefly, then GO — keep transitions crisp so momentum builds, and circulate as a coach, pushing teams past the obvious. Have them tag WHO feels each problem — a specific person or group, not \"everyone\"; deep needfinding is next week. ~25 min total.");

  // 10 The rules (persistent) — big
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: 11.3, y: -1.3, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  s.addShape(pres.shapes.OVAL, { x: 0.62, y: 0.66, w: 0.15, h: 0.15, fill: { color: C.amber } });
  s.addText("KEEP THIS UP WHILE YOU WORK", { x: 0.87, y: 0.56, w: 11.5, h: 0.34, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText("Problems, not solutions.", { x: 0.6, y: 1.05, w: 12.1, h: 0.95, color: C.white, fontFace: F.head, fontSize: 44, bold: true, margin: 0 });
  const rules = ["Defer judgment", "Prefer quantity", "Build on others'", "Welcome wild ideas", "No solutioning yet"];
  for (let i = 0; i < rules.length; i++) {
    const y = 2.5 + i * 0.8;
    await iconCircle(s, FA.FaCheck, 0.9, y, 0.56, C.amber, C.navy);
    s.addText(rules[i], { x: 1.72, y: y - 0.02, w: 7, h: 0.6, color: C.white, fontFace: F.body, fontSize: 25, bold: true, valign: "middle", margin: 0 });
  }
  card(s, 9.0, 2.5, 3.7, 3.55, "1E3352");
  await iconCircle(s, FA.FaBullseye, 10.35, 2.82, 1.0, C.amber, C.navy);
  s.addText("Aim for 40+ per group", { x: 9.2, y: 3.98, w: 3.3, h: 0.5, color: C.white, fontFace: F.head, fontSize: 21, bold: true, align: "center", margin: 0 });
  s.addText("And tag who feels each one.", { x: 9.2, y: 4.6, w: 3.3, h: 0.8, color: "CFE0E9", fontFace: F.body, fontSize: 15, align: "center", margin: 0 });
  s.addNotes("Leave this slide up during the entire workshop — it's the reference, not a talking point. Return to it out loud whenever energy dips or someone starts solutioning: problems not solutions, defer judgment, prefer quantity, build on others', welcome wild ideas. The 40+ per group target gives them something concrete to chase. Keep reinforcing \"tag who feels each one.\" (Stays up while they work.)");

  // 11 Capture
  s = mk(); s.background = { color: C.white };
  header(s, "Before you leave", "Capture the pool");
  const cap = [
    [FA.FaStar, "Star 3–5 problem spaces", "The ones that tug at you — weigh value × reachable users. A private, gentle first narrowing."],
    [FA.FaBookOpen, "Everything into your journal", "Starred or not, the whole pool goes into your idea journal — raw material for the Idea Briefs."],
    [FA.FaUnlockAlt, "Not a commitment", "You're marking what to investigate, not choosing a project. Range still matters."]
  ];
  for (let i = 0; i < 3; i++) {
    const y = 2.15 + i * 1.42;
    card(s, 0.6, y, 12.1, 1.28, C.cardBg);
    await iconCircle(s, cap[i][0], 0.95, y + 0.32, 0.66, C.teal);
    s.addText(cap[i][1], { x: 1.85, y: y + 0.2, w: 10.5, h: 0.45, color: C.ink, fontFace: F.body, fontSize: 19, bold: true, margin: 0 });
    s.addText(cap[i][2], { x: 1.85, y: y + 0.66, w: 10.6, h: 0.5, color: C.slate, fontFace: F.body, fontSize: 14.5, margin: 0 });
  }
  footer(s);
  s.addNotes("Before anyone leaves, land the capture routine so the work isn't lost. Have them star 3-5 problem spaces that tug at them — a private, gentle first narrowing weighing value against reachable users. Everything, starred or not, goes into the idea journal as raw material for the Idea Briefs. Stress that starring is NOT a commitment to a project; range still matters. ~2-3 min.");

  // 12 Wrap
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: -1.3, y: 5.2, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaSeedling, 0.9, 1.3, 0.9, C.amber, C.navy);
  s.addText("Keep noticing.\nYou need range for three genuinely different Idea Briefs.", { x: 0.9, y: 2.35, w: 11.8, h: 1.7, color: C.white, fontFace: F.head, fontSize: 32, bold: true, margin: 0, lineSpacingMultiple: 1.05 });
  s.addText("BEFORE MONDAY, SEP 14", { x: 0.92, y: 4.4, w: 11, h: 0.35, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText([
    { text: "Keep feeding your idea journal — and bring your starred problem spaces", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 9 } },
    { text: "Next up (Week 2): open source, licensing, and discovery — how to talk to real users", options: { bullet: { indent: 16 } } }
  ], { x: 0.95, y: 4.82, w: 11.7, h: 1.5, color: "CBD8E6", fontFace: F.body, fontSize: 17, valign: "top", margin: 0 });
  s.addNotes("Close by reinforcing the habit: keep noticing, because they need genuine range for three different Idea Briefs. Preview Monday, Sep 14: open source, licensing, and discovery — how to talk to real users. Ask them to bring their starred problem spaces into needfinding. ~1-2 min.");

  const OUT = "Session02-Divergent.pptx";
  await pres.writeFile({ fileName: OUT });
  console.log("WROTE", PAGE, "slides");
  try {
    const { verifyDeck, reportText } = require("./verify-deck.js");
    console.log(reportText(await verifyDeck(OUT)));
  } catch (e) { console.warn("verify-deck skipped:", e.message); }
}
build().catch(e => { console.error(e); process.exit(1); });
