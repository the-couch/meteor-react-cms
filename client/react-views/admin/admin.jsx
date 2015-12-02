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
            <h3>Investment Process</h3>
            <AdminProcess />
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
  //
  // let sortableLists = document.querySelectorAll('.backend-grid');
  //
  // Array.from(sortableLists).forEach(function(list, index) {
  //   Sortable.create(list, {
  //     animation: 150,
  //     dataIdAttr: 'data-sort',
  //     onUpdate: function() {
  //       console.log(this);
  //       switch (this.el.classList[1]) {
  //         case 'js-process':
  //           let processes = this.el.querySelectorAll('li');
  //
  //           Array.from(processes).forEach(function(process, index) {
  //             let processUpdate = {
  //               processId: process.dataset.id,
  //               index: index
  //             }
  //             console.log(processUpdate);
  //             Meteor.call('updateProcessOrder', processUpdate);
  //           });
  //           break;
  //         case 'js-teams':
  //           let members = this.el.querySelectorAll('li');
  //           Array.from(members).forEach(function(member, index) {
  //             let memberUpdate = {
  //               memberId: member.dataset.id,
  //               index: index
  //             }
  //             Meteor.call('updateMemberOrder', memberUpdate);
  //           });
  //           break;
  //         case 'js-services':
  //           let services = this.el.querySelectorAll('li');
  //           Array.from(services).forEach(function(service, index) {
  //             let serviceUpdate = {
  //               memberId: service.dataset.id,
  //               index: index
  //             }
  //             Meteor.call('updateServiceOrder', serviceUpdate);
  //           });
  //           break;
  //       }
  //     }
  //   });
  // });
}
