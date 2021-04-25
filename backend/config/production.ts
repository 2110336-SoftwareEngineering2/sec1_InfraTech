export default {
  app: {
    port: process.env.PROD_APP_PORT ?? 3000,
  },
  db: {
    host: process.env.PROD_DB_HOST ?? 'mysqldb',
    port: process.env.PROD_DB_PORT ?? 3306,
    username: process.env.PROD_DB_USERNAME ?? 'root',
    password: process.env.PROD_DB_PASSWORD ?? 'admin',
    database: process.env.PROD_DB_DATABASE ?? 'letx',
    synchronize: process.env.PROD_DB_SYNCHRONIZE ?? false,
  },
  auth: {
    jwtSecret: process.env.PROD_AUTH_JWT_SECRET ?? 'secret',
  },
};
