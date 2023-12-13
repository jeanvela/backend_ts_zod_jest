import dotenv from 'dotenv'
dotenv.config()

export const jwtConfig = {
    jwtSecret: process.env.JWT_SECRET || 'lolalolalola',
    issuer: process.env.ISSUER || 'nose', // name of the aplication from node.js
    audience: process.env.AUDIENCE || 'nosexd' // name of the aplication from front-end
}