import React from 'react';
import TextField from 'material-ui/TextField';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import SubHeader from 'material-ui/Subheader';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import { insertTask } from '../../api/tasks/methods';
import { Task } from '../components/task.jsx';
import Divider from 'material-ui/Divider';
import { secondaryTextStyle, accentColor, disabledColor } from '../utils/themes';
import moment from 'moment';
import { Matcher, setDay, setTime } from '../utils/helpers';

export class TaskAdder extends React.Component {
  constructor(props) {
    super(props);

    this.originalState = {
      titleValue: '',
      isReminder: false,
      reminderTimeValue: 0,
      isTag: false,
      tagValue: '',
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
      task.reminder = { time: this.state.reminderTimeValue };
    }
    if (this.state.isTag) {
      task.tag = { time: this.state.tagValue };
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
    /*
    const todayOrTomorrowOrAfterTomorrow = text.match(Matcher.todayOrTomorrowOrAfterTomorrow);
    if (todayOrTomorrowOrAfterTomorrow) {
      const cond = todayOrTomorrowOrAfterTomorrow[1] || todayOrTomorrowOrAfterTomorrow[2];
      switch (cond) {
        case 'today':
          newState.dueDateValue = moment().startOf('day').toDate();
          text = text.replace(new RegExp(todayOrTomorrowOrAfterTomorrow[0], 'i'), '');
          break;
        case 'tomorrow':
          newState.dueDateValue = moment().add('days', 1).startOf('day').toDate();
          text = text.replace(todayOrTomorrowOrAfterTomorrow[0], '');
          break;
        case 'the day after tomorrow':
          newState.dueDateValue = moment().add('days', 2).startOf('day').toDate();
          text = text.replace(todayOrTomorrowOrAfterTomorrow[0], '');
          break;
        default: break;
      }
    }*/
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
                reminderTime={this.state.reminderTimeValue}
                disabled={false}
                onDateChange={(dueDate) => this.setState({ dueDateValue: dueDate })}
                onReminderChange={(time) => this.setState({ reminderTimeValue: time })}
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
