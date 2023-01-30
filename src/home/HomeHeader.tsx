import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <Text style={styles.todoApp}>To-Do App</Text>
        <Icon name="search" style={{fontSize: 20, color: 'black'}} />
        <View style={{alignItems: 'flex-end'}}>
          <View style={styles.iconsView} />
          <Icon name="bell" style={{fontSize: 20, color: 'black'}} />
        </View>
        <Icon name="bars" style={{fontSize: 20, color: 'black'}} />
      </View>
    </View>
  );
};

export default HomeHeader;

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

  todoApp: {
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
    width: 120,
  },
  iconsView: {
    backgroundColor: '#26c16f',
    borderRadius: 2.5,
    height: 6,
    right: 3,
    top: 3,
    position: 'absolute',
    width: 6,
  },
});
