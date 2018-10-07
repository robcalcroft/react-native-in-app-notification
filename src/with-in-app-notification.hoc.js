import React from 'react';

import hoistNonReactStatic from 'hoist-non-react-statics';

import Context from './context';

function withInAppNotification(WrappedComponent) {
  class Enhanced extends React.PureComponent {
    render() {
      return (
        <Context.Consumer>
          {showNotification => (
            <WrappedComponent
              {...this.props}
              showNotification={showNotification}
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
