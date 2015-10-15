Header = React.createClass({
  render() {
    return (
      <div className="header">
        <Navigation />
      </div>
    )
  }
});

Template.layout.helpers({
  Header() {
    return Header;
  }
});


Template.adminLayout.helpers({
  Header() {
    return Header;
  }
});
