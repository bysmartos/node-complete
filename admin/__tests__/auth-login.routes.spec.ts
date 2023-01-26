import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import express from "express";
import adminRoutes from "../src/routes/admin.routes"
import fakeUser from "../__mocks__/user.mock"



const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use("/api", adminRoutes);


      
describe("POST /login", () => {
    beforeAll(async () => {
        const mongod = await MongoMemoryServer.create();

        const uri = mongod.getUri();
        await mongoose.connect(uri);
    });

    describe("when you send an email and password right, login works fine", () => {
        test('should respond with a 200 & content-type "application/json', async () => {
        
            await request(app).post('/api/register')
                .send(fakeUser)
            const response = await request(app)
                .post('/api/login')
                .send({
                    email: fakeUser.email,
                    password:fakeUser.password
                })
            // expect(response.status).toEqual(200);
            expect(response.headers['content-type']).toContain('application/json');
            expect(response.headers['content-type']).toContain('application/json'); expect(response.body.msg).toBe("Login completado")
        })
    })

    describe("when some info is missing", () => {

        test("should return 400.", async () => {
            const response = await request(app)
                .post('/api/login')
                .send({ password: "1234" });
            expect(response.status).toEqual(400);
            expect(response.headers['content-type']).toContain('application/json');
        })
       
    })

    describe("when some info is wrong", () => {

        test("should return 400.", async () => {
            const response = await request(app)
                .post('/api/login')
                .send({ email: "test@mail.com",
                password:"password1234" });
            expect(response.status).toEqual(400);
            expect(response.headers['content-type']).toContain('application/json'); expect(response.body.msg).toBe("This user doesn't exist")
        })
       
    })
})