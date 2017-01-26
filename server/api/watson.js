var visualV3 = require('watson-developer-cloud/visual-recognition/v3');
var fs = require('fs');
var db = require('../config/db');

// var visual_recognition = new VisualRecognotionV3 ({
//     api_key: '<>',
//     version_data: '2016-05-20'
// });


db.raw(`SELECT images.idimages FROM images join tags on tags.idimages where images.idimages != tags.idimages`)
.then( function (results) {
    
    results[0].forEach(function (imgid) {
        console.log(imgid)
        db.raw(`SELECT imghash from images where idimages  = ${imgid.idimages}`)
        .then(function (result) {
            results.forEach( function (imgUrl) {
                imgUrl[0].imghash
            })
        });
    });
})
// var params = {

// };

// visua.classify(params, function (err, res) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(JSON.stringify(res,null, 2))
//     }
// });