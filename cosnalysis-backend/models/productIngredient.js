const db = require("../db");
const Property = require("./property");
const IngredientProperty = require("./ingredientProperty");

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

  // gets the list of ingredients for a product, returns an object with key of `ingredients_list`.
  static async getIngredientsList(productName) {
    const ingredientsResult = db.query(
      `SELECT ingredient_name
      FROM product_ingredients
      WHERE product_name=$1`,
      [productName]
    );

    if (ingredientsResult.rows.length === 0) return { error: `No ingredients list for ${productName} available.` };
    
    let data = { ingredients_list: []};

    let ingredients = ingredientsResult.rows;

    ingredients.forEach(async (ingredient) => {
      let ingrdPropertyResults = await IngredientProperty.getIngredientProperties(ingredient);
      data.ingredients_list.push({ingredient_name: ingredient, ingredient_properties: ingrdPropertyResults.rows})
    });

    return data;
  }

}

module.exports = ProductIngredient;