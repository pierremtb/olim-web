import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const insertTagSchema = new SimpleSchema({
  owner: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  createdAt: {
    type: Date,
  },
  name: {
    type: String,
    regEx: /^[a-zA-Z0-9_-]{2,20}$/,
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
