import Joi from 'joi';

export const validateRequestBody = requestBody => {
    const schema = Joi.object({
        display_dashboard: Joi.boolean(),
        display_sales: Joi.boolean(),
        display_product: Joi.boolean(),
        display_product_category: Joi.boolean(),
        display_user_account: Joi.boolean(),
    });
    const { value, error } = schema.validate(requestBody);
    if (error && error.details) {
      return { validationErrors: error.details };
    }
    return { requestParams: value };
}