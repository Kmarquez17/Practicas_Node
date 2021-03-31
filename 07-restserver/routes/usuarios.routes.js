const { Router } = require("express");
const router = Router();

const {
  usuariosGET,
  usuariosPOST,
  usuariosPUT,
  usuariosDELETE,
} = require("../controllers/usuarios");

router.get("/", usuariosGET);

router.post("/", usuariosPOST);

router.put("/:id", usuariosPUT);

router.delete("/", usuariosDELETE);

module.exports = router;
