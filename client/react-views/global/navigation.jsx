LoggedIn = React.createClass({
  logout() {
    Meteor.logout();
  },
  render() {
    return (
      <div>
        <a href="#" onClick={this.logout}>Logout</a>
      </div>
    )
  }
});

NotLoggedIn = React.createClass({
  login(user, pass) {
    Meteor.loginWithPassword(user, pass);
  },
  render() {
    return <a href="/login">Login</a>
  }
});

AdminUser = React.createClass({
  render() {
    return (
      <li><a href="/admin/manage">Manage Page</a></li>
    )
  }
});


Navigation = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    var user = Meteor.user(),
        userId = Meteor.userId();
    admin = Roles.userIsInRole(userId, ['admin']);
    return {
      user: user,
      admin: admin,
      userLogginIn: Meteor.loggingIn()
    }
  },
  getLoginStatus() {
    if (!this.data.user && !this.data.userLogginIn) {return false;}
    if (this.data.user) {return true;}
    return false;
  },
  getAdminStatus() {
    if (this.data.admin) {return true;}
    return false;
  },
  render() {
    let loginStatus = this.getLoginStatus();
    let adminStatus = this.getAdminStatus();
    return (
      <div className="navigation">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            {loginStatus ? <LoggedIn /> : <NotLoggedIn /> }
          </li>
          {adminStatus ? <AdminUser /> : '' }
        </ul>
      </div>
    )
  }
});
