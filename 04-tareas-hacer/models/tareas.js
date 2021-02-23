const Tarea = require("./tarea");

/**
 * _listado
 *  { 'uuid': 'as21312154', desc='Hola', completadoEn: 9658}
 *
 * @class Tareas
 */
class Tareas {
  _listado = {};

  constructor() {
    this._listado = {};
  }

  crearTareas(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }
}

module.exports = Tareas;
