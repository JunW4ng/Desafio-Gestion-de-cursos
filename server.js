const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const {
  createCourse,
  getCourse,
  updateCourse,
  deleteCourse,
} = require("./consultas");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//? Libera carpeta public
app.use(express.static("public"));

//? Levanta servidor
app.get("/", (_, res) => {
  res.send(__dirname + "public/index.html");
});

//? Crea un curso
app.post("/curso", async (req, res) => {
  const { nombre, nivelTecnico, fechaInicio, duracion } = req.body;
  const data = { nombre, nivelTecnico, fechaInicio, duracion };
  const respuesta = await createCourse(Object.values(data));
  res.send(respuesta);
});

//? Consulta los cursos
app.get("/cursos", async (_, res) => {
  const respuesta = await getCourse();
  res.send(respuesta);
});

//? Edita un curso
app.put("/curso", async (req, res) => {
  const { id, nombre, nivelTecnico, fechaInicio, duracion } = req.body;
  const data = {id, nombre, nivelTecnico, fechaInicio, duracion}
  const respuesta = await updateCourse(Object.values(data));
  res.send(respuesta);
});

//? Elimina un curso
app.delete("/curso/:id", (req, res) => {
  const { id } = req.params;
  const respuesta = deleteCourse(id);
  res.send(respuesta);
});

app.listen(port, () => console.log(`Escuchando al puerto ${port}`));
