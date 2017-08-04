import Validator from 'validator';
import models from '../models/index';

export const validateInput = (data) => {
  const errors = {};

  if (!data.fullname || Validator.isEmpty(data.fullname)) {
    errors.fullname = 'This field is required';
  }
  if (!data.email || Validator.isEmpty(data.email)) {
    errors.email = 'This field is required';
  }
  if (data.email && !Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (!data.telephone || Validator.isEmpty(data.telephone)) {
    errors.telephone = 'This field is required';
  }
  if (data.telephone && !Validator.isMobilePhone(data.telephone, 'any')) {
    errors.telephone = 'Mobile number is invalid.';
  }
  if (data.profileImage && !Validator.isURL(data.profileImage, [{ allow_underscores: true }])) {
    errors.profileImage = 'Url is invalid. Please input a valid one.';
  }
  if (!data.username || Validator.isEmpty(data.username)) {
    errors.username = 'This field is required';
  }
  if (!data.password || Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }
  if (!data.passwordConfirmation || Validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'This field is required';
  }
  if (data.password && data.passwordConfirmation && !Validator
    .equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = "Passwords don't match";
  }

  return {
    errors,
    isValid: !Object.keys(errors).length
  };
};

export const validateSignup = (data, inputValidations) => {
  const { errors } = inputValidations(data);

  return models.User.findOne({
    where: { $or: [
        { username: data.username },
        { email: data.email }]
    },
  }).then((foundUser) => {
    if (foundUser) {
      if (foundUser.username === data.username) {
        errors.username = 'username is not available';
      }
      if (foundUser.email === data.email) {
        errors.email = 'email is not available';
      }
    }

    return {
      errors,
      isValid: !Object.keys(errors).length
    };
  });
};

export const validateLoginInput = (data) => {
  console.log(data)
  const errors = {};

  if (!data.password || Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }
  if (!data.userIdentifier || Validator.isEmpty(data.userIdentifier)) {
    errors.userIdentifier = 'This field is required';
  }

  return {
    errors,
    isValid: !Object.keys(errors).length
  };
};
