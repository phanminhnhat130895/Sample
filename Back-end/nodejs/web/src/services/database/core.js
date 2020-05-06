var pool = require('../database/database');
class Core{
    static GenStore(numberOfParams, storeName){
        let finalName = 'CALL ' + storeName + '(';
        for(let i = 0; i < numberOfParams; i++){
            finalName += '?,';
        }
        return finalName.replace(/,([^,]*)$/, '') + ')';
    }

    static CallStore(sql, data){
        try{
            return new Promise((resolve, reject) => {
                pool.getConnection((err, connection) => {
                    if(err){
                        reject(err);
                    }
                    connection.query(sql, data, (error, results) => {
                        connection.release();
                        if(error){
                            reject(error);
                        }
                        resolve(results);
                    })
                })
            })
        }
        catch(ex){
            throw ex;
        }
    }
}

module.exports = {
    Core
}