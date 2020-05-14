import Base from "./base";

export default class User extends Base {
    constructor() {
        super();

        this.userid = '';
        this.firstname = '';
        this.lastname = '';
        this.gender = '';
        this.dayofbirth = null;
        this.email = '';
        this.phone = '';
        this.address = '';
        this.username = '';
        this.password = '';
        this.role = '';
        this.status = 0;
    }
}