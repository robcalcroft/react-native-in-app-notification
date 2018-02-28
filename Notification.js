import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, StyleSheet, Image } from 'react-native';
import DefaultNotificationBody from './DefaultNotificationBody';

const styles = StyleSheet.create({
  notification: {
    position: 'absolute',
    width: '100%',
  },
});

class Notification extends Component {
  constructor() {
    super();

    this.show = this.show.bind(this);
    this.showNotification = this.showNotification.bind(this);
    this.closeNotification = this.closeNotification.bind(this);

    this.state = {
      animatedValue: new Animated.Value(0),
      isOpen: false,
    };
  }

  show({ title, message, onPress,customComponent, icon, vibrate } = { title: '', message: '', onPress: null,customComponent:null, icon: null, vibrate: true }) {
    const { closeInterval } = this.props;
    const { isOpen } = this.state;

    // Clear any currently showing notification timeouts so the new one doesn't get prematurely
    // closed
    clearTimeout(this.currentNotificationInterval);

    const showNotificationWithStateChanges = () => {
      this.setState({
        isOpen: true,
        title,
        message,
        customComponent,
        onPress,
        icon,
        vibrate,
      }, () => this.showNotification(() => {
        this.currentNotificationInterval = setTimeout(() => {
          this.setState({
            isOpen: false,
            title: '',
            customComponent:null,
            message: '',
            onPress: null,
            icon: null,
            vibrate: true,
          }, this.closeNotification);
        }, closeInterval);
      }));
    };

    if (isOpen) {
      this.setState(
        { isOpen: false },
        () => this.closeNotification(showNotificationWithStateChanges),
      );
    } else {
      showNotificationWithStateChanges();
    }
  }

  showNotification(done = () => {}) {
    Animated.timing(this.state.animatedValue, {
      toValue: 1,
      duration: this.props.openCloseDuration,
    }).start(done);
  }

  closeNotification(done = () => {}) {
    Animated.timing(this.state.animatedValue, {
      toValue: 0,
      duration: this.props.openCloseDuration,
    }).start(done);
  }

  render() {
    const {
      height,
      topOffset = 0,
      backgroundColour,
      iconApp,
      notificationBodyComponent: NotificationBody,
    } = this.props;

    const {
      animatedValue,
      title,
      message,
      onPress,
      isOpen,
      icon,
      vibrate,
      customComponent,
    } = this.state;

    return (
      <Animated.View
        style={[
          styles.notification,
          { height, backgroundColor: backgroundColour },
          {
            transform: [{
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [-height + topOffset, 0],
              }),
            }],
          },
        ]}
      >
        <NotificationBody
          title={title}
          message={message}
          onPress={onPress}
          isOpen={isOpen}
          iconApp={iconApp}
          icon={icon}
          vibrate={vibrate}
          customComponent={customComponent}
          onClose={() => this.setState({ isOpen: false }, this.closeNotification)}
        />
      </Animated.View>
    );
  }
}

Notification.propTypes = {
  closeInterval: PropTypes.number,
  openCloseDuration: PropTypes.number,
  height: PropTypes.number,
  backgroundColour: PropTypes.string,
  notificationBodyComponent: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),
  iconApp: Image.propTypes.source,
};

Notification.defaultProps = {
  closeInterval: 4000,
  openCloseDuration: 200,
  height: 80,
  backgroundColour: 'white',
  notificationBodyComponent: DefaultNotificationBody,
  iconApp: null,
};

export default Notification;
