import { markTaskAsDone, updateTask } from '../../tasks/methods';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

Meteor.methods({
  markThisTaskAsDone(_id) {
    check(_id, String);
    markTaskAsDone.call({ _id });
  },
  updateTask(_id, update) {
    check(_id, String);
    check(update, Object);
    updateTask.call({ _id, update });
  },
});
