import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { UpiTransaction } from "../../models/UpiTransaction";
import { UpiTransactionReal } from "../../models/UpiTransactionReal";
import { regexMatcher } from "../../utils/regexMatcher";
import { UpiRouteRequestBody, upiRouteSchema } from "../schemas/upiRouteSchema";

async function upiHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const body = request.body as UpiRouteRequestBody;
    const uniqId = await regexMatcher(body.text);

    // Find the existing transaction
    const existingTransaction = await UpiTransaction.findOne({ uniqId });

    // If a transaction with the provided unique ID doesn't exist, return an error response
    if (!existingTransaction) {
      throw new Error("Transaction with the provided unique ID does not exist.");
    }

    // Update the status of the existing transaction to "success"
    existingTransaction.status = "success";
    await existingTransaction.save();

    // Create a new real transaction object based on the existing transaction
    const newRealTransaction = new UpiTransactionReal(existingTransaction.toObject());
    await newRealTransaction.save();

    // Delete the existing transaction from the original collection
    await UpiTransaction.deleteOne({ _id: existingTransaction._id });

    // Send the response with the new real transaction
    reply.send({ transaction: newRealTransaction });
  } catch (error) {
    throw error;
  }
}

export const upiRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: upiRouteSchema,
  handler: upiHandler,
};
