import React, { PropTypes } from 'react';
import { Alert, TouchableHighlight, View, Text, StyleSheet } from 'react-native';

const defaultStyles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    paddingBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
});

const DefaultNotificationBody = ({ title, message, onPress, onClose }) => (
  <TouchableHighlight
    style={defaultStyles.root}
    activeOpacity={0.3}
    underlayColor="transparent"
    onPress={onPress}
  >
    <View style={[defaultStyles.container, { paddingBottom: title && message ? 10 : 0 }]}>
      <View>
        {title ? <Text style={[defaultStyles.text, defaultStyles.bold]}>{title}</Text> : null}
        {message ? <Text style={defaultStyles.text}>{message}</Text> : null}
      </View>
      <View>
        <TouchableHighlight activeOpacity={0.3} underlayColor="transparent" onPress={onClose}>
          <Text>Close</Text>
        </TouchableHighlight>
      </View>
    </View>
  </TouchableHighlight>
);

DefaultNotificationBody.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  onPress: PropTypes.func,
  onClose: PropTypes.func,
};

DefaultNotificationBody.defaultProps = {
  title: 'Notification',
  message: 'This is a test notification',
  onPress: () => Alert.alert('Alert', 'onPress was pressed'),
  onClose: () => Alert.alert('Alert', 'onClose was pressed'),
};

export default DefaultNotificationBody;
