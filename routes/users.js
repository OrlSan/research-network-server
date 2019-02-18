var express = require('express');
var Sequelize = require('sequelize');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	console.log('REQ SESSION2', req.session);
	console.log('REQ ISAUTHENTICATED', req.isAuthenticated());
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.status(401).json({
			msg: 'Unauthorized'
		});
	} 
};

router.get('/:id', (req,res) => {
	User.findByPk(req.params.id)
		.then(users => res.json(users))
});

router.route('/')
	.get((req, res) => {
		User.findAll()
			.then(users => res.json(users))
	})
	.post((req, res) => {
		const user = req.body.user;
		if (user === undefined || user === null) {
			return res.status(400).json({ Error: 'Missing user' });
		}

		return Institution.findByPk(user.institution_id)
		.then((foundInstitution) => {
			if (user.institution_id === undefined || foundInstitution) { // Dirty tricky ;)
				return User.create({
					name: user.name,
					lastname: user.lastname,
					date_birth: user.date_birth,
					email: user.email,
					password: user.password,
					profile: user.profile,
					institution_id: user.institution_id
				});
			}
			if (foundInstitution === null) {
				throw new Error('NotFoundInstitutionId');
			}
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
			if (err.message == 'NotFoundInstitutionId') {
				return res.status(409).send({ error: 'institution_id not found' });					
			}	else if (err.message == 'NotFoundUserId') {
				return res.status(409).send({ error: 'user id not found' });					
			} else if (err.message === 'NotFound') {
				return res.status(409).send({ error: 'Id not found' });					
			} else if (err.name === 'SequelizeDatabaseError') {
				return res.status(409).send({ error: err });
			}
			res.status(500).send({ error: 'something blew up' });
		});
	});

router.route('/:id')
	.put((req, res) => {
		const id = req.params.id;
		const user = req.body.user;
		const institution_id = user.institution_id;

		return User.findOne({ where: { id: id }})
		.then((foundUser) => {
			if (foundUser === null) {
				throw new Error('NotFoundUserId');
			}
			if (institution_id !== undefined) {
				return Institution.findByPk(institution_id)
				.then((foundInstitution) => {
					if (foundInstitution === null) {
						throw new Error('NotFoundInstitutionId');
					}
					return foundUser.update(user);
				})
			} else {
				return foundUser.update(user);
			}
		})
		.then(updatedUser => {
			res.status(200).json(updatedUser);	
		})
		.catch(Sequelize.ValidationError, err => {
			var errors = [];
			err.errors.forEach(element => {
				errors.push(element.message);
			});
			res.status(400).send({ error: errors });
		})
		.catch(err => {
			if (err.message == 'NotFoundInstitutionId') {
				return res.status(409).send({ error: 'institution_id not found' });					
			}	else if (err.message == 'NotFoundUserId') {
				return res.status(409).send({ error: 'user id not found' });					
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
		User.destroy({
			where: { id: id }
		})
		.then(deletedUser => {
			res.status(204).json(deletedUser);
		})
		.catch(err => {
			console.log('ERR', err);
			res.status(500).json(err);
		});
	});



module.exports = router;


