"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Transaction", {
    enumerable: true,
    get: function() {
        return Transaction;
    }
});
const _mongoose = require("mongoose");
const transactionSchema = new _mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    packageName: {
        type: String,
        required: true
    }
});
const Transaction = (0, _mongoose.model)("transactions", transactionSchema);
