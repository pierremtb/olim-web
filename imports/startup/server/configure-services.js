const google = Meteor.settings.private.oAuth.google;

ServiceConfiguration.configurations.upsert(
  { service: 'google' },
  { $set: google }
);
