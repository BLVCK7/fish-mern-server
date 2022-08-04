import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import UserModel from '../Models/UserModel.js';

import { UserDto } from '../dtos/user-dto.js';

import { generateTokens, saveToken } from './TokenService.js';
import { sendActivationMail } from './MailService.js';

export async function registrationService(username, email, password) {
  try {
    const candidateEmail = await UserModel.findOne({ email });
    const candidateUsername = await UserModel.findOne({ username });

    if (candidateEmail) {
      throw new Error(`Пользователь с почтовым адресом ${email} уже существует`);
    } else if (candidateUsername) {
      throw new Error(`Пользователь с таким именем ${username} уже существует`);
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
    console.log(error);
    res.status(500).json({
      message: 'Не удалось создать статью',
    });
  }
}
