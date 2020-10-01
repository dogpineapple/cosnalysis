const express = require("express");
const Product = require("../models/product");
const router = express.Router();

router.post("/ingredients", async function (req, res, next) {
  const ingredients = await Product.getIngredients(req.body.product1);
  return res.json(`heres the ingredients for ${req.body.product1}: ${ingredients.join(", ")}`);
});

router.post("/analyze", async function (req, res, next) {
  let product_ingredients = [];

  // get the ingredients for every product in the req.body
  // if the product doesn't exist in the database yet, then webscrape.
  for (product in req.body) {
    const ingredients = await Product.getIngredients(req.body[product]);
    product_ingredients.push({[req.body[product]]: ingredients});
  }

  console.log(product_ingredients); // [ { 'facial essence': [ 'water', 'glycerin' ] } ] 

  return res.json(`heres the products and ingredients: ${product_ingredients}`);
});



module.exports = router;