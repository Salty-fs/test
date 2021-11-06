var express = require('express');
var router = express.Router();
var URL = require('url');
const fs = require('fs')
//加载mysql模块
// var mysql = require('mysql');

// var config = require('../config/dbconfig');

// var connection = mysql.createConnection(config);

//SQL语句
 var  sql = 'SELECT * FROM user';
// var  addSql = 'INSERT INTO user(id,psword) VALUES(?,?)';

router.post('/', function(req, res, next) {

    //解析请求参数
    var params = URL.parse(req.url, true).query;
    console.log("@req",req)
    console.log("@res",res)
    // var addSqlParams = [params.id];
              try {
                let data = JSON.stringify(params) +"\r\n"
                fs.writeFileSync('./log.txt', data,{ flag: 'a+' }, (err) => {})
                //file written successfully
              } catch (err) {
                console.error(err)
              }
    res.send(params)

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