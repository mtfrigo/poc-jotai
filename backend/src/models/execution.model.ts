import mongoose from "mongoose";

const ExecutionsSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    resourceId: {
      type: String,
    },
    flavor: {
      type: String,
      enum: ["ORACLE", "MONGO", "KAFKA"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["PENDING", "FAILED", "SUCCESS"],
      default: "PENDING",
    },
    finishedAt: {
      type: Date,
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

export const Execution = mongoose.model("Execution", ExecutionsSchema);
