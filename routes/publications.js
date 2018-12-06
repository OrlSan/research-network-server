var express = require('express');
var Sequelize = require('sequelize');
var router = express.Router();
var ModelUtils = require('../services/ModelUtils');

router.route('/')
	.get((req, res) => {
		Publication.findAll()
			.then(publications => res.json(publications))
	})
	.post((req, res) => {
		const publication = req.body.publication;
		if (publication === undefined) {
			return res.status(400).json({ Error: 'Missing publication' });
		}
		const idsAuthors = publication.authors;
		const idsAreas = publication.related_areas;
		ModelUtils.findModelsByIds(User, idsAuthors)
			.then(usersValidated => {
				users = usersValidated;
				return ModelUtils.findModelsByIds(Area, idsAreas);
			})
			.then(areasValidated => {
				areas = areasValidated;
				return Publication.create({
					title: publication.title,
					type: publication.type,
					is_public: publication.is_public,
					abstract: publication.abstract,
					AreaId: publication.area_id
				});
			})
			.then(publication => {
				publicationCreated = publication
				return publicationCreated.addUsers(users);
			})
			.then(() =>{
				return publicationCreated.addAreas(areas);
			}) 
			.then(() => {
				res.status(201);
				res.json(publicationCreated);
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
		const publication = req.body;
		Publication.update(
			publication,
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
		Publication.destroy({
			where: { id: id }
		})
		.then(deletedPublication => {
			res.status(200).json(deletedPublication);
		})
		.catch(err => {
			res.status(500).json(err);
		});
	});

module.exports = router;

