
import request,{Response} from 'supertest';
import app from '../src/app';


describe('testing api',()=>{
    let response:Response;
    describe('testing route "/api"',()=>{
        beforeAll(async ()=>{
            response = await request(app)
            .get('/api');
        })
        test('should return code 200 and content-type "application/json"',async ()=>{


        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toContain('application/json')
    })
        test('should return "Hello"', async ()=>{
            expect(response.body).toBe('Hello')
        })
})
})