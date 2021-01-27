const https = require("https");
//const jsdom = require("jsdom"); if can use Third party module
const option = {
  host: "codequiz.azurewebsites.net",
  headers: {
    Cookie: "hasCookie=true",
  },
};
const callback = (response) => {
  response.setEncoding("utf8");
  response.on("data", function (chunk) {
    chunk
      .split("tr")
      .filter((ele) => ele.includes("td"))
      .forEach((node) => {
        if (node.includes(process.argv[2])) {
          console.log(node.split("</td><td>")[1]);
        }
      });
    // if can use Third party module
    // const dom = new jsdom.JSDOM(chunk);
    // dom.window.document.querySelectorAll("tr").forEach((node) => {
    //   if (node.innerHTML.includes(process.argv[2])) {
    //     console.log(node.querySelectorAll("td")[1].innerHTML);
    //   }
    // });
    //
  });
  response.on("end", function () {});
};
const FUNDCODE = ["B-INCOMESSF", "BM70SSF", "BEQSSF", "B-FUTURESSF"];

if (FUNDCODE.includes(process.argv[2])) {
  https.request(option, callback).end();
} else {
  console.log(
    "Can't not found this FUNDCODE in https://codequiz.azurewebsites.net/"
  );
}
