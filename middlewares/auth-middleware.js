import ApiError from '../exceptions/api-errors.js';
import { validateAccessToken } from '../Service/TokenService.js';

export default function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(' ')[1];

    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = userData;

    next();
  } catch (error) {
    return next(ApiError.UnauthorizedError());
  }
}

export const checkAuthMidWare = (req, res, next) => {
  const accessToken = (req.headers.authorization || '').split(' ')[1];

  if (accessToken) {
    try {
      const decoded = validateAccessToken(accessToken);

      req.user = decoded._id;
      next();
    } catch (error) {
      return res.status(403).json({
        message: 'Нет доступа',
      });
    }
  } else {
    return res.status(403).json({
      message: 'Нет доступа',
    });
  }
};
