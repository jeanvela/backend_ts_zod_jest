import dotenv from 'dotenv'
dotenv.config()

export const DB = {
    mongoDb_uri: process.env.MONGODB_URI || ""
}