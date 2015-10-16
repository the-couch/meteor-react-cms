Meteor.methods({
  addMember(member) {
    check(member, {
      name: String,
      position: String,
      biography: String
    });
    if ( ! Meteor.userId() ) {
      throw new Meteor.Error("not-athorized");
    }

    Members.insert({
      name: member.name,
      position: member.position,
      biography: member.biography,
      createdAt: new Date()
    });
  },
  removeMember(memberId) {
    check(memberId, String);
    Members.remove(memberId);
  }
});
