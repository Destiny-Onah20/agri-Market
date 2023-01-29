const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: [true, "This Place cannot be empty"]
    },
    lastName : {
        type: String,
        required: [true, "This Place cannot be empty"]
    },
    email : {
        type: String,
        required: [true, "This Place cannot be empty"],
        unique: true
    },
    password : {
        type: String,
        required: [true, "This Place cannot be empty"]
    },
    phoneNumber : {
        type: String,
        required: [true, "This Place cannot be empty"],
        unique: true
    },
    location : {
        type: String,
        required: [true, "This Place cannot be empty"]
    },
    isAdmin : {
        type: Boolean,
        default: false
    },
    verify : {
        type: Boolean,
        default: false
    },
    token : {
        type: String,
    },
},{
    timestamps: true
});

const usersModel = mongoose.model("usersModel", userSchema);

module.exports = usersModel;