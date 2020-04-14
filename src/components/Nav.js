import React, { Component } from "react";
import { connect } from "react-redux";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import { Typography, Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { setAuthedUser } from "../actions/authedUser";

class Nav extends Component {
  render() {
    const { authedUser, user, dispatch } = this.props;
    const flexContainer = {
      display: "flex",
      flexDirection: "row",
      padding: 0,
      width: "30%",
    };
    const avatars = {
      sarahedo: require("../images/sarah.jpg"),
      tylermcginnis: require("../images/tyler.jpg"),
      johndoe: require("../images/dan.jpg"),
    };
    const handleLogOut = () => {
      dispatch(setAuthedUser(null));
    };

    return (
      <React.Fragment>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <List component="nav" style={flexContainer}>
            <ListItem button className="menu-btn">
              <ListItemText primary="Home" autoFocus className="menu-item" />
            </ListItem>
            <Divider orientation="vertical" flexItem />
            <ListItem button className="menu-btn">
              <ListItemText primary="New Question" />
            </ListItem>
            <Divider orientation="vertical" flexItem />
            <ListItem button className="menu-btn">
              <ListItemText primary="Leader Board" />
            </ListItem>
          </List>
          <Divider light />
          {authedUser && (
            <Box style={{ display: "flex", alignItems: "center" }}>
              <Typography className="nav-name">Hello, {user.name}</Typography>
              <Box mx={3}>
                <Avatar alt={user.name} src={avatars[user.id]} />
              </Box>
              <Box mr={3}>
                <Button
                  onClick={handleLogOut}
                  color="primary"
                  variant="outlined"
                  href="/login"
                >
                  log Out
                </Button>
              </Box>
            </Box>
          )}
        </div>
        <Divider />
      </React.Fragment>
    );
  }
}
function mapStateToProps({ users, authedUser }) {
  return {
    user: authedUser ? users[authedUser] : null,
    authedUser,
  };
}
export default connect(mapStateToProps)(Nav);
