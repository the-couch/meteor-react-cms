AdminHeaderImage = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState: function() {
    return {
      data_uri: ''
    }
  },
  getMeteorData() {
    return {
      page: Pages.findOne({}),
      currentUser: Meteor.user()
    }
  },
  renderHeader() {
    if (this.data.page && this.data.page.headerImage) {
      return <AdminHeaderImageView key={this.data.page._id} page={this.data.page} />
    }
  },
  handleSubmit(event) {
    event.preventDefault();
    var header = {
      headerImage: React.findDOMNode(this.refs.photo).value.trim(),
    }

    Meteor.call("addHeaderImage", header);

    React.findDOMNode(this.refs.photo).value = "";
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
        <ul className="backend-grid">
          {this.renderHeader()}
        </ul>
        <form className="header-image" onSubmit={this.handleSubmit} encType="multipart/form-data" >
          { this.data.currentUser ?
            <div className="form-inputs">
              <img src={this.state.data_uri} className="js-profile-upload" ref="image" /><br />
              <input type="file" onChange={this.handleFile} /><br />
              <input type="hidden" ref="photo" placeholder="Name" value={this.state.data_uri} />
              <input type="submit" className="btn" value="Save Header Image" />
            </div>
            : ''
          }
        </form>
      </div>
    );
  }
});

AdminHeaderImageView = React.createClass({
  propTypes: {
    page: React.PropTypes.object.isRequired
  },
  render() {
    return (
      <div className="admin-header-image">
        <img src={this.props.page.headerImage} />
      </div>
    );
  }
});
