AdminTeams = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState: function() {
    return {
      data_uri: 'http://placekitten.com/g/300/300'
    }
  },
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
      photo: React.findDOMNode(this.refs.photo).value.trim(),
      position: React.findDOMNode(this.refs.position).value.trim(),
      biography: React.findDOMNode(this.refs.biography).value.trim()
    }

    Meteor.call("addMember", member);

    React.findDOMNode(this.refs.name).value = "";
    React.findDOMNode(this.refs.position).value = "";
    React.findDOMNode(this.refs.photo).value = "";
    React.findDOMNode(this.refs.biography).value = "";
  },
  handleFile: function(e) {
    var self = this;
    var file = e.target.files[0];
    var uploader = new Slingshot.Upload("fileUpload");

    uploader.send(file, function(error, downloadUrl) {
      if (error) {
        console.error('Error upload', uploader.xhr.response);
      } else {
        self.setState({
          data_uri: downloadUrl
        });
      }
    });
  },
  render() {
    return (
      <div className="">
        {this.renderMembers()}
        <form className="new-member" onSubmit={this.handleSubmit} encType="multipart/form-data" >
          { this.data.currentUser ?
            <div className="form-inputs">
              <img src={this.state.data_uri} className="js-profile-upload" ref="image" /><br />
              <input type="file" onChange={this.handleFile} /><br />
              <input type="text" ref="name" placeholder="Name" />
              <input type="hidden" ref="photo" placeholder="Name" value={this.state.data_uri} />
              <input type="text" ref="position" placeholder="Position" />
              <textarea type="text" ref="biography" placeholder="Biography"></textarea>
              <input type="submit" className="btn" value="Create Team Member" />
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
