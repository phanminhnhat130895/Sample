var core = require('./database/core');
var User = require('../models/user');

class AuthService{
    static async getLogin(username, password){
        try{
            let store = core.Core.GenStore(1, 'SP_GET_LOGIN');
            let userLogin = null;
            await core.Core.CallStore(store, [username])
                .then(res => {
                    if(res && res[0].length > 0){
                        let user = new User();
                        user.parseObject(res[0][0]);
                        let result = await bcrypt.compare(password, user.PASSWORD);
                        if(result)
                            userLogin = {'USERID': user.USERID, 'USERNAME': user.USERNAME, 'ROLE': user.ROLE, 'EMAIL': user.EMAIL};
                    }
                })
                .catch(err => {
                    throw err;
                })
            return userLogin;
        }
        catch(ex){
            return null;
        }
    }

    static sessionChecker(req, res, next){
        if(req.session.user && req.cookies.user_sid){
            res.redirect('/');
        }
        else{
            next();
        }
    }

    static isAuthenticated(req, res, next){
        if(req.session.user && req.cookies.user_sid){
            next();
        }
        else{
            res.redirect('/get-login');
        }
    }

    static authorize(roles = []){
        if(typeof roles === 'string'){
            roles = [roles];
        }

        return (req, res, next) => {
            if(req.session.user && req.cookies.user_sid){
                if(roles.length > 0 && !roles.includes(req.session.user.USER_ROLE)){
                    return res.redirect('/get-login');
                }
                return next();
            }
            else{
                return res.redirect('/get-login');
            }
        }
    }
}

module.exports = AuthService;