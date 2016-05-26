import { Tasks } from './tasks';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { insertTaskSchema } from './schema';

export const insertTask = new ValidatedMethod({
  name: 'tasks.insert',
  validate: insertTaskSchema.validator(),
  run(task) {
    Tasks.insert(task);
  },
});

export const markTaskAsDone = new ValidatedMethod({
  name: 'tasks.markasdone',
  validate: new SimpleSchema({ _id: { type: String } }).validator(),
  run({ _id }) {
    Tasks.update(_id, { $set: { done: true } });
  },
});

export const markTaskAsNotDone = new ValidatedMethod({
  name: 'tasks.markasnotdone',
  validate: new SimpleSchema({ _id: { type: String } }).validator(),
  run({ _id }) {
    Tasks.update(_id, { $set: { done: false } });
  },
});

export const updateTask = new ValidatedMethod({
  name: 'tasks.update',
  validate: new SimpleSchema({
    _id: { type: String },
    update: { type: Object },
    'update.dueDate': { type: Date, optional: true },
    'update.tag': { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
    'update.reminder': { type: Object, optional: true },
    'update.reminder.time': { type: Number, optional: true },
  }).validator(),
  run({ _id, update }) {
    Tasks.update(_id, { $set: update });
  },
});

export const removeTask = new ValidatedMethod({
  name: 'tasks.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Tasks.remove(_id);
  },
});
