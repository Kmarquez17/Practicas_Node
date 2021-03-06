const { guardarDB, leerDB } = require("./helpers/guadarArchivo");
const {
  inquirerMenu,
  pausar,
  leerInput,
  listadoTareaBorrar,
  confirmar,
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");
require("colors");

console.clear();
const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if (tareasDB) {
    //Establecer tareas
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        //Crear tareas
        const desc = await leerInput("Descripción: ");
        tareas.crearTareas(desc);
        break;

      case "2":
        //Listar todas
        tareas.listadoCompleto();
        break;

      case "3":
        //Listar completadas
        tareas.listarPendienteCompletadas();
        break;

      case "4":
        //Listar pendientes
        tareas.listarPendienteCompletadas(false);
        break;

      case "6":
        //Borrar pendientes
        const id = await listadoTareaBorrar(tareas.listadorArr);
        if (id !== "0") {
          const borrarConfim = await confirmar("Está seguro?");
          if (borrarConfim) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada");
          }
        }
        break;

      default:
        break;
    }

    guardarDB(tareas.listadorArr);

    await pausar();
  } while (opt !== "0");
};

main();
