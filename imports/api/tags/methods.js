import { Tags } from './tags';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { insertTagSchema } from './schema';

export const insertTag = new ValidatedMethod({
  name: 'tags.insert',
  validate: insertTagSchema.validator(),
  run(tag) {
    Tags.insert(tag);
  },
});

export const updateTag = new ValidatedMethod({
  name: 'tags.update',
  validate: new SimpleSchema({
    _id: { type: String },
    'update.title': { type: String, optional: true },
  }).validator(),
  run({ _id, update }) {
    Tags.update(_id, { $set: update });
  },
});

export const removeTag = new ValidatedMethod({
  name: 'tags.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Tags.remove(_id);
  },
});
