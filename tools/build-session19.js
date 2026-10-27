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
pres.title = "CS 301R — Session 19 — MVP Thinking & Systematic Debugging";

let PAGE = 0;
function mk() { PAGE++; return pres.addSlide(); }
function footer(slide, col) {
  const c = col || C.slate;
  slide.addText("CS 301R · Session 19 · MVP Thinking & Debugging", { x: 6.8, y: 7.04, w: 5.9, h: 0.3, align: "right", color: c, fontFace: F.body, fontSize: 10, margin: 0 });
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
const R = n => (n ? REVEAL(n) : {});

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
  const extra = R(n);
  const dark = fill === C.navy;
  card(s, 0.6, y, 12.1, h, fill, extra);
  const runs = [];
  if (lead) runs.push({ text: lead + "  ", options: { color: dark ? C.amber : (fill === C.amber ? C.navy : C.tealDk), bold: true } });
  runs.push({ text, options: { color: dark ? C.white : (fill === C.amber ? C.navy : C.ink), bold: fill === C.amber } });
  s.addText(runs, { x: 0.95, y, w: 11.4, h, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, lineSpacingMultiple: 1.04, ...extra });
}
// A numbered circle, for steps.
function num(s, x, y, d, label, fill, textColor, extra) {
  s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, ...extra });
  s.addText(label, { x, y, w: d, h: d, color: textColor || C.white, fontFace: F.head, fontSize: 17, bold: true, align: "center", valign: "middle", margin: 0, ...extra });
}

// One example-MVP slide: what it was (left), then the four prompts answered (right, one click each).
async function example(kicker, title, icon, iconColor, what, rows, lesson, notes) {
  const s = mk(); s.background = { color: C.white };
  header(s, kicker, title);
  card(s, 0.6, 1.95, 5.2, 3.75, C.cardBg);
  await iconCircle(s, icon, 0.85, 2.15, 0.62, iconColor);
  s.addText(what, { x: 0.85, y: 2.95, w: 4.7, h: 2.65, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0, lineSpacingMultiple: 1.04 });
  for (let i = 0; i < rows.length; i++) {
    const y = 1.95 + i * 0.96;
    card(s, 6.0, y, 6.7, 0.84, rows[i][2] || C.white, REVEAL(i + 1));
    s.addText([
      { text: rows[i][0] + "  ", options: { bold: true, color: C.tealDk } },
      { text: rows[i][1], options: { color: C.ink } }
    ], { x: 6.25, y, w: 6.3, h: 0.84, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.0, ...REVEAL(i + 1) });
  }
  bar(s, 5.95, 0.85, C.navy, "The lesson:", lesson, rows.length + 1);
  footer(s);
  s.addNotes(notes);
}

