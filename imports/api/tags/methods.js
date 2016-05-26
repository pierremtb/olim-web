import { Tags } from './tags';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { insertTagSchema } from './schema';
import { DefaultTags } from '../../ui/utils/helpers';

export const insertTag = new ValidatedMethod({
  name: 'tags.insert',
  validate: insertTagSchema.validator(),
  run(tag) {
    if (Tags.findOne({ owner: tag.owner, name: tag.name })) {
      throw new Meteor.Error('This tag name already exists');
    }
    Tags.insert(tag);
  },
});

export const updateTag = new ValidatedMethod({
  name: 'tags.update',
  validate: new SimpleSchema({
    _id: { type: String },
    'update.name': { type: String, optional: true },
    'update.icon': { type: String, optional: true },
    'update.color': { type: String, optional: true },
    'update.comments': { type: String, optional: true },
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

export const insertDefaultTags = new ValidatedMethod({
  name: 'tags.insertdefaults',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    DefaultTags.en_GB.map(tag => {
      const newTag = tag;
      newTag.owner = _id;
      newTag.createdAt = new Date();
      Tags.insert(newTag);
      return tag;
    });
  },
});
