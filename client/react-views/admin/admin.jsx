Admin = React.createClass({
  render() {
    return (
      <div className="row">
        <div className="col s12">
          <div className="section">
            <h3>Header Image</h3>
            <AdminHeaderImage />
          </div>
          <div className="divider"></div>
          <div className="section">
            <h3>Manage Services</h3>
            <AdminServices />
          </div>
          <div className="divider"></div>
          <div className="section">
            <h3>Manage Team Members</h3>
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

Template.adminLayout.rendered = function() {
  $('textarea').redactor({
    toolbar: true,
    buttons: ['formatting', 'bold', 'italic', 'link', 'list']
  });
}
