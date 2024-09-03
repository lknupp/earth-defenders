import express from "express";
import user from "./userRoute.js";
import ranking  from "./rankingRoute.js";


const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send("API Jogo\n");
  });

  app.use(
    express.json(), 
    user,
    ranking
  );
  
};

export default routes;