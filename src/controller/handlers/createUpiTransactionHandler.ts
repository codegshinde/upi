import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { UpiTransaction } from "../../models/UpiTransaction";
import { uniqOrderId } from "../../utils/uniqOrderId";
import { CreateUpiRequestBody, createUpiTransactionRouteSchema } from "../schemas/createUpiTransaction";

const createUpiTransactionHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { uniqId, amount, mobile } = request.body as CreateUpiRequestBody;

    const checkExitingUpiTransaction = await UpiTransaction.findOne({ uniqId, status: "pending" });
    if (checkExitingUpiTransaction) {
      throw new Error("Sorry Try Again!");
    }

    // genrate orderId
    const orderId = await uniqOrderId();

    const newUpiTransaction = new UpiTransaction({
      orderId,
      uniqId,
      amount,
      userId: mobile,
    });

    await newUpiTransaction.save();

    reply.send({
      paymentDetails: newUpiTransaction,
    });
  } catch (error) {
    throw error;
  }
};

export const createUpiTransactionRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: createUpiTransactionRouteSchema,
  handler: createUpiTransactionHandler,
};
