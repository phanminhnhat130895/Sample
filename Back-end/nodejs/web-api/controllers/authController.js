var AuthService = require('../services/authService');

module.exports = (app) => {
    app.post('/api/auth/get-login', (req, res) => {
        try{
            let username = req.body.username;
            let password = req.body.password;
            AuthService.getLogin(username, password)
                .then(result => {
                    if(result){
                        res.json(result);
                    }
                    else{
                        res.json(0);
                    }
                })
                .catch(err => {
                    res.json(-1);
                })
        }
        catch(ex){
            res.json(-1);
        }
    })
}