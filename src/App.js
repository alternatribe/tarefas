import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import * as React from 'react';
import Lista from './pages/Lista';
import Detalhe from './pages/Detalhe';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          initialRouteName: 'Lista',
          headerStyle: {
            backgroundColor: '#4361e7',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Lista"
          component={Lista}
          options={{
            title: 'Lista de Tarefas',
          }}
        />
        <Stack.Screen
          name="Detalhe"
          component={Detalhe}
          options={({route}) => ({
            title: route.params?.titulo,
            ...TransitionPresets.SlideFromRightIOS,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
