import mongoose from "mongoose";

const OraclePanelSchema = new mongoose.Schema(
  {
    connectionId: {
      type: String,
      required: true,
    },
    flavor: {
      type: String,
      required: true,
    },
    statement: {
      type: String,
      required: false,
    },
    executionId: {
      type: String,
      required: false,
    },
    schema: {
      type: String,
      required: false,
    },
  },
  {
    versionKey: false, // Removes the __v field
    toJSON: {
      virtuals: true, // Ensures virtual fields are included when calling toJSON()
      transform: (_, ret) => {
        ret.id = ret._id.toString(); // Convert _id to string
        delete ret._id; // Remove _id from the output
      },
    },
    toObject: {
      virtuals: true, // Ensures virtual fields are included when calling toObject()
      transform: (_, ret) => {
        ret.id = ret._id.toString(); // Convert _id to string
        delete ret._id; // Remove _id from the output
      },
    },
  }
);

export const OraclePanel = mongoose.model("OraclePanel", OraclePanelSchema);
