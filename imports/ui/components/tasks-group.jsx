import React from 'react';
import { List } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import IconMenu from 'material-ui/IconMenu';
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import SubHeader from 'material-ui/Subheader';
import { Task } from './task.jsx';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import { secondaryTextStyle } from '../utils/themes';
import moment from 'moment';
import { markTaskAsDone, updateTask } from '../../api/tasks/methods';
import { setTime, setDay } from '../utils/helpers';

export class TasksGroup extends React.Component {
  constructor(props) {
    super(props);
    this.markAllAsDone = this.markAllAsDone.bind(this);
    this.postponeAllTo = this.postponeAllTo.bind(this);
  }

  markAllAsDone() {
    this.props.tasks.map(task => {
      markTaskAsDone.call({ _id: task._id });
      return task;
    });
  }

  postponeAllTo(newDate, setDate) {
    this.props.tasks.map(task => {
      const dueDate = setDate(task.dueDate, newDate(task.dueDate));
      updateTask.call(
        { _id: task._id, update: { dueDate } },
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
      return task;
    });
  }

  setTag(_id, tag) {
    updateTask.call({ _id, update: { tag } });
  }

  render() {
    if (this.props.tasks.length === 0 || !this.props.tasks) {
      return <div></div>;
    }

    return (
      <div style={{ paddingTop: 20 }}>
        <Toolbar style={{ background: 'transparent' }}>
          <ToolbarGroup firstChild>
            <SubHeader>{this.props.groupName}</SubHeader>
          </ToolbarGroup>
          <ToolbarGroup lastChild>
            <IconMenu
              iconButtonElement={
                <IconButton
                  iconClassName="material-icons"
                  iconStyle={secondaryTextStyle}
                  tooltip="Postpone all"
                >
                  timelapse
                </IconButton>
              }
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              targetOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            >
              <MenuItem
                primaryText="Postpone all to the next hour"
                onTouchTap={() =>
                this.postponeAllTo((date) => moment(date).add(1, 'h').toDate(), setTime)
              }
              />
              <MenuItem
                primaryText="Postpone all all to the next day"
                onTouchTap={() =>
                this.postponeAllTo((date) => moment(date).add(1, 'd').toDate(), setDay)
              }
              />
              <Divider />
              <MenuItem
                primaryText="Postpone all to a specific day"
                onTouchTap={() => this.refs.newDayPicker.show()}
              />
              <MenuItem
                primaryText="Postpone all to a specific time"
                onTouchTap={() => this.refs.newTimePicker.show()}
              />
            </IconMenu>
            <IconButton
              iconClassName="material-icons"
              iconStyle={secondaryTextStyle}
              tooltip="Mark all as done"
              onTouchTap={this.markAllAsDone}
            >
              done_all
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
        <Paper>
          <List>
            {this.props.tasks.map(task =>
              <Task
                title={task.title}
                dueDate={task.dueDate}
                tag={this.props.availableTags.filter(tag => tag._id === task.tag)[0]}
                onTagChange={tagId => this.setTag(task._id, tagId)}
                availableTags={this.props.availableTags}
                done={task.done}
                taskId={task._id}
                reminder={task.reminder}
              />
            )}
          </List>
        </Paper>
        <DatePickerDialog
          autoOk
          open={false}
          initialDate={moment().toDate()}
          container="dialog"
          ref="newDayPicker"
          onAccept={date => this.postponeAllTo(() => date, setDay)}
        />
        <TimePickerDialog
          autoOk
          open={false}
          initialTime={moment().toDate()}
          container="dialog"
          format="ampm"
          ref="newTimePicker"
          onAccept={date => this.postponeAllTo(() => date, setTime)}
        />
      </div>
    );
  }
}

TasksGroup.propTypes = {
  tasks: React.PropTypes.array,
  groupName: React.PropTypes.string,
  availableTags: React.PropTypes.array,
};
