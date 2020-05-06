var Base = require('./base');

class Category extends Base {
    constructor() {
        super();
        this.idcategory = "";
        this.name = "";
        this.slug = "";
        this.status = 0;
    }

    parseObject(data){
        Object.assign(this, data);
    }
}

module.exports = Category;