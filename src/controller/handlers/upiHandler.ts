import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { Transaction } from "../../models/Transaction";
import { UpiRouteRequestBody, upiRouteSchema } from "../schemas/upiRouteSchema";

async function upiHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const body = request.body as UpiRouteRequestBody;

    const transaction = await Transaction.findOne({
      title: body.title,
    });

    if (transaction) {
      throw new Error("Transaction Already Inserted!");
    }

    const newTransaction = new Transaction(body);

    await newTransaction.save();

    reply.send({
      message: "Transaction Saved",
      data: newTransaction,
    });
  } catch (error) {
    throw error;
  }
}

export const upiRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: upiRouteSchema,
  handler: upiHandler,
};
