import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { UpiTransactionReal } from "../../models/UpiTransactionReal";
import { UpiUpdateStatusSchema } from "../schemas/upiUpdateStatusSchema";

async function upiTransactionStatusHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { orderId } = request.body as UpiUpdateStatusSchema;
    const transaction = await UpiTransactionReal.findOne({
      orderId: orderId,
    });

    if (!transaction) {
      return reply.status(400).send({ status: "error", message: "order id not found!" });
    }

    reply.send({
      status: transaction.status,
      message: "Transaction Fetched.",
    });
  } catch (error) {
    throw error;
  }
}

export const upiTransactionStatusRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: {},
  handler: upiTransactionStatusHandler,
};
