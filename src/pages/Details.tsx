import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, View, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

const Details = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'space-between', alignItems: 'center'}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Profile screen</Text>
        <Icon name="home" size={18} color="#999" />
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
};
export default Details;
