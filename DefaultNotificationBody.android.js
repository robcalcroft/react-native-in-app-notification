import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

export default class DefaultNotificationBody extends React.Component {

  static propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    isOpen: PropTypes.bool,
    onPress: PropTypes.func,
    onClose: PropTypes.func,
    iconApp: Image.propTypes.source,
    icon: Image.propTypes.source,
  };

  static defaultProps = {
    title: 'Notification',
    message: 'This is a test notification',
    isOpen: false,
    iconApp: null,
    icon: null,
    onPress: () => null,
    onClose: () => null,
  };

  render() {
    const {
      title,
      message,
      iconApp,
      icon,
      onPress,
      onClose,
    } = this.props;

    return(
      <GestureRecognizer onSwipe={this._onSwipe.bind(this)} style={styles.container}>
        <TouchableOpacity
          style={styles.content}
          activeOpacity={0.3}
          underlayColor="transparent"
          onPress={() => {
            onClose();
            onPress();
          }}
        >
          <View style={styles.iconContainer}>
            {(icon || iconApp) && <Image source={icon || iconApp} style={styles.icon} />}
          </View>
          <View style={styles.textContainer}>
            <Text numberOfLines={1} style={styles.title}>{title}</Text>
            <Text numberOfLines={1} style={styles.message}>{message}</Text>
          </View>
        </TouchableOpacity>
      </GestureRecognizer>
    );
  }

  private
  _onSwipe(direction) {
    const {onClose} = this.props;
    const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;

    if (direction === SWIPE_RIGHT || direction === SWIPE_LEFT) {
      onClose();
    }
  }
}

const styles = {
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  iconContainer: {
    width: 60,
    height: 70,
    marginTop: 5,
    marginLeft: 10,
  },
  icon: {
    resizeMode: 'contain',
    width: 60,
    height: 70,
  },
  textContainer: {
    alignSelf: 'center',
    marginLeft: 20,
  },
  title: {
    color: '#000',
    fontWeight: 'bold',
  },
  message: {
    color: '#000',
    marginTop: 5,
  }
};
