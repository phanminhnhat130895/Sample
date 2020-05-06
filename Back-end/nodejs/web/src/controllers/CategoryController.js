var Category = require('../models/category');
var CategoryService = require('../services/CategoryService');
var AuthService = require('../services/AuthService');
// var Excel = require('../common/excel');
module.exports = function(app){
    app.get('/', AuthService.isAuthenticated, (req, res) => {
        try{
            CategoryService.getAll()
                .then(result => {
                    if(result) {
                        res.render('category/list', {data: result, message: []});
                    }
                    else {
                        res.render('category/list', {data: [], message: 'Data not found'});
                    }
                })
                .catch(err => {
                    res.render('category/list', {data: [], message: 'System error'});
                })
        }
        catch(ex){
            res.render('category/list', {data: [], message: 'System error'});
        }
    })

    // app.get('/get-all', AuthService.authorize("Admin"), (req, res) => {
    //     try{
    //         BlogService.getAllBlogs()
    //             .then(result => {
    //                 if(result){
    //                     // let temp = temfile('.xlsx');
    //                     // let header = [
    //                     //     {header: 'ID', key: 'ID', width: 10},
    //                     //     {header: 'TITLE', key: 'TITLE', width: 32},
    //                     //     {header: 'CONTENT', key: 'CONTENT', width: 10, style: { numFmt: 'yyyy/mm/dd' }}
    //                     // ];

    //                     // Excel.ExportExcel(result, header)
    //                     //     .then(resExcel => {
    //                     //         resExcel.xlsx.writeFile(temp).then(() => {
    //                     //             res.sendFile(temp);
    //                     //         })
    //                     //     })
    //                     //     .catch(err => {
    //                     //         res.send('error: ' + err);
    //                     //     })
    //                     res.render('blog/list', {data: result, message: []});
    //                 }
    //                 else{
    //                     res.render('blog/list', {data: [], message: ['have no record']});
    //                 }
    //             })
    //             .catch(err => {
    //                 res.render('blog/list', {data: [], message: ['system error']});
    //             })
    //     }
    //     catch(ex){
    //         res.render('blog/list', {data: [], message: ['system error']});
    //     }
    // })

    // app.get('/get-by-id-blog/:idBlog', AuthService.authorize("SuperAdmin"), (req, res) => {
    //     try{
    //         let idBlog = req.params.idBlog;
    //         BlogService.getById(idBlog)
    //             .then(result => {
    //                 if(result){
    //                     res.render('blog/detail', {data: result, message: []});
    //                 }
    //                 else{
    //                     res.render('blog/detail', {data: null, message: ['have no record']});
    //                 }
    //             })
    //             .catch(err => {
    //                 res.render('blog/detail', {data: null, message: ['system error']});
    //             })
    //     }
    //     catch(ex){
    //         res.render('blog/detail', {data: null, message: ['system error']});
    //     }
    // })

    // app.post('/post-json-data', AuthService.isAuthenticated, (req, res) => {
    //     try{
    //         let blog = new Blog();
    //         blog.parseObject(req.body);
    //         BlogService.insertBlog(blog)
    //             .then(result => {
    //                 res.json(result.affectedRows);
    //             })
    //             .catch(err => {
    //                 res.json(-1);
    //             })
    //     }
    //     catch(ex){
    //         res.json(-1);
    //     }
    // })

    // app.get('/get-mongo', (req, res) => {
    //     try{
    //         let a = [
    //             {ID: 1, CATE_ID: 1, CONTENT: "AAAA"},
    //             {ID: 2, CATE_ID: 2, CONTENT: "BBBB"},
    //             {ID: 3, CATE_ID: 3, CONTENT: "CCCC"}
    //         ]

    //         let b = [
    //             {ID: 1, SUB_ID: 1, TITLE: "AAAA"},
    //             {ID: 2, SUB_ID: 2, TITLE: "BBBB"}
    //         ]

    //         // let r = join("ID", a, b);
    //         // //let r1 = join("ID", {TITLE: ''}, a, b);
    //         // let blogs = [];
    //         // r.forEach(e => {
    //         //     let blog = new Blog();
    //         //     blog.parseObject(e);
    //         //     blogs.push(blog);
    //         // })

    //         let r = join(a, b, ["ID", "CATE_ID"], ["ID", "SUB_ID"]);
    //         console.log(r);

    //         BlogService.getAllMongo()
    //             .then(result => {
    //                 if(result){
    //                     res.send(result);
    //                 }
    //                 else{
    //                     res.send('no record');
    //                 }
    //             })
    //             .catch(err => {
    //                 res.send('error');
    //             })
            
    //     }
    //     catch(ex){
    //         res.send('error: ' + ex);
    //     }
    // })

    // app.get('/export-excel', (req, res) => {
    //     try{
    //         let temp = temfile('.xlsx');
    //         let header = [
    //             {header: 'ID', key: 'ID', width: 10},
    //             {header: 'TITLE', key: 'TITLE', width: 32},
    //             {header: 'CONTENT', key: 'CONTENT', width: 10, style: { numFmt: 'yyyy/mm/dd' }}
    //         ];

    //         let blog = new Blog();
    //         blog.ID = 1;
    //         blog.TITLE = 'Blog 1';
    //         blog.CONTENT = '1995/02/15';

    //         let data = [
    //             blog
    //         ]
    //         Excel.ExportExcel(data, header)
    //             .then(result => {
    //                 result.xlsx.writeFile(temp).then(() => {
    //                     res.sendFile(temp);
    //                 })
    //             })
    //             .catch(err => {
    //                 res.send('error: ' + err);
    //             })
    //     }
    //     catch(ex){
    //         res.send('ex: ' + ex);
    //     }
    // })

    // app.get('/join-mongo', (req, res) => {
    //     try{
    //         BlogService.joinMongo()
    //             .then(result => {
    //                 if(result)
    //                     res.send(result);
    //                 else
    //                     res.send('have no record');
    //             })
    //             .catch(err => {
    //                 res.send('error: ' + err);
    //             })
    //     }
    //     catch(ex){
    //         res.send('ex: ' + ex);
    //     }
    // })

    // app.get('/join-multi-mongo', (req, res) => {
    //     try{
    //         BlogService.joinMultiMongo()
    //             .then(result => {
    //                 if(result)
    //                     res.send(result);
    //                 else
    //                     res.send('have no record');
    //             })
    //             .catch(err => {
    //                 res.send('error: ' + err);
    //             })
    //     }
    //     catch(ex){
    //         res.send('ex: ' + ex);
    //     }
    // })
}

