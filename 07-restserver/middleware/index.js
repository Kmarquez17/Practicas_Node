//Nota: Cuando el middleware es una funcion, esta siempre tiene que retonar un fn
const validarCampos = require("../middleware/validar-campos");
const validarJWT = require("../middleware/validar-jwt");
const validarRoles = require("../middleware/validar-roles");

module.exports = {
  ...validarCampos,
  ...validarJWT,
  ...validarRoles,
};
