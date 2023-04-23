
import express from "express";
import cors from "cors";
import fileupload from "express-fileupload";

import { PORT } from "./config";

import { useRouter } from "./routes";



const app = express();
app.use(fileupload());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('App is working'))

useRouter(app);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});