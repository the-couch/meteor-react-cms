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
        <h3>Team Members</h3>
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
        <div className="image-wrapper">
            <img src={this.props.member.photo} alt=""/>
        </div>
        <span className="member">{this.props.member.name}</span>
        <span className="position">{this.props.member.position}</span>
        <p>
          {this.props.member.biography}
        </p>
      </li>
    )
  }
})

Template.home.helpers({
  Teams() {
    return Teams;
  }
});
