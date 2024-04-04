import { UpiTransaction } from "../models/UpiTransaction";

export async function createUpiUniqId(amount: number): Promise<string> {
  // Generate a random float value between 0 and 1
  const randomFloat = Math.random();
  // Calculate the unique ID by adding the random float value to the amount
  const uniqId = (amount + randomFloat).toFixed(2);
  // Check if generated ID already exists in the database
  const existingTransaction = await UpiTransaction.findOne({ uniqId });
  // If ID exists, generate a new one recursively until a unique ID is found.
  if (existingTransaction) {
    return await createUpiUniqId(amount);
  }
  return uniqId;
}
