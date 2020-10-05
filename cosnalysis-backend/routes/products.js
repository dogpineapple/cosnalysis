const express = require("express");
const Product = require("../models/product");
const ProductIngredient = require("../models/productIngredient");
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

router.post("/highest-occurring", async function (req, res, next) {
  // return a json object that looks like 
  /**
   * // only put it in the object if the frequency >= 0.1
   * { "ingredient_frequencies": 
   *                        [ {
   *                           "ingredient_name":"Panthenol"
   *                           "frequency": "0.6"
   *                           "products": 
   *                               [{"product_name", "brand_name"}]
   *                          }, ...
   *                        ]
   * }
   */

  let product_ingredients = [];

  // obtain the ingredients list for all products in the req.body
  for (product in req.body) {
    // ingredients = { ingredients_list: [{ ingredient, ingredient_properties}]};
    const ingredientsList = await ProductIngredient.getIngredientsList(req.body[product]);
    product_ingredients.push({[req.body[product]]: ingredientsList});
  }

  

   // then take the product_ingredients and calculate the frequencies!
        // product_1 {product_name, ingredients_list}
        // product_2 {product_name, ingredients_list}
        // product_3 {product_name, ingredients_list}
  


  return res.json(`heres the products and ingredients: ${product_ingredients}`);
});



module.exports = router;