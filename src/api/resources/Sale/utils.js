import Joi from 'joi';

export const validateSaleItemRequestBody = requestBody => {
    const schema = Joi.object({
        product: Joi.string().required(),
        quantity: Joi.number().required(),
    });
    const { value, error } = schema.validate(requestBody);
    if (error && error.details) {
      return { validationErrors: error.details };
    }
    return { requestParams: value };
}

const schemaSaleItem = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().required(),
});

export const validateSaleRequestBody = requestBody => {
  const schema = Joi.object({
      customer: Joi.string().required(),
      sale_items: Joi.array(),
  });
  const { value, error } = schema.validate(requestBody);
  if (error && error.details) {
    return { validationErrors: error.details };
  }
  return { requestParams: value };
}