var express = require('express');
var Sequelize = require('sequelize');
var router = express.Router();

router.route('/')
	.get((req, res) => {
		Area.findAll()
			.then(areas => res.json(areas))
	})
	.post((req, res) => {
		const area = req.body.area;
		if (area === undefined) {
			return res.status(400).json({ Error: 'Missing area' });
		}
		Area.create({
			name: area.name,
			image_url: area.image_url,
			description: area.description
		})
		.then(area => {
			res.status(201);
			res.json(area);
		})
		.catch(Sequelize.ValidationError, err => {
			var errors = [];
			err.errors.forEach(element => {
				errors.push(element.message);
			});
			res.status(400).send({ error: errors });
		})
		.catch(err => {
			if (err.name === 'SequelizeDatabaseError') {
				res.status(409).send({ error: err });
			}
			res.status(500).send({ error: 'something blew up' });
		});
	});

router.route('/:id')
	.put((req, res) => {
		const area_id = req.params.id;
		const area = req.body.area;

		return Area.findOne({where: {id: area_id}})
		.then((foundArea => {
			if (foundArea === null) {
				throw new Error('NotFoundAreaId');
			}
			return foundArea.update(area);
		}))
		.then(updatedArea => {
			res.status(200).json(updatedArea);	
		})
		.catch(Sequelize.ValidationError, err => {
			var errors = [];
			err.errors.forEach(element => {
				errors.push(element.message);
			});
			res.status(400).send({ error: errors });
		})
		.catch(err => {
			if (err.message == 'NotFoundAreaId') {
				return res.status(409).send({ error: 'Area id not found' });					
			} else if (err.message === 'NotFound') {
				return res.status(409).send({ error: 'Id not found' });					
			} else if (err.name === 'SequelizeDatabaseError') {
				return res.status(409).send({ error: err });
			}
			res.status(500).json(err);
		});
	});

router.route('/:id')
	.delete((req, res) => {
		const id = req.params.id;
		Area.destroy({
			where: { id: id }
		})
		.then(deletedArea => {
			res.status(204).json(deletedArea);
		})
		.catch(err => {
			res.status(500).json(err);
		});
	});




module.exports = router;


