import { Purchase } from './Model';
import { Stock } from './../Stock/Model';
import { validateRequestBody } from './utils';

const entityName = 'Purchase';

export default {
  async create(req, res) {
    try {
      const { requestParams, validationErrors } = validateRequestBody(req.body);
      if (validationErrors) {
        return res.status(421).send(validationErrors);
      }
      const newRecord = await Purchase.create(requestParams);
      const updatedStock = await Stock.update(
                                      { product: requestParams.product },
                                      {$inc: {quantity: requestParams.quantity }});
      //: needs to be removed
      const record = await Purchase.findById(newRecord._id)
                                  .populate('product', 'title')
                                  .populate('vendor', 'name');
      return res.send(record);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  async index(req, res) {
    try {
      const records = await Purchase.find()
                                    .populate('product', 'title')
                                    .populate('vendor', 'name');
      return res.send(records);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  async show(req, res) {
    try {
      const record = await Purchase.findById(req.params.id).populate('category', 'title');
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
      const record = await Purchase.findOneAndRemove({ _id: req.params.id });
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
      const updatedRecord = await Purchase.findOneAndUpdate({ _id: req.params.id }, requestParams, { new: true });
      if (!updatedRecord) {
        return res.status(404).send({ error: `could not find ${entityName}` });
      }
      return res.send(updatedRecord);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
