Admin = React.createClass({
  render() {
    return (
      <div className="row">
        <div className="col s12">
          <div className="section">
            <h5>Manage Services</h5>
            <AdminServices />
          </div>
          <div className="divider"></div>
          <div className="section">
            <h5>Manage Team Members</h5>
            <AdminTeams />
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
