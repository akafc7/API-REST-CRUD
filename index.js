// initial config
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

// rotas API
const personRoutes = require('./routes/personRoutes');

app.use('/person', personRoutes);

// rota inicial / endpoint
app.get('/', (req, res) => {
    res.json({ msg: 'Hello Express!' });
});

// entregar uma porta
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);
mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.xmkndft.mongodb.net/?retryWrites=true&w=majority`,
    )
    .then(() => {
        console.log('Conectado ao MongoDB');
        app.listen(3000);
    })
    .catch(err => console.log(err));
