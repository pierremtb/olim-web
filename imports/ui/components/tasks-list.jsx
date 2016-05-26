import React from 'react';
import { TasksGroup } from '../components/tasks-group.jsx';
import moment from 'moment';
import { TaskAdder } from './task-adder.jsx';

export function TasksList(props) {
  let tasks = props.tasks;
  if (props.routeParams.tagName) {
    tasks = tasks.filter(task => {
      const tag = props.tags.filter(t => t._id === task.tag)[0];
      return tag ? tag.name.toLowerCase() === props.routeParams.tagName : false;
    });
  }
  const lateTasks = tasks.filter(task =>
    moment(task.dueDate).startOf('day').isBefore(moment().startOf('day')) &&
    !task.done
  );
  const todayTasks = tasks.filter(task =>
    moment(task.dueDate).startOf('day').isSame(moment().startOf('day'))
  );
  const tomorrowTasks = tasks.filter(task =>
    moment(task.dueDate).startOf('day').isSame(moment().add('days', 1).startOf('day'))
  );
  const nextSevenDaysTasks = tasks.filter(task => {
    const taskDay = moment(task.dueDate).startOf('day');
    const tomorrow = moment().add('days', 1).startOf('day');
    const theDayInSevenDays = moment().add('days', 8).startOf('day');
    return taskDay.isAfter(tomorrow) && taskDay.isBefore(theDayInSevenDays);
  });
  const laterTasks = tasks.filter(task =>
    moment(task.dueDate).startOf('day').isAfter(moment().add('days', 8).startOf('day'))
  );

  return (
    <div>
      <TasksGroup
        tasks={lateTasks}
        groupName={'Late'}
        availableTags={props.tags}
      />
      <TasksGroup
        tasks={todayTasks}
        groupName={'Today'}
        availableTags={props.tags}
      />
      <TasksGroup
        tasks={tomorrowTasks}
        groupName={'Tomorrow'}
        availableTags={props.tags}
      />
      <TasksGroup
        tasks={nextSevenDaysTasks}
        groupName={'In the next 7 days'}
        availableTags={props.tags}
      />
      <TasksGroup
        tasks={laterTasks}
        groupName={'Later'}
        availableTags={props.tags}
      />
      <TaskAdder tasks={props.tasks} tags={props.tags} />
    </div>
  );
}

TasksList.propTypes = {
  tasks: React.PropTypes.array,
  tags: React.PropTypes.array,
  route: React.PropTypes.object,
  routes: React.PropTypes.array,
  routeParams: React.PropTypes.object,
};
