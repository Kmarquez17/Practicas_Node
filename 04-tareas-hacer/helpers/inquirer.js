const inquirer = require("inquirer");
require("colors");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "Qué deseas hacer?",
    choices: [
      {
        value: "1",
        name: "1. Crear tarea",
      },
      {
        value: "2",
        name: "2. Listar tareas",
      },
      {
        value: "3",
        name: "3. Listar tareas completadas",
      },
      {
        value: "4",
        name: "4. Listar tareas pendientes",
      },
      {
        value: "5",
        name: "5. Completar tarea(s)",
      },
      {
        value: "6",
        name: "6. Borrar tareas",
      },
      {
        value: "0",
        name: "0. Salir",
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("=============================".green);
  console.log(" Menu de acciones".green);
  console.log("=============================\n".green);

  const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
};

const pausar = async () => {
  const question = [
    {
      type: "input",
      name: "pausa",
      message: `\nPresione ${"ENTER".green} para continuar\n`,
    },
  ];
  await inquirer.prompt(question);
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

module.exports = {
  inquirerMenu,
  pausar,
  leerInput,
};
