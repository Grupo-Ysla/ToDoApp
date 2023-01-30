import React, {useEffect, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, StyleSheet, View, FlatList, Pressable} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {COLORS, FONT_SIZE, letterSpacing, SCREEN_HEIGHT} from '../theme';
import {taskProps} from '../common/types';
import {normalize} from '../common/helpers/responsive';

const CompletTask = () => {
  const [data, setData] = useState<taskProps[]>([]);

  const getDone = async () => {
    try {
      const currentDonetask = await AsyncStorage.getItem('doneTask');
      setData(currentDonetask != null ? JSON.parse(currentDonetask) : []);
    } catch (e) {
      // error reading value
    }
  };
  const undoCompleteTask = async (Task: taskProps) => {
    const currentundoCompleteTasks = await AsyncStorage.getItem(
      'undoCompleteTask',
    );

    try {
      const newsetUndoData = JSON.stringify([
        ...(currentundoCompleteTasks != null
          ? JSON.parse(currentundoCompleteTasks)
          : []),
        Task,
      ]);
      await AsyncStorage.setItem('undoCompleteTask', newsetUndoData);
    } catch (e) {
      // saving error
    }
    console.log('incompleteValue:', Task);
  };

  useEffect(() => {
    getDone();
  }, [data]);
  return (
    <View style={styles.container}>
      <Text style={styles.completedTasks}>Completed tasks</Text>
      <FlatList
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
              style={[
                styles.pressable,
                {backgroundColor: item.color, borderColor: item.color},
              ]}
              onPress={() => undoCompleteTask(item)}
            />
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default CompletTask;

const styles = StyleSheet.create({
  container: {
    height: normalize(200),
    justifyContent: 'center',
    marginTop: normalize(20),
  },

  completedTasks: {
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },

  view: {
    flexDirection: 'row',
    marginVertical: normalize(10),
  },
  pressable: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: normalize(5),
    height: normalize(20),
    justifyContent: 'center',
    width: normalize(20),
  },
  textPressable: {
    color: COLORS.black87,
    fontSize: FONT_SIZE.small,
    letterSpacing: letterSpacing,
    paddingLeft: normalize(12),
  },
});
