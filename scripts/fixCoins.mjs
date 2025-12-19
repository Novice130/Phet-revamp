import fs from "node:fs";

const api =
  "https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&pithumbsize=1200&format=json&origin=*" +
  "&titles=" +
  encodeURIComponent("Coin");

const jsonRes = await fetch(api, {
  headers: { "user-agent": "phet-revamp/1.0 (local dev)" },
});
if (!jsonRes.ok) {
  throw new Error(`Wiki API failed: ${jsonRes.status} ${jsonRes.statusText}`);
}
const data = await jsonRes.json();

const pages = data?.query?.pages || {};
const firstPage = Object.values(pages)[0];
const thumbUrl = firstPage?.thumbnail?.source;
if (!thumbUrl) {
  throw new Error("No thumbnail URL found for Wikipedia title 'Coin'");
}

const imgRes = await fetch(thumbUrl, {
  headers: { "user-agent": "phet-revamp/1.0 (local dev)" },
});
if (!imgRes.ok) {
  throw new Error(
    `Image download failed: ${imgRes.status} ${imgRes.statusText}`
  );
}

const buf = Buffer.from(await imgRes.arrayBuffer());
fs.writeFileSync("public/assets/real-life/coins.jpg", buf);
console.log(`Wrote public/assets/real-life/coins.jpg (${buf.length} bytes)`);
console.log(`Source: ${thumbUrl}`);
