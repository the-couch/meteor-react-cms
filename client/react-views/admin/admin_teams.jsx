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
    var member = {
      name: React.findDOMNode(this.refs.name).value.trim(),
      position: React.findDOMNode(this.refs.position).value.trim(),
      biography: React.findDOMNode(this.refs.biography).value.trim()
    }

    Meteor.call("addMember", member);

    React.findDOMNode(this.refs.name).value = "";
    React.findDOMNode(this.refs.position).value = "";
    React.findDOMNode(this.refs.biography).value = "";
  },
  render() {
    return (
      <div className="">
        {this.renderMembers()}
        <form className="new-member" onSubmit={this.handleSubmit} >
          { this.data.currentUser ?
            <div className="form-inputs">
              <input type="text" ref="name" placeholder="Name" />
              <input type="text" ref="position" placeholder="Position" />
              <textarea type="text" ref="biography" placeholder="Biography"></textarea>
              <input type="submit" value="Create Team Member" />
          </div>
            : ''
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
      <li className="teamMember">
        <button className="delete" onClick={this.deleteThisTask}>
          &times;
        </button>
        <span className="name">{this.props.member.name}</span>
        <span className="position">{this.props.member.position}</span>
        <span className="biography">{this.props.member.biography}</span>
      </li>
    );
  }
});
