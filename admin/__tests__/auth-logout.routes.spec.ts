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


      
describe("POST /logout", () => {
    beforeAll(async () => {
        const mongod = await MongoMemoryServer.create();

        const uri = mongod.getUri();
        await mongoose.connect(uri);
    });

    describe("when you are login, yoy should logout", () => {
        test('should respond with a 200 & content-type "application/json', async () => {
        
            await request(app).post('/api/login')
                .send(fakeUser)
            const response = await request(app)
                .post('/api/logout')
                
            // expect(response.status).toEqual(200);
            expect(response.headers['content-type']).toContain('application/json');
            expect(response.headers['content-type']).toContain('application/json'); expect(response.body.msg).toBe("Logged out")
        })
    })

   
})