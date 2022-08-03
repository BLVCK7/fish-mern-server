import PostModel from '../Models/PostModel.js';

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
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

    console.log(post);
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось создать статью',
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

    console.log(id);
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось получить статью',
    });
  }
};
