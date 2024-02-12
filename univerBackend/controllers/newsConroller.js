const News = require('../models/News');

// Получение списка новостей
exports.getNewsList = async (req, res) => {
  try {
    const newsData = await News.find();
    res.json(newsData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Получение конкретной новости по id
exports.getNewsById = async (req, res) => {
  try {
    const newsId = req.params.id;
    const news = await News.findById(newsId);

    if (news) {
      res.json(news);
    } else {
      res.status(404).json({ message: 'Новость не найдена' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Добавление новости
exports.addNews = async (req, res) => {
  const { title, photo, tags, description } = req.body;

  if (!title || !photo || !tags || !description) {
    res.status(400).json({ message: 'Все поля должны быть заполнены' });
    return;
  }

  const newNews = new News({
    title,
    photo,
    tags,
    description,
  });

  try {
    const savedNews = await newNews.save();
    res.json(savedNews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
