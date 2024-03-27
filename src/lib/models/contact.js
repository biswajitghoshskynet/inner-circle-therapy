import mongoose, { Schema } from "mongoose";
const contactModel = new mongoose.Schema(
   {

      name: {
         type: String
      },
      email: {
         type: String,
      },
      phone: {
         type: Number
      },
      relation: {
         type: String,
      },
      positionX: {
         type: String,
      },
      positionY: {
         type: String,
      },
      owner: {
         type: mongoose.Types.ObjectId,
         ref: "User"
      }


   }, { timestamps: true })

export const Contact = mongoose.models.Contact || mongoose.model("Contact", contactModel);