import mongoose from "mongoose"

const kinsmanCompSubmissionSchema = new mongoose.Schema({
  firstName: {
    type: String,
    allowNull: false,
    required: true,
  },
  lastName: {
    type: String,
    allowNull: false,
    required: true,
  },
  email: {
    type: String,
    required: true,
    allowNull: false,
    unique: true,
  },
  postcode: {
    type: String,
    allowNull: false,
    required: true,
  },
  mobile: {
    type: String,
    allowNull: false,
    required: true,
  },
  partyDescription: {
    type: String,
    allowNull: false,
    required: true,
  },
  state: {
    type: String,
    required: true,
    enum: ["NSW", "NT", "QLD", "ACT", "WA", "VIC", "TAS", "SA"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const submission = mongoose.model(
  "KinsmanCompSubmission",
  kinsmanCompSubmissionSchema
)

module.exports = submission
