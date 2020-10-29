import Joi from 'joi';
import jwt from 'jsonwebtoken';
import { jwtSettings } from '../../../config/config';

export const validateRequestBody = requestBody => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        role: Joi.string(),
    });
    const { value, error } = schema.validate(requestBody);
    if (error && error.details) {
      return { validationErrors: error.details };
    }
    return { requestParams: value };
}

export const validateLoginRequestBody = requestBody => {
  const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
  });
  const { value, error } = schema.validate(requestBody);
  if (error && error.details) {
    return { validationErrors: error.details };
  }
  return { requestParams: value };
}

export const generateToken = (payload) => {
  return jwt.sign(payload, jwtSettings.secret, {expiresIn: jwtSettings.expire});
}