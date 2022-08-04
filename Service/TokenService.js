import jwt from 'jsonwebtoken';
import TokenModel from '../Models/TokenModel.js';

export function generateTokens(payload) {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
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
