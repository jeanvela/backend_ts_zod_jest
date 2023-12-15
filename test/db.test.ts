import mongoose, { disconnect } from "mongoose"
import { dbConnect } from "../src/db"

beforeAll( async () => {
    await dbConnect()
}) 

afterAll( async () => {
    await disconnect()
})

describe('DB connection', () => {
    test('shoul connect to MongoDB successfully',async () => {
        const db = mongoose.connection
        expect(db.readyState).toBe(1)
    })
})