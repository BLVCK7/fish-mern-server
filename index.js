import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import * as PostController from './Controllers/PostController.js';
import router from './router/index.js';

import errorMiddleware from './middlewares/error-middleware.js';

const PORT = process.env.PORT || 5000;

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    // if (!fs.existsSync('uploads')) {
    //   fs.mkdirSync('uploads');
    // }
    cb(null, 'uploads');
  },
  filename: (_, files, cb) => {
    cb(null, files.originalname);
  },
});

const upload = multer({ storage });

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use('/upload', express.static('uploads'));
app.use('/auth', router);
app.use(errorMiddleware);

app.post('/post', PostController.create);
app.get('/post', PostController.getAllPosts);
app.get('/post/:id', PostController.getOnePost);
app.post('/post/upload', PostController.getOnePost);
app.post('/upload', upload.array('images'), (req, res) => {
  res.json(req.files.map((obj) => `/upload/${obj.originalname}`));
});

const start = async () => {
  try {
    await mongoose
      .connect(process.env.URI)
      .then(() => console.log('DB работает'))
      .catch((err) => console.log('DB ERROR: ', err));
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
  } catch (error) {
    console.log(`Ошибка подключения к серверу: ${error}`);
  }
};

start();
