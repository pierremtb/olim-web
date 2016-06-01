import { composeWithTracker } from 'react-komposer';
import { TasksList } from '../components/tasks-list.jsx';
import { Loading } from '../components/loading.jsx';
import { Tasks } from '../../api/tasks/tasks.js';
import { Tags } from '../../api/tags/tags.js';

function composer(params, onReady) {
  const tasksSubscription = Meteor.subscribe('user-tasks');
  const tagsSubscription = Meteor.subscribe('user-tags');
  if (tasksSubscription.ready() && tagsSubscription.ready()) {
    const tasks = Tasks.find().fetch();
    const tags = Tags.find().fetch();
    tasks.sort((task1, task2) => task1.dueDate - task2.dueDate);
    onReady(null, { tasks, tags });
  }
}

export default composeWithTracker(composer, Loading)(TasksList);
