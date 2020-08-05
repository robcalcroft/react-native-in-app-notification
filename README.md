# react-native-in-app-notification [![npm version](https://badge.fury.io/js/react-native-in-app-notification.svg)](https://badge.fury.io/js/react-native-in-app-notification)

> :bell: Customisable in-app notification component for React Native

## Contents

1. [UI](#ui)
2. [Install](#install)
3. [Versions](#versions)
4. [Props](#props)
5. [Usage](#usage)

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

### Android

For Android you need to add the `VIBRATE` permission to your app `AndroidManifest.xml`
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="your.app.package.name">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>

    <!-- Required by react-native-in-app-notification -->
    <uses-permission android:name="android.permission.VIBRATE" />

    ...
</manifest>
```

## Versions

| version | RN        |
| ------- | :-------- |
| >=3.0.0 | >= 0.54.0 |
| <3.0.0  | >= 0.43.4 |

## Props

| Prop Name                 | Prop Description                                    | Data Type              | Required    | Default                     |
| ------------------------- | --------------------------------------------------- | ---------------------- | ----------- | --------------------------- |
| closeInterval             | How long the notification stays visible             | Number                 | No          | `4000`                      |
| openCloseDuration         | The length of the open / close animation            | Number                 | No          | `200`                       |
| height                    | The height of the Notification component            | Number                 | No          | `80`                        |
| backgroundColour          | The background colour of the Notification component | String                 | No          | `white`                     |
| iconApp                   | App Icon                                            | ImageSourcePropType    | No          | `null`                      |
| notificationBodyComponent | **See below about NotificationBody**                | React Node or Function | Recommended | `./DefaultNotificationBody` |

### NotificationBody

The notification body is what is rendered inside the main Notification component and gives you the ability to customise how the notification looks. You can use the default notification body component in `./DefaultNotificationBody.js` as inspiration and guidance.

Your `notificationBodyComponent` component is given five props:

| Prop Name         | Prop Description                                              | Data Type           | Default |
| ----------------- | ------------------------------------------------------------- | ------------------- | ------- |
| title             | The title passed to `NotificationRef.show`                    | String              | `''`    |
| message           | The message passed to `NotificationRef.show`                  | String              | `''`    |
| onPress           | The callback passed to `NotificationRef.show`                 | Function            | `null`  |
| icon              | Icon for notification passed to `NotificationRef.show`        | ImageSourcePropType | `null`  |
| vibrate           | Vibrate on show notification passed to `NotificationRef.show` | Boolean             | `true`  |
| additionalProps   | Any additional props passed to `NotificationBodyComponent`    | Object              | `null`  |

## Usage

Adding `react-native-in-app-notification` is simple;
Just wrap you main `App` component with the `InAppNotificationProvider` component exported from this module.

```javascript
import { InAppNotificationProvider } from 'react-native-in-app-notification';

import App from './App.js';

class AppWithNotifications extends Component {
  render() {
    return (
      <InAppNotificationProvider>
        <App />
      </InAppNotificationProvider>
    );
  }
}
```

When you want to show the notification, just wrap the component which needs to display a notification with the `withInAppNotification` HOC and call the `.showNotification` methods from its props.

`.showNotification` can take four arguments (all of which are optional):

- `title`
- `message`
- `onPress`
- `additionalProps`

**N.B:** you should probably include at least one of `title` or `message`!

`onPress` doesn't need to be used for passive notifications and you can use `onClose` in your `NotificationBody` component to allow your users to close the notification.

`additionalProps` can be used to pass arbitory props to `NotificationBody` component. Can be accessed in `NotificationBody` component via `props.additionalProps`.

```javascript
import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { withInAppNotification } from 'react-native-in-app-notification';

class MyApp extends Component {
  render() {
    return (
      <View>
        <Text>This is my app</Text>
        <TouchableHighlight
          onPress={() => {
            this.props.showNotification({
              title: 'You pressed it!',
              message: 'The notification has been triggered',
              onPress: () => Alert.alert('Alert', 'You clicked the notification!'),
              additionalProps: { type: 'error' },
            });
          }}
        >
          <Text>Click me to trigger a notification</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default withInAppNotification(MyApp);
```
