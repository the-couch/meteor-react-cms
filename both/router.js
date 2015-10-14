var exposed, loggedIn, admin;

// Exposed Group for all pulbic routes

exposed = FlowRouter.group({});

FlowRouter.notFound = {
  action: function() {
    BlazeLayout.render("layout", {content: "notFound"});
  }
}

// General Routes

exposed.route("/", {
  action: function() {
    BlazeLayout.render("layout", {content: ""});
  }
});

exposed.route("/login", {
  action: function() {
    Session.set('redirectAfterLogin', "/");
    BlazeLayout.render("layout", {content: "login"});
  }
});
//
// exposed.route('/post/:_id', {
//   name: 'post',
//   action: function(params) {
//     ReactLayout.render(BlogLayout, {
//       content: <PostPage _id={params._id} />
//     });
//   }
// });

// Logged in rotue for logged in users

loggedIn = FlowRouter.group({
  triggersEnter: [
    function() {
      var route;
      if (!(Meteor.loggingIn() || Meteor.userId())) {
        route = FlowRouter.current();
        if (route.route.name !== 'login') {
          Session.set('redirectAfterLogin', route.path);
        }
        return FlowRouter.go('login');
      }
    }
  ]
});

loggedIn.route('/logout', {
  name: 'logout',
  action: function() {
    return Meteor.logout(function() {
      return FlowRouter.go(FlowRouter.path('login'));
    });
  }
});


// Logged in as an admin Routes


admin = loggedIn.group({
  prefix: '/admin',
  triggersEnter: [
    function() {
      if (!Roles.userIsInRole(Meteor.user(), ['admin'])) {
        return FlowRouter.go(FlowRouter.path('dashboard'));
      }
    }
  ]
});

// Redirect for after a user logs in

Accounts.onLogin(function() {
  Metoer.logoutOtherClients();
  Session.set('loggedIn', true);
});
