const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const kinsmanCompRoutes = require('./routers/kinsmanCompRoutes.ts')
const limiter = require('./middleware/rateLimiter')

require('dotenv').config()

app.use(cors({
    origin: process.env.ORIGIN_URL, // Insert frontend URL here
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

// rate limiter
app.use(limiter)

app.use('/api/kinsman', kinsmanCompRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`)
})