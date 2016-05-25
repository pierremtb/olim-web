import React from 'react';
import { TasksGroup } from '../components/tasks-group.jsx';
import moment from 'moment';
import { TaskAdder } from './task-adder.jsx';

export function TasksList(props) {
  const todayTasks = props.tasks.filter(task =>
    moment(task.dueDate).startOf('day').isSame(moment().startOf('day'))
  );
  const tomorrowTasks = props.tasks.filter(task =>
    moment(task.dueDate).startOf('day').isSame(moment().add('days', 1).startOf('day'))
  );
  const nextSevenDaysTasks = props.tasks.filter(task => {
    const taskDay = moment(task.dueDate).startOf('day');
    const tomorrow = moment().add('days', 1).startOf('day');
    const theDayInSevenDays = moment().add('days', 8).startOf('day');
    return taskDay.isAfter(tomorrow) && taskDay.isBefore(theDayInSevenDays);
  });
  const laterTasks = props.tasks.filter(task =>
    moment(task.dueDate).startOf('day').isAfter(moment().add('days', 8).startOf('day'))
  );

  return (
    <div>
      <TasksGroup
        tasks={todayTasks}
        groupName={'Today'}
      />
      <TasksGroup
        tasks={tomorrowTasks}
        groupName={'Tomorrow'}
      />
      <TasksGroup
        tasks={nextSevenDaysTasks}
        groupName={'In the next 7 days'}
      />
      <TasksGroup
        tasks={laterTasks}
        groupName={'Later'}
      />
      <TaskAdder tasks={props.tasks} tags={props.tags} />
    </div>
  );
}

TasksList.propTypes = {
  tasks: React.PropTypes.array,
  tags: React.PropTypes.array,
};