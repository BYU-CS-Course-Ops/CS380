const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const FA = require("react-icons/fa");
const path = require("path");

const C = {
  navy: "14233A", navy2: "1E3352", teal: "12908F", tealDk: "0E6E6D",
  amber: "E8A33D", coral: "D9614C", green: "3E9C6B",
  ink: "1E2A36", slate: "5F7284", cardBg: "F2F6F8", ice: "E4EEF1", white: "FFFFFF"
};
const F = { head: "Cambria", body: "Calibri" };
const VDIMG = path.resolve(__dirname, "../canvas_material/resources/img/value-doability.png");

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
pres.title = "CS 301R — Session 6 — Convergence Workshop";

let PAGE = 0;
function mk() { PAGE++; return pres.addSlide(); }
function footer(slide, col) {
  const c = col || C.slate;
  slide.addText("CS 301R · Session 6 · Convergence Workshop", { x: 7.3, y: 7.04, w: 5.4, h: 0.3, align: "right", color: c, fontFace: F.body, fontSize: 10, margin: 0 });
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
// navy "work instructions" slide used for the three workshop parts (stays on screen while students work)
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

async function build() {
  let s;

  // 1 Title
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: 10.9, y: -1.4, w: 4.2, h: 4.2, fill: { color: "1C3252" } });
  s.addShape(pres.shapes.OVAL, { x: 12.0, y: 5.1, w: 3.0, h: 3.0, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaFilter, 0.9, 1.45, 1.0, C.amber, C.navy);
  s.addText("CS 301R · SOFTWARE ENGINEERING STUDIO I", { x: 0.92, y: 2.75, w: 11, h: 0.35, color: "9FB4C7", fontFace: F.body, fontSize: 15, bold: true, charSpacing: 2, margin: 0 });
  s.addText("Narrowing to a Defensible Idea", { x: 0.9, y: 3.15, w: 12.1, h: 1.3, color: C.white, fontFace: F.head, fontSize: 42, bold: true, margin: 0 });
  s.addText([
    { text: "Session 6 — the convergence workshop", options: { color: C.amber, bold: true, breakLine: true } },
    { text: "Wednesday, September 23, 2026", options: { color: "9FB4C7" } }
  ], { x: 0.92, y: 4.7, w: 11, h: 0.9, fontFace: F.body, fontSize: 19, margin: 0, lineSpacingMultiple: 1.2 });
  s.addNotes("Three weeks of opening up; today we deliberately narrow down. Frame the goal in one breath: leave with one or two ideas you can defend, and a written rationale for them. Convergence done well is a discipline, not a gut call — a shared yardstick, honest feedback, then commit. CP1 Idea Briefs turn in today; the idea you converge on becomes CP2, written over the weekend and due Mon, Sep 28. Keep energy up — most of today is hands-on.");

  // 2 Bridge
  s = mk(); s.background = { color: C.white };
  header(s, "Where we are", "Three weeks diverging — today you converge");
  card(s, 0.6, 2.05, 5.95, 3.5, C.cardBg);
  await iconCircle(s, FA.FaSearch, 0.9, 2.35, 0.66, C.teal);
  s.addText("Weeks 1–3 · diverging", { x: 1.72, y: 2.42, w: 4.6, h: 0.5, color: C.ink, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
  s.addText("You explored the problem space, did discovery, and read feasibility. You arrive with 2–3 candidate ideas.", { x: 0.98, y: 3.3, w: 5.35, h: 2.1, color: C.ink, fontFace: F.body, fontSize: 16.5, valign: "top", margin: 0, lineSpacingMultiple: 1.06 });
  card(s, 6.75, 2.05, 5.95, 3.5, C.navy);
  await iconCircle(s, FA.FaFilter, 7.05, 2.35, 0.66, C.amber, C.navy);
  s.addText("Today · converging", { x: 7.87, y: 2.42, w: 4.6, h: 0.5, color: C.white, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
  s.addText("Score against a shared yardstick, pressure-test with peers, and leave with 1–2 ideas you can defend.", { x: 7.1, y: 3.3, w: 5.35, h: 2.1, color: "CFE0E9", fontFace: F.body, fontSize: 16.5, valign: "top", margin: 0, lineSpacingMultiple: 1.06 });
  card(s, 0.6, 5.78, 12.1, 0.98, C.amber);
  await iconCircle(s, FA.FaExclamationCircle, 0.92, 6.02, 0.5, C.navy, C.amber);
  s.addText([
    { text: "Due today: CP1 Idea Briefs.  ", options: { bold: true, color: C.navy } },
    { text: "The idea you converge on becomes CP2 — written this weekend, due Mon, Sep 28.", options: { color: C.navy } }
  ], { x: 1.6, y: 5.78, w: 10.8, h: 0.98, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.03 });
  footer(s);
  s.addNotes("Two-minute bridge. The pile of candidate ideas is raw material; today we choose a working direction. Set the destination — 1–2 defensible ideas plus a one-line rationale each. Make the deliverable split explicit and say why the gap is deliberate: CP1 turns in now, but CP2 is written after they've converged and gotten feedback, so it reflects a real decision rather than a rushed guess made the same hour.");

  // 3 Convergence, done well
  s = mk(); s.background = { color: C.white };
  header(s, "Convergence, done well", "Choose deliberately — don't just grab a favorite");
  card(s, 0.6, 2.0, 4.35, 3.6, "FBECE8");
  await iconCircle(s, FA.FaExclamationTriangle, 0.9, 2.3, 0.62, C.coral);
  s.addText("The trap", { x: 1.66, y: 2.34, w: 3.0, h: 0.5, color: C.coral, fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0 });
  s.addText("Premature convergence — grabbing the first or favorite idea and stopping. Scoring exists to make the choice defensible, not just decisive.", { x: 0.95, y: 3.15, w: 3.7, h: 2.3, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0, lineSpacingMultiple: 1.07 });
  card(s, 5.15, 2.0, 7.55, 3.6, C.cardBg);
  await iconCircle(s, FA.FaCheckCircle, 5.45, 2.3, 0.62, C.teal);
  s.addText("The discipline — five moves", { x: 6.21, y: 2.34, w: 6.2, h: 0.5, color: C.ink, fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "Be deliberate — decide on the criteria, not on vibes.", options: { bullet: { indent: 14 }, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Check your objective — does it serve a real need?", options: { bullet: { indent: 14 }, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Improve promising ideas — don't only kill weak ones.", options: { bullet: { indent: 14 }, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Keep the novelty alive — don't default to the safest.", options: { bullet: { indent: 14 }, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Stay affirmative — narrowing isn't tearing down.", options: { bullet: { indent: 14 } } }
  ], { x: 5.5, y: 3.12, w: 6.9, h: 2.35, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0 });
  card(s, 0.6, 5.85, 12.1, 0.9, C.navy);
  s.addText([
    { text: "Converging means choosing a working direction you can defend and revise", options: { color: C.amber, bold: true } },
    { text: " — not marrying an idea.", options: { color: C.white } }
  ], { x: 0.9, y: 5.85, w: 11.5, h: 0.9, fontFace: F.body, fontSize: 15.5, valign: "middle", align: "center", margin: 0 });
  footer(s);
  s.addNotes("Seven minutes. The failure mode is emotional: people converge on the idea they already love and reverse-justify it. The five moves come from the CPS reading — read them as habits, not rules. Emphasize 'improve, don't only kill': a promising-but-flawed idea often beats a safe-but-thin one once narrowed. Land the bottom line hard — a working direction is defensible and revisable; you are not signing a marriage certificate today.");

  // 4 The portable evaluation method
  s = mk(); s.background = { color: C.white };
  header(s, "The skill under convergence", "Evaluating an idea — a portable toolkit");
  const moves = [
    ["1", "Decide what \"good\" means here", "Pick the criteria that fit your goal — the step most people skip."],
    ["2", "Score candidates against them", "Deliberately, not by attachment — a fatal flaw beats a high total."],
    ["3", "Weigh value against do-ability", "Is the payoff worth the effort? Plot it; don't guess."],
    ["4", "Pressure-test with others", "Structured feedback — challenge the idea, not the person."],
    ["5", "Commit — with a rationale", "Choose a working direction you can defend and revise."]
  ];
  for (let i = 0; i < 5; i++) {
    const y = 1.82 + i * 0.85;
    card(s, 0.6, y, 12.1, 0.72, C.cardBg);
    s.addShape(pres.shapes.OVAL, { x: 0.85, y: y + 0.11, w: 0.5, h: 0.5, fill: { color: C.teal } });
    s.addText(moves[i][0], { x: 0.85, y: y + 0.11, w: 0.5, h: 0.5, color: C.white, fontFace: F.head, fontSize: 20, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(moves[i][1], { x: 1.55, y: y + 0.04, w: 4.35, h: 0.64, color: C.ink, fontFace: F.body, fontSize: 16.5, bold: true, valign: "middle", margin: 0 });
    s.addText(moves[i][2], { x: 6.0, y: y + 0.04, w: 6.5, h: 0.64, color: C.slate, fontFace: F.body, fontSize: 13.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.02 });
  }
  card(s, 0.6, 6.06, 12.1, 0.72, C.amber);
  await iconCircle(s, FA.FaGlobe, 0.92, 6.19, 0.46, C.navy, C.amber);
  s.addText([
    { text: "Portable:  ", options: { bold: true, color: C.navy } },
    { text: "this works on any idea — a feature at work, a startup, a side project. Only step 1 changes — the criteria you choose.", options: { color: C.navy } }
  ], { x: 1.58, y: 6.06, w: 10.9, h: 0.72, fontFace: F.body, fontSize: 15, valign: "middle", margin: 0, lineSpacingMultiple: 1.03 });
  footer(s);
  s.addNotes("The reframe that makes the whole session portable. These five moves are how you evaluate ANY idea — a feature proposal at work, a startup concept, a side project. The move people skip is the first: deciding what 'good' means before you score. Say it plainly — today we aim these moves at this course's criteria, but the method is what transfers and outlasts the class. The next slides hand you the tools for moves 1 and 3; moves 2, 4, and 5 are the workshop.");

  // 5 The selection criteria (rubric-style table)
  s = mk(); s.background = { color: C.white };
  header(s, "The criteria we chose", "The selection criteria");
  s.addText("Score each candidate 1–3 on each. The two most-missed — real need and richness (highlighted) — carry the most weight.", { x: 0.6, y: 1.66, w: 12.1, h: 0.34, color: C.slate, fontFace: F.body, fontSize: 14.5, italic: true, margin: 0 });
  const cHead = ["Criterion", "What a strong idea shows"].map((t) => ({ text: t, options: { fill: { color: C.navy }, color: C.white, bold: true, fontFace: F.body, fontSize: 14.5 } }));
  const crows = [
    ["Real need, reachable users", "A specific userbase with a felt, evidenced need — not a toy.", true],
    ["Richness / breadth", "Exercises multiple engineering dimensions; room for a team to grow.", true],
    ["One-semester MVP", "A coherent vertical slice fits the real build window — about five weeks.", false],
    ["Feasibility", "Risks named and reducible — the Session-5 read.", false],
    ["Extensible / room to grow", "Others can credibly keep building on it as the team grows.", false],
    ["Open-source-worthy", "Appropriate to develop and release in the open.", false],
    ["Tractable stack", "Tech you can own, explain, and support.", false]
  ];
  const cBody = crows.map((r) => {
    const z = r[2] ? "FBEAD2" : C.white;
    return [
      { text: r[0], options: { fill: { color: z }, color: C.ink, bold: true, fontFace: F.body, fontSize: 14.5 } },
      { text: r[1], options: { fill: { color: z }, color: r[2] ? C.ink : C.slate, fontFace: F.body, fontSize: 14 } }
    ];
  });
  s.addTable([cHead, ...cBody], { x: 0.6, y: 2.02, w: 12.1, colW: [3.7, 8.4], rowH: 0.5, valign: "middle", margin: [3, 9, 3, 9], border: { type: "solid", color: "FFFFFF", pt: 2 } });
  card(s, 0.6, 6.1, 12.1, 0.66, C.amber);
  s.addText([
    { text: "Different goal, different list — same method.  ", options: { bold: true, color: C.navy } },
    { text: "These are our criteria because we're founding lasting open-source projects; another context would score on other things.", options: { color: C.navy } }
  ], { x: 0.9, y: 6.1, w: 11.5, h: 0.66, fontFace: F.body, fontSize: 13.5, valign: "middle", align: "center", margin: 0, lineSpacingMultiple: 1.02 });
  footer(s);
  s.addNotes("Now name what \"good\" means for THIS course. Walk the seven, dwelling on the two highlighted — real need and richness — the ones students under-weight, chasing what's fun to build. A fatal flaw on real need or feasibility outweighs a high total, so this is a conversation-starter, not an average. The amber bar is the reframe in one line: these criteria are a deliberate choice tied to our goal; another setting lists different criteria and runs the exact same method. Same sheet in their hands.");

  // 6 The richness test
  s = mk(); s.background = { color: C.white };
  header(s, "One of our criteria, up close", "The richness test — feasible isn't enough");
  card(s, 0.6, 1.9, 12.1, 1.02, C.navy);
  await iconCircle(s, FA.FaLayerGroup, 0.92, 2.11, 0.6, C.amber, C.navy);
  s.addText([
    { text: "The check:  ", options: { color: C.amber, bold: true } },
    { text: "does it exercise multiple engineering dimensions (data, interfaces, logic, integration) — and leave room to grow after your slice ships?", options: { color: "CFE0E9" } }
  ], { x: 1.75, y: 1.9, w: 10.65, h: 1.02, fontFace: F.body, fontSize: 15, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
  const rich = [
    [FA.FaFeather, C.coral, "FBECE8", "Too thin", "A weekend script. Finish it and there's nothing left to found — nothing for a contributor to do."],
    [FA.FaMountain, C.amber, "FBEEDA", "Too big", "Feasible only as a fantasy — no vertical slice you could actually ship this semester."],
    [FA.FaBullseye, C.green, "EAF4EE", "The sweet spot", "A rich core with a buildable slice — finishing it leaves obvious, valuable next work for others."]
  ];
  const rx = [0.6, 4.63, 8.66], rw = 3.84;
  for (let i = 0; i < 3; i++) {
    const x = rx[i];
    card(s, x, 3.12, rw, 2.85, rich[i][2]);
    await iconCircle(s, rich[i][0], x + 0.3, 3.42, 0.62, rich[i][1]);
    s.addText(rich[i][3], { x: x + 1.04, y: 3.46, w: rw - 1.2, h: 0.56, color: C.ink, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
    s.addText(rich[i][4], { x: x + 0.3, y: 4.2, w: rw - 0.6, h: 1.6, color: C.ink, fontFace: F.body, fontSize: 14.5, valign: "top", margin: 0, lineSpacingMultiple: 1.06 });
  }
  card(s, 0.6, 6.16, 12.1, 0.6, C.cardBg);
  s.addText([
    { text: "Monday asked \"can I build it?\"  ", options: { color: C.tealDk, bold: true } },
    { text: "Richness asks \"is it worth building?\" — both can pass on the feasibility worksheet, which is why this is a separate test.", options: { color: C.ink } }
  ], { x: 0.9, y: 6.16, w: 11.5, h: 0.6, fontFace: F.body, fontSize: 13.5, valign: "middle", align: "center", margin: 0 });
  footer(s);
  s.addNotes("Six minutes and the key conceptual move of the day. Feasibility (Monday) and richness (today) are different axes: an idea can be perfectly buildable and still too thin to found a project on. Name both failure modes — the weekend script that's over the moment it's done, and the fantasy with no shippable slice. The target is the middle: a rich core with a vertical slice, deep enough that finishing your slice leaves real work for the people who join.");

  // 7 Value vs Do-ability (with image)
  s = mk(); s.background = { color: C.white };
  header(s, "A general-purpose tool", "Plot each idea, then act by quadrant");
  s.addImage({ path: VDIMG, x: 0.55, y: 1.95, w: 6.1, h: 5.03 });
  const quad = [
    [C.green, "EAF4EE", "Pursue", "High value + high do-ability — your best candidates."],
    ["B9781C", "FBEEDA", "Narrow or spike", "High value + low do-ability — shrink the scope or run a spike to raise do-ability."],
    [C.coral, "FBECE8", "Drop", "Low value — drop it, however easy. Easy-but-pointless is still pointless."]
  ];
  for (let i = 0; i < 3; i++) {
    const y = 1.98 + i * 1.63;
    card(s, 6.95, y, 5.75, 1.48, quad[i][1]);
    s.addText(quad[i][2], { x: 7.2, y: y + 0.16, w: 5.3, h: 0.44, color: quad[i][0], fontFace: F.body, fontSize: 17, bold: true, valign: "middle", margin: 0 });
    s.addText(quad[i][3], { x: 7.2, y: y + 0.62, w: 5.35, h: 0.78, color: C.ink, fontFace: F.body, fontSize: 14, valign: "top", margin: 0, lineSpacingMultiple: 1.05 });
  }
  footer(s);
  s.addNotes("The CPS convergence tool, and the same value/effort 2x2 the product world uses. Have them physically place each idea. The teaching point is the top-left: a high-value idea with low do-ability is not a reject — it's a 'narrow the scope or run a spike' idea, the exact move we'll demo on the two calibration candidates next. Low value is a drop regardless of how easy it is. This is the picture printed on their scoring sheet.");

  // 8 Calibration candidate A — thin but easy (scored live: 3 verdicts, colors, conclusion)
  s = mk(); s.background = { color: C.white };
  header(s, "Calibration · candidate A", "ClassClock");
  card(s, 0.6, 1.9, 12.1, 1.0, C.cardBg);
  await iconCircle(s, FA.FaClock, 0.95, 2.14, 0.56, C.teal);
  s.addText("A browser extension that reads your class schedule and counts down to your next class.", { x: 1.75, y: 1.9, w: 10.7, h: 1.0, color: C.ink, fontFace: F.body, fontSize: 16.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  const aEval = [
    [C.coral, "FBECE8", "Value", "LOW", "Your phone calendar already does this. No unmet need."],
    [C.green, "EAF4EE", "Do-ability", "HIGH", "One data source, one screen — a weekend, ~200 lines."],
    [C.coral, "FBECE8", "Richness", "FAILS", "One component. Finish it and there's nothing left to found."]
  ];
  const ax = [0.6, 4.63, 8.66], aw = 3.84;
  // Scored live: each card starts as a blank heading, fills in on its own click (clicks 1-3),
  // then click 4 lays tinted copies over all three at once so the colors land together.
  const aRating = (x, extra) => ({ x: x + 0.28, y: 3.74, w: aw - 0.56, h: 0.6, fontFace: F.head, fontSize: 26, bold: true, valign: "middle", margin: 0, ...extra });
  const aReason = (x, extra) => ({ x: x + 0.28, y: 4.42, w: aw - 0.56, h: 1.05, color: C.ink, fontFace: F.body, fontSize: 14, valign: "top", margin: 0, lineSpacingMultiple: 1.06, ...extra });
  const aLabel = (x, extra) => ({ x: x + 0.28, y: 3.32, w: aw - 0.56, h: 0.44, color: C.slate, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 1, valign: "middle", margin: 0, ...extra });
  for (let i = 0; i < 3; i++) {
    const x = ax[i];
    card(s, x, 3.1, aw, 2.5, C.cardBg);
    s.addText(aEval[i][2], aLabel(x));
    s.addText(aEval[i][3], aRating(x, { color: C.ink, ...REVEAL(i + 1) }));
    s.addText(aEval[i][4], aReason(x, REVEAL(i + 1)));
  }
  // click 4 — the same three cards again, tinted, with the verdict colors
  for (let i = 0; i < 3; i++) {
    const x = ax[i];
    card(s, x, 3.1, aw, 2.5, aEval[i][1], REVEAL(4));
    s.addText(aEval[i][2], aLabel(x, REVEAL(4)));
    s.addText(aEval[i][3], aRating(x, { color: aEval[i][0], ...REVEAL(4) }));
    s.addText(aEval[i][4], aReason(x, REVEAL(4)));
  }
  card(s, 0.6, 5.85, 12.1, 0.9, C.navy, REVEAL(5));
  await iconCircle(s, FA.FaArrowRight, 0.92, 6.07, 0.48, C.amber, C.navy, REVEAL(5));
  s.addText([
    { text: "Plots bottom-right — high do-ability, low value.  ", options: { color: C.amber, bold: true } },
    { text: "Easy is not a reason. Drop it.", options: { color: C.white } }
  ], { x: 1.58, y: 5.85, w: 10.9, h: 0.9, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0, ...REVEAL(5) });
  footer(s);
  s.addNotes("First calibration candidate, scored live rather than revealed. Read the idea, then ask the room for each verdict before you click it in: value, then do-ability, then richness — three clicks, one card each, and the ratings come up in plain ink so nobody reads the answer off the color. Click four colors all three at once, which is the moment the shape of the thing shows: one green in the middle, red on both sides. Then the last click lands the conclusion. It's tempting because it's easy and finishable, which is exactly the trap — high do-ability seduces. Low value means drop regardless of how quick it is. Set up the contrast: the next candidate is the opposite shape.");

  // 9 Calibration candidate B — rich but scary
  s = mk(); s.background = { color: C.white };
  header(s, "Calibration · candidate B", "CrowdDefense");
  card(s, 0.6, 1.82, 12.1, 0.92, C.cardBg);
  await iconCircle(s, FA.FaGavel, 0.95, 2.02, 0.54, C.teal);
  s.addText("A platform that invites the world to help defend someone facing a serious legal problem — pooling volunteer expertise, research, funding, and documents around their case.", { x: 1.72, y: 1.82, w: 10.75, h: 0.92, color: C.ink, fontFace: F.body, fontSize: 15, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  card(s, 0.6, 2.92, 12.1, 2.05, C.cardBg);
  s.addText("What it would take to build:", { x: 0.9, y: 3.04, w: 11.5, h: 0.4, color: C.ink, fontFace: F.body, fontSize: 15.5, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "Structured case intake & representation", options: { bullet: { indent: 14 }, breakLine: true, paraSpaceAfter: 6 } },
    { text: "AI-assisted legal research & guidance", options: { bullet: { indent: 14 }, breakLine: true, paraSpaceAfter: 6 } },
    { text: "Crowd-sourced pro-bono research", options: { bullet: { indent: 14 } } }
  ], { x: 1.0, y: 3.5, w: 5.6, h: 1.4, color: C.ink, fontFace: F.body, fontSize: 14.5, valign: "top", margin: 0 });
  s.addText([
    { text: "Crowd funding & payments", options: { bullet: { indent: 14 }, breakLine: true, paraSpaceAfter: 6 } },
    { text: "Case document management", options: { bullet: { indent: 14 }, breakLine: true, paraSpaceAfter: 6 } },
    { text: "Court-system integration (filings, data)", options: { bullet: { indent: 14 } } }
  ], { x: 6.9, y: 3.5, w: 5.7, h: 1.4, color: C.ink, fontFace: F.body, fontSize: 14.5, valign: "top", margin: 0 });
  s.addText("— on top of a data platform, services, UX, and legal / accessibility compliance. Every one is a project on its own.", { x: 1.0, y: 4.55, w: 11.4, h: 0.4, color: C.slate, fontFace: F.body, fontSize: 13, italic: true, valign: "middle", margin: 0 });
  const bx = [0.6, 4.63, 8.66], bw = 3.84;
  const bEval = [["Value", "HIGH", C.green], ["Do-ability", "LOW", C.coral], ["Richness", "VERY HIGH", C.teal]];
  for (let i = 0; i < 3; i++) {
    const x = bx[i];
    card(s, x, 5.12, bw, 0.82, C.cardBg);
    s.addText(bEval[i][0] + ":", { x: x + 0.24, y: 5.12, w: 1.7, h: 0.82, color: C.slate, fontFace: F.body, fontSize: 14.5, bold: true, valign: "middle", margin: 0 });
    // one click per rating — ask the room, then click
    s.addText(bEval[i][1], { x: x + 1.7, y: 5.12, w: bw - 1.9, h: 0.82, color: bEval[i][2], fontFace: F.head, fontSize: 20, bold: true, align: "right", valign: "middle", margin: 0, ...REVEAL(i + 1) });
  }
  card(s, 0.6, 6.06, 12.1, 0.72, C.navy, REVEAL(4));
  await iconCircle(s, FA.FaArrowRight, 0.9, 6.19, 0.46, C.amber, C.navy, REVEAL(4));
  s.addText([
    { text: "Plots top-left — high value, low do-ability.  ", options: { color: C.amber, bold: true } },
    { text: "Don't drop it. Narrow it.", options: { color: C.white } }
  ], { x: 1.55, y: 6.06, w: 10.9, h: 0.72, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0, ...REVEAL(4) });
  footer(s);
  s.addNotes("Second candidate — the opposite shape, and the one that teaches the lesson. Same live scoring as the last slide: read the six build components first, then take each verdict from the room before clicking it in — value, do-ability, richness — and click the conclusion last. Don't describe it by scope or team size; describe it by the work. Read the six build components: each is a serious subsystem, which is exactly why richness is very high and do-ability, as-is, is low — no single team ships all of that soon. High value plus low do-ability lands top-left: the 2x2 says narrow or spike, not drop. Next slide does the narrowing.");

  // 10 The move — narrow to a slice
  s = mk(); s.background = { color: C.white };
  header(s, "Calibration · the move", "Narrow the rich idea to a slice you can ship");
  card(s, 0.6, 1.98, 5.95, 3.75, "EAF4EE");
  await iconCircle(s, FA.FaCut, 0.9, 2.28, 0.62, C.green);
  s.addText("The v1 slice — one semester", { x: 1.66, y: 2.32, w: 4.7, h: 0.55, color: C.ink, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
  s.addText("A structured intake + document-assembly tool for one low-stakes case type (small-claims self-filing), with a queue where a volunteer reviews a submission.", { x: 0.98, y: 3.15, w: 5.35, h: 2.4, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0, lineSpacingMultiple: 1.08 });
  card(s, 6.75, 1.98, 5.95, 3.75, C.navy);
  await iconCircle(s, FA.FaUsers, 7.05, 2.28, 0.62, C.amber, C.navy);
  s.addText("Deferred → contributor work", { x: 7.81, y: 2.32, w: 4.7, h: 0.55, color: C.white, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
  s.addText("AI guidance · crowd funding · more case types · court integration — the obvious, valuable next work you leave for the people who join.", { x: 7.13, y: 3.15, w: 5.35, h: 2.4, color: "CFE0E9", fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0, lineSpacingMultiple: 1.08 });
  card(s, 0.6, 5.9, 12.1, 0.86, C.amber);
  s.addText([
    { text: "That's the sweet spot:  ", options: { bold: true, color: C.navy } },
    { text: "a rich core with a vertical slice you can actually ship — and finishing it leaves real work for others.", options: { color: C.navy } }
  ], { x: 0.9, y: 5.9, w: 11.5, h: 0.86, fontFace: F.body, fontSize: 15.5, valign: "middle", align: "center", margin: 0 });
  footer(s);
  s.addNotes("The payoff slide. The better founding bet was the scary one — but only after narrowing. Show the cut: v1 is one low-stakes case type with intake, document assembly, and a human review queue. Everything else — AI, funding, integrations — is deferred, and that's a feature, not a bug: it's the on-ramp for contributors. This is the shape you want them hunting for in their own ideas in the next 12 minutes.");

  // 11 Part 1 framing
  s = mk(); s.background = { color: C.white };
  header(s, "Workshop · part 1", "Now: score your own candidates");
  card(s, 0.6, 2.05, 12.1, 1.5, C.navy);
  await iconCircle(s, FA.FaClipboardCheck, 0.95, 2.4, 0.74, C.amber, C.navy);
  s.addText("You just watched the yardstick run on two candidates. Turn it on your own 2–3 ideas — score them, then plot them.", { x: 1.98, y: 2.05, w: 10.5, h: 1.5, color: "CFE0E9", fontFace: F.body, fontSize: 16.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.06 });
  card(s, 0.6, 3.75, 5.95, 2.55, C.cardBg);
  await iconCircle(s, FA.FaListOl, 0.9, 4.05, 0.6, C.teal);
  s.addText("Score, don't average", { x: 1.65, y: 4.1, w: 4.6, h: 0.5, color: C.ink, fontFace: F.body, fontSize: 17, bold: true, valign: "middle", margin: 0 });
  s.addText("The total is a conversation-starter. A fatal flaw on real need or feasibility outweighs a high score elsewhere.", { x: 0.98, y: 4.85, w: 5.35, h: 1.35, color: C.ink, fontFace: F.body, fontSize: 14.5, valign: "top", margin: 0, lineSpacingMultiple: 1.06 });
  card(s, 6.75, 3.75, 5.95, 2.55, C.cardBg);
  await iconCircle(s, FA.FaFlag, 7.05, 4.05, 0.6, C.teal);
  s.addText("Circle a provisional top 1–2", { x: 7.8, y: 4.1, w: 4.8, h: 0.5, color: C.ink, fontFace: F.body, fontSize: 17, bold: true, valign: "middle", margin: 0 });
  s.addText("Commit to a hunch before feedback — so you can tell whether the peer round actually changes your mind.", { x: 7.13, y: 4.85, w: 5.35, h: 1.35, color: C.ink, fontFace: F.body, fontSize: 14.5, valign: "top", margin: 0, lineSpacingMultiple: 1.06 });
  footer(s);
  s.addNotes("Short framing before hands-on. Two reminders that change how they score: first, don't just sum the columns — a fatal flaw on real need or feasibility kills an idea a high total can't rescue. Second, have them circle a provisional favorite before the feedback round, so they can actually observe whether peer input moves them. Then flip to the task slide and start the clock.");

  // 12 Part 1 work slide
  const p1 = [
    ["Score each of your 2–3 candidates on the seven criteria (1–3).", null, "3 min"],
    ["Plot each one on Value vs. Do-ability.", null, "3 min"],
    ["For each, note the single biggest risk — and if it's high-value / low-do-ability, how you'd shrink it to a slice.", null, "4 min"],
    ["Circle your provisional top 1–2 — before any feedback.", null, "2 min"]
  ];
  p1.__note = "Leave this up while they work — 12 minutes, solo, on the Idea Scoring Sheet. Circulate: the most common miss is scoring for do-ability and forgetting real need and richness. Nudge anyone whose top pick is the easiest idea to re-check value. Keep the clock visible; call the last two minutes so everyone has a circled top 1–2 before the peer round.";
  await workSlide("Workshop · part 1 · ~12 min", "Score your candidates", "Solo, on the Idea Scoring Sheet:", p1);

  // 13 Part 2 framing — the process
  s = mk(); s.background = { color: C.white };
  header(s, "Workshop · part 2", "Peer feedback — how the round works");
  card(s, 0.6, 1.9, 12.1, 1.0, C.navy);
  await iconCircle(s, FA.FaComments, 0.95, 2.14, 0.56, C.amber, C.navy);
  s.addText("Groups of 3–4. A round-robin: everyone presents once, ~4 minutes each. Same three challenges for every idea.", { x: 1.75, y: 1.9, w: 10.65, h: 1.0, color: "CFE0E9", fontFace: F.body, fontSize: 16, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
  const axes = [
    [FA.FaUserCheck, "Need real, user reachable?", "Is there a felt need, and can you actually reach the people who have it?"],
    [FA.FaCalendarAlt, "Feasible at one-semester scope?", "Is there a vertical slice you could ship in ~5 build weeks?"],
    [FA.FaLayerGroup, "Rich enough to found on?", "Does it exercise multiple dimensions and leave room for others?"]
  ];
  const px = [0.6, 4.63, 8.66], pw = 3.84;
  for (let i = 0; i < 3; i++) {
    const x = px[i];
    card(s, x, 3.1, pw, 2.15, C.cardBg);
    await iconCircle(s, axes[i][0], x + 0.28, 3.38, 0.56, C.teal);
    s.addText(axes[i][1], { x: x + 0.28, y: 4.02, w: pw - 0.56, h: 0.66, color: C.ink, fontFace: F.body, fontSize: 15.5, bold: true, valign: "top", margin: 0, lineSpacingMultiple: 1.0 });
    s.addText(axes[i][2], { x: x + 0.28, y: 4.62, w: pw - 0.56, h: 0.55, color: C.slate, fontFace: F.body, fontSize: 12.5, valign: "top", margin: 0, lineSpacingMultiple: 1.04 });
  }
  card(s, 0.6, 5.5, 12.1, 1.26, "FBEEDA");
  s.addText([
    { text: "One protocol for every comment:  ", options: { bold: true, color: C.tealDk } },
    { text: "affirm what's strong  →  name the sharpest concern  →  one concrete suggestion.\n", options: { color: C.ink } },
    { text: "The presenter captures, doesn't defend", options: { bold: true, color: C.coral } },
    { text: " — write it down; weigh it after.", options: { color: C.ink } }
  ], { x: 0.9, y: 5.5, w: 11.5, h: 1.26, fontFace: F.body, fontSize: 15, valign: "middle", align: "center", margin: 0, lineSpacingMultiple: 1.12 });
  footer(s);
  s.addNotes("Teach the process before starting the clock — it's printed in Part 3 of their scoring sheet. Three fixed challenges keep feedback substantive instead of vague praise. The protocol — affirm, concern, suggestion — keeps it constructive. The hardest rule to hold is 'capture, don't defend': presenters instinctively argue. Name it explicitly; their job is to collect, not to win. Put solo-track students in a group too so no one skips the round.");

  // 14 Part 2 work slide
  const p2 = [
    ["Present (~90 sec): your top 1–2 — the user, the real need, why it scores well; the slice if it's high-value / low-do-ability.", null, null],
    ["Peers pressure-test on the three axes: need real & reachable? feasible at scope? rich enough?", null, null],
    ["Each comment: affirm what's strong → sharpest concern → one concrete suggestion.", null, null],
    ["Presenter captures, doesn't defend. Then rotate — until everyone has gone.", null, null]
  ];
  p2.__note = "Leave this up for the full 16 minutes. Enforce the round-robin so quieter students present too. Circulate and add the instructor read where it helps most — especially real need and richness. Watch the clock: ~4 minutes per person; give groups a nudge to rotate so the last presenter isn't rushed. Keep presenters capturing rather than debating.";
  await workSlide("Workshop · part 2 · ~16 min", "Peer feedback round", "Groups of 3–4 · round-robin · ~4 min each:", p2);

  // 15 Part 3 framing — converge
  s = mk(); s.background = { color: C.white };
  header(s, "Workshop · part 3", "Converge — pick 1–2 and commit");
  card(s, 0.6, 2.05, 12.1, 1.4, C.navy);
  await iconCircle(s, FA.FaHandshake, 0.95, 2.35, 0.7, C.amber, C.navy);
  s.addText("Weigh the scores and the feedback together, then commit to one or two ideas to carry forward.", { x: 1.96, y: 2.05, w: 10.5, h: 1.4, color: "CFE0E9", fontFace: F.body, fontSize: 16.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
  card(s, 0.6, 3.65, 12.1, 1.5, C.cardBg);
  await iconCircle(s, FA.FaPenFancy, 0.95, 3.98, 0.6, C.teal);
  s.addText([
    { text: "Write a one-line rationale for each:  ", options: { bold: true, color: C.ink } },
    { text: "it's for ", options: { color: C.ink } },
    { text: "(who)", options: { italic: true, color: C.slate } },
    { text: ", who need ", options: { color: C.ink } },
    { text: "(the real need)", options: { italic: true, color: C.slate } },
    { text: "; feasible because ", options: { color: C.ink } },
    { text: "(scope / risk)", options: { italic: true, color: C.slate } },
    { text: "; rich because ", options: { color: C.ink } },
    { text: "(dimensions it touches)", options: { italic: true, color: C.slate } },
    { text: ".", options: { color: C.ink } }
  ], { x: 1.78, y: 3.65, w: 10.7, h: 1.5, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0, lineSpacingMultiple: 1.1 });
  card(s, 0.6, 5.35, 12.1, 1.05, "FBEEDA");
  s.addText([
    { text: "A working direction, not an irreversible vow.  ", options: { bold: true, color: C.tealDk } },
    { text: "But from here, your discovery and proposal work focus here.", options: { color: C.ink } }
  ], { x: 0.9, y: 5.35, w: 11.5, h: 1.05, fontFace: F.body, fontSize: 15.5, valign: "middle", align: "center", margin: 0 });
  footer(s);
  s.addNotes("Bring the room back together for the decision. The rationale sentence is the deliverable — it forces them to name the user, the need, the feasibility read, and the richness in one breath. If they can't fill the blanks, they haven't converged yet. Reassure the anxious: this is a working direction they'll keep refining, not a vow — but from here their effort concentrates, which is the whole point of converging.");

  // 16 Part 3 work slide
  const p3 = [
    ["Weigh the scores and the peer feedback together.", null, "2 min"],
    ["Commit to one or two ideas to carry forward.", null, "2 min"],
    ["Write the one-line rationale for each: who · the real need · why feasible · why rich.", null, "4 min"]
  ];
  p3.__note = "Leave this up for the final 8 minutes. The rationale is the checkpoint — if the blanks won't fill, they haven't really converged; nudge them to pick anyway and note what they'd verify. Collect one or two rationales aloud, especially one where peer feedback changed the pick. Remind them this exact idea becomes CP2 over the weekend.";
  await workSlide("Workshop · part 3 · ~8 min", "Commit + write your rationale", "Weigh it, choose, and write it down:", p3);

  // 17 Wire it to CP2
  s = mk(); s.background = { color: C.white };
  header(s, "This weekend", "Your idea becomes the Product Definition Brief");
  s.addText("The idea you just chose is what CP2 documents — a lightweight PRD (see the PRD Reference on Canvas). Five sections:", { x: 0.6, y: 1.72, w: 12.1, h: 0.4, color: C.slate, fontFace: F.body, fontSize: 14.5, italic: true, margin: 0 });
  const pdb = [
    [FA.FaUser, "Target user", "Sharply defined and bounded — who's in, who's out."],
    [FA.FaClipboardList, "The needs", "What they're trying to do; tagged [E] evidence / [A] assumption."],
    [FA.FaSortAmountDown, "Prioritized needs", "Must-have vs. nice-to-have, with a one-line rationale."],
    [FA.FaCheckCircle, "Success criteria", "Specific, observable definitions of \"this works.\""],
    [FA.FaQuestionCircle, "Open questions", "The biggest assumptions you'd still verify."]
  ];
  const dx = [0.6, 4.63, 8.66], dw = 3.84;
  for (let i = 0; i < 3; i++) {
    const x = dx[i];
    card(s, x, 2.2, dw, 1.95, C.cardBg);
    await iconCircle(s, pdb[i][0], x + 0.26, 2.46, 0.56, C.teal);
    s.addText(pdb[i][1], { x: x + 0.94, y: 2.46, w: dw - 1.1, h: 0.56, color: C.ink, fontFace: F.body, fontSize: 16.5, bold: true, valign: "middle", margin: 0 });
    s.addText(pdb[i][2], { x: x + 0.26, y: 3.14, w: dw - 0.5, h: 0.9, color: C.slate, fontFace: F.body, fontSize: 13, valign: "top", margin: 0, lineSpacingMultiple: 1.04 });
  }
  for (let i = 3; i < 5; i++) {
    const x = dx[i - 3];
    card(s, x, 4.28, dw, 1.95, C.cardBg);
    await iconCircle(s, pdb[i][0], x + 0.26, 4.54, 0.56, C.teal);
    s.addText(pdb[i][1], { x: x + 0.94, y: 4.54, w: dw - 1.1, h: 0.56, color: C.ink, fontFace: F.body, fontSize: 16.5, bold: true, valign: "middle", margin: 0 });
    s.addText(pdb[i][2], { x: x + 0.26, y: 5.22, w: dw - 0.5, h: 0.9, color: C.slate, fontFace: F.body, fontSize: 13, valign: "top", margin: 0, lineSpacingMultiple: 1.04 });
  }
  card(s, 8.66, 4.28, 3.84, 1.95, C.navy);
  await iconCircle(s, FA.FaCalendarCheck, 8.92, 4.54, 0.56, C.amber, C.navy);
  s.addText("Due Mon, Sep 28", { x: 9.6, y: 4.54, w: 2.7, h: 0.56, color: C.white, fontFace: F.body, fontSize: 16, bold: true, valign: "middle", margin: 0 });
  s.addText("Written from today's pick + feedback. ~2 pages. Ground it in your Discovery Notes.", { x: 8.92, y: 5.22, w: 3.32, h: 0.9, color: "CFE0E9", fontFace: F.body, fontSize: 12.5, valign: "top", margin: 0, lineSpacingMultiple: 1.04 });
  footer(s);
  s.addNotes("Walk the shape so no one leaves unsure what to write. Emphasize it's a definition of problem and user, not a solution — no architecture yet. The evidence tags [E]/[A] matter: honesty about what came from a real conversation vs. an assumption is graded as heavily as the findings. Point them to the PRD reference handout. The weekend gap is the point — the brief should reflect today's converged pick and the feedback, not a same-hour guess.");

  // 18 CP2 rubric
  s = mk(); s.background = { color: C.white };
  header(s, "How CP2 is graded", "Product Definition Brief — the rubric");
  const gHead = ["Criterion", "Wt", "What it measures"].map((t, i) => ({ text: t, options: { fill: { color: C.navy }, color: C.white, bold: true, fontFace: F.body, fontSize: 14.5, align: i === 1 ? "center" : "left" } }));
  const grows = [
    ["Target user clarity", "20", "Userbase sharply defined and bounded — not \"everyone.\"", false],
    ["Needfinding quality & honesty", "30", "Interviews and/or a documented persona; honesty about method graded as heavily as the findings.", true],
    ["Prioritized needs", "20", "Must-have vs. nice-to-have, with a defensible rationale.", false],
    ["Success criteria", "20", "Specific, observable, defensible definitions of \"this works.\"", false],
    ["PRD mapping", "10", "Reads like a lightweight PRD — problem and user, not a solution.", false]
  ];
  const gBody = grows.map((r) => {
    const z = r[3] ? "FBEAD2" : C.white;
    return [
      { text: r[0], options: { fill: { color: z }, color: C.ink, bold: true, fontFace: F.body, fontSize: 14 } },
      { text: r[1], options: { fill: { color: z }, color: C.tealDk, bold: true, fontFace: F.body, fontSize: 14, align: "center" } },
      { text: r[2], options: { fill: { color: z }, color: C.ink, fontFace: F.body, fontSize: 13.5 } }
    ];
  });
  s.addTable([gHead, ...gBody], { x: 0.6, y: 1.98, w: 12.1, colW: [3.3, 0.9, 7.9], rowH: 0.62, valign: "middle", margin: [4, 9, 4, 9], border: { type: "solid", color: "FFFFFF", pt: 2 } });
  card(s, 0.6, 6.06, 12.1, 0.72, C.navy);
  await iconCircle(s, FA.FaBalanceScale, 0.92, 6.19, 0.46, C.amber, C.navy);
  s.addText([
    { text: "Needfinding carries the most weight (30)  ", options: { color: C.amber, bold: true } },
    { text: "— reach at least Developing on every criterion to stay on a passing track.", options: { color: C.white } }
  ], { x: 1.55, y: 6.06, w: 10.9, h: 0.72, fontFace: F.body, fontSize: 14.5, valign: "middle", margin: 0 });
  footer(s);
  s.addNotes("Show the rubric so students write toward it, not blind. The highlighted row is where the grade concentrates — needfinding quality and honesty at 30 points. Say plainly that a brief built honestly on thin evidence beats one that dresses guesses as facts: honesty about method is graded as heavily as the findings. PRD mapping means it reads as a problem/user definition, not a design. Every criterion must clear Developing to stay on a passing track.");

  // 19 Wrap
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: -1.3, y: 5.2, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaFilter, 0.9, 1.25, 0.9, C.amber, C.navy);
  s.addText("You converged deliberately — against a shared yardstick, with feedback.\nNow you can defend your pick.", { x: 0.9, y: 2.3, w: 11.9, h: 1.5, color: C.white, fontFace: F.head, fontSize: 26, bold: true, italic: true, margin: 0, lineSpacingMultiple: 1.06 });
  s.addText("BEFORE MONDAY, SEP 28", { x: 0.92, y: 4.15, w: 11, h: 0.35, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText([
    { text: "Turn in CP1 Idea Briefs today", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Write CP2 Product Definition Brief from your converged pick + feedback — due Mon, Sep 28", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Keep doing discovery on your chosen idea — more real input now makes the proposal stronger", options: { bullet: { indent: 16 } } }
  ], { x: 0.95, y: 4.6, w: 11.7, h: 1.9, color: "CBD8E6", fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0 });
  s.addNotes("Close on the one-liner — the whole session in a sentence: you narrowed on purpose, so you can defend the choice. Make the actions concrete: CP1 in today, CP2 written this weekend from the converged pick, discovery continues. Preview Week 4 briefly — proposal anatomy and arguing feasibility without overpromising; CP3 Written Proposal is due Mon, Oct 5. Send them off to write.");

  const OUT = "Session06-Convergence.pptx";
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
