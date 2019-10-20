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
