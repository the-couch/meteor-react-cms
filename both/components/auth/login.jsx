
Login = React.createClass({
  getInitialState() {
    return { canSubmit: false };
  },
  submit(data) {
    alert(JSON.stringify(data, null, 4));
  },
  enableButton() {
    this.setState({ canSubmit: true });
  },
  disableButton() {
    this.setState({ canSubmit: false });
  },
  render() {
    return (
      <form onSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton} className="login">
        <MyInput name="email" title="Email" validations="isEmail" validationError="This is not a valid email" required />
        <MyInput name="password" title="Password" type="password" required />
        <button type="submit" disabled={!this.state.canSubmit}>Submit</button>
      </form>
    );
  }
});

// Login = React.createClass({
//   handleSubmit: function(e) {
//     e.preventDefault();
//     var attributes = {
//       emailAddress: document.querySelector('input[name="emailAddress"]').value,
//       password: document.querySelector('input[name="password"]').value
//     }
//     return $('#login').validate({
//       rules: {
//         emailAddress: {
//           required: true,
//           email: true
//         },
//         password: {
//           required: true
//         }
//       },
//       messages: {
//         emailAddress: {
//           email: "please enter your email address to login.",
//           email: "Please enter a valid email address."
//         },
//         password: {
//           required: "Please enter your password to login"
//         }
//       },
//       submitHandler: function() {
//         console.log(attributes);
//         return Meteor.loginWithPassword(attributes.emailAddress, attributes.password, function(error) {
//           if (error) {
//             var errorContainer = document.querySelector('.global-error');
//             errorContainer.innerHtml(error.reason);
//             return;
//           } else {
//             FlowRouter.go('/admin');
//           }
//         });
//       }
//     });
//   },
//   render() {
//     return (
//       <div>
//         <div id="errors">
//           <span className="global-error"></span>
//         </div>
//         <form id="login" onSubmit={this.handleSubmit} >
//           <input type="email" name="emailAddress" className="form-control" placeholder="Email Address" />
//           <input type="password" name="password" className="form-control" placeholder="Password" />
//           <input type="submit" className="btn-active btn btn-flat" value="Login" />
//          </form>
//       </div>
//     )
//   }
// })
