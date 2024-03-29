import React from 'react';
import TasksList from '../containers/tasks-list';

export function PageTasks(props) {
  return (
    <div className="container">
      <TasksList route={props.route} routes={props.routes}  routeParams={props.routeParams} />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

PageTasks.propTypes = {
  route: React.PropTypes.object,
  routes: React.PropTypes.array,
  routeParams: React.PropTypes.object,
};
