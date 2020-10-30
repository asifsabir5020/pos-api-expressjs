import bcrypt from 'bcryptjs';
import { User } from './Model';
import { validateRequestBody, validateLoginRequestBody, generateToken } from './utils';

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
      console.log('newRecord', newRecord);
      const token = generateToken({email:newRecord.email});
      const user = {
        name: newRecord.name,
        email: newRecord.email,
        token
      };
      return res.send(user);
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
      if(!user){
        return res.status(401).send({ error: `invalid credentials` });
      }
      const isPasswordMatch = await bcrypt.compare(requestParams.password, user.password);
      if(!isPasswordMatch){
        return res.status(401).send({ error: `invalid credentials` });
      }
      const token = generateToken({email:user.email});
      console.log(user);
      const userPayload = {
        user: {
          name: user.name,
          email: user.email,
        },
        token
      };
      return res.send(userPayload);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
};
