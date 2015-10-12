Layout = React.createClass({
  render() {
    return <div>
      <Navigation />
      <h1> My Blog </h1>
      {this.props.content}
    </div>;
  }
});
