if (Meteor.users.find().count() === 0) {
  var user = Accounts.createUser({
    username: "samcorcos",
    email: "user@site.com",
    password: "password",
    profile: {
      image: "http://i.imgur.com/NqyBZSp.gif"
    }
  });
  var admin = Accounts.createUser({
    username: "adminbagel",
    email: "admin@site.com",
    password: "password",
    profile: {
      image: "http://i.imgur.com/NqyBZSp.gif"
    }
  });
  Roles.addUsersToRoles(admin, ['admin']);
}
