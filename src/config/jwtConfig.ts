import dotenv from 'dotenv'
dotenv.config()

export const jwtConfig = {
    jwtSecret: process.env.JWT_SECRET || '',
    issuer: process.env.ISSUER || '', // name of the aplication from node.js
    audience: process.env.AUDIENCE || '' // name of the aplication from front-end
}