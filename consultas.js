const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "Junjie1995",
  database: "cursos",
  port: 5432,
});

const consultas = (text, values) => ({ text, values });

const createCourse = async (data) => {
  const sqlQuery =
    "INSERT INTO cursos (nombre, nivel, fecha, duracion) VALUES ($1, $2, $3, $4) RETURNING *";
  const values = data;
  try {
    const result = await pool.query(consultas(sqlQuery, values));
    return result.rows;
  } catch (err) {
    console.log(err.code);
    return err;
  }
};

const getCourse = async () => {
  const sqlQuery = "SELECT * FROM cursos";
  try {
    const result = await pool.query(sqlQuery);
    return result.rows;
  } catch (err) {
    console.log(err.code);
    return err;
  }
};

const updateCourse = async (data) => {
  const sqlQuery =
    "UPDATE cursos SET nombre = $2, nivel = $3, fecha = $4, duracion = $5 WHERE id = $1 RETURNING *";
  const values = data;
  try {
    const result = await pool.query(consultas(sqlQuery, values));
    return result.rows;
  } catch (err) {
    console.log(err.code);
    return err;
  }
};

const deleteCourse = async (id) => {
  const sqlQuery = "DELETE FROM cursos WHERE id = $1 RETURNING *";
  const values = [id];
  try {
    const result = await pool.query(consultas(sqlQuery, values));
    return result.rowCount;
  } catch (e) {
    console.log(e.code);
    return e;
  }
};

module.exports = { createCourse, getCourse, updateCourse, deleteCourse };
