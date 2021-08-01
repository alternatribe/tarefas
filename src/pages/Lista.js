import React, {useState, useEffect} from 'react';
import {
  Alert,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ItemTarefa from '../components/ItemTarefa';
import Storage from '../db/Storage';

const Lista = props => {
  const [listaTarefas, setListaTarefas] = useState([]);
  const [tarefaInput, setTarefaInput] = useState({});
  const [textoPesquisa, setTextoPesquisa] = useState('');
  const [isFiltered, setFiltered] = useState(false);

  async function adicionarTarefa() {
    if (!tarefaInput.titulo) {
      alert('É necessário informar o título da tarefa...');
      return;
    }
    await Storage.add(tarefaInput);
    setListaTarefas(await Storage.getAll());
    setTarefaInput({});
    Keyboard.dismiss();
  }

  async function apagarTarefa(item) {
    Alert.alert(
      'Apagar a Tarefa',
      'Tem certeza que deseja apagar esta tarefa?',
      [
        {
          text: 'Não',
          onPress: () => {
            return;
          },
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            await Storage.remove(item);
            setListaTarefas(await Storage.getAll());
          },
        },
      ],
      {cancelable: false},
    );
  }

  async function concluirTarefa(item, value) {
    const tarefa = JSON.parse(JSON.stringify(item));
    tarefa.concluido = value;
    await Storage.add(tarefa);
  }

  async function pesquisaTarefa() {
    if (textoPesquisa.length > 0) {
      setFiltered(true);
    } else {
      setFiltered(false);
    }
    setListaTarefas(await Storage.getAll(textoPesquisa));
    Keyboard.dismiss();
  }

  useEffect(() => {
    async function obterTarefas() {
      setListaTarefas(await Storage.getAll());
    }
    obterTarefas();
  }, []);

  return (
    <View style={styles.Container}>
      <View style={styles.FormSearch}>
        <TextInput
          style={styles.InputSearch}
          placeholderTextColor="#999"
          autoCorrect={false}
          value={textoPesquisa}
          placeholder="Procurar"
          maxLength={300}
          inlineImageLeft="search_icon"
          onChangeText={texto => setTextoPesquisa(texto)}
        />
        <TouchableOpacity
          style={styles.ButtonSearch}
          onPress={() => pesquisaTarefa()}>
          <Icon name="search" size={20} color="#999" />
        </TouchableOpacity>
      </View>
      <View style={styles.BodyList}>
        <FlatList
          data={listaTarefas}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={true}
          style={styles.FlatList}
          ListEmptyComponent={() => {
            let txt = 'Nenhuma tarefa cadastrada!!!';
            if (isFiltered) {
              txt = 'Tarefa pesquisada não encontrada!!!';
            }
            return (
              <View style={styles.BodyEmptyList}>
                <Text>{txt}</Text>
              </View>
            );
          }}
          renderItem={({item}) => (
            <View style={styles.ContainerView}>
              <ItemTarefa
                style={styles.Texto}
                state={item.concluido}
                text={item.titulo}
                //enableIndeterminate={item.temSubTarefa}
                onCheck={value => concluirTarefa(item, value)}
                onPress={() =>
                  props.navigation.navigate('Detalhe', {
                    id: item.id,
                    titulo:
                      item.titulo.length > 20
                        ? item.titulo.substr(0, 20) + '...'
                        : item.titulo,
                  })
                }
                onDelete={() => apagarTarefa(item)}
              />
            </View>
          )}
        />
      </View>

      <View style={styles.FormAdd}>
        <TextInput
          style={styles.InputAdd}
          placeholderTextColor="#999"
          autoCorrect={true}
          value={tarefaInput.titulo}
          placeholder="Adicione uma tarefa"
          maxLength={300}
          onChangeText={titulo => setTarefaInput({titulo})}
        />
        <TouchableOpacity
          style={styles.ButtonAdd}
          onPress={() => adicionarTarefa(tarefaInput)}>
          <Icon name="add-circle" size={48} color="#2a1bff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  FormSearch: {
    padding: 10,
    height: 60,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#CCC',
  },
  InputSearch: {
    flex: 1,
    height: 40,
    backgroundColor: '#eee',
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    borderWidth: 1,
    borderColor: '#eee',
  },
  ButtonSearch: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#eee',
  },
  FormAdd: {
    paddingTop: 10,
    paddingLeft: 10,
    height: 60,
    flexDirection: 'row',
    // flexDirection: 'row-reverse',
    borderTopWidth: 1,
    borderColor: '#CCC',
  },
  InputAdd: {
    flex: 1,
    height: 30,
    top: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: '#eee',
  },
  ButtonAdd: {
    marginLeft: 10,
    top: -5,
  },
  BodyList: {
    flex: 1,
  },
  BodyEmptyList: {
    flex: 1,
    paddingLeft: 10,
  },
  FlatList: {
    marginTop: 10,
    marginBottom: 10,
  },
  ContainerView: {
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
    paddingTop: 2,
    paddingBottom: 2,
    minHeight: 30,
    paddingLeft: 5,
    paddingRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#eee',
  },
  Texto: {
    // fontSize: 16,
  },
});

export default Lista;
