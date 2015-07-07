var React = require("react/lib/reactWithAddons");
import WelcomeBox from "../components/WelcomeBox";

export default class Home extends React.Component {
  render () {
    return (
      <div>
        <h2>Home</h2>
        <WelcomeBox />
      </div>
    );
  }
}
