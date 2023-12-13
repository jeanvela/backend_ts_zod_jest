import { z } from 'zod'

export const signinSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })
})

export const signupSchema = z.object({
    body: z.object({
        username: z.string().min(4),
        email: z.string().email(),
        password: z.string().min(6)
    })
})

export type SignInAuthSchema = z.infer<typeof signinSchema>["body"]
export type SignUpAuthSchema = z.infer<typeof signupSchema>["body"]