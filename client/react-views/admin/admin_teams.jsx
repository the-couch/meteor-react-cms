AdminTeams = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      members: Members.find({}).fetch()
    }
  },
  renderMembers() {
    return this.data.members.map((member) => {
      return <Member key={member._id} member={member} />;
    });
  },
  handleSubmit(event) {
    event.preventDefault();
    var text = React.findDOMNode(this.refs.textInput).value.trim();

    Members.insert({
      name: text,
      createdAt: new Date()
    });

    React.findDOMNode(this.refs.textInput).value = "";
  },
  render() {
    return (
      <div className="">
        {this.renderMembers()}
        <form className="new-member" onSubmit={this.handleSubmit} >
          <input
            type="text"
            ref="textInput"
            placeholder="Team Member Name" />
        </form>
      </div>
    );
  }
});

Member = React.createClass({
  propTypes: {
    member: React.PropTypes.object.isRequired
  },
  render() {
    return (
      <li>{this.props.member.name}</li>
    );
  }
});
