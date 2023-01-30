import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {Text, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const AddTaskHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <Icon
          name="left"
          style={styles.icon}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.addTask}>Add task</Text>
      </View>
    </View>
  );
};

export default AddTaskHeader;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 3,
    borderBottomColor: 'gray',
    height: 70,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  view: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    color: 'black',
    fontSize: 20,
    height: 25,
    textAlign: 'center',
    textAlignVertical: 'center',
    width: 20,
  },

  addTask: {
    // borderWidth: 1,
    color: 'black',
    fontSize: 25,
    fontWeight: '700',
    width: 300,
  },
});
