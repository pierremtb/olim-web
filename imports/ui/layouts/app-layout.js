import React from 'react';
import AppNavigation from '../containers/app-navigation.js';

export function AppLayout({ children }) {
  return (
    <div>
      <AppNavigation />
      <div className="main-page">
        {children}
      </div>
    </div>
  );
}
AppLayout.propTypes = {
  children: React.PropTypes.element,
};
