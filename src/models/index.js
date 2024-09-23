/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { logger } = require('../config/logger');

const basename = path.basename(__filename);
// eslint-disable-next-line import/no-dynamic-require
const config = require(`${__dirname}/../config/database.js`);
const db = {};
const databases = Object.keys(config.databases);

/** Add Databases* */
// eslint-disable-next-line no-plusplus
for (let i = 0; i < databases.length; ++i) {
    const database = databases[i];
    const dbPath = config.databases[database];
    db[database] = new Sequelize(dbPath.database, dbPath.username, dbPath.password, dbPath);
    fs.readdirSync(`${__dirname}/${database}`)
        .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
        .forEach((file) => {
            const model = require(path.join(`${__dirname}/${database}`, file))(
                db[database],
                Sequelize.DataTypes
            );
            db[model.name] = model;
        });
    db.sequelize = db[database];
}
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;
