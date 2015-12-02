Meteor.publish('posts', function(selector) {
  return Posts.find(selector);
});

Meteor.publish('singlePost', function(_id) {
  return Posts.find({_id: _id});
});

Meteor.publish('members', function() {
  return Members.find();
});

Meteor.publish('services', function() {
  return Services.find();
});

Meteor.publish('processes', function() {
  return Processes.find();
});

Meteor.publish('pages', function() {
  return Pages.find();
});

Meteor.publish('press', function() {
  return Press.find();
});

Meteor.publish('notifications', function() {
  Counts.publish(this, 'services-counter', Services.find({}));
  Counts.publish(this, 'processes-counter', Processes.find({}));
  Counts.publish(this, 'members-counter', Members.find({}));
});
