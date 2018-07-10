const Validator = require('validator');
const { isEmpty } = require('../../utils');

module.exports = function validateInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.username || '')) {
    errors.username = 'required_username';
  }

  if (Validator.isEmpty(data.password || '')) {
    errors.password = 'required_password';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
