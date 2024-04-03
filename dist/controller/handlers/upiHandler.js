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
const _Transaction = require("../../models/Transaction");
const _upiRouteSchema = require("../schemas/upiRouteSchema");
async function upiHandler(request, reply) {
    try {
        const body = request.body;
        // const transaction = await Transaction.findOne({
        //   title: body.title,
        // });
        // if (transaction) {
        //   throw new Error("Transaction Already Inserted!");
        // }
        const newTransaction = new _Transaction.Transaction(body);
        await newTransaction.save();
        reply.send({
            message: "Transaction Saved",
            data: newTransaction
        });
    } catch (error) {
        throw error;
    }
}
const upiRouteOptions = {
    schema: _upiRouteSchema.upiRouteSchema,
    handler: upiHandler
};
