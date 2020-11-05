import { Product } from './../Product/Model';

const entityName = 'Dashboard';

export default {
  async index(req, res) {
    try {
      const stats =  await Product.find()
      return res.send({ total_products: stats.length});
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
