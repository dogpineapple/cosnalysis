const Property = require("./properties");
const db = require("../db");

class IngredientProperty {
  
  // ingredientName= STRING, ingredientFunctions= ARRAY
  static async addIngredientProperty(ingredientName, ingredientFunctions) {

    ingredientFunctions.forEach(async (ingredientFunc) => {
      try {
        let propertyResult = await Property.add(ingredientFunc)
        await db.query(
          `INSERT INTO ingredient_properties (ingredient_name, property_id)
          VALUES ($1, $2) ON CONFLICT DO NOTHING`,
          [ingredientName, propertyResult.id]);
      } catch (err) {
        throw Error(err);
      }
    });
  }
}

module.exports = IngredientProperty;