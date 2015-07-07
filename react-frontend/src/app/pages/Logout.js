var React = require("react/lib/reactWithAddons");
import auth from "../stores/Auth";

export default class Logout extends React.Component {
  componentDidMount () {
    auth.logout();
  }

  render () {
    return <p>You are now logged out</p>;
  }
}