function innerJoin(array, anotherArray, arrayJoinConditions, anotherArrayJoinConditions){
    let result = [];
    for(let i = 0; i < array.length; i++){
        for(let j = 0; j < anotherArray.length; j++){
            let isMatch = false;
            for(let k = 0; k < arrayJoinConditions.length; k++){
                if(array[i][arrayJoinConditions[k]] == anotherArray[j][anotherArrayJoinConditions[k]]){
                    isMatch = true;
                }
                else{
                    isMatch = false;
                }
            }
            if(isMatch){
                result.push(Object.assign({}, array[i], anotherArray[j]));
                break;
            }
        }
    }
    return result;
}

function leftJoin(array, anotherArray, arrayJoinConditions, anotherArrayJoinConditions){
    let result = [];
    for(let i = 0; i < array.length; i++){
        for(let j = 0; j < anotherArray.length; j++){
            let isMatch = false;
            for(let k = 0; k < arrayJoinConditions.length; k++){
                if(array[i][arrayJoinConditions[k]] == anotherArray[j][anotherArrayJoinConditions[k]]){
                    isMatch = true;
                }
                else{
                    isMatch = false;
                }
            }
            if(isMatch){
                result.push(Object.assign({}, array[i], anotherArray[j]));
                break;
            }
            else{
                if(j == anotherArray.length - 1)
                    result.push(array[i]);
            }
        }
    }
    return result;
}

function rightJoin(array, anotherArray, arrayJoinConditions, anotherArrayJoinConditions){
    let result = [];
    for(let i = 0; i < array.length; i++){
        for(let j = 0; j < anotherArray.length; j++){
            let isMatch = false;
            for(let k = 0; k < arrayJoinConditions.length; k++){
                if(array[i][arrayJoinConditions[k]] == anotherArray[j][anotherArrayJoinConditions[k]]){
                    isMatch = true;
                }
                else{
                    isMatch = false;
                }
            }
            if(isMatch){
                result.push(Object.assign({}, array[i], anotherArray[j]));
                break;
            }
            else{
                if(j == anotherArray.length - 1)
                    result.push(anotherArray[j]);
            }
        }
    }
    return result;
}

// function join (indexName, ...arrays) {
//     const map = new Map();
//     arrays.forEach((array) => {
//         let i = 1;
//         array.forEach((item) => {
//             map.set(
//                 i,
//                 Object.assign(item, map.get(i))
//             );
//             i++;
//         })
//     })

//     return [...map.values()];
// }

// function join (indexName, defaults, ...arrays) {
//     const map = new Map();
//     arrays.forEach((array) => {
//         array.forEach((item) => {
//             map.set(
//                 item[indexName], 
//                 Object.assign( 
//                     item, 
//                     map.get(item[indexName])
//                 )
//             );
//         })
//     })

//     return [...map.values()].map(item => Object.assign({}, defaults, item));
// }