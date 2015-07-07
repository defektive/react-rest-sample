var React = require("react/lib/reactWithAddons");
import SignUpForm from "../components/SignUpForm";

class SignUp extends React.Component {
  render () {
    return (
      <div>
        <h2>Sign Up</h2>
        <SignUpForm />
      </div>
    );
  }
}

export default SignUp;
