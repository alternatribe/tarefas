/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ItemTarefa = props => {
  const iconsName = [
    'check-box-outline-blank',
    'check-box',
    'indeterminate-check-box',
  ];

  const [iconName, setIconName] = useState(props.state);

  const onCheck = () => {
    if (iconName === iconsName.length - 1) {
      setIconName(0);
      if (props.onCheck) {
        props.onCheck(0);
      }
      return;
    }
    if (props.enableIndeterminate === false && iconName === 1) {
      setIconName(0);
      if (props.onCheck) {
        props.onCheck(0);
      }
      return;
    }
    setIconName(iconName + 1);
    if (props.onCheck) {
      props.onCheck(iconName + 1);
    }
  };

  const onPress = () => {
    if (props.onPress) {
      props.onPress();
    }
  };

  const onDelete = () => {
    if (props.onDelete) {
      props.onDelete();
    }
  };

  return (
    <View style={styles.Container}>
      <TouchableWithoutFeedback onPress={onCheck}>
        <MaterialIcons
          style={styles.CheckboxIcon}
          name={iconsName[iconName]}
          size={30}
          color="#4F8EF7"
        />
      </TouchableWithoutFeedback>
      <TouchableOpacity style={styles.TextContainer} onPress={onPress}>
        <View>
          <Text
            style={[
              iconName === 1
                ? {
                    textDecorationLine: 'line-through',
                    color: '#A3A3A3',
                    fontWeight: 'normal',
                  }
                : {
                    textDecorationLine: 'none',
                    color: '#757575',
                    fontWeight: 'bold',
                  },
              props.style,
            ]}>
            {props.text}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete}>
        <Ionicons
          name="trash-outline"
          style={styles.DeleteIcon}
          size={26}
          color="red"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  CheckboxIcon: {
    paddingRight: 10,
  },
  TextContainer: {
    flex: 1,
  },
  DeleteIcon: {
    paddingLeft: 10,
    marginTop: 2,
  },
});

ItemTarefa.propTypes = {
  state: PropTypes.oneOf([...new Array(3)].map((_, i) => i)),
  text: PropTypes.string,
  enableIndeterminate: PropTypes.bool,
  onPress: PropTypes.func,
  onCheck: PropTypes.func,
  onDelete: PropTypes.func,
  style: Text.propTypes.style,
};

ItemTarefa.defaultProps = {
  state: 0,
  enableIndeterminate: false,
};

export default ItemTarefa;
