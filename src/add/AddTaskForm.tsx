import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import DatePicker from './DatePicker';
import TimePickerStart from './TimePickerStart';
import TimePickerEnd from './TimePickerEnd';
import Picker from './Picker';
import {remind, repeat} from '../common/data/data';
import PendingTask from '../home/PendingTask';
import {getRandomColor} from '../common/helpers/colorHelper';

const COLORS = {
  primary: 'rgb(41,191,110)',
  primaryDeg: 'rgba(41,191,110,0.5)',
};

const today = Date.parse(new Date().toISOString());

const initialValues = {
  title: '',
  deadLine: today,
  startTime: today,
  endtime: today,
  remind: 10,
  repeat: 'Weekly',
};

const AddTaskForm = () => {
  const navigation = useNavigation();

  const [showRemind, setShowRemind] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);
  const [data, setData] = useState(initialValues);
  const [isFocus, setIsFocus] = useState(false);
  const isFocusScreen = useIsFocused();

  const sendTask = async () => {
    const currentPendingtask = await AsyncStorage.getItem('pendingTask');

    try {
      const setData = JSON.stringify([
        ...(currentPendingtask != null ? JSON.parse(currentPendingtask) : []),
        {
          ...data,
          create: Date.parse(new Date().toISOString()),
          color: getRandomColor(),
        },
      ]);
      await AsyncStorage.setItem('pendingTask', setData);
    } catch (e) {
      // saving error
    }

    if (data.title) {
      alert('Task created!');
      navigation.navigate('HomeScreen');
    } else {
      alert('You must add a title');
    }
  };

  useEffect(() => {}, [isFocusScreen]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop: 20}}>
          <Text style={styles.inputLabel}>Title</Text>
          <View style={styles.input}>
            <TextInput
              style={styles.inputContainer}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              placeholder="Desing team meeting"
              value={data.title}
              onChangeText={text => setData({...data, title: text})}
            />
            <View style={{marginTop: 15}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 20,
                  fontWeight: '700',
                  borderRadius: 30,
                  paddingLeft: 5,
                }}>
                DeadLine
              </Text>
              <DatePicker setData={setData} data={data} />
            </View>
          </View>
          <View
            style={{
              marginTop: 110,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{width: 200}}>
              <Text style={styles.inputLabel}>Start time</Text>
              <TimePickerStart setData={setData} data={data} />
            </View>
            <View style={{width: 200}}>
              <Text style={styles.inputLabel}>End time</Text>
              <TimePickerEnd setData={setData} data={data} />
            </View>
          </View>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={[styles.inputLabel, {width: 150}]}>Remind</Text>
          <Picker
            setShow={setShowRemind}
            show={showRemind}
            options={remind}
            height={130}
            text={'minutes early'}
            setData={setData}
            data={data}
          />
        </View>
        <View style={{marginTop: 15}}>
          <Text style={styles.inputLabel}>Repeat</Text>
          <Picker
            setShow={setShowRepeat}
            show={showRepeat}
            options={repeat}
            height={60}
            setData={setData}
            data={data}
          />
        </View>
      </ScrollView>
      <>
        <View style={{paddingVertical: 20}}>
          <Pressable
            style={({pressed}) => [
              {
                backgroundColor: pressed ? COLORS.primaryDeg : COLORS.primary,
              },
              styles.presable,
            ]}
            onPress={sendTask}>
            <Text style={styles.textPressable}>Create a task</Text>
          </Pressable>
        </View>
      </>
    </KeyboardAvoidingView>
  );
};

export default AddTaskForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  presable: {
    alignItems: 'center',
    borderRadius: 15,
    height: 40,
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  textPressable: {
    color: 'white',
    fontSize: 20,
  },

  inputLabel: {
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
    borderRadius: 30,
    paddingLeft: 40,
  },
  input: {
    backgroundColor: `#dcdcdc`,
    borderRadius: 10,
    color: 'black',
    height: 50,
    paddingHorizontal: 10,
    marginHorizontal: 30,
  },
  inputContainer: {
    backgroundColor: `#dcdcdc`,
    fontSize: 15,
  },
  viewTop: {},
});
