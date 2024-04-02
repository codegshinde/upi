import { Schema, model } from "mongoose";

interface TrasnactionTypes {
  packageName: string;
  title: string;
  text: string;
}

const transactionSchema = new Schema<TrasnactionTypes>({
  title: { type: String, required: true },
  text: { type: String, required: true },
  packageName: { type: String, required: true },
});

const Transaction = model<TrasnactionTypes>("upitransactions", transactionSchema);

export { Transaction, TrasnactionTypes };

