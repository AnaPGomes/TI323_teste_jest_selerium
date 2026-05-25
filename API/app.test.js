//app.test.js
//teste da api

const { request } = require("express");

/*describes

aaa:
test('',asyc()=> {});
test('',()=> {});*/

const request=require('supertest')
const app=request('.../scr/app')

describe('teste para ver se api esta ok',()=>{
    Test('deve retornar 200 e status ok', async()=>{
        const res=await request(app).get('/health');//chamada
        expect(res.statusCode).toBe(200); //se a pag funcionou
        expectCookies(res.body.statusCode).toBe('ok'); 

    });
})