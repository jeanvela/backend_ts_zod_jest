import request from 'supertest'
import app from '../src/app'
import { dbTest } from './functions/dbTest'
import { disconnect } from 'mongoose'
import User from '../src/models/user'

let db: any;

beforeAll( async () => {
    db = await dbTest()
}) 

afterAll(async () => {
    await disconnect()
})

describe('POST /signup', () => {
    test('should respond with a 200 status code',async () => {
        const user = {
            username: 'prueba5',
            email: 'prueba5@gmail.com',
            password: 'prueba5123'
        }
        const response = await request(app).post('/api/signup').send(user)
        expect(response.status).toBe(200)
    }, 25000)
    test('should respond with a 401 status code if the user already exists',async () => {
        const user = {
            username: "kira",
            email: "kira@gmail.com",
            password: "kira123"
        }
        const response = await request(app).post('/api/signup').send(user)
        expect(response.status).toBe(401)
    })
    test('should responde with a 400 status code if there is any incorrect information', async () => {
        const user = {
            username: "messi",
            email: "messi.com",
            password: "messi123"
        }
        const response = await request(app).post('/api/signup').send(user)
        expect(response.status).toBe(400)
        expect(response.text).toBe('[{\"path\":[\"body\",\"email\"],\"message\":\"Invalid email\"}]')
    })
})

describe('POST /signin', () => {
    test('should respond with a 200 status code', async () => {
        const user = {
            email: 'benito@gmail.com',
            password: 'benito123'
        }
        const response = await request(app).post('/api/signin').send(user)
        expect(response.status).toBe(200)
    })
    test('should respond with a 401 status code if there is incorrect information', async () => {
        const user = {
            email: "benito@gmail.com",
            password: "12344fsds"
        }
        const response = await request(app).post('/api/signin').send(user)
        expect(response.status).toBe(401)
    })
    test('should respond with a 400 status code if there is any incorrect information', async () => {
        const user = {
            email: 'jjsjsdjsdsd',
            password: 'kskskskskksks'
        }
        const response = await request(app).post('/api/signin').send(user)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Array)
    })
})