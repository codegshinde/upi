import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { UpiTransaction } from "../../models/UpiTransaction";
import { UpiTransactionReal } from "../../models/UpiTransactionReal";
import { regexMatcher } from "../../utils/regexMatcher";
import { UpdateUpiRequestBody, updateUpiTransactionRouteSchema } from "../schemas/updateUpiTransaction";

async function updateUpiHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const body = request.body as UpdateUpiRequestBody;
    const uniqId = await regexMatcher(body.text);
    // console.log("Request body:", body);
    // console.log("Unique ID:", uniqId);

    // Find the existing transaction
    const existingTransaction = await UpiTransaction.findOne({ uniqId });
    if (!existingTransaction) {
      reply.status(404).send({ error: "Transaction with the provided unique ID does not exist." });
      return;
    }

    // console.log("Existing transaction:", existingTransaction);

    // Update the status of the existing transaction to "success"
    existingTransaction.status = "success";
    await existingTransaction.save();

    // Create a new real transaction object based on the existing transaction
    const newRealTransaction = new UpiTransactionReal(existingTransaction.toObject());
    await newRealTransaction.save();

    // Delete the existing transaction if needed
    await UpiTransaction.findByIdAndDelete(existingTransaction._id);

    // Send the response with the new real transaction
    reply.send({ transaction: newRealTransaction });
  } catch (error) {
    // console.error("Error:", error);
    reply.status(500).send({ error: "Internal server error" });
  }
}

export const updateUpiTransactionRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: updateUpiTransactionRouteSchema,
  handler: updateUpiHandler,
};
