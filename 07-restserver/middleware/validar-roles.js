const { request, response } = require("express");
const adminRoles = (req = request, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: "Se quiere verificar el rol, sin validar el token",
    });
  }

  const { rol, nombre } = req.usuario;
  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${nombre} no es administrador`,
    });
  }
  next();
};

const tieneRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msg: "Se quiere verificar el rol, sin validar el token",
      });
    }
    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: `El servicio requiere unos de estos roles ${roles}`,
      });
    }
    next();
  };
};

module.exports = {
  adminRoles,
  tieneRole,
};
