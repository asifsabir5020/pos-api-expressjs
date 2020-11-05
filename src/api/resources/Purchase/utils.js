import Joi from 'joi';

export const validateRequestBody = requestBody => {
    const schema = Joi.object({
        product: Joi.string().required(),
        vendor: Joi.string().required(),
        quantity: Joi.number().required(),
    });
    const { value, error } = schema.validate(requestBody);
    if (error && error.details) {
      return { validationErrors: error.details };
    }
    return { requestParams: value };
}