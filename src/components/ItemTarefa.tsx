import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RemoveButton from './RemoveButton';

const ItemTarefa = (props: any) => {
  return (
    <View>
      <Text>{props.titulo}</Text>
      <RemoveButton
        onClick={() => {
          alert('Tarefa atualizada!');
        }}
      />
    </View>
    // <View
    //   style={[
    //     styles.container,
    //     {
    //       flexDirection: 'row',
    //     },
    //   ]}>
    //   <View />
    //   <View style={{flex: 1}}>
    //     <Text>{props.titulo}</Text>
    //   </View>
    //   <View style={{flex: 1}}>
    //     <Text>{props.id}</Text>
    //   </View>
    // </View>
    // <View
    //   style={[
    //     styles.container,
    //     {
    //       flexDirection: 'row',
    //     },
    //   ]}>
    //   <View style={{flex: 1, backgroundColor: 'red'}} />
    //   <View style={{flex: 2, backgroundColor: 'darkorange'}}>
    //     <Text>{props.titulo}</Text>
    //   </View>
    //   <View style={{flex: 3, backgroundColor: 'green'}} />
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default ItemTarefa;
