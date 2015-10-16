Teams = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      members: Members.find({}).fetch(),
    }
  },
  renderMembers() {
    return this.data.members.map((member) => {
      return <TeamMember member={member} />;
    });
  },
  render() {
    return (
      <div className="">
        <p>{this.renderMembers()}</p>
      </div>
    )
  }
});

TeamMember = React.createClass({
  propTypes: {
    member: React.PropTypes.object.isRequired
  },
  render() {
    return (
      <li>
        <span className="member">{this.props.member.name}</span>
      </li>
    )
  }
})

Template.home.helpers({
  Teams() {
    return Teams;
  }
});
