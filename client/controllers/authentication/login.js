/*
  Controller: Login
  Template: /client/views/registration/login.html
*/

Template.login.rendered = function() {
  return $('#login').validate({
    rules: {
      emailAddress: {
        required: true,
        email: true
      },
      password: {
        required: true
      }
    },
    messages: {
      emailAddress: {
        required: "Please enter your email address to login.",
        email: "Please enter a valid email address."
      },
      password: {
        required: "Please enter your password to login."
      }
    },
    submitHandler: function() {
      var user;
      user = {
        email: document.querySelector('[name="emailAddress"]').value,
        password: document.querySelector('[name="password"]').value
      };
      return Meteor.loginWithPassword(user.email, user.password, function(error) {
        if (error) {
          return alert(error.reason);
        } else {
          FlowRouter.go('/');
        }
      });
    }
  });
}

Template.login.events({
  'submit form': function(event, template) {
    return event.preventDefault();
  }
});
