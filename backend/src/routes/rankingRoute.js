import express from "express";
import cors from "cors";
import RankingController from "../controllers/rankingController.js";


const router = express.Router();

router.use(cors());

router.get("/ranking", RankingController.getAll);

// router.get("/user/:id", RankingController.getById);

router.post("/ranking", RankingController.create);

// router.put("/user/:id", (req, res) => {
//   res.send("Rota put para atualizar um usuário pelo ID!");
// });


export default router;