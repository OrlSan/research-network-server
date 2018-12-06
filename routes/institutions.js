var express = require('express');
var Sequelize = require('sequelize');
var router = express.Router();

router.route('/')
	.get((req, res) => {
		Institution.findAll()
			.then(institutions => res.json(institutions))
	})
	.post((req, res) => {
		const institution = req.body.institution;
		if (institution === undefined) {
			return res.status(400).json({ Error: 'Missing institution' });
		}
		Institution.create({
			name: institution.name,
			faculty: institution.faculty,
			country: institution.country,
			email: institution.email,
			state: institution.state,
			address: institution.address
		})
		.then(institution => {
			res.status(201);
			res.json(institution);
		})
		.catch(Sequelize.ValidationError, err => {
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
		const institution = req.body;
		Institution.update(
			institution,
			{ where: { id: id } }
		)
		.then(updated => {
			res.status(200).json(updated);
		})
		.catch(err => {
			res.status(500).json(err);
		});
	});

router.route('/:id')
	.delete((req, res) => {
		const id = req.params.id;
		Institution.destroy({
			where: { id: id }
		})
		.then(deletedInstitution => {
			res.status(200).json(deletedInstitution);
		})
		.catch(err => {
			console.log('ERR', err);
			res.status(500).json(err);
		});
	});



module.exports = router;


