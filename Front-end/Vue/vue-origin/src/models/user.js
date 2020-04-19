import { Base } from "./base";

export default class User extends Base {
    constructor(){
        super();

        this.USERID = '',
        this.USERNAME = '';
        this.PASSWORD = '';
        this.ROLE = '';
        this.ACTIVE = '';
        this.EMAIL = '';
        this.DAYOFBIRTH = '';
        this.ADDRESS = '';
    }
}