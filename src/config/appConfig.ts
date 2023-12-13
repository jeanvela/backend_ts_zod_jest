import { CorsOptions } from "cors";

export const options: CorsOptions = {
    origin: '*',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    exposedHeaders: ['Custom-Header1', 'Custom-Header2']
}