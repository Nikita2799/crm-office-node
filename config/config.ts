require("dotenv").config();

const config = {
  SERVER: {
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    PREFIX: "/api",
  },
  SECURITY: {
    TOKEN: process.env.jwt,
  },
  DATABASE: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  },
};

export default config;
