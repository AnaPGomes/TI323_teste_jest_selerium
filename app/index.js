const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;
const API_URL = process.env.API_URL || "http://localhost:3001";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: "TI323_teste_jest_selerium",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 }
}));

// função de autenticação
function requireAuth(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }

    res.redirect("/login");
}


app.get("/", (req, res) => {
    if (req.session.user) {
        return res.redirect("/calculo");
    }

    res.render("login", { erro: null });
});


app.get("/login", (req, res) => {
    if (req.session.user) {
        return res.redirect("/calculo");
    }

    res.render("login", { erro: null });
});


app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
});


app.post("/login", (req, res) => {

    const { username, password } = req.body;

    if (username === "admin" && password === "admin") {

        req.session.user = {
            username: "admin",
            nome: "Administrador"
        };

        return res.redirect("/calculo");
    }

    res.render("login", {
        erro: "Usuário ou senha incorretos"
    });
});

// rota protegida
app.get("/calculo", requireAuth, (req, res) => {
    res.render("Página de cálculo");//se nao tiver autenticado nao deixa entrar
});

app.post('/calculo', requireAuth, async (req, res) => {

    try {

        const fetch = (await import('node-fetch')).default;

        const response = await fetch(`${API_URL}/api/calcular`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();

        res.json(data);

    } catch(err) {

        console.log(err.message);

        res.status(400).json({
            sucess: false,
            error: err.message
        });

    }

});




app.post("/api/calcular", (req, res) => {

    try {

        const { calcularArea } = require('./funcao');

        const dados = req.body;

        if (!dados || typeof dados !== 'object') {
            return res.status(400).json({
                error: "Corpo da requisição errado"
            });
        }

        const { altura = 0, largura = 0 } = dados;

        const resultado = calcularArea(altura, largura);

        return res.status(200).json({
            resultado: resultado.toFixed(2)
        });

    } catch (err) {

        return res.status(400).json({
            error: "Erro ao calcular área"
        });
    }
});
// iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

  
    

    


    // if(altura==0) throw new Error("altura com valor errado")
        //if(largura==0) throw new Error("largura com valor errado")
module.exports=app;