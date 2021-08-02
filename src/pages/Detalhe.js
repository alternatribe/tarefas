/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Storage from '../db/Storage';

const Detalhe = props => {
  const [inputTitulo, setInputTitulo] = useState('');
  const [inputAnotacao, setInputAnotacao] = useState('');
  const [isConcluido, setConcluido] = useState(false);

  useEffect(() => {
    async function obterTarefa() {
      setInputTitulo(props.route.params.tarefa.titulo);
      setInputAnotacao(props.route.params.tarefa.anotacao);
      setConcluido(props.route.params.tarefa.concluido);
    }
    obterTarefa();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function atualizar() {
    const tarefa = props.route.params.tarefa;
    tarefa.titulo = inputTitulo;
    tarefa.anotacao = inputAnotacao;
    await Storage.add(tarefa);
    props.navigation.goBack();
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.Container}>
        <View style={styles.Form}>
          <Text style={[styles.Text, {paddingTop: 0}]}>Título</Text>
          <TextInput
            style={styles.Input}
            placeholderTextColor="#999"
            autoCorrect={false}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
            value={inputTitulo}
            placeholder="Entre com o título da tarefa"
            maxLength={300}
            onChangeText={texto => setInputTitulo(texto)}
          />
          <Text style={styles.Text}>Anotação</Text>
          <TextInput
            style={styles.Input}
            placeholderTextColor="#999"
            autoCorrect={false}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
            multiline={true}
            textAlignVertical="top"
            numberOfLines={5}
            value={inputAnotacao}
            placeholder="Entre com uma anotação sobre a tarefa"
            onChangeText={texto => setInputAnotacao(texto)}
          />
        </View>
        <View style={styles.ConcluidoView}>
          <Text>Concluido: </Text>
          <Text>{isConcluido === 1 ? 'Sim' : 'Não'}</Text>
        </View>
        <TouchableOpacity onPress={atualizar}>
          <View style={styles.Button}>
            <Text style={styles.ButtonTxt}>Atualizar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  Form: {
    padding: 10,
  },
  Input: {
    backgroundColor: '#eee',
    borderRadius: 5,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  Text: {
    paddingTop: 10,
    paddingBottom: 5,
  },
  ConcluidoView: {
    flexDirection: 'row',
    padding: 10,
  },
  Button: {
    alignItems: 'center',
    backgroundColor: '#4361e7',
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  ButtonTxt: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default Detalhe;
