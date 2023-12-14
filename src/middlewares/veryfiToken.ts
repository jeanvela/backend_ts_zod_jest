import { Request, Response, NextFunction } from 'express'
import jwt, { JsonWebTokenError, VerifyOptions, VerifyErrors } from 'jsonwebtoken'
import { jwtConfig } from '../config/jwtConfig'

type TokenError = VerifyErrors | null

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const { token } = req.cookies
    try {
        if (!token) return res.status(401).json({message: 'No token, authorization denied'})
        const options: VerifyOptions = {
            algorithms: ['HS256'],
            // audience: jwtConfig.audience,
            // issuer: jwtConfig.issuer,
            ignoreExpiration: false,
            complete: false,
        }
        jwt.verify(token, jwtConfig.jwtSecret, options,(err: TokenError, user: any) => {
            if(err) throw new Error('Invalid token')
            req.user= user
            next()
        })
    } catch (err) {
        if (err instanceof JsonWebTokenError) {
            return res.status(401).json({message: err.message})
        }
        next(err)
    }
}