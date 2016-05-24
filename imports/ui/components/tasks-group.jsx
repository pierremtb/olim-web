import React from 'react';
import { List } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import SubHeader from 'material-ui/Subheader';
import { Task } from './task';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import { secondaryTextStyle } from '../utils/themes';

export function TasksGroup(props) {
  if (props.tasks.length === 0 || !props.tasks) {
    return <div></div>;
  }
  return (
    <div style={{ paddingTop: 20 }}>
      <Toolbar style={{ background: 'transparent' }}>
        <ToolbarGroup firstChild>
          <SubHeader>{props.groupName}</SubHeader>
        </ToolbarGroup>
        <ToolbarGroup lastChild>
          <IconButton
            iconClassName="material-icons"
            iconStyle={secondaryTextStyle}
            tooltip="Postpone all"
          >
            schedule
          </IconButton>
          <IconButton
            iconClassName="material-icons"
            iconStyle={secondaryTextStyle}
            tooltip="Mark all as done"
          >
            done_all
          </IconButton>
        </ToolbarGroup>
      </Toolbar>
      <Paper>
        <List>
        {props.tasks.map(task =>
          <Task
            title={task.title}
            dueDate={task.dueDate}
            tag={task.tag}
            done={task.done}
            taskId={task._id}
          />
        )}
        </List>
      </Paper>
    </div>
  );
}

TasksGroup.propTypes = {
  tasks: React.PropTypes.array,
  groupName: React.PropTypes.string,
};
