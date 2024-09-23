// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

module.exports = {
    databases: {
        db_invoice: {
            database: process.env.DB_NAME,
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            host: process.env.DB_HOST,
            dialect: 'mysql',
            logging: (message) => {
                if (message.startsWith('Executing (default):')) {
                    // ignore regular query logs
                    return;
                }
                // log anything else (e.g. errors)
                console.error(message);
            },
            pool: {
                max: 50,
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
            options: {
                sql_mode: 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION'
            }
        },
        
    },

    // db_invoice: {
    //     database: process.env.DB_NAME, //you should always save these values in environment variables
    //     username: process.env.DB_USER, //only for testing purposes you can also define the values here
    //     password: process.env.DB_PASS,
    //     host: process.env.DB_HOST,
    //     dialect: 'mysql', //here you need to define the dialect of your database, in my case it is Postgres
    // },

};
