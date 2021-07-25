import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';

const Tarefa = function (id, titulo, anotacao, subtarefas, concluido) {
  return {id, titulo, anotacao, subtarefas, concluido};
};

const Detalhe = props => {
  const [tarefa, setTarefa] = useState(Tarefa());
  useEffect(() => {
    async function obterTarefa() {
      setTarefa(Tarefa(1, 'teste', 0));
    }
    obterTarefa();
  }, []);

  console.log('-----> ', props.route.params.titulo);
  console.log('***--> ', tarefa);
  return (
    <View>
      <Text>Detalhe da tarefa {tarefa.titulo}</Text>
    </View>
  );
};

export default Detalhe;
