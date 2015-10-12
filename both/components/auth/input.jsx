MyInput = React.createClass({

  // Add the Formsy Mixin

  changeValue: function (event) {
    this.setValue(event.currentTarget.value);
  },
  render: function () {

    var className = this.showRequired() ? 'required' : this.showError() ? 'error' : null;

    var errorMessage = this.getErrorMessage();

    return (
      <div className={className}>
        <input type="text" onChange={this.changeValue} value={this.getValue()}/>
        <span>{errorMessage}</span>
      </div>
    );
  }
});
