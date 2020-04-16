var bcrypt = require('bcrypt');
const saltRounds = 10;
var User = require('../models/user');
var execute = require('./core/execute');
var LogService = require('./logService');

var uuid = require('uuid');

class UserService{
    static async registerUser(user){
        try{
            let result = 1;
            let salt = bcrypt.genSaltSync(saltRounds);
            let hash = bcrypt.hashSync(user.PASSWORD, salt);
            let store = execute.Execute.GenerateStore(10, 'SP_REGISTER_USER');
            user.USERID = uuid.v4();
            user.PASSWORD = hash;
            user.CREATEDATE = new Date();
            let params = [user.USERID, user.USERNAME, user.PASSWORD, user.ROLE, user.ACTIVE,
                          user.EMAIL, user.DAYOFBIRTH, user.ADDRESS, user.CREATEDATE, user.CUDID];
    
            await execute.Execute.CallStore(store, params)
                .then(res => {
                    if(res.affectedRows <= 0) result = 0;
                })
                .catch(err => {
                    throw err;
                })

            return result;
        }
        catch(ex){
            LogService.createLog(ex, 'ERROR LOG');
            return null;
        }
    }
}

module.exports = UserService;