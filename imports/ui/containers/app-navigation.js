import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import { AppNavigation } from '../components/app-navigation';

function composer(props, onData){
  onData(null, { isUser: Meteor.user() });
}

export default composeWithTracker(composer)(AppNavigation);
