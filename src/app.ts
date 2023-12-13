import express from 'express';
import cors from "cors";
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { options } from './config/appConfig';
import router from './routes/index';

const app = express();

app.use(cors(options));

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use('/', router)

export default app
