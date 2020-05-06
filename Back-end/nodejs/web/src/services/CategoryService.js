var core = require('./database/core');
var Category = require('../models/category');

class CategoryService {
    static async getAll() {
        try{
            let store = core.Core.GenStore(0, 'SP_CATEGORY_GET_ALL_CATEGORY');
            let result = null;
            await core.Core.CallStore(store, true)
                .then(res => {
                    if(res && res[0].length > 0){
                        result = res[0];
                    }
                })
                .catch(err => {
                    throw err;
                })
            return result;
        }
        catch(ex){
            return null;
        }
    }
}

module.exports = CategoryService;