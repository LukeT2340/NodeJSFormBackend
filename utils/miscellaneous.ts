require("dotenv").config()
const mongoose = require("mongoose")
const mongoURI = process.env.MONGO_URL
const db = mongoose.connection

export const connectToDb = () => {
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  db.on("connected", () => {
    console.log("Connected to MongoDB server")
  })

  db.on("error", (err: string) => {
    console.error("MongoDB connection error:", err)
  })

  db.on("disconnected", () => {
    console.log("Disconnected from MongoDB server")
  })
}
