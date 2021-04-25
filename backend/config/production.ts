export default {
  app: {
    port: process.env.PROD_APP_PORT ?? 3000,
  },
  db: {
    host: process.env.PROD_DB_HOST,
    port: process.env.PROD_DB_PORT,
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_DATABASE,
    synchronize: process.env.PROD_DB_SYNCHRONIZE || false,
  },
  auth: {
    jwtSecret: process.env.PROD_AUTH_JWT_SECRET ?? 'secret',
  },
};
