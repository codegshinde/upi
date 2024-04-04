"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createUpiTransactionRouteOptions", {
    enumerable: true,
    get: function() {
        return createUpiTransactionRouteOptions;
    }
});
const _UpiTransaction = require("../../models/UpiTransaction");
const _uniqOrderId = require("../../utils/uniqOrderId");
const _createUpiTransaction = require("../schemas/createUpiTransaction");
const createUpiTransactionHandler = async (request, reply)=>{
    try {
        const { uniqId, amount, mobile } = request.body;
        const checkExitingUpiTransaction = await _UpiTransaction.UpiTransaction.findOne({
            uniqId,
            status: "pending"
        });
        if (checkExitingUpiTransaction) {
            throw new Error("Sorry Try Again!");
        }
        // genrate orderId
        const orderId = await (0, _uniqOrderId.uniqOrderId)();
        const newUpiTransaction = new _UpiTransaction.UpiTransaction({
            orderId,
            uniqId,
            amount,
            userId: mobile
        });
        await newUpiTransaction.save();
        reply.send({
            paymentDetails: newUpiTransaction
        });
    } catch (error) {
        throw error;
    }
};
const createUpiTransactionRouteOptions = {
    schema: _createUpiTransaction.createUpiTransactionRouteSchema,
    handler: createUpiTransactionHandler
};
