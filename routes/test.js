var express = require('express');
var router = express.Router();
var URL = require('url');
//加载mysql模块
var mysql = require('mysql');

var config = require('../config/dbconfig');

var connection = mysql.createConnection(config);

//SQL语句
 var  sql = 'SELECT * FROM user';
// var  addSql = 'INSERT INTO user(id,psword) VALUES(?,?)';

router.get('/', function(req, res, next) {

    res.send('test ok')

    //解析请求参数
    // var params = URL.parse(req.url, true).query;
    // var addSqlParams = [params.id, params.psword];
      
    // 增
    // connection.query(addSql,addSqlParams,function (err, result) {
    //     if(err){
    //      console.log('[INSERT ERROR] - ',err.message);
    //      return;
    //     }
    //     result.message='success'
    //     console.log(result.message)             
    // });
    
    //查
    // connection.query(sql,function (err, result) {
    //     if(err){
    //       console.log('[SELECT ERROR] - ',err.message);
    //       return;
    //     }
    //     console.log(params.id);
        
    //     //把搜索值输出
    //    res.send(result);
    // });
});

module.exports = router;