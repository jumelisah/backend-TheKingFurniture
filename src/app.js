const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const sequelize = require('./helpers/sequelize');
const seeders = require('./seeders');

// const { PORT } = process.env;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.use('/', require('./routes'));

const APP_PORT = process.env.PORT || 5000;

app.listen(APP_PORT, async () => {
  await sequelize.sync();
  await seeders.roles();
  await seeders.users();
  await seeders.categories();
  await seeders.transactionStatuses();
});
