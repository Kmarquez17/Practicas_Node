const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

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

const usuariosPOST = async (req = request, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({
    nombre,
    correo,
    password,
    rol,
  });

  //Verificar si el correo existe

  //Encriptar contraseña

  const salt = await bcryptjs.genSaltSync();
  usuario.password = await bcryptjs.hashSync(password, salt);

  //Grabar DB

  await usuario.save();
  res.json({
    usuario,
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
