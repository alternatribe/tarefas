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

const Lista = () => {
  const [tarefas, setTarefas] = useState([
    'Compras: Supermercado Condor',
    'Lista de Compras',
    'Marcar Dentista',
    'Baaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    'Bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb ',
    'Bcccc',
    'ddddd',
    'eeeee',
    'fffff',
    'ggggg',
  ]);
  // const [tarefas, setTarefas] = useState([]);
  const [tarefa, setTarefa] = useState('');
  const [pesquisa, setPesquisa] = useState('');

  async function adicionaTarefa() {
    // const search = tarefa.filter(tarefa => tarefa === novaTarefa);

    // if (search.length !== 0) {
    //   Alert.alert('Atenção', 'Nome da tarefa repetido!');
    //   return;
    // }

    setTarefas([...tarefas, tarefa]);
    setTarefa('');

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
            setTarefas(tarefas.filter(tarefas => tarefas !== item)),
        },
      ],
      {cancelable: false},
    );
  }

  async function concluirTarefa(item) {
    //alert(item);
  }

  async function pesquisaTarefa(item) {
    setPesquisa('');
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
  }, [tarefas]);
  const navigation = useNavigation();
  return (
    <View style={styles.Container}>
      <View style={styles.FormSearch}>
        <TextInput
          style={styles.InputSearch}
          placeholderTextColor="#999"
          autoCorrect={false}
          value={pesquisa}
          placeholder="Procurar"
          maxLength={300}
          inlineImageLeft="search_icon"
          onChangeText={texto => setPesquisa(texto)}
        />
        <TouchableOpacity
          style={styles.ButtonSearch}
          onPress={() => pesquisaTarefa()}>
          <Icon name="search" size={20} color="#999" />
        </TouchableOpacity>
      </View>
      <View style={styles.BodyList}>
        <FlatList
          data={tarefas}
          keyExtractor={item => item.toString()}
          showsVerticalScrollIndicator={true}
          style={styles.FlatList}
          ListEmptyComponent={() => {
            return (
              <View style={{flex: 1}}>
                <Text>Nenhuma tarefa cadastrada!!!</Text>
              </View>
            );
          }}
          renderItem={({item}) => (
            <View style={styles.ContainerView}>
              <ItemTarefa
                style={styles.Texto}
                //state={1}
                text={item}
                //enableIndeterminate={true}
                onCheck={() => concluirTarefa(item)}
                onPress={() =>
                  navigation.navigate('Detalhe', {
                    name: item.length > 20 ? item.substr(0, 20) + '...' : item,
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
          value={tarefa}
          placeholder="Adicione uma tarefa"
          maxLength={300}
          onChangeText={text => setTarefa(text)}
        />
        <TouchableOpacity
          style={styles.ButtonAdd}
          onPress={() => adicionaTarefa()}>
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
    //fontSize: 16,
  },
});

export default Lista;
