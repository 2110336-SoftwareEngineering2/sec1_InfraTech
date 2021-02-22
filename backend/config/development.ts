export default {
  app: {
    port: process.env.DEV_APP_PORT ?? 3001,
  },
  db: {
    host: process.env.DEV_DB_HOST ?? 'mysqldb',
    port: process.env.DEV_DB_PORT ?? 3306,
    username: process.env.DEV_DB_USERNAME ?? 'root',
    password: process.env.DEV_DB_PASSWORD ?? 'admin',
    database: process.env.DEV_DB_DATABSE ?? 'letx',
    synchronize: process.env.DEV_DB_SYNCHRONIZE ?? false,
  },
  auth: {
    jwtSecret: process.env.DEV_AUTH_JWT_SECRET ?? 'secret',
  },
};
