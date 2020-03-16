//require
const fs = require("fs");
const colors = require("colors");

const listarTabla = (base, limite) => {
  console.log("=======================".green);
  console.log(`=====Table ${base}=====`.green);
  console.log("=======================".green);

  for (let i = 1; i <= limite; i++) {
    console.log(`${base} * ${i} = ${base * i}`);
  }
};

const crearArchivo = (base, limite) => {
  return new Promise((resolve, reject) => {
    let data = "";
    if (!Number(base)) {
      reject(`El valor introducido ${base} no es un número`);
      return;
    }

    for (let i = 1; i <= limite; i++) {
      data += `${base} * ${i} = ${base * i}\n`;
    }

    fs.writeFile(`tablas/tabla_${base}.txt`, data, err => {
      if (err) reject(err);
      else resolve(`tabla_${base}.txt`);
    });
  });
};

module.exports = { crearArchivo, listarTabla };
