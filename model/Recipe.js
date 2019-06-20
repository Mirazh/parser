const mongoose = require('mongoose');
const RecipeSchema = new mongoose.Schema({
  title: String,
  time: Number,
  ingredients: Array,
});

const Recipe = mongoose.model('RecipeSchema', RecipeSchema);

const addRecipe = (recipe) =>{
  const newRecipe = new Recipe(recipe);
  return newRecipe.save(function (err) {
    if (err) return console.log(err);
  });
};

module.exports = {
  addRecipe,
};

// вклад в проект, пройденные менторинги, что хочу в себе улучшить, ближайшие цели
// за это время я успел поработать над тикими-то проектами не хватает таких-то скилов
// https://videoportal.epam.com/video/8JYkgGod
// https://kb.epam.com/display/EPMRVM/Quarterly+Performance+Feedback
// AskFeedback@epam.com
