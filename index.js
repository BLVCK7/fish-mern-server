import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';

import * as PostController from './Controllers/PostController.js';

const PORT = 5000;

const app = express();

const uri =
  'mongodb://root:root12345@cluster0-shard-00-00.6levu.mongodb.net:27017,cluster0-shard-00-01.6levu.mongodb.net:27017,cluster0-shard-00-02.6levu.mongodb.net:27017/post?ssl=true&replicaSet=atlas-lroog0-shard-0&authSource=admin&retryWrites=true&w=majority';

mongoose
  //   .connect(process.env.MONGODB_URI)
  .connect(uri)
  .then(() => console.log('DB работает'))
  .catch((err) => console.log('DB ERROR: ', err));

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

app.use(cors());
app.use(express.json());
app.use('/upload', express.static('uploads'));

app.post('/post', PostController.create);
app.get('/post', PostController.getAllPosts);
app.get('/post/:id', PostController.getOnePost);
app.post('/post/upload', PostController.getOnePost);
app.post('/upload', upload.array('images'), (req, res) => {
  res.json(req.files.map((obj) => `/upload/${obj.originalname}`));
});

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
