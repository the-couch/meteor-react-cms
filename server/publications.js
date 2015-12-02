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

Meteor.publish('press', function() {
  return Press.find();
});
