import React from 'react';
import { ListItem } from 'material-ui/List';
import { markTaskAsDone, markTaskAsNotDone, removeTask } from '../../api/tasks/methods';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import moment from 'moment';
import { grey600, transparent, white } from 'material-ui/styles/colors';
import { disabledTextStyle, avatarBackgroundColor } from '../utils/themes';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog';
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';

export class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
      dueDate: this.props.dueDate,
    };
    this.markTaskDone = this.markTaskDone.bind(this);
    this.markTaskNotDone = this.markTaskNotDone.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.setDay = this.setDay.bind(this);
    this.setTime = this.setTime.bind(this);
    this.setReminder = this.setReminder.bind(this);
    this.getReminderTime = this.getReminderTime.bind(this);
  }

  getReminderTime() {
    const time = this.props.reminderTime;
    if (time) {
      return moment()
        .startOf('day')
        .hours(Math.floor(time / 60))
        .minutes(time % 60)
        .toDate();
    }
    return moment()
      .startOf('day')
      .minutes(10)
      .toDate();
  }

  setDay(day) {
    const newDate = moment(day);
    this.props.onDateChange(
      moment(this.props.dueDate)
        .date(newDate.date())
        .month(newDate.month())
        .year(newDate.year())
        .toDate()
    );
  }

  setTime(time) {
    const newDate = moment(time);
    this.props.onDateChange(
      moment(this.props.dueDate)
        .hours(newDate.hours())
        .minutes(newDate.minutes())
        .toDate()
    );
  }

  setReminder(time) {
    const newTime = moment(time);
    this.props.onReminderChange(newTime.hours() * 60 + newTime.minutes());
  }

  markTaskDone() {
    const { taskId } = this.props;
    markTaskAsDone.call({ _id: taskId });
  }

  markTaskNotDone() {
    const { taskId } = this.props;
    markTaskAsNotDone.call({ _id: taskId });
  }

  deleteTask() {
    const { taskId } = this.props;
    removeTask.call({ _id: taskId });
  }

  render() {
    return (
      <ListItem
        onMouseEnter={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}
        leftAvatar={
          <Avatar
            backgroundColor={!this.props.done ? avatarBackgroundColor : transparent}
            color={!this.props.done ? white : avatarBackgroundColor}
            icon={!this.props.tag ?
              <FontIcon className="material-icons">label_outline</FontIcon>
            : null}
          >
            {this.props.tag ? this.props.tag.charAt(0).toUpperCase() : null}
          </Avatar>
        }
        disabled={this.props.done}
        primaryText={
          <div style={!this.props.done ? {} : disabledTextStyle}>
            {this.props.title}
          </div>
        }
        secondaryText={moment(this.props.dueDate).format('LLL')}
      >
        {!this.props.done ?
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 12,
            }}
          >
            {!this.props.editing ?
              <div>
                <IconButton
                  iconClassName="material-icons"
                  tooltip="Mark as done"
                  iconStyle={{ color: grey600 }}
                  onTouchTap={this.markTaskDone}
                >
                  done
                </IconButton>
                {this.state.hovered ?
                  <div
                    style={{
                      position: 'absolute',
                      right: 48,
                      top: 0,
                    }}
                  >
                    <IconButton
                      iconClassName="material-icons"
                      tooltip="Postpone"
                      iconStyle={{ color: grey600 }}
                      style={{
                        right: 0,
                        position: 'absolute',
                      }}
                    >
                      timelapse
                    </IconButton>
                    <IconButton
                      iconClassName="material-icons"
                      tooltip={!this.props.reminder ? 'Edit the reminder' : 'Add a reminder'}
                      iconStyle={{ color: grey600 }}
                      style={{
                        right: 48,
                        position: 'absolute',
                      }}
                    >
                      {this.props.reminder ?
                        'alarm_on'
                      : 'alarm_off'}
                    </IconButton>
                    <IconButton
                      iconClassName="material-icons"
                      tooltip="Delete"
                      iconStyle={{ color: grey600 }}
                      style={{
                        right: 96,
                        position: 'absolute',
                      }}
                      onTouchTap={this.deleteTask}
                    >
                      delete
                    </IconButton>
                  </div>
                : null}
              </div>
            :
              <div>
                <IconButton
                  iconClassName="material-icons"
                  tooltip="Set the day"
                  iconStyle={{ color: grey600 }}
                  style={{
                    right: 0,
                    position: 'absolute',
                  }}
                  onTouchTap={() => this.refs.newDayPicker.show()}
                >
                  event
                </IconButton>
                <IconButton
                  iconClassName="material-icons"
                  tooltip="Set the time"
                  iconStyle={{ color: grey600 }}
                  style={{
                    right: 48,
                    position: 'absolute',
                  }}
                  onTouchTap={() => this.refs.newTimePicker.show()}
                >
                  schedule
                </IconButton>
                <IconButton
                  iconClassName="material-icons"
                  tooltip={this.state.reminder ? 'Edit the reminder' : 'Set a reminder'}
                  iconStyle={{ color: grey600 }}
                  style={{
                    right: 96,
                    position: 'absolute',
                  }}
                  onTouchTap={() => this.refs.newReminderPicker.show()}
                >
                  {this.state.reminder ? 'alarm_on' : 'alarm_add'}
                </IconButton>
              </div>
            }
          </div>
        :
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 12,
            }}
          >
            <IconButton
              iconClassName="material-icons"
              tooltip="Mark as todo"
              iconStyle={{ color: grey600 }}
              onTouchTap={this.markTaskNotDone}
            >
              undo
            </IconButton>
            <IconButton
              iconClassName="material-icons"
              tooltip="Delete"
              iconStyle={{ color: grey600 }}
              style={{
                right: 48,
                position: 'absolute',
              }}
              onTouchTap={this.deleteTask}
            >
              delete
            </IconButton>
          </div>
        }
        <DatePickerDialog
          autoOk
          open={false}
          initialDate={this.props.dueDate}
          container="dialog"
          ref="newDayPicker"
          onAccept={this.setDay}
        />
        <TimePickerDialog
          autoOk
          open={false}
          initialTime={this.props.dueDate}
          container="dialog"
          format="ampm"
          ref="newTimePicker"
          onAccept={this.setTime}
        />
        <TimePickerDialog
          autoOk
          open={false}
          initialTime={this.getReminderTime()}
          container="dialog"
          format="24hr"
          ref="newReminderPicker"
          onAccept={this.setReminder}
        />
      </ListItem>
    );
  }
}

Task.propTypes = {
  title: React.PropTypes.string,
  dueDate: React.PropTypes.instanceOf(Date),
  tag: React.PropTypes.string,
  done: React.PropTypes.bool,
  reminderTime: React.PropTypes.number,
  editing: React.PropTypes.bool,
  taskId: React.PropTypes.String,
  onDateChange: React.PropTypes.func,
  onReminderChange: React.PropTypes.func,
};
