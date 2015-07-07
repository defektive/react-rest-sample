var React = require("react/lib/reactWithAddons");

import auth from "../stores/Auth";
class LoginForm extends React.Component {
  constructor () {
    super()
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      error: false
    };

    auth.addListener('error', this.handleError.bind(this));
  }

  handleSubmit (event) {
    event.preventDefault();
    this.setState({error: false});
    var email = this.refs.email.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    auth.login(email, password)
  }

  handleError (error) {
    this.setState({error: error});
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit} className={this.props.className}>
        {this.state.error && this.state.error.status >= 500 && (
          <p className="bg-danger info-box">Something terrible happend</p>
        )}

        {this.state.error && this.state.error.status < 500 && (
          <p className="bg-warning info-box">Invalid credentials</p>
        )}

        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input ref="email" type="email" className="form-control" id="email" placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input ref="password" type="password" className="form-control" id="password" placeholder="Password" />
        </div>

        <button type="submit" className="btn btn-primary btn-lg">login</button>

      </form>
    );
  }
}

LoginForm.contextTypes = {
  router: React.PropTypes.func
};

export default LoginForm;
