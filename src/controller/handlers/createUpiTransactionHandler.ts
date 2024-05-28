import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { Merchant } from "../../models/Merchant";
import { UpiTransaction } from "../../models/UpiTransaction";
import { createUpiUniqId } from "../../utils/createUpiUniqId";
import { uniqOrderId } from "../../utils/uniqOrderId";
import { CreateUpiRequestBody, createUpiTransactionRouteSchema } from "../schemas/createUpiTransaction";

const createUpiTransactionHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { amount, mobile, merchantId } = request.body as CreateUpiRequestBody;
    const merchant = await Merchant.findOne({ _id: merchantId });

    if (!merchant) {
      return reply.status(400).send({ status: "error", message: "merchant Not found" });
    }

    const uniqId = await createUpiUniqId(amount);
    const checkExitingUpiTransaction = await UpiTransaction.findOne({ uniqId, status: "pending" });
    if (checkExitingUpiTransaction) {
      return reply.status(400).send({ status: "error", message: "Please Try Again!" });
    }

    // generate orderId
    const orderId = await uniqOrderId();
    const newUpiTransaction = new UpiTransaction({
      orderId,
      uniqId,
      amount,
      userId: mobile,
    });

    await newUpiTransaction.save();

    const upiPaymentLink = `upi://pay?pa=${merchant.upiId}&pn=Recipient&am=${newUpiTransaction.uniqId}&cu=INR`;

    reply.send({
      amount: newUpiTransaction.amount,
      displayName: merchant.displayName,
      orderId: orderId,
      link: upiPaymentLink,
    });
  } catch (error) {
    throw error;
  }
};

export const createUpiTransactionRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: createUpiTransactionRouteSchema,
  handler: createUpiTransactionHandler,
};
