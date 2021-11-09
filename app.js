var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//socket服务器
var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({
        port: 8181
    }); //服务端口8181

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var forceRouter = require('./routes/force')
var search = require('./routes/search');
var add = require('./routes/add');
var test = require('./routes/test');
var fontRouter = require('./routes/font')
// var socket = require('./routes/socket')

var app = express();

//设置跨域访问
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/search', search);//查
app.use('/add', add);//添加
app.use('/test',test)
app.use('/force',forceRouter)
app.use('/api', fontRouter)
// app.use('./socket',socket)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


var EventEmitter = require('events').EventEmitter

var Eevent = new EventEmitter();

wss.on('connection', function(ws) {
  console.log('ok')
  Eevent.on('socket',function(data){
    // console.log('@info',forceRouter.inf)
    ws.send(data)
    console.log('socket发送数据')
  })

  ws.on('close', function () {
    if (clientSpeedUpdater > 0) {
        //断开连接清楚定时器
        clearInterval(clientSpeedUpdater);
    }
});
})
// var ws = require("nodejs-websocket");
// var server = ws.createServer(function(conn){
//     conn.on("text", function (str) {
//         console.log("收到的信息为:"+str)
//         if(str==="game1"){
//             game1 = conn;
//             game1Ready = true;
//             conn.sendText("success");
//         }
//         if(str==="game2"){
//             game2 = conn;
//             game2Ready = true;
//         }

//         if(game1Ready&&game2Ready){
//             game2.sendText(str);
//         }

//         conn.sendText(str)
//     })
//     conn.on("close", function (code, reason) {
//         console.log("关闭连接")
//     });
//     conn.on("error", function (code, reason) {
//         console.log("异常关闭")
//     });
// }).listen(8001)
// console.log("WebSocket建立完毕")

// var mosca = require('mosca');

// var ascoltatore = {
//     //using ascoltatore
//     //type: 'mongo',
//     //url: 'mongodb://localhost:27017/mqtt',
//     //pubsubCollection: 'ascoltatori',
//     //mongo: {}
// };

// var settings = {
//     port: 1883,
//     backend: ascoltatore
// };

// var server = new mosca.Server(settings);

// server.on('clientConnected', function (client) {
//     console.log('client connected', client.id);
// });
// server.on('ready', setup);


// function setup() {
//     console.log('Mosca server is up and running');
// }

module.exports = {
  app,
  Eevent
};
