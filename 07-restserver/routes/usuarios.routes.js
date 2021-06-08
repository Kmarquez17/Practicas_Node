const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const {
  usuariosGET,
  usuariosPOST,
  usuariosPUT,
  usuariosDELETE,
} = require("../controllers/usuarios");

const {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
} = require("../helpers/db-validators");

const { validarCampos, validarJWT, tieneRole } = require("../middleware");

router.get("/", usuariosGET);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe tener mas de 6 carácteres").isLength({
      min: 6,
    }),
    check("correo", "El correo no es válido").isEmail(),
    check("correo").custom(emailExiste),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPOST
);

router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPUT
);

router.delete(
  "/:id",
  [
    validarJWT,
    // adminRoles,
    tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosDELETE
);

module.exports = router;
