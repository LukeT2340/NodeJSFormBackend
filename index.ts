const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const contactSubmission = require('./routers/contactSubmission.ts')
require('dotenv').config()

app.use(cors({
    origin: '*', // Insert frontend URL here
    credentials: true,
}))

const mongoURI = process.env.MONGO_URL

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection

db.on('connected', () => {
  console.log('Connected to MongoDB')
})

db.on('error', (err: string) => {
  console.error('MongoDB connection error:', err)
})

db.on('disconnected', () => {
  console.log('Disconnected from MongoDB')
})

app.use('/contact', contactSubmission)

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`)
})