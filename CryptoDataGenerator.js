import fetch from "node-fetch";
import { millify } from "millify";
import dotenv from "dotenv";
import { nanoid } from 'nanoid'
import { CryptoCoins } from "./models/CryptoCoins.js";

dotenv.config();
const apikey = process.env.apikey;

const body = {
  currency: "USD",
  sort: "rank",
  order: "ascending",
  offset: 0,
  limit: 5,
  meta: true,
};

const convertData = (data) => {
  try {
    if (data) {
      const modifiedData = millify(data, {
        units: ["", "K", "M", "B", "T", "P", "E"],
        space: true,
        precision: 3,
      });
      console.log("modifiedData", modifiedData);
      return modifiedData ? modifiedData : 0;
    }
  } catch (err) {
    console.log("ERROR in convert data", err);
  }
};

const convertToTwoDecimal = (data) => {
  try {
    if (data) {
      const modifiedData = millify(data, {
        space: true,
        precision: 2,
      });
      console.log("modifiedData", modifiedData);
      return modifiedData ? modifiedData : 0;
    }
  } catch (err) {
    console.log("ERROR in convert data", err);
  }
};

export const cryptoData = async (req, res) => {
  try {
    const response = await fetch(`https://api.livecoinwatch.com/coins/list`, {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json", "x-api-key": apikey },
    });
    const data = await response.json();

    console.log("data", data);
    if (data.length>0) {
      for (let c in data) {
        console.log("c", c);
        const cryptoInfo = new CryptoCoins({
          id:nanoid(),
          rank: data[c]?.rank,
          img: data[c]?.png32,
          cryptoName: data[c]?.name,
          code: data[c]?.code,
          rate:
            "$" +
            (data[c]?.rate > 0
              ? data[c]?.rate?.toFixed(2)
              : data[c]?.rate?.toFixed(6)),
          cap: "$" + convertData(data[c]?.cap),
          volume: "$" + convertData(data[c]?.volume),
          allTimeHighUSD:
            "$" +
            (data[c]?.allTimeHighUSD > 0
              ? data[c]?.allTimeHighUSD?.toFixed(2)
              : data[c]?.allTimeHighUSD?.toFixed(6)),
          hour: ((data[c]?.delta?.hour - 1) * 100)?.toFixed(2) + "%",
          day: ((data[c]?.delta?.day - 1) * 100)?.toFixed(2) + "%",
          weekly: ((data[c]?.delta?.week - 1) * 100)?.toFixed(2) + "%",
        });
        await cryptoInfo.save();
      }
    }
  } catch (err) {
    console.log("ERROR in getting data", err);
  }
};
