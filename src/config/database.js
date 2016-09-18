'use strict';

const yaml = require('js-yaml');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

let env = process.env.NODE_ENV || 'development';
let db = yaml.safeLoad(ejs.render(fs.readFileSync(path.resolve(__dirname, './database.yml'), 'UTF-8')));
db = db[env];

let options = Object.assign({dialect: 'mysql'}, db['options'] || {});

let sequelize = new Sequelize(db['database'], db['user'], db['pass'], options);

module.exports = sequelize;
