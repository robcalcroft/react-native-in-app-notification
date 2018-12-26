import React from 'react';

const context = React.createContext({
  showNotification: () => {},
  closeNotification: () => {},
});

export default context;
