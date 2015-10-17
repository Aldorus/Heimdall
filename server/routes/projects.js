var express = require('express');
var router = express.Router();
var models  = require('../models/models');

router.get('/', function(req, res) {
    res.json(models.Project.all());
});

router.get('/:projectId', function(req, res) {
    res.json(models.Project.get(req.params.projectId));
});

router.post('/', function(req, res) {
    res.json(models.Project.save(req.body));
});

router.put('/:projectId', function(req, res) {

    var project = req.body;
    console.log(project);
    project.id = req.params.projectId;
    res.json(models.Project.save(project));
});

router.delete('/:projectId', function(req, res) {
    models.Project.remove(req.params.projectId);
    res.json({message: 'success'});
});

module.exports = router;