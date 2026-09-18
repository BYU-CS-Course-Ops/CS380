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
pres.title = "CS 301R — Session 11 — Design Documents";

let PAGE = 0;
function mk() { PAGE++; return pres.addSlide(); }
function footer(slide, col) {
  const c = col || C.slate;
  slide.addText("CS 301R · Session 11 · Design Documents", { x: 7.3, y: 7.04, w: 5.4, h: 0.3, align: "right", color: c, fontFace: F.body, fontSize: 10, margin: 0 });
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
async function workSlide(kicker, title, subtitle, steps, band) {
  const s = mk(); s.background = { color: C.navy };
  darkHeader(s, kicker, title);
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
// An empty, typeable slot — click into it in PowerPoint and type on the day.
function slot(s, x, y, w, h, extra) {
  s.addText(" ", { shape: pres.shapes.ROUNDED_RECTANGLE, x, y, w, h, fill: { color: "1E3352" }, line: { color: "3A5578", width: 1, dashType: "dash" }, rectRadius: 0.08,
    color: C.white, fontFace: F.body, fontSize: 22, bold: true, valign: "middle", margin: [18, 18, 0, 0], ...extra });
}

async function build() {
  let s;

  // 1 Title
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: 10.9, y: -1.4, w: 4.2, h: 4.2, fill: { color: "1C3252" } });
  s.addShape(pres.shapes.OVAL, { x: 12.0, y: 5.1, w: 3.0, h: 3.0, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaDraftingCompass, 0.9, 1.45, 1.0, C.amber, C.navy);
  s.addText("CS 301R · SOFTWARE ENGINEERING STUDIO I", { x: 0.92, y: 2.75, w: 11, h: 0.35, color: "9FB4C7", fontFace: F.body, fontSize: 15, bold: true, charSpacing: 2, margin: 0 });
  s.addText("Designing in the Open", { x: 0.9, y: 3.15, w: 12.1, h: 1.3, color: C.white, fontFace: F.head, fontSize: 42, bold: true, margin: 0 });
  s.addText([
    { text: "Session 11 — dissecting a design document", options: { color: C.amber, bold: true, breakLine: true } },
    { text: "Monday, October 12, 2026", options: { color: "9FB4C7" } }
  ], { x: 0.92, y: 4.7, w: 11, h: 0.9, fontFace: F.body, fontSize: 19, margin: 0, lineSpacingMultiple: 1.2 });
  s.addNotes("Phase 3 opens and the unit of work changes from a person to a team. Announce teams in the first two minutes — the next slide is for that — then get moving; the deliberation happened over the weekend and this is the result, not a negotiation. Today has three parts: what the genre is and how formal it gets, a dissection of a sample doc, and the charter written in the room. Have the Backstage sample printed, one per team, and the NASA PDF open in another window.");

  // 2 Teams
  s = mk(); s.background = { color: C.navy };
  darkHeader(s, "Phase 3 begins", "Your teams");
  for (let i = 0; i < 4; i++) {
    const y = 1.95 + i * 0.98;
    await iconCircle(s, FA.FaUsers, 0.6, y + 0.1, 0.62, C.amber, C.navy, REVEAL(i + 1));
    slot(s, 1.42, y, 11.28, 0.82, REVEAL(i + 1));
  }
  card(s, 0.6, 5.95, 12.1, 0.85, C.cardBg);
  s.addText([
    { text: "Most of you got a first or second choice.  ", options: { color: C.tealDk, bold: true } },
    { text: "An idea that didn't anchor a team isn't a failure — its founder brings four weeks of discovery into whatever they join.", options: { color: C.ink } }
  ], { x: 0.95, y: 5.95, w: 11.4, h: 0.85, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  footer(s, "7E92A8");
  s.addNotes("Type the teams into the slots before class — project, founder, members — and reveal them one click at a time; approved solo paths get a slot too, named the same way as any other project, because solo is a first-class outcome here. Say the real numbers if they're good (\"six of eight got their first choice\"). Keep it brisk and matter-of-fact; this is the result of a process everyone participated in. Then move the room: teams sit together for the rest of today, and everything from here is team work. Day-of typing isn't in the build script, so a rebuild clears the slots.");

  // 3 Reading check
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: -1.4, y: 4.9, w: 4.0, h: 4.0, fill: { color: "1C3252" } });
  s.addShape(pres.shapes.OVAL, { x: 0.62, y: 0.72, w: 0.15, h: 0.15, fill: { color: C.amber } });
  s.addText("BEFORE WE START", { x: 0.87, y: 0.62, w: 11.5, h: 0.34, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  await iconCircle(s, FA.FaQuestionCircle, 0.9, 1.35, 0.9, C.amber, C.navy);
  s.addText([
    { text: "Name one section of a design doc — and what it is ", options: { color: C.white } },
    { text: "for", options: { color: C.amber, italic: true } },
    { text: ".", options: { color: C.white } }
  ], { x: 0.9, y: 2.42, w: 11.9, h: 1.85, fontFace: F.head, fontSize: 31, bold: true, margin: 0, lineSpacingMultiple: 1.05 });
  card(s, 0.6, 4.5, 12.1, 1.05, "1E3352");
  s.addText("Not what it's called — what job it does for the reader. Two or three answers, out loud.", { x: 1.0, y: 4.5, w: 11.3, h: 1.05, color: "CFE0E9", fontFace: F.body, fontSize: 16.5, valign: "middle", margin: 0 });
  s.addText("Today's plan assumes you've read Design Docs at Google.", { x: 0.9, y: 5.85, w: 11.9, h: 0.4, color: "9FB4C7", fontFace: F.body, fontSize: 15, italic: true, margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("Two minutes, and it does real work: the session's timing is a bet that the room read the article, because the next slide recalls the anatomy rather than teaching it. Push past the label — \"alternatives considered\" isn't an answer, \"alternatives considered is where you prove the decision was a choice and not a habit\" is. If the room is blank, spend three extra minutes on the anatomy slide and take it out of the dissection's buffer, not out of the dissection itself. Calibration, not shaming.");

  // 4 Bridge
  s = mk(); s.background = { color: C.white };
  header(s, "Where we are", "The proposal argued what. The design doc decides how.");
  card(s, 0.6, 2.05, 5.95, 3.3, C.cardBg);
  await iconCircle(s, FA.FaBullhorn, 0.9, 2.35, 0.66, C.teal);
  s.addText("The proposal", { x: 1.72, y: 2.42, w: 4.6, h: 0.5, color: C.ink, fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0 });
  s.addText("Audience: a skeptical stranger. Its job was to convince someone the problem is real and the scope is honest.", { x: 0.98, y: 3.25, w: 5.35, h: 1.9, color: C.ink, fontFace: F.body, fontSize: 16, valign: "top", margin: 0, lineSpacingMultiple: 1.06 });
  card(s, 6.75, 2.05, 5.95, 3.3, C.navy);
  await iconCircle(s, FA.FaDraftingCompass, 7.05, 2.35, 0.66, C.amber, C.navy);
  s.addText("The design doc", { x: 7.87, y: 2.42, w: 4.7, h: 0.5, color: C.white, fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0 });
  s.addText("Audience: a builder — your teammates, and the contributor who joins in January and asks \"where's the design doc?\"", { x: 7.1, y: 3.25, w: 5.35, h: 1.9, color: "CFE0E9", fontFace: F.body, fontSize: 16, valign: "top", margin: 0, lineSpacingMultiple: 1.06 });
  card(s, 0.6, 5.65, 12.1, 1.1, C.amber);
  await iconCircle(s, FA.FaCoins, 0.92, 5.9, 0.6, C.navy, C.amber);
  s.addText("A design doc is where you make the expensive decisions while they are still cheap to change. In code, that same decision costs a rewrite.", { x: 1.85, y: 5.65, w: 10.6, h: 1.1, color: C.navy, fontFace: F.body, fontSize: 16.5, bold: true, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  footer(s);
  s.addNotes("One minute. The audience shift is the point: CP3 persuaded a skeptic, this guides a builder — including the teammate nobody has met yet, which is the contributor-ready thread applied to the team's own thinking. The amber band is the economic argument, and it's worth saying slowly: prose is the cheapest medium in which to be wrong.");

  // 5 The anatomy
  s = mk(); s.background = { color: C.white };
  header(s, "The anatomy — recall, not lecture", "Five sections, and the job each one does");
  const anat = [
    [FA.FaMapSigns, "Context & scope", "Brings a reader up to speed in a paragraph. Not a requirements dump."],
    [FA.FaBullseye, "Goals & non-goals", "Non-goals return from the proposal — here they bound the design."],
    [FA.FaProjectDiagram, "The design", "Context diagram, components, data, interfaces — whatever the trade-offs touch."],
    [FA.FaBalanceScale, "Alternatives considered", "The most important section: why this beats what you didn't pick."],
    [FA.FaShieldAlt, "Cross-cutting concerns", "At our scale: privacy, error handling, deployment reality."]
  ];
  for (let i = 0; i < anat.length; i++) {
    const y = 1.95 + i * 0.93;
    card(s, 0.6, y, 12.1, 0.82, i === 3 ? C.navy : C.cardBg);
    await iconCircle(s, anat[i][0], 0.88, y + 0.11, 0.6, i === 3 ? C.amber : C.teal, i === 3 ? C.navy : "FFFFFF");
    s.addText(anat[i][1], { x: 1.68, y, w: 3.5, h: 0.82, color: i === 3 ? C.white : C.ink, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
    s.addText(anat[i][2], { x: 5.3, y, w: 7.1, h: 0.82, color: i === 3 ? "CFE0E9" : C.slate, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0 });
  }
  s.addText("Google's run 10–20 pages. Ours are 3–6 plus diagrams — same rigor, smaller problem.", { x: 0.6, y: 6.5, w: 12.1, h: 0.4, color: C.slate, fontFace: F.body, fontSize: 15, italic: true, align: "center", margin: 0 });
  footer(s);
  s.addNotes("Call on the room rather than reading the list — they read it, and the entry check just told you how well. One line each on the job the section does. Spend your time on alternatives-considered, the highlighted row: it is the section that separates a design doc from a description, and it is the one students skip. The sizing line matters too, because students hear \"design doc\" and imagine either a page of hand-waving or a hundred-page specification.");

  // 6 The formality spectrum
  s = mk(); s.background = { color: C.white };
  header(s, "Caveat 1 — how formal?", "\"Design docs are informal\" is true at Google, not everywhere");
  card(s, 0.6, 1.95, 5.95, 3.6, C.cardBg);
  await iconCircle(s, FA.FaFileAlt, 0.95, 2.2, 0.62, C.teal);
  s.addText("Informal working doc", { x: 1.78, y: 2.2, w: 4.6, h: 0.62, color: C.ink, fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "A few pages, no fixed format", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 10 } },
    { text: "Reviewed by teammates in a comment thread", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 10 } },
    { text: "Updated when it stops being true", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 10 } },
    { text: "Lives as long as the design does", options: { bullet: { indent: 16 } } }
  ], { x: 1.0, y: 3.05, w: 5.3, h: 2.4, color: C.ink, fontFace: F.body, fontSize: 16, valign: "top", margin: 0 });
  card(s, 6.75, 1.95, 5.95, 3.6, C.navy);
  await iconCircle(s, FA.FaStamp, 7.1, 2.2, 0.62, C.amber, C.navy);
  s.addText("Formal deliverable", { x: 7.93, y: 2.2, w: 4.6, h: 0.62, color: C.white, fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "Carries a document number", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 10 } },
    { text: "Signed off by named reviewers", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 10 } },
    { text: "Under change control — every revision recorded", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 10 } },
    { text: "Outlives the people who wrote it", options: { bullet: { indent: 16 } } }
  ], { x: 7.15, y: 3.05, w: 5.3, h: 2.4, color: "CFE0E9", fontFace: F.body, fontSize: 16, valign: "top", margin: 0 });
  card(s, 0.6, 5.75, 12.1, 1.0, C.amber);
  s.addText("Same genre. The process around it grows with the cost of getting the design wrong — and with how long it has to survive.", { x: 0.9, y: 5.75, w: 11.5, h: 1.0, color: C.navy, fontFace: F.body, fontSize: 16.5, bold: true, align: "center", valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("Name the caveat plainly: the reading is describing one culture, not a law of engineering. In aerospace, medical devices, defense, and government work the design doc is a formal deliverable, written partly to earn management's approval before money is spent — the instructor's NASA documents were titled Detailed Design Documents for exactly that reason. Then switch to the GSSC-0012 PDF for two minutes: page 3, the signature page (prepared by, two concurrences, approved by); page 4, the change record running Draft v0.1 to Baseline across five years; page 9, where the introduction traces to numbered requirements documents. Come back here for the amber band. This is also why the course template has a status line, a revision history, and a sign-off table.");

  // 7 Alternatives considered
  s = mk(); s.background = { color: C.white };
  header(s, "Caveat 2 — where the thinking shows", "Alternatives considered can rest on real work");
  const alts = [
    [FA.FaComments, "A conversation", "\"We talked about SQLite and ruled it out.\" Cheap, and often enough."],
    [FA.FaStopwatch, "A spike or benchmark", "You built the risky part and measured it. Your CP3 spike is exactly this."],
    [FA.FaBook, "A trade study", "A document of its own: options, criteria, scoring, and why each was rejected."]
  ];
  for (let i = 0; i < alts.length; i++) {
    const x = 0.6 + i * 4.1, w = 3.9;
    card(s, x, 1.95, w, 2.75, C.cardBg);
    await iconCircle(s, alts[i][0], x + (w - 0.66) / 2, 2.2, 0.66, C.teal);
    s.addText(alts[i][1], { x: x + 0.15, y: 3.0, w: w - 0.3, h: 0.5, color: C.ink, fontFace: F.body, fontSize: 18, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(alts[i][2], { x: x + 0.22, y: 3.5, w: w - 0.44, h: 1.05, color: C.slate, fontFace: F.body, fontSize: 15.5, align: "center", valign: "top", margin: 0, lineSpacingMultiple: 1.04 });
  }
  s.addText("more evidence  →", { x: 0.6, y: 4.78, w: 12.1, h: 0.35, color: C.tealDk, fontFace: F.body, fontSize: 15, bold: true, align: "right", margin: 0 });
  card(s, 0.6, 5.25, 12.1, 1.5, C.navy);
  await iconCircle(s, FA.FaQuoteLeft, 0.95, 5.6, 0.6, C.amber, C.navy);
  s.addText([
    { text: "\"Some options may quickly drop out of consideration as the analysis is conducted. It is important to document the fact that these options were considered.\"\n", options: { color: C.white } },
    { text: "NASA Systems Engineering Handbook, §6.8 Decision Analysis", options: { color: C.amber, italic: true } }
  ], { x: 1.85, y: 5.25, w: 10.6, h: 1.5, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  footer(s);
  s.addNotes("The second caveat. Students read \"alternatives considered\" as a paragraph you write from memory at the end; sometimes it is, and sometimes it is the summary of weeks of work. Walk the three rungs and land on the middle one, because that's theirs: the CP3 spike already produced exactly this kind of evidence, and the template asks them to cite it. The NASA quote is worth reading aloud — a rejected option that nobody wrote down gets re-proposed a year later by someone who wasn't in the room.");

  // 8 Appropriate detail
  s = mk(); s.background = { color: C.white };
  header(s, "Appropriate detail", "The judgment the rubric actually tests");
  const det = [
    ["Too little", C.coral, C.weakBg, "\"We'll have a backend.\"", "No components, no data, nothing a builder can act on. A wish, not a design."],
    ["Too much", C.amber, C.amberBg, "Copied schemas · pseudo-code for CRUD · pinned versions of every library", "Stale in a week, and it buries the decisions under mechanics nobody reads."],
    ["Just right", C.green, C.strongBg, "Each component in a paragraph: its job, its interface, what it talks to — and the decision behind it", "A teammate could start Monday. A contributor could follow it in January."]
  ];
  for (let i = 0; i < det.length; i++) {
    const y = 1.95 + i * 1.55;
    card(s, 0.6, y, 12.1, 1.36, det[i][2]);
    s.addShape(pres.shapes.OVAL, { x: 0.9, y: y + 0.38, w: 0.6, h: 0.6, fill: { color: det[i][1] } });
    s.addText(String(i + 1), { x: 0.9, y: y + 0.38, w: 0.6, h: 0.6, color: det[i][1] === C.amber ? C.navy : C.white, fontFace: F.head, fontSize: 22, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(det[i][0], { x: 1.7, y: y + 0.09, w: 2.2, h: 1.18, color: C.ink, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
    s.addText(det[i][3], { x: 3.9, y: y + 0.09, w: 4.5, h: 1.18, color: C.ink, fontFace: F.body, fontSize: 15.5, italic: true, valign: "middle", margin: 0, lineSpacingMultiple: 1.03 });
    s.addText(det[i][4], { x: 8.6, y: y + 0.09, w: 3.8, h: 1.18, color: C.slate, fontFace: F.body, fontSize: 15, valign: "middle", margin: 0, lineSpacingMultiple: 1.03 });
  }
  s.addText("The test: a section that says how you'll implement something, with no trade-off in it, probably belongs in the code.", { x: 0.6, y: 6.62, w: 12.1, h: 0.34, color: C.tealDk, fontFace: F.body, fontSize: 15.5, bold: true, align: "center", margin: 0 });
  footer(s);
  s.addNotes("Row 2 is the one to dwell on, because it is the failure mode of conscientious students: they mistake volume for rigor and produce a second, worse copy of the codebase. Give the test at the bottom and then complicate it on the next slide — the rule is not \"less detail is better.\"");

  // 9 Altitude follows the reader
  s = mk(); s.background = { color: C.white };
  header(s, "…and now complicate it", "Altitude follows the reader and the lifetime");
  card(s, 0.6, 1.95, 12.1, 1.15, C.navy);
  await iconCircle(s, FA.FaSatellite, 0.95, 2.22, 0.62, C.amber, C.navy);
  s.addText("GSSC-0012 documents every message field, every configuration parameter, and every database table — exactly what our rubric forbids. Why is it right there and wrong here?", { x: 1.85, y: 1.95, w: 10.6, h: 1.15, color: C.white, fontFace: F.body, fontSize: 16.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  const cmp = [
    ["Who reads it", "Your teammates, and a contributor in January", "Reviewers who must approve; operators arriving years later"],
    ["How long it lives", "Until the design changes", "The life of the mission, under change control"],
    ["Cost of being wrong", "A rewrite in a five-week build", "A spacecraft's data system nobody can integrate or operate"],
    ["So the doc carries", "Decisions and trade-offs; mechanics in the code", "Decisions and the specifics needed to build, test, integrate, operate"]
  ];
  s.addText("YOUR PROJECT", { x: 4.5, y: 3.25, w: 4.0, h: 0.3, color: C.tealDk, fontFace: F.body, fontSize: 13.5, bold: true, charSpacing: 1, margin: 0 });
  s.addText("GSSC-0012", { x: 8.7, y: 3.25, w: 4.0, h: 0.3, color: C.slate, fontFace: F.body, fontSize: 13.5, bold: true, charSpacing: 1, margin: 0 });
  for (let i = 0; i < cmp.length; i++) {
    const y = 3.6 + i * 0.78;
    if (i % 2 === 0) s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y, w: 12.1, h: 0.78, fill: { color: C.cardBg }, line: { type: "none" } });
    s.addText(cmp[i][0], { x: 0.9, y, w: 3.5, h: 0.78, color: C.ink, fontFace: F.body, fontSize: 15.5, bold: true, valign: "middle", margin: 0 });
    s.addText(cmp[i][1], { x: 4.5, y, w: 4.1, h: 0.78, color: C.ink, fontFace: F.body, fontSize: 15, valign: "middle", margin: 0, lineSpacingMultiple: 1.02 });
    s.addText(cmp[i][2], { x: 8.7, y, w: 4.0, h: 0.78, color: C.slate, fontFace: F.body, fontSize: 15, valign: "middle", margin: 0, lineSpacingMultiple: 1.02 });
  }
  s.addText("Ours: teammates, one semester, cheap to change — so decisions in, mechanics out.", { x: 0.6, y: 6.85, w: 12.1, h: 0.35, color: C.tealDk, fontFace: F.body, fontSize: 15, bold: true, align: "center", margin: 0 });
  footer(s);
  s.addNotes("Three minutes, and it turns a rule into a judgment. Put GSSC-0012 back on screen: page 28 (a message definition — name, ID, senders, receivers, field layout), page 21 (every config parameter and its default), page 60 (every database table). Ask the room why those earn their place there. Answers to draw out: two teams integrating without talking need the field layout; an operator arriving in eight years needs the defaults; a mission under change control needs the record. Then the honest flip side, which a sharp student may raise first: that document has less alternatives-considered content than we require, because in that organization the trade-offs lived in requirements documents, trade studies, and review presentations. \"Where does this thinking belong?\" is itself a design-document question.");

  // 10 The template
  s = mk(); s.background = { color: C.white };
  header(s, "The template — required for CP5", "Conforming to a standard is part of the job");
  const tmpl = [
    ["1", "Context & scope"], ["2", "Goals & non-goals"], ["3", "System-context diagram"], ["4", "Architecture & components"],
    ["5", "Data model"], ["6", "Tech choices & alternatives"], ["7", "Risks & open questions"], ["8", "Implementation plan"]
  ];
  for (let i = 0; i < tmpl.length; i++) {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 0.6 + col * 6.15, y = 1.95 + row * 0.72;
    card(s, x, y, 5.95, 0.62, C.cardBg);
    s.addShape(pres.shapes.OVAL, { x: x + 0.16, y: y + 0.11, w: 0.4, h: 0.4, fill: { color: C.teal } });
    s.addText(tmpl[i][0], { x: x + 0.16, y: y + 0.11, w: 0.4, h: 0.4, color: C.white, fontFace: F.head, fontSize: 15, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(tmpl[i][1], { x: x + 0.72, y, w: 5.1, h: 0.62, color: C.ink, fontFace: F.body, fontSize: 16.5, bold: true, valign: "middle", margin: 0 });
  }
  card(s, 0.6, 4.95, 5.95, 1.1, C.navy);
  s.addText([
    { text: "Plus the light formal machinery:  ", options: { color: C.amber, bold: true } },
    { text: "a status line, a revision history, and a sign-off table.", options: { color: "CFE0E9" } }
  ], { x: 0.95, y: 4.95, w: 5.3, h: 1.1, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  card(s, 6.75, 4.95, 5.95, 1.1, C.cardBg);
  s.addText([
    { text: "Keep every heading.  ", options: { color: C.tealDk, bold: true } },
    { text: "A section that truly doesn't apply gets one sentence saying why.", options: { color: C.ink } }
  ], { x: 7.1, y: 4.95, w: 5.3, h: 1.1, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  card(s, 0.6, 6.25, 12.1, 0.6, C.amber);
  s.addText("Canvas → Design Document Template. Download the Markdown; it becomes docs/design.md in your repo.", { x: 0.9, y: 6.25, w: 11.5, h: 0.6, color: C.navy, fontFace: F.body, fontSize: 15.5, bold: true, align: "center", valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("Two minutes. Walk the headings, don't read them — they map one-to-one onto the CP5 rubric criteria, which is the point: a reviewer always knows where to look, and a missing alternatives section is visible instantly. Say why every organization that takes design docs seriously has a template, and that conforming to one is part of the job rather than a course quirk. Point out the status line, revision history, and sign-off table as the lightweight version of what they just saw in GSSC-0012.");

  // 11 Dissect — work slide
  s = await workSlide(
    "Dissect the sample · 20 min · teams",
    "Read it like a reviewer",
    "Sample Design Document — Backstage. Same costume catalog from the Session 7 proposals:",
    [
      ["Read it together — 8 minutes, pens out, mark as you go.", "8 min"],
      ["Could you start building from this? What would you have to ask first?", "Q1"],
      ["Where is the unstated assumption? (There is always one.)", "Q2"],
      ["Which decision has no alternative considered — and what would the alternative be?", "Q3"],
      ["Where is it over-specified — what could be cut with no loss?", "Q4"]
    ],
    "It follows the template and parts of it are genuinely good. Find what isn't."
  );
  s.addNotes("Hand out the printed sample, one per team. Eight minutes of quiet reading, then twelve of critique — hold the line on the reading time, because teams that start arguing at minute two critique the first page only. Circulate and listen for teams stuck on surface polish; steer them to the four questions. Every question has at least one solid answer planted in the doc, and the appendix of the outline has the key: a Checkout component nobody could build from, an assumption that the network is always there, a single-tenant decision asserted with no alternative, a column-by-column schema dump with pseudo-code, diagrams that contradict the prose and the MVP scope, and an implementation plan built in horizontal layers. Don't hand out the key — let them find it.");

  // 12 Collect the finds
  s = mk(); s.background = { color: C.white };
  header(s, "What did you find?", "The genre's quality bar, in your own words");
  const finds = [
    [FA.FaHammer, "Q1 · Could you build it?", "Name the section you'd have to ask about before writing any code."],
    [FA.FaEyeSlash, "Q2 · The unstated assumption", "What does this doc quietly assume is always true?"],
    [FA.FaBalanceScale, "Q3 · The missing alternative", "Which decision was asserted rather than argued?"],
    [FA.FaCut, "Q4 · Over-specified", "What could you delete today and lose nothing?"]
  ];
  for (let i = 0; i < finds.length; i++) {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 0.6 + col * 6.15, y = 2.0 + row * 2.2;
    card(s, x, y, 5.95, 2.0, C.cardBg);
    await iconCircle(s, finds[i][0], x + 0.3, y + 0.3, 0.64, C.teal);
    s.addText(finds[i][1], { x: x + 1.15, y: y + 0.3, w: 4.6, h: 0.64, color: C.ink, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
    s.addText(finds[i][2], { x: x + 1.15, y: y + 1.0, w: 4.6, h: 0.85, color: C.slate, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0, lineSpacingMultiple: 1.04 });
  }
  card(s, 0.6, 6.45, 12.1, 0.55, C.strongBg);
  s.addText("You can now see the bar. Wednesday you write to it.", { x: 0.9, y: 6.45, w: 11.5, h: 0.55, color: C.tealDk, fontFace: F.body, fontSize: 15.5, bold: true, align: "center", valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("Keep this up while teams report out. Take one find per team rather than working through the questions in order — it moves faster and teams hear each other. Push for specifics: \"the Checkout component\" is better than \"section four is vague.\" If nobody catches the diagram problem, point at it yourself, since diagram-versus-prose disagreement is the defect most likely to appear in their own drafts on Wednesday.");

  // 13 Map your project — work slide
  s = await workSlide(
    "Your turn · 10 min · teams",
    "Sketch your own doc's skeleton",
    "Rough is fine — this is Wednesday's starting point, not Wednesday's output:",
    [
      ["A system-context sketch: your system as one box, users and external services around it.", "boxes"],
      ["Three to five components, each with a one-line job.", "3–5"],
      ["The data entities the core flow touches.", "entities"],
      ["The two biggest decisions you'll have to argue with alternatives.", "2 decisions"]
    ],
    "Bring this Wednesday. The workshop turns it into the draft — due at the end of that class."
  );
  s.addNotes("Ten minutes, and the goal is a page of boxes, not a finished diagram. Circulate with two questions: what does this system depend on that you don't control, and where does the data live? Teams that can't name two real decisions usually haven't found their risky part yet — send them back to their proposal's risks and spike. Say clearly that Wednesday's workshop produces the draft and the draft is due at the end of that class, so today's sketch is the thing that makes Wednesday survivable.");

  // 14 The charter — work slide
  s = mk(); s.background = { color: C.white };
  header(s, "Working agreements — 8 min", "Decide the rules before you need them");
  card(s, 0.6, 1.95, 12.1, 1.15, C.navy);
  await iconCircle(s, FA.FaHandshake, 0.95, 2.22, 0.62, C.amber, C.navy);
  s.addText("Groups that intend to last write down how they'll work together — while everyone still likes each other. That is the cheapest moment to negotiate it.", { x: 1.85, y: 1.95, w: 10.6, h: 1.15, color: C.white, fontFace: F.body, fontSize: 16.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  card(s, 0.6, 3.3, 5.95, 1.35, C.weakBg);
  s.addText([
    { text: "Fails the test\n", options: { color: C.coral, bold: true, fontSize: 16 } },
    { text: "\"We'll communicate well.\"  \"Everyone pulls their weight.\"", options: { color: C.ink } }
  ], { x: 0.95, y: 3.3, w: 5.3, h: 1.35, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  card(s, 6.75, 3.3, 5.95, 1.35, C.strongBg);
  s.addText([
    { text: "Passes it\n", options: { color: C.tealDk, bold: true, fontSize: 16 } },
    { text: "\"A reply within 24 hours on weekdays.\"  \"Two issues closed a week.\"", options: { color: C.ink } }
  ], { x: 7.1, y: 3.3, w: 5.3, h: 1.35, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  s.addText("Checkable — and it survives a bad week.", { x: 0.6, y: 4.78, w: 12.1, h: 0.35, color: C.slate, fontFace: F.body, fontSize: 15, italic: true, align: "center", margin: 0 });
  card(s, 0.6, 5.25, 12.1, 1.5, C.cardBg);
  await iconCircle(s, FA.FaClipboardCheck, 0.95, 5.6, 0.6, C.teal);
  s.addText([
    { text: "Seven short sections on the worksheet — roles, channel, cadence, decisions, weight, amendments.  ", options: { color: C.ink } },
    { text: "In November, your confidential peer evaluations are scored against what you write here.", options: { color: C.tealDk, bold: true } }
  ], { x: 1.85, y: 5.25, w: 10.6, h: 1.5, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  footer(s);
  s.addNotes("Eight minutes, and for most of them this is the first time they have heard the concept named out loud — the reading is five minutes long and some will have skimmed it. Lead with the general move, not the assignment: groups that intend to last write down how they work together, and the cheapest moment is before anything is at stake. Ask for one unstated expectation that has bitten them on a past team project and take two answers; there is always a good one. Then the test — checkable, and survives a bad week — and a tour of the worksheet. Land the peer-evaluation stake plainly: this is the standard those evaluations reference in November, so it is worth writing something they would actually defend.");

  s = await workSlide(
    "Now, the two hard ones · 5 min",
    "The questions teams skip",
    "Answer only these two on the worksheet, out loud, together — the rest is your first meeting's agenda:",
    [
      ["Who breaks a deadlock, and by what rule? A named tiebreaker beats a stalemate.", "§5"],
      ["What happens the first time someone misses a commitment? Who says something, how soon, what then.", "§6"]
    ],
    "Finish the charter at your first team meeting. Submit by end of day Wednesday."
  );
  s.addNotes("Five minutes, and only these two questions — they are the ones teams skip when left alone and the ones worth your coaching. Circulate while they talk: the team that says \"we'll all do everything and communicate constantly\" is the one that fails in Week 10, so push it for a named tiebreaker and a real response time. Deciding the deadlock rule now takes four minutes; deciding it during the deadlock costs a week. Solo students answer the abbreviated version on the same worksheet — the solo box says which sections. Then set the expectation out loud: the rest of the charter is the agenda for a first team meeting held before Wednesday, and the finished charter is due end of day Wednesday alongside the design-doc draft.");

  // 15 Wrap
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: -1.3, y: 5.2, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaDraftingCompass, 0.9, 1.15, 0.85, C.amber, C.navy);
  s.addText("Design docs earn their cost by making trade-offs visible while they're still cheap.", { x: 0.9, y: 2.15, w: 11.9, h: 1.05, color: C.white, fontFace: F.head, fontSize: 27, bold: true, italic: true, margin: 0, lineSpacingMultiple: 1.06 });
  s.addText("BEFORE WEDNESDAY, OCT 14", { x: 0.92, y: 3.4, w: 11, h: 0.35, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText([
    { text: "Hold your first team meeting — finish the charter there, submit by end of day Wednesday", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "Bring your skeleton sketch — context, components, entities, two decisions", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "Re-skim the anatomy and system-context sections of the reading", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "Wednesday is a whiteboard workshop — the design doc draft is due at the end of it", options: { bullet: { indent: 16 } } }
  ], { x: 0.95, y: 3.85, w: 11.7, h: 1.95, color: "CBD8E6", fontFace: F.body, fontSize: 16, valign: "top", margin: 0 });
  card(s, 0.6, 5.95, 12.1, 0.8, C.amber);
  s.addText("CP5 — the revised design doc — is due Wed, Oct 21. Draft, review, revise: the same loop as the proposal.", { x: 0.9, y: 5.95, w: 11.5, h: 0.8, color: C.navy, fontFace: F.body, fontSize: 15.5, bold: true, align: "center", valign: "middle", margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("Close in two minutes. The one-liner at the top is the session in a sentence — say it, then the logistics. Charter tonight, skeleton Wednesday, draft due at the end of Wednesday's workshop, CP5 a week later. Name the loop out loud: draft, review, revise, exactly as with the proposal, because revision is graded here too. If the room looks daunted, remind them Wednesday is three-quarters whiteboard time with you circulating as design reviewer.");

  const OUT = "Session11-DesignDocs.pptx";
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
