const axios = require("axios");

const getClima = async (lat, lon, unidad) => {
  let keyAPI = "7cd29710531e79b7750657a2efe9a383";
  let URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${keyAPI}&unit=${unidad}`;

  const resp = await axios.get(URL);

  return resp.data.main.temp;
};

module.exports = {
  getClima,
};
