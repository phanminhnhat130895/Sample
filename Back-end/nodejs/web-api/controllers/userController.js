var UserService = require('../services/userService');
var AuthService = require('../services/authService');

module.exports = (app) => {
    app.post('/api/user/register-user', AuthService.isAuthenticated, (req, res) => {
        try{
            UserService.registerUser(req.body)
                .then(result => {
                    res.json(result);
                })
                .catch(err => {
                    res.json(-2);
                })
        }
        catch(ex){
            res.json(-1);
        }
    })
}