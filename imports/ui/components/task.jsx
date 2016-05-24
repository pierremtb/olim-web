import React from 'react';
import { ListItem } from 'material-ui/List';
import { markTaskAsDone, markTaskAsNotDone, removeTask } from '../../api/tasks/methods';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import moment from 'moment';
import { grey600, transparent, white } from 'material-ui/styles/colors';
import { disabledTextStyle, avatarBackgroundColor } from '../utils/themes';

export class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hovered: false };
    this.markTaskDone = this.markTaskDone.bind(this);
    this.markTaskNotDone = this.markTaskNotDone.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
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
              <IconButton
                iconClassName="material-icons"
                tooltip="Mark as done"
                iconStyle={{ color: grey600 }}
                onTouchTap={this.markTaskDone}
              >
                done
              </IconButton>
            : null}
            {this.state.hovered || this.props.editing ?
              <IconButton
                iconClassName="material-icons"
                tooltip="Postpone"
                iconStyle={{ color: grey600 }}
                style={{
                  right: this.props.editing ? 0 : 48,
                  position: 'absolute',
                }}
              >
                schedule
              </IconButton>
            : null}
            {this.state.hovered || this.props.editing ?
              <IconButton
                iconClassName="material-icons"
                tooltip={!this.props.reminder ? 'Edit the reminder' : 'Add a reminder'}
                iconStyle={{ color: grey600 }}
                style={{
                  right: this.props.editing ? 48 : 96,
                  position: 'absolute',
                }}
              >
                {this.props.reminder ?
                  'alarm_on'
                : 'alarm_off'}
              </IconButton>
              : null}
            {this.state.hovered ?
              <IconButton
                iconClassName="material-icons"
                tooltip="Delete"
                iconStyle={{ color: grey600 }}
                style={{
                  right: 144,
                  position: 'absolute',
                }}
                onTouchTap={this.deleteTask}
              >
                delete
              </IconButton>
              : null}
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
          </div>
        }
      </ListItem>
    );
  }
}

Task.propTypes = {
  title: React.PropTypes.string,
  dueDate: React.PropTypes.instanceOf(Date),
  tag: React.PropTypes.string,
  done: React.PropTypes.bool,
  reminder: React.PropTypes.object,
  editing: React.PropTypes.bool,
  taskId: React.PropTypes.String,
};
