import mongoose from "mongoose";

const cryptoCoinSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    rank: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    cryptoName: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    rate: {
      type: String,
      required: true,
    },
    cap: {
      type: String,
      required: true,
    },
    volume: {
      type: String,
      required: true,
    },
    allTimeHighUSD: {
      type: String,
      required: true,
    },
    hour: {
      type: String,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
    weekly: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CryptoCoins = mongoose.model("CryptoCoins", cryptoCoinSchema);
