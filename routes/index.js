var express = require('express');
var router = express.Router();

/* Get home page */
router.get('/', function(req, rest, next) {
res.render('index', { title: 'Express' });
});

module.export = router;