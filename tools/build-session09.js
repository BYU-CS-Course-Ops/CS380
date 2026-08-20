const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const FA = require("react-icons/fa");

const C = {
  navy: "14233A", navy2: "1E3352", teal: "12908F", tealDk: "0E6E6D",
  amber: "E8A33D", coral: "D9614C", green: "3E9C6B",
  ink: "1E2A36", slate: "5F7284", cardBg: "F2F6F8", ice: "E4EEF1", white: "FFFFFF",
  weakBg: "FBECE8", strongBg: "EAF4EE", amberBg: "FBEEDA"
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
pres.title = "CS 301R — Session 9 — Pitch Workshop";

let PAGE = 0;
function mk() { PAGE++; return pres.addSlide(); }
function footer(slide, col) {
  const c = col || C.slate;
  slide.addText("CS 301R · Session 9 · Pitch Workshop", { x: 7.3, y: 7.04, w: 5.4, h: 0.3, align: "right", color: c, fontFace: F.body, fontSize: 10, margin: 0 });
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
function noticeBand(s, y, leadText, bodyText, h) {
  card(s, 0.6, y, 12.1, h || 0.92, C.navy);
  s.addText([
    { text: leadText + "  ", options: { color: C.amber, bold: true } },
    { text: bodyText, options: { color: C.white } }
  ], { x: 1.0, y, w: 11.3, h: h || 0.92, fontFace: F.body, fontSize: 15, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
}
// weak/strong contrast pair used through §3
function contrast(s, y, h, weakLabel, weakText, strongLabel, strongText) {
  card(s, 0.6, y, 5.95, h, C.weakBg);
  s.addText(weakLabel, { x: 0.92, y: y + 0.14, w: 5.3, h: 0.36, color: C.coral, fontFace: F.body, fontSize: 15, bold: true, valign: "middle", margin: 0 });
  s.addText(weakText, { x: 0.92, y: y + 0.56, w: 5.3, h: h - 0.72, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0, lineSpacingMultiple: 1.05 });
  card(s, 6.75, y, 5.95, h, C.strongBg);
  s.addText(strongLabel, { x: 7.07, y: y + 0.14, w: 5.3, h: 0.36, color: C.tealDk, fontFace: F.body, fontSize: 15, bold: true, valign: "middle", margin: 0 });
  s.addText(strongText, { x: 7.07, y: y + 0.56, w: 5.3, h: h - 0.72, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0, lineSpacingMultiple: 1.05 });
}
async function workSlide(kicker, title, subtitle, steps, band) {
  const s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: 11.4, y: -1.3, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  s.addShape(pres.shapes.OVAL, { x: 0.62, y: 0.6, w: 0.15, h: 0.15, fill: { color: C.amber } });
  s.addText(kicker.toUpperCase(), { x: 0.87, y: 0.5, w: 11.5, h: 0.34, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText(title, { x: 0.6, y: 0.9, w: 12.1, h: 0.8, color: C.white, fontFace: F.head, fontSize: 32, bold: true, margin: 0 });
  s.addText(subtitle, { x: 0.62, y: 1.78, w: 12, h: 0.4, color: "CFE0E9", fontFace: F.body, fontSize: 16, italic: true, margin: 0 });
  const n = steps.length;
  const gap = 0.14, top = 2.35, bottom = band ? 5.75 : 6.55;
  const h = (bottom - top - gap * (n - 1)) / n;
  for (let i = 0; i < n; i++) {
    const y = top + i * (h + gap);
    card(s, 0.6, y, 12.1, h, "1E3352");
    s.addShape(pres.shapes.OVAL, { x: 0.85, y: y + (h - 0.5) / 2, w: 0.5, h: 0.5, fill: { color: C.amber } });
    s.addText(String(i + 1), { x: 0.85, y: y + (h - 0.5) / 2, w: 0.5, h: 0.5, color: C.navy, fontFace: F.head, fontSize: 20, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(steps[i][0], { x: 1.55, y, w: steps[i][1] ? 9.4 : 10.9, h, color: C.white, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.03 });
    if (steps[i][1]) s.addText(steps[i][1], { x: 11.1, y, w: 1.4, h, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, align: "right", valign: "middle", margin: 0 });
  }
  if (band) {
    card(s, 0.6, 5.95, 12.1, 0.8, C.amber);
    s.addText(band, { x: 1.0, y: 5.95, w: 11.3, h: 0.8, color: C.navy, fontFace: F.body, fontSize: 15, bold: true, valign: "middle", margin: 0 });
  }
  footer(s, "7E92A8");
  return s;
}

async function build() {
  let s;

  // 1 Title
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: 10.9, y: -1.4, w: 4.2, h: 4.2, fill: { color: "1C3252" } });
  s.addShape(pres.shapes.OVAL, { x: 12.0, y: 5.1, w: 3.0, h: 3.0, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaBullhorn, 0.9, 1.45, 1.0, C.amber, C.navy);
  s.addText("CS 301R · SOFTWARE ENGINEERING STUDIO I", { x: 0.92, y: 2.75, w: 11, h: 0.35, color: "9FB4C7", fontFace: F.body, fontSize: 15, bold: true, charSpacing: 2, margin: 0 });
  s.addText("Persuade & Recruit", { x: 0.9, y: 3.15, w: 12.1, h: 1.3, color: C.white, fontFace: F.head, fontSize: 42, bold: true, margin: 0 });
  s.addText([
    { text: "Session 9 — the pitch workshop", options: { color: C.amber, bold: true, breakLine: true } },
    { text: "Monday, October 5, 2026", options: { color: "9FB4C7" } }
  ], { x: 0.92, y: 4.7, w: 11, h: 0.9, fontFace: F.body, fontSize: 19, margin: 0, lineSpacingMultiple: 1.2 });
  s.addNotes("Collect CP3 at the door — it's due at the start of class. Set the stakes in one line: this is the last session before the hinge, and everything they've done since Week 1 gets six minutes on Wednesday. Today has two halves — how a pitch works and how it's judged, then time to actually build one. They read Peyton Jones and the CP4 assignment, so point at both rather than re-teaching them.");

  // 2 What Wednesday decides
  s = mk(); s.background = { color: C.white };
  header(s, "Framing — 6 min", "What Wednesday actually decides");
  const flow = [
    [FA.FaMicrophone, "You pitch", "Wed — 6–8 min + Q&A"],
    [FA.FaClipboardCheck, "The room scores", "Wed — criteria + would you join?"],
    [FA.FaBookOpen, "You read the proposals", "the weekend — anchors posted"],
    [FA.FaUsers, "Teams announced", "Mon, Oct 12"]
  ];
  for (let i = 0; i < flow.length; i++) {
    const x = 0.6 + i * 3.13, w = 2.87;
    card(s, x, 2.0, w, 2.2, i === 3 ? C.navy : C.cardBg);
    await iconCircle(s, flow[i][0], x + (w - 0.7) / 2, 2.28, 0.7, i === 3 ? C.amber : C.teal, i === 3 ? C.navy : "FFFFFF");
    s.addText(flow[i][1], { x: x + 0.16, y: 3.12, w: w - 0.32, h: 0.5, color: i === 3 ? C.white : C.ink, fontFace: F.body, fontSize: 17, bold: true, align: "center", valign: "top", margin: 0 });
    s.addText(flow[i][2], { x: x + 0.16, y: 3.62, w: w - 0.32, h: 0.5, color: i === 3 ? "CFE0E9" : C.slate, fontFace: F.body, fontSize: 14.5, align: "center", valign: "top", margin: 0 });
    if (i < 3) s.addText("→", { x: x + w - 0.02, y: 2.9, w: 0.28, h: 0.4, color: C.tealDk, fontFace: F.body, fontSize: 22, bold: true, align: "center", margin: 0 });
  }
  card(s, 0.6, 4.5, 5.95, 1.25, C.cardBg);
  s.addText([
    { text: "Evaluate live. Commit deliberately.\n", options: { color: C.tealDk, bold: true, fontSize: 17 } },
    { text: "Wednesday you pitch, score, and rank — privately. You commit on Monday, once you have read the proposals.", options: { color: C.ink } }
  ], { x: 0.92, y: 4.5, w: 5.3, h: 1.25, fontFace: F.body, fontSize: 15, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  card(s, 6.75, 4.5, 5.95, 1.25, C.strongBg);
  s.addText([
    { text: "Solo stays open\n", options: { color: C.tealDk, bold: true, fontSize: 17 } },
    { text: "A pitch that doesn't gather a team still proceeds — at solo scope. Not a consolation prize.", options: { color: C.ink } }
  ], { x: 7.07, y: 4.5, w: 5.3, h: 1.25, fontFace: F.body, fontSize: 15, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  card(s, 0.6, 5.95, 12.1, 0.8, C.amber);
  s.addText("Due now: CP3 Written Proposal — with images of both annotated draft copies.", { x: 0.9, y: 5.95, w: 11.5, h: 0.8, color: C.navy, fontFace: F.body, fontSize: 15.5, bold: true, align: "center", valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("Six minutes. Make the chain concrete — pitch, peer scores, ranked preferences, a weekend with the proposals, teams announced Monday — because students imagine Pitch Day as a presentation exercise when it is really a selection event. Say why the split exists: evaluating is a live act, committing deserves the documents. Then say the solo line early and without apology; with a small class several projects will run solo, and a student who hears that now pitches more honestly than one who thinks a team is the only passing outcome. Collect CP3 while you talk.");

  // 3 The pitch arc
  s = mk(); s.background = { color: C.white };
  header(s, "The pitch arc — 11 min", "Five beats, and a budget for each");
  const beats = [
    ["Problem & who has it", "~90s", "Lead with the user and the evidence — not the app."],
    ["Solution, shown concretely", "~90s", "What you'd build. The vertical slice, made visible."],
    ["Why it's feasible", "~2 min", "Scope, stack, top risk + mitigation. Honest confidence."],
    ["Why it's worth joining", "~90s", "What a teammate would get to build. Where it grows."],
    ["The ask", "~30s", "Explicit: how many teammates, and what you'd build first."]
  ];
  for (let i = 0; i < beats.length; i++) {
    const y = 1.95 + i * 0.83;
    card(s, 0.6, y, 12.1, 0.72, i === 4 ? C.ice : C.cardBg);
    s.addShape(pres.shapes.OVAL, { x: 0.88, y: y + 0.16, w: 0.4, h: 0.4, fill: { color: i === 4 ? C.tealDk : C.teal } });
    s.addText(String(i + 1), { x: 0.88, y: y + 0.16, w: 0.4, h: 0.4, color: C.white, fontFace: F.head, fontSize: 16, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(beats[i][0], { x: 1.48, y, w: 3.5, h: 0.72, color: C.ink, fontFace: F.body, fontSize: 17, bold: true, valign: "middle", margin: 0 });
    s.addText(beats[i][1], { x: 5.0, y, w: 0.85, h: 0.72, color: C.tealDk, fontFace: F.body, fontSize: 15, bold: true, valign: "middle", margin: 0 });
    s.addText(beats[i][2], { x: 6.0, y, w: 6.4, h: 0.72, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0 });
  }
  card(s, 0.6, 6.13, 12.1, 0.75, C.weakBg);
  s.addText([
    { text: "The usual failure:  ", options: { bold: true, color: C.coral } },
    { text: "five minutes on the problem, thirty seconds on feasibility. The budget is the defense — rehearse against a clock.", options: { color: C.ink } }
  ], { x: 0.95, y: 6.13, w: 11.4, h: 0.75, fontFace: F.body, fontSize: 15, valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("Eleven minutes. Walk the beats once, then spend the time on the two that students under-serve: feasibility gets the biggest budget and usually gets the least rehearsal, and the ask gets skipped entirely. Tie it to the reading — Peyton Jones's 'if they remember one thing, what is it?' is exactly how you decide what to cut when you're at nine minutes. Warn them that beat 2 must be concrete — walk the room through what a user actually does, step by step, or sketch the one screen that matters. Nobody has built anything yet, so concrete here means a described workflow or a drawn mockup, not a demo.");

  // 4 Slides — the floor
  s = mk(); s.background = { color: C.white };
  header(s, "Slides that help — 8 min", "The floor, then five contrasts");
  const floor = [
    [FA.FaLayerGroup, "5–7 slides", "Not twenty. You have six minutes."],
    [FA.FaTextHeight, "Nothing under ~30pt", "If it needs 18pt, it belongs in the talk."],
    [FA.FaLightbulb, "One idea per slide", "The slide makes one claim."],
    [FA.FaVolumeMute, "Nothing to read aloud", "If you'd read it out, cut it."]
  ];
  for (let i = 0; i < floor.length; i++) {
    const x = 0.6 + i * 3.13, w = 2.87;
    card(s, x, 2.0, w, 2.35, C.cardBg);
    await iconCircle(s, floor[i][0], x + (w - 0.68) / 2, 2.26, 0.68, C.teal);
    s.addText(floor[i][1], { x: x + 0.16, y: 3.08, w: w - 0.32, h: 0.5, color: C.ink, fontFace: F.body, fontSize: 18, bold: true, align: "center", valign: "top", margin: 0 });
    s.addText(floor[i][2], { x: x + 0.16, y: 3.6, w: w - 0.32, h: 0.65, color: C.slate, fontFace: F.body, fontSize: 15, align: "center", valign: "top", margin: 0, lineSpacingMultiple: 1.04 });
  }
  noticeBand(s, 4.62, "The principle underneath:", "slides are evidence and memory aids — you are the pitch. If the deck could deliver itself, it's a document, and you already submitted the document.", 1.0);
  card(s, 0.6, 5.82, 12.1, 0.95, C.amberBg);
  s.addText([
    { text: "Next five slides: the same claim, made badly and made well.  ", options: { bold: true, color: C.tealDk } },
    { text: "Each pair teaches one move you can apply to your own deck tonight.", options: { color: C.ink } }
  ], { x: 0.95, y: 5.82, w: 11.4, h: 0.95, fontFace: F.body, fontSize: 15, valign: "middle", margin: 0, lineSpacingMultiple: 1.03 });
  footer(s);
  s.addNotes("Two minutes on this one. The floor is mechanical and non-negotiable, so state it and move — the contrasts are where the learning is. Kawasaki gives them the numbers; what he doesn't give them is why, which is the next three slides. If anyone objects that 5–7 slides is too few, point at the clock: six minutes across seven slides is fifty seconds a slide, and they will overrun anyway.");

  // 5 Contrast 1 & 2
  s = mk(); s.background = { color: C.white };
  header(s, "Contrast 1 & 2", "Show the workaround. Say the number.");
  s.addText("The problem slide", { x: 0.6, y: 1.78, w: 12.1, h: 0.3, color: C.slate, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 1, margin: 0 });
  contrast(s, 2.12, 2.05,
    "A bulleted essay",
    "• Hard to find items\n• Time-consuming\n• Error-prone",
    "A photograph of what they do today",
    "The spiral notebook and the shoebox of printed photos, on screen. The photo is the argument.");
  s.addText("The evidence line", { x: 0.6, y: 4.35, w: 12.1, h: 0.3, color: C.slate, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 1, margin: 0 });
  contrast(s, 4.68, 1.95,
    "An adjective",
    "\"Many users struggle with this today.\"",
    "A number",
    "\"3 of the 4 wardrobe leads I interviewed keep inventory on paper.\"");
  footer(s);
  s.addNotes("Four minutes for both pairs. The first is the one students resist: they think bullets look professional and a photo looks casual, when the photo is the only thing on the slide that constitutes evidence. The second is quick and lands hard — an adjective is what you write when you don't have the number, and this room can hear the difference instantly. Ask whether anyone's proposal — submitted an hour ago — currently says 'many users' or 'a lot of people.' Most rooms go quiet, and that is the lesson: the adjective is already in their writing, and it will be on their slides Wednesday unless they replace it tonight with the number from their discovery notes.");

  // 6 Contrast 3
  s = mk(); s.background = { color: C.white };
  header(s, "Contrast 3", "A diagram argues. Logos decorate.");
  contrast(s, 1.95, 2.55,
    "The stack logo collage",
    "A wall of framework logos. It says you chose tools. It invites \"why that stack?\" with nothing on screen that answers.",
    "One boxes-and-arrows sketch",
    "phone → search → catalog → photo store. One claim about how the slice works, drawn so a skeptic can question it.");
  card(s, 0.6, 4.7, 12.1, 1.05, C.cardBg);
  await iconCircle(s, FA.FaProjectDiagram, 0.95, 4.92, 0.6, C.teal);
  s.addText("A diagram you can be questioned about is worth more than a slide nobody can argue with.", { x: 1.78, y: 4.7, w: 10.6, h: 1.05, color: C.ink, fontFace: F.body, fontSize: 16.5, valign: "middle", margin: 0 });
  card(s, 0.6, 5.95, 12.1, 0.82, C.amberBg);
  s.addText([
    { text: "Where this comes from:  ", options: { bold: true, color: C.tealDk } },
    { text: "Michael Alley's assertion–evidence approach — a sentence assertion, supported by visual evidence. It's in your optional readings, and it's backed by studies of how much an audience actually understands.", options: { color: C.ink } }
  ], { x: 0.95, y: 5.95, w: 11.4, h: 0.82, fontFace: F.body, fontSize: 14.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.03 });
  footer(s);
  s.addNotes("Two minutes. Credit Alley out loud — students should hear that the last three contrasts are a documented finding rather than the instructor's taste, and citing the source of a borrowed method is exactly the behavior this course keeps asking of them. The research measures audience comprehension: people who saw assertion-evidence slides understood and retained more than people who saw the same content as headline-plus-bullets. If a student's architecture is genuinely uncertain, say that a diagram with a question mark on one box is still stronger than logos: it shows where the risk lives, which is beat 3's job anyway.");

  // 7 Contrast 4 & 5
  s = mk(); s.background = { color: C.white };
  header(s, "Contrast 4 & 5", "Spend your last slide on what you want");
  contrast(s, 1.95, 2.15,
    "\"Questions?\" in 60-point type",
    "This slide is on screen for the entire Q&A — the longest-running slide of your pitch, spent on a word.",
    "The ask, left standing",
    "\"Looking for 1–3 teammates. First thing we'd build: the photo-tagging flow.\" Still there while they decide.");
  contrast(s, 4.32, 1.85,
    "An agenda slide",
    "A six-minute talk does not need a table of contents.",
    "Thirty more seconds of the problem",
    "Cutting the agenda buys back the time your evidence needs.");
  card(s, 0.6, 6.4, 12.1, 0.62, C.navy);
  s.addText("Every slide is competing for six minutes. Make each one earn its place.", { x: 0.9, y: 6.4, w: 11.5, h: 0.62, color: C.white, fontFace: F.body, fontSize: 15.5, bold: true, align: "center", valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("Two minutes. The ask-slide move is the highest-leverage thing on this slide and almost nobody does it: during Q&A the audience stares at your last slide for three minutes, so it should be the thing you want them to remember and act on. The agenda point is a throwaway laugh, but it makes the budget concrete — thirty seconds is a third of beat 1.");

  // 8 Q&A
  s = mk(); s.background = { color: C.white };
  header(s, "Q&A under pressure — 8 min", "Composure and honesty, not omniscience");
  card(s, 0.6, 1.95, 12.1, 0.85, C.ice);
  s.addText([
    { text: "Graded as:  ", options: { bold: true, color: C.tealDk } },
    { text: "CP4 — Handling of questions, 15 points of 100, scored by the instructor. Your peers score the same behavior as Preparedness.", options: { color: C.ink } }
  ], { x: 0.95, y: 1.95, w: 11.4, h: 0.85, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0 });
  const moves = [
    [FA.FaBullseye, "Answer the question asked", "Not the one you rehearsed. The room notices the swap."],
    [FA.FaHandsHelping, "\"I don't know yet\"", "…followed by how you'd find out. This is a strong answer, not a weak one."],
    [FA.FaBan, "Never bluff feasibility", "This room builds software. They can tell, and it costs you the whole pitch."]
  ];
  for (let i = 0; i < moves.length; i++) {
    const x = 0.6 + i * 4.07, w = 3.83;
    card(s, x, 3.0, w, 2.35, C.cardBg);
    await iconCircle(s, moves[i][0], x + 0.28, 3.26, 0.62, C.teal);
    s.addText(moves[i][1], { x: x + 0.28, y: 4.0, w: w - 0.56, h: 0.5, color: C.ink, fontFace: F.body, fontSize: 17.5, bold: true, valign: "top", margin: 0 });
    s.addText(moves[i][2], { x: x + 0.28, y: 4.5, w: w - 0.56, h: 0.75, color: C.ink, fontFace: F.body, fontSize: 15, valign: "top", margin: 0, lineSpacingMultiple: 1.04 });
  }
  card(s, 0.6, 5.6, 12.1, 1.15, C.navy);
  s.addText([
    { text: "Prep these three tonight:  ", options: { color: C.amber, bold: true } },
    { text: "Why would anyone use this over X?  ·  What's your riskiest assumption?  ·  What gets cut first if you're behind at Week 10?", options: { color: C.white } }
  ], { x: 1.0, y: 5.6, w: 11.3, h: 1.15, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  footer(s);
  s.addNotes("Eight minutes. Nobody has presented here, so don't ask for a volunteer's project to interrogate — model it on the costume-catalog sample instead: put one of the three questions to the room about that project, take a bluffed answer, then an honest one, and let them hear the difference. If you want it personal, ask two or three students to answer only 'what is your riskiest assumption?' about their own project in one sentence — that needs no context from the room. Push hard on the honesty move: students believe admitting a gap loses points, and the rubric rewards the opposite. Name the failure mode you'll actually see Wednesday — a confident-sounding non-answer to a feasibility question, delivered to a room of people who have built software and can hear it immediately.");

  // 9 Two instruments
  s = mk(); s.background = { color: C.white };
  header(s, "Two instruments — 11 min", "Your peers do not grade you");
  card(s, 0.6, 1.95, 5.95, 4.05, C.navy);
  await iconCircle(s, FA.FaUserTie, 0.95, 2.2, 0.62, C.amber, C.navy);
  s.addText("CP4 rubric", { x: 1.78, y: 2.25, w: 4.5, h: 0.5, color: C.white, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "Filled in by the instructor", options: { color: C.amber, bold: true, breakLine: true, paraSpaceAfter: 7 } },
    { text: "Measures your pitch: clarity · persuasion & recruiting (25 — the heaviest) · feasibility defense · handling of questions · slides · delivery", options: { color: "CFE0E9", breakLine: true, paraSpaceAfter: 7 } },
    { text: "Decides your CP4 grade — 8% of the course", options: { color: C.white, bold: true } }
  ], { x: 1.0, y: 3.05, w: 5.2, h: 2.75, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0, lineSpacingMultiple: 1.05 });
  card(s, 6.75, 1.95, 5.95, 4.05, C.cardBg);
  await iconCircle(s, FA.FaClipboardList, 7.1, 2.2, 0.62, C.teal);
  s.addText("Pitch Evaluation Sheet", { x: 7.93, y: 2.25, w: 4.5, h: 0.5, color: C.ink, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "Filled in by you, for every pitch but your own", options: { color: C.tealDk, bold: true, breakLine: true, paraSpaceAfter: 7 } },
    { text: "Measures the idea: the seven selection criteria you've used since Week 3, plus \"would you join?\" and two comment lines", options: { color: C.ink, breakLine: true, paraSpaceAfter: 7 } },
    { text: "Feeds selection and team formation — instructor has final say", options: { color: C.ink, bold: true } }
  ], { x: 7.15, y: 3.05, w: 5.2, h: 2.75, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0, lineSpacingMultiple: 1.05 });
  card(s, 0.6, 6.15, 12.1, 0.72, C.amber);
  s.addText("Peer scores inform the instructor's judgment. Peers never assign grades — which is what makes honest scoring safe.", { x: 0.9, y: 6.15, w: 11.5, h: 0.72, color: C.navy, fontFace: F.body, fontSize: 15.5, bold: true, align: "center", valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("Put both documents up and let them look. The confusion this prevents is real: students who think classmates grade them either inflate everything or get defensive about their own scores. Say the asymmetry twice. Then make the professionalism argument — scoring peers fairly against shared criteria is the same act as reviewing a PR or evaluating a proposal at work, and it is graded here for that reason.");

  // 10 CP4 rubric — full, for walking through on screen
  s = mk(); s.background = { color: C.white };
  header(s, "Instrument 1 — the instructor's", "CP4 rubric — how your pitch is graded");
  const cp4 = [
    ["Problem / solution clarity", "20", "The audience grasps the need and the idea immediately."],
    ["Persuasiveness & recruiting", "25", "Compelling enough to attract teammates; the call to join is explicit."],
    ["Feasibility defense", "15", "Defends scope and trade-offs convincingly under questioning."],
    ["Handling of questions", "15", "Direct, composed, honest — including \u201cI don\u2019t know yet, and here\u2019s how I\u2019d find out.\u201d"],
    ["Slide & visual quality", "10", "Clean, purposeful visuals that carry evidence rather than text."],
    ["Delivery & professionalism", "15", "Confident, well-paced, and within time."]
  ];
  for (let i = 0; i < cp4.length; i++) {
    const y = 1.95 + i * 0.72;
    const hot = i === 1;
    card(s, 0.6, y, 12.1, 0.64, hot ? C.ice : C.cardBg);
    s.addText(cp4[i][0], { x: 0.92, y, w: 3.75, h: 0.64, color: hot ? C.tealDk : C.ink, fontFace: F.body, fontSize: 16.5, bold: true, valign: "middle", margin: 0 });
    s.addText(cp4[i][1], { x: 4.72, y, w: 0.62, h: 0.64, color: hot ? C.tealDk : C.slate, fontFace: F.body, fontSize: 16, bold: hot, align: "right", valign: "middle", margin: 0 });
    s.addText(cp4[i][2], { x: 5.6, y, w: 6.8, h: 0.64, color: C.ink, fontFace: F.body, fontSize: 15, valign: "middle", margin: 0 });
  }
  card(s, 0.6, 6.35, 12.1, 0.62, C.amberBg);
  s.addText([
    { text: "Recruiting is the heaviest criterion on purpose.  ", options: { bold: true, color: C.tealDk } },
    { text: "This is the one rubric in the course where audience effect is part of the grade.", options: { color: C.ink } }
  ], { x: 0.95, y: 6.35, w: 11.4, h: 0.62, fontFace: F.body, fontSize: 15, valign: "middle", align: "center", margin: 0 });
  footer(s);
  s.addNotes("Walk the six rows without reading them verbatim — they have the assignment. Two points earn the time. First, persuasion and recruiting at 25 is the heaviest single criterion, which tells them where to spend rehearsal: the ask and the why-join beat, not the architecture. Second, delivery includes being within time, so overrunning costs points on top of whatever gets cut. Pause on handling of questions and connect it back to the honesty move from the previous slide.");

  // 11 Peer sheet — full, for walking through on screen
  s = mk(); s.background = { color: C.white };
  header(s, "Instrument 2 — yours", "The Pitch Evaluation Sheet — what you fill in");
  const pes = [
    ["Value / real need", "A specific, reachable userbase with an evidenced, felt need"],
    ["Feasibility", "Risks named honestly; scope, stack, and mitigation credible"],
    ["Richness / breadth", "Several engineering dimensions; room for a team to grow into"],
    ["Scope realism", "The MVP plausibly fits the real build window"],
    ["Extensibility", "Others could credibly keep building on it"],
    ["Maintainability", "A tractable stack the team could own, explain, and support"],
    ["Preparedness", "Knows the idea's weaknesses; answered questions honestly"]
  ];
  for (let i = 0; i < pes.length; i++) {
    const y = 1.9 + i * 0.53;
    card(s, 0.6, y, 8.15, 0.46, C.cardBg);
    s.addText(pes[i][0], { x: 0.88, y, w: 2.5, h: 0.46, color: C.ink, fontFace: F.body, fontSize: 15, bold: true, valign: "middle", margin: 0 });
    s.addText(pes[i][1], { x: 3.45, y, w: 4.5, h: 0.46, color: C.slate, fontFace: F.body, fontSize: 13.5, valign: "middle", margin: 0 });
    s.addText("1  2  3", { x: 7.95, y, w: 0.72, h: 0.46, color: C.tealDk, fontFace: F.body, fontSize: 14, bold: true, align: "right", valign: "middle", margin: 0 });
  }
  card(s, 8.95, 1.9, 3.75, 1.75, C.navy);
  s.addText([
    { text: "Would you join?\n", options: { color: C.amber, bold: true, fontSize: 16 } },
    { text: "Yes · Maybe · No — plus one line of why. Answer as an outside observer.", options: { color: "CFE0E9" } }
  ], { x: 9.25, y: 1.9, w: 3.15, h: 1.75, fontFace: F.body, fontSize: 14.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
  card(s, 8.95, 3.78, 3.75, 1.75, C.strongBg);
  s.addText([
    { text: "Two lines back\n", options: { color: C.tealDk, bold: true, fontSize: 16 } },
    { text: "Strongest moment · sharpest concern. Anonymized, and the presenter reads them.", options: { color: C.ink } }
  ], { x: 9.25, y: 3.78, w: 3.15, h: 1.75, fontFace: F.body, fontSize: 14.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
  card(s, 8.95, 5.66, 3.75, 1.0, C.amberBg);
  s.addText("One sheet per pitch. Score during the Q&A.", { x: 9.15, y: 5.66, w: 3.35, h: 1.0, color: C.ink, fontFace: F.body, fontSize: 14.5, bold: true, valign: "middle", align: "center", margin: 0, lineSpacingMultiple: 1.04 });
  card(s, 0.6, 5.66, 8.15, 1.0, C.cardBg);
  s.addText("Seven criteria — the same yardstick you scored your own ideas against in Week 3.", { x: 0.9, y: 5.66, w: 7.55, h: 1.0, color: C.ink, fontFace: F.body, fontSize: 15, valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("This is the sheet they'll hold on Wednesday, so let them look at the whole thing at once. Point out that the left column is the selection criteria, unchanged since Week 3 — they have scored their own ideas against these, so the calibration work is mostly done. Then the right column: the recruiting question with its why line, and the two comment lines that go back anonymized. Say that presenters read those comments, so write the sentence you'd want to receive.");

  // 12 Calibration
  s = mk(); s.background = { color: C.white };
  header(s, "Calibrate — scope realism", "What a 3, a 2, and a 1 sound like");
  const cal = [
    ["3", C.green, C.strongBg, "\"v1 is one theater's wardrobe: photograph and tag what's in the shop, search it from a phone on the shop floor. No borrowing between theaters until that works. Six build hours a week for five weeks — about thirty hours.\"", "Bounded. Arithmetic shown. You can picture the demo."],
    ["2", C.amber, C.amberBg, "\"The MVP is the catalog, search, and borrow requests — and I'll get the inter-theater sharing working if there's time.\"", "Core is plausible; \"if there's time\" is where a second, unbounded project hides. Score the sentence, not the intent."],
    ["1", C.coral, C.weakBg, "\"A platform where every community theater in the state shares costumes — accounts, messaging, and recommendations.\"", "Every hour counted as build time, every task assumed easy. No arithmetic was done here."]
  ];
  for (let i = 0; i < cal.length; i++) {
    const y = 1.95 + i * 1.62;
    card(s, 0.6, y, 12.1, 1.45, cal[i][2]);
    s.addShape(pres.shapes.OVAL, { x: 0.9, y: y + 0.42, w: 0.6, h: 0.6, fill: { color: cal[i][1] } });
    s.addText(cal[i][0], { x: 0.9, y: y + 0.42, w: 0.6, h: 0.6, color: cal[i][1] === C.amber ? C.navy : C.white, fontFace: F.head, fontSize: 22, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(cal[i][3], { x: 1.7, y: y + 0.12, w: 6.5, h: 1.2, color: C.ink, fontFace: F.body, fontSize: 15, italic: true, valign: "middle", margin: 0, lineSpacingMultiple: 1.03 });
    s.addText(cal[i][4], { x: 8.4, y: y + 0.12, w: 4.0, h: 1.2, color: C.slate, fontFace: F.body, fontSize: 14.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.03 });
  }
  footer(s);
  s.addNotes("Use the costume-catalog project from Session 7 so nobody is learning to score while scoring their own idea. The 2 is the one to dwell on — 'if there's time' is the single most common hedge in a proposal, and naming it as an unbounded second project makes it visible forever. Name the two errors that produce a 1, because they compound: overestimating the hours that actually exist, and underestimating what each piece of work costs once integration, debugging, and the parts nobody thinks about are counted. Close with the two rules: score each criterion independently, and score against the criteria rather than against the previous pitch.");

  // 13 The bias
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: 11.2, y: -1.2, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  s.addShape(pres.shapes.OVAL, { x: 0.62, y: 0.55, w: 0.15, h: 0.15, fill: { color: C.amber } });
  s.addText("THE BIAS TO BEAT", { x: 0.87, y: 0.44, w: 11.5, h: 0.34, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText("\"Would you join this project?\"", { x: 0.6, y: 0.82, w: 12.1, h: 0.85, color: C.white, fontFace: F.head, fontSize: 31, bold: true, margin: 0 });
  card(s, 0.6, 1.9, 12.1, 1.0, "3A2A2A");
  s.addText([
    { text: "The reflex answer:  ", options: { color: C.coral, bold: true } },
    { text: "\"No — I have my own project.\"   That is not information. Everyone here has their own project.", options: { color: "F2DEDA" } }
  ], { x: 1.0, y: 1.9, w: 11.3, h: 1.0, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0 });
  card(s, 0.6, 3.05, 12.1, 1.35, C.amber);
  await iconCircle(s, FA.FaEye, 0.95, 3.4, 0.65, C.navy, C.amber);
  s.addText("Answer as an outside observer: if you had no project of your own and were looking for something worth spending your time on — would this be it?", { x: 1.85, y: 3.05, w: 10.5, h: 1.35, color: C.navy, fontFace: F.body, fontSize: 17, bold: true, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
  card(s, 0.6, 4.58, 5.95, 1.75, "1E3352");
  s.addText([
    { text: "A reason about you\n", options: { color: C.coral, bold: true, fontSize: 16 } },
    { text: "\"I already have my own idea.\"  \"I'm committed elsewhere.\"  →  that's the bias talking.", options: { color: "CFE0E9" } }
  ], { x: 1.0, y: 4.58, w: 5.2, h: 1.75, fontFace: F.body, fontSize: 15, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
  card(s, 6.75, 4.58, 5.95, 1.75, "1E3352");
  s.addText([
    { text: "A reason about the project\n", options: { color: C.green, bold: true, fontSize: 16 } },
    { text: "\"The domain doesn't grab me.\"  \"I don't believe the scope.\"  →  that's information they can use.", options: { color: "CFE0E9" } }
  ], { x: 7.15, y: 4.58, w: 5.2, h: 1.75, fontFace: F.body, fontSize: 15, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
  s.addText("Checking \"Yes\" commits you to nothing — teams form after the instructor blends the input.", { x: 0.6, y: 6.45, w: 12.1, h: 0.45, color: "9FB4C7", fontFace: F.body, fontSize: 15, italic: true, align: "center", margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("Spend a full minute here — this single slide protects the quality of Wednesday's data. Every evaluator in the room is also a presenter, so the defensive no is the path of least resistance, and if everyone takes it the sheet tells the selection nothing and each presenter learns only that the room was busy. Give them the reframe and the tell: a reason about you is bias, a reason about the project is information. The habit generalizes — it's the same move as judging a proposal that competes with your own for budget, and the same reason review boards ask members to declare an interest rather than quietly score low. Same discipline as reviewing a PR that competes with your own approach.");

  // 14 Build time — work slide
  s = await workSlide(
    "Build it · 10 min · solo",
    "Decide what the pitch says",
    "On the Pitch Build Sheet — quiet, on paper. You are not making slides yet:",
    [
      ["The five beats, each with its time budget written next to it.", "1 line each"],
      ["One piece of evidence for beat 1 — the number or quote you'll say out loud.", "no adjectives"],
      ["The ask, word for word, so it doesn't evaporate at minute six.", "verbatim"],
      ["A slide list — titles only, 5–7. What is each slide for?", "titles only"]
    ],
    "Slides are tonight's job. They go faster once these four boxes are full."
  );
  s.addNotes("Hand out the build sheet and hold the room quiet — this is the part they cannot do at home tonight without having decided it here. Circulate and read over shoulders. Two things to catch: a beat-1 evidence line that is still an adjective ('many users'), and a slide list that is really the table of contents of the written proposal. Both are fixable in thirty seconds of conversation now and painful to fix at 11pm.");

  // 15 Practice round — work slide
  s = await workSlide(
    "Run it once · 14 min",
    "Beats 1–3, standing, against the clock",
    "Pairs (one triad if we're odd) — mixed domains, so your listener is genuinely cold:",
    [
      ["Deliver beats 1–3 from your notes — problem, solution, the start of feasibility.", "~3 min"],
      ["Listener: score value and scope realism, ask one question from the list, give one line back.", "~2 min"],
      ["Swap. Then reset for the second run.", "then swap"]
    ],
    "Only two criteria today — the point is to hear the register and feel the clock."
  );
  s.addNotes("Announce pairs, start the clock — phone timers are fine — and be strict about standing — delivering seated turns it into reading aloud. Circulate and listen for the front of the pitch: if the problem isn't landing in ninety seconds it will not land on Wednesday. Note the two or three failures the room shares rather than coaching every pair individually; the collective debrief in the wrap is worth more than a third rotation would be.");

  // 16 Wrap
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: -1.3, y: 5.2, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaBullhorn, 0.9, 1.15, 0.85, C.amber, C.navy);
  s.addText("Six minutes to make someone want to build it with you.", { x: 0.9, y: 2.15, w: 11.9, h: 0.95, color: C.white, fontFace: F.head, fontSize: 27, bold: true, italic: true, margin: 0, lineSpacingMultiple: 1.06 });
  s.addText("WEDNESDAY, OCT 7 — PITCH DAY", { x: 0.92, y: 3.3, w: 11, h: 0.35, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText([
    { text: "Order is drawn at random at the start of class — be ready to go first", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 6 } },
    { text: "6–8 min + 2–3 min Q&A — timed, and the limit is real", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 6 } },
    { text: "Slides posted or loaded before class starts — no day-of fiddling", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 6 } },
    { text: "Paper evaluation sheets at the door — one per pitch you watch", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 6 } },
    { text: "You leave with a ranked preference slip, not a team — proposals post Thursday", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 6 } },
    { text: "Teams announced Mon, Oct 12; charters written in class that day", options: { bullet: { indent: 16 } } }
  ], { x: 0.95, y: 3.75, w: 11.7, h: 2.0, color: "CBD8E6", fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0 });
  card(s, 0.6, 5.9, 12.1, 0.85, C.amber);
  s.addText("Tonight: rehearse out loud, against a timer, twice. Cut until it fits. Then build the slides you listed.", { x: 0.9, y: 5.9, w: 11.5, h: 0.85, color: C.navy, fontFace: F.body, fontSize: 15.5, bold: true, align: "center", valign: "middle", margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("Close fast and concretely — logistics first, because an unclear Pitch Day costs everyone. Say the Monday piece clearly: Wednesday ends with a private ranked slip rather than people sorting into groups, the anchor proposals go up Thursday, and teams are announced Monday — so the weekend reading is real work. Stress the random draw: the order is generated and shown Wednesday at the start of class, so there is no back-of-the-room strategy and nobody gets to watch two pitches first. Everyone prepares to go first. Then the order of operations tonight: rehearse first, build slides second — slides built before the words are decided become the words. End on the line at the top: six minutes to make someone want to build it with you.");

  const OUT = "Session09-PitchWorkshop.pptx";
  await pres.writeFile({ fileName: OUT });
  console.log("WROTE", PAGE, "slides");
  try {
    const { verifyDeck, reportText } = require("./verify-deck.js");
    console.log(reportText(await verifyDeck(OUT)));
  } catch (e) { console.warn("verify-deck skipped:", e.message); }
}
build().catch(e => { console.error(e); process.exit(1); });
