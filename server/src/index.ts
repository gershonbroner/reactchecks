import express, { Request, Response } from "express";
import fs from "fs";
const app = express();
const PORT = 3001;
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World! man");
});

app.post("/editobject", (req: Request, res: Response) => {
  const jsonData = req.body;

  let updatedJson = JSON.stringify(jsonData, null, 2);

  fs.writeFile("data.json", updatedJson, "utf8", (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("JSON file has been updated.");
  });
  res.send("succes update json");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// const changeObj = (obj) => {
//   // const filePath = path.resolve(__dirname, "data.json");
//   // fs.readFile(filePath, "utf8", (err, data) => {
//   //   if (err) {
//   //     console.error(err);
//   //     return;
//   //   }

//   //   let jsonData = JSON.parse(data);

//   //   jsonData.react = { hooks: null };

//   //   let updatedJson = JSON.stringify(jsonData, null, 2);

//   fs.writeFile("data.json", obj, "utf8", (err) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log("JSON file has been updated.");
//   });
// };
