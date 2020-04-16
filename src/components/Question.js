import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { useState } from "react";
import { handleSaveQuestion } from "../actions/questions";
import { Link, withRouter } from "react-router-dom";

//material ui
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { CardHeader } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
const useStyles = makeStyles((theme) => ({
  container: {
    paddingLeft: 100,
    paddingRight: 100,
  },
}));

const Question = (props) => {
  const classes = useStyles();
  const { id, authedUser } = props;
  if (authedUser === null) {
    return <Redirect to="/login" />;
  }
  return (
    <Link to={`questions/${id}`} className="question">
      <Container maxWidth="md" className={classes.container}>
        {id}
      </Container>
    </Link>
  );
};

function mapStateToProps({ authedUser }, props) {
  const { id } = props.match.params;
  return {
    id,
    authedUser,
  };
}

export default withRouter(connect(mapStateToProps)(Question));
