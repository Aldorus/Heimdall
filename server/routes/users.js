var express = require('express');
var router = express.Router();
var models  = require('../models/models');

router.get('/', function(req, res) {
    res.json(models.User.all());
});

router.get('/:userId', function(req, res) {
    res.json(models.User.get(req.params.userId));
});

router.post('/', function(req, res) {
    res.json(models.User.save(req.body));
});

router.put('/:userId', function(req, res) {

    var user = req.body;
    user.id = req.params.userId;
    res.json(models.User.save(user));
});

router.delete('/:userId', function(req, res) {
    models.User.remove(req.params.userId);
    res.json({message: 'success'});
});

router.post('/auth', function(req, res) {
    console.log(req.body);
    if(models.User.size() === 0) {
        // We create the first user
        var user = {
            name: 'Admin',
            email: 'admin@peashooter.com',
            password: 'admin',
            role: 'admin'
        };
        models.User.save(user);
    }

    var user = models.User.getByEmail(req.body.email);
    if(user && user.password === req.body.password) {
        // We remove the password to response
        delete user.password;
        res.json(user);
    } else {
        res.status(403).json({message: 'failed'});
    }
});

module.exports = router;
