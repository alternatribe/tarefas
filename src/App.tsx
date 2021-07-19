import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import Home from './pages/Home';
import Details from './pages/Details';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4361e7',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Lista de Tarefas'}}
        />
        <Stack.Screen
          name="Profile"
          component={Details}
          options={({navigation, route}) => ({
            title: route.params?.name,
            headerLeft: () => (
              <HeaderBackButton
                onPress={() => {
                  alert('Tarefa atualizada!');
                  navigation.goBack();
                }}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
