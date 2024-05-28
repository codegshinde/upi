import { Schema, model } from "mongoose";

interface UpiTransactionTypes {
  _id: Schema.Types.ObjectId;
  amount: number;
  uniqId: string;
  orderId: string;
  userId: string;
  status: "pending" | "success" | "failed";
}

const UpiTransactionSchema = new Schema<UpiTransactionTypes>({
  _id: { type: Schema.Types.ObjectId },
  amount: { type: Number, required: true },
  uniqId: { type: String, required: true },
  orderId: { type: String, required: true },
  userId: { type: String, required: true },
  status: { type: String, required: true, default: "pending" },
});

const UpiTransaction = model<UpiTransactionTypes>("upitransactionstemps", UpiTransactionSchema);

export { UpiTransaction, UpiTransactionTypes };

