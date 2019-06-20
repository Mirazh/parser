const tress = require('tress');
const needle = require('needle');
const cheerio = require('cheerio');
const resolve = require('url').resolve;
const fs = require('fs');

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

const parseRecipePage = ($) => {
  const title = $('h1.recipe__name').text().trim();
  const ingredients = [];
  $('.g-relative .js-tooltip-ingredient').each((index, ingredient) => ingredients.push($(ingredient).text().trim()));

  if (title) {
    results.push({
      id: recipesCount++,
      title: title,
      ingredients: ingredients,
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
  fs.writeFileSync('./data.json', JSON.stringify(results, null, 4));
};

q.push(URL);