async function build() {
  let s;

  // 1 Title
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: 10.9, y: -1.4, w: 4.2, h: 4.2, fill: { color: "1C3252" } });
  s.addShape(pres.shapes.OVAL, { x: 12.0, y: 5.1, w: 3.0, h: 3.0, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaBullseye, 0.9, 1.45, 1.0, C.amber, C.navy);
  s.addText("CS 301R · SOFTWARE ENGINEERING STUDIO I", { x: 0.92, y: 2.75, w: 11, h: 0.35, color: "9FB4C7", fontFace: F.body, fontSize: 15, bold: true, charSpacing: 2, margin: 0 });
  s.addText("What Must V1 Prove?", { x: 0.9, y: 3.15, w: 12.1, h: 1.3, color: C.white, fontFace: F.head, fontSize: 42, bold: true, margin: 0 });
  s.addText([
    { text: "Session 19 — MVP thinking and systematic debugging", options: { color: C.amber, bold: true, breakLine: true } },
    { text: "Monday, November 9, 2026", options: { color: "9FB4C7" } }
  ], { x: 0.92, y: 4.7, w: 11, h: 0.9, fontFace: F.body, fontSize: 19, margin: 0, lineSpacingMultiple: 1.2 });
  s.addNotes("Two tools for the heaviest build fortnight: sharper judgment about what v1 is for, and a method for when the build fights back. Before class: run demos/session19-debugging/setup.sh, start the dev server, open the list and the admin (the run sheet's part A). Print the V1 Proof Sheet, one per student, and the Debugging Loop Card, one half per student. The MVP Plan is due Wednesday; today is its draft.");

  // 2 Today
  s = mk(); s.background = { color: C.white };
  header(s, "Today", "An MVP is an instrument, and so is a debugger");
  const plan = [
    [FA.FaBullseye, "The MVP is an instrument", "5 min"],
    [FA.FaTrashAlt, "Throwaway or evolutionary?", "8 min"],
    [FA.FaClipboardList, "Workshop: what must your v1 prove?", "20 min"],
    [FA.FaMicroscope, "Three MVPs, evaluated as a room", "12 min"],
    [FA.FaBug, "Debugging on purpose, with a live bug", "20 min"],
    [FA.FaFileAlt, "Known issues, and the wrap", "10 min"]
  ];
  for (let i = 0; i < plan.length; i++) {
    const y = 1.95 + i * 0.8;
    const hi = i === 2;
    card(s, 0.6, y, 12.1, 0.68, hi ? C.navy : C.cardBg);
    await iconCircle(s, plan[i][0], 0.88, y + 0.1, 0.48, hi ? C.amber : C.teal, hi ? C.navy : "FFFFFF");
    s.addText(plan[i][1], { x: 1.6, y, w: 9.0, h: 0.68, color: hi ? C.white : C.ink, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
    s.addText(plan[i][2], { x: 10.6, y, w: 1.8, h: 0.68, color: hi ? C.amber : C.slate, fontFace: F.body, fontSize: 16, bold: true, align: "right", valign: "middle", margin: 0 });
  }
  footer(s);
  s.addNotes("Thirty seconds. Two halves. The first is judgment: what your first version is for, which decides a hundred small build decisions over the next week. The highlighted row is your time, on the V1 Proof Sheet; hand it out now. The second half is method: the reading's debugging loop, run live on a real bug in Prop Loft, including a wrong guess. The last ten minutes preview known issues, which CP10 grades.");

  // 3 The MVP is an instrument
  s = mk(); s.background = { color: C.white };
  header(s, "The MVP is an instrument", "Not a small product: a way to test a claim");
  const stages = [
    ["Earliest testable", "Can a real person use it at all? You learn whether the core idea works."],
    ["Earliest usable", "Would they choose it over what they do now? You learn whether it's worth using."],
    ["Earliest lovable", "Would they tell someone? You learn whether it can grow."]
  ];
  for (let i = 0; i < 3; i++) {
    const x = 0.6 + i * 4.15;
    card(s, x, 1.95, 3.8, 2.7, C.cardBg, REVEAL(i + 1));
    num(s, x + 0.25, 2.15, 0.55, String(i + 1), C.teal, C.white, REVEAL(i + 1));
    s.addText(stages[i][0], { x: x + 0.95, y: 2.15, w: 2.7, h: 0.55, color: C.ink, fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0, ...REVEAL(i + 1) });
    s.addText(stages[i][1], { x: x + 0.25, y: 2.9, w: 3.3, h: 1.65, color: C.ink, fontFace: F.body, fontSize: 16, valign: "top", margin: 0, lineSpacingMultiple: 1.04, ...REVEAL(i + 1) });
  }
  s.addText("Henrik Kniberg, Making sense of MVP: every stage is something usable, and each one exists to teach you something.", { x: 0.6, y: 4.8, w: 12.1, h: 0.5, color: C.slate, fontFace: F.body, fontSize: 15, italic: true, valign: "middle", margin: 0 });
  bar(s, 5.6, 1.15, C.navy, "The wrong question:", "\"How much can we build by the demo?\"   The right one: \"What will the demo prove?\"", 4);
  footer(s);
  s.addNotes("Five minutes. Kniberg's real point, the one the skateboard cartoon hides: each stage exists to test something with a thing people can actually use. One click per stage, and ask what each one teaches. Most of you are aiming at earliest testable or earliest usable for Nov 18, and that's right. Last click: the question that decides the next week. The slice statement says what you'll demo; today sharpens why it matters.");

  // 4 Throwaway vs evolutionary
  s = mk(); s.background = { color: C.white };
  header(s, "Two kinds of prototype", "Built to answer a question, or built to keep?");
  card(s, 0.6, 1.95, 5.95, 3.45, C.amberBg);
  await iconCircle(s, FA.FaTrashAlt, 0.9, 2.15, 0.62, C.amber, C.navy);
  s.addText("Throwaway", { x: 1.7, y: 2.15, w: 4.6, h: 0.62, color: C.ink, fontFace: F.body, fontSize: 21, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "Built to answer a question, then thrown away. Your spike was this.", options: { breakLine: true } },
    { text: " ", options: { fontSize: 8, breakLine: true } },
    { text: "Allowed to be ugly. ", options: { bold: true } },
    { text: "Not allowed to sneak into main." }
  ], { x: 0.9, y: 2.95, w: 5.35, h: 2.3, color: C.ink, fontFace: F.body, fontSize: 17, valign: "top", margin: 0, lineSpacingMultiple: 1.05 });
  card(s, 6.75, 1.95, 5.95, 3.45, C.strongBg, REVEAL(1));
  await iconCircle(s, FA.FaHome, 7.05, 2.15, 0.62, C.green, "FFFFFF", REVEAL(1));
  s.addText("Evolutionary", { x: 7.85, y: 2.15, w: 4.6, h: 0.62, color: C.ink, fontFace: F.body, fontSize: 21, bold: true, valign: "middle", margin: 0, ...REVEAL(1) });
  s.addText([
    { text: "Built to keep. Your MVP is this.", options: { breakLine: true } },
    { text: " ", options: { fontSize: 8, breakLine: true } },
    { text: "It goes through pull requests, meets your definition of done, and is what a stranger audits on Nov 18." }
  ], { x: 7.05, y: 2.95, w: 5.35, h: 2.3, color: C.ink, fontFace: F.body, fontSize: 17, valign: "top", margin: 0, lineSpacingMultiple: 1.05, ...REVEAL(1) });
  bar(s, 5.65, 1.1, C.navy, "Which is yours?", "Almost always evolutionary, with a throwaway corner or two inside it.", 2);
  footer(s);
  s.addNotes("Three minutes. Left: the spike from Week 3 is the model throwaway. It bought an answer, and the code was the receipt. Click: the MVP is built to keep, so it plays by the project's rules: PRs, review, the definition of done. Second click, and the honest middle on the next slide: most real MVPs are evolutionary with a corner or two you know you'll replace. That's fine, if it's labeled.");

  // 5 The honest middle
  s = mk(); s.background = { color: C.white };
  header(s, "The honest middle", "A throwaway corner is fine, if it's labeled");
  const corners = [
    ["A mocked integration", "The payment call returns \"approved\" every time."],
    ["A hardcoded config", "One theater, one time zone, baked in."],
    ["A stand-in path", "Checkouts entered in the admin until the form exists."]
  ];
  for (let i = 0; i < 3; i++) {
    const x = 0.6 + i * 4.15;
    card(s, x, 1.95, 3.8, 1.85, C.cardBg);
    s.addText(corners[i][0], { x: x + 0.25, y: 2.05, w: 3.3, h: 0.5, color: C.tealDk, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
    s.addText(corners[i][1], { x: x + 0.25, y: 2.6, w: 3.3, h: 1.1, color: C.ink, fontFace: F.body, fontSize: 16, valign: "top", margin: 0 });
  }
  card(s, 0.6, 4.05, 5.95, 1.55, C.weakBg, REVEAL(1));
  s.addText([
    { text: "Unlabeled, it's a trap.  ", options: { bold: true, color: C.coral } },
    { text: "A contributor builds on it, believing it's real.", options: { color: C.ink } }
  ], { x: 0.9, y: 4.05, w: 5.4, h: 1.55, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, ...REVEAL(1) });
  card(s, 6.75, 4.05, 5.95, 1.55, C.strongBg, REVEAL(2));
  s.addText([
    { text: "Labeled, it's a plan.  ", options: { bold: true, color: C.green } },
    { text: "A comment in the code, and a line in your known-issues list.", options: { color: C.ink } }
  ], { x: 7.05, y: 4.05, w: 5.4, h: 1.55, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, ...REVEAL(2) });
  bar(s, 5.85, 0.9, C.amber, null, "Prop Loft's: the admin carries the checkout until the form exists. It's labeled.", 3);
  footer(s);
  s.addNotes("Two minutes. Three common corners. The third is Prop Loft's own, from Session 18's order: the slice walks through the admin before the form exists. Click: an unlabeled corner is a trap for the next person, who builds on top of it. Second click: the label costs one sentence in the code and one in docs/known-issues.md, which we'll start at the end of class. Third: say Prop Loft's out loud as the model.");

  // 6 The four questions
  s = mk(); s.background = { color: C.white };
  header(s, "What must v1 prove?", "Three claims and a falsifier");
  const qs = [
    [FA.FaUsers, "The need claim", "What shows a real user's need is actually served? Trace it to your product definition's success criteria."],
    [FA.FaCogs, "The technical claim", "Which risk from your register does v1 retire? What can a working slice prove that a mockup can't?"],
    [FA.FaUserCheck, "The usability claim", "Can the target user get through the slice unaided? Who will try it?"],
    [FA.FaTimesCircle, "The falsifier", "What result on Nov 18 would tell you something's wrong with the idea? If nothing could, v1 proves nothing."]
  ];
  for (let i = 0; i < 4; i++) {
    const y = 1.95 + i * 1.02;
    const f = i === 3;
    card(s, 0.6, y, 12.1, 0.9, f ? C.weakBg : C.cardBg, R(f ? 1 : 0));
    await iconCircle(s, qs[i][0], 0.85, y + 0.16, 0.58, f ? C.coral : C.teal, "FFFFFF", R(f ? 1 : 0));
    s.addText(qs[i][1], { x: 1.65, y, w: 3.0, h: 0.9, color: C.ink, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0, ...R(f ? 1 : 0) });
    s.addText(qs[i][2], { x: 4.65, y, w: 7.85, h: 0.9, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0, ...R(f ? 1 : 0) });
  }
  bar(s, 6.1, 0.72, C.navy, "Then:", "rank the three, and name one thing you're building that proves none of them.", 2);
  footer(s);
  s.addNotes("Two minutes; it's the V1 Proof Sheet, top to bottom. Read the three claims. Need traces back to CP2's success criteria. Technical is your risk register from Week 3. Usability is about a real person, unaided. Click: the falsifier is the one that keeps everyone honest; a claim no result could disprove isn't a claim. Second click: rank them, then the cut question. Prop Loft's answers are next, so they see the bar before writing their own.");

  // 7 Prop Loft's answers
  s = mk(); s.background = { color: C.white };
  header(s, "Prop Loft's sheet", "Its answers, ranked");
  const pl = [
    ["1", "Need", "A volunteer answers \"do we own this, and who has it?\" from a phone in under a minute (design §2). Evidence: the wardrobe lead times it at a fitting."],
    ["2", "Usability", "A volunteer who has never seen it finds the waistcoat and checks it out, unaided. Evidence: one volunteer, watched, not helped."],
    ["3", "Technical", "Two volunteers checking out one item at once: one wins, one is told who has it. Evidence: the test where the database refuses."]
  ];
  for (let i = 0; i < 3; i++) {
    const y = 1.95 + i * 1.12;
    card(s, 0.6, y, 12.1, 1.0, C.cardBg, REVEAL(i + 1));
    num(s, 0.8, y + 0.22, 0.56, pl[i][0], C.teal, C.white, REVEAL(i + 1));
    s.addText(pl[i][1], { x: 1.55, y, w: 1.9, h: 1.0, color: C.tealDk, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0, ...REVEAL(i + 1) });
    s.addText(pl[i][2], { x: 3.4, y, w: 9.1, h: 1.0, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.0, ...REVEAL(i + 1) });
  }
  card(s, 0.6, 5.35, 12.1, 1.4, C.weakBg, REVEAL(4));
  s.addText([
    { text: "Falsifier:  ", options: { bold: true, color: C.coral } },
    { text: "the volunteer finishes, then reaches for the paper notebook to double-check. That's the design's own risk (§7): if they don't trust it, the catalog goes stale.", options: { color: C.ink } }
  ], { x: 0.95, y: 5.35, w: 11.4, h: 1.4, fontFace: F.body, fontSize: 16.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.04, ...REVEAL(4) });
  footer(s);
  s.addNotes("Two minutes, one click per claim. The ranking is the lesson: the technical claim is ranked last because a database constraint is a known technique, while whether volunteers abandon the notebook is the real unknown. Ask the room why need outranks technical here. Fourth click: the falsifier comes straight from the design's risk table. A good falsifier is usually already written down somewhere in your design; go look.");

  // 8 Prop Loft's cut and corners
  s = mk(); s.background = { color: C.white };
  header(s, "Prop Loft's cut and corners", "What proves nothing, and what's temporary");
  card(s, 0.6, 1.95, 5.95, 3.2, C.amberBg);
  s.addText([
    { text: "The cut", options: { bold: true, color: C.tealDk, fontSize: 19, breakLine: true } },
    { text: "The list's \"Out\" marker proves none of the three: the item page already shows who has it. So it's first to go if the build falls behind, and that's why it was Session 18's named next cut.", options: { color: C.ink } }
  ], { x: 0.9, y: 1.95, w: 5.4, h: 3.2, fontFace: F.body, fontSize: 16.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
  card(s, 6.75, 1.95, 5.95, 3.2, C.cardBg, REVEAL(1));
  s.addText([
    { text: "The corners, labeled", options: { bold: true, color: C.tealDk, fontSize: 19, breakLine: true } },
    { text: "Checkouts go through the admin until the form lands.", options: { bullet: { indent: 16 }, breakLine: true } },
    { text: "Development runs on SQLite; the theater's server runs Postgres.", options: { bullet: { indent: 16 }, breakLine: true } },
    { text: "Five demo items, loaded by hand.", options: { bullet: { indent: 16 } } }
  ], { x: 7.05, y: 1.95, w: 5.4, h: 3.2, color: C.ink, fontFace: F.body, fontSize: 16.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.05, ...REVEAL(1) });
  bar(s, 5.4, 1.35, C.navy, "Not everything must prove a v1 claim.", "The setup guide proves none of them and stays: it proves the project is joinable, which is CP10's other half.", 2);
  footer(s);
  s.addNotes("Ninety seconds. The cut: the Out marker is convenience, not proof, so it's the first thing to defer. That's the same next cut Session 18 named, and now they know why. Click: the corners, each of which gets a line in known issues. Second click: the subtle one. Some work in your first milestone doesn't prove a v1 claim but has to stay anyway, because CP10 also asks whether a stranger can join. Don't cut the front door to save the demo.");

  // 9 Workshop
  s = mk(); s.background = { color: C.navy };
  darkHeader(s, "Workshop · 20 min", "Fill in your V1 Proof Sheet");
  const ws = [
    ["1", "The three claims", "Each with the evidence you'd see on Nov 18. No evidence line, no claim."],
    ["2", "The falsifier", "The result that would tell you you're wrong. Check your design's risks."],
    ["3", "Rank them", "1 is the one v1 most needs to prove. Say why, to yourself."],
    ["4", "The cut and the corners", "One thing that proves nothing, moved. Every temporary thing, labeled."]
  ];
  for (let i = 0; i < ws.length; i++) {
    const y = 1.95 + i * 0.92;
    card(s, 0.6, y, 12.1, 0.8, C.navy2);
    num(s, 0.8, y + 0.15, 0.5, ws[i][0], C.amber, C.navy);
    s.addText(ws[i][1], { x: 1.5, y, w: 3.7, h: 0.8, color: C.white, fontFace: F.body, fontSize: 17.5, bold: true, valign: "middle", margin: 0 });
    s.addText(ws[i][2], { x: 5.2, y, w: 7.3, h: 0.8, color: "CFE0E9", fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0 });
  }
  card(s, 0.6, 5.75, 12.1, 1.0, C.amber);
  s.addText([
    { text: "Share-out, aloud:  ", options: { bold: true } },
    { text: "one claim and one cut per project. Last 5 minutes." }
  ], { x: 0.95, y: 5.75, w: 11.4, h: 1.0, color: C.navy, fontFace: F.body, fontSize: 18, valign: "middle", margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("Twenty minutes: about fifteen writing and five sharing. Circulate. The common failure is a claim with no evidence line, or evidence nobody could see on Nov 18 (\"users like it\"). Push for a person and an observation. Second most common: no falsifier. Ask what would make them change the plan. For the cut, every project has one; if someone says they don't, ask which issue they'd defer first if they lost three days.");

  // 10 Example: git
  await example("Evaluate it · 1 of 3", "git's first commit, April 2005", FA.FaGitAlt, C.coral,
    "Linus Torvalds: \"Initial revision of 'git', the information manager from hell.\" About 1,200 lines of C in 11 files: a handful of low-level commands to store, read, and commit content. No friendly commands, no merging.",
    [
      ["Need", "Linus needed it himself, at once: it managed its own source the next day."],
      ["Technical, ranked first", "Fast enough for the kernel. His target: apply a patch in 3 seconds or less."],
      ["Usability", "Deliberately not yet. No porcelain; merging came eleven days later."],
      ["What it skipped", "Everything that didn't test the scary claim.", C.amberBg]
    ],
    "rank the claims, prove the scariest with the thinnest end-to-end thing, and defer the rest on purpose. Ten weeks later it managed a kernel release.",
    "Three minutes. Read the left card, then ask the room the four prompts before each click. The point is the ranking: Linus bet everything on speed and left usability for later, knowingly. The first multi-branch merge came on April 18; it managed the 2.6.12 kernel release on June 16. Evolutionary: the code he wrote that week is the ancestor of the git on your laptop. Source: the commit itself, on GitHub.");

  // 11 Example: Denied -> Flask
  await example("Evaluate it · 2 of 3", "Denied, then Flask, April 2010", FA.FaFlask, C.teal,
    "Armin Ronacher's April Fools' joke: a one-file Python \"microframework,\" about 160 lines wrapping two existing libraries, with a website and a screencast. Over 10,000 screencast downloads and 50,000 site visits in days. A month later he started Flask, written fresh.",
    [
      ["Need, ranked first", "People really wanted a tiny, simple web framework."],
      ["Technical", "None: it was a joke wrapper, and none of it was kept."],
      ["Usability", "The snippets on the website were the product."],
      ["Kind", "Throwaway. It answered a question, then went away.", C.amberBg]
    ],
    "a throwaway can answer the need question cheaply, and its job is to be thrown away. The answer is what you keep.",
    "Three minutes. An accidental demand test: nobody meant it as an MVP, which makes it a clean example of what a throwaway is for. If there's time: Ronacher's own post-mortem lesson was \"don't be honest: be bold.\" Ask whether that survives a contributor who clones the repo. It's the opposite of CP10's honesty criterion, and a good argument. Source: his post, April 1st Post Mortem, on lucumr.pocoo.org.");

  // 12 Example: broad-shallow
  s = mk(); s.background = { color: C.white };
  header(s, "Evaluate it · 3 of 3", "Prop Loft, built screen-first");
  card(s, 0.6, 1.95, 5.2, 3.75, C.weakBg);
  await iconCircle(s, FA.FaLayerGroup, 0.85, 2.15, 0.62, C.coral);
  s.addText("Same project, same hours as Session 18. A styled search page, a styled item page, a styled checkout form. Every screen demos. There's no checkout model behind them.", { x: 0.85, y: 2.95, w: 4.7, h: 2.65, color: C.ink, fontFace: F.body, fontSize: 16, valign: "top", margin: 0, lineSpacingMultiple: 1.04 });
  const bs = [
    ["Need", "Can a volunteer find out who has it? No: nothing records it."],
    ["Technical", "Does the database refuse a second checkout? There's no database."],
    ["Usability", "Can a volunteer check one out unaided? The button does nothing."],
    ["Falsifier", "Nothing on Nov 18 could prove it wrong. So it proves nothing."]
  ];
  for (let i = 0; i < 4; i++) {
    const y = 1.95 + i * 0.96;
    card(s, 6.0, y, 6.7, 0.84, C.white, REVEAL(i + 1));
    s.addText([
      { text: bs[i][0] + "  ", options: { bold: true, color: C.coral } },
      { text: bs[i][1], options: { color: C.ink } }
    ], { x: 6.25, y, w: 6.3, h: 0.84, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0, ...REVEAL(i + 1) });
  }
  bar(s, 5.95, 0.85, C.navy, "Not a student mistake:", "Chandler, a funded open-source project, spent years building broad before anything was usable.", 5);
  footer(s);
  s.addNotes("Three minutes. Run the four prompts and let each one come back empty; the room usually gets there before the click. The contrast with Session 18 is exact: the same hours, spent screen-first instead of slice-first. Last click, one sentence only: Chandler, from Scott Rosenberg's Dreaming in Code, shipped 1.0 in 2008, years after work began. Accounts blame complexity, feature creep, and management. Don't claim more than that.");

  // 13 Debugging divider + the loop
  s = mk(); s.background = { color: C.navy };
  darkHeader(s, "Debugging on purpose", "Method beats knowledge");
  const loop = [
    ["0", "Say the failure exactly", "and make it happen on demand"],
    ["1", "Hypothesize", "two or three guesses, not one"],
    ["2", "Test the cheapest first", "not the one you believe"],
    ["3", "Review", "dead is progress; standing, narrow it"],
    ["4", "Fix and verify", "failing test first, then run everything"]
  ];
  for (let i = 0; i < loop.length; i++) {
    const x = 0.6 + i * 2.45;
    card(s, x, 2.05, 2.25, 2.85, C.navy2, REVEAL(i + 1));
    num(s, x + 0.82, 2.25, 0.6, loop[i][0], C.amber, C.navy, REVEAL(i + 1));
    s.addText(loop[i][1], { x: x + 0.12, y: 3.0, w: 2.01, h: 0.85, color: C.white, fontFace: F.body, fontSize: 17, bold: true, align: "center", valign: "middle", margin: 0, ...REVEAL(i + 1) });
    s.addText(loop[i][2], { x: x + 0.12, y: 3.85, w: 2.01, h: 0.95, color: "CFE0E9", fontFace: F.body, fontSize: 15, align: "center", valign: "top", margin: 0, ...REVEAL(i + 1) });
  }
  card(s, 0.6, 5.3, 12.1, 1.4, C.amber, REVEAL(6));
  s.addText("The difference between a one-hour bug and a five-hour bug is rarely what you know. It's whether you guessed, checked, and wrote down what you learned.", { x: 0.95, y: 5.3, w: 11.4, h: 1.4, color: C.navy, fontFace: F.body, fontSize: 17.5, bold: true, valign: "middle", margin: 0, lineSpacingMultiple: 1.04, ...REVEAL(6) });
  footer(s, "7E92A8");
  s.addNotes("Three minutes; it's the reading and the Debugging Loop Card, so hand the card out now. One click per step, briefly: they read it. Spend the time on step 2's twist: you test the cheapest guess first, not your favorite, because a thirty-second test that kills a guess beats an hour confirming one. Last click: the reason any of this matters. Then go straight to the live bug; the loop is easier to see than to hear.");

  // 14 Cheap tests
  s = mk(); s.background = { color: C.white };
  header(s, "Step 2, in practice", "The cheap tests are few and reliable");
  const tests = [
    [FA.FaListOl, "Vary the input", "Every value or only some? Empty, one, many?"],
    [FA.FaSearch, "Look at the data", "Is what's stored what you think is stored?"],
    [FA.FaPenNib, "Add one log line", "Where two guesses split, print the value."],
    [FA.FaBug, "Use the debugger", "Stop at that line; inspect the state."],
    [FA.FaGitAlt, "Ask what changed", "git log, git diff, and for a long history, git bisect."],
    [FA.FaCut, "Shrink it", "Cut the failing case down until it stops failing."]
  ];
  for (let i = 0; i < tests.length; i++) {
    const x = 0.6 + (i % 3) * 4.15, y = 1.95 + Math.floor(i / 3) * 2.0;
    card(s, x, y, 3.8, 1.8, C.cardBg);
    await iconCircle(s, tests[i][0], x + 0.25, y + 0.2, 0.55, C.teal);
    s.addText(tests[i][1], { x: x + 0.95, y: y + 0.2, w: 2.7, h: 0.55, color: C.ink, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
    s.addText(tests[i][2], { x: x + 0.25, y: y + 0.9, w: 3.35, h: 0.8, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0 });
  }
  bar(s, 6.0, 0.8, C.amber, null, "Evidence before belief: run the experiment. The program is right there.", 1);
  footer(s);
  s.addNotes("One minute; it's reference, not lecture. Point out two they underuse: looking at the stored data directly, and asking what changed. A bug that wasn't there yesterday lives in yesterday's diff. git bisect is worth one sentence: it finds the breaking commit by binary search, and it's the reason small commits pay off. Click: the rule. Now watch all of it on a real bug.");

  // 15 Live: the failure and the hypotheses
  s = mk(); s.background = { color: C.white };
  header(s, "Live · Prop Loft", "\"Every item says Out.\" Only one is.");
  card(s, 0.6, 1.95, 5.95, 4.15, C.cardBg);
  s.addText("The list, after one checkout", { x: 0.85, y: 2.05, w: 5.4, h: 0.45, color: C.slate, fontFace: F.body, fontSize: 15, bold: true, margin: 0 });
  const listRows = [
    ["Bowler hat", "Out · due Dec 5"], ["Brocade waistcoat, gold", "Out · due Dec 5"], ["Bustle skirt, black", "Out · due Dec 5"],
    ["Top hat, silk", "Out · due Dec 5"], ["Victorian waistcoat, black", "Out · due Dec 5"]
  ];
  for (let i = 0; i < listRows.length; i++) {
    const y = 2.6 + i * 0.66;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.85, y, w: 5.45, h: 0.58, fill: { color: C.white }, line: { color: "C9D3DC", width: 0.75 } });
    s.addText(listRows[i][0], { x: 1.0, y, w: 3.3, h: 0.58, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0 });
    s.addText(listRows[i][1], { x: 4.2, y, w: 2.0, h: 0.58, color: C.coral, fontFace: F.body, fontSize: 15.5, bold: true, valign: "middle", margin: 0 });
  }
  const hyp = [
    ["The data", "The admin save made a checkout for every item.", "Wrong: the admin lists one.", C.coral, 2],
    ["The display", "The template prints the marker whatever it's given.", "Wrong: a log line shows Dec 5 arriving for every item.", C.coral, 3],
    ["The query", "The view hands every item the same due date.", "Still standing. Read the view.", C.green, 3]
  ];
  for (let i = 0; i < 3; i++) {
    const y = 1.95 + i * 1.4;
    card(s, 6.75, y, 5.95, 1.27, C.white, REVEAL(1));
    s.addText([
      { text: hyp[i][0] + ":  ", options: { bold: true, color: C.tealDk } },
      { text: hyp[i][1], options: { color: C.ink } }
    ], { x: 7.0, y: y + 0.08, w: 5.5, h: 0.68, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0, ...REVEAL(1) });
    s.addText(hyp[i][2], { x: 7.0, y: y + 0.76, w: 5.5, h: 0.45, color: hyp[i][3], fontFace: F.body, fontSize: 15, bold: true, valign: "middle", margin: 0, ...REVEAL(hyp[i][4]) });
  }
  bar(s, 6.3, 0.55, C.amberBg, "The clue in the failure:", "every row, and the same date.", null);
  footer(s);
  s.addNotes("About four minutes, run live from demos/session19-debugging/DEMO-SCRIPT.md; this slide is the backdrop. Check out the waistcoat in the admin, reload the list: every row reads Out. Say the failure exactly, and point at the bar: same date everywhere is a clue. Click: three guesses. Test the cheapest first, the admin; click when it dies. Paste the log line; click when the template is cleared. Then read the view.");

  // 16 Live: pinned and fixed
  s = mk(); s.background = { color: C.white };
  header(s, "Live · pin it, then fix it", "A failing test first, then one line");
  s.addText("The test, before the fix", { x: 0.6, y: 1.85, w: 6.9, h: 0.35, color: C.slate, fontFace: F.body, fontSize: 15, bold: true, margin: 0 });
  codeBlock(s, 0.6, 2.25, 6.9, 2.0, [
    ["FAIL: test_marks_only_the_item_that_is_out", C.codeDel],
    "",
    ["- {'Bowler hat': datetime.date(2026, 12, 5),", C.codeDel],
    ["+ {'Bowler hat': None,", C.codeAdd],
    ["   'Victorian waistcoat': date(2026, 12, 5)}", C.code]
  ], {}, 14.5);
  s.addText("The fix, in catalog/views.py", { x: 0.6, y: 4.4, w: 6.9, h: 0.35, color: C.slate, fontFace: F.body, fontSize: 15, bold: true, margin: 0, ...REVEAL(1) });
  codeBlock(s, 0.6, 4.8, 6.9, 1.95, [
    ["- Checkout.objects.filter(", C.codeDel],
    ["-     returned_date__isnull=True)", C.codeDel],
    ["+ Checkout.objects.filter(item=OuterRef(\"pk\"),", C.codeAdd],
    ["+     returned_date__isnull=True)", C.codeAdd]
  ], REVEAL(1), 14.5);
  const after = [
    ["Why the tests missed it", "Each test put one item in the database: one out, or one in. Never both.", 0],
    ["Run everything", "12 tests, OK. Reload: only the black waistcoat is out.", 1],
    ["Did it break the slice?", "Search \"waistcoat\": both found, one out. The slice still walks.", 2]
  ];
  for (let i = 0; i < 3; i++) {
    const y = 1.95 + i * 1.62;
    card(s, 7.75, y, 4.95, 1.48, i === 0 ? C.amberBg : C.strongBg, R(after[i][2]));
    s.addText([
      { text: after[i][0], options: { bold: true, color: C.tealDk, breakLine: true } },
      { text: after[i][1], options: { color: C.ink, fontSize: 15.5 } }
    ], { x: 8.0, y, w: 4.5, h: 1.48, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, lineSpacingMultiple: 1.03, ...R(after[i][2]) });
  }
  footer(s);
  s.addNotes("About two minutes, still live. Name the chain backward: the failure is every row out; the fault is the subquery returning the first open checkout for every row; the defect is the line, not tied to its item; the error was the author's. Apply the regression test and run it: it fails for the right reason. Ask why the old tests missed it. Click: the fix. Second click: run everything, re-walk the slice.");

  // 17 The chain
  s = mk(); s.background = { color: C.white };
  header(s, "Session 15's words, walked backward", "You see the failure. You hunt the defect.");
  const chain = [
    ["Failure", "What you saw", "Every row says Out.", C.coral],
    ["Fault", "What went wrong at runtime", "The subquery returned one checkout's date for every row.", C.amber],
    ["Defect", "The flaw in the code", "A subquery not tied to its item.", C.teal],
    ["Error", "The person's mistake", "Writing the filter and forgetting the item.", C.tealDk]
  ];
  for (let i = 0; i < 4; i++) {
    const x = 0.6 + i * 3.1;
    card(s, x, 1.95, 2.85, 3.3, C.cardBg, R(i));
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.95, w: 2.85, h: 0.12, fill: { color: chain[i][3] }, ...R(i) });
    s.addText(chain[i][0], { x: x + 0.2, y: 2.15, w: 2.45, h: 0.55, color: C.ink, fontFace: F.head, fontSize: 22, bold: true, margin: 0, ...R(i) });
    s.addText(chain[i][1], { x: x + 0.2, y: 2.7, w: 2.45, h: 0.5, color: C.slate, fontFace: F.body, fontSize: 15, italic: true, margin: 0, ...R(i) });
    s.addText(chain[i][2], { x: x + 0.2, y: 3.25, w: 2.45, h: 1.9, color: C.ink, fontFace: F.body, fontSize: 16, valign: "top", margin: 0, ...R(i) });
  }
  bar(s, 5.55, 1.15, C.navy, "Each hypothesis was a guess", "about where along this chain the defect sits. A report describes the failure; the investigation walks backward.", 4);
  footer(s);
  s.addNotes("One minute, as a recap of what they just watched. The vocabulary is Session 15's, from the bug-report anatomy; today they see why it's useful. You only ever observe the failure. Clicks reveal the chain one step back at a time. The last click is the payoff: \"the data, the display, the query\" were three guesses about where the defect lived, and evidence moved us along the chain.");

  // 18 The debug log
  s = mk(); s.background = { color: C.white };
  header(s, "Write it down", "The debug log: three lines");
  const log = [
    ["What I saw", "After checking out one item, every item in the list read \"Out · due Dec 5.\""],
    ["What I suspected", "The admin saved several: no, there's one. The template: no, the view sends Dec 5 for every item. So the query."],
    ["What it was", "The subquery wasn't tied to the item. Filtered on item=OuterRef(\"pk\"); added a test with an item in next to one out."]
  ];
  for (let i = 0; i < 3; i++) {
    const y = 1.95 + i * 1.1;
    card(s, 0.6, y, 12.1, 0.98, C.cardBg);
    s.addText(log[i][0], { x: 0.9, y, w: 2.5, h: 0.98, color: C.tealDk, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
    s.addText(log[i][1], { x: 3.4, y, w: 9.1, h: 0.98, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.0 });
  }
  card(s, 0.6, 5.35, 5.95, 1.4, C.navy, REVEAL(1));
  s.addText([
    { text: "Where it goes  ", options: { bold: true, color: C.amber, breakLine: true } },
    { text: "The bug's issue, or the PR description if you hit it on your own branch.", options: { color: C.white } }
  ], { x: 0.9, y: 5.35, w: 5.4, h: 1.4, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0, ...REVEAL(1) });
  card(s, 6.75, 5.35, 5.95, 1.4, C.amber, REVEAL(2));
  s.addText([
    { text: "When it's required  ", options: { bold: true, color: C.navy, breakLine: true } },
    { text: "Any bug that cost you more than an hour, and any bug you don't fix yet.", options: { color: C.navy } }
  ], { x: 7.05, y: 5.35, w: 5.4, h: 1.4, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0, ...REVEAL(2) });
  footer(s);
  s.addNotes("Ninety seconds. The demo's own log, so they see the bar: precise, wrong guesses included, and the test that now covers it. Click: where it lives. Ours was on the maintainer's own branch, so it goes in the PR. Second click: the floor. More than an hour, or left unfixed. It isn't a separate grade; it shows up in CP9's bug reports and CP10's honesty criterion. Two minutes to write, and the retrospective will thank them.");

  // 19 Stuck + AI
  s = mk(); s.background = { color: C.white };
  header(s, "When you're stuck", "Stuck is normal. Staying stuck alone is a choice.");
  const stuck = [
    [FA.FaHourglassHalf, "Time-box it", "Pick a limit before you start; an hour is common. When it runs out, change something: step away, explain it out loud, or ask."],
    [FA.FaComments, "Explain it to a duck", "Saying each step out loud forces the assumption you were about to skip."],
    [FA.FaRobot, "AI's answer is hypothesis #4", "Good for candidate causes and unfamiliar errors. Test its answer like the others: unchecked, it's a confident guess."]
  ];
  for (let i = 0; i < 3; i++) {
    const y = 1.95 + i * 1.3;
    card(s, 0.6, y, 12.1, 1.15, C.cardBg, REVEAL(i + 1));
    await iconCircle(s, stuck[i][0], 0.85, y + 0.25, 0.65, i === 2 ? C.amber : C.teal, i === 2 ? C.navy : "FFFFFF", REVEAL(i + 1));
    s.addText(stuck[i][1], { x: 1.75, y, w: 3.7, h: 1.15, color: C.ink, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0, ...REVEAL(i + 1) });
    s.addText(stuck[i][2], { x: 5.45, y, w: 7.05, h: 1.15, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.0, ...REVEAL(i + 1) });
  }
  bar(s, 5.95, 0.8, C.navy, "Don't:", "change several things at once · stop at \"it works now\" without knowing why · fix before you understand.", 4);
  footer(s);
  s.addNotes("One minute. The time box is the spike rule again: decide the limit before you're tired. The rubber duck works because it's slow. Third click is the standing AI policy applied: an assistant is a fine source of guesses, and a guess gets tested like any other. If it explains the bug and you can't confirm it with evidence, you don't know anything yet. Last click: the three habits that turn one hour into five.");

  // 20 Known issues
  s = mk(); s.background = { color: C.white };
  header(s, "Known issues · start the list today", "What doesn't work yet, written where a newcomer will see it");
  s.addText("docs/known-issues.md, linked from your README", { x: 0.6, y: 1.85, w: 6.9, h: 0.35, color: C.slate, fontFace: F.body, fontSize: 15, bold: true, margin: 0 });
  codeBlock(s, 0.6, 2.25, 6.9, 3.4, [
    ["## Checkouts go through the admin", C.amber],
    "",
    ["What happens: no check-out form yet;", C.code],
    ["  volunteers can't check out on a phone.", C.code],
    ["When it bites: any checkout before M1 ends.", C.code],
    ["Workaround: the wardrobe lead enters it", C.code],
    ["  in the admin.", C.code],
    ["Issue: Check an item out from its page", C.codeDim]
  ], {}, 14.5);
  const sources = [
    ["Throwaway corners", "from today's sheet"],
    ["Cuts that leave a gap", "the ones a user will notice"],
    ["Bugs you won't fix yet", "with their debug log"]
  ];
  s.addText("Three sources, all from today", { x: 7.75, y: 1.85, w: 4.95, h: 0.35, color: C.slate, fontFace: F.body, fontSize: 15, bold: true, margin: 0 });
  for (let i = 0; i < 3; i++) {
    const y = 2.25 + i * 1.17;
    card(s, 7.75, y, 4.95, 1.02, C.cardBg);
    s.addText([
      { text: sources[i][0], options: { bold: true, color: C.ink, breakLine: true } },
      { text: sources[i][1], options: { color: C.slate, fontSize: 15 } }
    ], { x: 8.0, y, w: 4.5, h: 1.02, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0 });
  }
  bar(s, 5.9, 0.85, C.navy, "Linux 0.02, 1991:", "\"even usable (though may not be depending on what you want).\" Honest from version zero.", 1);
  footer(s);
  s.addNotes("Three minutes. Why now: CP10's Documentation and honesty criterion reads the repo at your cp10 tag on Nov 18, five days before we cover the full log. Show Prop Loft's first entry: what happens, when it bites, the workaround, the issue. Then the three sources. Click: Linus's 0.02 announcement listed its own limits. A short honest list reads as a project that tells the truth; \"no known issues\" reads as one that didn't look.");

  // 21 Wrap
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: -1.3, y: 5.2, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaBullseye, 0.9, 1.15, 0.85, C.amber, C.navy);
  s.addText("v1 proves claims. Label your corners. Debug with a written loop. Write down what doesn't work.", { x: 0.9, y: 2.15, w: 11.9, h: 1.15, color: C.white, fontFace: F.head, fontSize: 25, bold: true, italic: true, margin: 0, lineSpacingMultiple: 1.06 });
  s.addText("BEFORE WEDNESDAY, NOV 11", { x: 0.92, y: 3.5, w: 11, h: 0.35, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText([
    { text: "MVP Plan drafted in docs/mvp-plan.md: today's sheet is parts 3 and 4. Bring it for the peer pass.", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "docs/known-issues.md started, with your corners in it", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 7 } },
    { text: "Wednesday also: your setup guide, written in class and followed cold by your partner", options: { bullet: { indent: 16 } } }
  ], { x: 0.95, y: 3.95, w: 11.7, h: 1.85, color: "CBD8E6", fontFace: F.body, fontSize: 17, valign: "top", margin: 0 });
  card(s, 0.6, 5.95, 12.1, 0.8, C.amber);
  s.addText("Nov 18: CP10 progress demo and repo audit. One week of building before a stranger reads your repo.", { x: 0.9, y: 5.95, w: 11.5, h: 0.8, color: C.navy, fontFace: F.body, fontSize: 16, bold: true, align: "center", valign: "middle", margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("Two minutes. Say the one-liner. The MVP Plan is due end of day Wednesday as a URL to docs/mvp-plan.md on main; bring the draft for the review. CP10's handout and rubric are on Canvas now: point at the cp10 tag rule and the clip rule so nobody meets them the night before. Keep the Proof Sheet and the card; neither is a turn-in.");

  const OUT = "Session19-ProveAndDebug.pptx";
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
