import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const insertTaskSchema = new SimpleSchema({
  owner: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  title: {
    type: String,
  },
  createdAt: {
    type: Number,
  },
  done: {
    type: Boolean,
  },
  dueDate: {
    type: Number,
  },
  tag: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
  },
  reminder: {
    type: Object,
    optional: true,
  },
  'reminder.time': {
    type: Number,
  },
});
