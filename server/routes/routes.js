var express = require('express');
var app = express();
var router = express.Router();

router.use('/users', require('./users'));
router.use('/projects', require('./projects'));
router.use('/versions', require('./versions'));
router.use('/builds', require('./builds'));
router.use('/logs', require('./logs'));

module.exports = router;
