// Projeto aula ti 323. Cotuca 2026

const app = require('./app');

const PORT = process.env.PORT || 3001;

app.listen( PORT, () => {
    console.log(`API Rodando na porta ${PORT}`);
    console.log(`Para testar: `);
    console.log(`http://localhost:${PORT}/health`);
    console.log(` --  --  --  --  --  --  --`);
});