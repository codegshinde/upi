"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createUpiUniqId", {
    enumerable: true,
    get: function() {
        return createUpiUniqId;
    }
});
const _UpiTransaction = require("../models/UpiTransaction");
async function createUpiUniqId(amount) {
    // Generate a random float value between 0 and 1
    const randomFloat = Math.random();
    // Calculate the unique ID by adding the random float value to the amount
    const uniqId = (amount + randomFloat).toFixed(2);
    // Check if generated ID already exists in the database
    const existingTransaction = await _UpiTransaction.UpiTransaction.findOne({
        uniqId
    });
    // If ID exists, generate a new one recursively until a unique ID is found.
    if (existingTransaction) {
        return await createUpiUniqId(amount);
    }
    return uniqId;
}
