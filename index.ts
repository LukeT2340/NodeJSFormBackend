const express = require("express")
const app = express()
const cors = require("cors")
const kinsmanCompRoutes = require("./routers/kinsmanCompRoutes.ts")
const { connectToDb } = require("./utils/miscellaneous")
require("dotenv").config()

connectToDb()

app.use(
  cors({
    origin: process.env.ORIGIN_URL, // Insert frontend URL here
    credentials: true,
  })
)

app.use("/api/kinsman", kinsmanCompRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`)
})
