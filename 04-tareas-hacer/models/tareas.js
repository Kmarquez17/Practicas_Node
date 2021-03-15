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

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  get listadorArr() {
    const listado = [];

    Object.keys(this._listado).forEach((key) => {
      listado.push(this._listado[key]);
    });

    return listado;
  }

  cargarTareasFromArray(tareasDB = []) {
    tareasDB.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTareas(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    console.log("");
    this.listadorArr.forEach((tarea, i) => {
      const idx = `${i + 1}`.green;
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "Completada".green : "Pendiente".red;

      console.log(`${idx} ${desc} :: ${estado}`);
    });
  }

  listarPendienteCompletadas(completadas = true) {
    let index = 0;
    this.listadorArr.forEach((tarea) => {
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? completadoEn : "Pendiente".red;
      const verificar = completadoEn ? true : false;

      if (completadas === verificar) {
        index += 1;
        console.log(`${(index + ".").green} ${desc} :: ${estado.green}`);
      }
    });
  }

  toggleCompletada(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadorArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
