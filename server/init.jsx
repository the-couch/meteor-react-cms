if (Meteor.users.find().count() === 0) {
  Accounts.createUser({
    username: "samcorcos",
    password: "password",
    profile: {
      image: "http://i.imgur.com/NqyBZSp.gif"
    }
  })
}
