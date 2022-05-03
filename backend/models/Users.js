const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            min: 3,
            max: 20,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        long: {
            type: Number,
            required: true,
        },
        lat: {
            type: Number,
            required: true,
        },
        topics: {
            type: Array,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Users", UsersSchema);