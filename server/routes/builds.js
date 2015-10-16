var express = require('express');
var router = express.Router();
var models  = require('../models/models');

router.get('/', function(req, res) {
    res.json(models.Build.getByProject(req.query.projectId));
});

router.post('/', function(req, res){
    res.json(models.Build.save(req.body));
});

module.exports = router;
