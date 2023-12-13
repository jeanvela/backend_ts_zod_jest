import mongoose, { MongooseError } from "mongoose";
import { DB } from "./config/dbConfig";

export const dbConnect =async () => {
    try {
        const db = await mongoose.connect(DB.mongoDb_uri)
        console.log(`Database is connected to ${db.connection.db.databaseName}`);
        return db.connection.db.databaseName
    } catch (error) {
        if (error instanceof MongooseError) {
            return error.message
        }
        if (error instanceof Error) {
            return error.message
        }
        return error
    }
}