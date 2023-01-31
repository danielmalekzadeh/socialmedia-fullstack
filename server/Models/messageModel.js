import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    chatId: { type: String },
    senderId: { type: String },
    text: { type: String },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model("Messages", messageSchema);

export default MessageModel;
