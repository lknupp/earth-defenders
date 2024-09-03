import express from "express";
import cors from "cors";
import UserController from "../controllers/userController.js";


const router = express.Router();

router.use(cors());

router.get("/user", UserController.getAll);

router.get("/user/:id", UserController.getById);

router.get("/user/email/:email", UserController.getUserByEmail);

router.post("/user", UserController.create);

router.put("/user/:id", (req, res) => {
  res.send("Rota put para atualizar um usuário pelo ID!");
});


export default router;