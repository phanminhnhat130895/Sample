var Base = require('./base');

class User extends Base {
    constructor(){
        super();
        
        this.USERID = '';
        this.USERNAME = '';
        this.PASSWORD = '';
        this.SALT = '';
        this.ROLE = '';
        this.ACTIVE = '';
        this.EMAIL = '';
        this.DAYOFBIRTH = '';
        this.ADDRESS = '';
    }

    parseObject(data){
        Object.assign(this, data);
    }
}

module.exports = User;