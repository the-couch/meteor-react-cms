Tracker.autorun(function() {
  if (!Meteor.userId()) {
    if (Session.get('loggedIn')) {
      return FlowRouter.go(FlowRouter.path('login'));
    }
  }
});
