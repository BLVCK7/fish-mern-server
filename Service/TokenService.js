import jwt from 'jsonwebtoken';
import TokenModel from '../Models/TokenModel.js';

export function generateTokens(payload) {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
  return {
    accessToken,
    refreshToken,
  };
}

export async function saveToken(userId, refreshToken) {
  const tokenData = await TokenModel.findOne({ user: userId });

  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }

  const token = await TokenModel.create({ user: userId, refreshToken });
  return token;
}

export async function removeToken(refreshToken) {
  const tokenData = await TokenModel.deleteOne({ refreshToken });
  return tokenData;
}

export function validateAccessToken(token) {
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return userData;
  } catch (error) {
    return null;
  }
}

export function validateRefreshToken(token) {
  try {
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    return userData;
  } catch (error) {
    return null;
  }
}

export async function findToken(refreshToken) {
  const tokenData = await TokenModel.findOne({ refreshToken });
  return tokenData;
}
