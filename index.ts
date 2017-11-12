//import elmStaticHtml from "elm-static-html-lib";
//import * as fs from "fs";
//
//const model = { name: "Noah", age : 24 };
//const secondModel = { name: "not noah", age: 74};
//const firstRunOptions = { model : model, decoder: "MyModule.decodeModel", alreadyRun: false };
//const secondRunOptions = { model : secondModel, decoder: "MyModule.decodeModel", alreadyRun: true };
//
//
//function runTwice() {
//    elmStaticHtml(process.cwd(), "MyModule.view", firstRunOptions)
//    .then((generatedHtml) => {
//        fs.writeFileSync("output.html", generatedHtml);
//        elmStaticHtml(process.cwd(), "MyModule.view", secondRunOptions)
//        .then((generatedHtml) => {
//            fs.writeFileSync("output2.html", generatedHtml);
//            elmStaticHtml(process.cwd(), "MyModule.view", secondRunOptions)
//            .then((generatedHtml) => {
//                fs.writeFileSync("output3.html", generatedHtml);
//            });
//        });
//    });
//}
//
//runTwice();

import elmStaticHtml from "elm-static-html-lib";
import * as fs from "fs";

const model = { name: "James", age : 31 };
const options = { model : model, decoder: "Main.decodeModel" };

console.log("GOT uno");

elmStaticHtml(process.cwd(), "Main.view", options)
  .then((generatedHtml) => {
    console.log("GOT dos");
    fs.writeFileSync("output.html", generatedHtml);
  });
