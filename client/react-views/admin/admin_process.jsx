AdminProcess = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState: function() {
    return {
      data_uri: ''
    }
  },
  getMeteorData() {
    return {
      page: Pages.findOne({}),
      counts: Counts.get('processes-counter'),
      currentUser: Meteor.user()
    }
  },
  handleSubmit(event) {
    event.preventDefault();
    var process = {
      title: React.findDOMNode(this.refs.title).value.trim(),
      snippet: React.findDOMNode(this.refs.snippet).value.trim(),
      count: this.data.counts
    }

    Meteor.call("addProcess", process);

    React.findDOMNode(this.refs.title).value = "";
    React.findDOMNode(this.refs.snippet).value = "";
  },
  handleCopyUpdate(event) {
    event.preventDefault();
    var process = {
      process: React.findDOMNode(this.refs.process).value.trim()
    }

    Meteor.call('updateProcess', process);
  },
  render() {
    return (
      <div className="">
        <h5>Investment Process Copy</h5>
        <form className="service-copy" onSubmit={this.handleCopyUpdate}>
          <div className="form-inputs">
            <textarea ref="process" placeholder="This is the Investment Process Module Header">{this.data.page ? this.data.page.process : ''}</textarea>
            <input type="submit" className="btn" value="Update About Copy" />
          </div>
        </form>
        <SortableProcesses />
        <form className="new-service" onSubmit={this.handleSubmit}>
          { this.data.currentUser ?
            <div className="form-inputs">
              <input type="text" ref="title" placeholder="Title" />
              <input type="text" ref="snippet" placeholder="Snippet" />
              <input type="submit" className="btn" value="Create Process" />
            </div>
            : ''
          }
        </form>
      </div>
    );
  }
});

SortableProcesses = React.createClass({
  mixins: [SortableMixin, ReactMeteorData],
  getMeteorData() {
    return {
      processes: Processes.find({}, {
        sort: {index: -1}
      }).fetch()
    }
  },
  renderProcesses() {
    return this.data.processes.map((process) => {
      return <Process key={process._id} process={process} />;
    });
  },
  render() {
    return <ul>{
        this.renderProcesses()
      }</ul>
  }
});

Process = React.createClass({
  propTypes: {
    process: React.PropTypes.object.isRequired
  },
  deleteThisTask() {
    Meteor.call("removeProcess", this.props.process._id);
  },
  render() {
    return (
      <li className="process" data-id={this.props.process._id} data-sort>
        <button className="delete" onClick={this.deleteThisTask}>
          &times;
        </button>
        <h5 className="name">{this.props.process.title}</h5><br />
        <span className="snippet">{this.props.process.snippet}</span>
      </li>
    );
  }
});
