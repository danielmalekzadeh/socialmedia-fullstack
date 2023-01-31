import mongoose from "mongoose";

const chatSchema = mongoose.Schema(
  {
    members: { type: Array },
  },
  { timestamps: true }
);

const ChatModel = mongoose.model("Chats", chatSchema);

export default ChatModel;
