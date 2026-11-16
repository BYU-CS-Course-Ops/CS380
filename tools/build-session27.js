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
pres.title = "CS 301R — Session 27 — Finish, Freeze, and Close the Loop";

let PAGE = 0;
function mk() { PAGE++; return pres.addSlide(); }
function footer(slide, col) {
  const c = col || C.slate;
  slide.addText("CS 301R · Session 27 · Finish & Freeze", { x: 7.3, y: 7.04, w: 5.4, h: 0.3, align: "right", color: c, fontFace: F.body, fontSize: 10, margin: 0 });
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

// A segment of the per-project timeline: a colored block sized by its minutes.
function segment(s, x, w, y, h, fill, title, mins, sub, dark) {
  s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: fill }, line: { color: C.white, width: 2 } });
  const narrow = w < 1, pad = narrow ? 0.03 : 0.12;
  s.addText([
    { text: title, options: { bold: true, breakLine: true, fontSize: narrow ? 15 : 18 } },
    { text: mins, options: { bold: true, breakLine: !!sub, fontSize: 16, color: dark ? (fill === C.navy ? C.amber : C.white) : C.navy } },
    ...(sub ? [{ text: sub, options: { fontSize: 15 } }] : [])
  ], { x: x + pad, y, w: w - 2 * pad, h, color: dark ? C.white : C.ink, fontFace: F.body, valign: "middle", align: "center", margin: 0 });
}

