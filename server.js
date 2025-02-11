const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json()); // install body-parser 'npm i body-parser'

// routes will work across different sites
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  });

app.use('/', require('./routes'));

mongodb.initDB((err) => {
    if(err) {
        console.log(err);
    } else {
        app.listen(port, () => {console.log(`Database is listening and node running on port ${port}`)});
    }
});


// app.listen(port, () => {console.log(`Server is running on port ${port}`)});