const db = require("../db");

class Property {

  static async add(property) {
    let exist = await this.find(property);
    if (!exist) {
      try {
        const result = await db.query(
          `INSERT INTO properties (property)
        VALUES ($1) RETURNING id`,
          [property]);
        return result.rows[0];
      } catch (e) {
        throw Error(err);
      }
    } else {
      return exist;
    }
  }

  static async find(property) {
    const result = await db.query(
      `SELECT property, id
      FROM properties
      WHERE property=$1`,
      [property]);

    if (result.rows.length === 0) return false;
    return result.rows[0];
  }
}

module.exports = Property;