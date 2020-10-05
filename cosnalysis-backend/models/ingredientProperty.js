const Property = require("./property");
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

  static async getIngredientProperties(ingredientName) {
    // obtain all properties of a ingredient, return all records
    const result = await db.query(
      `SELECT properties.property
      FROM ingredient_properties JOIN properties
      ON properties.id=ingredient_properties.property_id
      WHERE ingredient_properties.ingredient_name=$1`,
      [ingredientName]
    );

    return result.rows;
  }
}

module.exports = IngredientProperty;