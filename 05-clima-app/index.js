require("dotenv").config();
const {
  inquirerMenu,
  leerInput,
  pausar,
  listarLugares,
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {
  let opt = -1;
  const busquedas = new Busquedas();

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        //Mostrar msj
        const lugar = await leerInput("Buscar ciudad: ");

        //Buscamos los lugares
        const lugares = await busquedas.ciudad(lugar);
        // console.log(lugares);

        //Seleccionamo el lugar
        const idSeleccionado = await listarLugares(lugares);

        if (idSeleccionado === "0") continue;
        //console.log({ idSeleccionado });

        const lugarSeleccionado = lugares.find((l) => l.id === idSeleccionado);

        const { nombre, lng, lat } = lugarSeleccionado;

        //GUardarBD
        busquedas.agregarHistorial(nombre);

        // Clima
        const clima = await busquedas.climaLugar(lat, lng);

        const { desc, min, max, temp } = clima;

        //Mostrar resultados
        console.clear();
        console.log("\nInformacion del lugar\n".green);
        console.log("Ciudad:", nombre.green);
        console.log("Lat:", lat);
        console.log("Lng:", lng);
        console.log("Temperatura:", temp);
        console.log("Min:", min);
        console.log("Max:", max);
        console.log("Como está el clima:", desc.green);
        break;

      case 2:
        //Historial

        busquedas.historialCapitalizado.forEach((lugar, i) => {
          const idx = `${i + 1}.`.green;
          console.log(`${idx} ${lugar}`);
        });

        break;

      default:
        break;
    }

    //guardarDB(tareas.listadorArr);

    if (opt !== 0) await pausar();
  } while (opt !== 0);
};

main();
