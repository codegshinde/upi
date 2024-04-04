"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpiTransactionReal", {
    enumerable: true,
    get: function() {
        return UpiTransactionReal;
    }
});
const _mongoose = require("mongoose");
const UpiTransactionSchema = new _mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    uniqId: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "pending"
    }
});
const UpiTransactionReal = (0, _mongoose.model)("upitransactions", UpiTransactionSchema);
