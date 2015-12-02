AdminServices = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState: function() {
    return {
      data_uri: ''
    }
  },
  getMeteorData() {
    return {
      services: Services.find({}).fetch(),
      page: Pages.findOne({}),
      currentUser: Meteor.user()
    }
  },
  renderServices() {
    return this.data.services.map((service) => {
      return <Service key={service._id} service={service} />;
    });
  },
  handleSubmit(event) {
    event.preventDefault();
    var service = {
      name: React.findDOMNode(this.refs.name).value.trim(),
      icon: React.findDOMNode(this.refs.icon).value.trim(),
    }

    Meteor.call("addService", service);

    React.findDOMNode(this.refs.name).value = "";
    React.findDOMNode(this.refs.icon).value = "";
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
        <h5>Services About Copy</h5>
        <form className="service-copy">
          <div className="form-inputs">
            <textarea ref="about-copy" placeholder="This is the copy above the services module">{this.data.page ? this.data.page.about : ''}</textarea>
            <input type="submit" className="btn" value="Update About Copy" />
          </div>
        </form>
        <ul className="backend-grid">
          {this.renderServices()}
        </ul>
        <form className="new-service" onSubmit={this.handleSubmit} encType="multipart/form-data" >
          { this.data.currentUser ?
            <div className="form-inputs">
              <img src={this.state.data_uri} className="js-profile-upload" ref="image" /><br />
              <input type="file" onChange={this.handleFile} /><br />
              <input type="text" ref="name" placeholder="Name" />
              <input type="hidden" ref="icon" placeholder="Name" value={this.state.data_uri} />
              <input type="submit" className="btn" value="Create Service" />
            </div>
            : ''
          }
        </form>
      </div>
    );
  }
});

Service = React.createClass({
  propTypes: {
    service: React.PropTypes.object.isRequired
  },
  deleteThisTask() {
    Meteor.call("removeService", this.props.service._id);
  },
  render() {
    return (
      <li className="service">
        <button className="delete" onClick={this.deleteThisTask}>
          &times;
        </button>
        <span className="name">{this.props.service.name}</span>
      </li>
    );
  }
});
