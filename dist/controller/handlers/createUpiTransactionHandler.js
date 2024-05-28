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
const _Merchant = require("../../models/Merchant");
const _UpiTransaction = require("../../models/UpiTransaction");
const _createUpiUniqId = require("../../utils/createUpiUniqId");
const _uniqOrderId = require("../../utils/uniqOrderId");
const _createUpiTransaction = require("../schemas/createUpiTransaction");
const createUpiTransactionHandler = async (request, reply)=>{
    try {
        const { amount, mobile, merchantId } = request.body;
        const merchant = await _Merchant.Merchant.findOne({
            _id: merchantId
        });
        if (!merchant) {
            return reply.status(400).send({
                status: "error",
                message: "merchant Not found"
            });
        }
        const uniqId = await (0, _createUpiUniqId.createUpiUniqId)(amount);
        const checkExitingUpiTransaction = await _UpiTransaction.UpiTransaction.findOne({
            uniqId,
            status: "pending"
        });
        if (checkExitingUpiTransaction) {
            return reply.status(400).send({
                status: "error",
                message: "Please Try Again!"
            });
        }
        // generate orderId
        const orderId = await (0, _uniqOrderId.uniqOrderId)();
        const newUpiTransaction = new _UpiTransaction.UpiTransaction({
            orderId,
            uniqId,
            amount,
            userId: mobile
        });
        await newUpiTransaction.save();
        const upiPaymentLink = `upi://pay?pa=${merchant.upiId}&pn=Recipient&am=${newUpiTransaction.uniqId}&cu=INR`;
        reply.send({
            amount: newUpiTransaction.amount,
            displayName: merchant.displayName,
            orderId: orderId,
            link: upiPaymentLink
        });
    } catch (error) {
        throw error;
    }
};
const createUpiTransactionRouteOptions = {
    schema: _createUpiTransaction.createUpiTransactionRouteSchema,
    handler: createUpiTransactionHandler
};
