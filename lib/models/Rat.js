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

  static async create({ name, sex, color }) {
    const { rows } = await pool.query(
      'INSERT INTO rats(name, sex, color) VALUES ($1, $2, $3) RETURNING *;',
      [name, sex, color]
    );
    return new Rat(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM rats;');
    return rows.map((row) => new Rat(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM rats WHERE id=$1;', [
      id,
    ]);

    if (!rows[0]) return null;
    return new Rat(rows[0]);
  }

  static async updateById(id, { name, sex, color }) {
    const existingRat = await Rat.getById(id);

    if (!existingRat) return null;

    const newName = name ?? existingRat.name;
    const newSex = sex ?? existingRat.sex;
    const newColor = color ?? existingRat.color;

    const { rows } = await pool.query(
      'UPDATE rats SET name=$2, sex=$3, color=$4 WHERE id=$1 RETURNING *;',
      [id, newName, newSex, newColor]
    );
    return new Rat(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM rats WHERE id=$1 RETURNING *;',
      [id]
    );

    if (!rows[0]) return null;
    return new Rat(rows[0]);
  }

};
