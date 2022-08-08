import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import UserModel from '../Models/UserModel.js';
import { UserDto } from '../dtos/user-dto.js';
import {
  generateTokens,
  saveToken,
  removeToken,
  validateRefreshToken,
  findToken,
} from './TokenService.js';
import ApiError from '../exceptions/api-errors.js';

export async function registrationService(username, email, password) {
  try {
    const candidateEmail = await UserModel.findOne({ email });
    const candidateUsername = await UserModel.findOne({ username });

    if (candidateEmail) {
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
    } else if (candidateUsername) {
      throw ApiError.BadRequest(`Пользователь с именем ${username} уже существует`);
    }

    const passwordHash = await bcrypt.hash(password, 3);
    const activationLink = uuidv4();

    const user = await UserModel.create({
      username,
      email,
      password: passwordHash,
      activationLink,
    });

    // await sendActivationMail(email, `${process.env.API_URL}/api/activate/activationLink`);

    const userDto = new UserDto(user); // username, id, email, isActivated
    const tokens = generateTokens({ ...userDto });

    await saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  } catch (error) {
    throw ApiError.BadRequest(error);
  }
}

export async function loginService(username, password) {
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      throw ApiError.BadRequest('Неверный логин или пароль');
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest('Неверный логин или пароль');
    }
    const userDto = new UserDto(user);
    const tokens = generateTokens({ ...userDto });

    await saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  } catch (error) {
    throw ApiError.BadRequest(error);
  }
}

export async function logoutService(refreshToken) {
  try {
    const token = await removeToken(refreshToken);
    return token;
  } catch (error) {
    throw ApiError.BadRequest(error);
  }
}

export async function refreshService(refreshToken) {
  try {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = validateRefreshToken(refreshToken);
    const tokenFromDb = await findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = generateTokens({ ...userDto });

    await saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  } catch (error) {
    throw ApiError.BadRequest(error);
  }
}

export async function getAllUsersService() {
  const users = await UserModel.find();
  return users;
}
