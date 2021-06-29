'use strict';
const supertest = require('supertest');
const server = require('../src/server');
const request = supertest(server.server);
describe('bad method/request', () => {
    it('Handles bad route', async () => {
        const response = await request.get('/foo');
        expect(response.status).toEqual(404);
    });
    it('Handles bad method', async () => {
        const response = await request.post('/food');
        expect(response.status).toEqual(404);
    });
})
describe('The correct status codes and returned data for each REST route',()=>{
    let id;
    test('post method test',async()=>{
        const body={
            name:"apple",
            price:"30"
        }
        let result = await request.post('/api/v1/food').send(body);
        expect(result.statusCode).toEqual(200);
        expect(result.body.data.name).toBe(body.name);
        expect(result.body.data.price).toBe(body.price);
    })
    test('Read a list of records using GET',async()=>{
        const body1={
            name:"aaa1",
            price:"30"
        }
        const body2={
            name:"aaa2",
            price:"30"
        }
        let result1 =await request.post('/api/v1/food').send(body1);
        let result2 =await request.post('/api/v1/food').send(body2);
        id = result2.body.id;
        let result = await request.get('/api/v1/food');
        expect(result.body.length).toBe(3); 
    })
    test('Read a record using GET',async()=>{
        let result3 = await request.get("/api/v1/food/"+id);
        console.log(result3.body);
        expect(result3.status).toEqual(200);
        expect(result3.body.data.name).toBe("aaa2");
    })
    test('Update a record using PUT',async()=>{
        let result4 = await request.put("/api/v1/food/"+id).send({name:"modified",price:"50"});
        expect(result4.body.data.name).toEqual("modified");
    })
    test('Destroy a record using DELETE',async()=>{
        let result5 = await request.delete("/api/v1/food/"+id);
        expect(result5.body).toEqual('');
    })
})