import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, View, Button} from 'react-native';
import {Tarefa} from '../models/tarefa.models';
import {FlatList} from 'react-native-gesture-handler';
import ItemTarefa from '../components/ItemTarefa';

const Home = () => {
  let tarefa1 = new Tarefa();
  tarefa1.id = 1;
  tarefa1.titulo = 'Tarefa 1';
  let tarefa2 = new Tarefa();
  tarefa2.id = 2;
  tarefa2.titulo = 'Tarefa 2';
  let tarefa3 = new Tarefa();
  tarefa3.id = 3;
  tarefa3.titulo = 'Tarefa 3';
  const tarefas: Tarefa[] = [tarefa1, tarefa2, tarefa3];
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile', {name: 'Tarefa 1'})}
      />
      <FlatList
        data={tarefas}
        renderItem={({item}) => (
          <ItemTarefa id={item.id} titulo={item.titulo} />
          // <Text>{item.titulo}</Text>
        )}
      />
    </View>
  );
};

export default Home;
