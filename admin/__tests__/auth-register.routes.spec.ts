import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import express from "express";
import authRoutes from "../src/routes/auth.routes"
import fakeUser from "../__mocks__/user.mock"

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use("/api", authRoutes);

describe("POST /register", () => {
    let mongoServer: MongoMemoryServer;
    beforeAll(async () => {
        const mongod = await MongoMemoryServer.create();

        const uri = mongod.getUri();
        await mongoose.connect(uri);
    });

    beforeEach(async () => {
        // await User.deleteMany({});
    });
    describe("when you send email, username, password ans isAdmin, to register new user", () => {
        test('should create a new user', async () => {
           
            const response = await request(app)
                .post('/api/register')
                .send(fakeUser)
            // expect(response.status).toEqual(200);
            expect(response.headers['content-type']).toContain('application/json');
            expect(response.headers['content-type']).toContain('application/json'); expect(response.body.msg).toBe("Registro completado")
        })
    })

    describe("when some info is missing", () => {

        test("should return 400.", async () => {
            const response = await request(app)
                .post('/api/register')
                .send({ password: "1234" });
            expect(response.status).toEqual(500);
            expect(response.headers['content-type']).toContain('application/json');
        })
       
    })

    describe("when some info is wrong", () => {

        test("should return 400.", async () => {
            const response = await request(app)
                .post('/api/login')
                .send({ email: "user68@mail.com",
                password:"password1234",
                username: "delete2",
                isAdmin: false });
            expect(response.status).toEqual(400);
            expect(response.headers['content-type']).toContain('application/json'); expect(response.body.msg).toBe("This user doesn't exist")
        })
       
    })
})


