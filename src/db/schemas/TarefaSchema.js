class TarefaSchema {
  static schema = {
    name: 'Tarefa',
    primaryKey: 'id',
    properties: {
      id: {type: 'int', indexed: true},
      titulo: 'string',
      concluido: {type: 'int', default: 0},
      anotacao: 'string?',
    },
  };
}
export default TarefaSchema;
