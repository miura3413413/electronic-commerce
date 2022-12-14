import { Schema, model, models } from 'mongoose';

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
    },
    review: [
      {
        _id: { type: String, required: true },
        userName: { type: String, required: true },
        userImage: { type: String, required: false },
        rate: { type: Number, required: true },
        title: { type: String, required: true },
        text: { type: String, required: true },

      }
    ],
    clicked: {
      type: Number,
      default: 0,
      required: false
    },
  },
  {
    timestamps: true,
  },
);

export const Item = models.Item || model("Item", Itemchema)