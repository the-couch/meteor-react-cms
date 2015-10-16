AdminTeams = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      members: Members.find({}).fetch(),
      currentUser: Meteor.user()
    }
  },
  renderMembers() {
    return this.data.members.map((member) => {
      return <Member key={member._id} member={member} />;
    });
  },
  handleSubmit(event) {
    event.preventDefault();
    var name = React.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call("addMember", name);

    React.findDOMNode(this.refs.textInput).value = "";
  },
  render() {
    return (
      <div className="">
        {this.renderMembers()}
        <form className="new-member" onSubmit={this.handleSubmit} >
          { this.data.currentUser ?
            <input
              type="text"
              ref="textInput"
              placeholder="Team Member Name" /> : ''
          }
        </form>
      </div>
    );
  }
});

Member = React.createClass({
  propTypes: {
    member: React.PropTypes.object.isRequired
  },
  deleteThisTask() {
    Meteor.call("removeMember", this.props.member._id);
  },
  render() {
    return (
      <li>
        <button className="delete" onClick={this.deleteThisTask}>
          &times;
        </button>
        <span className="text">{this.props.member.name}</span>
      </li>
    );
  }
});
