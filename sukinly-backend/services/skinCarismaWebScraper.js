const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const config = require('../config');

const loginSkinCarisma = async (page) => {
  await page.goto('https://www.skincarisma.com/users/sign_in');

  await page.click('#user_email');
  console.log(config.SKINCARISMA_EMAIL);
  await page.keyboard.type(config.SKINCARISMA_EMAIL);

  await page.click('#user_password');
  await page.keyboard.type(config.SKINCARISMA_PASS);

  await page.click('input[type=submit]');

  await page.waitForNavigation();
};

// use axios and cheerios to scrape specific product info
const scrapeProductInfo = async (url, products) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`https://www.skincarisma.com${url}`);
      const $ = cheerio.load(data);

      let productName = $('div.col-md-8 > h1').text();
      let brandName = $(
        'div.card-subtitle.mb-2 > a > h2.font-090.d-inline-block'
      ).html();

      let product = {
        productName: productName,
        brandName: brandName,
        productUrl: url,
        ingredients: [],
      };

      // get ingredients info
      $('tbody > tr').each((i, el) => {
        let _data = $(el).children('td:nth-child(3)').text().trim();
        // get ingredient name
        let ingredientName = _data.substring(0, _data.indexOf('\n'));

        // get ingredient functions and strip parenthesis and split it
        let ingredientFunctions = _data
          .substring(_data.lastIndexOf('\n') + 1)
          .replace(/\(|\)/g, '')
          .trim()
          .split(',');

        let ingredient = {
          ingredientName: ingredientName,
          ingredientFunctions: ingredientFunctions,
        };

        product.ingredients.push(ingredient);
      });

      products.push(product);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const scrapeProductsPage = async (pageNum, page, products) => {
  const url = `https://www.skincarisma.com/search?page=${pageNum.toString()}`;

  await page.goto(url, {
    waitUntil: 'networkidle0',
  });

  // gather all product links on the page
  let links = await page.evaluate(() => {
    const anchorTags = Array.from(
      document.querySelectorAll('ul.list-unstyled.mt-2.mb-0 a:not([class])')
    );
    let hrefLinks = anchorTags.map((el) => {
      return el.getAttribute('href');
    });
    return hrefLinks;
  });

  // remove any duplicates by converting to unique set and back
  links = new Set(links);
  links = [...links];

  // loop over links and gather product information
  /*
  product: {
    productName
    brandName
    productUrl
    ingredients: {
      ingredientName:
      ingredientFunctions:
    }
  }
  */

  let promises = [];
  links.forEach((el) => {
    promises.push(scrapeProductInfo(el, products));
  });

  await Promise.all(promises);
};

const scrapeSkinCarisma = async (pageStart, pageEnd) => {
  if (pageStart <= 0) {
    console.log(
      `Invalid page start value of ${pageStart}\nMust be greater than 0.`
    );
    return;
  }

  // for some reason can't access page 1201
  if (pageEnd >= 1200) {
    console.log(
      `Invalid page end value of ${pageEnd}\nMust be less than 1201.`
    );
  }

  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 10,
    devtools: true,
  });

  const page = await browser.newPage();

  await loginSkinCarisma(page);

  // scrape products
  let products = [];
  for (var i = pageStart; i <= pageEnd; i++) {
    await scrapeProductsPage(i, page, products);
  }
  await browser.close();
  return products;
};

/*
  Returns list of products with their brand information, ingredients, and ingredient functions
  Params: pageStart: which page you want to start scraping
          pageEnd: which page you want to stop scraping
*/

module.exports = scrapeSkinCarisma;
