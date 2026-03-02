import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    menu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
    },
    selectedSabji: {
      type: String,
      required: true,
    },
    selectedSweet: {
      type: String,
      required: true,
    },
    rotis: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

orderSchema.index({ student: 1, menu: 1 }, { unique: true });

export const Order = mongoose.model("Order", orderSchema);
