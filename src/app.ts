import express from 'express';
import cors from "cors";
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { options } from './config/appConfig';
import router from './routes/index';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { optionsSwagger } from './swaggerOptions';

const app = express();

app.use(cors(options));

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json())
const specs = swaggerJsDoc(optionsSwagger)
app.use('/', router)
app.use('/docs',swaggerUI.serve, swaggerUI.setup(specs))

export default app
