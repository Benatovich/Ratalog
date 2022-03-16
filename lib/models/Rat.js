const pool = require('../utils/pool');

module.exports = class Rat {
  id;
  name;
  sex;
  color;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.sex = row.sex;
    this.color = row.color;
  }

  static async insert({ name, sex, color }) {
    const { rows } = await pool.query(
      'INSERT INTO rats(name, sex, color) VALUES ($1, $2, $3) RETURNING *;',
      [name, sex, color]
    );
    return new Rat(rows[0]);
  }

};
