// 전체 메뉴 조회
// Author : Sumin, Created : 2021.10.15

var express = require('express');
var router = express.Router();
var config = require('../../config/db_config');
var connection = config.init();
connection.connect();

router.post('/getMenus', function (req, res) {
    var query = `SELECT menuName, menuDetail, menuPrice, categoryName FROM menu, category WHERE menu.storeNo = ${req.session.user.storeNo} AND menu.storeNo = category.storeNo`; // 메뉴 조회 쿼리문

    // DB에서 조회
    connection.query(query, function (err, result) {
        if(err) { // 에러 발생시
            console.log("error ocurred: ", err);
            res.json({ "code": 400, "result": "error ocurred" })
        } else {
            console.log(query); // 세션 값 확인용
            res.json({"code": 200, "result": "get menus success", "menus": result})
        }
    })

});

module.exports = router;