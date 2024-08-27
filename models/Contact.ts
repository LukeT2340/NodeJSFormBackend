import mongoose from "mongoose"

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        allowNull: false,
        required: true
    },
    email: {
        type: String,
        required: true,
        allowNull: false,
        unique: true
    },
    postcode: {
        type: String,
        allowNull: false,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact