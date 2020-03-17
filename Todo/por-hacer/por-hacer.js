const fs = require("fs");

let listadoPorHacer = [];
let dir = "./db/datos.json";

const guardarDB = () => {
  let data = JSON.stringify(listadoPorHacer);

  fs.writeFile(dir, data, err => {
    if (err) throw new Error("No se pudo grabar", err);
    // console.log("Guardo correctamente");
  });
};

const cargarDB = () => {
  try {
    listadoPorHacer = require("../db/datos.json");
  } catch (error) {
    listadoPorHacer = [];
  }

  return listadoPorHacer;
};

const crear = descripcion => {
  cargarDB();
  let porHacer = {
    descripcion,
    completado: false
  };

  listadoPorHacer.push(porHacer);
  guardarDB();

  return porHacer;
};

const getListado = () => {
  return cargarDB();
};

const actualizar = (descripcion, completado = true) => {
  cargarDB();

  let index = listadoPorHacer.findIndex(tarea => {
    return tarea.descripcion === descripcion;
  });

  if (index >= 0) {
    listadoPorHacer[index].completado = completado;
    guardarDB();
    return true;
  } else {
    return false;
  }
};

const borrar = descripcion => {
  cargarDB();

  let nuevoListado = listadoPorHacer.filter(tarea => {
    return tarea.descripcion !== descripcion;
  });

  if (nuevoListado.length !== listadoPorHacer.length) {
    listadoPorHacer = nuevoListado;
    guardarDB();
    return true;
  } else {
    return false;
  }
};

module.exports = {
  getListado,
  crear,
  actualizar,
  borrar
};
