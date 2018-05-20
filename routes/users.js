var express = require('express');
var router = express.Router();

/* GET users listing */
router.get('/', function(req, rest, next) {
res.send('respond with a resource');
});

module.export = router;