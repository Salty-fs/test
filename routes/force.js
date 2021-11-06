var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  try {
    let data =  req.toString() +"\r\n"
    fs.writeFileSync('./log.txt', data,{ flag: 'a+' }, (err) => {})
    //file written successfully
  } catch (err) {
    console.error(err)
  }
});