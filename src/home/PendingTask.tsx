import React, {useEffect, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, StyleSheet, View, FlatList, Pressable} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {SCREEN_HEIGHT} from '../theme';
import {taskProps} from '../common/types';
import {normalize} from '../common/helpers/responsive';

const PendingTask = () => {
  const [data, setData] = useState<taskProps[]>([]);
  const isFocus = useIsFocused();

  const getData = async () => {
    try {
      const currentPendingtask = await AsyncStorage.getItem('pendingTask');
      setData(currentPendingtask != null ? JSON.parse(currentPendingtask) : []);
    } catch (e) {
      // error reading value
    }
  };

  const stocDeFrutas = ['platano', 'pera', 'fresa', 'mandarina', 'mango'];
  const newStockDeFrutas = stocDeFrutas.filter(fruta => fruta !== 'pera');

  const cantidadDeFrutas = {
    platano: 3,
    pera: 5,
    fresa: 2,
    mandarina: 6,
    mango: 7,
  };

  const doneTask = async (value: taskProps) => {
    const currentDoneTasks = await AsyncStorage.getItem('doneTask');

    try {
      const newsetData = JSON.stringify([
        ...(currentDoneTasks != null ? JSON.parse(currentDoneTasks) : []),
        value,
      ]);
      await AsyncStorage.setItem('doneTask', newsetData);
    } catch (e) {
      // saving error
    }
    try {
      const newcurrentPendingTasks = data.filter(
        (item: taskProps) => item.create !== value.create,
      );

      await AsyncStorage.setItem(
        'pendingTask',
        JSON.stringify(newcurrentPendingTasks),
      );
    } catch (e) {
      // saving error
    }
  };

  useEffect(() => {
    getData();
  }, [isFocus, data]);
  return (
    <View style={styles.container}>
      <Text style={styles.pendingtext}>Pending Task</Text>
      <FlatList<taskProps>
        data={data}
        keyExtractor={item => item.create}
        renderItem={({item}) => (
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              marginVertical: SCREEN_HEIGHT * 0.009,
            }}>
            <Pressable
              style={[styles.pressable, {borderColor: item.color}]}
              onPress={() => doneTask(item)}></Pressable>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default PendingTask;

const styles = StyleSheet.create({
  container: {
    height: 500,
    justifyContent: 'center',
    marginVertical: 15,
  },

  pendingtext: {
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  pressable: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: normalize(5),
    height: normalize(20),
    justifyContent: 'center',
    width: normalize(20),
  },
});
