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
pres.title = "CS 301R — Session 4 — Discovery Workshop";

let PAGE = 0;
function mk() { PAGE++; return pres.addSlide(); }
function footer(slide, col) {
  const c = col || C.slate;
  slide.addText("CS 301R · Session 4 · Discovery Workshop", { x: 7.8, y: 7.04, w: 4.9, h: 0.3, align: "right", color: c, fontFace: F.body, fontSize: 10, margin: 0 });
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
  await iconCircle(s, FA.FaComments, 0.9, 1.45, 1.0, C.amber, C.navy);
  s.addText("CS 301R · SOFTWARE ENGINEERING STUDIO I", { x: 0.92, y: 2.75, w: 11, h: 0.35, color: "9FB4C7", fontFace: F.body, fontSize: 15, bold: true, charSpacing: 2, margin: 0 });
  s.addText("Discovery Workshop: Talking to Users", { x: 0.9, y: 3.15, w: 12.1, h: 1.3, color: C.white, fontFace: F.head, fontSize: 42, bold: true, margin: 0 });
  s.addText([
    { text: "Session 4 — Needfinding in Action", options: { color: C.amber, bold: true, breakLine: true } },
    { text: "Wednesday, September 16, 2026", options: { color: "9FB4C7" } }
  ], { x: 0.92, y: 4.7, w: 11, h: 0.9, fontFace: F.body, fontSize: 19, margin: 0, lineSpacingMultiple: 1.2 });
  s.addNotes("Our first true workshop, and the first session with pre-reading — so mostly doing, not lecturing. Frame the day up front: today you learn to talk to users without fooling yourself, you practice it here in class, and then you take it to real people during the week. Keep energy high and your own talking short — model the very skill we're teaching. Check that they did the reading (Mom Test summary + NN/g); a quick show of hands is fine.");

  // 2 Bridge
  s = mk(); s.background = { color: C.white };
  header(s, "Where we are", "From generating problems to investigating them");
  card(s, 0.6, 2.05, 5.95, 3.7, C.cardBg);
  await iconCircle(s, FA.FaExchangeAlt, 0.9, 2.35, 0.66, C.teal);
  s.addText("From Session 2", { x: 1.72, y: 2.42, w: 4.6, h: 0.5, color: C.ink, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
  s.addText("You generated a big pool of candidate problems. Right now, most of them are guesses.", { x: 0.98, y: 3.3, w: 5.35, h: 2.3, color: C.ink, fontFace: F.body, fontSize: 16.5, valign: "top", margin: 0, lineSpacingMultiple: 1.06 });
  card(s, 6.75, 2.05, 5.95, 3.7, C.navy);
  await iconCircle(s, FA.FaSearch, 7.05, 2.35, 0.66, C.amber, C.navy);
  s.addText("Today", { x: 7.87, y: 2.42, w: 4.6, h: 0.5, color: C.white, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
  s.addText("Learn to find out which problems are real by talking to people — without hearing only what you want to hear.", { x: 7.1, y: 3.3, w: 5.35, h: 2.3, color: "CFE0E9", fontFace: F.body, fontSize: 16.5, valign: "top", margin: 0, lineSpacingMultiple: 1.06 });
  footer(s);
  s.addNotes("Two-minute bridge. Remind them the founder's hardest and most important job is understanding a real user's need well enough to speak for it — that's the sponsor role we keep coming back to. The pool from Session 2 is raw material; today we start separating real problems from plausible-sounding guesses. Everything today feeds the Discovery Notes assignment and, after that, the Product Definition Brief.");

  // 3 The validation trap
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: 0.62, y: 0.6, w: 0.15, h: 0.15, fill: { color: C.amber } });
  s.addText("WHY DISCOVERY IS HARD", { x: 0.87, y: 0.5, w: 11.5, h: 0.34, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText("The validation trap", { x: 0.6, y: 0.9, w: 12.1, h: 0.8, color: C.white, fontFace: F.head, fontSize: 34, bold: true, margin: 0 });
  s.addText("Ask \"would you use this?\" and people say \"yes\" — to be nice.", { x: 0.9, y: 2.35, w: 11.5, h: 1.3, color: C.white, fontFace: F.head, fontSize: 27, bold: true, italic: true, margin: 0, lineSpacingMultiple: 1.06 });
  s.addText("So you walk away with validation instead of the truth — and build something nobody actually needs. The Mom Test is a set of habits that get you the truth anyway.", { x: 0.9, y: 4.0, w: 11.4, h: 1.6, color: "CFE0E9", fontFace: F.body, fontSize: 18, valign: "top", margin: 0, lineSpacingMultiple: 1.08 });
  s.addNotes("Make it vivid: if you ask a friend whether your idea is good, they hear 'please say yes so you don't hurt my feelings.' Compliments feel like progress but are just politeness. The name 'Mom Test' comes from the goal of asking questions so grounded in facts that even your mom couldn't accidentally mislead you. Land the stakes: false validation is expensive — it's how people spend a semester (or years) building something nobody wants. Then transition: here are the three rules that fix it.");

  // 4 The three Mom Test rules
  s = mk(); s.background = { color: C.white };
  header(s, "The Mom Test", "Three rules for getting the truth");
  const rules = [
    ["1", "Talk about their life, not your idea", "Keep your idea in your pocket. Ask how they handle it today, what's annoying, what they've tried."],
    ["2", "Specifics in the past, not hypotheticals", "\"Tell me about the last time you…\" beats \"Would you…?\" People can't predict their own future."],
    ["3", "Talk less, listen more", "Every minute you talk is a minute you're not learning — and a minute you might lead them."]
  ];
  for (let i = 0; i < 3; i++) {
    const y = 2.1 + i * 1.42;
    card(s, 0.6, y, 12.1, 1.28, C.cardBg);
    s.addShape(pres.shapes.OVAL, { x: 0.9, y: y + 0.29, w: 0.7, h: 0.7, fill: { color: C.teal } });
    s.addText(rules[i][0], { x: 0.9, y: y + 0.29, w: 0.7, h: 0.7, color: C.white, fontFace: F.head, fontSize: 26, bold: true, align: "center", valign: "middle", margin: 0 });
    s.addText(rules[i][1], { x: 1.85, y: y + 0.2, w: 10.5, h: 0.45, color: C.ink, fontFace: F.body, fontSize: 19, bold: true, margin: 0 });
    s.addText(rules[i][2], { x: 1.85, y: y + 0.68, w: 10.6, h: 0.5, color: C.slate, fontFace: F.body, fontSize: 14.5, margin: 0 });
  }
  footer(s);
  s.addNotes("This is the anchor slide — spend real time here. Rule 1: the moment you describe your idea, they flip into supportive-friend mode and react to your solution instead of describing their world; you're a detective, not a salesperson. Rule 2: give the exercise example — 'Do you exercise regularly?' gets a hopeful 'I try to,' but 'Walk me through your workouts this past week' gets the truth. Past behavior is the only reliable evidence. Rule 3: aim to have them talking ~80% of the time; ask a short question, then be quiet. Tell them these three rules are the whole game — everything else is technique.");

  // 5 Watch-fors & real signals
  s = mk(); s.background = { color: C.white };
  header(s, "Reading the conversation", "Fluff vs. real signals");
  card(s, 0.6, 2.15, 5.95, 4.2, "FBECE8");
  await iconCircle(s, FA.FaVolumeMute, 0.9, 2.45, 0.6, C.coral);
  s.addText("Ignore or redirect", { x: 1.65, y: 2.5, w: 4.6, h: 0.5, color: C.coral, fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "\"Cool idea!\" — compliments are fluff, not data", options: { bullet: { indent: 15 }, breakLine: true, paraSpaceAfter: 11 } },
    { text: "\"I usually / always…\" — a generic; ask for the last actual time", options: { bullet: { indent: 15 }, breakLine: true, paraSpaceAfter: 11 } },
    { text: "\"I would definitely…\" — a hypothetical; ask what they do now", options: { bullet: { indent: 15 } } }
  ], { x: 0.98, y: 3.3, w: 5.35, h: 2.9, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0 });
  card(s, 6.75, 2.15, 5.95, 4.2, "EAF4EE");
  await iconCircle(s, FA.FaBolt, 7.05, 2.45, 0.6, C.green);
  s.addText("Real signals (gold)", { x: 7.83, y: 2.5, w: 4.7, h: 0.5, color: C.green, fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "They already spend time or money on it", options: { bullet: { indent: 15 }, breakLine: true, paraSpaceAfter: 11 } },
    { text: "They've built a workaround of their own", options: { bullet: { indent: 15 }, breakLine: true, paraSpaceAfter: 11 } },
    { text: "They get visibly frustrated or emotional", options: { bullet: { indent: 15 }, breakLine: true, paraSpaceAfter: 11 } },
    { text: "They ask you to follow up (\"email me!\")", options: { bullet: { indent: 15 } } }
  ], { x: 7.13, y: 3.3, w: 5.35, h: 2.9, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0 });
  footer(s);
  s.addNotes("This is real-time listening skill. Left column: the things that feel encouraging but carry no information — teach them to notice a compliment and mentally discard it, and to catch 'usually/always/I would' and redirect to a specific, recent instance. Right column: what actually counts as evidence, because each one cost the person something — money, effort, emotion, or a commitment to follow up. Give a quick example: someone who keeps a messy spreadsheet to track a thing has just proven the problem is real and valuable. Tell them: in the practice round, the observer should be listening for exactly these.");

  // 6 Good vs leading questions
  s = mk(); s.background = { color: C.white };
  header(s, "Interview craft", "From leading to learning");
  const tHead = [{ text: "Instead of (leading)", options: { fill: { color: C.coral }, color: C.white, bold: true, fontFace: F.body, fontSize: 14.5 } }, { text: "Ask (learning)", options: { fill: { color: C.green }, color: C.white, bold: true, fontFace: F.body, fontSize: 14.5 } }];
  const qrows = [
    ["\"Would you use an app that does X?\"", "\"Tell me about the last time you dealt with [problem].\""],
    ["\"Do you think this is a good idea?\"", "\"How do you handle this today?\""],
    ["\"Do you usually…?\"", "\"Walk me through the last time you did…\""],
    ["\"How much would you pay for this?\"", "\"What do you currently spend (time/money) on this?\""],
    ["\"Does this problem bother you?\"", "\"When did this last cost you time or money?\""]
  ];
  const tBody = qrows.map((r, i) => {
    const z = i % 2 ? "F4F1F0" : C.white;
    return [
      { text: r[0], options: { fill: { color: z }, color: C.slate, italic: true, fontFace: F.body, fontSize: 14.5 } },
      { text: r[1], options: { fill: { color: z }, color: C.ink, bold: true, fontFace: F.body, fontSize: 14.5 } }
    ];
  });
  s.addTable([tHead, ...tBody], { x: 0.6, y: 2.15, w: 12.1, colW: [5.6, 6.5], rowH: 0.66, valign: "middle", margin: [4, 10, 4, 10], border: { type: "solid", color: "FFFFFF", pt: 2 } });
  card(s, 0.6, 6.05, 12.1, 0.75, C.navy);
  s.addText([
    { text: "Follow-up moves:  ", options: { color: C.amber, bold: true } },
    { text: "\"Walk me through the last time…\"  ·  \"How do you handle it now?\"  ·  \"Why?\"  ·  then be quiet.", options: { color: C.white } }
  ], { x: 0.9, y: 6.05, w: 11.5, h: 0.75, fontFace: F.body, fontSize: 14.5, valign: "middle", align: "center", margin: 0 });
  footer(s);
  s.addNotes("Work through 3-4 rows out loud — read the leading version, ask the room why it fails, then the learning version. The pattern to name: leading questions ask about the future or your idea; good questions ask about real, past behavior. The 'how much would you pay' row is worth dwelling on — asking price is a classic trap; asking what they already spend is honest. The bottom bar is the toolkit for the practice round: anchor to the last real instance, surface the current workaround, dig with 'why,' and use silence. This is the handout they'll have in hand during practice.");

  // 7 Consent & ethics
  s = mk(); s.background = { color: C.white };
  header(s, "Talking to real people", "Consent & ethics");
  card(s, 0.6, 2.05, 7.35, 4.35, C.cardBg);
  await iconCircle(s, FA.FaShieldAlt, 0.9, 2.35, 0.62, C.teal);
  s.addText("The norms", { x: 1.68, y: 2.4, w: 5.9, h: 0.5, color: C.ink, fontFace: F.body, fontSize: 19, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "Ask permission and say why", options: { bullet: { indent: 15 }, breakLine: true, paraSpaceAfter: 9 } },
    { text: "Be honest — you're learning, not selling", options: { bullet: { indent: 15 }, breakLine: true, paraSpaceAfter: 9 } },
    { text: "No recording without permission", options: { bullet: { indent: 15 }, breakLine: true, paraSpaceAfter: 9 } },
    { text: "Respect their time and their \"no\"", options: { bullet: { indent: 15 }, breakLine: true, paraSpaceAfter: 9 } },
    { text: "Protect privacy — anonymize your notes", options: { bullet: { indent: 15 }, breakLine: true, paraSpaceAfter: 9 } },
    { text: "Sensitive topics? Check with me first", options: { bullet: { indent: 15 } } }
  ], { x: 0.98, y: 3.2, w: 6.85, h: 3.1, color: C.ink, fontFace: F.body, fontSize: 15, valign: "top", margin: 0 });
  card(s, 8.15, 2.05, 4.55, 4.35, C.navy);
  await iconCircle(s, FA.FaQuoteLeft, 8.45, 2.35, 0.55, C.amber, C.navy);
  s.addText("A consent script", { x: 9.2, y: 2.4, w: 3.3, h: 0.5, color: C.white, fontFace: F.body, fontSize: 17, bold: true, valign: "middle", margin: 0 });
  s.addText("\"I'm a student learning about [problem] — can I ask you a few questions? About 10 minutes. You can skip anything or stop anytime. Okay if I take a few notes?\"", { x: 8.45, y: 3.2, w: 4.05, h: 2.4, color: "CFE0E9", fontFace: F.body, fontSize: 15.5, italic: true, valign: "top", margin: 0, lineSpacingMultiple: 1.08 });
  footer(s);
  s.addNotes("Emphasize this is not bureaucratic — treating people well gets you better information, and you'll do this for years. Make the key point from the ethics reading: this is a classroom project, not 'research' in BYU's sense, so no IRB is needed — BUT ethics still fully apply, and if anyone later wants to publish or make generalizable claims, that DOES require IRB approval first, so talk to me. Flag the power-imbalance issue (don't lean on people who feel they can't say no). Read the consent script aloud and tell them to actually use something like it. Point them to resources/Interview-Ethics-for-Students.md.");

  // 8 Mock interviews (activity)
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: 11.4, y: -1.3, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  s.addShape(pres.shapes.OVAL, { x: 0.62, y: 0.6, w: 0.15, h: 0.15, fill: { color: C.amber } });
  s.addText("IN-CLASS ACTIVITY · ~24 MIN", { x: 0.87, y: 0.5, w: 11.5, h: 0.34, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText("Mock interviews — three rounds", { x: 0.6, y: 0.9, w: 12.1, h: 0.8, color: C.white, fontFace: F.head, fontSize: 32, bold: true, margin: 0 });
  const roles = [
    [FA.FaCommentDots, "Interviewer", "Good questions only. No pitching, no solutions."],
    [FA.FaUser, "User", "Answer truthfully from your own life."],
    [FA.FaClipboardList, "Observer", "Tally leading questions; capture the real needs."]
  ];
  for (let i = 0; i < 3; i++) {
    const x = 0.6 + i * (3.97 + 0.1);
    card(s, x, 2.1, 3.97, 2.05, "1E3352");
    await iconCircle(s, roles[i][0], x + 0.3, 2.35, 0.6, C.amber, C.navy);
    s.addText(roles[i][1], { x: x + 1.05, y: 2.4, w: 2.8, h: 0.55, color: C.white, fontFace: F.body, fontSize: 18, bold: true, valign: "middle", margin: 0 });
    s.addText(roles[i][2], { x: x + 0.3, y: 3.1, w: 3.4, h: 0.9, color: "CFE0E9", fontFace: F.body, fontSize: 13.5, valign: "top", margin: 0, lineSpacingMultiple: 1.04 });
  }
  s.addText([
    { text: "Rotate roles each round so everyone interviews once.", options: { bullet: { indent: 15 }, breakLine: true, paraSpaceAfter: 8, color: C.white } },
    { text: "Each round ~6 min: ~5 min interview + ~1 min rotate & jot.", options: { bullet: { indent: 15 }, breakLine: true, paraSpaceAfter: 8, color: C.white } },
    { text: "\"User\" picks a real problem they actually have (prompt cards).", options: { bullet: { indent: 15 }, color: C.white } }
  ], { x: 0.95, y: 4.5, w: 11.6, h: 1.9, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0 });
  footer(s, "7E92A8");
  s.addNotes("This is the heart of the session — protect the time. Form triads quickly (a group of four can add a second observer). Hand out the prompt cards; each person, when it's their turn to be 'user,' picks a real problem they genuinely have and answers honestly. Keep it strict: interviewers may NOT pitch or propose solutions — only ask about the user's life and past behavior. Call the rotations yourself with the timer so all three rounds happen (that's why it's three rounds, not two — three roles). Circulate and gently flag leading questions you overhear. Save ~4 minutes at the end to debrief as a class: which leading questions slipped in, what real need surprised you, what was the hardest habit to break. If you're short on time, cut to two rounds rather than skipping the debrief. One more thing to flag: because the User picks the topic, the Interviewer starts cold — point them to the interviewer FUNNEL on the prompt card (open the area, get the last real instance, follow the workaround, ask 'why' 2-3 times, then reflect it back). That funnel plus the reflect-back move is how they reach the real, unspoken problem in five minutes on a topic they knew nothing about.");

  // 9 Personas — honest documentation
  s = mk(); s.background = { color: C.white };
  header(s, "When you can't reach a real user", "Build an honest persona");
  card(s, 0.6, 2.1, 12.1, 1.5, C.cardBg);
  await iconCircle(s, FA.FaUserEdit, 1.0, 2.55, 0.7, C.teal);
  s.addText("A persona here is NOT an invented character — it's a summary of what you actually found, with every claim labeled.", { x: 2.0, y: 2.1, w: 10.4, h: 1.5, color: C.ink, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
  s.addText("\"Documented honestly\" means:", { x: 0.6, y: 3.85, w: 12, h: 0.4, color: C.tealDk, fontFace: F.body, fontSize: 16, bold: true, margin: 0 });
  s.addText([
    { text: "Tag every claim: [E] evidence (with a source) or [A] assumption (a labeled guess)", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 11 } },
    { text: "No invented facts — a guess is marked [A], never dressed up as fact", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 11 } },
    { text: "List your sources, and the top assumptions you'd verify in a real conversation", options: { bullet: { indent: 16 } } }
  ], { x: 1.0, y: 4.3, w: 11.5, h: 2.0, color: C.ink, fontFace: F.body, fontSize: 16, valign: "top", margin: 0 });
  footer(s);
  s.addNotes("Set expectations first: the real conversation is required (next slides / the assignment); the persona is a supplement for needs you can't reach directly — and everyone builds one, for the experience. The whole point is intellectual honesty: separating what you actually know from what you're guessing. The [E]/[A] tagging is the mechanism. Keep it modest — about an hour of gathering readily-available evidence, not a research project. Then transition: let's look at a good one and a bad one.");

  // 10 Persona example — setup
  s = mk(); s.background = { color: C.white };
  header(s, "Persona example — setup", "Two personas for the same need");
  card(s, 0.6, 2.1, 12.1, 1.95, C.cardBg);
  await iconCircle(s, FA.FaCarSide, 1.0, 2.62, 0.7, C.teal);
  s.addText([
    { text: "The scenario:  ", options: { bold: true, color: C.ink } },
    { text: "you're exploring a commuter-parking problem for students, but you haven't reached a real commuter yet. So you sketch a persona as a working hypothesis — a stand-in that tells you where to dig next.", options: { color: C.ink } }
  ], { x: 2.0, y: 2.1, w: 10.4, h: 1.95, fontFace: F.body, fontSize: 17, valign: "middle", margin: 0, lineSpacingMultiple: 1.06 });
  card(s, 0.6, 4.3, 12.1, 2.1, C.navy);
  await iconCircle(s, FA.FaBalanceScale, 1.0, 4.9, 0.7, C.amber, C.navy);
  s.addText("What's coming — and what to watch for", { x: 2.0, y: 4.45, w: 10, h: 0.5, color: C.amber, fontFace: F.body, fontSize: 17, bold: true, margin: 0 });
  s.addText("Next are two attempts at that same persona — same topic on purpose, so the only difference is the method. As each appears, ask yourself: could I trust this? What here is real evidence, and what's just a guess?", { x: 2.0, y: 5.0, w: 10.4, h: 1.3, color: "CFE0E9", fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0, lineSpacingMultiple: 1.06 });
  footer(s);
  s.addNotes("This sets up the two examples so they don't appear out of nowhere. Give the scenario: you have a candidate need (commuter parking) but haven't interviewed a real commuter yet, so you build a persona as a working hypothesis that tells you what to go verify. Stress that BOTH upcoming personas are the same persona, same topic, on purpose — so the only variable is how it was made. Prime the compare: as each appears, ask 'could I trust this, and what's evidence vs. guess?' Don't reveal which is which yet — let the Busy Ben slide land the contrast.");

  // 10 Honest persona example (Cara)
  s = mk(); s.background = { color: C.white };
  header(s, "Persona example — honest", "\"Commuter Cara\" (evidence-tagged)");
  card(s, 0.6, 2.05, 12.1, 3.35, "EAF4EE");
  s.addText([
    { text: "Who:  ", options: { bold: true } }, { text: "[E] off-campus student who drives to campus (r/byu threads; my lot observation).  [A] likely a soph/junior with a job.\n", options: {} },
    { text: "Problem:  ", options: { bold: true } }, { text: "[E] a mid-morning spot is unpredictable and eats time (forum posts; a friend).  [A] makes her late to class.\n", options: {} },
    { text: "Today:  ", options: { bold: true } }, { text: "[E] arrives 30–45 min early to \"camp,\" or circles the lot.\n", options: {} },
    { text: "Costs:  ", options: { bold: true } }, { text: "[E] ~30 min/day + real frustration.\n", options: {} },
    { text: "\"Better\":  ", options: { bold: true } }, { text: "[A] real-time spot availability — my hypothesis, not a user's.", options: {} }
  ], { x: 0.95, y: 2.25, w: 11.4, h: 2.6, color: C.ink, fontFace: F.body, fontSize: 15.5, valign: "top", margin: 0, lineSpacingMultiple: 1.22 });
  card(s, 0.6, 5.55, 12.1, 1.0, C.cardBg);
  s.addText([
    { text: "Sources: ", options: { bold: true, color: C.tealDk } }, { text: "r/byu threads · a parking-app review · my observation.    ", options: { color: C.ink } },
    { text: "To verify: ", options: { bold: true, color: C.tealDk } }, { text: "does it really cause late class? would real-time info change behavior?    ", options: { color: C.ink } },
    { text: "Confidence: medium.", options: { bold: true, color: C.ink } }
  ], { x: 0.95, y: 5.55, w: 11.4, h: 1.0, fontFace: F.body, fontSize: 14, valign: "middle", margin: 0, lineSpacingMultiple: 1.05 });
  footer(s);
  s.addNotes("Walk it slowly and point at the tags. The key move: every claim says where it came from — [E] with a source, or [A] as an honest guess. Note that the 'what better looks like' line is tagged [A] because it came from the founder, not a user — a very common place people smuggle in their own solution as if it were a finding. Highlight the two things that make this trustworthy: the Sources line, and the 'To verify' list (it names what you still don't know). And the honest 'medium confidence.' Ask the room: what would you go confirm first? Then flip to Ben.");

  // 11 Made-up persona (Ben)
  s = mk(); s.background = { color: C.white };
  header(s, "Persona example — made-up", "\"Busy Ben\" — what NOT to do");
  card(s, 0.6, 2.05, 12.1, 2.3, "FBECE8");
  s.addText("Ben is a 20-year-old sophomore in CS with a 3.8 GPA. He works 15 hours a week, loves productivity apps, and is always on the go. He can never find parking and wastes about an hour every single day circling the lots. He would definitely pay $10/month for an app that shows open spots in real time — and he'd tell all his friends.", { x: 0.95, y: 2.25, w: 11.4, h: 1.95, color: C.ink, fontFace: F.body, fontSize: 16.5, italic: true, valign: "top", margin: 0, lineSpacingMultiple: 1.1 });
  card(s, 0.6, 4.55, 12.1, 2.0, C.navy);
  await iconCircle(s, FA.FaExclamationTriangle, 0.95, 4.9, 0.62, C.amber, C.navy);
  s.addText([
    { text: "Feels done. It's fiction.  ", options: { bold: true, color: C.amber } },
    { text: "Every detail is invented and unsourced (the GPA, \"an hour every day\"). Nothing is marked as a guess. And \"would definitely pay $10/month\" is a hypothetical dressed up as a fact — the exact Mom Test trap. A founder who builds on Ben builds confidently on fiction.", options: { color: C.white } }
  ], { x: 1.9, y: 4.55, w: 10.5, h: 2.0, fontFace: F.body, fontSize: 16, valign: "middle", margin: 0, lineSpacingMultiple: 1.06 });
  footer(s);
  s.addNotes("The trap to name: Ben reads better than Cara — it's tidy, specific, confident — and that's exactly why it's dangerous. Ask the room to spot the problems before you reveal the callout: none of it has a source, nothing is tagged as a guess, and the money line is a hypothetical stated as fact. Contrast directly with Cara: Cara is messier but honest — you know what she knows and what she doesn't. Bottom line for them: when they build their own persona for the assignment, it should look like Cara, not Ben. Better to admit low confidence than to invent certainty.");

  // 12 The assignment
  s = mk(); s.background = { color: "0E7C7B" };
  s.addShape(pres.shapes.OVAL, { x: 11.2, y: -1.2, w: 3.6, h: 3.6, fill: { color: "127D7C" } });
  s.addText("YOUR ASSIGNMENT", { x: 0.7, y: 0.55, w: 11, h: 0.35, color: "BFE7E4", fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText("Discovery Notes — due Mon, Sep 21", { x: 0.68, y: 0.95, w: 12, h: 0.8, color: C.white, fontFace: F.head, fontSize: 32, bold: true, margin: 0 });
  card(s, 0.6, 2.2, 12.1, 3.95, C.white);
  await iconCircle(s, FA.FaClipboardCheck, 0.95, 2.55, 0.7, C.teal);
  s.addText("This week", { x: 2.0, y: 2.6, w: 10, h: 0.55, color: C.ink, fontFace: F.body, fontSize: 20, bold: true, valign: "middle", margin: 0 });
  s.addText([
    { text: "Talk to at least one real person (aim for 1–3) who actually has the problem.", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 12, bold: true } },
    { text: "There are no assigned users — you find your own (roommates, classmates, clubs, community).", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 12 } },
    { text: "Plus: build one honest, evidence-tagged persona (like Cara, not Ben).", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 12 } },
    { text: "Capture the needs, not solutions — their words, workarounds, and costs.", options: { bullet: { indent: 16 } } }
  ], { x: 1.15, y: 3.5, w: 11.2, h: 2.5, color: C.ink, fontFace: F.body, fontSize: 16.5, valign: "top", margin: 0 });
  s.addText("Handout: assignments/Discovery-Notes.md · Feeds your Product Definition Brief (Week 3).", { x: 0.6, y: 6.3, w: 12.1, h: 0.4, color: "BFE7E4", fontFace: F.body, fontSize: 14, italic: true, align: "center", margin: 0 });
  s.addNotes("Hand out Discovery-Notes.md. The non-negotiable: everyone must talk to at least one real person who genuinely has the problem — not a hallway 'sure, I'd use that.' They find their own people; we have no seeded users this iteration. The persona is a required supplement, kept modest. Reassure them that discovering a problem ISN'T real is a great result, not a failure — honest discovery is the grade, not confirmation of their idea. Remind them of consent/ethics and that this feeds directly into the Product Definition Brief next week.");

  // 13 Wrap
  s = mk(); s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: -1.3, y: 5.2, w: 3.6, h: 3.6, fill: { color: "1C3252" } });
  await iconCircle(s, FA.FaComments, 0.9, 1.3, 0.9, C.amber, C.navy);
  s.addText("Go learn about their life and their real, past behavior —\nand stay quiet long enough to hear it.", { x: 0.9, y: 2.35, w: 11.9, h: 1.7, color: C.white, fontFace: F.head, fontSize: 28, bold: true, italic: true, margin: 0, lineSpacingMultiple: 1.06 });
  s.addText("BEFORE MONDAY, SEP 21", { x: 0.92, y: 4.4, w: 11, h: 0.35, color: C.amber, fontFace: F.body, fontSize: 14, bold: true, charSpacing: 2, margin: 0 });
  s.addText([
    { text: "Do your discovery conversations + one honest persona (Discovery Notes)", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Turn in your License / OSS short response (from Session 3)", options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: 8 } },
    { text: "Keep feeding your idea journal — Week 3: feasibility + the Product Definition Brief", options: { bullet: { indent: 16 } } }
  ], { x: 0.95, y: 4.82, w: 11.7, h: 1.6, color: "CBD8E6", fontFace: F.body, fontSize: 16, valign: "top", margin: 0 });
  s.addNotes("Close on the one-liner — it's the whole method in a sentence. Recap the three rules one more time if there's a beat. Preview Week 3: they'll turn their discovery into a Product Definition Brief (users, needs, success criteria), so the quality of this week's conversations directly determines how strong that brief is. Make the deliverables and dates concrete before they leave.");

  const OUT = "Session04-Discovery.pptx";
  await pres.writeFile({ fileName: OUT });
  console.log("WROTE", PAGE, "slides");
  try {
    const { verifyDeck, reportText } = require("./verify-deck.js");
    console.log(reportText(await verifyDeck(OUT)));
  } catch (e) { console.warn("verify-deck skipped:", e.message); }
}
build().catch(e => { console.error(e); process.exit(1); });
