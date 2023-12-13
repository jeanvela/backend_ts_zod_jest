import { Request, Response, NextFunction } from 'express'
import jwt, { JsonWebTokenError, VerifyOptions } from 'jsonwebtoken'
import { jwtConfig } from '../config/jwtConfig'

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const { token } = req.cookies
    if (!token) return res.status(401).json({message: 'No token, authorization denied'})
    const options: VerifyOptions = {
        algorithms: ['HS256'],
        audience: jwtConfig.audience,
        issuer: jwtConfig.issuer,
        ignoreExpiration: false,
    }
    try {
        const user = jwt.verify(token, jwtConfig.jwtSecret, options) as any
        req.user = user
        next()
    } catch (err) {
        if (err instanceof JsonWebTokenError) {
            return res.status(401).json({message: 'Invalid token'})
        }
        next(err)
    }
    // jwt.verify(token, jwtConfig.jwtSecret, (err: JsonWebTokenError, user: any) => {
    //     if (err) return res.status(401).json({message: 'Invalid token'})
    //     req.user = user
    //     next()
    // })
}