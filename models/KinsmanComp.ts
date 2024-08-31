import mongoose from "mongoose"

const kinsmanCompSchema = new mongoose.Schema({
    firstName: {
        type: String,
        allowNull: false,
        required: true
    },
    lastName: {
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
    mobile: {
        type: String,
        allowNull: false,
        required: true,
        unique: true
    },
    partyDescription: {
        type: String,
        allowNull: false,
        required: true
    },
    state: {
        type: String,
        allowNull: false,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const kinsmanComp = mongoose.model('KinsmanComp', kinsmanCompSchema)

module.exports = kinsmanComp