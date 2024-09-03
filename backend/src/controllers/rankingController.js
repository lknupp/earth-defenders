import { ranking } from "../models/rankingModel.js";

export default class RakingController {
  static async getAll(req, res) {
    try {
      const currentRanking = await ranking.find().populate("user").exec();
      
      res.status(200).send(currentRanking);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async create(req, res) {
    try {
      res.setHeader("Access-Control-Allow-Origin", "*");
      const newRanking = new ranking(req.body);
            
      console.log("Criando novo usuário...");
      await newRanking.save();
      res.status(201).send(newRanking);
      
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
