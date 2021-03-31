const { response } = require("express");

const usuariosGET = (req, res = response) => {
  const { q, nombre = "No Name", apiKey, page = 1, limit } = req.query;

  res.json({
    msg: "API - usuariosGET ",
    q,
    nombre,
    apiKey,
    page,
    limit,
  });
};

const usuariosPOST = (req, res = response) => {
  const { nombre, edad } = req.body;
  res.json({
    msg: "API - usuariosPOST",
    nombre,
    edad,
  });
};

const usuariosPUT = (req, res = response) => {
  const { id } = req.params;
  res.json({
    msg: "API - usuariosPUT ",
    id,
  });
};

const usuariosDELETE = (req, res = response) => {
  res.json({
    msg: "API - usuariosDELETE ",
  });
};

module.exports = {
  usuariosGET,
  usuariosPOST,
  usuariosPUT,
  usuariosDELETE,
};
