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
    BlazeLayout.render("layout", {content: "home"});
  }
});

exposed.route("/login", {
  action: function() {
    Session.set('redirectAfterLogin', "/");
    BlazeLayout.render("layout", {content: "login"});
  },
  triggersEnter: [
    function() {
      var user = Meteor.user();
      if (user) {
        return FlowRouter.go('/');
      }
    }
  ]
});

exposed.route("/login/:error", {
  action: function(params) {
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
        return FlowRouter.go(FlowRouter.path('manage'));
      }
    }
  ]
});

admin.route("/manage", {
  name: 'manage',
  action: function() {
    Session.set('redirectAfterLogin', "/");
    BlazeLayout.render("adminLayout", {content: "adminManage"});
  }
});

// Global Subscriptions

FlowRouter.subscriptions = function() {
  this.register('members', Meteor.subscribe('members'));
  this.register('press', Meteor.subscribe('press'));
}
