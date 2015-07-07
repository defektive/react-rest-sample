var React = require("react/lib/reactWithAddons");
var Router = require('react-router');
var { Route, RouteHandler, Link, DefaultRoute } = Router;
var axios = require('axios');


import Config from "./app/config"
import PageTitle from "./app/helpers/PageTitle";
import auth from "./app/stores/Auth";
import i18n from "./app/helpers/i18n";
import requireAuth from "./app/helpers/RequireAuth";

import Home from "./app/pages/Home";
import Dashboard from "./app/pages/Dashboard";
import Login from "./app/pages/Login";
import Logout from "./app/pages/Logout";
import SignUp from "./app/pages/SignUp";

axios.interceptors.request.use(
  function (config) {
    if(auth.isLoggedIn()){
      config.headers = {
        Authorization: auth.getAccessToken()
      }
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
});

class App extends React.Component {
  constructor () {
    super();
    this.state = {
      loggedIn: auth.isLoggedIn()
    };
  }

  setStateOnAuth (loggedIn) {
    this.setState({
      loggedIn: loggedIn
    });
  }

  handleLoggedInChange (eventData){
    console.log("LOGIN CHANGE", eventData)
    var { router } = this.context;
    this.setState({
      loggedIn: eventData.value
    });

    if(eventData.value == true) {
      var nextPath = router.getCurrentQuery().nextPath;

      if (nextPath) {
        router.replaceWith(nextPath);
      } else {
        router.replaceWith('/dashboard');
      }
    } else {
      router.replaceWith('/home');
    }
  }

  handleLogOut (event){
    event.preventDefault()
    auth.logout();
  }

  componentWillMount () {
    auth.addListener('changed:loggedIn', this.handleLoggedInChange.bind(this));
  }

  render () {
    return (
      <div id="app-main">
        <div className="navbar navbar-default">
          <div className="navbar-header">
            <Link className="navbar-brand" to="home">{Config.APP_NAME}</Link>
          </div>

          <ul className="nav navbar-nav">
              <li className={this.state.loggedIn ? 'hidden' : ''}><Link to="login">Sign in</Link></li>
              <li className={this.state.loggedIn ? 'hidden' : ''}><Link to="sign_up">Sign up</Link></li>
              <li className={this.state.loggedIn ? '' : 'hidden'}><Link to="dashboard">Dashboard</Link></li>
              <li className={this.state.loggedIn ? '' : 'hidden'}><a href="#" onClick={this.handleLogOut}>Log out</a></li>
          </ul>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 main">
                <RouteHandler key='home'/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

var routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={Home}/>
    <Route name="home" handler={Home}/>
    <Route name="login" handler={Login}/>
    <Route name="sign_up" handler={SignUp}/>
    <Route name="logout" handler={Logout}/>
    <Route name="dashboard" handler={Dashboard}/>
  </Route>
);

App.contextTypes = {
  router: React.PropTypes.func
};

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('app-container'));
});

new PageTitle(document)
