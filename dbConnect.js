import mongoose from "mongoose"

export const dbConnect= async() => {
  const connectionInstance=await mongoose
    .connect(`${process.env.MongoDBURL}`)
    .then(() => {
      console.log("LiveCoinWatch DB Connected...");
    })
    .catch((err) => {
      console.log("Error in DB connection...", err);
      console.log("Please try after sometime...");
      process.exit(1);
    });
};

