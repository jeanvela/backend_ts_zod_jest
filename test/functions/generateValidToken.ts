import { User } from "../interface/user.interface"
import jwt from 'jsonwebtoken'
import { jwtConfig } from "../../src/config/jwtConfig"

export const generateValidateToken = (userId: User, secretKey: string = jwtConfig.jwtSecret, expiresIn: string ='1h') => {
    const payload = {
        _id: userId._id,
        username: userId.username,
        email: userId.email
    }
    const token: string = jwt.sign(payload, secretKey, {expiresIn})
    return token
}