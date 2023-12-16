// import { Options, Information } from 'swagger-jsdoc'

export const optionsSwagger = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Tasks API",
            version: "1.0.0",
            description: "A simple express library API",
            contact: {
                name: "Jean pierre",
                email: "alejandrovelaarana@gmail.com",
                url: "web.com"
            }
        },
        servers: [
            {
                url: "http://localhost:2001/api",
                description: "Local server" 
            }
        ]
    },
    apis: ["./src/routes/*.routes.ts"]
}