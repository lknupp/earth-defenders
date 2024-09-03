import { user } from "../models/userModel.js";

export default class UserController {
  static async getAll(req, res) {
    try {
      const users = await user.find();
      const usersWithoutEmail = users.map((user) => {
        // eslint-disable-next-line no-unused-vars
        const { email, ...userWithoutEmail } = user.toJSON();
        return userWithoutEmail;
      });
      
      res.status(200).send(usersWithoutEmail);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const id = req.params.id;
      const userFound = await user.findById(id);
      if (!userFound) {
        res.status(404).send("Usuário não encontrado.");
      } else {
        res.status(200).send(userFound);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getUserByEmail(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    try {
      const userEmail = req.params.email;
      const userFound = await user.findOne({ email: userEmail }).exec();

      if (!userFound) {
        console.log("Email não encontrado.");
        res.status(204).send(userFound);
      } else {
        console.log("Email encontrado");
        res.status(200).send(userFound);
      }
      
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async create(req, res) {
    try {
      res.setHeader("Access-Control-Allow-Origin", "*");
      const newUser = new user(req.body);
      console.log("Criando novo usuário...");
      await newUser.save();
      res.status(201).send(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
