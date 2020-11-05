import { Permission } from './Model';
import { validateRequestBody } from './utils';

const entityName = 'Permission';

export default {
  async show(req, res) {
    try {
      const record = await Permission.findOne({user: req.params.id});
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
      console.log('req.params', req.params.id);
      console.log('requestParams', requestParams);
      const updatedRecord = await Permission.findOneAndUpdate({ _id: req.params.id }, requestParams, { new: true });
      if (!updatedRecord) {
        return res.status(404).send({ error: `could not find ${entityName}` });
      }
      return res.send(updatedRecord);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
