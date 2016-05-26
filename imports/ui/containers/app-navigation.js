import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import { AppNavigation } from '../components/app-navigation';
import { Tags } from '../../api/tags/tags.js';
import { EmptyLoading } from '../components/empty-loading.jsx';

function composer(params, onReady) {
  const tagsSubscription = Meteor.subscribe('user-tags');
  if (tagsSubscription.ready()) {
    const tags = Tags.find().fetch();
    onReady(null, { tags, isUser: Meteor.user() });
  }
}

export default composeWithTracker(composer, EmptyLoading)(AppNavigation);
