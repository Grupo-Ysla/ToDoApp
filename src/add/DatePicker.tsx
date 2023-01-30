import React, {useState, Dispatch, SetStateAction} from 'react';
import {Platform, View, Text, Button, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const getDate = (date: Date) => {
  let year = date.getUTCFullYear();
  let month: string | number = date.getMonth() + 1;
  let day: string | number = date.getDate();

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  const formatDate = `${year}-${month}-${day}`;

  return formatDate;
};

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

const DatePicker = ({setData, data}: Props) => {
  const [datePicker, setDatePicker] = useState(false);

  const onDateSelected = (event: Event | unknown, value?: Date) => {
    const currentDate = value || new Date(data.deadLine);
    setDatePicker(Platform.OS === 'ios');
    setData({...data, deadLine: Date.parse(currentDate.toISOString())});
    // setDate(value);
  };
  const showDatePicker = () => {
    setDatePicker(true);
  };

  return (
    <View>
      <View style={styles.input}>
        <Text style={styles.Text}>{getDate(new Date(data.deadLine))}</Text>
        {!datePicker && (
          <View
            style={{
              width: 150,
              marginHorizontal: 15,
              alignItems: 'flex-end',
            }}>
            <Button
              title="Date Picker"
              color="green"
              onPress={showDatePicker}
            />
          </View>
        )}
      </View>
      <View style={{width: 200, alignItems: 'flex-start'}}>
        {datePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date(data.deadLine)}
            mode={'date'}
            display="default"
            onChange={onDateSelected}
          />
        )}
      </View>
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  input: {
    backgroundColor: `#dcdcdc`,
    borderRadius: 10,
    color: 'black',
    paddingHorizontal: 20,
    width: 150,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Text: {
    height: 50,
    color: 'black',
    fontSize: 17,
    paddingVertical: 8,
  },
});
