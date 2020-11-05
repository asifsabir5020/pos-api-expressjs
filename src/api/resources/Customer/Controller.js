import { Customer } from './Model';
import { validateRequestBody } from './utils';

const entityName = 'Customer';

export default {
  async create(req, res) {
    try {
      const { requestParams, validationErrors } = validateRequestBody(req.body);
      if (validationErrors) {
         return res.status(421).send(validationErrors);
      }
      const newRecord = await Customer.create(requestParams);
      return res.send(newRecord);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  async index(req, res) {
    try {
      const records = await Customer.find()
      return res.send(records);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  async show(req, res) {
    try {
      const record = await Customer.findById(req.params.id);
      if (!record) {
        return res.status(404).send({ error: `could not find ${entityName}` });
      }
      return res.send(record);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  async delete(req, res) {
    try {
      const record = await Customer.findOneAndRemove({ _id: req.params.id });
      if (!record) {
        return res.status(404).send({ error: `could not find ${entityName}` });
      }
      return res.send(record);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  async update(req, res) {
    try {
      const { requestParams, validationErrors } = validateRequestBody(req.body);
      if (validationErrors) {
        return res.status(421).send(validationErrors);
      }
      const updatedRecord = await Customer.findOneAndUpdate({ _id: req.params.id }, requestParams, { new: true });
      if (!updatedRecord) {
        return res.status(404).send({ error: `could not find ${entityName}` });
      }
      return res.send(updatedRecord);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
