const { inquirerMenu, pausar, leerInput } = require("./helpers/inquirer");
const Tareas = require("./models/tareas");
require("colors");

console.clear();
const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        //Crear tareas
        const desc = await leerInput("Descripción: ");
        tareas.crearTareas(desc);
        break;

      case "2":
        console.log(tareas._listado);
      default:
        break;
    }
    await pausar();
  } while (opt !== "0");
};

main();
