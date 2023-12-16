import request from 'supertest'
import app from '../src/app'
import { generateValidateToken } from './functions/generateValidToken'
import { dbTest } from './functions/dbTest'
import { disconnect } from 'mongoose'

beforeAll( async () => {
    await dbTest()
}) 

afterAll(async () => {
    await disconnect()
})

const testuser = {
    _id: '657b3c1c073f53485166d348',
    username: 'benito',
    email: 'benito@gmail.com'
}

describe('GET /task', () => {
    test('should respond with a 200 status code', async () => {
        const validToken = generateValidateToken(testuser)
        const response = await request(app).get('/api/task').set('Authorization', `Bearer ${validToken}`).send()
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
    },20000)
    test('should respond with a 401 status code, authorization denied', async () => {
        const response = await request(app).get('/api/task').send()
        expect(response.status).toBe(401)
        expect(response.body.message).toBe("No token, authorization denied")
    })  
})

describe('GET /task/:id', () => {
    test('should respond with a 200 status code', async () => {
        const validToken = generateValidateToken(testuser)
        const response = await request(app).get('/api/task/657ba54a91c70a7cd2d7a5c4').set('Authorization', `Bearer ${validToken}`).send()
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
    })
    test('should respond with a 401 status code', async () => {
        const response = await request(app).get('/api/task/657ba5c9dc9d7ea444472c19').send()
        expect(response.status).toBe(401)
        expect(response.body.message).toBe("No token, authorization denied")
    })
    test('should respond with a 404 status code', async () => {
        const validToken = generateValidateToken(testuser)
        const response = await request(app).get('/api/task/657ba5c9dc9d7ea458472c19').set('Authorization', `Bearer ${validToken}`).send()
        expect(response.status).toBe(404)
        expect(response.body.message).toBe('Not found task')
    }, 20000)
})

describe('POST /task', () => {
    const task = {
        title: "tercera task xd",
        description: "tercera task xd xd"
    }
    const taskdenied = {
        title: "snsdf"
    }
    test('should respond with a 201 status code', async () => {
        const validToken = generateValidateToken(testuser)
        const response = await request(app).post('/api/task').set('Authorization', `Bearer ${validToken}`).send(task)
        expect(response.status).toBe(201)
    })
    test('should respond with a 401 status code, authorization denied', async () => {
        const response = await request(app).post('/api/task').send(task)
        expect(response.status).toBe(401)
    })
    test('should respond with a 400 status code', async () => {
        const validToken = generateValidateToken(testuser)
        const response = await request(app).post('/api/task').set('Authorization', `Bearer ${validToken}`).send(taskdenied)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Array)
    })
})

describe('DELETE /task', () => {
    test('should respond with a 200 status code', async () => {
        const validToken = generateValidateToken(testuser)
        const response = await request(app).delete('/api/task/657c68918926bda1b0b60850').set('Authorization', `Bearer ${validToken}`).send()
        expect(response.status).toBe((200))
    })
    test('should respond with a 404 status code', async () => {
        const validToken = generateValidateToken(testuser)
        const response = await request(app).delete('/api/task/657ba5c9dc9d7ea57272c19').set('Authorization', `Bearer ${validToken}`).send()
        expect(response.status).toBe(404)
    })
    test('should respond with a 401 status code, authorization denied', async () => {
        const response = await request(app).delete('/api/task/jasjasjasdas').send()
        expect(response.status).toBe(401)
    })
})

describe('PATCH /task', () => {
    test('should respond with a 200 status code', async () => {
        const validToken = generateValidateToken(testuser)
        const response = await request(app).patch('/api/task/657ba54a91c70a7cd2d7a5c4').set('Authorization', `Bearer ${validToken}`).send({status: true})
        expect(response.status).toBe(200)
    })
    test('should respond with a 404 status code', async () => {
        const validToken = generateValidateToken(testuser)
        const response = await request(app).patch('/api/task/657ba5c9dc9d7ea823472c19').set('Authorization', `Bearer ${validToken}`).send({status: true})
        expect(response.status).toBe(404)
    })
    test('should respond with a 401 status code, authorization denied', async () => {
        const response = await request(app).patch('/api/task/dnsdkjsd').send({status: true})
        expect(response.status).toBe(401)
    })
})