const express = require("express");
const hbs = require("hbs");
const app = express();

require("./hbs/helpers");

const port = process.env.PORT || 8080;

app.use(express.static(__dirname + "/public"));

//Express HBS
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/parciales");

app.get("/", function (req, res) {
  res.render("home", {
    nombre: "keVin mArquez",
  });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(port, () => {
  console.log(`Escuchando peticiones en el puerto ${port}`);
});
