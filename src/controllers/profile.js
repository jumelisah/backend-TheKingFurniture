const argon = require('argon2');
const responseHandler = require('../helpers/responseHandler');
const User = require('../models/user');
const Role = require('../models/role');
const { comparePassword, inputValidator } = require('../helpers/validator');

exports.getProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const results = await User.findByPk(id, {
      attributes: {
        exclude: [
          'password',
          'is_deleted',
          'id_role',
          'createdAt',
          'updatedAt',
        ],
      },
      include: [
        {
          model: Role,
          attributes: ['id', 'name'],
        },
      ],
    });
    return responseHandler(res, 200, 'Profile data', results);
  } catch (e) {
    let error = e.message;
    if (Array.isArray(e.errors)) {
      error = e.errors.map((err) => ({ field: err.path, message: err.message }));
    }
    return responseHandler(res, 400, 'error', error);
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { id } = req.user;
    const fillable = [
      {
        field: 'oldPassword', required: true, type: 'password', by_pass_validation: true,
      },
      {
        field: 'newPassword', required: true, type: 'password',
      },
      {
        field: 'confirmPassword', required: true, type: 'password', by_pass_validation: true,
      },
    ];
    const { error, data } = inputValidator(req, fillable);
    if (!comparePassword(data.newPassword, data.confirmPassword)) {
      error.push('Confirm password is not same');
    }

    const user = await User.findByPk(id);
    if (!await argon.verify(user.password, data.oldPassword)) {
      error.push('Wrong old password!');
    }

    if (error.length > 0) {
      return responseHandler(res, 400, error);
    }

    user.password = data.newPassword;
    await user.save();
    return responseHandler(res, 200, 'Your password has been updated!');
  } catch (e) {
    let error = e.message;
    if (Array.isArray(e.errors)) {
      error = e.errors.map((err) => ({ field: err.path, message: err.message }));
    }
    return responseHandler(res, 400, 'error', error);
  }
};
