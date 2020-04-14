import React, { Component } from "react";
import { connect } from "react-redux";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";


class Nav extends Component {
  
  render() {
    const flexContainer = {
      display: 'flex',
      flexDirection: 'row',
      padding: 0,
      width: '30%',
    };
    return (
      <div>
        <List component="nav" style={flexContainer}>
          <ListItem button className="menu-btn">
            <ListItemText primary="Home" autoFocus className="menu-item" />
          </ListItem>
          <Divider orientation="vertical" flexItem  />
          <ListItem button className="menu-btn">
            <ListItemText primary="New Question" />
          </ListItem>
          <Divider orientation="vertical" flexItem />
          <ListItem button className="menu-btn">
            <ListItemText primary="Leader Board" />
          </ListItem>
        </List>
        <Divider light />
      </div>
    );
  }
}

export default connect()(Nav);
