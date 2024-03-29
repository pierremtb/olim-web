import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const insertTagSchema = new SimpleSchema({
  owner: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  createdAt: {
    type: Number,
  },
  name: {
    type: String,
    regEx: /^[a-zA-Z0-9_-]{1,20}$/,
  },
  comments: {
    type: String,
    optional: true,
  },
  color: {
    type: String,
    optional: true,
  },
  icon: {
    type: String,
    optional: true,
  },
});
