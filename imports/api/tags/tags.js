import { Mongo } from 'meteor/mongo';
import { insertTagSchema } from './schema';

export const Tags = new Mongo.Collection('Tags');

Tags.schema = insertTagSchema;

Tags.attachSchema(Tags.schema);
