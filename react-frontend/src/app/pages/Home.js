var React = require("react/lib/reactWithAddons");
import WelcomeBox from "../components/WelcomeBox";

export default class Home extends React.Component {
  render () {
    return (
      <div>
        <h2>Home</h2>
        <WelcomeBox />

        <div>
          <a href="https://github.com/defektive/react-rest-sample">Github Repo</a>
          <a href="https://github.com/defektive/react-frontend">React Frontend</a>
          <a href="https://github.com/defektive/rails-templates">Rails Templates</a>

        </div>
      </div>
    );
  }
}
