import React, {useState} from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';
import {COLORS, FONT_SIZE, SCREEN_HEIGHT} from '../theme';
import {normalize} from '../common/helpers/responsive';

type Props = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
  options: string[] | number[];
  height: number;
  text?: string | undefined;
  setData: React.Dispatch<
    React.SetStateAction<{
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

const Picker = ({
  setShow,
  show,
  options,
  height,
  text,
  data,
  setData,
}: Props) => {
  const option = options.map((item, index) => {
    return (
      <Pressable
        key={index}
        style={{marginVertical: normalize(3)}}
        onPress={() => (
          typeof item === 'number' && setData({...data, remind: item}),
          typeof item !== 'number' && setData({...data, repeat: item}),
          setShow(false)
        )}>
        <Text style={styles.optionText}>{`${item} ${text ? text : ''}`}</Text>
      </Pressable>
    );
  });

  return (
    <View
      style={{
        borderRadius: normalize(10),
        marginBottom: typeof options[0] !== 'number' ? normalize(10) : 0,
      }}>
      <Text style={styles.dataText} onPress={() => setShow(!show)}>{`${
        typeof options[0] === 'number' ? data.remind : data.repeat
      } ${text ? text : ''}`}</Text>
      {show && (
        <View
          style={[
            styles.view,
            {
              height: height,
              marginBottom: typeof options[0] !== 'number' ? normalize(10) : 0,
            },
          ]}>
          {option}
        </View>
      )}
    </View>
  );
};

export default Picker;

const styles = StyleSheet.create({
  optionText: {
    color: COLORS.black38,
    fontSize: FONT_SIZE.small,
    marginTop: normalize(3),
    textAlignVertical: 'center',
    paddingHorizontal: normalize(10),
  },
  dataText: {
    backgroundColor: COLORS.gray,
    borderRadius: normalize(10),
    color: COLORS.black38,
    fontSize: FONT_SIZE.small,
    height: normalize(40),
    lineHeight: normalize(40),
    marginBottom: normalize(5),
    paddingHorizontal: normalize(10),
    textAlignVertical: 'center',
    overflow: 'hidden',
  },
  view: {
    backgroundColor: COLORS.gray,
    width: '100%',
  },
});
