import { Response, Request } from 'express'
import Task from '../models/task'
import { CreatedTaskType } from '../schemas/task.schemas'

interface MyError extends Error {
    status?: number
}

type User = {
    _id: string,
    email: string
}

export const allTasks =async (req: Request, res: Response) => {
    const user: User = req.user
    try {
        const allTask = await Task.find({userId: user._id})
        return res.status(200).json(allTask)
    } catch (error) {
        const myError = error as MyError
        return res.status(myError.status || 404).json({ message: myError.message });
    }
}

export const oneTaskById =async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const task = await Task.findById({_id: id})
        if (!task) throw new Error('Not found task')
        return res.status(200).json(task)
    } catch (error) {
        const myError = error as MyError
        return res.status(myError.status || 404).json({message: myError.message})
    }
}

export const createdTask =async (req: Request, res: Response) => {
    const user = req.user
    const { title, description } = req.body
    try {
        const newTask = new Task({
            title,
            description,
            userId: user._id
        })
        await newTask.save()
        return res.status(201).json(newTask)
    } catch (error) {
        const myError = error as MyError
        return res.status(myError.status || 404).json({message: myError.message})
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const taskDelete = await Task.findByIdAndDelete(id)
        if (!taskDelete) throw new Error('Task not found')
        return res.status(200).send('deleted success')
    } catch (error) {
        const myError = error as MyError
        return res.status(myError.status || 404).json({message: myError.message})
    }
}

export const updateTask = async (req: Request, res: Response) => {
    const { id } = req.params
    const { title, description, status } = req.body
    try {
        await Task.findByIdAndUpdate(id, {title, description, status})
        return res.status(200).send({message: 'update success'})
    } catch (error) {
        const myError = error as MyError
        return res.status(myError.status ||404).json({message: myError.message})
    }
}

export const taskStatus = async (req: Request, res: Response) => {
    const { status } =req.body
    const { id } = req.params
    try {
        const task = await Task.findByIdAndUpdate(id, {$set: {status}})
        if (!task) throw new Error('Not found task')
        return res.status(200).send({message: 'update success'})
    } catch (error) {
        const myError = error as MyError
        return res.status(myError.status || 404).json({message: myError.message})
    }
}