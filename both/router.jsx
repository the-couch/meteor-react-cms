exposed = FlowRouter.group({});

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
      content: <SignUp />
    });
  }
})
