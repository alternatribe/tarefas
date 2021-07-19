import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native';

const RemoveButton = (props: any) => {
  return (
    <TouchableOpacity onPress={props.onClick}>
      <Icon name="trash" size={20} color="#f70000" />
    </TouchableOpacity>
  );
};
export default RemoveButton;
