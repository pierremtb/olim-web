import { Meteor } from 'meteor/meteor';
import { Tasks } from '../tasks';

Meteor.publish('user-tasks', function publishUserTasks() {
  return Tasks.find({ owner: this.userId });
});
