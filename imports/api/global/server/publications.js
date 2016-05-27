import { Meteor } from 'meteor/meteor';
import { Tags } from '../../tags/tags';
import { Tasks } from '../../tasks/tasks';

Meteor.publish('all-user-data-tasks-tags', function publishAllUserDataTasksTags() {
  return [
    Meteor.users.find({ _id: this.userId }),
    Tags.find({ owner: this.userId }),
    Tasks.find({ owner: this.userId }),
  ];
});
