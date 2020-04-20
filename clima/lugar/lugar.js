const axios = require("axios");

const getLugar = async (dirParam) => {
  const encodeUrl = encodeURI(dirParam);
  const instance = axios.create({
    baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encodeUrl}`,
    headers: {
      "x-rapidapi-host": "devru-latitude-longitude-find-v1.p.rapidapi.com",
      "x-rapidapi-key": "8919ffc780msh2bf0a7664217cb3p1ace99jsn4829affa7d43",
    },
  });

  const resp = await instance.get();

  if (resp.data.Results.length === 0) {
    throw new Error(`No hay resultados para ${dirParam}`);
  }

  const data = resp.data.Results[0];
  const direccion = data.name;
  const lat = data.lat;
  const lng = data.lon;

  return {
    direccion,
    lat,
    lng,
  };
};

module.exports = {
  getLugar,
};
