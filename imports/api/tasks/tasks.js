import { Mongo } from 'meteor/mongo';
import { insertTaskSchema } from './schema';

export const Tasks = new Mongo.Collection('Tasks');

Tasks.schema = insertTaskSchema;

Tasks.attachSchema(Tasks.schema);

Tasks.allow({
  insert() { return true; },
  update(userId, doc, fields, modifier) {
    console.log(userId);
    console.log(doc);
    console.log(fields);
    console.log(modifier);
    return true;
  },
  remove() { return true; },
});
