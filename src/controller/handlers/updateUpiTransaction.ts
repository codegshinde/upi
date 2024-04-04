import { FastifyReply, FastifyRequest } from "fastify";
import { UpiTransaction } from "../../models/UpiTransaction";
import { UpiTransactionReal } from "../../models/UpiTransactionReal";
import { regexMatcher } from "../../utils/regexMatcher";
import { UpdateUpiRequestBody } from "../schemas/updateUpiTransaction";

async function updateUpiHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const body = request.body as UpdateUpiRequestBody;
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
    const newRealTransaction = new UpiTransactionReal(existingTransaction);
    await newRealTransaction.save();

    // Delete the existing transaction if needed
    await existingTransaction.deleteOne();

    // Send the response with the new real transaction
    reply.send({
      transaction: newRealTransaction,
    });
  } catch (error) {
    throw error;
  }
}

export { updateUpiHandler };
