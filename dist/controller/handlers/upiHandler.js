"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "upiRouteOptions", {
    enumerable: true,
    get: function() {
        return upiRouteOptions;
    }
});
const _UpiTransaction = require("../../models/UpiTransaction");
const _UpiTransactionReal = require("../../models/UpiTransactionReal");
const _regexMatcher = require("../../utils/regexMatcher");
const _upiRouteSchema = require("../schemas/upiRouteSchema");
async function upiHandler(request, reply) {
    try {
        const body = request.body;
        const uniqId = await (0, _regexMatcher.regexMatcher)(body.text);
        // Find the existing transaction
        const existingTransaction = await _UpiTransaction.UpiTransaction.findOne({
            uniqId
        });
        // If a transaction with the provided unique ID doesn't exist, return an error response
        if (!existingTransaction) {
            throw new Error("Transaction with the provided unique ID does not exist.");
        }
        // Update the status of the existing transaction to "success"
        existingTransaction.status = "success";
        await existingTransaction.save();
        // Create a new real transaction object based on the existing transaction
        const newRealTransaction = new _UpiTransactionReal.UpiTransactionReal(existingTransaction.toObject());
        await newRealTransaction.save();
        // Delete the existing transaction from the original collection
        await _UpiTransaction.UpiTransaction.deleteOne({
            _id: existingTransaction._id
        });
        // Send the response with the new real transaction
        reply.send({
            transaction: newRealTransaction
        });
    } catch (error) {
        throw error;
    }
}
const upiRouteOptions = {
    schema: _upiRouteSchema.upiRouteSchema,
    handler: upiHandler
};
