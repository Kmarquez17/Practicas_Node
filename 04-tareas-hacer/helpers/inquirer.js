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
          value: "1",
          name: `${"1.".green} Crear tarea`,
        },
        {
          value: "2",
          name: `${"2.".green} Listar tareas`,
        },
        {
          value: "3",
          name: `${"3.".green} Listar tareas completadas`,
        },
        {
          value: "4",
          name: `${"4.".green} Listar tareas pendientes`,
        },
        {
          value: "5",
          name: `${"5.".green} Completar tarea(s)`,
        },
        {
          value: "6",
          name: `${"6.".green} Borrar tareas`,
        },
        {
          value: "0",
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

const listadoTareaBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, idx) => {
    const index = `${idx + 1}.`.green;
    return {
      value: tarea.id,
      name: `${index} ${tarea.desc}`,
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
      message: "Borrar",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(preguntas);
  return id;
};

const confirmar = async (message) => {
  const question = {
    type: "confirm",
    name: "ok",
    message,
  };
  const { ok } = await inquirer.prompt(question);

  return ok;
};

const mostrarListadoCheckList = async (tareas = []) => {
  const choices = tareas.map((tarea, idx) => {
    const index = `${idx + 1}.`.green;
    return {
      value: tarea.id,
      name: `${index} ${tarea.desc}`,
      checked: (tarea.completadoEn) ? true : false,
    };
  });

  const preguntas = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(preguntas);
  return ids;
};

module.exports = {
  inquirerMenu,
  pausar,
  leerInput,
  listadoTareaBorrar,
  confirmar,
  mostrarListadoCheckList,
};
