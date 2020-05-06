// import libs
var express = require('express');
var parser = require('body-parser');
// var cors = require('cors');
var engine = require('ejs-locals');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var path = require('path');

var app = express();

app.engine('ejs', engine);
app.use(parser.urlencoded({extended: true}));
app.use(parser.json());
// use static folders
app.use(express.static('static/public'));
app.use(express.static('static/libs'));
app.use(express.static('static/private'));

// config session
app.use(cookieParser());
app.use(session({
    key: 'user_sid',
    secret: 'mysecretstring',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000,
        domain: 'localhost',
        httpOnly: true
    }
}))

// config view engine
app.set('view engine', 'ejs');
app.set('views', 'src/views');

// clear cookie when run app
app.use((req, res, next) => {
    if(req.cookies.user_sid && req.session.user){
      res.clearCookie('user_id');
    }
    next();
})

require('./src/controllers/AuthController')(app);
require('./src/controllers/CategoryController')(app);

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});