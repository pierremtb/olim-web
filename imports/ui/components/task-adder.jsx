import React from 'react';
import TextField from 'material-ui/TextField';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import SubHeader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import { insertTask } from '../../api/tasks/methods';
import { Task } from '../components/task.jsx';
import Divider from 'material-ui/Divider';
import { secondaryTextStyle, accentColor, disabledColor } from '../utils/themes';
import { Matcher, setDay, setTime } from '../utils/helpers';

export class TaskAdder extends React.Component {
  constructor(props) {
    super(props);

    this.originalState = {
      titleValue: '',
      isReminder: false,
      reminderValue: undefined,
      tagValue: null,
      dueDateValue: new Date(),
    };

    this.state = this.originalState;

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearNewTask = this.clearNewTask.bind(this);
    this.addThisTask = this.addThisTask.bind(this);
  }

  clearNewTask() {
    this.setState(this.originalState);
    this.refs.taskAdderInput.getInputNode().value = '';
  }

  addThisTask() {
    const task = {
      owner: Meteor.userId(),
      title: this.state.titleValue,
      createdAt: new Date,
      dueDate: this.state.dueDateValue,
      done: false,
    };
    if (this.state.isReminder) {
      task.reminder = this.state.reminder;
    }
    if (this.state.tagValue) {
      task.tag = this.state.tagValue;
    }
    insertTask.call(task, (err) => {
      if (!err) {
        this.clearNewTask();
      }
    });
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.addThisTask();
    }
  }

  handleChange(event) {
    let text = event.target.value;
    const newState = {};
    let { dueDateValue } = this.state;
    Matcher.modules.en_GB.map(module => {
      const matches = text.match(module.regex);
      if (matches) {
        console.log(matches);
        const result = module.getResult(matches);
        console.log(result);
        if (result && !isNaN(result.getTime())) {
          switch (module.type) {
            case 'time':
              dueDateValue = setTime(dueDateValue, result);
              break;
            case 'day':
              dueDateValue = setDay(dueDateValue, result);
              break;
            default: break;
          }
          text = text.replace(matches[0], '');
          newState.titleValue = text;
          newState.dueDateValue = dueDateValue;
          this.setState(newState);
        }
      }
      return module;
    });
    newState.titleValue = text;
    this.setState(newState);
  }


  render() {
    return (
      <div className="task-adder">
        <Paper zDepth={4} style={{ padding: 5}}>
          {this.state.titleValue !== '' ?
            <div>
              <Toolbar style={{ background: 'transparent' }}>
                <ToolbarGroup firstChild>
                  <SubHeader>New task</SubHeader>
                </ToolbarGroup>
                <ToolbarGroup lastChild>
                  <IconButton
                    iconClassName="material-icons"
                    iconStyle={secondaryTextStyle}
                    tooltip="Cancel"
                    onTouchTap={this.clearNewTask}
                  >
                    close
                  </IconButton>
                </ToolbarGroup>
              </Toolbar>
              <Task
                title={this.state.titleValue}
                dueDate={this.state.dueDateValue}
                reminder={this.state.reminderValue}
                disabled={false}
                availableTags={this.props.tags}
                tag={this.props.tags.filter(tag => tag._id === this.state.tagValue)[0]}
                onTagChange={tagId => this.setState({ tagValue: tagId })}
                onDateChange={dueDate => this.setState({ dueDateValue: dueDate })}
                onReminderChange={reminder => this.setState({ reminderValue: reminder })}
                editing
              />
              <Divider />
            </div>
            : null}
          <Toolbar style={{ background: 'white' }}>
            <ToolbarGroup>
              <TextField
                hintText="Add a new task..."
                ref="taskAdderInput"
                onKeyDown={this.handleKeyDown}
                onChange={this.handleChange}
              />
            </ToolbarGroup>
            <ToolbarGroup lastChild>
              <IconButton
                iconClassName="material-icons"
                disabled={this.state.titleValue === ''}
                style={{ marginTop: 2 }}
                iconStyle={{ color: this.state.titleValue ? accentColor : disabledColor }}
                onTouchTap={this.addThisTask}
              >
                send
              </IconButton>
            </ToolbarGroup>
          </Toolbar>
        </Paper>
      </div>
    );
  }
}

TaskAdder.propTypes = {
  tasks: React.PropTypes.array,
  tags: React.PropTypes.array,
};
