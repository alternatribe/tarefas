import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, View} from 'react-native';
import AddButton from '../components/AddButton';

const Details = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Profile screen</Text>
      <AddButton
        onClick={() => {
          alert('Tarefa atualizada!');
          navigation.goBack();
        }}
      />
    </View>
  );
};

export default Details;
