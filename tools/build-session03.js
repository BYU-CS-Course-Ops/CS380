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
pres.title = "CS 301R — Session 3 — Open Source, Licensing & Governance";

let PAGE = 0;
function mk() { PAGE++; return pres.addSlide(); }
function footer(slide, col) {
  const c = col || C.slate;
  slide.addText("CS 301R · Session 3 · Open Source & Licensing", { x: 7.8, y: 7.04, w: 4.9, h: 0.3, align: "right", color: c, fontFace: F.body, fontSize: 10, margin: 0 });
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
  await iconCircle(s, FA.FaBalanceScale, 0.9, 1.45, 1.0, C.amber, C.navy);
  s.addText("CS 301R · SOFTWARE ENGINEERING STUDIO I", { x: 0.92, y: 2.75, w: 11, h: 0.35, color: "9FB4C7", fontFace: F.body, fontSize: 15, bold: true, charSpacing: 2, margin: 0 });
  s.addText("Open Source, Licensing & Governance", { x: 0.9, y: 3.15, w: 12.1, h: 1.3, color: C.white, fontFace: F.head, fontSize: 42, bold: true, margin: 0 });
  s.addText([
    { text: "Session 3 — Building in the Open", options: { color: C.amber, bold: true, breakLine: true } },
    { text: "Monday, September 14, 2026", options: { color: "9FB4C7" } }
  ], { x: 0.92, y: 4.7, w: 11, h: 0.9, fontFace: F.body, fontSize: 19, margin: 0, lineSpacingMultiple: 1.2 });
  s.addNotes("A Monday teaching session — more lecture-and-discussion than workshop. Frame it: problem-finding continues on their own time (keep that journal going), and today is the CRAFT of building in the open — licensing and governance. These are the founder decisions that turn code into a project others can legally use and actually join. ~1 min.");

  // 2 Recap + framing
  s = mk(); s.background = { color: C.white };
  header(s, "Where we are", "From finding problems to building in the open");
  card(s, 0.6, 2.05, 5.95, 3.7, C.cardBg);
  await iconCircle(s, FA.FaExchangeAlt, 0.9, 2.35, 0.66, C.teal);
  s.addText("From Session 2", { x: 1.72, y: 2.42, w: 4.6, h: 0.5, color: C.ink, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
  s.addText("You generated a big pool of candidate problems. Keep feeding your idea journal — you'll need range for three different Idea Briefs.", { x: 0.98, y: 3.3, w: 5.35, h: 2.3, color: C.ink, fontFace: F.body, fontSize: 16, valign: "top", margin: 0, lineSpacingMultiple: 1.06 });
  card(s, 6.75, 2.05, 5.95, 3.7, C.navy);
  await iconCircle(s, FA.FaUnlock, 7.05, 2.35, 0.66, C.amber, C.navy);
  s.addText("Today — the \"open\" in open source", { x: 7.87, y: 2.42, w: 4.7, h: 0.5, color: C.white, fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "Why we build in the open", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 12, color: "CFE0E9" } },
    { text: "How software licenses actually work", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 12, color: "CFE0E9" } },
    { text: "The governance a founder sets", options: { bullet: { indent: 16 }, color: "CFE0E9" } }
  ], { x: 7.1, y: 3.3, w: 5.35, h: 2.3, fontFace: F.body, fontSize: 16, valign: "top", margin: 0 });
  footer(s);
  s.addNotes("Quick bridge from Session 2: they generated a big pool of candidate problems; remind them to keep feeding the journal for range across three Idea Briefs. Then set today's three-part agenda plainly — why we build in the open, how licenses actually work, and the governance a founder sets. Keep it to a minute or two. ~2 min.");

  // 3 Why build in the open
  s = mk(); s.background = { color: C.white };
  header(s, "Why build in the open?", "What \"open\" actually buys you");
  const why = [
    [FA.FaUsers, "Contributors", "Others can find, use, and help build it."],
    [FA.FaEye, "Feedback & trust", "Many eyes: bugs surface, quality shows."],
    [FA.FaShareAlt, "Reuse & reach", "People build on it instead of starting over."],
    [FA.FaSeedling, "Longevity", "A project that can outlive any one person — and a public portfolio."]
  ];
  for (let i = 0; i < 4; i++) {
    const y = 2.05 + i * 0.95;
    await iconCircle(s, why[i][0], 0.7, y, 0.64, C.teal);
    s.addText(why[i][1], { x: 1.55, y: y + 0.02, w: 6.7, h: 0.4, color: C.ink, fontFace: F.body, fontSize: 19, bold: true, margin: 0 });
    s.addText(why[i][2], { x: 1.55, y: y + 0.42, w: 6.7, h: 0.4, color: C.slate, fontFace: F.body, fontSize: 14.5, margin: 0 });
  }
  card(s, 8.5, 2.05, 4.2, 4.35, C.navy);
  await iconCircle(s, FA.FaComments, 8.8, 2.35, 0.62, C.amber, C.navy);
  s.addText("Talk about it", { x: 9.55, y: 2.4, w: 3.0, h: 0.55, color: C.white, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "What's scary about building in public — and how real is it?", options: { breakLine: true, paraSpaceAfter: 12 } },
    { text: "\"Given enough eyeballs, all bugs are shallow\" — do you buy it?", options: { breakLine: true, paraSpaceAfter: 12 } },
    { text: "Why would anyone contribute to your project?", options: {} }
  ], { x: 8.8, y: 3.15, w: 3.65, h: 3.1, color: "CFE0E9", fontFace: F.body, fontSize: 14.5, valign: "top", margin: 0, lineSpacingMultiple: 1.04 });
  footer(s);
  s.addNotes("Draw the benefits out of the room where you can: contributors, feedback and trust (\"many eyes\"), reuse and reach, and longevity plus a public portfolio. Then use the navy discussion card to keep it honest — what's actually scary about building in public, whether \"given enough eyeballs, all bugs are shallow\" holds up, and the key founder question: why would anyone contribute to YOUR project? Let them wrestle with that last one. ~4-5 min.");

  // 4 Licenses — the big idea
  s = mk(); s.background = { color: C.white };
  header(s, "Licenses", "The one thing to remember");
  card(s, 0.6, 2.05, 12.1, 1.35, "FCF3E3");
  await iconCircle(s, FA.FaExclamationTriangle, 0.95, 2.38, 0.66, C.amber, C.white);
  s.addText([
    { text: "No license = all rights reserved.  ", options: { bold: true, color: C.ink } },
    { text: "Even public code on GitHub can't legally be used or modified until you add a license.", options: { color: C.ink } }
  ], { x: 1.85, y: 2.05, w: 10.6, h: 1.35, fontFace: F.body, fontSize: 17.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.04 });
  card(s, 0.6, 3.65, 5.95, 2.75, "EAF4EE");
  await iconCircle(s, FA.FaUnlockAlt, 0.9, 3.95, 0.6, C.green);
  s.addText("Permissive", { x: 1.65, y: 4.0, w: 4.6, h: 0.5, color: C.green, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
  s.addText("MIT, Apache-2.0, BSD — \"do almost anything, just keep my copyright notice.\"  Maximizes adoption.", { x: 0.98, y: 4.75, w: 5.35, h: 1.5, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0, lineSpacingMultiple: 1.05 });
  card(s, 6.75, 3.65, 5.95, 2.75, "E9F0F4");
  await iconCircle(s, FA.FaSyncAlt, 7.05, 3.95, 0.6, C.teal);
  s.addText("Copyleft", { x: 7.8, y: 4.0, w: 4.6, h: 0.5, color: C.tealDk, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
  s.addText("GPL, AGPL, LGPL — \"use and modify freely, but keep derivatives open under the same license.\"  Keeps the ecosystem open.", { x: 7.13, y: 4.75, w: 5.35, h: 1.5, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0, lineSpacingMultiple: 1.05 });
  footer(s);
  s.addNotes("The single most important takeaway of the day, so state it flatly: no license means all rights reserved; even public code on GitHub can't legally be reused or modified until you add one. Many students believe \"public equals free to use\" — correct that misconception directly. Then the two families: permissive (MIT, Apache, BSD — do almost anything, keep my notice — maximizes adoption) versus copyleft (GPL, AGPL — derivatives stay open — keeps the ecosystem open). ~3-4 min.");

  // 5 The three-column model
  s = mk(); s.background = { color: C.white };
  header(s, "How to read any license", "Permissions · Conditions · Limitations");
  const cols = [
    [FA.FaCheckCircle, "Permissions", C.green, "What you may do", ["Commercial use", "Modify", "Distribute", "Private use"]],
    [FA.FaClipboardCheck, "Conditions", C.teal, "What you must do", ["Include license & copyright notice", "Copyleft: disclose source + same license", "Apache: state your changes"]],
    [FA.FaBan, "Limitations", C.coral, "What's not granted", ["No liability", "No warranty", "No trademark rights"]]
  ];
  const cw = 3.95, cgx = 0.13;
  for (let i = 0; i < 3; i++) {
    const x = 0.6 + i * (cw + cgx);
    card(s, x, 2.15, cw, 4.05, C.cardBg);
    await iconCircle(s, cols[i][0], x + 0.28, 2.4, 0.64, cols[i][2]);
    s.addText(cols[i][1], { x: x + 1.05, y: 2.45, w: cw - 1.2, h: 0.55, color: cols[i][2], fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0 });
    s.addText(cols[i][3], { x: x + 0.3, y: 3.15, w: cw - 0.6, h: 0.35, color: C.slate, fontFace: F.body, fontSize: 13.5, italic: true, margin: 0 });
    s.addText(cols[i][4].map((t, j) => ({ text: t, options: { bullet: { indent: 15 }, breakLine: true, paraSpaceAfter: 11 } })), { x: x + 0.32, y: 3.55, w: cw - 0.62, h: 2.5, color: C.ink, fontFace: F.body, fontSize: 15, valign: "top", margin: 0, lineSpacingMultiple: 1.03 });
  }
  s.addText("This is exactly how choosealicense.com lays out every license — learn to read the three columns.", { x: 0.6, y: 6.4, w: 12.1, h: 0.35, color: C.slate, fontFace: F.body, fontSize: 13.5, italic: true, align: "center", margin: 0 });
  footer(s);
  s.addNotes("Teach them to READ any license instead of memorizing them: Permissions (what you may do), Conditions (what you must do), Limitations (what's not granted). This is exactly how choosealicense.com lays out every license, so once they know the three columns they can evaluate anything. Walk one license across the three columns as a worked example. ~3 min.");

  // 6 License comparison table
  s = mk(); s.background = { color: C.white };
  header(s, "The common licenses", "Pick for your goal");
  const tHead = ["LICENSE", "TYPE", "DERIVATIVES STAY OPEN?", "PATENT GRANT?", "BEST FOR"].map(h => ({ text: h, options: { fill: { color: C.teal }, color: C.white, bold: true, fontFace: F.body, fontSize: 12.5, valign: "middle" } }));
  const rows = [
    ["MIT", "Permissive", "No", "No", "Max adoption, simplicity"],
    ["Apache-2.0", "Permissive", "No", "Yes", "Permissive + patent protection"],
    ["GPL-3.0", "Copyleft", "Yes", "Yes", "Keep the whole project open"],
    ["AGPL-3.0", "Copyleft (network)", "Yes", "Yes", "Servers/SaaS stay open when hosted"]
  ];
  const tBody = rows.map((r, i) => {
    const z = i % 2 ? "EEF3F6" : C.white;
    return r.map((cell, j) => ({ text: cell, options: { fill: { color: z }, color: j === 0 ? C.tealDk : C.ink, bold: j === 0, fontFace: F.body, fontSize: 14, align: (j === 2 || j === 3) ? "center" : "left" } }));
  });
  s.addTable([tHead, ...tBody], { x: 0.6, y: 2.2, w: 12.1, colW: [1.9, 2.2, 2.9, 1.9, 3.2], rowH: 0.85, valign: "middle", margin: [4, 8, 4, 8], border: { type: "solid", color: "FFFFFF", pt: 2 } });
  s.addText("Full one-pager: resources/License-Cheat-Sheet.md — includes BSD, LGPL, MPL, and public domain.", { x: 0.6, y: 6.5, w: 12.1, h: 0.35, color: C.slate, fontFace: F.body, fontSize: 13, italic: true, align: "center", margin: 0 });
  footer(s);
  s.addNotes("Compare the four they'll actually consider: MIT, Apache-2.0, GPL-3.0, AGPL-3.0. Explain the patent-grant column carefully — code carries copyright AND possibly patents; MIT grants copyright but is SILENT on patents, so a contributor could later sue users over a patent on the code they contributed. Apache-2.0, GPL-3.0, and AGPL-3.0 include an explicit patent grant (each contributor licenses the patents needed to use their contribution), and Apache adds patent retaliation (sue the project over a patent and your license ends). Practical takeaway: want enterprise adoption or to shield your users? Apache-2.0 is a plus; a small personal project? MIT is fine. This is general background, not legal advice — point them to the full cheat sheet. ~4 min.");

  // 7 Hands-on: pick a license
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: 11.4, y: -1.3, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  s.addShape(pres.shapes.OVAL, { x: 0.62, y: 0.6, w: 0.15, h: 0.15, fill: { color: C.amber } });
  s.addText("IN-CLASS · 3 MINUTES", { x: 0.87, y: 0.5, w: 11.5, h: 0.34, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText("Pick a license for your idea", { x: 0.6, y: 0.9, w: 12.1, h: 0.8, color: C.white, fontFace: F.head, fontSize: 34, bold: true, margin: 0 });
  s.addText("Open choosealicense.com. For your most promising candidate idea, jot down:", { x: 0.6, y: 2.05, w: 12, h: 0.5, color: "CFE0E9", fontFace: F.body, fontSize: 18, margin: 0 });
  const jots = [
    ["1", "The license", "Which one did you pick?"],
    ["2", "Why", "Adoption (permissive) or keep-it-open (copyleft)?"],
    ["3", "One requirement", "One thing it asks of people who use your code."]
  ];
  for (let i = 0; i < 3; i++) {
    const x = 0.6 + i * (3.97 + 0.1);
    card(s, x, 2.75, 3.97, 2.5, "1E3352");
    s.addShape(pres.shapes.OVAL, { x: x + 0.3, y: 3.0, w: 0.7, h: 0.7, fill: { color: C.amber } });
    s.addText(jots[i][0], { x: x + 0.3, y: 3.0, w: 0.7, h: 0.7, color: C.navy, fontFace: F.head, fontSize: 24, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(jots[i][1], { x: x + 0.3, y: 3.85, w: 3.4, h: 0.45, color: C.white, fontFace: F.body, fontSize: 18, bold: true, margin: 0 });
    s.addText(jots[i][2], { x: x + 0.3, y: 4.3, w: 3.45, h: 0.85, color: "CFE0E9", fontFace: F.body, fontSize: 14, margin: 0, lineSpacingMultiple: 1.04 });
  }
  s.addText("Then turn to a neighbor: \"What did you pick, and why?\"", { x: 0.6, y: 5.6, w: 12.1, h: 0.5, color: C.amber, fontFace: F.body, fontSize: 16, italic: true, bold: true, align: "center", margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("A quick three-minute individual exercise — open choosealicense.com and, for their most promising candidate idea, jot down the license, the why (adoption vs. keep-it-open), and one requirement it imposes. Then a fast neighbor turn-and-talk: \"what did you pick, and why?\" Take one or two aloud. Tell them this primes the License/OSS short response. ~4-5 min.");

  // 8 Governance — what & why
  s = mk(); s.background = { color: C.white };
  header(s, "Governance", "What turns cool code into a project people can join");
  card(s, 0.6, 2.15, 12.1, 1.7, C.cardBg);
  await iconCircle(s, FA.FaSitemap, 1.0, 2.62, 0.72, C.teal);
  s.addText("Governance = the rules and expectations that let strangers contribute safely — the license, the code of conduct, the contribution process, and who decides. Without it, even great code stays a solo repo.", { x: 2.0, y: 2.15, w: 10.4, h: 1.7, color: C.ink, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
  card(s, 0.6, 4.15, 12.1, 2.05, C.navy);
  await iconCircle(s, FA.FaUserFriends, 1.0, 4.75, 0.72, C.amber, C.navy);
  s.addText("A contributor's-eye view", { x: 2.0, y: 4.35, w: 10, h: 0.5, color: C.amber, fontFace: F.body, fontSize: 17, bold: true, margin: 0 });
  s.addText("\"I'd like to help with this project… but do I know how to contribute? What's expected of me? And am I even allowed to use this?\"  Good governance answers all three before they have to ask.", { x: 2.0, y: 4.9, w: 10.4, h: 1.2, color: "CFE0E9", fontFace: F.body, fontSize: 16, valign: "top", margin: 0, lineSpacingMultiple: 1.05 });
  footer(s);
  s.addNotes("Define governance plainly: the rules and expectations that let strangers contribute safely — the license, the code of conduct, the contribution process, and who decides. Without it, even great code stays a solo repo. Use the contributor's-eye view to make it visceral: a would-be helper asks \"do I know how to contribute? what's expected of me? am I even allowed to use this?\" — good governance answers all three before they have to ask. ~3 min.");

  // 9 Governance — strong vs weak
  s = mk(); s.background = { color: C.white };
  header(s, "Governance", "Strong vs. early-stage — side by side");
  card(s, 0.6, 2.15, 5.95, 4.25, "EAF4EE");
  await iconCircle(s, FA.FaCheckCircle, 0.9, 2.45, 0.62, C.green);
  s.addText("Strong", { x: 1.68, y: 2.5, w: 4.5, h: 0.5, color: C.green, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "README that onboards + \"how to contribute\"", options: { bullet: { indent: 15 }, breakLine: true, paraSpaceAfter: 9 } },
    { text: "LICENSE, CONTRIBUTING, CODE_OF_CONDUCT", options: { bullet: { indent: 15 }, breakLine: true, paraSpaceAfter: 9 } },
    { text: "Issue / PR templates", options: { bullet: { indent: 15 }, breakLine: true, paraSpaceAfter: 9 } },
    { text: "Labeled good-first-issues + a roadmap", options: { bullet: { indent: 15 }, breakLine: true, paraSpaceAfter: 9 } },
    { text: "Responsive maintainers, clear channel", options: { bullet: { indent: 15 } } }
  ], { x: 0.98, y: 3.3, w: 5.35, h: 3.0, color: C.ink, fontFace: F.body, fontSize: 15, valign: "top", margin: 0 });
  card(s, 6.75, 2.15, 5.95, 4.25, "FBECE8");
  await iconCircle(s, FA.FaTimesCircle, 7.05, 2.45, 0.62, C.coral);
  s.addText("Early-stage / incomplete", { x: 7.83, y: 2.5, w: 4.7, h: 0.5, color: C.coral, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "Just code + a bare README", options: { bullet: { indent: 15 }, breakLine: true, paraSpaceAfter: 9 } },
    { text: "No LICENSE — legally not reusable", options: { bullet: { indent: 15 }, breakLine: true, paraSpaceAfter: 9 } },
    { text: "No CONTRIBUTING — newcomers are lost", options: { bullet: { indent: 15 }, breakLine: true, paraSpaceAfter: 9 } },
    { text: "No code of conduct, no templates", options: { bullet: { indent: 15 }, breakLine: true, paraSpaceAfter: 9 } },
    { text: "Stale, unanswered issues", options: { bullet: { indent: 15 } } }
  ], { x: 7.13, y: 3.3, w: 5.35, h: 3.0, color: C.ink, fontFace: F.body, fontSize: 15, valign: "top", margin: 0 });
  footer(s);
  s.addNotes("Put the two side by side. Strong: a README that onboards plus how-to-contribute, LICENSE/CONTRIBUTING/CODE_OF_CONDUCT, issue and PR templates, labeled good-first-issues and a roadmap, responsive maintainers. Early-stage: just code and a bare README, no license (not reusable), no CONTRIBUTING (newcomers are lost), no code of conduct or templates, stale issues. Frame the right column as \"early-stage,\" not \"bad\" — it's where everyone starts, and closing that gap is what the course is about. ~3 min.");

  // 10 Governance — the founder's choices
  s = mk(); s.background = { color: C.white };
  header(s, "The founder's choices", "Six calls you make as maintainer");
  const gov = [
    [FA.FaEye, "Visibility", "Public from day one, or later?"],
    [FA.FaHandshake, "Code of conduct", "How people treat each other."],
    [FA.FaCodeBranch, "Contribution process", "Issues, PRs, review, \"done.\""],
    [FA.FaUserCog, "Maintainer expectations", "Responsiveness, who reviews."],
    [FA.FaBullhorn, "Communication", "Where discussion happens."],
    [FA.FaGavel, "Decision-making", "Solo call vs. small council."]
  ];
  const gw = 3.95, ggx = 0.13, gh = 1.5;
  for (let i = 0; i < 6; i++) {
    const col = i % 3, row = Math.floor(i / 3);
    const x = 0.6 + col * (gw + ggx), y = 2.1 + row * (gh + 0.18);
    card(s, x, y, gw, gh, C.cardBg);
    await iconCircle(s, gov[i][0], x + 0.25, y + 0.25, 0.6, C.teal);
    s.addText(gov[i][1], { x: x + 1.0, y: y + 0.22, w: gw - 1.15, h: 0.6, color: C.ink, fontFace: F.body, fontSize: 17, bold: true, valign: "middle", margin: 0 });
    s.addText(gov[i][2], { x: x + 0.28, y: y + 0.92, w: gw - 0.5, h: 0.5, color: C.slate, fontFace: F.body, fontSize: 14, margin: 0 });
  }
  card(s, 0.6, 5.6, 12.1, 0.85, C.navy);
  s.addText([
    { text: "Lead as sponsor:  ", options: { color: C.amber, bold: true } },
    { text: "you set these norms and steward the project — you're building the place others come to build.", options: { color: C.white } }
  ], { x: 0.9, y: 5.6, w: 11.5, h: 0.85, fontFace: F.body, fontSize: 15.5, valign: "middle", align: "center", margin: 0 });
  footer(s);
  s.addNotes("The six calls they'll actually make as maintainer: visibility, code of conduct, contribution process, maintainer expectations, communication channel, and decision-making (solo call vs. small council). Stress there's no single right answer — the point is to decide deliberately rather than by default. Land the banner: leading as sponsor means setting these norms and stewarding the project — building the place others come to build. ~3 min.");

  // 11 Activity — license + governance
  s = mk(); s.background = { color: C.white };
  header(s, "The main activity", "Decide license + governance for a real project");
  card(s, 0.6, 2.1, 12.1, 1.5, C.cardBg);
  await iconCircle(s, FA.FaUsers, 1.0, 2.45, 0.7, C.teal);
  s.addText([
    { text: "In small groups: ", options: { bold: true, color: C.ink } },
    { text: "take one member's candidate idea (or a back-pocket one). Decide (a) which license, and (b) three governance choices — and why.", options: { color: C.ink } }
  ], { x: 2.0, y: 2.1, w: 10.4, h: 1.5, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
  card(s, 0.6, 3.85, 5.95, 2.5, "EAF4EE");
  await iconCircle(s, FA.FaBalanceScale, 0.9, 4.15, 0.6, C.green);
  s.addText("Decide", { x: 1.65, y: 4.2, w: 4.5, h: 0.5, color: C.green, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
  s.addText("A license + three governance calls, with the reasoning. Share one of each with the room.", { x: 0.98, y: 4.95, w: 5.35, h: 1.3, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0, lineSpacingMultiple: 1.05 });
  card(s, 6.75, 3.85, 5.95, 2.5, "E9F0F4");
  await iconCircle(s, FA.FaClipboardCheck, 7.05, 4.15, 0.6, C.teal);
  s.addText("Or audit a repo", { x: 7.8, y: 4.2, w: 4.7, h: 0.5, color: C.tealDk, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
  s.addText("Take a real repo and audit its governance against the checklist. What would you keep or change?", { x: 7.13, y: 4.95, w: 5.35, h: 1.3, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0, lineSpacingMultiple: 1.05 });
  footer(s);
  s.addNotes("The main activity. In small groups, take one member's candidate idea and decide (a) a license and (b) three governance choices, with reasoning, then share one of each with the room. Offer the alternative for groups who prefer it: audit a real repo's governance against the checklist — what would you keep or change? Circulate and push for the WHY behind every call. ~12-15 min.");

  // 12 Deliverable
  s = mk(); s.background = { color: "0E7C7B" };
  s.addShape(pres.shapes.OVAL, { x: 11.2, y: -1.2, w: 3.6, h: 3.6, fill: { color: "127D7C" } });
  s.addText("YOUR DELIVERABLE", { x: 0.7, y: 0.55, w: 11, h: 0.35, color: "BFE7E4", fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText("License / OSS short response", { x: 0.68, y: 0.95, w: 12, h: 0.8, color: C.white, fontFace: F.head, fontSize: 34, bold: true, margin: 0 });
  card(s, 0.6, 2.2, 12.1, 3.9, C.white);
  await iconCircle(s, FA.FaFileContract, 0.95, 2.55, 0.7, C.teal);
  s.addText("In about one page", { x: 2.0, y: 2.6, w: 10, h: 0.55, color: C.ink, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "Pick a license for the project you're imagining, and name it.", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 12 } },
    { text: "Explain in plain terms what it lets others do (and not do), and why it fits your goals.", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 12 } },
    { text: "Name one governance choice you'd make (e.g., code of conduct, contribution process) and why.", options: { bullet: { indent: 16 } } }
  ], { x: 1.15, y: 3.5, w: 11.2, h: 2.4, color: C.ink, fontFace: F.body, fontSize: 16.5, valign: "top", margin: 0 });
  s.addText("Reference: resources/License-Cheat-Sheet.md · choosealicense.com", { x: 0.6, y: 6.25, w: 12.1, h: 0.4, color: "BFE7E4", fontFace: F.body, fontSize: 14, italic: true, align: "center", margin: 0 });
  s.addNotes("Walk through the License/OSS short response — about one page: pick and name a license for the project they're imagining, explain in plain terms what it lets others do and not do and why it fits their goals, and name one governance choice they'd make and why. Point them to the cheat sheet and choosealicense.com. Confirm the due date aloud (Mon, Sep 21) so it matches the LMS. ~2 min.");

  // 13 Wrap
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: -1.3, y: 5.2, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaUnlockAlt, 0.9, 1.35, 0.9, C.amber, C.navy);
  s.addText("Building in the open is how a project\nbecomes something others can join.", { x: 0.9, y: 2.4, w: 11.8, h: 1.6, color: C.white, fontFace: F.head, fontSize: 30, bold: true, margin: 0, lineSpacingMultiple: 1.05 });
  s.addText("BEFORE NEXT CLASS — WED, SEP 16", { x: 0.92, y: 4.4, w: 11, h: 0.35, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText([
    { text: "Read the Session 4 discovery readings (see the Session 4 page)", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Keep feeding your idea journal — next up: talking to real users", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Write your License / OSS short response — due Mon, Sep 21", options: { bullet: { indent: 16 } } }
  ], { x: 0.95, y: 4.82, w: 11.7, h: 1.6, color: "CBD8E6", fontFace: F.body, fontSize: 16.5, valign: "top", margin: 0 });
  s.addNotes("Close on the through-line: building in the open is how a project becomes something others can join. Before Wednesday's discovery workshop: the Session 4 readings and keep feeding the journal. The License/OSS short response is due Mon, Sep 21 (Week 3) — say the date aloud so it matches the LMS. Preview Wednesday — talking to real users, where the discovery assignment kicks off. ~1-2 min.");

  const OUT = "Session03-OpenSource.pptx";
  await pres.writeFile({ fileName: OUT });
  console.log("WROTE", PAGE, "slides");
  try {
    const { verifyDeck, reportText } = require("./verify-deck.js");
    console.log(reportText(await verifyDeck(OUT)));
  } catch (e) { console.warn("verify-deck skipped:", e.message); }
}
build().catch(e => { console.error(e); process.exit(1); });
