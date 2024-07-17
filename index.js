import express from "express";
import cors from "cors";
import dotenv from "dotenv";

//Utilities
import { success } from "./utils/responseWrapper.js";
import { error } from "./utils/responseWrapper.js";

//Models Import
import { CryptoCoins } from "./models/CryptoCoins.js";
import { cryptoData } from "./CryptoDataGenerator.js";

//Database Connection
import { dbConnect } from "./dbConnect.js";

//Backend Router
// import {CryptoRouter} from "./routers/CryptoRouter.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect();
setInterval(()=>{
  cryptoData()
}, 60000);


app.post("/api/cryptoSearch", async (req, res) => {
  const query = req.body;
  const { searchParams } = req.query;

  try {
    if (searchParams!="" || searchParams==undefined) {
      var crypto = await CryptoCoins.find({
        $or: [
          { cryptoName: { $regex: searchParams } },
          { code: { $regex: searchParams } },
        ],
      }).sort({_id:-1}).limit(20);
    } else {
      crypto = await CryptoCoins.find().sort({_id:-1}).limit(5);
    }

    if (crypto) return res.send(success(200, "Search Crypto Data ...", crypto));
  } catch (err) {
    res.send(error(500, "Error in searching given crypto", err));
  }
});

/*********App is Listining on given PORT**************/

const port = process.env.PORT;
app.listen(port || 8081, () => {
  console.log(`LiveCoinWatch Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  try {
    res.send(success(200, `Welcome to LiveCoinWatch Server ${port}`, ""));
  } catch (err) {
    res.send(error(500, "INTERNAL SERVER ERROR", err));
  }
});
