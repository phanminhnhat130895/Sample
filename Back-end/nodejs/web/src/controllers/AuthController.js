var AuthService = require('../services/AuthService');

module.exports = (app) => {
    app.get('/get-login', AuthService.sessionChecker, (req, res) => {
        res.render('login/login', {message: ""});
    })

    app.post('/get-login', (req, res) => {
        try{
            let username = req.body.username;
            let password = req.body.password;
            AuthService.getLogin(username, password)
                .then(result => {
                    if(result){
                        req.session.user = result;
                        res.redirect('/');
                    }
                    else{
                        res.render('login/login', {message: 'Username or password incorrect'});
                    }
                })
                .catch(err => {
                    res.render('login/login', {message: 'Server Error. Contact admin for further information'});
                })
        }
        catch(ex){
            res.render('login/login', {message: 'Server Error. Contact admin for further information'});
        }
    })
}