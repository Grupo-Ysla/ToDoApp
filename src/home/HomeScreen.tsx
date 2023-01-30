import React, {useEffect} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Platform,
} from 'react-native';
import HomeHeader from './HomeHeader';
import PendingTask from './PendingTask';
import CompletTask from './CompletTask';
import {normalize} from '../common/helpers/responsive';

const COLORS = {
  primary: 'rgb(41,191,110)',
  primaryDeg: 'rgba(41,191,110,0.5)',
};

const HomeScreen = () => {
  const navigation = useNavigation();

  const isFocus = useIsFocused();

  useEffect(() => {
    const clearAll = async () => {
      try {
        await AsyncStorage.clear();
      } catch (e) {
        // clear error
      }
    };
    // clearAll();
  }, [isFocus]);

  // useEffect(() => {
  //   console.log('dentro');
  // }, []);

  // console.log('afuera-HomeScreen');
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <HomeHeader />
        <View style={{marginHorizontal: normalize(20), marginTop: 0}}>
          <CompletTask />
          <PendingTask />
        </View>
      </View>
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
    </SafeAreaView>
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
    alignItems: 'center',
    borderRadius: normalize(15),
    height: normalize(40),
    justifyContent: 'center',
    marginBottom: normalize(20),
    marginHorizontal: normalize(20),
  },
});
