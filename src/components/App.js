import React, { Component, Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import LoadingBar from "react-redux-loading";
import LogIn from "./LogIn";
import Nav from "./Nav";
import Home from "./Home";
import LeaderBoard from "./LeaderBoard";
import NewQuestion from "./NewQuestion";
import Question from "./Question";
import Error from "./Error";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={(props) =>
          this.props.authedUser !== null ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          {this.props.loading ? null : (
            <div>
              <Nav />
              <Switch>
                <Route path="/login" exact component={LogIn} />
                <PrivateRoute path="/" component={Home} exact={true} />
                <PrivateRoute path="/questions/:id" component={Question} />
                <PrivateRoute
                  path="/leaderboard"
                  exact
                  component={LeaderBoard}
                />
                <PrivateRoute path="/add" component={NewQuestion} />
                <Route component={Error} />
              </Switch>
            </div>
          )}
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  return {
    loading: loading(users),
    authedUser,
  };
}

const loading = (users) => {
  for (let user in users) {
    if (users.hasOwnProperty(user)) return false;
  }
  return true;
};

export default connect(mapStateToProps)(App);
