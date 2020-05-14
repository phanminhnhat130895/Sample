import Base from "./base";

export default class User extends Base {
    constructor() {
        super();

        this.USERID = '';
        this.FIRSTNAME = '';
        this.LASTNAME = '';
        this.GENDER = '';
        this.DAYOFBIRTH = '';
        this.EMAIL = '';
        this.PHONE = '';
        this.ADDRESS = '';
        this.USERNAME = '';
        this.PASSWORD = '';
        this.ROLE = '';
        this.STATUS = '';
    }
}