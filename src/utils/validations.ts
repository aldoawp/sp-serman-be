const { body } = require('express-validator');

export const itemTypeValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
];
