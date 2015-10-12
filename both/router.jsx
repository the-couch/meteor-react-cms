var exposed, loggedIn, admin;

// Exposed Group for all pulbic routes

exposed = FlowRouter.group({});

FlowRouter.notFound = {
  action: function() {
    ReactLayout.render(NotFound);
  }
}

// General Routes

exposed.route("/", {
  action: function() {
    ReactLayout.render(BlogLayout, {
      content: <PostList />
    });
  }
});

exposed.route('/post/:_id', {
  name: 'post',
  action: function(params) {
    ReactLayout.render(BlogLayout, {
      content: <PostPage _id={params._id} />
    });
  }
});

// User Signup and authentication routes

exposed.route('/login', {
  action: function() {
    ReactLayout.render(Layout, {
      content: <Login />
    });
  }
});

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
  var redirect;
  redirect = Session.get('redirectAfterLogin');
  if (redirect != null) {
    if (redirect !== '/login') {
      return FlowRouter.go(redirect);
    }
  }
});
