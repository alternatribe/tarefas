import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, View, Button} from 'react-native';

const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile', {name: 'Tarefa 1'})}
      />
    </View>
  );
};

export default Home;
