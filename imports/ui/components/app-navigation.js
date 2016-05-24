import React from 'react';
import { AuthenticatedNavigation } from './authenticated-navigation';

export function AppNavigation(props) {
  function renderNavigation(isUser) {
    return isUser ? <AuthenticatedNavigation /> : null;
  }
  return <div> {renderNavigation(props.isUser)}</div>;
}

AppNavigation.propTypes = {
  isUser: React.PropTypes.object,
};
