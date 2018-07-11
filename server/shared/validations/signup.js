const Validator = require('validator');
const { isEmpty } = require('../../utils');

module.exports = function validateInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.username || '')) {
    errors.username = 'required_username';
  }

  if (!Validator.isAlphanumeric(data.username || '')) {
    errors.username = 'username_is_alphanumeric';
  }

  if (!Validator.isLength(data.username, { min: 3, max: 32 })) {
    errors.username = 'username_must_be_3_32';
  }

  if (Validator.isEmpty(data.password || '')) {
    errors.password = 'required_password';
  }

  if (!Validator.isLength(data.password, { min: 6, max: undefined })) {
    errors.password = 'password_least_6_char';
  }

  if (Validator.isEmpty(data.passwordConfirmation || '')) {
    errors.passwordConfirmation = 'required_password_confirm';
  }
  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'password_mush_match';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

