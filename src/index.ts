import app from "./app";
import { dbConnect } from "./db";
import dotenv from 'dotenv';
dotenv.config()

const PORT = process.env.PORT || 8080

app.listen(PORT, async () => {
    await dbConnect()
    console.log(`Server listening in ${PORT}`)
})