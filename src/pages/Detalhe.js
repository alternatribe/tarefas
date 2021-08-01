import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';

const Detalhe = props => {
  const [tarefa, setTarefa] = useState({});
  useEffect(() => {
    async function obterTarefa() {
      setTarefa(props.route.params);
    }
    obterTarefa();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('-----> ', props.route.params);
  console.log('***--> ', tarefa);
  return (
    <View>
      <Text>Detalhe da tarefa {tarefa.titulo}</Text>
    </View>
  );
};

export default Detalhe;
