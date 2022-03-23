const argon = require('argon2');
const jwt = require('jsonwebtoken');
const responseHandler = require('../helpers/responseHandler');
const { inputValidator } = require('../helpers/validator');
const User = require('../models/user');

const { APP_SECRET } = process.env;

exports.login = async (req, res) => {
  const fillable = [
    {
      field: 'email', required: true, type: 'email', max_length: 100,
    },
    {
      field: 'password', required: true, type: 'password', by_pass_validation: true,
    },
  ];
  const { error, data } = inputValidator(req, fillable);
  if (error.length > 0) {
    return responseHandler(res, 400, null, null, error);
  }

  const results = await User.findAll({
    where: {
      email: data.email,
    },
  });
  if (results.length === 0) {
    return responseHandler(res, 400, 'Invalid Credential!');
  }

  if (await argon.verify(results[0].dataValues.password, data.password)) {
    const authData = {
      id: results[0].id,
      role: results[0].role,
    };
    const token = jwt.sign(authData, APP_SECRET);
    return responseHandler(res, 200, 'Login success!', [token]);
  }

  return responseHandler(res, 400, 'Invalid Credential!');
};

exports.register = async (req, res) => {
  try {
    const fillable = [
      {
        field: 'email', required: true, type: 'email', max_length: 100,
      },
      {
        field: 'password', required: true, type: 'password', by_pass_validation: true,
      },
      {
        field: 'id_role', required: true, type: 'integer',
      },
    ];
    const { error, data } = inputValidator(req, fillable);
    if (error.length > 0) {
      return responseHandler(res, 400, null, null, error);
    }

    await User.create(data);
    return responseHandler(res, 201, 'Register Succesful!');
  } catch (e) {
    let error = e.message;
    if (Array.isArray(e.errors)) {
      error = e.errors.map((err) => ({ field: err.path, message: err.message }));
    }
    return responseHandler(res, 400, 'error', error);
  }
};
