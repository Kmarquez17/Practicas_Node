const { getLugar } = require("./lugar/lugar");
const { getClima } = require("./lugar/clima");
const argv = require("yargs").options({
  direccion: {
    alias: "d",
    desc: "Descripcion de la cuidad para obtener el clima",
    demad: true,
  },
}).argv;

const getInfo = async (direccion) => {
  try {
    let coords = await getLugar(direccion);
    let temp = await getClima(coords.lat, coords.lng, "metric");
    return `El clima de ${coords.direccion} es de ${temp}`;
  } catch (e) {
    return `No se pudeo determinar el clima ${direccion}`;
  }

  //Salida
};

getInfo(argv.direccion).then((resp) => {
  console.log(resp);
});
