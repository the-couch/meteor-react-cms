Meteor.methods({
  addMember(name) {
    check(name, String);
    if ( ! Meteor.userId() ) {
      throw new Meteor.Error("not-athorized");
    }

    Members.insert({
      name: name,
      createdAt: new Date()
    });
  },
  removeMember(memberId) {
    check(memberId, String);
    Members.remove(memberId);
  }
});
