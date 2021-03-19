const inquirer = require("inquirer");
require("colors");

const inquirerMenu = async () => {
  const preguntas = [
    {
      type: "list",
      name: "opcion",
      message: "Qué deseas hacer?",
      choices: [
        {
          value: 1,
          name: `${"1.".green} Buscar ciudad`,
        },
        {
          value: 2,
          name: `${"2.".green} Historial`,
        },
        {
          value: 0,
          name: `${"0.".green} Salir`,
        },
      ],
    },
  ];

  console.clear();
  console.log("=============================".green);
  console.log(" Seleccione una opción".white);
  console.log("=============================\n".green);

  const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
};

const pausar = async () => {
  console.log("\n");
  const question = [
    {
      type: "input",
      name: "pausa",
      message: `Presione ${"ENTER".green} para continuar`,
    },
  ];
  return inquirer.prompt(question);
};

const leerInput = async (message = "") => {
  const question = [
    {
      type: "input",
      name: "descripcion",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }

        return true;
      },
    },
  ];
  const { descripcion } = await inquirer.prompt(question);
  return descripcion;
};

const listarLugares = async (lugares = []) => {
  const choices = lugares.map((lugar, idx) => {
    const index = `${idx + 1}.`.green;
    return {
      value: lugar.id,
      name: `${index} ${lugar.nombre}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "(0.)".green + "Cancelar",
  });

  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "Seleccione el lugar:",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(preguntas);
  return id;
};

// const confirmar = async (message) => {
//   const question = {
//     type: "confirm",
//     name: "ok",
//     message,
//   };
//   const { ok } = await inquirer.prompt(question);

//   return ok;
// };

// const mostrarListadoCheckList = async (tareas = []) => {
//   const choices = tareas.map((tarea, idx) => {
//     const index = `${idx + 1}.`.green;
//     return {
//       value: tarea.id,
//       name: `${index} ${tarea.desc}`,
//       checked: tarea.completadoEn ? true : false,
//     };
//   });

//   const preguntas = [
//     {
//       type: "checkbox",
//       name: "ids",
//       message: "Seleccione",
//       choices,
//     },
//   ];

//   const { ids } = await inquirer.prompt(preguntas);
//   return ids;
// };

module.exports = {
  inquirerMenu,
  pausar,
  leerInput,
  listarLugares,
  // confirmar,
  // mostrarListadoCheckList,
};
