// initial config
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const Person = require('./models/Person');

// forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

// rotas API
app.post('/person', async (req, res) => {
    // req.body
    const { name, salary, approved } = req.body;

    if (!name) {
        res.status(422).json({ error: 'O nome é obrigatório!' });
    }

    const person = {
        name,
        salary,
        approved,
    };

    try {
        // criando dados
        await Person.create(person);

        res.status(201).json({
            msg: 'Pessoa inserida no sistema com sucesso!',
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// rota inicial / endpoint
app.get('/', (req, res) => {
    res.json({ msg: 'Hello Express!' });
});

// entregar uma porta
const DB_USER = 'fernando';
const DB_PASSWORD = encodeURIComponent('Ng1mywDrJlJc5JiH');
mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.xmkndft.mongodb.net/?retryWrites=true&w=majority`,
    )
    .then(() => {
        console.log('Conectado ao MongoDB');
        app.listen(3000);
    })
    .catch(err => console.log(err));

app.listen(3000);
