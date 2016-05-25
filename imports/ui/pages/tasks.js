import React from 'react';
import ReactDOM from 'react-dom';
import TasksList from '../containers/tasks-list';
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
import { Matcher } from '../utils/helpers';

export class PageTasks extends React.Component {
  render() {
    return (
      <div className="container">
        <TasksList />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}
