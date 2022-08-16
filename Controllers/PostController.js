import PostModel from '../Models/PostModel.js';

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      user: req.body.user,
      name: req.body.name,
      location: req.body.location,
      fishingDate: req.body.fishingDate,
      temperature: req.body.temperature,
      windDirection: req.body.windDirection,
      windPower: req.body.windPower,
      pressure: req.body.pressure,
      fish: req.body.fish,
      postMedia: req.body.postMedia,
      description: req.body.description,
    });

    const post = await doc.save();

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось создать статью',
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          console.log(error);
          res.status(500).json({
            message: 'Не удалось удалить статью',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Статья не найдена',
          });
        }
        res.json({
          success: true,
        });
      },
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find().exec();

    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};

export const getOnePost = async (req, res) => {
  try {
    const id = req.params.id;

    const post = await PostModel.findOne({ _id: id });

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить статью',
    });
  }
};
