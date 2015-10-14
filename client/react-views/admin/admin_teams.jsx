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
  render() {
    return (
      <div className="">
        {this.renderMembers()}
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
