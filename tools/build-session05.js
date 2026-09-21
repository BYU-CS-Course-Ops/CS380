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
  iconCache[key] = d; return d;
}
const mkShadow = () => ({ type: "outer", color: "000000", blur: 7, offset: 3, angle: 90, opacity: 0.13 });

const pres = new pptxgen();
pres.defineLayout({ name: "W", width: 13.3, height: 7.5 });
pres.layout = "W"; pres.author = "CS 301R";
pres.title = "CS 301R — Session 5 — Feasibility & Learning to Learn";

let PAGE = 0;
function mk() { PAGE++; return pres.addSlide(); }
function footer(slide, col) {
  const c = col || C.slate;
  slide.addText("CS 301R · Session 5 · Feasibility & Learning to Learn", { x: 7.3, y: 7.04, w: 5.4, h: 0.3, align: "right", color: c, fontFace: F.body, fontSize: 10, margin: 0 });
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

async function build() {
  let s;

  // 1 Title
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: 10.9, y: -1.4, w: 4.2, h: 4.2, fill: { color: "1C3252" } });
  s.addShape(pres.shapes.OVAL, { x: 12.0, y: 5.1, w: 3.0, h: 3.0, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaCompass, 0.9, 1.45, 1.0, C.amber, C.navy);
  s.addText("CS 301R · SOFTWARE ENGINEERING STUDIO I", { x: 0.92, y: 2.75, w: 11, h: 0.35, color: "9FB4C7", fontFace: F.body, fontSize: 15, bold: true, charSpacing: 2, margin: 0 });
  s.addText("Feasibility & Learning to Learn", { x: 0.9, y: 3.15, w: 12.1, h: 1.3, color: C.white, fontFace: F.head, fontSize: 42, bold: true, margin: 0 });
  s.addText([
    { text: "Session 5 — Can I actually build this?", options: { color: C.amber, bold: true, breakLine: true } },
    { text: "Monday, September 21, 2026", options: { color: "9FB4C7" } }
  ], { x: 0.92, y: 4.7, w: 11, h: 0.9, fontFace: F.body, fontSize: 19, margin: 0, lineSpacingMultiple: 1.2 });
  s.addNotes("Week 3 opens the turn from diverging to converging. Two tools today, and they pair: name-and-reduce feasibility risk, and plan the learning that closes the gaps a risk exposes. Frame the stakes up front — the self-directed-learning half has the longest shelf life of anything this semester. Keep it concrete: everything today runs on one worked example (QueueUp) so the feasibility pass, the spike, and the learning plan all trace one idea. Check the reading (Norvig + the self-directed-learning plan piece + the Spikes reading).");

  // 2 Bridge
  s = mk(); s.background = { color: C.white };
  header(s, "Where we are", "From investigating problems to committing to one");
  card(s, 0.6, 2.05, 5.95, 3.7, C.cardBg);
  await iconCircle(s, FA.FaSearch, 0.9, 2.35, 0.66, C.teal);
  s.addText("Weeks 1–4 · diverging", { x: 1.72, y: 2.42, w: 4.6, h: 0.5, color: C.ink, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
  s.addText("You generated and investigated problems — and talked to real users. You have candidate ideas with some evidence behind them.", { x: 0.98, y: 3.3, w: 5.35, h: 2.3, color: C.ink, fontFace: F.body, fontSize: 16.5, valign: "top", margin: 0, lineSpacingMultiple: 1.06 });
  card(s, 6.75, 2.05, 5.95, 3.7, C.navy);
  await iconCircle(s, FA.FaCompass, 7.05, 2.35, 0.66, C.amber, C.navy);
  s.addText("Today · converging", { x: 7.87, y: 2.42, w: 4.6, h: 0.5, color: C.white, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
  s.addText("Before you commit: can you build a real slice with the time and skill you have — and if not yet, can you close the gap?", { x: 7.1, y: 3.3, w: 5.35, h: 2.3, color: "CFE0E9", fontFace: F.body, fontSize: 16.5, valign: "top", margin: 0, lineSpacingMultiple: 1.06 });
  footer(s);
  s.addNotes("Two-minute bridge. The pool of ideas is raw material; today we start choosing what to actually build. Name the honest founder's question plainly. Note the two-part answer coming: feasibility (can I build it?) and the learning plan (can I close what I don't know?). These are the instruments they'll use Wednesday to narrow to one or two ideas — and again all semester.");

  // 3 The honest question
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: 0.62, y: 0.6, w: 0.15, h: 0.15, fill: { color: C.amber } });
  s.addText("THE FOUNDER'S HONEST QUESTION", { x: 0.87, y: 0.5, w: 11.5, h: 0.34, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText("Can I build a real slice of this with the time and skill I have — and if not yet, can I close the gap?", { x: 0.9, y: 2.1, w: 11.5, h: 2.0, color: C.white, fontFace: F.head, fontSize: 30, bold: true, italic: true, margin: 0, lineSpacingMultiple: 1.08 });
  s.addText("Two tools today: name and reduce feasibility risk, then plan the learning that closes the gaps.", { x: 0.9, y: 4.5, w: 11.4, h: 1.2, color: "CFE0E9", fontFace: F.body, fontSize: 18, valign: "top", margin: 0, lineSpacingMultiple: 1.08 });
  s.addNotes("Let this land as a statement, not a slide to read past. Feasibility is not a yes/no verdict — it's a set of risks you name and reduce. And a gap in what you know is not a stop sign; it's a thing you plan for. The rest of the session is these two tools, applied to one worked example so they see the whole arc on a single idea.");

  // 4 Six risk categories
  s = mk(); s.background = { color: C.white };
  header(s, "Feasibility isn't yes/no", "Six risks you name — then reduce");
  const risks = [
    [FA.FaMicrochip, "Technical", "Is the core hard part doable — real-time, offline, ML?"],
    [FA.FaCalendarAlt, "Schedule", "Does a real slice fit the time you actually have?"],
    [FA.FaPlug, "Dependency", "An API or service that could vanish, cost, or throttle you?"],
    [FA.FaGraduationCap, "Skill", "A gap between what the build needs and what you know?"],
    [FA.FaUsers, "Adoption", "Will real users use it — or is the need too weak?"],
    [FA.FaWrench, "Maintenance", "Can you and future contributors keep it running?"]
  ];
  const cx = [0.6, 4.58, 8.56], cw = 3.83;
  for (let i = 0; i < 6; i++) {
    const x = cx[i % 3], y = i < 3 ? 1.9 : 3.97;
    card(s, x, y, cw, 1.9, C.cardBg);
    await iconCircle(s, risks[i][0], x + 0.26, y + 0.24, 0.56, C.teal);
    s.addText(risks[i][1], { x: x + 0.94, y: y + 0.24, w: cw - 1.1, h: 0.56, color: C.ink, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
    s.addText(risks[i][2], { x: x + 0.26, y: y + 0.94, w: cw - 0.5, h: 0.85, color: C.slate, fontFace: F.body, fontSize: 13, valign: "top", margin: 0, lineSpacingMultiple: 1.04 });
  }
  card(s, 0.6, 6.05, 12.1, 0.72, C.navy);
  s.addText([
    { text: "The move:  ", options: { color: C.amber, bold: true } },
    { text: "rate each low / med / high, then circle the one or two that could sink it — those you de-risk first.", options: { color: C.white } }
  ], { x: 0.9, y: 6.05, w: 11.5, h: 0.72, fontFace: F.body, fontSize: 15, valign: "middle", align: "center", margin: 0 });
  footer(s);
  s.addNotes("Put the six on the board and give each a one-line example. The core reframe: hiding a risk doesn't remove it, it just moves the surprise to week 10. The point isn't to score an idea dead or alive — it's to surface the one or two risks worth acting on. Technical and Skill often turn out to be the same underlying unknown, which is the setup for the QueueUp pass that follows. Keep it brisk — 14 minutes total, worked example included.");

  // 5 Meet QueueUp — the worked example
  s = mk(); s.background = { color: C.white };
  header(s, "Our worked example", "Meet QueueUp");
  card(s, 0.6, 1.9, 12.1, 1.72, C.cardBg);
  await iconCircle(s, FA.FaListOl, 0.95, 2.24, 0.64, C.teal);
  s.addText([
    { text: "A live office-hours help queue.  ", options: { bold: true, color: C.ink } },
    { text: "Office hours are chaos — students don't know their place in line, TAs lose track of who's next, and remote students get skipped. QueueUp: a student adds themselves with a topic, everyone sees their real-time position, and the TA claims the next person — remote and in-person, one line.", options: { color: C.ink } }
  ], { x: 1.75, y: 1.9, w: 10.7, h: 1.72, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
  const qfeat = [
    [FA.FaUserFriends, "Two roles", "Student and TA — each sees a different view."],
    [FA.FaStream, "A live queue", "Positions update in real time as people join and get claimed."],
    [FA.FaChartLine, "Room to grow", "Notifications, wait-time analytics, multi-course later."]
  ];
  const qx = [0.6, 4.63, 8.66], qw = 3.84;
  for (let i = 0; i < 3; i++) {
    const x = qx[i];
    card(s, x, 3.82, qw, 1.95, C.cardBg);
    await iconCircle(s, qfeat[i][0], x + 0.3, 4.12, 0.6, C.navy);
    s.addText(qfeat[i][1], { x: x + 1.04, y: 4.16, w: qw - 1.2, h: 0.55, color: C.ink, fontFace: F.body, fontSize: 17, bold: true, valign: "middle", margin: 0 });
    s.addText(qfeat[i][2], { x: x + 0.3, y: 4.85, w: qw - 0.55, h: 0.82, color: C.slate, fontFace: F.body, fontSize: 13, valign: "top", margin: 0, lineSpacingMultiple: 1.04 });
  }
  card(s, 0.6, 5.97, 12.1, 0.8, C.navy);
  s.addText([
    { text: "We'll trace QueueUp through all of today", options: { color: C.amber, bold: true } },
    { text: " — a feasibility pass, a spike, and a learning plan. It's a teaching vehicle; you find your own idea.", options: { color: C.white } }
  ], { x: 0.9, y: 5.97, w: 11.5, h: 0.8, fontFace: F.body, fontSize: 14.5, valign: "middle", align: "center", margin: 0 });
  footer(s);
  s.addNotes("Introduce the example that carries the whole session — spend a full minute here so it's concrete before the feasibility pass. Read the one-liner, then say why it's a good teaching case: reachable users are literally down the hall, it has one genuinely scary unknown (real-time sync), and it's rich enough — two roles, a live data model, room to grow — to be worth founding on. Stress it's a vehicle, not a suggested project: students find their own idea. Then flip to the live six-risk pass on it.");

  // 6 Model it live — QueueUp risk table (filled live, one row per click)
  s = mk(); s.background = { color: C.white };
  header(s, "Model it live — QueueUp", "Six risks, one honest pass");
  s.addText("QueueUp — a live office-hours help queue. Rate its six risks with the room:", { x: 0.6, y: 1.72, w: 12.1, h: 0.35, color: C.slate, fontFace: F.body, fontSize: 14.5, italic: true, margin: 0 });

  // Column geometry — the grid is built from shapes, not addTable, so rows can
  // animate individually (PowerPoint animates a table as a single object).
  const CAT_X = 0.72, CAT_W = 2.26, READ_X = 3.10, READ_W = 1.30, WHY_X = 4.52, WHY_W = 8.06;
  const HDR_Y = 2.12, HDR_H = 0.50, ROW_Y0 = 2.68, ROW_H = 0.495, ROW_PITCH = 0.535;
  const HILITE = "FBEAD2";

  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: HDR_Y, w: 12.1, h: HDR_H, fill: { color: C.navy }, line: { type: "none" } });
  const hdrOpts = { y: HDR_Y, h: HDR_H, color: C.white, fontFace: F.body, fontSize: 14, bold: true, valign: "middle", margin: 0 };
  s.addText("Category", { ...hdrOpts, x: CAT_X, w: CAT_W });
  s.addText("Read", { ...hdrOpts, x: READ_X, w: READ_W, align: "center" });
  s.addText("Why", { ...hdrOpts, x: WHY_X, w: WHY_W });

  // [category, read, why, isHighRisk]
  const rrows = [
    ["Technical", "High", "Live queue pushed to every client in ~1s — never done real-time", true],
    ["Schedule", "Med", "One course, add / see-position / claim — that slice fits", false],
    ["Dependency", "Med", "Build WebSockets or lean on a managed service (rate limits?)", false],
    ["Skill", "High", "Built request/response apps, never real-time — same root as Technical", true],
    ["Adoption", "Med", "Will students open an app vs. just walk in? Confirm the \u201cI get skipped\u201d pain is real", false],
    ["Maintenance", "Med", "Runs live every session; a crash is very visible", false]
  ];
  rrows.forEach((r, i) => {
    const y = ROW_Y0 + i * ROW_PITCH;
    // Base band + category are up from the start — the empty grid is the question.
    s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y, w: 12.1, h: ROW_H, fill: { color: C.cardBg }, line: { type: "none" } });
    // The two high-risk bands land together on the last click, under text already shown.
    if (r[3]) s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y, w: 12.1, h: ROW_H, fill: { color: HILITE }, line: { type: "none" }, ...REVEAL(7) });
    s.addText(r[0], { x: CAT_X, y, w: CAT_W, h: ROW_H, color: C.ink, fontFace: F.body, fontSize: 14, bold: true, valign: "middle", margin: 0 });
    // Read + Why fill in together, one row per click.
    s.addText(r[1], { x: READ_X, y, w: READ_W, h: ROW_H, color: r[3] ? C.coral : C.slate, fontFace: F.body, fontSize: 14, bold: true, align: "center", valign: "middle", margin: 0, ...REVEAL(i + 1) });
    s.addText(r[2], { x: WHY_X, y, w: WHY_W, h: ROW_H, color: C.ink, fontFace: F.body, fontSize: 14, valign: "middle", margin: 0, ...REVEAL(i + 1) });
  });

  card(s, 0.6, 5.93, 12.1, 0.83, C.navy, REVEAL(7));
  await iconCircle(s, FA.FaExclamationCircle, 0.92, 6.09, 0.5, C.amber, C.navy, REVEAL(7));
  s.addText([
    { text: "Technical (high) and Skill (high) are the same unknown", options: { color: C.amber, bold: true } },
    { text: " — real-time sync. Two boxes, one root cause. That's what you de-risk first.", options: { color: C.white } }
  ], { x: 1.6, y: 5.93, w: 10.8, h: 0.83, fontFace: F.body, fontSize: 15, valign: "middle", margin: 0, lineSpacingMultiple: 1.04, ...REVEAL(7) });
  footer(s);
  s.addNotes("Fill this table live — the slide is the board. The six categories and the empty grid are up; each click fills one row's Read and Why, so ask the room first, take the answer, then click. Rows 2, 3, 5 and 6 all read Med — if someone argues High, take it and then give your read rather than letting the click contradict them. The two that must land are Technical and Skill. On Adoption, push past \"would you use it\" to the discovery habit from last week: the pain to confirm is \"I get skipped / I don't know my place,\" not the app idea. Only after all six are rated does the last click drop the two amber bands and the takeaway — that's the second move from the previous slide: rate all six, then look across and circle. Say it out loud: two scary boxes, one root cause, and that single unknown is what the spike targets next and what the learning plan closes later. QueueUp is a teaching vehicle, not a suggested project.");

  // 6 Know / Learn / Avoid
  s = mk(); s.background = { color: C.white };
  header(s, "De-risking, step 1", "Know / Learn / Avoid");
  const kla = [
    [FA.FaCheck, C.green, "EAF4EE", "Know", "You can already do it. No risk, no plan needed.", "CRUD app, REST backend, component UI, basic auth."],
    [FA.FaBookOpen, C.amber, "FBEEDA", "Learn", "A real but learnable gap — this one gets a plan.", "Real-time sync — the circled risk."],
    [FA.FaBan, C.coral, "FBECE8", "Avoid", "Complexity that doesn't earn its keep — cut or route around.", "Own auth, video, native mobile."]
  ];
  const kx = [0.6, 4.63, 8.66], kw = 3.84;
  for (let i = 0; i < 3; i++) {
    const x = kx[i];
    card(s, x, 2.05, kw, 3.9, kla[i][2]);
    await iconCircle(s, kla[i][0], x + 0.3, 2.35, 0.66, kla[i][1]);
    s.addText(kla[i][3], { x: x + 1.1, y: 2.4, w: kw - 1.3, h: 0.55, color: C.ink, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
    s.addText(kla[i][4], { x: x + 0.3, y: 3.2, w: kw - 0.6, h: 1.35, color: C.ink, fontFace: F.body, fontSize: 15, valign: "top", margin: 0, lineSpacingMultiple: 1.06 });
    s.addText([
      { text: "QueueUp:  ", options: { bold: true, color: C.tealDk } },
      { text: kla[i][5], options: { color: C.slate, italic: true } }
    ], { x: x + 0.3, y: 4.55, w: kw - 0.6, h: 1.25, fontFace: F.body, fontSize: 14, valign: "top", margin: 0, lineSpacingMultiple: 1.06 });
  }
  card(s, 0.6, 6.08, 12.1, 0.68, C.navy);
  s.addText([
    { text: "Every honest \"Avoid\" reduces feasibility risk", options: { color: C.amber, bold: true } },
    { text: " — routing around complexity is a skill, not a cop-out.", options: { color: C.white } }
  ], { x: 0.9, y: 6.08, w: 11.5, h: 0.68, fontFace: F.body, fontSize: 15, valign: "middle", align: "center", margin: 0 });
  footer(s);
  s.addNotes("Triage every requirement into three buckets. Know = no plan needed. Learn = gets a learning plan (the back half of class). Avoid = complexity you deliberately design around — a library, a managed service, a simpler v1. Walk QueueUp's triage live. Dwell on the bottom line: students often feel that cutting scope is cheating; reframe it as the boring-stack instinct from Session 1 — spend complexity only where it pays for itself.");

  // 7 The spike — anatomy
  s = mk(); s.background = { color: C.white };
  header(s, "De-risking, step 2", "The spike — buy a cheap answer");
  card(s, 0.6, 1.95, 12.1, 1.2, C.cardBg);
  await iconCircle(s, FA.FaFlask, 0.95, 2.28, 0.56, C.teal);
  s.addText("A time-boxed experiment (1–3 days) whose only deliverable is an answer — not a feature. Build a throwaway; keep what you learn, not the code.", { x: 1.75, y: 1.95, w: 10.7, h: 1.2, color: C.ink, fontFace: F.body, fontSize: 16.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
  const anat = [
    [FA.FaQuestion, "One clear question", "A yes/no or a number you can actually reach."],
    [FA.FaStopwatch, "A fixed time box", "1–3 days, set in advance. No box = digging forever."],
    [FA.FaBalanceScale, "Green & red, up front", "Decide what \"feasible\" vs. \"rethink\" looks like before you start."],
    [FA.FaTrashAlt, "Throwaway prototype", "You're buying an answer, not shipping. Stop when it's clear."]
  ];
  const ax = [0.6, 3.63, 6.66, 9.69], aw = 2.9;
  for (let i = 0; i < 4; i++) {
    const x = ax[i];
    card(s, x, 3.4, aw, 2.5, C.cardBg);
    await iconCircle(s, anat[i][0], x + (aw - 0.62) / 2, 3.68, 0.62, C.navy);
    s.addText(anat[i][1], { x: x + 0.1, y: 4.42, w: aw - 0.2, h: 0.7, color: C.ink, fontFace: F.body, fontSize: 15, bold: true, align: "center", valign: "top", margin: 0, lineSpacingMultiple: 1.0 });
    s.addText(anat[i][2], { x: x + 0.16, y: 5.08, w: aw - 0.32, h: 0.78, color: C.slate, fontFace: F.body, fontSize: 12.5, align: "center", valign: "top", margin: 0, lineSpacingMultiple: 1.04 });
  }
  footer(s);
  s.addNotes("A spike is the tool for a circled risk — you don't build the whole thing to find out whether the hard part is possible. Four parts, and every one matters: a single specific question, a fixed time box (the cardinal rule — no box means research with no exit), green/red lines decided in advance so you stay honest, and a throwaway bar so you stop the moment the answer is clear. Next slide runs it on QueueUp and makes the point about red.");

  // 8 Spike — red is a win + required
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: 11.4, y: -1.3, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  s.addShape(pres.shapes.OVAL, { x: 0.62, y: 0.6, w: 0.15, h: 0.15, fill: { color: C.amber } });
  s.addText("THE SPIKE, ON QUEUEUP", { x: 0.87, y: 0.5, w: 11.5, h: 0.34, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText("A red answer is a win", { x: 0.6, y: 0.9, w: 12.1, h: 0.8, color: C.white, fontFace: F.head, fontSize: 32, bold: true, margin: 0 });
  s.addText("\"Can two browsers share a live queue in under one second — in two days?\"", { x: 0.62, y: 1.75, w: 12.1, h: 0.5, color: "CFE0E9", fontFace: F.body, fontSize: 16.5, italic: true, margin: 0 });
  card(s, 0.6, 2.4, 5.95, 2.05, "EAF4EE");
  s.addText([
    { text: "GREEN → build it\n", options: { bold: true, color: C.green, fontSize: 17 } },
    { text: "Two tabs sync live in <1s. Real-time is feasible — and this retires both Technical and Skill risk at once.", options: { color: C.ink, fontSize: 14.5 } }
  ], { x: 0.9, y: 2.6, w: 5.4, h: 1.7, fontFace: F.body, valign: "top", margin: 0, lineSpacingMultiple: 1.06 });
  card(s, 6.75, 2.4, 5.95, 2.05, "FBECE8");
  s.addText([
    { text: "RED → rescope, don't quit\n", options: { bold: true, color: C.coral, fontSize: 17 } },
    { text: "Too hard or rate-limited? Ship a 5-second refresh for v1; put true real-time on the roadmap.", options: { color: C.ink, fontSize: 14.5 } }
  ], { x: 7.05, y: 2.6, w: 5.4, h: 1.7, fontFace: F.body, valign: "top", margin: 0, lineSpacingMultiple: 1.06 });
  card(s, 0.6, 4.62, 12.1, 0.92, "1E3352");
  s.addText([
    { text: "The spike turns \"is this doomed?\" into a scoping decision", options: { color: C.amber, bold: true } },
    { text: " — cheaply, and early enough to change course.", options: { color: C.white } }
  ], { x: 0.9, y: 4.62, w: 11.5, h: 0.92, fontFace: F.body, fontSize: 15.5, valign: "middle", align: "center", margin: 0 });
  card(s, 0.6, 5.72, 12.1, 0.92, C.amber);
  await iconCircle(s, FA.FaExclamationCircle, 0.92, 5.94, 0.5, C.navy, C.amber);
  s.addText([
    { text: "Required:  ", options: { bold: true, color: C.navy } },
    { text: "run at least one spike on your scariest unknown. Its result goes in your proposal (CP3), graded under Feasibility.", options: { color: C.navy } }
  ], { x: 1.6, y: 5.72, w: 10.8, h: 0.92, fontFace: F.body, fontSize: 15, valign: "middle", margin: 0, lineSpacingMultiple: 1.03 });
  footer(s, "7E92A8");
  s.addNotes("The single most important idea in the feasibility half: a red spike is not failure, it's the spike doing its job cheaply. Green retires two risks at once; red converts an existential worry into a v1 scoping call — fake real-time with polling, put it on the roadmap. Say the timebox discipline out loud: if you're not green by the deadline, you stop and reconsider, you don't keep digging. Then make the policy plain — one spike is required and it's graded in CP3, so a hand-waved feasibility claim won't fly.");

  // 10a How you actually learn — framing + discussion
  s = mk(); s.background = { color: C.white };
  header(s, "The skill under all the others", "Learning what you don't know — on purpose");
  card(s, 0.6, 1.9, 12.1, 1.5, C.navy);
  await iconCircle(s, FA.FaBrain, 0.95, 2.26, 0.74, C.amber, C.navy);
  s.addText("You've learned on someone else's schedule for 18+ years. After graduation, nobody assigns you the reading — you pick the topic, and the whole process is yours to design.", { x: 1.98, y: 1.9, w: 10.5, h: 1.5, color: "CFE0E9", fontFace: F.body, fontSize: 16, valign: "middle", margin: 0, lineSpacingMultiple: 1.06 });
  card(s, 0.6, 3.58, 12.1, 3.18, C.cardBg);
  await iconCircle(s, FA.FaComments, 0.95, 3.9, 0.62, C.teal);
  s.addText("Before we plan anything — how do you actually learn?", { x: 1.78, y: 3.92, w: 10.6, h: 0.58, color: C.ink, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "When you had to learn something genuinely new — what actually worked? What didn't?", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 12 } },
    { text: "Where do you go to learn? Does your environment change how well it goes?", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 12 } },
    { text: "How do you know when you've learned enough?", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 12 } },
    { text: "What do you still remember six months later — and why that, and not the rest?", options: { bullet: { indent: 16 } } }
  ], { x: 1.15, y: 4.68, w: 11.3, h: 1.95, color: C.ink, fontFace: F.body, fontSize: 16, valign: "top", margin: 0 });
  footer(s);
  s.addNotes("The pivot of the session — from 'what don't I know?' to 'how do I go about knowing it?' Open with the honest frame: they've learned on someone else's schedule their whole lives, and that's about to end. Then run the discussion — ask two or three of these prompts and take answers aloud; don't lecture the answers, draw them out. Watch for 'I know it when it compiles' on the third question and press on it. This is a real discussion beat (~5 min); the next slide is what you steer it toward.");

  // 10b What the discussion surfaces — the curve + techniques
  s = mk(); s.background = { color: C.white };
  header(s, "What good learners actually do", "The curve, and the techniques that pay");
  card(s, 0.6, 1.9, 12.1, 1.08, C.navy);
  await iconCircle(s, FA.FaHourglassHalf, 0.95, 2.13, 0.62, C.amber, C.navy);
  s.addText([
    { text: "No 24-hour shortcuts:  ", options: { color: C.amber, bold: true } },
    { text: "expertise comes from deliberate practice on real problems — not tutorials watched passively.  (Norvig)", options: { color: "CFE0E9" } }
  ], { x: 1.78, y: 1.9, w: 10.6, h: 1.08, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
  card(s, 0.6, 3.16, 5.95, 3.6, C.cardBg);
  await iconCircle(s, FA.FaChartLine, 0.9, 3.46, 0.6, C.teal);
  s.addText("The learning curve", { x: 1.65, y: 3.51, w: 4.6, h: 0.5, color: C.ink, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
  s.addText("Progress isn't linear: a fast start, then a plateau where most people quit and call themselves \"bad at it.\" Knowing it's coming is how you cross it. Retention comes from retrieval and use — not re-reading.", { x: 0.98, y: 4.25, w: 5.35, h: 2.4, color: C.ink, fontFace: F.body, fontSize: 14.5, valign: "top", margin: 0, lineSpacingMultiple: 1.06 });
  card(s, 6.75, 3.16, 5.95, 3.6, C.cardBg);
  await iconCircle(s, FA.FaBookOpen, 7.05, 3.46, 0.6, C.teal);
  s.addText("Techniques that pay", { x: 7.8, y: 3.51, w: 4.6, h: 0.5, color: C.ink, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "Official docs — a trainable skill, not a chore", options: { bullet: { indent: 14 }, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Notes in your own words — the translation is the learning", options: { bullet: { indent: 14 }, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Experiment — poke it, check your prediction", options: { bullet: { indent: 14 }, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Build something — concrete beats abstract", options: { bullet: { indent: 14 }, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Tutorials — but watching isn't doing", options: { bullet: { indent: 14 } } }
  ], { x: 7.13, y: 4.22, w: 5.35, h: 2.4, color: C.ink, fontFace: F.body, fontSize: 13.5, valign: "top", margin: 0 });
  footer(s);
  s.addNotes("Steer the discussion here — these are the points to surface, not to read cold. Lead with Norvig's headline: no shortcuts, expertise is deliberate practice on real problems. Name the plateau explicitly; it's exactly where people wrongly conclude they're not cut out for it, and knowing it's coming is what gets them across. The techniques list is the toolkit — the one most students have never practiced deliberately is reading documentation. Lands far better if you narrate something you personally had to learn recently.");

  // 11 Building a learning plan — five steps
  s = mk(); s.background = { color: C.white };
  header(s, "Turn a gap into a plan", "A learning plan — five steps");
  const steps = [
    ["1", "Know your \"why\"", "Motivation for the hard days, and an ending point so it doesn't sprawl forever."],
    ["2", "Set goals — break them down", "Refine into chunks with deadlines; make at least one SMART."],
    ["3", "Make a schedule", "Block real time. Know your focus limit; schedule breaks — retention loves boundaries."],
    ["4", "Be accountable to someone", "Your neighbor now, your teammate after Oct 7. Tell them what, and by when."],
    ["5", "Build something", "The spike is the build: it de-risks the project and proves the learning. Two jobs."]
  ];
  for (let i = 0; i < 5; i++) {
    const y = 1.95 + i * 0.99;
    card(s, 0.6, y, 12.1, 0.88, C.cardBg);
    s.addShape(pres.shapes.OVAL, { x: 0.85, y: y + 0.19, w: 0.5, h: 0.5, fill: { color: C.teal } });
    s.addText(steps[i][0], { x: 0.85, y: y + 0.19, w: 0.5, h: 0.5, color: C.white, fontFace: F.head, fontSize: 20, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(steps[i][1], { x: 1.55, y: y + 0.12, w: 4.35, h: 0.64, color: C.ink, fontFace: F.body, fontSize: 16.5, bold: true, valign: "middle", margin: 0 });
    s.addText(steps[i][2], { x: 6.0, y: y + 0.12, w: 6.5, h: 0.64, color: C.slate, fontFace: F.body, fontSize: 13.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.02 });
  }
  footer(s);
  s.addNotes("Frame it as stepwise refinement pointed at yourself — the same decomposition skill they use on hard programming problems. Walk all five against QueueUp's real-time gap. Steps students underrate: schedule (know your focus limit and use breaks — more start/stop boundaries improves retention) and accountability (they already have a partner — make them name one before leaving). Close on step 5 — the spike doubles as the build, so the learning plan and the feasibility work are one motion.");

  // 11 SMART goal contrast
  s = mk(); s.background = { color: C.white };
  header(s, "The heart of the plan", "A goal you can actually finish");
  card(s, 0.6, 2.1, 5.95, 3.55, "FBECE8");
  await iconCircle(s, FA.FaTimesCircle, 0.9, 2.4, 0.6, C.coral);
  s.addText("Not a usable goal", { x: 1.65, y: 2.45, w: 4.6, h: 0.5, color: C.coral, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
  s.addText("\"Learn real-time sync.\"", { x: 0.98, y: 3.25, w: 5.35, h: 0.7, color: C.ink, fontFace: F.body, fontSize: 18, italic: true, bold: true, valign: "top", margin: 0 });
  s.addText("No end point, nothing to measure, and you've never done it. You could \"work on it\" forever and never know you're done.", { x: 0.98, y: 3.95, w: 5.35, h: 1.6, color: C.ink, fontFace: F.body, fontSize: 14.5, valign: "top", margin: 0, lineSpacingMultiple: 1.06 });
  card(s, 6.75, 2.1, 5.95, 3.55, "EAF4EE");
  await iconCircle(s, FA.FaBullseye, 7.05, 2.4, 0.6, C.green);
  s.addText("SMART", { x: 7.8, y: 2.45, w: 4.6, h: 0.5, color: C.green, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
  s.addText("\"By end of day 2, two tabs share a live queue through a managed service I wired up — and I can explain how the subscription pushes updates.\"", { x: 7.13, y: 3.25, w: 5.35, h: 2.3, color: C.ink, fontFace: F.body, fontSize: 15, valign: "top", margin: 0, lineSpacingMultiple: 1.08 });
  card(s, 0.6, 5.82, 12.1, 0.92, C.navy);
  s.addText([
    { text: "That's the same sentence as the spike's green line.", options: { color: C.amber, bold: true } },
    { text: "  A good SMART goal and a good spike are often one and the same.", options: { color: C.white } }
  ], { x: 0.9, y: 5.82, w: 11.5, h: 0.92, fontFace: F.body, fontSize: 15.5, valign: "middle", align: "center", margin: 0 });
  footer(s);
  s.addNotes("Specific-Measurable-Achievable-Relevant-Timed. Build the contrast live: the left one can't be finished; the right one you can prove and put a date on. The punchline is the bottom bar — the SMART goal and the spike's green line are usually the identical sentence, which is why the learning plan and the feasibility work reinforce rather than duplicate each other. Have them draft one SMART goal in the in-class activity.");

  // 12 Own your stack + AI honestly
  s = mk(); s.background = { color: C.white };
  header(s, "Two habits that protect your time", "Own your stack · use AI honestly");
  card(s, 0.6, 2.1, 5.95, 4.0, C.cardBg);
  await iconCircle(s, FA.FaLayerGroup, 0.9, 2.4, 0.66, C.teal);
  s.addText("Tech-stack discipline", { x: 1.7, y: 2.45, w: 4.7, h: 0.55, color: C.ink, fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0 });
  s.addText("Favor tools you can own, explain, and support at 1 a.m. — and onboard the next contributor into. Reach for the hot new tool only where it clearly earns its place. Every unfamiliar tool is a \"Learn\" item you're volunteering for.", { x: 0.98, y: 3.25, w: 5.4, h: 2.75, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0, lineSpacingMultiple: 1.08 });
  card(s, 6.75, 2.1, 5.95, 4.0, C.navy);
  await iconCircle(s, FA.FaRobot, 7.05, 2.4, 0.66, C.amber, C.navy);
  s.addText("AI as a learning aid", { x: 7.85, y: 2.45, w: 4.7, h: 0.55, color: C.white, fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0 });
  s.addText("Great for accelerating understanding — explaining, scaffolding, unblocking. Never for skipping it. The test: could you explain how it works, and change it, without the tool? If not, it's still a gap — plan for it.", { x: 7.13, y: 3.25, w: 5.4, h: 2.75, color: "CFE0E9", fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0, lineSpacingMultiple: 1.08 });
  footer(s);
  s.addNotes("Two quick habits that both come down to protecting your limited time. Stack discipline: novelty is a hidden learning cost, so spend it deliberately — a tractable stack you can reason about at 1 a.m. beats an impressive one you can't. AI: the standing course norm — accelerate understanding, never replace it. The defend-what-you-submit test is the line, and it's the same test the pitch and the capstone faculty will apply. Keep this tight; it's the tail of the learning half.");

  // 13 In-class activity
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: 11.4, y: -1.3, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  s.addShape(pres.shapes.OVAL, { x: 0.62, y: 0.6, w: 0.15, h: 0.15, fill: { color: C.amber } });
  s.addText("IN-CLASS ACTIVITY · ~10 MIN", { x: 0.87, y: 0.5, w: 11.5, h: 0.34, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText("Feasibility pass + one learning plan", { x: 0.6, y: 0.9, w: 12.1, h: 0.8, color: C.white, fontFace: F.head, fontSize: 32, bold: true, margin: 0 });
  s.addText("Solo, or with your neighbor — on one starred idea:", { x: 0.62, y: 1.78, w: 12, h: 0.4, color: "CFE0E9", fontFace: F.body, fontSize: 16, italic: true, margin: 0 });
  const acts = [
    ["1", "Rate the six risks; circle the top one.", "3 min"],
    ["2", "Bucket its needs into Know / Learn / Avoid.", "2 min"],
    ["3", "Write a one-gap learning plan: why · one SMART goal · when · who you'll tell · the spike.", "4 min"],
    ["4", "Say your accountability partner's name to them before you leave.", "1 min"]
  ];
  for (let i = 0; i < 4; i++) {
    const y = 2.35 + i * 1.02;
    card(s, 0.6, y, 12.1, 0.9, "1E3352");
    s.addShape(pres.shapes.OVAL, { x: 0.85, y: y + 0.2, w: 0.5, h: 0.5, fill: { color: C.amber } });
    s.addText(acts[i][0], { x: 0.85, y: y + 0.2, w: 0.5, h: 0.5, color: C.navy, fontFace: F.head, fontSize: 20, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(acts[i][1], { x: 1.55, y: y + 0.1, w: 9.4, h: 0.7, color: C.white, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.03 });
    s.addText(acts[i][2], { x: 11.1, y: y + 0.1, w: 1.4, h: 0.7, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, align: "right", valign: "middle", margin: 0 });
  }
  footer(s, "7E92A8");
  s.addNotes("Protect this time — it's where the tools become theirs. Everyone works one starred idea through the same motion they just watched on QueueUp: rate risks, triage, and write a single one-gap learning plan with a real SMART goal and a named spike. The accountability step is deliberately social — make them actually say the name to a person. Collect one or two aloud, especially a sharp SMART goal and a well-scoped 'Avoid.' If short on time, cut step 2, not step 3.");

  // 14 Wrap
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: -1.3, y: 5.2, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaCompass, 0.9, 1.25, 0.9, C.amber, C.navy);
  s.addText("Name your risks, reduce the scary one with a cheap experiment,\nand plan the learning that closes the gap.", { x: 0.9, y: 2.3, w: 11.9, h: 1.5, color: C.white, fontFace: F.head, fontSize: 26, bold: true, italic: true, margin: 0, lineSpacingMultiple: 1.06 });
  s.addText("BEFORE WEDNESDAY, SEP 23", { x: 0.92, y: 4.15, w: 11, h: 0.35, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText([
    { text: "Bring 2–3 candidate ideas with a feasibility read (we add richness + score them Wed)", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 8 } },
    { text: "CP1 Idea Briefs due Wed, Sep 23  ·  CP2 Product Definition Brief due Mon, Sep 28", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 8 } },
    { text: "In the proposal window: run at least one spike on your scariest unknown (goes in CP3)", options: { bullet: { indent: 16 } } }
  ], { x: 0.95, y: 4.6, w: 11.7, h: 1.9, color: "CBD8E6", fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0 });
  s.addNotes("Close on the one-liner — it's the whole session in a sentence. Make the dates and the deliverable split concrete: CP1 turns in at Wednesday's convergence workshop; CP2 follows the next Monday, written after they've actually chosen. Remind them the required spike lives in the proposal window (Sep 23–Oct 5) and is graded in CP3. Preview Wednesday: they converge, we add the richness test, and they score their candidates.");

  const OUT = "Session05-Feasibility.pptx";
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
