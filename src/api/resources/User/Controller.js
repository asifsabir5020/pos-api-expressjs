import bcrypt from 'bcryptjs';
import { User } from './Model';
import { 
  validateRequestBody, 
  validateLoginRequestBody,
  validateUpdateRequestBody, 
  validateUserToggleRequestBody,
  generateToken } from './utils';
import { skt, clientList } from './../../../../src/app';


const entityName = 'User';

export default {
  async register(req, res) {
    try {
      const { requestParams, validationErrors } = validateRequestBody(req.body);
      if (validationErrors) {
         return res.status(421).send(validationErrors);
      }
      const salt = await bcrypt.genSalt(10);
      requestParams.password = await bcrypt.hash(requestParams.password, salt);
      const newRecord = await User.create(requestParams);
      return res.send(newRecord);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  async login(req, res) {
    try {
      const { requestParams, validationErrors } = validateLoginRequestBody(req.body);
      if (validationErrors) {
         return res.status(421).send(validationErrors);
      }
      const user = await User.findOne({ email: requestParams.email }).select('+password');
      if(user){
        if(!user.status){
          return res.status(401).send({ error: `user activation is disabled` });
        }
      }else{
        return res.status(401).send({ error: `invalid credentials` });
      }
      const isPasswordMatch = await bcrypt.compare(requestParams.password, user.password);
      if(!isPasswordMatch){
        return res.status(401).send({ error: `invalid credentials` });
      }
      const token = generateToken({email:user.email});
      const userPayload = {
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token
      };
      return res.send(userPayload);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  async index(req, res) {
    try {
      const records = await User.find();
      return res.send(records);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  async update(req, res) {
    try {
      const { requestParams, validationErrors } = validateUpdateRequestBody(req.body);
      if (validationErrors) {
        return res.status(421).send(validationErrors);
      }
      const updatedRecord = await User.findOneAndUpdate({ _id: req.params.id }, requestParams, { new: true });
      if (!updatedRecord) {
        return res.status(404).send({ error: `could not find ${entityName}` });
      }
      return res.send(updatedRecord);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  async toggleUserStatus(req, res) {
    try {
      const { requestParams, validationErrors } = validateUserToggleRequestBody(req.body);
      if (validationErrors) {
        return res.status(421).send(validationErrors);
      }
      const updatedRecord = await User.findOneAndUpdate({ _id: req.params.id }, requestParams, { new: true });
      if (updatedRecord) {
        if(!updatedRecord.status){
          const toBeDisabledClientList = clientList.filter(client => client.email === updatedRecord.email);
          toBeDisabledClientList.forEach(client => {
            skt.to(client.socketId).emit('user-status-toggle', 'user loggin disabled!!!');
          });
        }
      }else{
        return res.status(404).send({ error: `could not find ${entityName}` });
      }
      return res.send(updatedRecord);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};


