const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const usuariosGET = async (req = request, res = response) => {
  const { limit = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limit)),
  ]);

  res.json({
    total,
    usuarios,
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

  //Encriptar contraseña
  const salt = await bcryptjs.genSaltSync();
  usuario.password = await bcryptjs.hashSync(password, salt);

  //Grabar DB

  await usuario.save();
  res.json({ usuario });
};

const usuariosPUT = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  //TODO validar con la base de datos

  if (password) {
    //Encriptar contraseña
    const salt = await bcryptjs.genSaltSync();
    resto.password = await bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({ usuario });
};

const usuariosDELETE = async (req = request, res = response) => {
  const { id } = req.params;
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.json({ usuario });
};

module.exports = {
  usuariosGET,
  usuariosPOST,
  usuariosPUT,
  usuariosDELETE,
};
