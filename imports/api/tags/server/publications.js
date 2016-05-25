import { Meteor } from 'meteor/meteor';
import { Tags } from '../tags';

Meteor.publish('user-tags', function publishUserTags() {
  return Tags.find({ owner: this.userId });
});
