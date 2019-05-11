const express = require('express');
const router = require('./routes/router');


const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(router);

app.listen(3000);