var express = require('express');
const Sequelize = require('sequelize');
var router = express.Router();

router.route('/')
    .get((req, res) => {
        User.findAll()
            .then(users => res.json(users))
    })
    .post((req, res) => {
        console.log('REQ.BODY', req.body);
        const user = req.body.user;
        User.create({
            name: user.name,
            lastname: user.lastname,
            age: user.age,
            email: user.email,
            profile: user.profile
        })
        .then(user => {
            res.status(201);
            res.json(user);
        })
        .catch( Sequelize.ValidationError, err => {
            console.log('SUPER ERROR', err);
            var errors = [];
            err.errors.forEach(element => {
                errors.push(element.message);
            }); 
            res.status(400).send({ error: errors });
        } )
        .catch(err => {
            console.log("ERR", err);
            res.status(500).send({ error: 'something blew up' });
        });
    });

router.route('/:id')
    .delete((req, res) => {
        const id = req.params.id;
        User.destroy({
            where: {id: id}
        })
        .then(deletedUser => {
            res.status(200).json(deletedUser);
        })
        .catch(err => {
            console.log('ERR', err);
            res.status(500).json(err);
        });
    });

module.exports = router;


