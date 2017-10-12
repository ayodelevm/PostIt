import Validator from 'validator';


// Validation object contains methods to validate payload in client side

export const validateInput = (payload) => {
  const errors = {};

  if (!payload.fullname || !(/\S/.test(payload.fullname)) || Validator
    .isEmpty(payload.fullname)) {
    errors.fullname = 'This field is required';
  }
  if (!payload.email || !(/\S/.test(payload.email)) || Validator
    .isEmpty(payload.email)) {
    errors.email = 'This field is required';
  }
  if (payload.email && !Validator.isEmail(payload.email)) {
    errors.email = 'Email is invalid';
  }
  if (!payload.telephone || !(/\S/.test(payload.telephone)) || Validator
    .isEmpty(payload.telephone)) {
    errors.telephone = 'This field is required';
  }
  if (payload.telephone && !Validator
    .isMobilePhone(payload.telephone, 'any')) {
    errors.telephone = 'Mobile number is invalid';
  }
  if (payload.profileImage && !Validator
    .isURL(payload.profileImage, [{ allow_underscores: true }])) {
    errors.profileImage = 'Url is invalid. Please input a valid one.';
  }
  if (!payload.username || !(/\S/.test(payload.username)) || Validator
    .isEmpty(payload.username)) {
    errors.username = 'This field is required';
  }
  if (!payload.password || !(/\S/.test(payload.password)) || Validator
    .isEmpty(payload.password)) {
    errors.password = 'This field is required';
  }
  if (!payload.passwordConfirmation || !(/\S/.test(payload
    .passwordConfirmation)) || Validator
    .isEmpty(payload.passwordConfirmation)) {
    errors.passwordConfirmation = 'This field is required';
  }
  if (payload.password && payload.passwordConfirmation && !Validator
    .equals(payload.password, payload.passwordConfirmation)) {
    errors.passwordConfirmation = "Passwords don't match";
  }

  return {
    errors,
    isValid: !Object.keys(errors).length
  };
};

export const validateLoginInput = (payload) => {
  const errors = {};

  if (!payload.password || Validator.isEmpty(payload.password)) {
    errors.password = 'This field is required';
  }
  if (!payload.userIdentifier || Validator.isEmpty(payload.userIdentifier)) {
    errors.userIdentifier = 'This field is required';
  }

  return {
    errors,
    isValid: !Object.keys(errors).length
  };
};

export const validateGroupInput = (payload) => {
  const errors = {};

  if (!payload.name || !(/\S/.test(payload.name)) || Validator
    .isEmpty(payload.name)) {
    errors.name = 'This field is required';
  }

  return {
    errors,
    isValid: !Object.keys(errors).length
  };
};

export const validateResetPassword = (payload) => {
  const errors = {};

  if (!payload.password || !(/\S/.test(payload.password)) || Validator
    .isEmpty(payload.password)) {
    errors.password = 'This field is required';
  }
  if (!payload.passwordConfirmation || !(/\S/.test(payload
    .passwordConfirmation)) || Validator
    .isEmpty(payload.passwordConfirmation)) {
    errors.passwordConfirmation = 'This field is required';
  }
  if (payload.password && payload.passwordConfirmation && !Validator
    .equals(payload.password, payload.passwordConfirmation)) {
    errors.passwordConfirmation = "Passwords don't match";
  }

  return {
    errors,
    isValid: !Object.keys(errors).length
  };
};

export const validateEmail = (payload) => {
  const errors = {};

  if (!payload.email || !(/\S/.test(payload.email)) || Validator
    .isEmpty(payload.email)) {
    errors.email = 'This field is required';
  }
  if (payload.email && !Validator.isEmail(payload.email)) {
    errors.email = 'Email is invalid';
  }

  return {
    errors,
    isValid: !Object.keys(errors).length
  };
};
