var jwt = require('jsonwebtoken');
var fs = require('fs');
var path = require('path');
var User = require('../models/user');
var execute = require('./core/execute');
var LogService = require('./logService');

var bcrypt = require('bcrypt');

const authOptions = {
    issuer:  'http://localhost:3000',
    subject:  'myemail@gmail.com',
    audience:  'http://localhost:3000',
    expiresIn:  '8h',
    algorithm:  'RS256'
}

class AuthService{
    static async getLogin(username, password){
        try{
            let rootpath = path.resolve(require.main.filename).substr(0, path.resolve(require.main.filename).lastIndexOf('\\'));
            let privateKey = fs.readFileSync(rootpath + '\\private\\privateKey.pem', 'utf-8');
            let store = execute.Execute.GenerateStore(1, 'SP_GET_LOGIN');
            let token = null;
            let user = new User();
            await execute.Execute.CallStore(store, [username])
                .then(res => {
                    if(res && res[0].length > 0){
                        user.parseObject(res[0][0]);
                    }
                })
                .catch(err => {
                    throw err;
                })

            let result = await bcrypt.compare(password, user.PASSWORD);
            if(result){
                let signOptions = authOptions;
                let payload = {'USERID': user.USERID, 'USERNAME': user.USERNAME, 'ROLE': user.ROLE, 'EMAIL': user.EMAIL};
                token = jwt.sign(payload, privateKey, signOptions);
            }
            return token;
        }
        catch(ex){
            LogService.createLog(ex, 'ERROR LOG');
            return null;
        }
    }

    static isAuthenticated(req, res, next){
        if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
            var token = req.headers.authorization.split(' ')[1];
            let rootpath = path.resolve(require.main.filename).substr(0, path.resolve(require.main.filename).lastIndexOf('\\'));
            let publicKey = fs.readFileSync(rootpath + '\\private\\publicKey.pem', 'utf-8');
            let verifyOptions = authOptions;
            jwt.verify(token, publicKey, verifyOptions,  (err, payload) => {
                if(err){
                    res.status(401).json({message: 'Unauthorized'}); 
                }
                else{
                    // let store = core.Core.GenStore(1, 'SP_GET_USER_LOGIN');
                    // await core.Core.CallStore(store, payload.user_name)
                    //     .then(res => {
                    //         if(res && res[0].length > 0){
                    //             next();
                    //         }
                    //         else{
                    //             res.status(401).json({message: 'Unauthorized'});
                    //         }
                    //     })
                    //     .catch(err => {
                    //         res.status(401).json({message: 'Unauthorized'});
                    //     })
                    next();
                }
            })
        }
        else{
            res.status(401).json({message: 'Unauthorized'});
        }
    }

    static authorize(roles = []){
        if(typeof roles === 'string'){
            roles = [roles];
        }

        return (req, res, next) => {
            if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
                var token = req.headers.authorization.split(' ')[1];
                let rootpath = path.resolve(require.main.filename).substr(0, path.resolve(require.main.filename).lastIndexOf('\\'));
                let publicKey = fs.readFileSync(rootpath + '\\private\\publicKey.pem', 'utf-8');
                let verifyOptions = authOptions;
                jwt.verify(token, publicKey, verifyOptions,  (err, payload) => {
                    if(err){
                        return res.status(401).json({message: 'Unauthorized'});
                    }
                    else{
                        if(roles.length > 0 && !roles.includes(payload.ROLE)){
                            return res.status(401).json({message: 'Unauthorized'});
                        }
                        return next();
                    }
                })
            }
            else{
                return res.status(401).json({message: 'Unauthorized'});
            }
        }
    }
}

module.exports = AuthService;