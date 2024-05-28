"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "upiTransactionStatusRouteOptions", {
    enumerable: true,
    get: function() {
        return upiTransactionStatusRouteOptions;
    }
});
const _UpiTransactionReal = require("../../models/UpiTransactionReal");
async function upiTransactionStatusHandler(request, reply) {
    try {
        const { orderId } = request.body;
        const transaction = await _UpiTransactionReal.UpiTransactionReal.findOne({
            orderId: orderId
        });
        if (!transaction) {
            return reply.status(400).send({
                status: "error",
                message: "order id not found!"
            });
        }
        reply.send({
            status: transaction.status,
            message: "Transaction Fetched."
        });
    } catch (error) {
        throw error;
    }
}
const upiTransactionStatusRouteOptions = {
    schema: {},
    handler: upiTransactionStatusHandler
};
