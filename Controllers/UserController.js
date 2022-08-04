import { registrationService } from '../Service/UserService.js';

export const login = async (req, res) => {
  try {
    // const doc = new UserModel({
    //   name: req.body.name,
    // });
    // const post = await doc.save();
    // console.log(post);
    // res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось создать статью',
    });
  }
};

export const logout = async (req, res) => {
  try {
    // const doc = new UserModel({
    //   name: req.body.name,
    // });
    // const post = await doc.save();
    // console.log(post);
    // res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось создать статью',
    });
  }
};

export const registration = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userData = await registrationService(username, email, password);

    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось зарегестрироваться',
    });
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
    res.status(500).json({
      message: 'Не удалось создать статью',
    });
  }
};

export const refresh = async (req, res) => {
  try {
    // const doc = new UserModel({
    //   name: req.body.name,
    // });
    // const post = await doc.save();
    // console.log(post);
    // res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось создать статью',
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    res.json(['123', '456']);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить пользователей',
    });
  }
};
