require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const booksRoute = require('./scraper/app');

app.use(cors(['http://localhost:8080/']));

mongoose.connect(process.env.DATABASE_URL)
.then(() => app.listen(3000, () => console.log('Connected!')))
.catch((error) => console.log(error))

app.use(express.json());

app.use('/books', booksRoute)
