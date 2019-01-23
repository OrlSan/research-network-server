var express = require('express');
var Sequelize = require('sequelize');
var router = express.Router();
var ModelUtils = require('../services/ModelUtils');

router.route('/')
	.get((req, res) => {
		Project.findAll()
			.then(projects => res.json(projects))
	})
	.post((req, res) => {
		const project = req.body.project;
		if (project === undefined) {
			return res.status(400).json({ Error: 'Missing project' });
		} else if (project.user_id === undefined) {
			return res.status(400).json({ Error: 'Missing project.user_id' });
		}
		const idsMembers = project.members;
		ModelUtils.findModelsByIds(User, idsMembers)
			.then(usersValidated => {
				users = usersValidated;
				return Project.create({
          name: project.name,
          description: project.description,
          status: project.status,
					user_id: project.user_id
				});
			})
			.then(project => {
				projectCreated = project
				return projectCreated.addUsers(users);
			})
			.then(() => {
				res.status(201);
				res.json(projectCreated);
			})
			.catch(Sequelize.ValidationError, err => {
				var errors = [];
				err.errors.forEach(element => {
					errors.push(element.message);
				});
				res.status(400).send({ error: errors });
			})
			.catch(err => {
				if (err.message === 'NotFound') {
					return res.status(409).send({ error: 'Ids not found'});					
				} 
				if (err.name === 'SequelizeDatabaseError') {
					res.status(409).send({ error: err });
				}
				res.status(500).send({ error: 'something blew up' });
			});
	});

router.route('/:id')
	.put((req, res) => {
		const id = req.params.id;
		const projectReq = req.body.project;
		const idsMembers = projectReq.members;


		return Project.findOne({ where: { id: id }})
			.then((result) => {
				if (result === null) {
					throw new Error('NotFound');
				} else {
					return ModelUtils.findModelsByIds(User, idsMembers);
				}
			})
			.then(usersValidated => {
				users = usersValidated;
				return Project.update(
						projectReq,
						{ where: { id: id } }
				);
			})
			.then(() => {
				return Project.findOne({ where: { id: id }});
			})
			.then(project => {
				projectUpdated = project
				return projectUpdated.setUsers(users);
			})
			.then(() => {
				res.status(201);
				res.json(projectUpdated);
			})
			.catch(Sequelize.ValidationError, err => {
				var errors = [];
				err.errors.forEach(element => {
					errors.push(element.message);
				});
				res.status(400).send({ error: errors });
			})
			.catch(err => {
				if (err.message === 'NotFound') {
					return res.status(409).send({ error: 'Id not found' });					
				} 
				if (err.name === 'SequelizeDatabaseError') {
					return res.status(409).send({ error: err });
				}
				return res.status(500).send({ error: 'something blew up' });
			});
	});

router.route('/:id')
	.delete((req, res) => {
		const id = req.params.id;
		Project.destroy({
			where: { id: id }
		})
		.then(deletedProject => {
			res.status(204).json(deletedProject);
		})
		.catch(err => {
			res.status(500).json(err);
		});
	});

module.exports = router;

