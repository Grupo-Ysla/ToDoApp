import { Alert } from 'react-native';

export const simpleAlert = (
  title: string,
  message: string,
  cancelAction: () => void,
  executeAction: () => void,
) => {
  Alert.alert(title, message, [
    {
      text: 'Cancel',
      onPress: () => cancelAction(),
    },
    {
      text: 'Delete',
      onPress: () => executeAction(),
    },
  ]);
};
