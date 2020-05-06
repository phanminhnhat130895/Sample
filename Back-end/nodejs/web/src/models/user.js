var Base = require('./base');

class User extends Base {
    constructor() {
        super();
        this.USERID = "";
        this.USERNAME = "";
        this.PASSWORD = "";
        this.ROLE = "";
        this.ACTIVE = 0;
        this.EMAIL = "";
        this.ADDRESS = "";
        // this.PHONE = "";
        this.DAYOFBIRTH = "";
    }

    parseObject(data){
        Object.assign(this, data);
    }
}

module.exports = User;