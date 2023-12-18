declare namespace Express {
    export interface Request {
        user: {
            _id: string,
            email: string ,
            username: string
        }
    }
}