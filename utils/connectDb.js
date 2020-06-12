import mongoose from "mongoose";
//import corsProxy from "cors-anywhere"

const connection = {};

async function connectDB() {
  try {
    if (connection.isConnected) {
      console.log("Using existing connection");
      return;
    }

    const db = await mongoose.connect(process.env.MONGO_SRV, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("DB connected!");
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error)
  }
}

export default connectDB;
