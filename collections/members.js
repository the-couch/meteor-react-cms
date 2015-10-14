Members = new Meteor.Collection('members');
if(Meteor.isServer) {
  Members.remove({});
  Members.insert({
    name: "Bill",
    description: "The Guy is the guy"
  });
  Members.insert({
    name: "Brad",
    description: "The Guy is the guy"
  });
}
