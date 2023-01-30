import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AddTaskForm from './AddTaskForm';
import AddTaskHeader from './AddTaskHeader';

const AddTaskScreen = () => {
  return (
    <View style={{flex: 1}}>
      <AddTaskHeader />
      <AddTaskForm />
    </View>
  );
};

export default AddTaskScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'gary',
    flex: 1,
    justifyContent: 'center',
  },
});
