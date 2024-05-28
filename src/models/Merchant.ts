import { Schema, model } from "mongoose";

interface MerchantTypes {
  name: string;
  displayName: string;
  email: string;
  mobile: number;
  password: string;
  city: string;
  upiId?: string;
}

const merchantSchema = new Schema<MerchantTypes>({
  name: { type: String, required: true },
  displayName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: Number, required: true, unique: true },
  password: { type: String, required: true },
  city: { type: String, required: true },
  upiId: { type: String, required: false },
});

const Merchant = model<MerchantTypes>("merchants", merchantSchema);

export { Merchant, MerchantTypes };

