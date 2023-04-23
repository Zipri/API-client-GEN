import express from "express";
import generatedClientController from "../controllers/generated-client";

const generatedClientRouter = express.Router();

generatedClientRouter.get('/client-list', generatedClientController.getClientList);
generatedClientRouter.post('/delete-client', generatedClientController.deleteClient);
generatedClientRouter.post('/client-zip', generatedClientController.getClientZip);

export default generatedClientRouter;