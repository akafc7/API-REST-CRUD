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
