import Realm from 'realm';
import TarefaSchema from './schemas/TarefaSchema';

function open() {
  return Realm.open({
    schema: [TarefaSchema],
    schemaVersion: 5,
  });
}

function getObject(tarefa) {
  const isDebuggingEnabled = typeof atob !== 'undefined';
  //const isDebuggingEnabled = typeof DedicatedWorkerGlobalScope !== 'undefined';
  if (isDebuggingEnabled) {
    return JSON.parse(JSON.stringify(tarefa));
  }
  return Realm.Object.prototype.toJSON.call(tarefa);
}

async function getAll(param) {
  const db = await open();
  const tarefas = db.objects('Tarefa').sorted('titulo');
  if (param) {
    return tarefas.filtered('titulo CONTAINS $0', param);
  }
  return tarefas;
}

async function add(tarefa) {
  const db = await open();
  db.write(() => {
    if (!tarefa.id || tarefa.id === 0) {
      let tarefaMax = {id: 0};
      const tarefas = db.objects('Tarefa');
      if (tarefas.length > 0) {
        tarefaMax = tarefas.reduce((idPrev, idCurrent) => {
          return idPrev.id > idCurrent.id ? idPrev : idCurrent;
        });
      }
      tarefa.id = tarefaMax.id + 1;
    }
    db.create('Tarefa', tarefa, 'modified');
  });
}

async function remove(tarefa) {
  const db = await open();
  db.write(() => {
    db.delete(tarefa);
  });
}

async function removeAll() {
  const db = await Storage();
  db.write(() => {
    db.deleteAll();
  });
}

const Storage = {
  getObject,
  getAll,
  add,
  remove,
  removeAll,
};

export default Storage;
