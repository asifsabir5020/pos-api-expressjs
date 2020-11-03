const config = {
    production: {
      secret: process.env.secret,
      MONGO_URI: process.env.MONGO_URI,
      port: process.env.PORT,
    },
    development: {
      secret: 'I_AME_GERER',
      MONGO_URI: 'mongodb://localhost/pos-db',
      port: 27017,
    }
};

export const getConfig = env => config[env] || config.development;

export const jwtSettings =  {
  secret: 'iuyifdretihk[pldfdrzr',
  expire: '3h',
}