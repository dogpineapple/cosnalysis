const db = require("../db");

class Product {

  // `add` creates a record for a product. 
  static async add(productName, brandName, productUrl) {
    let exist = await this.findProduct(productName);
    if (!exist) {
      try {
        const result = await db.query(
          `INSERT INTO products (product_name, brand_name, product_url)
        VALUES ($1, $2, $3) RETURNING product_name, brand_name, product_url`,
          [productName, brandName, productUrl]);

        return result.rows[0];
      } catch (err) {
        throw Error(err);
      }
    }
  }

  static async findProduct(productName) {
    const result = await db.query(
      `SELECT product_name, brand_name, product_url
      FROM products
      WHERE product_name=$1`,
      [productName]);

    let product = result.rows[0];

    if (product) {
      return result.rows[0];
    } else {
      return false;
    }
  }

  // `findProductsByBrand` finds all product records for a brand.
  static async findProductsByBrand(brandName) {
    const result = await db.query(
      `SELECT product_name, brand_name, product_url 
      FROM products
      WHERE brand_name=$1`,
      [brandName]);

    return result.rows;
  }

  // `getIngredients` returns an array of ingredients of a product.
  // return example: [ 'water', 'glycerin' ]
  static async getIngredients(productName) {
    const result = await db.query(
      `SELECT ingredient_name, product_name
      FROM product_ingredients
      WHERE product_name=$1`,
      [productName]);

    let ingredients = result.rows.map(ingredient => {
      return ingredient.ingredient_name;
    })

    return ingredients;
  }
}

module.exports = Product;