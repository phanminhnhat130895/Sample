class User{
    constructor(){
        this.USERID = '';
        this.USERNAME = '';
        this.PASSWORD = '';
        this.SALT = '';
        this.ROLE = '';
        this.ACTIVE = '';
        this.EMAIL = '';
        this.DAYOFBIRTH = '';
        this.ADDRESS = '';
        this.CREATEDATE = '';
        this.UPDATEDATE = '';
        this.DELETEDATE = '';
    }

    parseObject(data){
        Object.assign(this, data);
    }
}

module.exports = User