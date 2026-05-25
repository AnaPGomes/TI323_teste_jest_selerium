const{cacularArea,} =require('../src/funcao')
describe('teste com valores corretos', ()=>{
    test ('valores incorretos',()=>{
        expect(()=> calcularArea(-1,10).toThrow('Valor errado'));
    })
    test ('valores corretos',()=>{
        expect(()=> calcularArea(2,2).toBe(4));
    });

})