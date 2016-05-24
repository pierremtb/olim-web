import { Mongo } from 'meteor/mongo';
import { insertTaskSchema } from './schema';

export const Tasks = new Mongo.Collection('Tasks');

Tasks.schema = insertTaskSchema;

Tasks.attachSchema(Tasks.schema);
