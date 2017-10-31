# react-native-in-app-notification [![npm version](https://badge.fury.io/js/react-native-in-app-notification.svg)](https://badge.fury.io/js/react-native-in-app-notification)

> :bell: Customisable in-app notification component for React Native

## Contents
1. [UI](#ui)
2. [Install](#install)
3. [Props](#props)
4. [Usage](#usage)
5. [Example](#example)

## UI
The basic look of `react-native-in-app-notification`:

![A GIF showing what react-native-in-app-notification can do](http://i.imgur.com/3PILcKg.gif)

What you can make `react-native-in-app-notification` do with a customised component:

![A GIF showing what react-native-in-app-notification can do](http://i.imgur.com/k0SBlrW.gif)

## Install
```bash
yarn add react-native-in-app-notification
```
OR
```bash
npm install react-native-in-app-notification --save
```

## Props
| Prop Name                 | Prop Description                                    | Data Type              | Required    | Default                     |
|---------------------------|-----------------------------------------------------|------------------------|-------------|-----------------------------|
| closeInterval             | How long the notification stays visible             | Number                 | No          | `4000`                      |
| openCloseDuration         | The length of the open / close animation            | Number                 | No          | `200`                       |
| height                    | The height of the Notification component            | Number                 | No          | `80`                        |
| backgroundColour          | The background colour of the Notification component | String                 | No          | `white`                     |
| iconApp                   | App Icon                                            | ImageSourcePropType    | No          | `null`                      |
| notificationBodyComponent | **See below about NotificationBody**                | React Node or Function | Recommended | `./DefaultNotificationBody` |

### NotificationBody
The notification body is what is rendered inside the main Notification component and gives you the ability to customise how the notification looks. You can use the default notification body component in `./DefaultNotificationBody.js` as inspiration and guidance.

Your `notificationBodyComponent` component is given four props:

| Prop Name | Prop Description                                              | Data Type           | Default |
|-----------|---------------------------------------------------------------|---------------------|---------|
| title     | The title passed to `NotificationRef.show`                    | String              | `''`    |
| message   | The message passed to `NotificationRef.show`                  | String              | `''`    |
| onPress   | The callback passed to `NotificationRef.show`                 | Function            | `null`  |
| icon      | Icon for notification passed to `NotificationRef.show`        | ImageSourcePropType | `null`  |
| vibrate   | Vibrate on show notification passed to `NotificationRef.show` | Boolean             | `true`  |

## Usage
Adding `react-native-in-app-notification` is simple; just import the component and add it to the bottom of your component tree. Then create a ref to the component using `ref={(ref) => { this.notification = ref; }}` as a prop.

When you want to show the notification, just call `.show` on the ref you made earlier. `.show` can take three arguments: `title`, `message` and `onPress` all of which are optional - but you should probably include at least one of `title` or `message`! `onPress` doesn't need to be used for passive notifications and you can use `onClose` in your `NotificationBody` component to allow your users to close the notification.

## Example
```javascript
import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import Notification from 'react-native-in-app-notification';

class MyApp extends Component {
  render() {
    return (
      <View>
        <Text>This is my app</Text>
        <TouchableHighlight
          onPress={this.notification && this.notification.show({
            title: 'You pressed it!',
            message: 'The notification has been triggered',
            onPress: () => Alert.alert('Alert', 'You clicked the notification!'),
          })}
        >
          <Text>Click me to trigger a notification</Text>
        </TouchableHighlight>
        <Notification ref={(ref) => { this.notification = ref; }} />
      </View>
    )
  }
}
```
