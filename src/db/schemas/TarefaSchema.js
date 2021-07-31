class TarefaSchema {
  static schema = {
    name: 'Tarefa',
    primaryKey: 'id',
    properties: {
      id: {type: 'int', indexed: true},
      titulo: 'string',
      concluido: 'int',
      anotacao: 'string',
    },
  };
}
export default TarefaSchema;
