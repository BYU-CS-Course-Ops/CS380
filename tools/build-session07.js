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
pres.title = "CS 301R — Session 7 — Proposal Anatomy";

let PAGE = 0;
function mk() { PAGE++; return pres.addSlide(); }
function footer(slide, col) {
  const c = col || C.slate;
  slide.addText("CS 301R · Session 7 · Proposal Anatomy", { x: 7.3, y: 7.04, w: 5.4, h: 0.3, align: "right", color: c, fontFace: F.body, fontSize: 10, margin: 0 });
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
// navy "work instructions" slide — stays on screen while students work
async function workSlide(kicker, title, subtitle, steps) {
  const s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: 11.4, y: -1.3, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  s.addShape(pres.shapes.OVAL, { x: 0.62, y: 0.6, w: 0.15, h: 0.15, fill: { color: C.amber } });
  s.addText(kicker.toUpperCase(), { x: 0.87, y: 0.5, w: 11.5, h: 0.34, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText(title, { x: 0.6, y: 0.9, w: 12.1, h: 0.8, color: C.white, fontFace: F.head, fontSize: 32, bold: true, margin: 0 });
  s.addText(subtitle, { x: 0.62, y: 1.78, w: 12, h: 0.4, color: "CFE0E9", fontFace: F.body, fontSize: 16, italic: true, margin: 0 });
  const n = steps.length;
  const gap = 0.14, top = 2.35, avail = 6.55 - top;
  const h = (avail - gap * (n - 1)) / n;
  for (let i = 0; i < n; i++) {
    const y = top + i * (h + gap);
    card(s, 0.6, y, 12.1, h, "1E3352");
    s.addShape(pres.shapes.OVAL, { x: 0.85, y: y + (h - 0.5) / 2, w: 0.5, h: 0.5, fill: { color: C.amber } });
    s.addText(String(i + 1), { x: 0.85, y: y + (h - 0.5) / 2, w: 0.5, h: 0.5, color: C.navy, fontFace: F.head, fontSize: 20, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(steps[i][0], { x: 1.55, y, w: steps[i][2] ? 9.4 : 10.9, h, color: C.white, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.03 });
    if (steps[i][2]) s.addText(steps[i][2], { x: 11.1, y, w: 1.4, h, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, align: "right", valign: "middle", margin: 0 });
  }
  footer(s, "7E92A8");
  s.addNotes(steps.__note || "Leave this slide up while students work. Circulate and coach.");
  return s;
}
// weak/strong excerpt card: label chip + up to three quoted lines
function excerptCard(s, x, y, w, h, kind, lines, titleOverride) {
  const weak = kind === "weak";
  card(s, x, y, w, h, weak ? C.weakBg : C.strongBg);
  s.addText(titleOverride || (weak ? "CostumeHub — the weak version" : "Backstage — the strong version"),
    { x: x + 0.28, y: y + 0.16, w: w - 0.56, h: 0.42, color: weak ? C.coral : C.tealDk, fontFace: F.body, fontSize: 15, bold: true, charSpacing: 0.4, valign: "middle", margin: 0 });
  const runs = [];
  lines.forEach((ln, i) => {
    runs.push({
      text: "“" + ln + "”",
      options: { breakLine: true, paraSpaceAfter: i === lines.length - 1 ? 0 : 9, color: C.ink, italic: true }
    });
  });
  s.addText(runs, { x: x + 0.28, y: y + 0.62, w: w - 0.56, h: h - 0.82, fontFace: F.body, fontSize: 15, valign: "top", margin: 0, lineSpacingMultiple: 1.05 });
}
function locator(s, label, sectionName, job) {
  s.addText([
    { text: label.toUpperCase() + " · " + sectionName.toUpperCase() + "  ", options: { color: C.tealDk, bold: true, charSpacing: 1 } },
    { text: "— " + job, options: { color: C.slate } }
  ], { x: 0.6, y: 1.62, w: 12.1, h: 0.34, fontFace: F.body, fontSize: 13, valign: "middle", margin: 0 });
}
function noticeBand(s, y, leadText, bodyText, h) {
  card(s, 0.6, y, 12.1, h || 0.92, C.navy);
  s.addText([
    { text: leadText + "  ", options: { color: C.amber, bold: true } },
    { text: bodyText, options: { color: C.white } }
  ], { x: 1.0, y, w: 11.3, h: h || 0.92, fontFace: F.body, fontSize: 15, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
}

async function build() {
  let s;

  // 1 Title
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: 10.9, y: -1.4, w: 4.2, h: 4.2, fill: { color: "1C3252" } });
  s.addShape(pres.shapes.OVAL, { x: 12.0, y: 5.1, w: 3.0, h: 3.0, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaFileAlt, 0.9, 1.45, 1.0, C.amber, C.navy);
  s.addText("CS 301R · SOFTWARE ENGINEERING STUDIO I", { x: 0.92, y: 2.75, w: 11, h: 0.35, color: "9FB4C7", fontFace: F.body, fontSize: 15, bold: true, charSpacing: 2, margin: 0 });
  s.addText("Arguing for a Project", { x: 0.9, y: 3.15, w: 12.1, h: 1.3, color: C.white, fontFace: F.head, fontSize: 42, bold: true, margin: 0 });
  s.addText([
    { text: "Session 7 — proposal anatomy", options: { color: C.amber, bold: true, breakLine: true } },
    { text: "Monday, September 28, 2026", options: { color: "9FB4C7" } }
  ], { x: 0.92, y: 4.7, w: 11, h: 0.9, fontFace: F.body, fontSize: 19, margin: 0, lineSpacingMultiple: 1.2 });
  s.addNotes("Open by naming the shift: for three weeks they explored and defined; today they argue. The proposal is the first artifact a stranger will judge the project by, and it feeds directly into next week's pitch. Collect CP2 at the door — it's due at the start of class. Today is deliberately not a lecture on structure; they read that. Class time goes to dissecting a weak proposal and to arguing feasibility honestly.");

  // 2 Entry poll — did you read it?
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: -1.4, y: 4.9, w: 4.0, h: 4.0, fill: { color: "1C3252" } });
  s.addShape(pres.shapes.OVAL, { x: 0.62, y: 0.72, w: 0.15, h: 0.15, fill: { color: C.amber } });
  s.addText("BEFORE WE START", { x: 0.87, y: 0.62, w: 11.5, h: 0.34, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  await iconCircle(s, FA.FaQuestionCircle, 0.9, 1.35, 0.9, C.amber, C.navy);
  s.addText([
    { text: "Name one section of a proposal —\nand what it is ", options: { color: C.white } },
    { text: "for", options: { color: C.amber, italic: true } },
    { text: ".", options: { color: C.white } }
  ], { x: 0.9, y: 2.42, w: 11.9, h: 1.85, fontFace: F.head, fontSize: 34, bold: true, margin: 0, lineSpacingMultiple: 1.05 });
  card(s, 0.6, 4.5, 12.1, 1.05, "1E3352");
  s.addText("Not what it's called — what job it does for the reader. Two or three answers, out loud.", { x: 1.0, y: 4.5, w: 11.3, h: 1.05, color: "CFE0E9", fontFace: F.body, fontSize: 16.5, valign: "middle", margin: 0 });
  s.addText("Today's plan assumes you've read The Anatomy of a Software Proposal.", { x: 0.9, y: 5.85, w: 11.9, h: 0.4, color: "9FB4C7", fontFace: F.body, fontSize: 15, italic: true, margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("Two minutes, and it does real work: it tells you whether the room read the anatomy piece, and the whole session's timing is a bet that they did. Take two or three answers. Push past the label — \"non-goals\" isn't an answer, \"non-goals prove you scoped rather than postponed\" is. If the room is blank, spend three extra minutes on the skeleton slide and take the time out of the §4 buffer, not out of feasibility. Don't moralize; the point is calibration, not shaming.");

  // 3 Bridge
  s = mk(); s.background = { color: C.white };
  header(s, "Where we are", "You defined it. Now argue for it.");
  card(s, 0.6, 2.05, 5.95, 3.45, C.cardBg);
  await iconCircle(s, FA.FaClipboardList, 0.9, 2.35, 0.66, C.teal);
  s.addText("CP2 — written to define", { x: 1.72, y: 2.42, w: 4.6, h: 0.5, color: C.ink, fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0 });
  s.addText("Audience: you and the instructor. Its job was to pin down the user, the needs, and what \"this works\" means.", { x: 0.98, y: 3.28, w: 5.35, h: 2.0, color: C.ink, fontFace: F.body, fontSize: 16, valign: "top", margin: 0, lineSpacingMultiple: 1.06 });
  card(s, 6.75, 2.05, 5.95, 3.45, C.navy);
  await iconCircle(s, FA.FaBullhorn, 7.05, 2.35, 0.66, C.amber, C.navy);
  s.addText("CP3 — written to persuade", { x: 7.87, y: 2.42, w: 4.7, h: 0.5, color: C.white, fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0 });
  s.addText("Audience: a skeptical stranger who has not lived inside your head for four weeks — and a classmate deciding whether to join you.", { x: 7.1, y: 3.28, w: 5.35, h: 2.0, color: "CFE0E9", fontFace: F.body, fontSize: 16, valign: "top", margin: 0, lineSpacingMultiple: 1.06 });
  card(s, 0.6, 5.75, 12.1, 1.0, C.amber);
  await iconCircle(s, FA.FaExclamationCircle, 0.92, 6.0, 0.5, C.navy, C.amber);
  s.addText([
    { text: "Due now: CP2 Product Definition Brief.  ", options: { bold: true, color: C.navy } },
    { text: "Draft + two printed copies Wednesday · CP3 due Mon, Oct 5.", options: { color: C.navy } }
  ], { x: 1.6, y: 5.75, w: 10.8, h: 1.0, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.03 });
  s.addNotes("Two minutes. Make the audience shift concrete — that single change is what makes CP3 hard. CP2 could assume context; CP3 assumes none, and its reader is allowed to say no. Name the two real readers they'll face: a skeptic hunting for the hole, and a classmate on Oct 7 deciding where to spend their semester. Collect CP2 now, and say Wednesday's mechanics out loud already so nobody hears it for the first time at the end of class.");
  footer(s);

  // 4 The credibility economy
  s = mk(); s.background = { color: C.white };
  header(s, "The lens for today", "Every section builds credibility — or spends it");
  card(s, 0.6, 1.95, 12.1, 1.0, C.navy);
  await iconCircle(s, FA.FaBalanceScale, 0.95, 2.17, 0.56, C.amber, C.navy);
  s.addText("You start at neutral. When the balance goes negative, the reader stops believing the true parts too.", { x: 1.75, y: 1.95, w: 10.65, h: 1.0, color: "CFE0E9", fontFace: F.body, fontSize: 16.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  card(s, 0.6, 3.15, 5.95, 2.55, C.strongBg);
  await iconCircle(s, FA.FaPlusCircle, 0.9, 3.45, 0.6, C.green);
  s.addText("Buys credit", { x: 1.66, y: 3.5, w: 4.6, h: 0.5, color: C.ink, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "A specific claim with a source behind it", options: { bullet: { indent: 14 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "A choice justified by a constraint", options: { bullet: { indent: 14 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "An admitted limitation", options: { bullet: { indent: 14 } } }
  ], { x: 1.0, y: 4.22, w: 5.3, h: 1.35, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0 });
  card(s, 6.75, 3.15, 5.95, 2.55, C.weakBg);
  await iconCircle(s, FA.FaMinusCircle, 7.05, 3.45, 0.6, C.coral);
  s.addText("Spends it", { x: 7.81, y: 3.5, w: 4.6, h: 0.5, color: C.ink, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "A vague claim, an unexplained tech choice", options: { bullet: { indent: 14 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "A feature list with no priorities", options: { bullet: { indent: 14 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "A promise that doesn't fit the calendar", options: { bullet: { indent: 14 } } }
  ], { x: 7.15, y: 4.22, w: 5.3, h: 1.35, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0 });
  card(s, 0.6, 5.9, 12.1, 0.86, C.amberBg);
  s.addText([
    { text: "The counterintuitive one:  ", options: { bold: true, color: C.tealDk } },
    { text: "admitting a limitation usually BUYS credit. Hiding a gap doesn't remove it — the reader finds it, then wonders what else you hid.", options: { color: C.ink } }
  ], { x: 0.9, y: 5.9, w: 11.5, h: 0.86, fontFace: F.body, fontSize: 15, valign: "middle", align: "center", margin: 0, lineSpacingMultiple: 1.03 });
  footer(s);
  s.addNotes("This is the lens for the whole session — everything in §4 is an example of spending credibility. Say the accounting plainly: you start neutral, each section moves the balance, and once it's negative the reader discounts your true claims as well. Dwell on the amber line, because it's the move students resist hardest: naming what you haven't established makes the rest more believable. Experienced reviewers read for it — a proposal with no acknowledged weakness reads as naive or dishonest.");

  // 5 The skeleton, fast
  s = mk(); s.background = { color: C.white };
  header(s, "Recall, not instruction", "The nine sections — what is each one FOR?");
  const sk = [
    [FA.FaCompressAlt, "Executive summary", "The whole argument in one paragraph — written last, read first."],
    [FA.FaUsers, "Problem & users", "Who, what need, what evidence. Everything else is judged against it."],
    [FA.FaLightbulb, "Solution overview", "What a user does — mapped back to the prioritized needs."],
    [FA.FaListOl, "Core features", "The shortlist, visibly ranked. This is where judgment shows."],
    [FA.FaBan, "Non-goals", "What you deliberately won't build, and why. Proof you scoped."],
    [FA.FaTools, "Technical approach", "Stack + dependencies, justified. Plus your spike result."],
    [FA.FaShieldAlt, "Risks & mitigation", "Six categories. Specific risks, mitigations with a trigger."],
    [FA.FaCube, "MVP definition", "The slice you'll actually build — sized against real hours."],
    [FA.FaCheckDouble, "Success criteria", "Observer + action + threshold. What \"it works\" means."]
  ];
  const sx = [0.6, 4.63, 8.66], sw = 3.84;
  for (let i = 0; i < 9; i++) {
    const x = sx[i % 3], y = 1.78 + Math.floor(i / 3) * 1.72;
    card(s, x, y, sw, 1.56, C.cardBg);
    await iconCircle(s, sk[i][0], x + 0.26, y + 0.24, 0.5, C.teal);
    s.addText(sk[i][1], { x: x + 0.86, y: y + 0.22, w: sw - 1.05, h: 0.54, color: C.ink, fontFace: F.body, fontSize: 15.5, bold: true, valign: "middle", margin: 0 });
    s.addText(sk[i][2], { x: x + 0.26, y: y + 0.82, w: sw - 0.52, h: 0.62, color: C.slate, fontFace: F.body, fontSize: 13, valign: "top", margin: 0, lineSpacingMultiple: 1.04 });
  }
  footer(s);
  s.addNotes("Seven minutes, and run it as recall — you read the reading, so tell me. Call on the room by section: what is non-goals FOR? Where does the material for technical approach come from? Two or three exchanges is enough; do not lecture the grid. The subtitles are the answers if the room stalls. If the entry poll went badly, this is where you spend three extra minutes — take them from the §4 buffer, never from the feasibility block.");

  // 6 Write them out of order
  s = mk(); s.background = { color: C.white };
  header(s, "The thing reading can't force", "Write them out of order");
  s.addText("Each step supplies the material the next one needs. The hardest section — the MVP — gets easy once everything above it is decided.", { x: 0.6, y: 1.66, w: 12.1, h: 0.36, color: C.slate, fontFace: F.body, fontSize: 15, italic: true, margin: 0 });
  const order = [
    ["1", "Problem & users", "From your evidence. Everything else is judged against it."],
    ["2", "Success criteria", "Before features — so features have to earn their place."],
    ["3", "Solution + core features", "Chosen to satisfy 1 and 2, then ranked."],
    ["4", "Non-goals", "Written while you cut — the reasons are freshest then."],
    ["5", "Technical approach + spike", "The spike result usually changes something above it."],
    ["6", "Risks & mitigation", "Falls out of the approach and the calendar."],
    ["7", "MVP", "Features × risk × real hours. By now it's arithmetic."],
    ["8", "Executive summary", "Last. You can't compress an argument you haven't finished."]
  ];
  for (let i = 0; i < 8; i++) {
    const y = 2.06 + i * 0.57;
    card(s, 0.6, y, 12.1, 0.48, i === 7 ? C.amberBg : C.cardBg);
    s.addShape(pres.shapes.OVAL, { x: 0.8, y: y + 0.04, w: 0.4, h: 0.4, fill: { color: i === 7 ? C.amber : C.teal } });
    s.addText(order[i][0], { x: 0.8, y: y + 0.04, w: 0.4, h: 0.4, color: i === 7 ? C.navy : C.white, fontFace: F.head, fontSize: 16, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(order[i][1], { x: 1.4, y, w: 4.0, h: 0.48, color: C.ink, fontFace: F.body, fontSize: 15.5, bold: true, valign: "middle", margin: 0 });
    s.addText(order[i][2], { x: 5.5, y, w: 7.0, h: 0.48, color: C.slate, fontFace: F.body, fontSize: 14, valign: "middle", margin: 0 });
  }
  s.addText("Then a revision pass: read only your topic sentences · check every claim for its source · cut adjectives.", { x: 0.6, y: 6.62, w: 12.1, h: 0.34, color: C.tealDk, fontFace: F.body, fontSize: 14, bold: true, align: "center", margin: 0 });
  footer(s);
  s.addNotes("The single most useful operational thing in the reading, so give it a slide of its own. Students default to writing top to bottom and then wonder why the executive summary is vague and the MVP is a guess. Point at step 2 specifically — deciding what success means before choosing features is what stops the feature list from becoming a wishlist. And step 8: the summary is a compression of a finished argument. The revision pass at the bottom takes twenty minutes and saves a grade level.");

  // 7 The four checks — overview
  s = mk(); s.background = { color: C.white };
  header(s, "Writing for a skeptical reader", "Four checks — run them on every paragraph");
  card(s, 0.6, 1.9, 12.1, 0.95, C.navy);
  await iconCircle(s, FA.FaEye, 0.95, 2.1, 0.55, C.amber, C.navy);
  s.addText("These four apply to any technical writing with a reader on the other end — bug reports, PRs, design docs, release notes, incident writeups.", { x: 1.75, y: 1.9, w: 10.65, h: 0.95, color: "CFE0E9", fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  const checks = [
    [FA.FaUserSecret, "Audience", "Who is this for, what do they know, what must they believe next?"],
    [FA.FaSlidersH, "Content", "Everything needed, at the right altitude, nothing extra."],
    [FA.FaAlignLeft, "Clarity", "Short sentences. Concrete nouns. One claim per paragraph."],
    [FA.FaMusic, "Tone", "How it sounds to a stranger who owes you nothing."]
  ];
  const cw = 2.92, cgap = 0.16;
  for (let i = 0; i < 4; i++) {
    const x = 0.6 + i * (cw + cgap);
    card(s, x, 3.1, cw, 2.6, C.cardBg);
    await iconCircle(s, checks[i][0], x + (cw - 0.72) / 2, 3.38, 0.72, C.teal);
    s.addText(checks[i][1], { x: x + 0.16, y: 4.24, w: cw - 0.32, h: 0.48, color: C.ink, fontFace: F.body, fontSize: 20, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(checks[i][2], { x: x + 0.22, y: 4.78, w: cw - 0.44, h: 0.82, color: C.slate, fontFace: F.body, fontSize: 13.5, align: "center", valign: "top", margin: 0, lineSpacingMultiple: 1.05 });
  }
  card(s, 0.6, 5.9, 12.1, 0.86, C.amberBg);
  s.addText([
    { text: "You'll meet these again  ", options: { bold: true, color: C.tealDk } },
    { text: "— design review (Wk 6), code review and PR descriptions (Wk 7), the repo audit (Wk 11), the tech-comm portfolio (CP9).", options: { color: C.ink } }
  ], { x: 0.9, y: 5.9, w: 11.5, h: 0.86, fontFace: F.body, fontSize: 15, valign: "middle", align: "center", margin: 0 });
  footer(s);
  s.addNotes("Twelve minutes for the four, so roughly three each — this slide is the map, thirty seconds. Frame them as a standing frame rather than proposal trivia: the same four questions work on a bug report, a PR description, and an incident writeup, and this course will keep asking for them. Then take each in turn; two of the four have a live test you should actually run in the room rather than describe.");

  // 8 Check 1 — Audience
  s = mk(); s.background = { color: C.white };
  header(s, "Check 1 · Audience", "Three readers — and none of them start at page one");
  const readers = [
    [FA.FaUserSecret, C.coral, C.weakBg, "The skeptic", "No stake in your success. Reads to find the hole — every unsupported claim is one."],
    [FA.FaHandshake, C.teal, C.cardBg, "The one you're recruiting", "A coworker, a contributor, a classmate on Oct 7. Reads your RISKS section hardest."],
    [FA.FaBalanceScale, C.green, C.strongBg, "The evaluator", "Applying explicit criteria. The move: find out what they are before you write."]
  ];
  const rx = [0.6, 4.63, 8.66], rw = 3.84;
  for (let i = 0; i < 3; i++) {
    const x = rx[i];
    card(s, x, 1.85, rw, 2.65, readers[i][2]);
    await iconCircle(s, readers[i][0], x + 0.28, 2.12, 0.6, readers[i][1]);
    s.addText(readers[i][3], { x: x + 0.28, y: 2.8, w: rw - 0.56, h: 0.48, color: C.ink, fontFace: F.body, fontSize: 17, bold: true, valign: "middle", margin: 0 });
    s.addText(readers[i][4], { x: x + 0.28, y: 3.32, w: rw - 0.56, h: 1.0, color: C.ink, fontFace: F.body, fontSize: 14, valign: "top", margin: 0, lineSpacingMultiple: 1.05 });
  }
  card(s, 0.6, 4.68, 12.1, 0.72, C.cardBg);
  s.addText("They skim headings and dive into whichever section they doubt. Boring, conventional headings are a navigation aid — use them.", { x: 0.9, y: 4.68, w: 11.5, h: 0.72, color: C.ink, fontFace: F.body, fontSize: 15, valign: "middle", align: "center", margin: 0 });
  card(s, 0.6, 5.58, 12.1, 1.18, C.navy);
  await iconCircle(s, FA.FaFlask, 0.95, 5.86, 0.6, C.amber, C.navy);
  s.addText([
    { text: "Live test — right now:  ", options: { color: C.amber, bold: true } },
    { text: "someone reads their problem paragraph aloud. Someone across the room restates it in one sentence.\nIf they can't, the section is broken — however clear it is to you.", options: { color: C.white } }
  ], { x: 1.78, y: 5.58, w: 10.6, h: 1.18, fontFace: F.body, fontSize: 15, valign: "middle", margin: 0, lineSpacingMultiple: 1.06 });
  footer(s);
  s.addNotes("Three minutes, and actually run the test — it lands far harder than describing it. Take a volunteer's problem paragraph, read it aloud, then ask a student on the far side of the room to restate it in one sentence. Either outcome teaches. Before that, spend a beat on the recruiting reader: most authors forget them, and they read the risks section hardest because it predicts what working with you feels like. Note that jargon their classmate can't parse is a cost, not a credential.");

  // 9 Check 2 — Content
  s = mk(); s.background = { color: C.white };
  header(s, "Check 2 · Content", "Right altitude — and name your holes");
  card(s, 0.6, 1.9, 12.1, 1.16, C.amber);
  await iconCircle(s, FA.FaRulerVertical, 0.95, 2.18, 0.6, C.navy, C.amber);
  s.addText("Name the stack. Don't draw the schema.", { x: 1.78, y: 1.9, w: 10.6, h: 1.16, color: C.navy, fontFace: F.head, fontSize: 26, bold: true, valign: "middle", margin: 0 });
  card(s, 0.6, 3.24, 5.95, 2.2, C.strongBg);
  s.addText("Belongs in the proposal", { x: 0.92, y: 3.42, w: 5.3, h: 0.42, color: C.tealDk, fontFace: F.body, fontSize: 16, bold: true, valign: "middle", margin: 0 });
  s.addText("“Django + Postgres — the data is relational and the admin gives the wardrobe lead a repair tool for free.”", { x: 0.92, y: 3.92, w: 5.3, h: 1.32, color: C.ink, fontFace: F.body, fontSize: 15, italic: true, valign: "top", margin: 0, lineSpacingMultiple: 1.05 });
  card(s, 6.75, 3.24, 5.95, 2.2, C.weakBg);
  s.addText("Belongs in the Week-6 design doc", { x: 7.07, y: 3.42, w: 5.3, h: 0.42, color: C.coral, fontFace: F.body, fontSize: 16, bold: true, valign: "middle", margin: 0 });
  s.addText("Entity-relationship diagrams · table schemas · endpoint lists · class hierarchies · wireframe sets", { x: 7.07, y: 3.92, w: 5.3, h: 1.32, color: C.ink, fontFace: F.body, fontSize: 15, valign: "top", margin: 0, lineSpacingMultiple: 1.05 });
  card(s, 0.6, 5.62, 12.1, 1.14, C.navy);
  await iconCircle(s, FA.FaSearchLocation, 0.95, 5.9, 0.58, C.amber, C.navy);
  s.addText([
    { text: "Name your holes.  ", options: { color: C.amber, bold: true } },
    { text: "Where information is genuinely missing, say so: “[A] I haven't observed this yet.”\nA named hole is content. A hidden one is a trap that goes off when the reader finds it.", options: { color: C.white } }
  ], { x: 1.76, y: 5.62, w: 10.6, h: 1.14, fontFace: F.body, fontSize: 15, valign: "middle", margin: 0, lineSpacingMultiple: 1.06 });
  footer(s);
  s.addNotes("Three minutes. The altitude rule is the one students break most, and always in the same direction — they design instead of argue, because designing is the comfortable part. A proposal that opens an ER diagram has answered a question nobody asked while leaving 'is the problem real?' untouched. The second half connects back to the credibility economy: a named hole spends nothing, a hidden one detonates. Tie it to their [E]/[A] habit from CP2 — same discipline, new document.");

  // 10 Check 3 — Clarity
  s = mk(); s.background = { color: C.white };
  header(s, "Check 3 · Clarity", "The topic-sentence test");
  card(s, 0.6, 1.88, 12.1, 0.92, C.navy);
  await iconCircle(s, FA.FaAlignLeft, 0.95, 2.06, 0.56, C.amber, C.navy);
  s.addText("Read only your first sentences, in order. Do they make the argument by themselves?", { x: 1.75, y: 1.88, w: 10.65, h: 0.92, color: C.white, fontFace: F.body, fontSize: 17, bold: true, valign: "middle", margin: 0 });
  card(s, 0.6, 3.0, 5.95, 2.55, C.strongBg);
  s.addText("Backstage — first sentences: summary · problem · solution", { x: 0.92, y: 3.18, w: 5.3, h: 0.42, color: C.tealDk, fontFace: F.body, fontSize: 15, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "Volunteer-run community theaters own thousands of costumes and track them in spiral notebooks and one volunteer's memory.", options: { breakLine: true, paraSpaceAfter: 7 } },
    { text: "Wardrobe and props volunteers at small, volunteer-run community theaters — one to three people per theater.", options: { breakLine: true, paraSpaceAfter: 7 } },
    { text: "A phone-first web catalog for one theater's collection.", options: {} }
  ], { x: 0.92, y: 3.66, w: 5.3, h: 1.72, color: C.ink, fontFace: F.body, fontSize: 15, italic: true, valign: "top", margin: 0, lineSpacingMultiple: 1.05 });
  card(s, 6.75, 3.0, 5.95, 2.55, C.weakBg);
  s.addText("CostumeHub — the same three sentences", { x: 7.07, y: 3.18, w: 5.3, h: 0.42, color: C.coral, fontFace: F.body, fontSize: 15, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "Costume management is a huge problem for theaters everywhere.", options: { breakLine: true, paraSpaceAfter: 7 } },
    { text: "Theaters everywhere struggle to keep track of their costumes.", options: { breakLine: true, paraSpaceAfter: 7 } },
    { text: "CostumeHub will be a complete, modern platform for costume management.", options: {} }
  ], { x: 7.07, y: 3.66, w: 5.3, h: 1.72, color: C.ink, fontFace: F.body, fontSize: 15, italic: true, valign: "top", margin: 0, lineSpacingMultiple: 1.05 });
  card(s, 0.6, 5.72, 12.1, 1.04, C.amberBg);
  s.addText([
    { text: "One reads as an argument. One reads as a list of moods.  ", options: { bold: true, color: C.tealDk } },
    { text: "If your topic sentences don't carry it, the argument is buried where skimmers will never find it.", options: { color: C.ink } }
  ], { x: 0.9, y: 5.72, w: 11.5, h: 1.04, fontFace: F.body, fontSize: 15, valign: "middle", align: "center", margin: 0, lineSpacingMultiple: 1.05 });
  footer(s);
  s.addNotes("Three minutes, demonstrated rather than asserted. Read the left column aloud, then the right, and let the room hear the difference — these are the actual opening sentences of the summary, problem, and solution sections of each proposal. The strong one's form a chain of claims that names a user and a tool; the weak one's are three moods in a row. Then give them the instruction they can act on tonight: after drafting, read only your first sentences in order. It takes two minutes and exposes buried arguments better than any amount of rereading.");

  // 11 Check 4 — Tone
  s = mk(); s.background = { color: C.white };
  header(s, "Check 4 · Tone", "Two ways to lose a reader who owes you nothing");
  card(s, 0.6, 1.85, 5.95, 2.5, C.weakBg);
  await iconCircle(s, FA.FaBullhorn, 0.9, 2.12, 0.58, C.coral);
  s.addText("Too salesy", { x: 1.66, y: 2.16, w: 4.4, h: 0.5, color: C.coral, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
  s.addText("“revolutionize” · “seamless” · “game-changing”\nReads as compensation for missing evidence.", { x: 0.95, y: 2.86, w: 5.3, h: 1.3, color: C.ink, fontFace: F.body, fontSize: 15, valign: "top", margin: 0, lineSpacingMultiple: 1.06 });
  card(s, 6.75, 1.85, 5.95, 2.5, C.weakBg);
  await iconCircle(s, FA.FaCloudRain, 7.05, 2.12, 0.58, C.slate);
  s.addText("Too apologetic", { x: 7.81, y: 2.16, w: 4.4, h: 0.5, color: C.slate, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
  s.addText("“I hope to maybe attempt…”\nInvites doubt before the argument even starts.", { x: 7.1, y: 2.86, w: 5.3, h: 1.3, color: C.ink, fontFace: F.body, fontSize: 15, valign: "top", margin: 0, lineSpacingMultiple: 1.06 });
  card(s, 0.6, 4.52, 12.1, 1.45, C.strongBg);
  await iconCircle(s, FA.FaBullseye, 0.95, 4.86, 0.72, C.green);
  s.addText([
    { text: "Honest confidence:  ", options: { bold: true, color: C.tealDk } },
    { text: "here's what I know · here's what I must learn, and my plan · here's what I've cut.", options: { color: C.ink } }
  ], { x: 1.95, y: 4.52, w: 10.5, h: 1.45, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
  card(s, 0.6, 6.14, 12.1, 0.72, C.navy);
  s.addText([
    { text: "Evidence beats adjectives.  ", options: { color: C.amber, bold: true } },
    { text: "“Three of four wardrobe volunteers described the same twenty-minute walk to the racks” persuades. “This is a huge problem” doesn't.", options: { color: C.white } }
  ], { x: 0.9, y: 6.14, w: 11.5, h: 0.72, fontFace: F.body, fontSize: 14.5, valign: "middle", align: "center", margin: 0 });
  footer(s);
  s.addNotes("Three minutes. Both failure directions come from the same place — uncertainty about whether the evidence carries the claim. Salesy language papers over it; apologetic language pre-apologizes for it. The fix is neither: state what you know, what you don't, and what you cut. End on the navy bar, because it's the bridge into the dissection: every weak passage they're about to see substitutes an adjective for a fact, and every strong one does the reverse.");

  // 12 §4 opener — same project, two proposals
  s = mk(); s.background = { color: C.white };
  header(s, "Dissection · 22 minutes", "Same project. Two proposals.");
  card(s, 0.6, 1.88, 12.1, 1.05, C.navy);
  await iconCircle(s, FA.FaTheaterMasks, 0.95, 2.1, 0.6, C.amber, C.navy);
  s.addText("The project, both times: a phone-first catalog of one community theater's costumes and props — search what you own, see a photo and a bin, check items in and out. Volunteer-run, no IT staff. Same idea, same effort level; the difference is discovery and cutting.", { x: 1.78, y: 1.88, w: 10.6, h: 1.05, color: "CFE0E9", fontFace: F.body, fontSize: 16, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  card(s, 0.6, 3.15, 5.95, 1.6, C.weakBg);
  s.addText("CostumeHub", { x: 0.92, y: 3.3, w: 5.3, h: 0.5, color: C.coral, fontFace: F.head, fontSize: 22, bold: true, valign: "middle", margin: 0 });
  s.addText("The one you read. Skipped discovery, cut nothing.", { x: 0.92, y: 3.86, w: 5.3, h: 0.7, color: C.ink, fontFace: F.body, fontSize: 15, valign: "top", margin: 0 });
  card(s, 6.75, 3.15, 5.95, 1.6, C.strongBg);
  s.addText("Backstage", { x: 7.07, y: 3.3, w: 5.3, h: 0.5, color: C.tealDk, fontFace: F.head, fontSize: 22, bold: true, valign: "middle", margin: 0 });
  s.addText("Four interviews, one observation, one spike, five cuts.", { x: 7.07, y: 3.86, w: 5.3, h: 0.7, color: C.ink, fontFace: F.body, fontSize: 15, valign: "top", margin: 0 });
  card(s, 0.6, 4.95, 12.1, 1.05, C.cardBg);
  await iconCircle(s, FA.FaComments, 0.95, 5.18, 0.58, C.teal);
  s.addText([
    { text: "How this runs:  ", options: { bold: true, color: C.tealDk } },
    { text: "weak version goes up → you tell me where you stop believing it → then we reveal the strong version. Say what is wrong, specifically — the next slide shows what that sounds like.", options: { color: C.ink } }
  ], { x: 1.76, y: 4.95, w: 10.6, h: 1.05, fontFace: F.body, fontSize: 15, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  card(s, 0.6, 6.18, 12.1, 0.62, C.amberBg);
  s.addText("Both are teaching samples: the theater, the people, the interviews, and the spike are invented. Your evidence must be real.", { x: 0.9, y: 6.18, w: 11.5, h: 0.62, color: C.ink, fontFace: F.body, fontSize: 14, italic: true, valign: "middle", align: "center", margin: 0 });
  footer(s);
  s.addNotes("Set up the twenty-two minutes. The controlled comparison is the whole point: same project, same student-level effort, so every difference they spot is a choice rather than a talent gap. Say the invented-evidence disclaimer out loud — this course grades honesty about evidence and a sample with fabricated interviews needs its label spoken, not just printed. Spend a beat on what the tool actually is — the room needs a picture of the project before excerpts start flying, because nobody has read the strong version. Insist on specific answers from the first one; vague reactions are the habit we are breaking today.");

  // 12b How to answer — say what's wrong, specifically
  s = mk(); s.background = { color: C.white };
  header(s, "How to answer", "Say what's wrong — specifically");
  s.addText("A vague reaction is real information the author can't act on. Convert it into the specific defect before you say it out loud.", { x: 0.6, y: 1.62, w: 12.1, h: 0.34, color: C.slate, fontFace: F.body, fontSize: 14.5, italic: true, margin: 0 });
  const trans = [
    ["“It's vague.”", "“The userbase is six audiences, so it's nobody.”"],
    ["“Seems hard.”", "“Four features in five build weeks, and no evidence behind the estimate.”"],
    ["“I didn't like the tech section.”", "“Every justification there would fit any project on earth.”"]
  ];
  for (let i = 0; i < 3; i++) {
    const y = 2.06 + i * 1.24;
    card(s, 0.6, y, 4.5, 1.1, C.weakBg);
    s.addText(trans[i][0], { x: 0.85, y, w: 4.0, h: 1.1, color: C.ink, fontFace: F.body, fontSize: 15.5, italic: true, valign: "middle", margin: 0, lineSpacingMultiple: 1.03 });
    await iconCircle(s, FA.FaArrowRight, 5.32, y + 0.31, 0.48, C.amber, C.navy);
    card(s, 6.2, y, 6.5, 1.1, C.strongBg);
    s.addText(trans[i][1], { x: 6.45, y, w: 6.0, h: 1.1, color: C.ink, fontFace: F.body, fontSize: 15.5, bold: true, valign: "middle", margin: 0, lineSpacingMultiple: 1.03 });
  }
  card(s, 0.6, 5.86, 12.1, 0.94, C.navy);
  await iconCircle(s, FA.FaBullseye, 0.95, 6.09, 0.48, C.amber, C.navy);
  s.addText([
    { text: "The test is not vocabulary — it's whether the author could act on it.  ", options: { color: C.amber, bold: true } },
    { text: "The CP3 criteria give you ready-made names (problem & user clarity · scope realism · feasibility), and Wednesday's review uses them — but precision is the requirement, in any words.", options: { color: C.white } }
  ], { x: 1.6, y: 5.86, w: 10.8, h: 0.94, fontFace: F.body, fontSize: 14, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  footer(s);
  s.addNotes("Ninety seconds, and it pays for itself all session. Students default to reactions — vague, confusing, too much — which feel like feedback but give the author nothing to change. Read the left column, ask the room to convert one before you show the right. Then land the bottom bar: the goal is a sentence the author could act on tonight. The rubric criteria are a convenient set of names and Wednesday's review is anchored to them, but a precise observation in plain words beats criterion jargon attached to a vague complaint. This is the same skill as a useful code-review comment.");

  // 12c The whole argument — both executive summaries
  s = mk(); s.background = { color: C.white };
  header(s, "Before we pull it apart", "The whole argument, in one paragraph");
  locator(s, "Section 1 of 9", "Executive summary", "the entire argument in miniature — written last, read first.");
  excerptCard(s, 0.6, 2.02, 5.95, 3.45, "weak", [
    "Costume management is a huge problem for theaters everywhere. Most theaters use outdated methods like paper and spreadsheets, which leads to lost items and wasted money. CostumeHub will revolutionize costume inventory with barcode scanning, rentals, budget tracking, and AI-powered recommendations."
  ]);
  excerptCard(s, 6.75, 2.02, 5.95, 3.45, "strong", [
    "Volunteer-run community theaters track thousands of costumes in spiral notebooks and one volunteer's memory. I interviewed four wardrobe volunteers across three theaters; two named items they had bought twice. Backstage is a phone-first catalog: search what you own, see a photo and a bin, check items in and out. The MVP is one theater, seeded with 60 real items. Out of scope: ticketing, budgets, rentals between theaters."
  ]);
  card(s, 0.6, 5.68, 12.1, 1.1, C.navy);
  await iconCircle(s, FA.FaSearch, 0.95, 5.94, 0.58, C.amber, C.navy);
  s.addText([
    { text: "One of these gives you the problem, the evidence, the scope, and what's excluded.  ", options: { color: C.amber, bold: true } },
    { text: "The other gives you how the author feels about it. Everything we look at next is a paragraph out of one of these two documents.", options: { color: C.white } }
  ], { x: 1.76, y: 5.68, w: 10.6, h: 1.1, fontFace: F.body, fontSize: 14.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
  footer(s);
  s.addNotes("Two minutes, and it is the orientation the rest of the dissection depends on — nobody in the room has read the strong proposal, so without this the excerpts arrive from nowhere. Read both aloud. Ask what each one told them: the right paragraph names a bounded user, an evidence count, a specific tool, a sized MVP, and four exclusions; the left names an adjective and a feature list. This also demonstrates the slide-5 claim on real text — the executive summary is written last because it can only compress an argument that already exists.");

  // 13 Pair 1 — weak only
  s = mk(); s.background = { color: C.white };
  header(s, "Pair 1 · problem & users", "Where do you stop believing this?");
  locator(s, "Section 2 of 9", "Problem & users", "who has the problem, and the evidence it is real. Everything else is judged against it.");
  excerptCard(s, 0.6, 2.02, 12.1, 3.2, "weak", [
    "Theaters everywhere struggle to keep track of their costumes.",
    "The users of CostumeHub include community theaters, high school and university drama departments, dance studios, church and community groups, cosplayers, and eventually professional theater companies.",
    "I talked to my aunt, who does costumes for her church's Christmas program, and she said their system is a total mess. I also searched online and found many Reddit posts, which confirms this is a widespread issue."
  ]);
  card(s, 0.6, 5.42, 12.1, 1.16, C.navy);
  await iconCircle(s, FA.FaQuestionCircle, 0.95, 5.7, 0.6, C.amber, C.navy);
  s.addText([
    { text: "Three or four answers.  ", options: { color: C.amber, bold: true } },
    { text: "Name the criterion, not the feeling: bounded users? evidence behind the claim? are the needs ranked?", options: { color: C.white } }
  ], { x: 1.78, y: 5.42, w: 10.6, h: 1.16, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
  footer(s);
  s.addNotes("Don't reveal the strong version yet. Read the passage aloud — hearing 'cosplayers and eventually professional theater companies' does most of the work. Take three or four answers and push each into criteria language: 'six audiences is no audience' is better than 'too broad.' If nobody names the evidence problem, ask directly how many people the author actually talked to. The answer is one relative and a search, and the room will react.");

  // 14 Pair 1 — the contrast
  s = mk(); s.background = { color: C.white };
  header(s, "Pair 1 · the contrast", "Bounded users, ranked needs, a real quote");
  locator(s, "Section 2 of 9", "Problem & users", "same section of the same document, written by someone who did the discovery.");
  excerptCard(s, 0.6, 2.02, 5.95, 3.6, "weak", [
    "Theaters everywhere struggle…",
    "…community theaters, drama departments, dance studios, church groups, cosplayers, professional companies…",
    "I talked to my aunt… I also searched online."
  ]);
  excerptCard(s, 6.75, 2.02, 5.95, 3.6, "strong", [
    "Wardrobe and props volunteers at small community theaters — one to three people per theater.",
    "Need 1 — “Do we already own this?” cannot be answered from the shop floor. [E — 4 of 4]",
    "Ruth H. keeps the collection in a notebook and a shoebox of photos; finding an item means twenty minutes at the racks.",
    "What I have not established: [A] I have spoken to leads, not to new volunteers."
  ]);
  noticeBand(s, 5.74, "What changed:", "the user is bounded and countable · needs are ranked and tagged with how many people said it · a specific person replaces “everywhere” · and the author names what they haven't established.", 1.1);
  footer(s);
  s.addNotes("Now reveal. Walk the three moves: bounded users you could actually go find, needs ranked with an evidence count attached, and one concrete human doing a concrete thing. Then read the fourth line aloud — the author admits they only spoke to leads, not new volunteers. Ask the room whether that admission made them trust the document more or less. It's the credibility-economy lesson landing on a real example.");

  // 15 Pair 2 — weak only
  s = mk(); s.background = { color: C.white };
  header(s, "Pair 2 · technical approach", "Does this author know the project is possible?");
  locator(s, "Section 6 of 9", "Technical approach", "the stack, the gaps, and the spike — where \u201Ccan this person build it?\u201D gets answered.");
  excerptCard(s, 0.6, 2.02, 12.1, 3.2, "weak", [
    "CostumeHub will be built with React on the front end and Node.js on the back end, which are modern, industry-standard technologies with lots of community support.",
    "For the database I will probably use MongoDB because it's flexible and works well with JavaScript.",
    "I have not run a spike yet, but I plan to start with the parts I already know and work up to the harder features."
  ]);
  card(s, 0.6, 5.42, 12.1, 1.16, C.navy);
  await iconCircle(s, FA.FaQuestionCircle, 0.95, 5.7, 0.6, C.amber, C.navy);
  s.addText([
    { text: "Test every justification:  ", options: { color: C.amber, bold: true } },
    { text: "would this same sentence fit any other project on earth? If yes, it isn't a justification — it's a label.", options: { color: C.white } }
  ], { x: 1.78, y: 5.42, w: 10.6, h: 1.16, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
  footer(s);
  s.addNotes("The swap-test is the tool to hand them here: every justification in this passage — modern, industry-standard, flexible — survives being pasted into any proposal in the room, which means it justifies nothing. Then land on the last line hard. 'Start with the parts I already know and work up to the harder features' is precisely the failure the spikes reading warned about: the fatal unknown discovered in Week 13, when there's no runway left to change course.");

  // 16 Pair 2 — the contrast
  s = mk(); s.background = { color: C.white };
  header(s, "Pair 2 · the contrast", "Adjectives vs. constraints — and a spike that ran");
  locator(s, "Section 6 of 9", "Technical approach", "four lines from Backstage: two stack choices, the spike, and what the spike changed.");
  excerptCard(s, 0.6, 2.02, 5.95, 3.6, "weak", [
    "React and Node — modern, industry-standard, lots of community support.",
    "Probably MongoDB because it's flexible.",
    "I have not run a spike yet, but I plan to start with the parts I already know."
  ]);
  excerptCard(s, 6.75, 2.02, 5.95, 3.6, "strong", [
    "Django + Postgres — I've shipped two Django apps, and the admin gives the wardrobe lead a data-repair tool on day one for free.",
    "A $6/month VPS — no IT staff exists at these theaters; one box I can hand over beats an architecture nobody can operate.",
    "Client-side downscaling before upload — direct result of the spike; not optional.",
    "Spike, 6-hour box: naive upload = 71 s median, three of ten failed on the venue's wifi. With downscaling: 48 s, zero failures."
  ]);
  noticeBand(s, 5.74, "What changed:", "every reason is now a constraint — no IT staff, a box the theater can actually operate, a venue where uploads fail — instead of an adjective; and the scariest unknown was answered in six hours, not hoped about.", 1.1);
  footer(s);
  s.addNotes("Reveal and compare reason-types side by side: adjectives on the left, constraints on the right — no IT staff, a box someone can operate, a venue with bad wifi. Constraints are checkable and specific to one project; adjectives are decoration. Then the spike: six hours converted 'photos might be too slow' into a design requirement that's now in the technical approach. Ask the direct question — which of these two authors knows whether their project is possible? Only one of them went and found out.");

  // 17 Pair 3 — weak only
  s = mk(); s.background = { color: C.white };
  header(s, "Pair 3 · non-goals & MVP", "What's wrong with this scope?");
  locator(s, "Sections 5 and 8 of 9", "Non-goals + MVP", "what you deliberately won't build, and the slice you actually will.");
  excerptCard(s, 0.6, 2.0, 12.1, 1.5, "weak", [
    "Non-goals: None at this time. The goal of CostumeHub is to be a complete solution, so I don't want to rule anything out this early."
  ], "CostumeHub — non-goals");
  excerptCard(s, 0.6, 3.62, 12.1, 1.85, "weak", [
    "The MVP will include the inventory catalog with photos, barcode scanning, the mobile app, check-out and return tracking, and basic rental support.",
    "This should be achievable working about 10 hours per week for 14 weeks, which is 140 hours — plenty of time for a project of this size."
  ], "CostumeHub — MVP");
  card(s, 0.6, 5.68, 12.1, 1.08, C.navy);
  await iconCircle(s, FA.FaQuestionCircle, 0.95, 5.92, 0.6, C.amber, C.navy);
  s.addText([
    { text: "Two problems here.  ", options: { color: C.amber, bold: true } },
    { text: "One is a section that exists but says nothing. The other is a number. Find both.", options: { color: C.white } }
  ], { x: 1.78, y: 5.68, w: 10.6, h: 1.08, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
  footer(s);
  s.addNotes("Let them find the 140 hours themselves — it's more effective than telling. Then kill it loudly, because it is the single most common fatal line in student proposals and you have twenty-five drafts arriving Wednesday. Do the honest arithmetic on the board: ten hours covers class, reading, discovery, writing, and reviews, and building runs roughly five weeks. On non-goals, make the sharper point — present-but-empty is worse than absent, because it announces that scoping was postponed rather than done.");

  // 18 Pair 3 — the contrast
  s = mk(); s.background = { color: C.white };
  header(s, "Pair 3 · the contrast", "A cut that hurt — and an MVP sized against real weeks");
  locator(s, "Sections 5 and 8 of 9", "Non-goals + MVP", "the offcuts, with reasons — and the slice those cuts made possible.");
  excerptCard(s, 0.6, 2.02, 5.95, 3.6, "weak", [
    "Non-goals: None at this time — we want a complete solution.",
    "MVP: catalog + barcode scanning + mobile app + rentals.",
    "10 hrs/week × 14 weeks = 140 hours — plenty of time."
  ]);
  excerptCard(s, 6.75, 2.02, 5.95, 3.6, "strong", [
    "No inter-theater rental marketplace — the most-requested “wouldn't it be cool,” and the fastest way to lose the semester.",
    "Cutting it is what makes the rest of this proposal credible. It was in my first draft.",
    "MVP: one theater, one workflow, 60 real items — sized against roughly five build weeks."
  ]);
  noticeBand(s, 5.74, "What changed:", "the cuts are named with reasons — including one the author regretted — and the MVP is one workflow end to end, sized against the weeks that actually exist.", 1.1);
  footer(s);
  s.addNotes("The 'it was in my first draft' sentence is the whole lesson about non-goals, so read it aloud. Naming a cut that hurt proves the author made a decision under real tension rather than listing things they never wanted. Then contrast the two MVPs: four features across four surfaces versus one workflow, one user type, end to end, on real data. Ask which one they'd believe a December demo from — and note that the modest one is also the more ambitious claim, because it's a promise rather than a wish.");

  // 19 Weak patterns
  s = mk(); s.background = { color: C.white };
  header(s, "Synthesis · part 1", "Weak patterns — the ones we just watched");
  const weakPats = [
    "The unbounded user — “theaters everywhere,” six audiences at once",
    "Anecdote as evidence — one relative and a search result",
    "The feature flood — twelve items, no tiers, no mapping to needs",
    "Non-goals empty or missing — scoping postponed, not done",
    "Adjective-only stack justification — “modern,” “flexible”",
    "The spike promised, not run",
    "Generic risks — “time management,” “bugs may occur”",
    "The 140-hour arithmetic",
    "Success criteria no observer could check — “users love the app”",
    "The stretch goal that's obviously the real dream"
  ];
  for (let i = 0; i < 10; i++) {
    const x = i < 5 ? 0.6 : 6.75, y = 1.82 + (i % 5) * 0.92;
    card(s, x, y, 5.95, 0.8, C.weakBg);
    await iconCircle(s, FA.FaTimes, x + 0.22, y + 0.19, 0.42, C.coral);
    s.addText(weakPats[i], { x: x + 0.78, y, w: 5.0, h: 0.8, color: C.ink, fontFace: F.body, fontSize: 14, valign: "middle", margin: 0, lineSpacingMultiple: 1.02 });
  }
  footer(s);
  s.addNotes("Two minutes on this slide and the next — they're a checklist, not a lecture. Read them fast; the room has just seen every one of these in context, so the list is retrieval rather than new material. Tell them plainly: this is the list Wednesday's reviewers will effectively be checking against, and most first drafts contain three or four of these. Suggest they photograph the slide.");

  // 20 Strong patterns
  s = mk(); s.background = { color: C.white };
  header(s, "Synthesis · part 2", "Strong patterns — aim here");
  const strongPats = [
    "Bounded users, with counts and a real quote",
    "Ranked needs, tagged [E] evidence / [A] assumption",
    "A tiered feature table, each item mapped to a need",
    "Non-goals with reasons — including one that hurt",
    "Stack choices justified by constraints, not adjectives",
    "A spike with a question, a box, pre-declared green/red lines",
    "Risks that could belong to no other project",
    "Mitigations with a date or a trigger",
    "An MVP sized against roughly five real build weeks",
    "Criteria with an observer, an action, and a threshold"
  ];
  for (let i = 0; i < 10; i++) {
    const x = i < 5 ? 0.6 : 6.75, y = 1.82 + (i % 5) * 0.92;
    card(s, x, y, 5.95, 0.8, C.strongBg);
    await iconCircle(s, FA.FaCheck, x + 0.22, y + 0.19, 0.42, C.green);
    s.addText(strongPats[i], { x: x + 0.78, y, w: 5.0, h: 0.8, color: C.ink, fontFace: F.body, fontSize: 14, valign: "middle", margin: 0, lineSpacingMultiple: 1.02 });
  }
  footer(s);
  s.addNotes("The mirror image, same pace. Two to call out if you're short on time: non-goals with a reason that cost something, and success criteria with an observer, an action, and a threshold — including one the author expects to fail. Both are moves students believe will hurt them and that actually buy credibility. Point them at the strong sample in resources; it's the worked version of this whole list.");

  // 21 Feasibility — honest confidence
  s = mk(); s.background = { color: C.white };
  header(s, "The hardest move in the genre", "Arguing feasibility without overpromising");
  card(s, 0.6, 1.85, 12.1, 1.2, C.navy);
  await iconCircle(s, FA.FaBullseye, 0.95, 2.15, 0.6, C.amber, C.navy);
  s.addText([
    { text: "Honest confidence:  ", options: { color: C.amber, bold: true } },
    { text: "here's what I know · here's what I must learn, and my plan for it · here's what I've cut.", options: { color: C.white } }
  ], { x: 1.78, y: 1.85, w: 10.6, h: 1.2, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
  const kit = [
    [FA.FaShieldAlt, "Six risk categories", "technical · schedule · dependency · skill · adoption · maintenance"],
    [FA.FaSortAmountDown, "Know / learn / avoid", "Triage every requirement. Every justified “avoid” buys feasibility."],
    [FA.FaFlask, "Your spike", "Required for CP3 — question, time box, green/red lines, honest result."],
    [FA.FaGraduationCap, "The learning plan", "For gaps the spike didn't close: hours budgeted, fallback named."]
  ];
  const kx = [0.6, 6.75];
  for (let i = 0; i < 4; i++) {
    const x = kx[i % 2], y = 3.25 + Math.floor(i / 2) * 1.32;
    card(s, x, y, 5.95, 1.16, C.cardBg);
    await iconCircle(s, kit[i][0], x + 0.26, y + 0.3, 0.56, C.teal);
    s.addText(kit[i][1], { x: x + 0.98, y: y + 0.12, w: 4.8, h: 0.45, color: C.ink, fontFace: F.body, fontSize: 16.5, bold: true, valign: "middle", margin: 0 });
    s.addText(kit[i][2], { x: x + 0.98, y: y + 0.56, w: 4.8, h: 0.5, color: C.slate, fontFace: F.body, fontSize: 13, valign: "top", margin: 0, lineSpacingMultiple: 1.03 });
  }
  card(s, 0.6, 6.02, 12.1, 0.74, C.amber);
  await iconCircle(s, FA.FaBalanceScale, 0.92, 6.16, 0.46, C.navy, C.amber);
  s.addText([
    { text: "Feasibility & technical approach is the heaviest CP3 criterion — 20 points.  ", options: { bold: true, color: C.navy } },
    { text: "Scope realism is another 15.", options: { color: C.navy } }
  ], { x: 1.58, y: 6.02, w: 10.9, h: 0.74, fontFace: F.body, fontSize: 14.5, valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("Twelve minutes for this block, and it's where the grade concentrates. Pull the Week-3 toolkit forward by name — they already own all four pieces, so this is assembly, not new content. The next slide is the CP3 grid — jump to it here and back, rather than describing the weights from memory: twenty points on feasibility plus fifteen on scope realism is a third of the assignment, and that weighting is the course saying this skill is the point. Honest confidence is the posture; the next two slides are the mechanics.");

  // 21b CP3 rubric — the grid, on screen
  s = mk(); s.background = { color: C.white };
  header(s, "How CP3 is graded", "Written Proposal — the rubric");
  s.addText("100 points, weighted. The two highlighted rows are a third of the assignment — that weighting is the point of today.", { x: 0.6, y: 1.66, w: 12.1, h: 0.34, color: C.slate, fontFace: F.body, fontSize: 14.5, italic: true, margin: 0 });
  const rHead = ["Criterion", "Wt", "What it measures"].map((t, i) => ({ text: t, options: { fill: { color: C.navy }, color: C.white, bold: true, fontFace: F.body, fontSize: 14.5, align: i === 1 ? "center" : "left" } }));
  const rRows = [
    ["Problem & user clarity", "15", "Problem and users compelling and evidence-backed — the discovery trail shows.", false],
    ["Solution & core features (+ non-goals)", "15", "Coherent solution; sharp, prioritized features; explicit non-goals.", false],
    ["Feasibility & technical approach", "20", "Stack researched; a spike run on the scariest unknown and honestly reported.", true],
    ["Scope realism (MVP for this term)", "15", "A vertical slice sized against the real build window — with the arithmetic shown.", true],
    ["Richness & extensibility", "15", "Exercises multiple engineering dimensions; a path for others to join.", false],
    ["Risks & mitigation", "10", "Real, specific risks with credible mitigations.", false],
    ["Argument & revision", "10", "Persuasive, and visibly improved in response to peer feedback.", false]
  ];
  const rBody = rRows.map((r) => {
    const z = r[3] ? "FBEAD2" : C.white;
    return [
      { text: r[0], options: { fill: { color: z }, color: C.ink, bold: true, fontFace: F.body, fontSize: 14 } },
      { text: r[1], options: { fill: { color: z }, color: C.tealDk, bold: true, fontFace: F.body, fontSize: 14, align: "center" } },
      { text: r[2], options: { fill: { color: z }, color: C.ink, fontFace: F.body, fontSize: 13.5 } }
    ];
  });
  s.addTable([rHead, ...rBody], { x: 0.6, y: 1.98, w: 12.1, colW: [3.9, 0.8, 7.4], rowH: 0.44, valign: "middle", margin: [4, 9, 4, 9], border: { type: "solid", color: "FFFFFF", pt: 2 } });
  card(s, 0.6, 5.98, 12.1, 0.78, C.navy);
  await iconCircle(s, FA.FaBookOpen, 0.92, 6.14, 0.46, C.amber, C.navy);
  s.addText([
    { text: "The four performance levels are in rubrics.md  ", options: { color: C.amber, bold: true } },
    { text: "— you've had it since week one. Reach at least Developing on every criterion to stay on a passing track.", options: { color: C.white } }
  ], { x: 1.55, y: 5.98, w: 10.9, h: 0.78, fontFace: F.body, fontSize: 14.5, valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("Leave this up and jump back to the previous slide as the feasibility discussion runs — that is why it sits here. Walk only the two highlighted rows: twenty points on feasibility and technical approach, fifteen on scope realism, so a third of the grade rides on arguing honestly about what you can build. Say plainly that this is deliberate, not arithmetic — the course is claiming that scope honesty is the skill that separates a credible founder from an optimistic one. Point at Argument & revision (10) too, since Wednesday's draft is what makes it scoreable. Levels live in rubrics.md; don't read them aloud.");

  // 22 The spike
  s = mk(); s.background = { color: C.white };
  header(s, "The evidence that you found out", "A red spike beats a promised green one");
  card(s, 0.6, 1.85, 12.1, 1.9, C.strongBg);
  s.addText("Backstage's spike — six-hour box", { x: 0.95, y: 2.02, w: 11.4, h: 0.44, color: C.tealDk, fontFace: F.body, fontSize: 16.5, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "Question: can a volunteer photograph and file one item in under 60 seconds on the venue's wifi?", options: { breakLine: true, paraSpaceAfter: 6 } },
    { text: "Declared up front — green: median ≤ 60 s over ten items. Red: median > 90 s, or repeated failures.", options: { breakLine: true, paraSpaceAfter: 6 } },
    { text: "Result: 71 s and three failures out of ten — until client-side downscaling. Then 48 s, zero failures.", options: {} }
  ], { x: 0.95, y: 2.5, w: 11.4, h: 1.15, color: C.ink, fontFace: F.body, fontSize: 15, valign: "top", margin: 0, lineSpacingMultiple: 1.05 });
  // [textColor, cardFill, icon, label, body, iconFill]
  const spikeGrades = [
    [C.green, C.strongBg, FA.FaCheckCircle, "Best", "Ran it. Reported the result honestly — including what it forced you to change.", C.green],
    ["B9781C", C.amberBg, FA.FaExclamationTriangle, "Still good", "Ran it and it came back RED. That's the spike doing its job, cheaply and early.", C.amber],
    [C.coral, C.weakBg, FA.FaTimesCircle, "Worst", "“I haven't run one yet, but I'm confident.” Confidence isn't evidence.", C.coral]
  ];
  const gx = [0.6, 4.63, 8.66], gw = 3.84;
  for (let i = 0; i < 3; i++) {
    const x = gx[i];
    card(s, x, 3.95, gw, 2.05, spikeGrades[i][1]);
    await iconCircle(s, spikeGrades[i][2], x + 0.28, 4.2, 0.54, spikeGrades[i][5]);
    s.addText(spikeGrades[i][3], { x: x + 0.94, y: 4.2, w: gw - 1.1, h: 0.54, color: spikeGrades[i][0], fontFace: F.body, fontSize: 17, bold: true, valign: "middle", margin: 0 });
    s.addText(spikeGrades[i][4], { x: x + 0.28, y: 4.88, w: gw - 0.56, h: 0.95, color: C.ink, fontFace: F.body, fontSize: 14, valign: "top", margin: 0, lineSpacingMultiple: 1.05 });
  }
  card(s, 0.6, 6.16, 12.1, 0.6, C.navy);
  s.addText("The condition that spike produced is now a line in the technical approach. That's what the artifact of a person who found out looks like.", { x: 0.9, y: 6.16, w: 11.5, h: 0.6, color: "CFE0E9", fontFace: F.body, fontSize: 14, italic: true, valign: "middle", align: "center", margin: 0 });
  footer(s);
  s.addNotes("Three minutes. The ranking on this slide surprises students: a red spike outranks a promised green one, because a red result honestly reported is information and a promise is not. Walk Backstage's spike as the model — the green and red lines were declared before the work started, which is what keeps you honest at hour five when you're tempted to call a mess 'basically working.' Note the payoff: the spike changed the design, and that change is visible in the proposal.");

  // 23 The honest budget + do it now
  s = mk(); s.background = { color: C.white };
  header(s, "Scope realism", "The arithmetic almost everyone gets wrong");
  card(s, 0.6, 1.82, 5.95, 2.25, C.weakBg);
  await iconCircle(s, FA.FaTimesCircle, 0.9, 2.08, 0.56, C.coral);
  s.addText("The fatal version", { x: 1.66, y: 2.12, w: 4.4, h: 0.48, color: C.coral, fontFace: F.body, fontSize: 17, bold: true, valign: "middle", margin: 0 });
  s.addText("10 hrs/week × 14 weeks = 140 hours", { x: 0.95, y: 2.78, w: 5.3, h: 0.5, color: C.ink, fontFace: F.head, fontSize: 20, bold: true, valign: "middle", margin: 0 });
  s.addText("Counts hours that were never available, over weeks where you weren't building.", { x: 0.95, y: 3.3, w: 5.3, h: 0.62, color: C.ink, fontFace: F.body, fontSize: 14, valign: "top", margin: 0, lineSpacingMultiple: 1.04 });
  card(s, 6.75, 1.82, 5.95, 2.25, C.strongBg);
  await iconCircle(s, FA.FaCheckCircle, 7.05, 2.08, 0.56, C.green);
  s.addText("The honest version", { x: 7.81, y: 2.12, w: 4.4, h: 0.48, color: C.tealDk, fontFace: F.body, fontSize: 17, bold: true, valign: "middle", margin: 0 });
  s.addText("(hours left after everything) × ~5 weeks", { x: 7.1, y: 2.78, w: 5.3, h: 0.5, color: C.ink, fontFace: F.head, fontSize: 20, bold: true, valign: "middle", margin: 0 });
  s.addText("The ~10 hrs/week covers class, reading, discovery, writing, and reviews. Building runs Weeks 9–13.", { x: 7.1, y: 3.3, w: 5.3, h: 0.62, color: C.ink, fontFace: F.body, fontSize: 14, valign: "top", margin: 0, lineSpacingMultiple: 1.04 });
  card(s, 0.6, 4.28, 12.1, 1.62, C.amber);
  await iconCircle(s, FA.FaStopwatch, 1.0, 4.62, 0.94, C.navy, C.amber);
  s.addText("Do it right now — 90 seconds", { x: 2.3, y: 4.44, w: 10.1, h: 0.5, color: C.navy, fontFace: F.head, fontSize: 23, bold: true, valign: "middle", margin: 0 });
  s.addText("On paper: the hours you actually have in a week × 5. Write the number down. If your MVP doesn't fit it, you found out today instead of in Week 12.", { x: 2.3, y: 4.98, w: 10.1, h: 0.78, color: C.navy, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0, lineSpacingMultiple: 1.05 });
  card(s, 0.6, 6.06, 12.1, 0.7, C.navy);
  s.addText([
    { text: "Underpromise correctly.  ", options: { color: C.amber, bold: true } },
    { text: "A modest MVP you certainly finish beats an impressive one you might. Every explicit non-goal is part of this argument.", options: { color: C.white } }
  ], { x: 0.9, y: 6.06, w: 11.5, h: 0.7, fontFace: F.body, fontSize: 14.5, valign: "middle", align: "center", margin: 0 });
  footer(s);
  s.addNotes("Stop and actually run the ninety seconds — do not just describe it. Have every student write two numbers on paper: honest hours per week, times five. The room goes quiet when the product lands well under what their draft promises, and that silence is worth more than another slide. Then name the payoff: scope realism is fifteen points, and reviewers reward it. Close on non-goals — the reader can't see features you never listed, only the ones you named and cut.");

  // 24 §6a solo activity
  const p1 = [
    ["Nine lines — one per section. Each line says what that section will CLAIM, not what it is.", null, "~3 min"],
    ["Your three biggest risks: category + a mitigation with a date or a trigger.", null, "~2 min"],
    ["The five-week arithmetic — the number you just wrote, and what it honestly buys.", null, "~1 min"],
    ["Star the section you have the least evidence for. That's Wednesday's first stop.", null, null]
  ];
  p1.__note = "Hand out the one-page worksheet — everything on this slide is printed on it, so leave the slide up as a clock rather than a reference. Six minutes, solo, silent. Circulate and read over shoulders: the two common misses are section labels instead of claims ('describes the problem' rather than a claim), and mitigations with no trigger. Nudge individually rather than interrupting the room. Call the last minute so everyone has a starred section before the trade.";
  await workSlide("In class · 6a · ~6 min", "Sketch your proposal", "Solo, on the worksheet:", p1);

  // 25 §6b pair-share
  const p2 = [
    ["Trade worksheets with a neighbor — ideally someone who knows nothing about your project.", null, null],
    ["Which section is weakest? Say what is wrong specifically — not “it\u2019s vague.”", null, null],
    ["Which claim most needs evidence? Point at one line: “how do you know?”", null, null],
    ["Do you believe the five-week arithmetic? Yes or no, and why.", null, null]
  ];
  p2.__note = "Three minutes each direction. Hold them to specific answers — the translation drill from earlier applies here, and a vague verdict wastes their partner's turn. The instruction that matters most is the author's: capture, don't defend — same protocol as the Week-3 workshop and Wednesday's review. Model one sharp, kind critique aloud early so the room hears the register; without it pairs default to politeness and nobody learns anything. Listen for 'that's a good idea' and intervene — ask that pair the arithmetic question directly. This is the rehearsal for Wednesday, when it counts for a grade.";
  await workSlide("In class · 6b · ~6 min", "Trade and pressure-test", "In pairs · 3 minutes each way — the reader answers exactly three questions, out loud:", p2);

  // 26 Wednesday's mechanics
  s = mk(); s.background = { color: C.white };
  header(s, "Wednesday, Sep 30", "Peer-review workshop — the hard mechanics");
  const mech = [
    [FA.FaPrint, "Two printed copies", "Reviewers mark up paper. You keep both — and photograph them that night."],
    [FA.FaCloudUploadAlt, "Draft uploaded to the LMS", "By the start of class. Completion-checked, not scored."],
    [FA.FaListUl, "Minimum sections", "Problem & users · solution · non-goals · risks. A fuller draft gets a better review."]
  ];
  const mx = [0.6, 4.63, 8.66], mw = 3.84;
  for (let i = 0; i < 3; i++) {
    const x = mx[i];
    card(s, x, 1.85, mw, 2.5, C.cardBg);
    await iconCircle(s, mech[i][0], x + 0.28, 2.12, 0.6, C.teal);
    s.addText(mech[i][1], { x: x + 0.28, y: 2.8, w: mw - 0.56, h: 0.5, color: C.ink, fontFace: F.body, fontSize: 16.5, bold: true, valign: "middle", margin: 0 });
    s.addText(mech[i][2], { x: x + 0.28, y: 3.34, w: mw - 0.56, h: 0.9, color: C.slate, fontFace: F.body, fontSize: 13.5, valign: "top", margin: 0, lineSpacingMultiple: 1.05 });
  }
  card(s, 0.6, 4.55, 12.1, 1.3, C.weakBg);
  await iconCircle(s, FA.FaExclamationTriangle, 0.95, 4.85, 0.7, C.coral);
  s.addText([
    { text: "No draft on file caps Argument & revision at Developing.  ", options: { bold: true, color: C.coral } },
    { text: "That criterion measures visible response to feedback — with no draft, there's nothing to show improvement against. Arriving empty-handed also costs a classmate their review.", options: { color: C.ink } }
  ], { x: 1.95, y: 4.55, w: 10.4, h: 1.3, fontFace: F.body, fontSize: 15, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
  card(s, 0.6, 6.05, 12.1, 0.72, C.navy);
  await iconCircle(s, FA.FaCalendarCheck, 0.92, 6.18, 0.46, C.amber, C.navy);
  s.addText([
    { text: "CP3 due Mon, Oct 5  ", options: { color: C.amber, bold: true } },
    { text: "— the final proposal plus scans or photos of both annotated draft copies.", options: { color: C.white } }
  ], { x: 1.55, y: 6.05, w: 10.9, h: 0.72, fontFace: F.body, fontSize: 15, valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("Say all of this out loud and don't rush it — Wednesday breaks if half the room arrives without paper. Two printed copies, draft uploaded by the start of class, four minimum sections. Be straight about the cap: it isn't punitive bookkeeping, it's that revision can't be graded against a draft that doesn't exist. Mention the second cost — a student with no draft leaves their partner with nothing to review. Then the Oct 5 submission shape: proposal plus photos of both marked-up copies.");

  // 27 Wrap
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: -1.3, y: 5.2, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaFileAlt, 0.9, 1.25, 0.9, C.amber, C.navy);
  s.addText("A proposal is an argument, section by section,\nto a reader who is allowed to say no.", { x: 0.9, y: 2.3, w: 11.9, h: 1.5, color: C.white, fontFace: F.head, fontSize: 26, bold: true, italic: true, margin: 0, lineSpacingMultiple: 1.06 });
  s.addText("BEFORE WEDNESDAY, SEP 30", { x: 0.92, y: 4.15, w: 11, h: 0.35, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText([
    { text: "Draft your proposal — write the sections in the order from the reading, not top to bottom", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Run your spike if you haven't — the result belongs in the technical approach", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Bring two printed copies + upload the draft to the LMS. CP3 due Mon, Oct 5", options: { bullet: { indent: 16 } } }
  ], { x: 0.95, y: 4.6, w: 11.7, h: 1.9, color: "CBD8E6", fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0 });
  s.addNotes("Close on the one-liner: an argument, to a reader who is allowed to say no. That framing is what separates a proposal from a description. Make the three actions concrete and name the highest-leverage one — writing out of order, starting from problem and users and finishing with the executive summary. Remind anyone without a spike that Wednesday's reviewers will ask about it, and that a red result reported honestly is a good outcome. Then preview Wednesday: their draft meets its first skeptical readers.");

  const OUT = "Session07-ProposalAnatomy.pptx";
  await pres.writeFile({ fileName: OUT });
  console.log("WROTE", PAGE, "slides");
  try {
    const { verifyDeck, reportText } = require("./verify-deck.js");
    console.log(reportText(await verifyDeck(OUT)));
  } catch (e) { console.warn("verify-deck skipped:", e.message); }
}
build().catch(e => { console.error(e); process.exit(1); });
