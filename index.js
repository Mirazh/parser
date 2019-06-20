const tress = require('tress');
const needle = require('needle');
const cheerio = require('cheerio');
const resolve = require('url').resolve;
const fs = require('fs');
const mongoose = require('mongoose');

const { addRecipe } = require('./model/Recipe');

mongoose.connect('mongodb://dongor7:Dongor1996@ds263876.mlab.com:63876/just-recipe', { useNewUrlParser: true });

const URL = 'https://eda.ru/recepty?page=2';
const results = [];

let pagesCount = 0;
let recipesCount = 1;
let recipesPagesCount = 1;
let isParse = true;

const addNextListPageToQueue = ($) => {
  const nextPageBtn = $('div.js-load-more-btn').attr('href');
  if (isParse && nextPageBtn && pagesCount < 5) {
    q.push(nextPageBtn);
    pagesCount++;
  } else {
    isParse = false;
  }
};

const addRecipePageToQueue = ($) => {
  if (isParse) {
    const recipeLinks = $('.horizontal-tile__item-link');
    console.log($(recipeLinks).length);
    $(recipeLinks).each((index, elem) => {
      console.log(recipesPagesCount++, resolve(URL, $(elem).attr('data-href')));
      q.push(resolve(URL, $(elem).attr('data-href')))
    });
  }
};

const formatTime = (time) => {
  const splittedTime = time.split(' ');

  if (splittedTime.length > 2) {
    return splittedTime[0] * 60 + +splittedTime[2];
  } else if (time.includes('час')) {
    return splittedTime[0] * 60;
  } else {
    return +splittedTime[0]
  }
};

const parseRecipePage = ($) => {
  const title = $('h1.recipe__name').text().trim();
  const ingredients = [];
  $('.g-relative .ingredients-list__content-item').each((index, ingredient) => {
    const name = $(ingredient).find($('.js-tooltip')).text().trim();
    const count = $(ingredient).find($('.js-ingredient-measure-amount')).text().trim();

    ingredients.push({
      name,
      count,
    });
  });
  const time = formatTime($('.instruction-controls > span:nth-child(2)').text().trim());

  if (title) {
    results.push({
      id: recipesCount++,
      title,
      ingredients,
      time,
    });
  }
};

const q = tress(function (url, callback) {
  needle.get(url, function (err, res) {
    if (err) throw err;

    const $ = cheerio.load(res.body);

    parseRecipePage($);
    addRecipePageToQueue($);
    addNextListPageToQueue($);

    callback();
  });
}, 10);

q.drain = function () {
  const promises = results.map(async (recipe) => await addRecipe(recipe));

  fs.writeFileSync('./data.json', JSON.stringify(results, null, 4));

  Promise.all(promises).then(() => {
    mongoose.disconnect();
    console.log('Saved to DB');
    console.log('Disconnected');
  }, (err) => console.log(err.stackTrace));
};

q.push(URL);

