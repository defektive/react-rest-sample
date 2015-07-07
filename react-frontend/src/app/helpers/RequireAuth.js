var React = require("react/lib/reactWithAddons");
import auth from "../stores/Auth";


export default (Component) => {
  return class Authenticated extends React.Component {
    static willTransitionTo(transition) {
      if (!auth.isLoggedIn()) {
        transition.redirect('/login', {}, {'nextPath' : transition.path});
      }
    }
    render () {
      return <Component {...this.props}/>
    }
  }
};
