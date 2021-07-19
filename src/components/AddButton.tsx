import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native';

const AddButton = (props: any) => {
  return (
    <TouchableOpacity onPress={props.onClick}>
      <Icon name="plus-circle" size={28} color="#2a1bff" />
    </TouchableOpacity>
  );
};
export default AddButton;
