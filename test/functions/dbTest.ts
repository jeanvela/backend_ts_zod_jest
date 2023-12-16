import mongoose from "mongoose";

export async function dbTest() {
    try {
        const db = await mongoose.connect('mongodb://127.0.0.1/databasetest')
        return db
    } catch (error) {
        if (error instanceof Error) return error.message
        return error
        // if (error instanceof Error) return Promise.reject(error.message)
        // return Promise.reject(error)
    }
}