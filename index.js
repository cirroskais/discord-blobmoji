import { readdirSync, writeFileSync, cpSync } from "node:fs";
import emoji_map from "./emoji_map.json";
const dir = readdirSync("./png");

let output = {};

for (let emojiName of Object.keys(emoji_map)) {
    let emojiUtfEscape = emoji_map[emojiName];
    for (let emojiFile of dir) {
        let x = emojiFile.replace("emoji_u", "").replace(".png", "");
        let y = x.split("_");
        let z = [];

        for (let _ of y) {
            z.push(parseInt(_, 16));
        }

        let codepoint = String.fromCodePoint(...z);
        if (codepoint === emojiUtfEscape) {
            console.log(`Found ${emojiName} (${codepoint})!`);
            cpSync(`./png/${emojiFile}`, `./emojis/${emojiFile}`);
            output[emojiName] = `https://cdn.jsdelivr.net/gh/cirroskais/discord-blobmoji/emojis/${emojiFile}`;
        }
    }
}

writeFileSync("map.json", JSON.stringify(output, null, 4));
