import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import LoadingBar from "react-redux-loading";
import LogIn from "./LogIn"
import Nav from "./Nav"
import Home from "./Home"
import LeaderBoard from "./LeaderBoard"
import NewQuestion from "./NewQuestion"
import Question from "./Question"


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          {this.props.loading ? null : (
            <div>
              <Nav />
              <Route path="/login" exact component={LogIn} />
              <Route path="/" exact component={Home} />
              <Route path="/leaderboard" exact component={LeaderBoard} />
              <Route path="/newquestion" exact component={NewQuestion} />
              <Route path='/questions/:id' component={Question} />
              <Route path='/questions' exact component={()=><Redirect to='/' />} />
            </div>
          )}
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    loading: loading(users),
  };
}

const loading = (users) => {
  for (let user in users) {
    if (users.hasOwnProperty(user)) return false;
  }
  return true;
};

export default connect(mapStateToProps)(App);
