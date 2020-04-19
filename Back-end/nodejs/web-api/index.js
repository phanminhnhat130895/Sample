var express = require('express');
var cors = require('cors');
var parser = require('body-parser');

var app = express();

app.use(parser.urlencoded({extended: true}));
app.use(parser.json());
// use static folders
// app.use(express.static('public'));
app.use(express.static('libs'));
app.use(express.static('private'));

// config cors
var whiteList = ["http://localhost:4200", "http://localhost:3000", "http://localhost:3001", "http://localhost:8080"];
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whiteList.includes(req.header('Origin'))) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    }else{
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(cors(corsOptionsDelegate));

require('./controllers/authController')(app);
require('./controllers/userController')(app);

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});