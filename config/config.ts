require('dotenv').config()

const config = {
    SERVER:{
        HOST: process.env.HOST,
        PORT: process.env.PORT,
        PREFIX: '/api'
    },
    SECURITY:{
        TOKEN: process.env.jwt
    },
    DATABASE:{
        DB_HOST: process.env.DB_HOST,
        DB_USER: process.env.DB_USER,
        DB_NAME: process.env.DB_NAME,
        DB_PASSWORD: process.env.DB_PASSWORD
    }
}

export default config
