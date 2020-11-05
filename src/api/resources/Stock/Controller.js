import { Stock } from './Model';

const entityName = 'Stock';

export default {
  async index(req, res) {
    try {
      const records = await Stock.find().populate('product', 'title');
      return res.send(records);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  async show(req, res) {
    try {
      const record = await Stock.findById(req.params.id);
      if (!record) {
        return res.status(404).send({ error: `could not find ${entityName}` });
      }
      return res.send(record);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
};