async function build() {
  let s;

  // 1 Title
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: 10.9, y: -1.4, w: 4.2, h: 4.2, fill: { color: "1C3252" } });
  s.addShape(pres.shapes.OVAL, { x: 12.0, y: 5.1, w: 3.0, h: 3.0, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaFlagCheckered, 0.9, 1.45, 1.0, C.amber, C.navy);
  s.addText("CS 301R · SOFTWARE ENGINEERING STUDIO I", { x: 0.92, y: 2.75, w: 11, h: 0.35, color: "9FB4C7", fontFace: F.body, fontSize: 15, bold: true, charSpacing: 2, margin: 0 });
  s.addText("Finish, Freeze, and Close the Loop", { x: 0.9, y: 3.15, w: 12.1, h: 1.3, color: C.white, fontFace: F.head, fontSize: 42, bold: true, margin: 0 });
  s.addText([
    { text: "Session 27 — the last class: the final studio", options: { color: C.amber, bold: true, breakLine: true } },
    { text: "Wednesday, December 9, 2026", options: { color: "9FB4C7" } }
  ], { x: 0.92, y: 4.7, w: 11, h: 0.9, fontFace: F.body, fontSize: 19, margin: 0, lineSpacingMultiple: 1.2 });
  s.addNotes("Before class: spare copies of the Launch Package Checklist from Session 25, since most students will have lost theirs; your own Week-1 slide ready for the close. Students arrive with Monday's polish plan, ranked, and the demo-path items done or nearly done. This deck is a backdrop for a studio: most of the session is work time, so keep the slides short and the laptops open.");

  // 2 Today
  s = mk(); s.background = { color: C.white };
  header(s, "Today", "Finish the work, freeze it, then stop on purpose");
  const plan = [
    [FA.FaClipboardList, "Standup: your polish plan, from the top", "5 min"],
    [FA.FaTools, "Polish and verify, on main", "25 min"],
    [FA.FaBroom, "Final cleanup, then freeze the tag", "25 min"],
    [FA.FaCalendarCheck, "Demo Day logistics", "8 min"],
    [FA.FaRedoAlt, "Close the loop", "12 min"]
  ];
  for (let i = 0; i < plan.length; i++) {
    const y = 1.95 + i * 0.86;
    const hi = i === 1 || i === 2;
    card(s, 0.6, y, 12.1, 0.72, hi ? C.navy : C.cardBg);
    await iconCircle(s, plan[i][0], 0.88, y + 0.11, 0.5, hi ? C.amber : C.teal, hi ? C.navy : "FFFFFF");
    s.addText(plan[i][1], { x: 1.65, y, w: 9.0, h: 0.72, color: hi ? C.white : C.ink, fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0 });
    s.addText(plan[i][2], { x: 10.6, y, w: 1.8, h: 0.72, color: hi ? C.amber : C.slate, fontFace: F.body, fontSize: 17, bold: true, align: "right", valign: "middle", margin: 0 });
  }
  bar(s, 6.3, 0.65, C.amber, null, "Nothing new today. Today is the discipline of finishing.", null);
  footer(s);
  s.addNotes("Thirty seconds. The two navy blocks are the session: fifty minutes of work time, split between finishing the polish plan and cleaning up the repository before the tag. Say the amber line plainly. No new features, no new documents, no new ideas; anything that isn't on Monday's plan goes on the roadmap. Every project ends twice, once when the work stops and once when it's presentable. Today is the second ending.");

  // 3 Standup
  s = mk(); s.background = { color: C.white };
  header(s, "Standup: your polish plan, from the top", "Sixty seconds each: done, in flight, or at risk");
  const st = [
    ["DONE", "Say it, move on", C.strongBg, C.green],
    ["IN FLIGHT", "Say when it lands", C.amberBg, "B7791F"],
    ["AT RISK", "Finish it, or drop it", C.weakBg, C.coral]
  ];
  for (let i = 0; i < 3; i++) {
    const x = 0.6 + i * 4.1;
    card(s, x, 1.95, 3.9, 1.6, st[i][2]);
    s.addText(st[i][0], { x: x + 0.3, y: 2.1, w: 3.4, h: 0.4, color: st[i][3], fontFace: F.body, fontSize: 16, bold: true, charSpacing: 2, margin: 0 });
    s.addText(st[i][1], { x: x + 0.3, y: 2.55, w: 3.4, h: 0.8, color: C.ink, fontFace: F.head, fontSize: 21, bold: true, valign: "top", margin: 0 });
  }
  bar(s, 3.9, 1.05, C.navy, "Aim to finish demo-path work today,", "so your own run-through in the work block covers it. Change it later only if you run the whole demo again before you tag.", null);
  bar(s, 5.15, 1.05, C.cardBg, "Slides and speaking notes aren't in the tag.", "Keep improving them, and keep rehearsing, right up to Demo Day. The repo freezes Thursday night.", 1);
  footer(s);
  s.addNotes("Five minutes for four projects. Each reads the polish plan from the top: done, in flight, or at risk; anything at risk gets a decision now, finish it or drop it. The repository, meaning code, data, setup, and docs, freezes with the tag Thursday at 11:59 pm. Freeze as much of the demo path as you can today, so each student's own run-through in the work block covers it; there's no run in front of the room; a change after today is fine if you run the whole demo again before tagging. Click: slides and speaking notes aren't in the tag, so they and the rehearsing can continue to Monday.");

  // 4 Polish and verify
  s = mk(); s.background = { color: C.white };
  header(s, "Polish and verify", "A fix isn't done until you've seen it on main");
  pairCards(s, 1.95, 2.45, [
    ["VERIFY", "On main, on the demo path", "Not on a branch, not from memory. Main is what the tag will capture, so that's where every fix gets checked.", C.cardBg, C.tealDk],
    ["ON YOUR OWN LAPTOP", "Run it once, start to finish", "At your desk, not for the room: walk the whole demo against main, then test the fallback: seed data there, clip loads.", C.navy, C.amber]
  ]);
  bar(s, 4.7, 1.0, C.cardBg, "At work, this is a release candidate:", "the build you'd ship, checked the way users will meet it, before anyone tags it.", null);
  bar(s, 5.85, 0.85, C.amber, null, "If something breaks in your run-through, you found it today instead of Monday.", null);
  footer(s);
  s.addNotes("Twenty-five minutes of work. Start general: teams at work check a release candidate exactly as users will meet it, not on a developer's branch, because the branch isn't what ships. Here, main is what the tag captures. Rove. Ask each project to show you one fix working on main. Before this block ends, each student runs their own demo once, start to finish, at their desk against main, and tests the fallback. It isn't a presentation; nobody watches but you, roving. A break now is good news: there's still time.");

  // 5 Cleanup
  s = mk(); s.background = { color: C.white };
  header(s, "Final cleanup", "Truth and loose ends, not new writing");
  card(s, 0.6, 1.95, 12.1, 1.35, C.navy);
  await iconCircle(s, FA.FaClipboardCheck, 0.9, 2.2, 0.85, C.amber, C.navy);
  s.addText([
    { text: "Re-run your Launch Package Checklist against main, today.", options: { bold: true, color: C.white, breakLine: true } },
    { text: "Anything that slipped since the launch tag: fix it or log it. That covers the README status, known issues (including the dry run's), starter issues, and the roadmap.", options: { color: "CFE0E9" } }
  ], { x: 2.0, y: 1.95, w: 10.4, h: 1.35, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  s.addText("PLUS THREE CHECKS THE LAUNCH LIST DOESN'T HAVE", { x: 0.62, y: 3.5, w: 12, h: 0.35, color: C.teal, fontFace: F.body, fontSize: 15, bold: true, charSpacing: 2, margin: 0 });
  numRow(s, 3.95, 0.78, 1, "Branches.", "Stale ones deleted. Any you keep links to an issue or draft PR that says what it's for.");
  numRow(s, 4.83, 0.78, 2, "Pull requests.", "Every open one merged, or closed with a comment. Nothing left hanging.");
  numRow(s, 5.71, 0.78, 3, "The board.", "Matches reality: Done is done; leftovers on the roadmap or labeled for newcomers.");
  footer(s);
  s.addNotes("Part of the second work block. Every stranger who opens a project months from now meets whatever was left lying around today: a dangling pull request, a branch called test2 that nobody can explain, a board that says In Progress on something abandoned. Students already have the Launch Package Checklist, so they re-run it rather than learn a new list; hand out spares. The three checks below it are the hygiene that list doesn't cover. A branch kept for unfinished work is fine; it just needs a pointer, an issue or a draft pull request, so a stranger knows why it exists. This is truthfulness, not new writing.");

  // 6 Freeze
  s = mk(); s.background = { color: C.white };
  header(s, "Freeze: tag it, and let it stand", "Deciding it's done is a founder's call too");
  codeBlock(s, 0.6, 1.95, 6.6, 1.75, [
    "git switch main && git pull",
    "git tag -a cp12-demo -m \"CP12: Demo Day\"",
    "git push origin cp12-demo"
  ], null, 16);
  card(s, 7.45, 1.95, 5.25, 1.75, C.cardBg);
  s.addText([
    { text: "WHEN", options: { bold: true, color: C.tealDk, charSpacing: 2, breakLine: true, fontSize: 15 } },
    { text: "In class, if you're ready.", options: { bold: true, color: C.ink, breakLine: true } },
    { text: "By 11:59 pm Thursday, Dec 10, at the latest.", options: { color: C.ink } }
  ], { x: 7.75, y: 1.95, w: 4.75, h: 1.75, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, lineSpacingMultiple: 1.06 });
  bar(s, 3.95, 0.95, C.navy, "The tag is the artifact of record.", "The demo runs from it, faculty browse it, and grading reads it. Work on main can continue; it isn't what's shown.", null);
  bar(s, 5.05, 0.95, C.cardBg, "After the deadline, the tag doesn't move.", "A demo-breaking hotfix needs my approval, an issue that describes it, and a new tag.", null);
  bar(s, 6.15, 0.7, C.amber, null, "Ready today? Tag it, then tell me: “we're done.”", 1);
  footer(s);
  s.addNotes("End of the second work block. Thursday is the last day of classes, and university policy allows nothing but the final after it, so the tag deadline is real. Recommend tagging in class: declaring done out loud, to me, is part of the lesson. Freezing is a deliberate act, and plenty of projects never ship because nobody decided they were done. Click for the invitation. Check each pushed tag on GitHub before they leave.");

  // 7 Demo Day logistics
  s = mk(); s.background = { color: C.white };
  header(s, "Demo Day: Monday, December 14", "Questions now, not by email Thursday night");
  const lg = [
    ["Start", "8:30 AM. In the room by 8:20 to load"],
    ["Room", "TMCB 1149, our usual classroom"],
    ["Run order", "Drawn at random that morning. Be ready to go first."],
    ["Each project", "9 min pitch + demo, 5 min questions, 2 min swap"],
    ["In the room", "Your classmates, me, and invited capstone faculty"]
  ];
  for (let i = 0; i < lg.length; i++) {
    const y = 1.95 + i * 0.8;
    card(s, 0.6, y, 12.1, 0.68, i % 2 ? C.white : C.cardBg);
    s.addText(lg[i][0], { x: 0.9, y, w: 2.6, h: 0.68, color: C.tealDk, fontFace: F.body, fontSize: 17, bold: true, valign: "middle", margin: 0 });
    s.addText(lg[i][1], { x: 3.6, y, w: 8.8, h: 0.68, color: C.ink, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0 });
  }
  bar(s, 6.05, 0.75, C.amber, null, "Demo from the cp12-demo tag. Bring your fallback, loaded.", null);
  footer(s);
  s.addNotes("Eight minutes with questions. Same room as always. The run order is drawn at random that morning, as at the dry run, so everyone prepares to go first. The registrar's block opens at 7:00, but we start at 8:30. Four projects at sixteen minutes each leaves room to open, close, and absorb one failure. Faculty may browse the repositories beforehand, which is one more reason the tag matters. There are no peer evaluations this term. Repeat all of it in a Canvas announcement Thursday.");

  // 8 Close the loop: the hook
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: 10.9, y: -1.4, w: 4.2, h: 4.2, fill: { color: "1C3252" } });
  s.addText("WEEK 1, SESSION 1", { x: 1.0, y: 0.95, w: 11, h: 0.35, color: C.amber, fontFace: F.body, fontSize: 15, bold: true, charSpacing: 2, margin: 0 });
  s.addText("“Nearly every big open-source project you rely on started as one or two people deciding a problem was worth solving. This semester, that's you.”", { x: 1.0, y: 1.5, w: 11.3, h: 2.7, color: C.white, fontFace: F.head, fontSize: 32, bold: true, italic: true, margin: 0, lineSpacingMultiple: 1.08, valign: "top" });
  card(s, 1.0, 4.75, 11.3, 1.5, C.amber, REVEAL(1));
  s.addText([
    { text: "One sentence each:", options: { bold: true, breakLine: true } },
    { text: "What did you found, and who is it for?", options: { bold: false } }
  ], { x: 1.35, y: 4.75, w: 10.7, h: 1.5, color: C.navy, fontFace: F.head, fontSize: 25, valign: "middle", margin: 0, ...REVEAL(1) });
  footer(s, "7E92A8");
  s.addNotes("Start of the last twelve minutes. Read the Week-1 hook aloud, slowly; they heard it on the first day as a promise. Click for the prompt. Go around the room: one sentence each, what they founded and who it's for. Don't let anyone hedge into features; it's the need and the person. Write their sentences down afterward. They're good material for next fall's Session 1, and an honest record of what the course produced.");

  // 9 The right column
  s = mk(); s.background = { color: C.white };
  header(s, "Contributor vs. founder, revisited", "You now live in the right column");
  const rows = [
    ["The problem", "Find and prove a problem worth solving", "Discovery notes, idea briefs, a defended proposal"],
    ["The users", "Discover who they are and what they need", "Interviews, personas, people who used what you built"],
    ["Decisions", "Make and defend architecture, scope, tech", "A design document, spikes, an MVP plan with cuts"],
    ["The rules", "Write the norms", "License, CONTRIBUTING, code of conduct, git standards"],
    ["Future contributors", "Build the on-ramps", "Setup and onboarding guides, starter issues, a roadmap"],
    ["Success", "A launched project people want to help build", "A working MVP, a launch tag, and Monday's demo"]
  ];
  const tHead = [
    { text: "", options: { fill: { color: C.white } } },
    { text: "FOUNDER  ·  WEEK 1", options: { fill: { color: C.slate }, color: C.white, bold: true, align: "center", fontFace: F.body, fontSize: 15 } },
    { text: "WHAT YOU BUILT", options: { fill: { color: C.teal }, color: C.white, bold: true, align: "center", fontFace: F.body, fontSize: 15 } }
  ];
  const tBody = rows.map((r, i) => {
    const z = i % 2 ? "EEF3F6" : C.white;
    return [
      { text: r[0], options: { fill: { color: z }, color: C.tealDk, bold: true, fontFace: F.body, fontSize: 15 } },
      { text: r[1], options: { fill: { color: z }, color: C.slate, fontFace: F.body, fontSize: 15 } },
      { text: r[2], options: { fill: { color: z }, color: C.ink, bold: true, fontFace: F.body, fontSize: 15 } }
    ];
  });
  s.addTable([tHead, ...tBody], { x: 0.6, y: 1.95, w: 12.1, colW: [2.3, 4.7, 5.1], rowH: 0.62, valign: "middle", margin: [3, 6, 3, 6], border: { type: "solid", color: "FFFFFF", pt: 2 } });
  s.addText("The founder's portfolio, end to end. Every row has a link you can send someone.", { x: 0.6, y: 6.45, w: 12.1, h: 0.4, color: C.tealDk, fontFace: F.body, fontSize: 16, bold: true, italic: true, align: "center", margin: 0 });
  footer(s);
  s.addNotes("Two or three minutes. This is Session 1's contributor-versus-founder table, with the contributor column replaced by what they actually made. Read the right column aloud, row by row. Each one is a public artifact they can show an employer, a capstone team, or a future contributor. Stay respectful of the contributor role, as on day one; the point is that they've now done both kinds of work. Don't linger. The last slide matters more.");

  // 10 Last word
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: -1.3, y: 5.2, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaDoorOpen, 0.9, 0.85, 0.85, C.amber, C.navy);
  s.addText([
    { text: "The repo is public. The on-ramps are built. The roadmap is an invitation.", options: { color: C.white, breakLine: true } },
    { text: "What happens to it next is a decision, and it's yours.", options: { color: C.amber } }
  ], { x: 0.9, y: 1.95, w: 11.6, h: 2.6, fontFace: F.head, fontSize: 32, bold: true, margin: 0, lineSpacingMultiple: 1.1, valign: "top" });
  card(s, 0.6, 5.3, 12.1, 0.9, C.amber);
  s.addText("Tag by Thursday, 11:59 pm.  See you at Demo Day, Monday at 8:30.", { x: 0.9, y: 5.3, w: 11.5, h: 0.9, color: C.navy, fontFace: F.body, fontSize: 20, bold: true, align: "center", valign: "middle", margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("The last word points forward, not back. Read the two lines and stop; don't explain them. Some of these projects may continue next semester and some may not, but nothing is decided, so don't promise anything. The decision line is true either way: a public, contributor-ready repository can be picked up by anyone, its founder included, whenever they choose. Then the two dates, and thank them for the semester.");

  const OUT = "Session27-FinalStudio.pptx";
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
