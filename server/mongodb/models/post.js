import mongoose from "mongoose";

// Define the schema for the 'Post' model
const postSchema = new mongoose.Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: String, required: true },
});

// Create and export the 'Post' model based on the schema
const Post = mongoose.model("Post", postSchema); // Make sure the model name is 'Post'

export default Post;
