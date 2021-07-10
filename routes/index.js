var express = require('express');
var router = express.Router();
var client = require("../mqtt/main")

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.post('/', function (req, res, next) {
  console.log(req.body.message)
  client.publish('my/test/topic', req.body.message);
  res.render('index')
});

module.exports = router;
