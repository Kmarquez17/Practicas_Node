const Usuario = require("../models/usuario");
const Role = require("../models/role");

const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la BD`);
  }
};

const emailExiste = async (correo = "") => {
  //Verificar si el correo existe
  const existeEmail = await Usuario.findOne({ correo });
  // console.log(existeEmail);
  if (existeEmail) {
    throw new Error(`El correo ${correo}, ya esta registado`);
  }
};

module.exports = { esRoleValido, emailExiste };
