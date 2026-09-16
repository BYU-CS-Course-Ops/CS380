// add-animations.js — bake click-to-reveal animations into a pptxgenjs deck.
//
// pptxgenjs cannot write animations, so this runs after pres.writeFile() and
// injects the <p:timing> block PowerPoint would have written itself.
//
// Mark shapes in the build script by name — every pptxgenjs add* call takes
// an `objectName` option:
//
//   click-1          appears on the first click
//   click-1:fade     fades in on the first click
//   click-2 …        second click, and so on
//
// Every shape on a slide with the same click number reveals together, in
// z-order, so a card, its icon circle, its icon, and its text all arrive as one.
// Unmarked slides are left alone. The markers are keyed to the slide itself,
// not a slide number, so inserting slides never breaks them.
//
//   node tools/add-animations.js <deck.pptx>          (or require and call)
//
// The effect XML is copied from what PowerPoint writes for Entrance → Appear
// (presetID 1) and Entrance → Fade (presetID 10), so a deck opened and saved
// in PowerPoint round-trips unchanged.

const fs = require("fs");
const JSZip = require("jszip");

const MARK = /^click-(\d+)(?::(appear|fade))?$/;

function effectXml(id, spid, nodeType, effect, isPic) {
  const grp = isPic ? "" : ' grpId="0"';
  const visible =
    `<p:set><p:cBhvr><p:cTn id="${id.next()}" dur="1" fill="hold"><p:stCondLst><p:cond delay="0"/></p:stCondLst></p:cTn>` +
    `<p:tgtEl><p:spTgt spid="${spid}"/></p:tgtEl><p:attrNameLst><p:attrName>style.visibility</p:attrName></p:attrNameLst></p:cBhvr>` +
    `<p:to><p:strVal val="visible"/></p:to></p:set>`;
  if (effect === "fade") {
    const outer = id.next();
    const body = visible +
      `<p:animEffect transition="in" filter="fade"><p:cBhvr><p:cTn id="${id.next()}" dur="500"/>` +
      `<p:tgtEl><p:spTgt spid="${spid}"/></p:tgtEl></p:cBhvr></p:animEffect>`;
    return `<p:par><p:cTn id="${outer}" presetID="10" presetClass="entr" presetSubtype="0" fill="hold"${grp} nodeType="${nodeType}">` +
      `<p:stCondLst><p:cond delay="0"/></p:stCondLst><p:childTnLst>${body}</p:childTnLst></p:cTn></p:par>`;
  }
  const outer = id.next();
  return `<p:par><p:cTn id="${outer}" presetID="1" presetClass="entr" presetSubtype="0" fill="hold"${grp} nodeType="${nodeType}">` +
    `<p:stCondLst><p:cond delay="0"/></p:stCondLst><p:childTnLst>${visible}</p:childTnLst></p:cTn></p:par>`;
}

function timingXml(clicks) {
  let n = 2;
  const id = { next: () => ++n };
  const bld = [];
  const groups = clicks.map(shapes => {
    const outer = id.next(), inner = id.next();
    const effects = shapes.map((sh, i) => {
      if (!sh.isPic) bld.push(`<p:bldP spid="${sh.spid}" grpId="0" animBg="1"/>`);
      return effectXml(id, sh.spid, i === 0 ? "clickEffect" : "withEffect", sh.effect, sh.isPic);
    }).join("");
    return `<p:par><p:cTn id="${outer}" fill="hold"><p:stCondLst><p:cond delay="indefinite"/></p:stCondLst><p:childTnLst>` +
      `<p:par><p:cTn id="${inner}" fill="hold"><p:stCondLst><p:cond delay="0"/></p:stCondLst><p:childTnLst>${effects}</p:childTnLst></p:cTn></p:par>` +
      `</p:childTnLst></p:cTn></p:par>`;
  }).join("");
  return `<p:timing><p:tnLst><p:par><p:cTn id="1" dur="indefinite" restart="never" nodeType="tmRoot"><p:childTnLst>` +
    `<p:seq concurrent="1" nextAc="seek"><p:cTn id="2" dur="indefinite" nodeType="mainSeq"><p:childTnLst>${groups}</p:childTnLst></p:cTn>` +
    `<p:prevCondLst><p:cond evt="onPrev" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:prevCondLst>` +
    `<p:nextCondLst><p:cond evt="onNext" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:nextCondLst></p:seq>` +
    `</p:childTnLst></p:cTn></p:par></p:tnLst><p:bldLst>${bld.join("")}</p:bldLst></p:timing>`;
}

async function addAnimations(file) {
  const zip = await JSZip.loadAsync(fs.readFileSync(file));
  const slideFiles = Object.keys(zip.files)
    .filter(f => /^ppt\/slides\/slide\d+\.xml$/.test(f))
    .sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]));
  const summary = [];

  for (const f of slideFiles) {
    let xml = await zip.file(f).async("string");
    const byClick = new Map();
    const ids = new Map();
    // Walk shapes in document (z-) order: <p:sp>, <p:pic>, <p:graphicFrame>, <p:cxnSp>.
    const shapeRe = /<p:(sp|pic|graphicFrame|cxnSp)>[\s\S]*?<p:cNvPr id="(\d+)" name="([^"]*)"/g;
    let m;
    while ((m = shapeRe.exec(xml))) {
      const [, kind, spid, name] = m;
      ids.set(spid, (ids.get(spid) || 0) + 1);
      const mark = name.match(MARK);
      if (!mark) continue;
      const click = parseInt(mark[1], 10);
      if (!byClick.has(click)) byClick.set(click, []);
      byClick.get(click).push({ spid, name, effect: mark[2] || "appear", isPic: kind === "pic" });
    }
    if (!byClick.size) continue;

    const slideNo = f.match(/\d+/)[0];
    for (const shapes of byClick.values())
      for (const sh of shapes)
        if (ids.get(sh.spid) > 1)
          throw new Error(`slide ${slideNo}: shape id ${sh.spid} (${sh.name}) is not unique — ` +
            `pptxgenjs numbers tables separately; move the animated shape or the table`);
    const order = [...byClick.keys()].sort((a, b) => a - b);
    order.forEach((c, i) => {
      if (c !== i + 1) throw new Error(`slide ${slideNo}: click numbers must run 1, 2, 3… (found ${order.join(", ")})`);
    });
    if (xml.includes("<p:timing>")) throw new Error(`slide ${slideNo}: already has animations`);

    const timing = timingXml(order.map(c => byClick.get(c)));
    xml = xml.includes("<p:extLst>") && xml.lastIndexOf("<p:extLst>") > xml.lastIndexOf("</p:clrMapOvr>")
      ? xml.replace(/<p:extLst>(?![\s\S]*<p:extLst>)/, timing + "<p:extLst>")
      : xml.replace("</p:sld>", timing + "</p:sld>");
    zip.file(f, xml);
    summary.push(`slide ${slideNo}: ${order.map(c => byClick.get(c).length).join(" + ")} shape(s) over ${order.length} click(s)`);
  }

  fs.writeFileSync(file, await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" }));
  return summary;
}

module.exports = { addAnimations };

if (require.main === module) {
  const file = process.argv[2];
  if (!file) { console.error("usage: node add-animations.js <deck.pptx>"); process.exit(2); }
  addAnimations(file)
    .then(s => console.log(s.length ? "ANIMATED " + s.join("; ") : "no click-N shapes found"))
    .catch(e => { console.error(e.message); process.exit(1); });
}
