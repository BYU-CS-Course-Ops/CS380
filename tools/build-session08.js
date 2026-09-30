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
pres.title = "CS 301R — Session 8 — Proposal Peer Review";

let PAGE = 0;
function mk() { PAGE++; return pres.addSlide(); }
function footer(slide, col) {
  const c = col || C.slate;
  slide.addText("CS 301R · Session 8 · Peer Review Workshop", { x: 7.3, y: 7.04, w: 5.4, h: 0.3, align: "right", color: c, fontFace: F.body, fontSize: 10, margin: 0 });
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
// navy "work instructions" slide — stays on screen while students work
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
  await iconCircle(s, FA.FaPenFancy, 0.9, 1.45, 1.0, C.amber, C.navy);
  s.addText("CS 301R · SOFTWARE ENGINEERING STUDIO I", { x: 0.92, y: 2.75, w: 11, h: 0.35, color: "9FB4C7", fontFace: F.body, fontSize: 15, bold: true, charSpacing: 2, margin: 0 });
  s.addText("Your Draft Meets Its Readers", { x: 0.9, y: 3.15, w: 12.1, h: 1.3, color: C.white, fontFace: F.head, fontSize: 42, bold: true, margin: 0 });
  s.addText([
    { text: "Session 8 — peer review + scope-narrowing clinic", options: { color: C.amber, bold: true, breakLine: true } },
    { text: "Wednesday, September 30, 2026", options: { color: "9FB4C7" } }
  ], { x: 0.92, y: 4.7, w: 11, h: 0.9, fontFace: F.body, fontSize: 19, margin: 0, lineSpacingMultiple: 1.2 });
  s.addNotes("Start on time — this session is almost entirely work, and the two rounds are what make it valuable. Have the pairings ready to read out and the protocol sheets handed out as they sit. The LMS deadline closed at the start of the period, so the submission list is final; note who is missing a draft but don't make a scene of it — they still review, and the Argument & revision cap does the enforcing. Say the shape of the day in one line: two rounds of review, then a clinic on scope.");

  // 2 Why engineers review each other's work
  s = mk(); s.background = { color: C.white };
  header(s, "Why we do this — 6 min", "Work only its author has read is a guess");
  card(s, 0.6, 2.0, 12.1, 0.95, C.navy);
  await iconCircle(s, FA.FaSyncAlt, 0.95, 2.22, 0.52, C.amber, C.navy);
  s.addText("Draft → review → revise → build → reflect. From here on, every major artifact is reviewed before it is graded.", { x: 1.72, y: 2.0, w: 10.7, h: 0.95, color: "CFE0E9", fontFace: F.body, fontSize: 16.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  card(s, 0.6, 3.15, 5.95, 2.6, C.cardBg);
  await iconCircle(s, FA.FaSearch, 0.9, 3.45, 0.6, C.teal);
  s.addText("As a reviewer", { x: 1.66, y: 3.5, w: 4.6, h: 0.5, color: C.ink, fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "Your job is to make the work better — not to show you're smart", options: { bullet: { indent: 14 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "Specific beats general; criteria beat taste", options: { bullet: { indent: 14 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "A question often lands harder than a verdict", options: { bullet: { indent: 14 } } }
  ], { x: 1.0, y: 4.22, w: 5.3, h: 1.45, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0 });
  card(s, 6.75, 3.15, 5.95, 2.6, C.cardBg);
  await iconCircle(s, FA.FaRegCommentDots, 7.05, 3.45, 0.6, C.amber, C.navy);
  s.addText("As an author", { x: 7.81, y: 3.5, w: 4.6, h: 0.5, color: C.ink, fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "Capture, don't defend — you decide later what to act on", options: { bullet: { indent: 14 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "Probe for the specific: \"which paragraph made you doubt it?\"", options: { bullet: { indent: 14 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "You can't act on feedback you argued away", options: { bullet: { indent: 14 } } }
  ], { x: 7.15, y: 4.22, w: 5.3, h: 1.45, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0 });
  card(s, 0.6, 5.95, 12.1, 0.82, C.amberBg);
  s.addText([
    { text: "This is not a course ritual.  ", options: { bold: true, color: C.tealDk } },
    { text: "Design review, code review, and every pull request you ever open run on these same moves.", options: { color: C.ink } }
  ], { x: 0.9, y: 5.95, w: 11.5, h: 0.82, fontFace: F.body, fontSize: 15, valign: "middle", align: "center", margin: 0 });
  footer(s);
  s.addNotes("Six minutes, and the framing matters more than it looks — students arrive thinking peer review is a classroom formality. Name the transfer explicitly: this is the protocol for design review in Week 6, code review in Week 7, the repo audit in Week 11, and every PR they open at work. Dwell on the two mindsets. Reviewers over-soften; authors over-explain. Say plainly that an author who spends the discussion defending has bought nothing — the draft leaves the room exactly as good as it arrived.");

  // 3 The register
  s = mk(); s.background = { color: C.white };
  header(s, "The register", "Say it so it can be used");
  const reg = [
    ["\"This seems like a lot.\"", "\"Scope realism — I don't believe the calendar sync fits five weeks of real building.\""],
    ["\"The problem section is vague.\"", "\"Problem & users — 'students' isn't bounded. Which ones, how many, how did you reach them?\""],
    ["\"Good risks section.\"", "\"Risks — these could be in anyone's proposal. Which one is specific to this stack?\""]
  ];
  card(s, 0.6, 1.95, 5.95, 0.55, C.coral);
  s.addText("NOT USABLE — taste, or a shrug", { x: 0.6, y: 1.95, w: 5.95, h: 0.55, color: C.white, fontFace: F.body, fontSize: 15, bold: true, align: "center", valign: "middle", margin: 0 });
  card(s, 6.75, 1.95, 5.95, 0.55, C.tealDk);
  s.addText("USABLE — specific, criteria-anchored", { x: 6.75, y: 1.95, w: 5.95, h: 0.55, color: C.white, fontFace: F.body, fontSize: 15, bold: true, align: "center", valign: "middle", margin: 0 });
  for (let i = 0; i < reg.length; i++) {
    const y = 2.68 + i * 1.28;
    card(s, 0.6, y, 5.95, 1.12, C.weakBg);
    s.addText(reg[i][0], { x: 0.92, y, w: 5.3, h: 1.12, color: C.ink, fontFace: F.body, fontSize: 16, italic: true, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
    card(s, 6.75, y, 5.95, 1.12, C.strongBg);
    s.addText(reg[i][1], { x: 7.07, y, w: 5.3, h: 1.12, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  }
  card(s, 0.6, 6.55, 12.1, 0.55, C.cardBg);
  s.addText("Same concern, both columns. The right-hand version names a criterion and points at a sentence — so the author knows what to edit.", { x: 0.9, y: 6.55, w: 11.5, h: 0.55, color: C.slate, fontFace: F.body, fontSize: 15, italic: true, align: "center", valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("Two minutes, read one pair aloud. The point students miss: the left column is not rude, it's useless — kindness is not the differentiator here, usability is. Every left-hand comment leaves the author guessing which sentence to change; every right-hand one names a criterion and points at a place. Tell them this is exactly what a good code review comment does too. If the room needs it, take one weak comment from the floor and rewrite it live in criteria language.");

  // 4 The protocol
  s = mk(); s.background = { color: C.white };
  header(s, "The protocol — 5 min", "Three moves, on paper");
  const steps = [
    [FA.FaBookOpen, "Read silently", "Rubric in front of you, pen on the author's printed copy. Start with scope realism and risks — then problem & users."],
    [FA.FaHighlighter, "Mark three things, in writing", "The strongest section and why · your sharpest concern, in criteria language · one suggestion they can act on this week."],
    [FA.FaComments, "Discuss", "The author asks and captures; you explain. Initial your comments — the author submits these pages."]
  ];
  for (let i = 0; i < steps.length; i++) {
    const x = 0.6 + i * 4.07, w = 3.83;
    card(s, x, 2.0, w, 3.3, C.cardBg);
    await iconCircle(s, steps[i][0], x + 0.3, 2.3, 0.66, C.teal);
    s.addText(steps[i][1], { x: x + 0.3, y: 3.15, w: w - 0.6, h: 0.6, color: C.ink, fontFace: F.body, fontSize: 19, bold: true, valign: "top", margin: 0 });
    s.addText(steps[i][2], { x: x + 0.3, y: 3.8, w: w - 0.6, h: 1.35, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0, lineSpacingMultiple: 1.05 });
  }
  noticeBand(s, 5.55, "Why paper:", "these annotated pages are the evidence for CP3's Argument & revision. A review held entirely out loud leaves the author with nothing to submit.", 0.85);
  card(s, 0.6, 6.6, 12.1, 0.55, C.amberBg);
  s.addText("All of this is on the protocol sheet in front of you — including the CP3 rubric.", { x: 0.9, y: 6.6, w: 11.5, h: 0.55, color: C.ink, fontFace: F.body, fontSize: 15, align: "center", valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("Five minutes, walk it once — they have it on paper, so don't read the slide to them. Emphasize two things. First, the pen: comments must land on the page, not just in the air, or the author has nothing to submit Monday and nothing to revise against tonight. Second, initials — the grader should be able to see whose feedback got acted on. Mention the reading order deliberately: scope and risks first, because that is where drafts fail and where the remaining time is best spent.");

  // 5 The CP3 rubric — display copy
  s = mk(); s.background = { color: C.white };
  header(s, "What you are reading for", "The CP3 rubric — leave this up if you need it");
  const rub = [
    ["Problem & user clarity", "15", "Compelling, evidence-backed problem; a bounded userbase", false],
    ["Solution & core features", "15", "Coherent solution, ranked features, explicit non-goals", false],
    ["Feasibility & approach", "20", "Stack and dependencies researched; approach justified", false],
    ["Scope realism (MVP)", "15", "A vertical slice sized against the real build window — arithmetic shown", true],
    ["Richness & extensibility", "15", "Several engineering dimensions; a path for others to build on", false],
    ["Risks & mitigation", "10", "Project-specific risks; mitigations with a date or a trigger", true],
    ["Argument & revision", "10", "Persuasive writing with visible response to peer feedback", false]
  ];
  const rowH = 0.6, top = 2.0;
  for (let i = 0; i < rub.length; i++) {
    const y = top + i * (rowH + 0.07);
    const hot = rub[i][3];
    card(s, 0.6, y, 12.1, rowH, hot ? C.ice : C.cardBg);
    s.addText((hot ? "★ " : "") + rub[i][0], { x: 0.9, y, w: 3.6, h: rowH, color: hot ? C.tealDk : C.ink, fontFace: F.body, fontSize: 16.5, bold: true, valign: "middle", margin: 0 });
    s.addText(rub[i][1], { x: 4.5, y, w: 0.7, h: rowH, color: C.slate, fontFace: F.body, fontSize: 16, align: "right", valign: "middle", margin: 0 });
    s.addText(rub[i][2], { x: 5.5, y, w: 6.9, h: rowH, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0 });
  }
  s.addText("★ Today's focus — where proposals fail. Start your read there.", { x: 0.6, y: 6.62, w: 12.1, h: 0.4, color: C.tealDk, fontFace: F.body, fontSize: 15, bold: true, align: "center", margin: 0 });
  footer(s);
  s.addNotes("Thirty seconds here, then leave it available — flip back to this slide during the rounds so the room can read the criteria from any seat while the sheet stays under their pen. Point at the two starred rows and say why they carry the session: scope realism and risks are where first drafts fail, and they are the two a cold reader can actually judge. Note the weights out loud once — feasibility at 20 is the heaviest single criterion, and it is the one students most often assert rather than argue.");

  // 6 Round 1 — work slide
  s = await workSlide(
    "Round 1 · 20 min",
    "Trade drafts with your partner",
    "Your assigned pair (one triad if we're odd) — swap printed copies now:",
    [
      ["Read silently, pen in hand. You may know nothing about this project — good. So will the reader on Oct 7.", "~10 min"],
      ["Mark the three things on the page — strongest, sharpest concern, one concrete suggestion. Initial them.", "in writing"],
      ["Discuss. Author: ask, capture, don't defend.", "~7 min"]
    ],
    "Authors: a note you argue away here is a note you can't use tonight."
  );
  s.addNotes("Read the pairings out, start the timer, then circulate. Sit with any pair whose discussion stalls — usually the reviewer has read politely and has nothing marked. Early on, model one strong critique aloud so the room hears the register; that single demonstration sets the level for both rounds. Watch the clock at the 10-minute mark and call the switch to discussion, or the silent read eats the conversation. Keep an eye on anyone reviewing without a draft of their own — they still do full work here.");

  // 7 Round 2 framing
  s = mk(); s.background = { color: C.white };
  header(s, "Round 2 — 18 min", "A second, independent reader");
  card(s, 0.6, 2.0, 12.1, 1.5, C.cardBg);
  await iconCircle(s, FA.FaUserFriends, 0.95, 2.32, 0.86, C.teal);
  s.addText([
    { text: "Your round-2 reader never saw round 1’s notes. What that buys you is an ", options: { color: C.ink } },
    { text: "independent", options: { color: C.tealDk, bold: true } },
    { text: " read — a check on whether each note is about your proposal or about the person who wrote it.", options: { color: C.ink } }
  ], { x: 2.1, y: 2.0, w: 10.3, h: 1.5, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
  card(s, 0.6, 3.7, 5.95, 2.05, C.strongBg);
  await iconCircle(s, FA.FaCheckDouble, 0.9, 4.0, 0.62, C.green);
  s.addText("Both readers flagged it", { x: 1.68, y: 4.05, w: 4.6, h: 0.5, color: C.ink, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
  s.addText("Two people who never spoke found the same hole. That is the proposal — fix it first.", { x: 1.0, y: 4.78, w: 5.3, h: 0.85, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0, lineSpacingMultiple: 1.04 });
  card(s, 6.75, 3.7, 5.95, 2.05, C.amberBg);
  await iconCircle(s, FA.FaUserCheck, 7.05, 4.0, 0.62, C.amber, C.navy);
  s.addText("Only one flagged it", { x: 7.83, y: 4.05, w: 4.6, h: 0.5, color: C.ink, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
  s.addText("Might be the proposal, might be that reader. Ask the other one — don't just discard it.", { x: 7.15, y: 4.78, w: 5.3, h: 0.85, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0, lineSpacingMultiple: 1.04 });
  card(s, 0.6, 5.9, 12.1, 0.88, C.navy);
  await iconCircle(s, FA.FaHandshake, 0.95, 6.11, 0.46, C.amber, C.navy);
  s.addText([
    { text: "Round 2 also adds one question: “Would this pitch recruit you?”  ", options: { color: C.white, bold: true } },
    { text: "Yes or no, and why — on Oct 7 nobody explains their reasoning.", options: { color: "CFE0E9" } }
  ], { x: 1.6, y: 5.9, w: 10.8, h: 0.88, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.03 });
  footer(s);
  s.addNotes("One minute before the second round. The point of round 2 is independence: a new reader who hasn't seen round 1's marks is an independent replication. Teach the inference, because it transfers to code review and user research alike: agreement between two people who never spoke is evidence about the artifact; a lone flag is ambiguous and worth checking, not discarding. Then the recruiting question. A proposal can be technically sound and still attract nobody, and Pitch Day is a week out — tell reviewers an honest no with a reason is the most useful thing they can hand a classmate today.");

  // 8 Round 2 — work slide
  s = await workSlide(
    "Round 2 · 18 min",
    "New partner, independent read",
    "Re-pair from the list — same protocol, tighter clock:",
    [
      ["Read it on its own terms. Don't ask what the first reviewer said — your read is only worth something if it's yours.", "~8 min"],
      ["Mark the same three things — plus your answer to \"would this recruit you?\"", "in writing"],
      ["Discuss. Authors: capture, then mark where your two reviews agree.", "~7 min"]
    ],
    "Both copies go home with the author tonight — they're part of Monday's submission."
  );
  s.addNotes("Same coaching pattern, tighter clock. Circulate toward the pairs you did not reach in round 1. The failure mode here is contamination: an author who opens with \"my last reviewer said the scope was too big\" has just thrown away the independence that makes this round worth eighteen minutes. Interrupt that if you hear it. Around three minutes out, warn the room so discussion lands rather than getting cut, and remind authors to mark the agreements before they stand up. Then collect attention for the clinic — that transition runs long if you let it drift.");

  // 9 Clinic — the common finding
  s = mk(); s.background = { color: C.white };
  header(s, "Scope-narrowing clinic — 16 min", "The most common finding will be: too big");
  card(s, 0.6, 2.0, 12.1, 1.25, C.navy);
  await iconCircle(s, FA.FaCompressArrowsAlt, 0.95, 2.32, 0.6, C.amber, C.navy);
  s.addText("Narrowing is not retreating. A proposal that names a smaller thing and proves it is stronger than one that promises a platform and ships a login page.", { x: 1.78, y: 2.0, w: 10.6, h: 1.25, color: "CFE0E9", fontFace: F.body, fontSize: 16.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  const moves = [
    [FA.FaCut, "Cut the platform, keep the slice", "One user type, one workflow, end to end."],
    [FA.FaBan, "Demote features to non-goals", "Naming what you won't build strengthens the proposal."],
    [FA.FaCompress, "Shrink the user", "One club, one ward, one lab, one theater."],
    [FA.FaClock, "Defer the hard integration", "v1 proves the core; the sync is the roadmap's job."]
  ];
  for (let i = 0; i < moves.length; i++) {
    const x = 0.6 + (i % 2) * 6.15, y = 3.45 + Math.floor(i / 2) * 1.62;
    card(s, x, y, 5.95, 1.45, C.cardBg);
    await iconCircle(s, moves[i][0], x + 0.28, y + 0.36, 0.72, C.teal);
    s.addText(moves[i][1], { x: x + 1.2, y: y + 0.18, w: 4.6, h: 0.5, color: C.ink, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
    s.addText(moves[i][2], { x: x + 1.2, y: y + 0.72, w: 4.6, h: 0.55, color: C.slate, fontFace: F.body, fontSize: 15, valign: "top", margin: 0 });
  }
  footer(s);
  s.addNotes("Reconvene and set up the clinic. Ask cold for a volunteer whose reviewers both said 'too big' — after two rounds the room knows, and a student who has just heard it twice is usually willing. Walk the four moves in about three minutes, then spend the rest applying them live to one or two real proposals; the live work teaches far more than the list. If nobody volunteers, narrow the weak sample proposal from Monday instead, then ask again — someone almost always speaks up once the move is demonstrated on paper that isn't theirs.");

  // 10 The arithmetic
  s = mk(); s.background = { color: C.white };
  header(s, "Then check the arithmetic", "Say it out loud, and do it honestly");
  card(s, 0.6, 2.0, 12.1, 1.15, C.weakBg);
  s.addText([
    { text: "The failure mode:  ", options: { bold: true, color: C.coral } },
    { text: "\"10 hours a week × 14 weeks = 140 hours, so I can build all of it.\"", options: { color: C.ink, italic: true } }
  ], { x: 1.0, y: 2.0, w: 11.3, h: 1.15, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0 });
  const math = [
    ["The ~10 hrs/week is everything", "Class, reading, discovery, writing, reviews — all of it comes out of that ten."],
    ["Subtract before you multiply", "What's actually left for building? Be honest; write the number down."],
    ["Multiply by five, not fourteen", "Real building runs roughly five weeks (Weeks 9–13). That's your budget."]
  ];
  for (let i = 0; i < math.length; i++) {
    const y = 3.35 + i * 1.02;
    card(s, 0.6, y, 12.1, 0.9, i === 2 ? C.ice : C.cardBg);
    s.addShape(pres.shapes.OVAL, { x: 0.9, y: y + 0.21, w: 0.48, h: 0.48, fill: { color: i === 2 ? C.tealDk : C.teal } });
    s.addText(String(i + 1), { x: 0.9, y: y + 0.21, w: 0.48, h: 0.48, color: C.white, fontFace: F.head, fontSize: 19, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(math[i][0], { x: 1.6, y, w: 4.1, h: 0.9, color: C.ink, fontFace: F.body, fontSize: 17, bold: true, valign: "middle", margin: 0 });
    s.addText(math[i][1], { x: 5.8, y, w: 6.6, h: 0.9, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.03 });
  }
  card(s, 0.6, 6.45, 12.1, 0.6, C.amber);
  s.addText("Most overscoped proposals die on this line — better here, on paper, than in Week 12.", { x: 0.9, y: 6.45, w: 11.5, h: 0.6, color: C.navy, fontFace: F.body, fontSize: 15.5, bold: true, align: "center", valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("Do this arithmetic on the board with the volunteer's project, out loud, with real numbers from that student. It is the single most useful thing in the session and it lands only when it is somebody's actual proposal. Push back gently on optimistic inputs — a student who claims eight build hours a week has forgotten the reading and the reviews. End with the reframe on the amber band: discovering the scope problem now costs an evening of rewriting; discovering it in Week 12 costs the MVP.");

  // 11 Revision list — work slide
  s = await workSlide(
    "Before you leave · 10 min",
    "Turn notes into an edit list",
    "Solo, on your protocol sheet — most important first:",
    [
      ["Three concrete edits, ranked — start with what both readers flagged. \"Bound the userbase to X,\" not \"improve problem section.\"", "write it"],
      ["The one narrowing move your proposal most needs.", "one line"],
      ["Scan or photograph both annotated copies tonight — a scan is cleaner, a phone photo is fine if it's legible.", "tonight"]
    ],
    "CP3 due Mon, Oct 5 — the proposal plus images of both marked-up copies."
  );
  s.addNotes("Ten minutes, and hold the room quiet for the first five — the edit list is what converts today into a better proposal, and students who leave without it lose most of the value by Friday. Give them the ranking rule: what both reviewers flagged goes first. Walk past a few sheets; if you see 'fix scope' or 'add evidence', push for the specific version out loud. Say the capture instruction twice — tonight, while they still know which page came from which reviewer. A scanner or a scanning app gives the cleanest result; a phone photo is perfectly acceptable if it is flat, well lit, and legible.");

  // 12 Wrap
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: -1.3, y: 5.2, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaPenFancy, 0.9, 1.25, 0.9, C.amber, C.navy);
  s.addText("Review is a gift you learn to give.\nScope realism is what separates a proposal that recruits\nfrom one that worries people.", { x: 0.9, y: 2.25, w: 11.9, h: 1.9, color: C.white, fontFace: F.head, fontSize: 25, bold: true, italic: true, margin: 0, lineSpacingMultiple: 1.08 });
  s.addText("WHAT'S NEXT", { x: 0.92, y: 4.45, w: 11, h: 0.35, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText([
    { text: "Tonight — scan or photograph both annotated copies while you still know which is which", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Mon, Oct 5 — CP3 Written Proposal + images of both copies, start of class", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Monday is the pitch workshop — same argument, 6–8 minutes. Pitch Day is Wed, Oct 7", options: { bullet: { indent: 16 } } }
  ], { x: 0.95, y: 4.9, w: 11.7, h: 1.9, color: "CBD8E6", fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("Close in under a minute — they have work to do tonight. The one-liner is worth saying slowly: reviewing well is a learned skill, and scope realism is the difference between a proposal that recruits a teammate and one that makes people nervous. Then the three dates, plainly. Flag Monday's shift explicitly: the same argument becomes a six-to-eight minute spoken pitch, and the students who revise this weekend will have a far easier time building slides from a proposal they already fixed.");

  const OUT = "Session08-PeerReview.pptx";
  await pres.writeFile({ fileName: OUT });
  console.log("WROTE", PAGE, "slides");
  try {
    const { verifyDeck, reportText } = require("./verify-deck.js");
    console.log(reportText(await verifyDeck(OUT)));
  } catch (e) { console.warn("verify-deck skipped:", e.message); }
}
build().catch(e => { console.error(e); process.exit(1); });
