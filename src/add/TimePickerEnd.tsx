import React, {useState, Dispatch, SetStateAction} from 'react';
import {Platform, View, Button, Text, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

type Props = {
  setData: Dispatch<
    SetStateAction<{
      title: string;
      deadLine: number;
      startTime: number;
      endtime: number;
      remind: number;
      repeat: string;
    }>
  >;
  data: {
    title: string;
    deadLine: number;
    startTime: number;
    endtime: number;
    remind: number;
    repeat: string;
  };
};

const getTime = (date: Date) => {
  let hours = date.getHours();
  let minutes: string | number = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';

  hours %= 12;
  hours = hours || 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  const strTime = `${hours}:${minutes} ${ampm}`;

  return strTime;
};
const getMilliseconds = (currentDate: Date, milliseconds: number) => {
  const format = `${currentDate.getHours()}:${currentDate.getMinutes()}`;

  const [hours, minutes] = format.split(':');
  const time = (+hours * 60 * 60 + +minutes * 60) * 1000;
  const date = new Date(milliseconds);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const initialDate = new Date(year, month, day).getTime();
  // console.log('initialDate-getMilliseconds-AddTaskForm:', initialDate);

  return time + initialDate;
};

const TimePickerEnd = ({setData, data}: Props) => {
  const [secondTimePicker, setSecondTimePicker] = useState(false);

  const onEndTimeSelected = (event: Event | unknown, value?: Date) => {
    const currentDate = value || new Date(data.endtime);
    setSecondTimePicker(Platform.OS === 'ios');
    const milliseconds = getMilliseconds(currentDate, data.deadLine);
    setData({...data, endtime: milliseconds});
  };
  const showTimePicker1 = () => {
    setSecondTimePicker(true);
  };

  return (
    <View style={styles.input}>
      <Text> {getTime(new Date(data.endtime))}</Text>
      {!secondTimePicker && (
        <View
          style={{
            height: 40,
            margin: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Button title="Time Picker" color="green" onPress={showTimePicker1} />
        </View>
      )}
      <View style={{width: 200, alignItems: 'flex-start'}}>
        {secondTimePicker && (
          <DateTimePicker
            value={new Date(data.endtime)}
            mode="time"
            display="default"
            is24Hour={true}
            onChange={onEndTimeSelected}
          />
        )}
      </View>
    </View>
  );
};

export default TimePickerEnd;

const styles = StyleSheet.create({
  input: {
    backgroundColor: `#dcdcdc`,
    borderRadius: 10,
    color: 'black',
    height: 50,
    paddingHorizontal: 10,
    marginHorizontal: 30,
  },
});
