import mongoose, { disconnect } from "mongoose"
import { dbTest } from "./functions/dbTest"

beforeAll( async () => {
    await dbTest()
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