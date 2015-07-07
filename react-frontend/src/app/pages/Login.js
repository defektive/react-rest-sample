var React = require("react/lib/reactWithAddons");
import LoginForm from "../components/LoginForm";

class Login extends React.Component {
  render () {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm />
      </div>
    );
  }
}

export default Login;
