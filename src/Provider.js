import React, { Children } from 'react';
import PropTypes from 'prop-types';

import Context from './Context';
import Notification from './Notification';

class Provider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.showNotification = this.showNotification.bind(this);
  }

  showNotification(notificationOptions) {
    if (this.notification) {
      this.notification.show(notificationOptions);
    }
  }

  closeNotification() {
    if (this.notification) {
      this.notification.closeNotification();
    }
  }

  render() {
    return (
      <Context.Provider
        value={{
          showNotification: this.showNotification,
          closeNotification: this.closeNotification,
        }}
      >
        {Children.only(this.props.children)}
        <Notification
          ref={ref => {
            this.notification = ref;
          }}
          {...this.props}
        />
      </Context.Provider>
    );
  }
}

Provider.propTypes = {
  ...Notification.propTypes,
  children: PropTypes.element.isRequired,
};

export default Provider;
