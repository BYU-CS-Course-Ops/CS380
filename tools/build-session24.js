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
pres.title = "CS 301R — Session 24 — The Honest Retrospective";

let PAGE = 0;
function mk() { PAGE++; return pres.addSlide(); }
function footer(slide, col) {
  const c = col || C.slate;
  slide.addText("CS 301R · Session 24 · The Honest Retrospective", { x: 7.3, y: 7.04, w: 5.4, h: 0.3, align: "right", color: c, fontFace: F.body, fontSize: 10, margin: 0 });
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

// Two cards side by side, each with a label line, a bold title, and body text.
function pairCards(s, y, h, items, extras) {
  for (let i = 0; i < items.length; i++) {
    const [label, title, body, fill, labelColor] = items[i];
    const x = 0.6 + i * 6.15, dark = fill === C.navy;
    const extra = (extras && extras[i]) || {};
    card(s, x, y, 5.95, h, fill, extra);
    s.addText(label, { x: x + 0.3, y: y + 0.18, w: 5.4, h: 0.4, color: labelColor, fontFace: F.body, fontSize: 15, bold: true, charSpacing: 2, margin: 0, ...extra });
    s.addText(title, { x: x + 0.3, y: y + 0.6, w: 5.4, h: 0.75, color: dark ? C.white : C.ink, fontFace: F.head, fontSize: 22, bold: true, valign: "top", margin: 0, ...extra });
    s.addText(body, { x: x + 0.3, y: y + 1.4, w: 5.4, h: h - 1.55, color: dark ? "CFE0E9" : C.ink, fontFace: F.body, fontSize: 17, valign: "top", margin: 0, ...extra });
  }
}

async function build() {
  let s;

  // 1 Title
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: 10.9, y: -1.4, w: 4.2, h: 4.2, fill: { color: "1C3252" } });
  s.addShape(pres.shapes.OVAL, { x: 12.0, y: 5.1, w: 3.0, h: 3.0, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaBalanceScale, 0.9, 1.45, 1.0, C.amber, C.navy);
  s.addText("CS 301R · SOFTWARE ENGINEERING STUDIO I", { x: 0.92, y: 2.75, w: 11, h: 0.35, color: "9FB4C7", fontFace: F.body, fontSize: 15, bold: true, charSpacing: 2, margin: 0 });
  s.addText("The Honest Retrospective", { x: 0.9, y: 3.15, w: 12.1, h: 1.3, color: C.white, fontFace: F.head, fontSize: 42, bold: true, margin: 0 });
  s.addText([
    { text: "Session 24 — check your claims, then tell the story forward", options: { color: C.amber, bold: true, breakLine: true } },
    { text: "Monday, November 30, 2026", options: { color: "9FB4C7" } }
  ], { x: 0.92, y: 4.7, w: 11, h: 0.9, fontFace: F.body, fontSize: 19, margin: 0, lineSpacingMultiple: 1.2 });
  s.addNotes("First class after Thanksgiving. Before class: print the Claims-Check Worksheet, one per student. Students bring their proposal, their MVP Plan and V1 Proof Sheet, and their known-issues log: the retrospective is written against what they said at the time, not from memory. Two workshops today; keep the talk short. CP11, which includes the retrospective, is due Wednesday night.");

  // 2 Today
  s = mk(); s.background = { color: C.white };
  header(s, "Today", "Check what you claimed, then frame what you'll show");
  const plan = [
    [FA.FaBalanceScale, "The stance: blameless, evidence, no spin either way", "8 min"],
    [FA.FaClipboardCheck, "Workshop: the claims check", "20 min"],
    [FA.FaPenFancy, "Drafting the retrospective, and your reflection", "15 min"],
    [FA.FaExchangeAlt, "From retrospective to pitch", "10 min"],
    [FA.FaTools, "Workshop: your pitch skeleton", "15 min"],
    [FA.FaRoute, "The last two weeks", "7 min"]
  ];
  for (let i = 0; i < plan.length; i++) {
    const y = 1.95 + i * 0.8;
    const hi = i === 1 || i === 4;
    card(s, 0.6, y, 12.1, 0.68, hi ? C.navy : C.cardBg);
    await iconCircle(s, plan[i][0], 0.88, y + 0.1, 0.48, hi ? C.amber : C.teal, hi ? C.navy : "FFFFFF");
    s.addText(plan[i][1], { x: 1.6, y, w: 9.0, h: 0.68, color: hi ? C.white : C.ink, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
    s.addText(plan[i][2], { x: 10.6, y, w: 1.8, h: 0.68, color: hi ? C.amber : C.slate, fontFace: F.body, fontSize: 16, bold: true, align: "right", valign: "middle", margin: 0 });
  }
  footer(s);
  s.addNotes("Thirty seconds. Two products leave today in draft: the spine of the written retrospective, which is half of CP11 on Wednesday, and the skeleton of the final pitch for Demo Day. The two highlighted rows are workshops, and together they're most of the session; the talking in between is short on purpose.");

  // 3 Every project starts on claims
  s = mk(); s.background = { color: C.white };
  header(s, "Every project starts on claims", "At work, in a startup, in a lab, or here");
  const cl = [
    [FA.FaUsers, "“This need is real”", "The business case, the market, the user research"],
    [FA.FaCalendarCheck, "“This fits the time”", "The estimate, the plan, the scope you signed up for"],
    [FA.FaFlask, "“This will prove something”", "The bet the first version was built to test"]
  ];
  for (let i = 0; i < 3; i++) {
    const x = 0.6 + i * 4.1;
    card(s, x, 1.95, 3.9, 2.75, C.cardBg);
    await iconCircle(s, cl[i][0], x + 0.3, 2.2, 0.7, C.teal, "FFFFFF");
    s.addText(cl[i][1], { x: x + 0.3, y: 3.0, w: 3.4, h: 0.8, color: C.ink, fontFace: F.head, fontSize: 20, bold: true, valign: "top", margin: 0 });
    s.addText(cl[i][2], { x: x + 0.3, y: 3.8, w: 3.3, h: 0.85, color: C.slate, fontFace: F.body, fontSize: 16, valign: "top", margin: 0 });
  }
  bar(s, 5.0, 0.85, C.navy, "A retrospective", "checks those claims against what happened, in writing, with evidence.", null);
  bar(s, 6.0, 0.8, C.cardBg, "Yours:", "the need statement, the proposal, and the first-version plan are the claims.", 1);
  footer(s);
  s.addNotes("Two minutes. Start general: every project anyone runs rests on these three kinds of claim, whether they're written in a business case, a grant proposal, or a sprint plan. Good teams check them afterward on purpose; most never do, and repeat themselves. Click: this course made you write all three down, which is why today is possible. You're checking what you said, not what you remember saying.");

  // 4 Blameless
  s = mk(); s.background = { color: C.white };
  header(s, "Blameless", "Causes live in assumptions and systems, not in people");
  pairCards(s, 1.95, 2.45, [
    ["BLAME", "“Alex was slow.”", "Names a person. Teaches nothing, and the next team makes the same assumption.", C.weakBg, C.coral],
    ["BLAMELESS", "“We assumed users were easy to reach. It took three times longer.”", "Names the assumption. The next project can plan for it.", C.strongBg, C.green]
  ]);
  bar(s, 4.7, 1.0, C.navy, "From the SRE reading:", "a postmortem is factual and aimed at improvement. Your retrospective is a postmortem where, with luck, nothing died.", null);
  bar(s, 5.95, 0.8, C.cardBg, "Solo too:", "“I was lazy” is blame. “I planned for 10 hours a week and had 6” is a finding.", null);
  footer(s);
  s.addNotes("Two minutes. The SRE chapter is the stance: when something goes wrong, ask what assumption or system let it happen, not who. It matters even on a solo project, where the person you'd blame is yourself; self-blame is just as useless as blaming a teammate. A finding is something the next project can act on. Keep this brisk; the next three slides are the core of today.");

  // 5 Verdict not graded
  s = mk(); s.background = { color: C.white };
  header(s, "The verdict isn't graded. The evidence is.", "A right call and a wrong one can both be written well");
  pairCards(s, 1.95, 2.6, [
    ["IT HELD", "A good call", "Say why it was right, and whether you'd make it the same way again. Was it reasoning, or luck?", C.cardBg, C.tealDk],
    ["IT DIDN'T HOLD", "Discovery working", "Say what you assumed, what the evidence showed, and what you learned from it.", C.cardBg, C.tealDk]
  ], [REVEAL(1), REVEAL(2)]);
  bar(s, 4.85, 0.95, C.amber, null, "Neither scores higher. There's no quota of failures to report.", 3);
  bar(s, 6.0, 0.8, C.cardBg, "On CP11:", "graded on the evidence and what you took from it, either way.", 3);
  footer(s);
  s.addNotes("Two minutes, and say it plainly. If your early judgment was right, you aren't penalized for it: a claim that held, with evidence, was a good call. The learning in that row is why the call was right, which is how judgment gets repeatable. A claim that didn't hold, written down, is discovery working. One card per click; the amber line on the third. Nobody should go looking for failures to report.");

  // 6 Spin both ways
  s = mk(); s.background = { color: C.white };
  header(s, "Spin runs both ways", "Two ways to write a retrospective that teaches nothing");
  const sp = [
    ["UNEARNED SUCCESS", "“It all worked!”", "With nothing that could have shown otherwise.", C.weakBg, C.coral],
    ["CLAIMS · EVIDENCE · LEARNING", "What we said, what happened, what we took from it", "Held or not, every verdict points at something a reader could check.", C.navy, C.amber],
    ["PERFORMED FAILURE", "“Everything went wrong.”", "Setbacks listed, or invented, to look reflective.", C.weakBg, C.coral]
  ];
  for (let i = 0; i < 3; i++) {
    const x = 0.6 + i * 4.1, dark = i === 1, extra = dark ? REVEAL(1) : {};
    card(s, x, 1.95, 3.9, 3.6, sp[i][3], extra);
    s.addText(sp[i][0], { x: x + 0.3, y: 2.12, w: 3.4, h: 0.4, color: sp[i][4], fontFace: F.body, fontSize: 14, bold: true, charSpacing: 1, margin: 0, ...extra });
    s.addText(sp[i][1], { x: x + 0.3, y: 2.6, w: 3.35, h: 1.25, color: dark ? C.white : C.ink, fontFace: F.head, fontSize: 21, bold: true, valign: "top", margin: 0, ...extra });
    s.addText(sp[i][2], { x: x + 0.3, y: 3.95, w: 3.3, h: 1.45, color: dark ? "CFE0E9" : C.ink, fontFace: F.body, fontSize: 17, valign: "top", margin: 0, ...extra });
  }
  bar(s, 5.85, 0.9, C.cardBg, "The cross-check:", "your retrospective is read against your repository and the onboarding test. Spin shows.", null);
  footer(s);
  s.addNotes("Two minutes. Name the two outside cards first, then click for the middle. Both outside cards are spin: one claims success it never tested, the other performs failure to sound humble. Inventing a setback is as dishonest as inventing a success. The middle is what's graded. The cross-check line is real: a retro that claims smooth onboarding over a failed setup test reads as spin.");

  // 7 Held means it could have failed
  s = mk(); s.background = { color: C.white };
  header(s, "“Held” means it could have failed", "Three honest verdicts");
  const hv = [
    ["Held", "something could have shown it wrong, and didn't"],
    ["Refuted", "the evidence says no, and you can point at it"],
    ["Open", "nothing has tested it yet. Say what would settle it"]
  ];
  for (let i = 0; i < hv.length; i++) numRow(s, 1.95 + i * 1.0, 0.85, i + 1, hv[i][0] + ":", hv[i][1]);
  card(s, 0.6, 5.1, 12.1, 1.6, C.navy);
  s.addText([
    { text: "Remember the falsifier?  ", options: { bold: true, color: C.amber } },
    { text: "On your V1 Proof Sheet you named a result that would tell you a claim was wrong. If that result could have happened and didn't, the claim held. If no test could ever have failed it, the claim is open.", options: { color: C.white } }
  ], { x: 0.95, y: 5.1, w: 11.4, h: 1.6, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
  footer(s);
  s.addNotes("Two minutes. This is what keeps 'held' honest without penalizing anyone for being right. A claim only counts as held if it was actually put at risk. The falsifier from Session 19 is exactly that test. Open is a respectable answer, and often the most honest one for usability claims with few real users; what makes it good is naming what would settle it.");

  // 8 The worksheet
  s = mk(); s.background = { color: C.white };
  header(s, "The Claims-Check Worksheet", "Copy each claim from what you wrote at the time");
  const ws = [
    ["The need", "Your need statement and proposal: the user, and how you'd reach them"],
    ["The plan", "Your proposal: the scope against the time, the risk you named first"],
    ["The build", "Your first-version plan: the three ranked claims"],
    ["The cuts", "Session 19's cut and the Session 21 check-in: was each the right call?"]
  ];
  for (let i = 0; i < ws.length; i++) numRow(s, 1.95 + i * 0.95, 0.82, i + 1, ws[i][0] + ":", ws[i][1]);
  s.addText("FOR EACH CLAIM:  WHAT WE CLAIMED · THE EVIDENCE · VERDICT · WHAT WE LEARNED / WHY IT HELD", { x: 0.6, y: 5.8, w: 12.1, h: 0.35, color: C.slate, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 1, margin: 0 });
  s.addText("Evidence: a demo moment, an audit or test sheet line, an issue, a user conversation.", { x: 0.6, y: 6.25, w: 12.1, h: 0.45, color: C.tealDk, fontFace: F.body, fontSize: 17, bold: true, italic: true, margin: 0 });
  footer(s);
  s.addNotes("Two minutes; hand out the worksheet. The four blocks follow the course's paper trail, in order. Insist on copying the claim from the document, not from memory; memory quietly rewrites claims to match what happened. Every held or refuted needs evidence a reader could check. The cuts block asks a different question, right call or wrong, and can't tell is allowed.");

  // 9 Workshop: claims check
  s = mk(); s.background = { color: C.navy };
  darkHeader(s, "Workshop · 20 min", "The claims check");
  const wk = [
    ["Open the documents", "Proposal, first-version plan, proof sheet, known-issues log. Copy the claims"],
    ["Point at the evidence", "For each: what happened, and where a reader could see it"],
    ["Mark the verdict", "Held, refuted, or open. For a cut: right call, wrong call, can't tell"],
    ["Write what you learned", "For a held row: why the call was right, and would you make it again?"]
  ];
  for (let i = 0; i < wk.length; i++) {
    const y = 1.95 + i * 0.92;
    card(s, 0.6, y, 12.1, 0.8, C.navy2);
    s.addText(String(i + 1), { x: 0.85, y, w: 0.4, h: 0.8, color: C.amber, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
    s.addText(wk[i][0], { x: 1.35, y, w: 3.4, h: 0.8, color: C.white, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
    s.addText(wk[i][1], { x: 4.75, y, w: 7.75, h: 0.8, color: "CFE0E9", fontFace: F.body, fontSize: 16, valign: "middle", margin: 0 });
  }
  card(s, 0.6, 5.75, 12.1, 1.0, C.amber);
  s.addText([
    { text: "I'll ask:  ", options: { bold: true } },
    { text: "Where's the evidence? And could that claim have failed?" }
  ], { x: 0.95, y: 5.75, w: 11.4, h: 1.0, color: C.navy, fontFace: F.body, fontSize: 18, valign: "middle", margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("Twenty minutes; leave this up. Circulate to every project at least twice with the two questions. Watch for verdicts with an empty evidence column, and for held rows that nothing ever tested; those are open. Watch too for students hunting for a failure to write about; tell them directly that a well-evidenced held is full credit. At fifteen minutes, warn that drafting starts next.");

  // 10 The four prompts
  s = mk(); s.background = { color: C.white };
  header(s, "The project retrospective", "Four sections, drafted now as stubs of 2–4 sentences");
  const rp = [
    ["What held, and what didn't", "your worksheet's strongest rows"],
    ["What the first version proved, and what it didn't", "the open questions, stated plainly"],
    ["What we'd do differently", "process and product, each one actionable, not vague regret"],
    ["Where it goes next, as others join", "consistent with your roadmap; claim only what the code supports"]
  ];
  for (let i = 0; i < rp.length; i++) numRow(s, 1.95 + i * 1.0, 0.85, i + 1, rp[i][0] + ":", rp[i][1]);
  bar(s, 6.0, 0.8, C.amber, null, "It's public: docs/retrospective.md, in your launch tag. Write it for a stranger.", null);
  footer(s);
  s.addNotes("Twelve of the fifteen minutes. Students write two to four sentences under each heading, live, from the worksheet. Section 3 is where vague regret creeps in; push for a change someone could actually make next time, like estimating against the hours that exist. Section 4 must agree with the roadmap in the repository: the foundation supports X only if it does. It's committed as docs/retrospective.md and ships in the v0.1-launch tag, so a contributor or a faculty member will read it cold.");

  // 11 Individual reflection
  s = mk(); s.background = { color: C.white };
  header(s, "Your reflection", "Half a page, first person, submitted privately on Canvas");
  card(s, 0.6, 1.95, 12.1, 1.55, C.navy);
  s.addText("Whom did this work serve, and what did you learn about building for others?", { x: 0.95, y: 1.95, w: 11.4, h: 1.55, color: C.white, fontFace: F.head, fontSize: 25, bold: true, valign: "middle", margin: 0 });
  pairCards(s, 3.65, 2.15, [
    ["WHY ASK", "Your work ends up in other hands", "The users it was for, and the contributors it's built to welcome.", C.cardBg, C.tealDk],
    ["THEN ONE LINE", "What will you carry forward?", "Into the next project you start or join.", C.cardBg, C.tealDk]
  ]);
  bar(s, 5.95, 0.8, C.amber, null, "Read for honesty and specifics, not sentiment. Name real people and what you learned.", null);
  footer(s);
  s.addNotes("Three minutes, as a quiet write; stop talking once they start. Every engineer's work lands in someone else's hands, and noticing whose is part of doing it well. Keep it authentic, not performative: a specific person and a specific lesson beat eloquence. Each member writes their own and submits it privately on Canvas with the tag URL and the checklist photo; it never goes in the repository. On a solo project, as every project is this term, you write both.");

  // 12 Retrospective to pitch
  s = mk(); s.background = { color: C.white };
  header(s, "The pitch is the retrospective, told forward", "The same three questions, now with receipts");
  const tq = [
    ["What need does this serve?", "Now with evidence your first pitch didn't have: discovery, a working slice, what users and testers showed"],
    ["What has been built?", "The live demo, claims-first: the progress-demo craft, with higher stakes"],
    ["Where does it go next, and how can others join?", "Your launch package is the answer. Show the on-ramp, not just the roadmap"]
  ];
  for (let i = 0; i < tq.length; i++) {
    const y = 1.95 + i * 1.35;
    card(s, 0.6, y, 12.1, 1.2, C.cardBg);
    s.addShape(pres.shapes.OVAL, { x: 0.85, y: y + 0.34, w: 0.52, h: 0.52, fill: { color: C.teal } });
    s.addText(String(i + 1), { x: 0.85, y: y + 0.34, w: 0.52, h: 0.52, color: C.white, fontFace: F.body, fontSize: 18, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText([
      { text: tq[i][0], options: { bold: true, color: C.ink, fontFace: F.head, fontSize: 20, breakLine: true } },
      { text: tq[i][1], options: { color: C.slate } }
    ], { x: 1.6, y, w: 10.9, h: 1.2, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0 });
  }
  bar(s, 6.05, 0.75, C.navy, "Q&A", "tests whether the demo and the retrospective agree.", null);
  footer(s);
  s.addNotes("Three minutes. These are the three questions from Session 1, now the outline of the final pitch. Each answer comes from something already written: the need from discovery and the claims check, the build from the demo, the future from the launch package. Point out that Q&A is where the retrospective pays off; the hardest questions are already answered honestly there.");

  // 13 What changed since Pitch #1
  s = mk(); s.background = { color: C.white };
  header(s, "What changed since your first pitch", "From a proposal to a review of the work");
  pairCards(s, 1.95, 2.75, [
    ["THEN", "A possibility", "You argued a need was real and a plan could work, and recruited people to build it.", C.cardBg, C.slate],
    ["NOW", "A record", "You defend what happened, with receipts, and invite people to join what exists.", C.navy, C.amber]
  ], [{}, REVEAL(1)]);
  bar(s, 5.0, 0.95, C.cardBg, "At work:", "the difference between pitching a project and presenting its launch review.", 2);
  bar(s, 6.1, 0.75, C.amber, null, "A record is a stronger position. Argue from evidence you generated.", 2);
  footer(s);
  s.addNotes("Three minutes. In October you sold a possibility; on Demo Day you defend a record, in front of an outside audience with invited faculty in it. Click for the right card. Second click: this is the move from proposal to launch review that every working engineer makes, and it's easier to argue honestly from evidence you generated than from hope. Keep the capstone out of it for now.");

  // 14 The time box
  s = mk(); s.background = { color: C.white };
  header(s, "Nine minutes, then five of questions", "A hard limit, so plan the beats");
  const bt = [["The need", "~2 min", 2], ["What's built: the live demo", "~5 min", 5], ["Next, and how to join", "~2 min", 2]];
  let bx = 0.6;
  for (let i = 0; i < bt.length; i++) {
    const w = 12.1 * bt[i][2] / 9 - (i < 2 ? 0.1 : 0);
    const dark = i === 1;
    card(s, bx, 1.95, w, 1.6, dark ? C.navy : C.cardBg);
    s.addText([
      { text: bt[i][0], options: { bold: true, color: dark ? C.white : C.ink, breakLine: true } },
      { text: bt[i][1], options: { color: dark ? C.amber : C.tealDk, bold: true } }
    ], { x: bx + 0.2, y: 1.95, w: w - 0.4, h: 1.6, fontFace: F.body, fontSize: 18, valign: "middle", margin: 0 });
    bx += w + 0.1;
  }
  const tb = [
    ["Q&A, 5 min", "Direct and honest. “It held, here's how we know” and “v1 didn't prove that yet” are both strong answers."],
    ["The demo runs from a tag", "cp12-demo, pushed by 11:59 pm Thursday, Dec 10: the last day of classes."]
  ];
  for (let i = 0; i < 2; i++) {
    const x = 0.6 + i * 6.15;
    card(s, x, 3.85, 5.95, 1.75, C.cardBg);
    s.addText([
      { text: tb[i][0], options: { bold: true, color: C.tealDk, breakLine: true } },
      { text: tb[i][1], options: { color: C.ink } }
    ], { x: x + 0.3, y: 3.85, w: 5.35, h: 1.75, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  }
  bar(s, 5.9, 0.85, C.amber, null, "If the demo needs five minutes, the need and the invitation get two each. Cut words, not the demo.", null);
  footer(s);
  s.addNotes("Two minutes. Four projects, and the room has no slack, so nine minutes is a hard stop. The budget is a guide: the demo is the heaviest criterion, so it gets the most time. Mention the tag now so nobody is surprised: same freeze-by-tag rule as the progress demo, and it has to be in by Thursday night because nothing but the final can be due after the last day of classes.");

  // 15 Workshop: pitch skeleton
  s = mk(); s.background = { color: C.navy };
  darkHeader(s, "Workshop · 15 min", "Your pitch skeleton");
  const ps = [
    ["One slide idea per beat", "Need, with its evidence · built · next, and how to join"],
    ["The demo plan", "The claim you'll state first, the path you'll walk, the fallback if it breaks"],
    ["Who runs the laptop", "Solo: script it so you can talk and drive, or pre-stage every screen"],
    ["The hardest question", "Write it down, and your honest answer. It's in your retrospective"]
  ];
  for (let i = 0; i < ps.length; i++) {
    const y = 1.95 + i * 0.92;
    card(s, 0.6, y, 12.1, 0.8, C.navy2);
    s.addText(String(i + 1), { x: 0.85, y, w: 0.4, h: 0.8, color: C.amber, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
    s.addText(ps[i][0], { x: 1.35, y, w: 3.4, h: 0.8, color: C.white, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
    s.addText(ps[i][1], { x: 4.75, y, w: 7.75, h: 0.8, color: "CFE0E9", fontFace: F.body, fontSize: 16, valign: "middle", margin: 0 });
  }
  card(s, 0.6, 5.75, 12.1, 1.0, C.amber);
  s.addText([
    { text: "I'll ask:  ", options: { bold: true } },
    { text: "What would make a skeptical outsider believe this project has a future?" }
  ], { x: 0.95, y: 5.75, w: 11.4, h: 1.0, color: C.navy, fontFace: F.body, fontSize: 18, valign: "middle", margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("Fifteen minutes; leave this up. Every project should leave with one line per beat and a demo plan with a fallback. Solo founders have the extra problem of talking while driving; pre-staged screens or a short script solves it. Circulate with the skeptical-outsider question, and point students back to the open rows of their worksheet for the hardest question they'll get.");

  // 16 Wrap
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: -1.3, y: 5.2, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaBalanceScale, 0.9, 0.85, 0.85, C.amber, C.navy);
  s.addText("Claims, evidence, learning. Then tell it forward.", { x: 0.9, y: 1.85, w: 11.9, h: 0.8, color: C.white, fontFace: F.head, fontSize: 25, bold: true, italic: true, margin: 0 });
  s.addText("THE LAST TWO WEEKS", { x: 0.92, y: 2.85, w: 11, h: 0.35, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText([
    { text: "Wednesday, Dec 2: launch studio and the onboarding test. CP11 due end of day", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 6, bold: true, color: C.white } },
    { text: "Monday, Dec 7: the dry run, full pitch and live demo against the clock", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 6 } },
    { text: "Wednesday, Dec 9: final studio, polish only", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 6 } },
    { text: "Thursday, Dec 10, 11:59 pm: cp12-demo tag pushed", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 6 } },
    { text: "Monday, Dec 14, 8:30–10:00 AM: Demo Day", options: { bullet: { indent: 16 }, bold: true, color: C.white } }
  ], { x: 0.95, y: 3.27, w: 11.7, h: 2.5, color: "CBD8E6", fontFace: F.body, fontSize: 17, valign: "top", margin: 0 });
  card(s, 0.6, 5.95, 12.1, 0.8, C.amber);
  s.addText("Tonight: retrospective stubs into prose; pitch skeleton into slides.", { x: 0.9, y: 5.95, w: 11.5, h: 0.8, color: C.navy, fontFace: F.body, fontSize: 17, bold: true, align: "center", valign: "middle", margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("Two minutes. Say the one-liner. Walk the dates once: Wednesday is assembly and the onboarding test with CP11 due that night; Monday is the dry run, so bring the pitch performance-ready; Thursday night is the tag. Demo Day starts at 8:30, not 7:00: the registrar's block opens earlier, but with four projects we don't need it. Faculty are invited.");

  const OUT = "Session24-HonestRetrospective.pptx";
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
