import jwt from 'jsonwebtoken'
import { jwtConfig } from '../config/jwtConfig'
import { Types } from 'mongoose'

interface Iuser {
    _id: Types.ObjectId
    email: string
}

export function createdToken(user: Iuser) {
    return jwt.sign({
        _id:user._id,
        email: user.email
    }, jwtConfig.jwtSecret, {
        expiresIn: 86400
    })
}