import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Text, Image, Vibration } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

const styles = {
  root: {
    flex:1
  },  
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
  },
};

class DefaultNotificationBody extends React.Component {
  constructor() {
    super();

    this.onSwipe = this.onSwipe.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    //     if ((this.props.vibrate || nextProps.vibrate) && nextProps.isOpen && !this.props.isOpen) {
    //       Vibration.vibrate();
    //     }
  }

  onSwipe(direction) {
    const { onClose } = this.props;
    const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;

    if (direction === SWIPE_RIGHT || direction === SWIPE_LEFT) {
      onClose();
    }
  }

  render() {
    const {
      title,
      message,
      iconApp,
      icon,
      onPress,
      onClose,
      customComponent
    } = this.props;

    return (
      <View style={styles.root}>
        <GestureRecognizer onSwipe={this.onSwipe} style={styles.container}>
          <TouchableOpacity
            style={customComponent ? {flex:1} : styles.content}
            activeOpacity={0.3}
            underlayColor="transparent"
            onPress={() => {
              onClose();
              onPress();
            }}
          >
            {
              customComponent ?
                customComponent
              :
                <View>
                  <View style={styles.iconContainer}>
                    {(icon || iconApp) && <Image source={icon || iconApp} style={styles.icon} />}
                  </View>
                  <View style={styles.textContainer}>
                    <Text numberOfLines={1} style={styles.title}>{title}</Text>
                    <Text numberOfLines={1} style={styles.message}>{message}</Text>
                  </View>
                </View>
            }
          </TouchableOpacity>
        </GestureRecognizer>
      </View>
    );
  }
}

DefaultNotificationBody.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  vibrate: PropTypes.bool,
  isOpen: PropTypes.bool,
  onPress: PropTypes.func,
  onClose: PropTypes.func,
  customComponent: PropTypes.object,
  iconApp: Image.propTypes.source,
  icon: Image.propTypes.source,
};

DefaultNotificationBody.defaultProps = {
  title: 'Notification',
  message: 'This is a test notification',
  vibrate: true,
  isOpen: false,
  iconApp: null,
  icon: null,
  onPress: () => null,
  onClose: () => null,
};

export default DefaultNotificationBody;
