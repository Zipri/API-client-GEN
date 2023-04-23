import express from "express";
import generatorController from "../controllers/generator";

const generatorRouter = express.Router();

generatorRouter.post('/generate-client', generatorController.generateClient);

export default generatorRouter;