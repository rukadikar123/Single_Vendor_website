import mongoose from "mongoose";

const CartitemSchema = new mongoose.Schema(
  {
     user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

const Cartitem=mongoose.model("Cartitem",CartitemSchema)

export default Cartitem