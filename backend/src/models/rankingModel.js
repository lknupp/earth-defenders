import mongoose from "mongoose";

const rankingSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  totalPoints: {
    type: Number,
    required: [true, "O campo pontos é obrigatório."],
  },
  time: {
    type: String,
    required: [true, "O campo nome é obrigatório."],
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "O campo usuário é obrigatório."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },

}, {
  versionKey: false,

});

const ranking = mongoose.model("ranking", rankingSchema);

export {ranking, rankingSchema};