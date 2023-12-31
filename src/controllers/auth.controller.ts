import { Request, Response } from 'express';
import User from '../models/user';
import { hashPassword, comparePassword } from '../libs/password';
import { createdToken } from '../libs/token';

interface MyError extends Error {
    status?: number
}

export const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({email})
        if (!user) throw new Error('Invalid credentials')
        if (!user.password) throw new Error('Error')
        const isMatch = await comparePassword(password, user.password)
        if (!isMatch) throw new Error('Invalid credentials')
        const token = createdToken({_id: user._id, email})
        return res.status(200).set('Authorization', `Bearer ${token}`).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token
        })
    } catch (error) {
        const myError = error as MyError
        return res.status(myError.status || 400).json({ error: myError.message });
    }
}

export const signUp = async (req: Request, res: Response) => {
    const { username, email, password } = req.body
    try {
        const passwordHash = await hashPassword(password)
        const newUser = new User({
            username,
            email,
            password: passwordHash
        })
        await newUser.save()
        return res.status(200).send('User created')
    } catch (error) {
        const myError = error as MyError
        return res.status(myError.status || 400).json({message: myError.message})
    }
}

export const logout = (req: Request, res: Response) => {
    try {
        return res.status(200).cookie('token', '', {
            expires: new Date(0)
        }).send('logout')
    } catch (error) {
        
    }
}

export const verify = async (req: Request, res: Response) => {
    const user = req.user
    try {
        const oneUser = await User.findById(user._id)
        return res.status(200).json({
            _id: oneUser?._id,
            username: oneUser?.username,
            email: oneUser?.email
        })
    } catch (error) {
        return res.status(401).json({message: error})
    }
}