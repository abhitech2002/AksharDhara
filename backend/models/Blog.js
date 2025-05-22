import mongoose from "mongoose";
import { softDeletePlugin } from "../plugins/softDeletePlugin.js";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  coverImage: {
    type: String,
    default: "",
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  isDeleted: { 
    type: Boolean, 
    default: false
 },
}, { timestamps: true });

// Apply the soft delete plugin to the schema
blogSchema.plugin(softDeletePlugin);

export default mongoose.model("Blog", blogSchema); 