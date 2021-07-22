import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  HeaderBackButton,
  HeaderStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';
import * as React from 'react';
import Lista from './pages/Lista';
import Detalhe from './pages/Detalhe';

const Stack = createStackNavigator();

function App() {
  const MyTransition = {
    gestureDirection: 'horizontal',
    transitionSpec: {
      open: TransitionSpecs.TransitionIOSSpec,
      close: TransitionSpecs.TransitionIOSSpec,
    },
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  };
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
          name="Lista"
          component={Lista}
          options={{title: 'Lista de Tarefas'}}
        />
        <Stack.Screen
          name="Detalhe"
          component={Detalhe}
          options={({navigation, route}) => ({
            title: route.params?.name,
            ...MyTransition,
            // headerLeft: () => (
            //   <HeaderBackButton
            //     onPress={() => {
            //       alert('Tarefa atualizada!');
            //       navigation.goBack();
            //     }}
            //   />
            // ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
