const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const {
  usuariosGET,
  usuariosPOST,
  usuariosPUT,
  usuariosDELETE,
} = require("../controllers/usuarios");

const { validarCampos } = require("../middleware/validar-campos");
const { esRoleValido, emailExiste } = require("../helpers/db-validators");

router.get("/", usuariosGET);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe tener mas de 6 carácteres").isLength({
      min: 6,
    }),
    check("correo", "El correo no es válido").isEmail(),
    // check("rol", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("correo").custom(emailExiste),
    check("rol").custom(esRoleValido),
  ],
  validarCampos,
  usuariosPOST
);

router.put("/:id", usuariosPUT);

router.delete("/", usuariosDELETE);

module.exports = router;
