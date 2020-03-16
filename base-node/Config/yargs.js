const options = {
  base: {
    demand: true,
    alias: "b"
  },
  limite: {
    default: 10,
    alias: "l"
  }
};
const argv = require("yargs")
  .command("listar", "Imprime en consola la tabla multiplicar", options)
  .command("crear", "Crear archivo con la tabla multiplicar", options)
  .help().argv;

module.exports = {
  argv
};
