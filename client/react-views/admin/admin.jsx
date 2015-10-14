Admin = React.createClass({
  render() {
    return (
      <div className="row">
        <div className="col s12">
          <div className="section">
            <h5>Manage Team Members</h5>
            <Navigation />
          </div>
          <div className="divider"></div>
        </div>
      </div>
    )
  }
});


Template.adminLayout.helpers({
  Admin() {
    return Admin;
  }
});
