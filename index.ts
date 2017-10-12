import elmStaticHtml from "elm-static-html-lib";
import * as fs from "fs";

const model = { name: "James", age : 31 };
const options = { model : model, decoder: "Main.decodeModel" };

console.log("GOT uno");

elmStaticHtml("./", "Main.view", options)
  .then((generatedHtml) => {
    console.log("GOT dos");
    fs.writeFileSync("output.html", generatedHtml);
  });
