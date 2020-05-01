import mongoose from "mongoose";

const uri = `mongodb+srv://bryan:kuuga@cluster0-8y4uv.mongodb.net/test2?retryWrites=true&w=majority`;

async function connectDB(): Promise<void> {
  try 
  {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDb connected...");
  } 
  catch (error) 
  {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;