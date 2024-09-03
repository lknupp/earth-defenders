import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  userName: {
    type: String,
    required: [true, "O campo nome é obrigatório."],
    trim: true,
  },
  nickName: {
    type: String,
    required: [true, "O campo nome é obrigatório."],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "O campo email é obrigatório."],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastTimePlayed: {
    type: Date,
    default: Date.now,
  },
}, 
{
  versionKey: false,

});

const user = mongoose.model("users", userSchema);

export {user, userSchema};

