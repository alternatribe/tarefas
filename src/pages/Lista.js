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
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import ItemTarefa from '../components/ItemTarefa';

const Tarefa = function (id, titulo, concluido, temSubTarefa) {
  return {id, titulo, concluido, temSubTarefa};
};

const Lista = () => {
  const navigation = useNavigation();

  let tarefa1 = Tarefa(1, 'Compras: Supermercado Condor', 0, false);
  let tarefa2 = Tarefa(2, 'Lista de Compras', 0, false);
  let tarefa3 = Tarefa(3, 'Marcar Dentista', 0, false);
  let tarefa4 = Tarefa(
    4,
    'Baaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    1,
    false,
  );
  const [listaTarefas, setListaTarefas] = useState([
    tarefa1,
    tarefa2,
    tarefa3,
    tarefa4,
  ]);
  // const [tarefas, setTarefas] = useState([]);
  const [tarefaAtual, setTarefaAtual] = useState({});
  const [textoPesquisa, setTextoPesquisa] = useState('');

  async function adicionarTarefa() {
    // const search = tarefa.filter(tarefa => tarefa === novaTarefa);

    // if (search.length !== 0) {
    //   Alert.alert('Atenção', 'Nome da tarefa repetido!');
    //   return;
    // }

    setListaTarefas([...listaTarefas, tarefaAtual]);
    setTarefaAtual({});

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
          onPress: () =>
            setListaTarefas(
              listaTarefas.filter(itemListaTarefa => itemListaTarefa !== item),
            ),
        },
      ],
      {cancelable: false},
    );
  }

  async function concluirTarefa(item) {
    //alert(item);
  }

  async function pesquisaTarefa(item) {
    setTextoPesquisa('');
  }

  useEffect(() => {
    async function obterTarefas() {
      // const task = await AsyncStorage.getItem('task');
      // if (task) {
      //   setTask(JSON.parse(task));
      // }
    }
    obterTarefas();
  }, []);

  useEffect(() => {
    async function salvarTarefas() {
      // AsyncStorage.setItem('task', JSON.stringify(task));
    }
    salvarTarefas();
  }, [listaTarefas]);

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
            return (
              <View style={styles.BodyEmptyList}>
                <Text>Nenhuma tarefa cadastrada!!!</Text>
              </View>
            );
          }}
          renderItem={({item}) => (
            <View style={styles.ContainerView}>
              <ItemTarefa
                style={styles.Texto}
                //state={1}
                text={item.titulo}
                //enableIndeterminate={true}
                onCheck={() => concluirTarefa(item)}
                onPress={() =>
                  navigation.navigate('Detalhe', {
                    name:
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
        {/* <TextInput
          style={styles.InputAdd}
          placeholderTextColor="#999"
          autoCorrect={true}
          value={tarefaAtual}
          placeholder="Adicione uma tarefa"
          maxLength={300}
          onChangeText={text => setTarefaAtual(text)}
        /> */}
        <TouchableOpacity
          style={styles.ButtonAdd}
          onPress={() => adicionarTarefa()}>
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
    // flexDirection: 'row',
    flexDirection: 'row-reverse',
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
