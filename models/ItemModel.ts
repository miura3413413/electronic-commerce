import { Schema, model, models, Types, Date } from 'mongoose';

const Itemchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  },
);

export const Item = models.Item || model("Item", Itemchema)