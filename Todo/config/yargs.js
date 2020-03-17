let descripcion = {
  demand: true,
  alias: "d",
  desc: "Descripción de la tarea"
};

const argv = require("yargs")
  .command("listar", "Lista todas las tareas", {
    listar: {
      demand: true,
      alias: "l"
    }
  })
  .command("crear", "Crea tareas", {
    descripcion
  })
  .command("actualizar", "Actualiza tareas", {
    descripcion,
    completado: {
      default: true,
      alias: "c",
      desc: "Marca como completado la tarea"
    }
  })
  .command("borrar", "Borrar tarea", {
    descripcion
  })
  .help().argv;

module.exports = {
  argv
};
