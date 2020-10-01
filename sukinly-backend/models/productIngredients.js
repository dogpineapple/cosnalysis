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

  static async getIngredientsList(productName) {
    const result = db.query(
      `SELECT ingredient_name
      FROM product_ingredients
      WHERE product_name=$1`,
      [productName]
    );

    if (result.rows.length === 0) return { error: `No ingredients list for ${productName} available.` };

    return { ingredients_list: result.rows[0] };
  }

}

module.exports = ProductIngredient;