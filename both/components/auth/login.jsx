Login = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    return Meteor.loginWithGoogle({
        requestPermissions: ['email']
    }, function(error, response) {
      if (error) {
        return alert(error.reason);
      }
    })
  },
  render() {
    return (
      <div>
        <form id="login" onSubmit={this.handleSubmit} >
           <input type="submit" className="" value="Login with Google" />
         </form>
      </div>
    )
  }
})
