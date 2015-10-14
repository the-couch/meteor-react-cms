Header = React.createClass({
  render() {
    return (
      <div className="header">
        <div className="logo">
          bagel
        </div>
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
