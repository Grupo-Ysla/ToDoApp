import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Text, StyleSheet, View, Pressable} from 'react-native';
import HomeHeader from './HomeHeader';
import PendingTask from './PendingTask';

const COLORS = {
  primary: 'rgb(41,191,110)',
  primaryDeg: 'rgba(41,191,110,0.5)',
};

const HomeScreen = () => {
  const navigation = useNavigation();

  const getData = async () => {
    try {
      const setData = await AsyncStorage.getItem('@data');
      console.log(setData);
      return setData != null ? JSON.parse(setData) : null;
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{flex: 1}}>
      <HomeHeader />
      <View style={styles.container}>
        <Text style={styles.completedTasks}>Completed tasks</Text>
      </View>
      <PendingTask />
      <View>
        <Pressable
          style={({pressed}) => [
            {
              backgroundColor: pressed ? COLORS.primaryDeg : COLORS.primary,
            },
            styles.presable,
          ]}
          onPress={() => navigation.navigate('AddTaskScreen')}>
          <Text style={styles.textPressable}>Add a task</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
    marginTop: 20,
  },

  completedTasks: {
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },

  textPressable: {
    color: 'black',
    fontSize: 20,
    paddingLeft: 12,
  },
  presable: {
    elevation: 40,
    marginVertical: 20,
    alignItems: 'center',
    borderRadius: 12,
    height: 40,
    justifyContent: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
  },
});
