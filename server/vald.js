const { check, validationResult } = require('express-validator/check');
const User = require('./models/Model');

const regValidation = [
	check('email')
		.not()
		.isEmpty()
		.withMessage('email is required!')
		.isLength({ min: 5 })
		.withMessage('email should be at least 5 letters')
		.custom(value => {
			return User.findOne({ email: value }).then(user => {
				if (user) {
					throw new Error('This email is already in use');
				}
			});
		}),
	check('password')
		.not()
		.isEmpty()
		.withMessage('Password can not be empty!')
		.isLength({ min: 5 })
		.withMessage('Password should be at least 5 letters'),

];

module.exports = { 
	regValidation,
	
};