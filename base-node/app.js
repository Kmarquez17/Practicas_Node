const { argv } = require("./Config/yargs");
const colors = require("colors");

const { crearArchivo, listarTabla } = require("./Multiplicar/multiplicar");

let comando = argv._[0];
let base = argv.base;
let limite = argv.limite;

switch (comando) {
  case "listar":
    listarTabla(base, limite);
    break;

  case "crear":
    crearArchivo(base, limite)
      .then(archivo => console.log(`El archivo creado ${archivo.green}`))
      .catch(err => console.log(err));
    break;

  default:
    console.log("Comando no reconocido");
    break;
}
