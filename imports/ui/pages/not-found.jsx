import React from 'react';

export const NotFound = () => (
  <div bsStyle="danger">
    <p><strong>Error [404]</strong>: { window.location.pathname } does not exist.</p>
  </div>
);
