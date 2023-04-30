import express from "express";
import specController from "../controllers/spec";

const specRouter = express.Router();

specRouter.post('/upload', specController.uploadSpec);
specRouter.get('/list', specController.getSpecList);
specRouter.post('/delete', specController.deleteSpec);
specRouter.post('/download', specController.downloadSpec);
specRouter.post('/validate', specController.validateSpec);

export default specRouter;