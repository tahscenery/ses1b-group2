import mongoose from "mongoose";

const uri = `mongodb+srv://bryancolin35:bryan@ss1b-papxc.mongodb.net/restaurant-dev?retryWrites=true&w=majority`;

async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB successfully connected.");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
