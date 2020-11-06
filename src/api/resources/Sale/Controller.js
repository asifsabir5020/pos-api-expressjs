import asyncLib from 'async';
import { Sale } from './Model';
import { Stock } from './../Stock/Model';
import { validateSaleRequestBody } from './utils';

const entityName = 'Sale';

export default {
  async create(req, res) {
    try {
      const { requestParams, validationErrors } = validateSaleRequestBody(req.body);
      console.log('validationErrors', validationErrors);
      if (validationErrors) {
        return res.status(421).send(validationErrors);
      }
      
      const newRecord = await Sale.create(requestParams);

      asyncLib.eachSeries(newRecord.sale_items, function updateObject (item, done) {
        Stock.update(
          { product: item.product }, 
          { $inc : { quantity: -item.quantity }}, done);
      });
     
      return res.send(newRecord);
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
};
