Meteor.methods({
  addMember(member) {
    check(member, {
      name: String,
      position: String,
      photo: String,
      biography: String
    });
    if ( ! Meteor.userId() ) {
      throw new Meteor.Error("not-athorized");
    }

    Members.insert({
      name: member.name,
      position: member.position,
      photo: member.photo,
      biography: member.biography,
      createdAt: new Date()
    });
  },
  removeMember(memberId) {
    check(memberId, String);
    Members.remove(memberId);
  },
  updateMemberOrder(memberUpdate) {
    check(memberUpdate, Object);

    return Members.update({_id: memberUpdate.memberId}, {
      $set: {
        "index": memberUpdate.index
      }
    });
  }
});
