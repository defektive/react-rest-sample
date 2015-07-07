var React = require("react/lib/reactWithAddons");

import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";
export default  React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-md-8">
          <div className="jumbotron">
            <h2>Sign up now!!</h2>
            <SignUpForm />
          </div>
        </div>
        <div className="col-md-4">
          <LoginForm className="well" />
        </div>
      </div>
    );
  }
});
