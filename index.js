//projeto aula  TI 323: cotuca 2026

const app=require('src/app')
const PORT=process.env.PORT ||3000;

app.listen(PORT, () => {
    console.log(`API rodando na porta ${PORT}`);
    console.log("Para testar:");
    console.log(`http://localhost:${PORT}/health`);
});
