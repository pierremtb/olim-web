import { Meteor } from 'meteor/meteor';
import { Tags } from '../tags';

Meteor.publish('user-tags', function publishUserTags() {
  console.log(Tags.find({ owner: this.userId }).fetch());
  return Tags.find({ owner: this.userId });
});
