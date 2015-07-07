import DataStore from "./DataStore";

function AppState(){  DataStore.apply(this, arguments)  }

AppState.prototype = Object.create(DataStore.prototype);

var auth = new Auth
export default auth
