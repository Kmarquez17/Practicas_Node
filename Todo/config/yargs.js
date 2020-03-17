let descripcion = {
  demand: true,
  alias: "d",
  desc: "Descripción de la tarea"
};

let completado = {
  default: true,
  alias: "c",
  desc: "Marca como completado la tarea"
};

const argv = require("yargs")
  .command("listar", "Lista todas las tareas", {
    listado: {
      demand: true,
      alias: "l"
    },
    completado
  })
  .command("crear", "Crea tareas", {
    descripcion
  })
  .command("actualizar", "Actualiza tareas", {
    descripcion,
    completado
  })
  .command("borrar", "Borrar tarea", {
    descripcion
  })
  .help().argv;

module.exports = {
  argv
};
