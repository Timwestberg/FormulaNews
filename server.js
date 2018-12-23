

// const {createServer} = require('http');

const express = require('express');
const compression = require('compression');
const mongoose = require('mongoose')
const morgan = require('morgan');
const bodyParser = require('body-parser')
const path = require('path');
const normalizePORT = port => parseInt(port, 10)
const PORT = normalizePORT(process.env.PORT || 5000)

const app = express();
const dev = app.get('env') !== 'production';
const articles = require('./routes/api/Articles');
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/articles', articles);

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/formulanews", { useNewUrlParser: true })
.then(() => console.log('MongoDB has been connected'))
.catch( err => console.log(err))


if(!dev) {
    app.disable('x-powered-by')

    app.use(compression())

    app.use(morgan('common'))
    
    app.use(express.static(path.resolve(__dirname, 'build')))
    
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'))

    })
}


if(dev) {

    app.use(morgan('dev'))
}

app.listen(PORT, err => {
    if(err) throw(err);

    console.log("http://localhost:" + PORT);

});