"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Merchant", {
    enumerable: true,
    get: function() {
        return Merchant;
    }
});
const _mongoose = require("mongoose");
const merchantSchema = new _mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    upiId: {
        type: String,
        required: false
    }
});
const Merchant = (0, _mongoose.model)("merchants", merchantSchema);
