import express, { Request, Response } from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const PORT = 3001;
let flag = false;
app.use(express.json());
app.use(cors());
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World! man");
});

app.post("/editobject", (req: Request, res: Response) => {
  const jsonData = req.body;
  if (typeof jsonData !== "object" || jsonData === null) {
    throw new Error("Invalid JSON input");
  }

  fs.readFile("data.json", "utf8", (err, data: any) => {
    if (err) {
      console.error(err);
      return;
    }
    let Data = JSON.parse(data);

    for (const key in Data) {
      if (Object.keys(jsonData)[0] === key) {
        Data[key] = jsonData[Object.keys(jsonData)[0]];
        flag = true;
        break;
      }
    }
    if (!flag) {
      Data[Object.keys(jsonData)[0]] = jsonData[Object.keys(jsonData)[0]];
    }
    flag = false;
    let updatedJson = JSON.stringify(Data, null, 2);
    console.log(updatedJson);

    fs.writeFile("data.json", updatedJson, "utf8", (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("JSON file has been updated.");
    });
  });

  res.send("succsses");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

 