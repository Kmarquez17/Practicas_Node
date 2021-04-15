const express = require("express");
const cors = require("cors");
const { dbConecion } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";

    //Conectar a la base de datos
    this.conectarBD();

    //Middlewares
    this.middlewares();

    //Parseo y lectura del BODY
    this.app.use(express.json());

    //Rutas de mi app
    this.routes();
  }

  async conectarBD() {
    await dbConecion();
  }

  middlewares() {
    //CORS
    this.app.use(cors());
    //Directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/usuarios.routes"));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Escuchando en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
