const fs = require("fs");
const path = require("path");

export const changeObj = (obj) => {
  // const filePath = path.resolve(__dirname, "data.json");
  // fs.readFile(filePath, "utf8", (err, data) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }

  //   let jsonData = JSON.parse(data);

  //   jsonData.react = { hooks: null };

  //   let updatedJson = JSON.stringify(jsonData, null, 2);

  fs.writeFile("data.json", obj, "utf8", (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("JSON file has been updated.");
  });
};
