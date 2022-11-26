import { Schema, model, models } from 'mongoose';

const Userchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true,
  },
);

export const User = models.User || model("User", Userchema)