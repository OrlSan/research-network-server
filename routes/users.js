var express = require('express');
var Sequelize = require('sequelize');
var router = express.Router();

router.route('/')
    .get((req, res) => {
        User.findAll()
        .then(users => res.json(users))
    })
    .post((req, res) => {
        const user = req.body.user;
        if (user === undefined) {
            return res.status(400).json({Error: 'Missing user'});
        }
        User.create({
            name: user.name,
            lastname: user.lastname,
            date_birth: user.date_birth,
            email: user.email,
            profile: user.profile,
            InstitutionId: user.institution_id
        })
        .then(user => {
            res.status(201);
            res.json(user);
        })
        .catch(Sequelize.ValidationError, err => {
            console.log('SUPER ERROR', err);
            var errors = [];
            err.errors.forEach(element => {
                errors.push(element.message);
            });
            res.status(400).send({ error: errors });
        })
        .catch(err => {
            console.log("ERR", err);
            if (err.name === 'SequelizeDatabaseError') {
                res.status(409).send({ error: err });
            }
            res.status(500).send({ error: 'something blew up' });
        });
    });

router.route('/:id')
    .put((req, res) => {
        const id = req.params.id;
        const user = req.body;
        User.update(
            user,
            {where: {id: id}}
        ).then(updated => {
            res.status(200).json(updated);
        })
        .catch(err => {
            res.status(500).json(err);
        });;

    });

router.route('/:id')
    .delete((req, res) => {
        const id = req.params.id;
        User.destroy({
            where: { id: id }
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


