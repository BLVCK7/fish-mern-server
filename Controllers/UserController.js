import {
  registrationService,
  loginService,
  logoutService,
  refreshService,
  getAllUsersService,
} from '../Service/UserService.js';
import { validationResult } from 'express-validator';
import ApiError from '../exceptions/api-errors.js';

export const registration = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
    }
    const { username, email, password } = req.body;
    const userData = await registrationService(username, email, password);

    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(userData);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userData = await loginService(username, password);

    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(userData);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const token = await logoutService(refreshToken);
    res.clearCookie('refreshToken');

    return res.json(token);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const userData = await refreshService(refreshToken);

    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.json(userData);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService();

    return res.json(users);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const activate = async (req, res) => {
  try {
    // const doc = new UserModel({
    //   name: req.body.name,
    // });
    // const post = await doc.save();
    // console.log(post);
    // res.json(post);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
