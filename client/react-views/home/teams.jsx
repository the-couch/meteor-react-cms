Teams = React.createClass({
  render() {
    return (
      <div className="">
        <p>testing</p>
      </div>
    )
  }
});

Template.home.helpers({
  Teams() {
    return Teams;
  }
});
