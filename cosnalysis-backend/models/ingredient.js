const db = require("../db");


class Ingredient {

  static async add(ingredients) {

    ingredients.forEach(async (ingredient) => {
      try {
        await db.query(
          `INSERT INTO ingredients (ingredient_name)
            VALUES ($1) ON CONFLICT DO NOTHING`,
          [ingredient.ingredientName]);

      } catch (err) {
        throw Error(err);
      }
    });
  };


  static async find(ingredientName) {

    const result = await db.query(
      `SELECT ingredient_name
      FROM ingredients
      WHERE ingredient_name=$1`,
      [ingredientName]);

    if (result.rows.length === 0) return false;

    return result.rows[0];
  }
}

module.exports = Ingredient;