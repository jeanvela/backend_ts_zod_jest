import { z } from 'zod'

export const taskCreateSchema = z.object({
    body: z.object({
        title: z.string().min(4).max(18),
        description: z.string().min(12).max(24),
    })
})

export const taskDeleteSchema = z.object({
    params: z.object({
        id: z.string().min(6)
    })
})

export const taskUpdateSchema = z.object({
    body: z.object({
        title: z.string().min(4).max(18),
        description: z.string().min(12).max(24),
        status: z.boolean().optional()
    }),
    params: z.object({
        id: z.string().min(6)
    })
})

export const taskStatusSchema = z.object({
    body: z.object({
        status: z.boolean()
    })
})

export type CreatedTaskType = z.infer<typeof taskCreateSchema>["body"]
export type DeletedTaskType = z.infer<typeof taskDeleteSchema>["params"]
export type UpdatedTaskBodyType = z.infer<typeof taskUpdateSchema>["body"]
export type UpdatedTaskParamsType = z.infer<typeof taskUpdateSchema>["params"]
export type StatusTaskType = z.infer<typeof taskStatusSchema>["body"]