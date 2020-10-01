const db = require("../db");

class ProductIngredient {

  // ingredients [{ingredientName, ingredientFunctions}]
  static async addProductIngredients(productName, ingredients) {

    ingredients.forEach(async (ingredient) => {
      try {
        await db.query(
          `INSERT INTO product_ingredients (product_name, ingredient_name)
          VALUES ($1, $2) ON CONFLICT DO NOTHING`,
          [productName, ingredient.ingredientName]
        );

      } catch (err) {
        throw Error(err);
      }
    });
  }

}

module.exports = ProductIngredient;