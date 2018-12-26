import React from 'react';

import hoistNonReactStatic from 'hoist-non-react-statics';

import Context from './Context';

function withInAppNotification(WrappedComponent) {
  class Enhanced extends React.PureComponent {
    render() {
      return (
        <Context.Consumer>
          {({ showNotification, closeNotification }) => (
            <WrappedComponent
              {...this.props}
              showNotification={showNotification}
              closeNotification={closeNotification}
            />
          )}
        </Context.Consumer>
      );
    }
  }

  // Pass over static props
  hoistNonReactStatic(Enhanced, WrappedComponent);

  return Enhanced;
}

export default withInAppNotification;
