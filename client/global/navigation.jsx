LoggedIn = React.createClass({
  logout() {
    Meteor.logout();
  },
  render() {
    return (
      <div>
        <a onClick={this.logout}>Logout</a>
      </div>
    )
  }
})

NotLoggedIn = React.createClass({
  login(user, pass) {
    Meteor.loginWithPassword(user, pass);
  },
  render() {
    return <a href="/login">Login</a>
  }
})

Navigation = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      user: Meteor.user(),
      userLogginIn: Meteor.loggingIn()
    }
  },
  getLoginStatus() {
    if (!this.data.user) {return false;}
    if (this.data.user) {return true;}
    return false
  },
  render() {

    let loginStatus = this.getLoginStatus();
    return (
      <div>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            {loginStatus ? <LoggedIn /> : <NotLoggedIn /> }
          </li>
        </ul>
      </div>
    )
  }
})
