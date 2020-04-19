import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { useState } from "react";
import { handleSaveQuestion } from "../actions/questions";
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
  card: {
    marginTop: 32,
  },
  question: {
    fontSize: 14,
  },
  input: {
    width: "95%",
  },
  iunputWrapper: {
    justifyContent: "center",
  },
}));

const NewQuestion = (props) => {
  const { authedUser, dispatch } = props;
  const classes = useStyles();
  const [optionOneText, setOptionA] = React.useState("");
  const [optionTwoText, setOptionB] = useState("");
  const [submit, setSubmit] = useState(false);

  const handleChange = (e) => {
    e.target.name === "optionOneText" && setOptionA(e.target.value);
    e.target.name === "optionTwoText" && setOptionB(e.target.value);
  };

  const handleSubmit = () => {
    if (optionOneText === "" || optionTwoText === "") {
      alert("Please fill both options");
    } else {
      dispatch(
        handleSaveQuestion({ optionOneText, optionTwoText, author: authedUser })
      );
      setOptionA("");
      setOptionB("");
      setSubmit(true);
    }
  };

  if (submit) {
    return <Redirect to="/" />;
  }

  return (
    <Container maxWidth="md" className={classes.container}>
      <Card className={classes.card}>
        <CardHeader
          className="card-Header"
          title="Create New Question"
          titleTypographyProps={{
            variant: "h5",
            color: "primary",
            align: "center",
          }}
        />
        <CardContent>
          <Box ml={1.25}>
            <Typography
              gutterBottom
              color="textSecondary"
              className={classes.question}
            >
              Complete Your Question:
            </Typography>
            <Typography variant="h6" gutterBottom>
              Would You Rather ...
            </Typography>
          </Box>
        </CardContent>
        <CardActions className={classes.iunputWrapper}>
          <TextField
            label="Option One"
            placeholder="Enter Option One Question"
            id="outlined-size-small"
            variant="outlined"
            size="small"
            className={classes.input}
            value={optionOneText}
            onChange={handleChange}
            name="optionOneText"
          />
        </CardActions>
        <CardContent>
          <Box display="flex" alignItems="center">
            <Divider style={{ width: "43%" }} />
            <Typography
              color="textSecondary"
              align="center"
              style={{ width: "14%" }}
              variant="h5"
            >
              OR
            </Typography>
            <Divider style={{ width: "43%" }} />
          </Box>
        </CardContent>
        <CardActions className={classes.iunputWrapper}>
          <TextField
            label="Option Two"
            placeholder="Enter Option Two Question"
            id="outlined-size-small"
            variant="outlined"
            size="small"
            className={classes.input}
            value={optionTwoText}
            onChange={handleChange}
            name="optionTwoText"
          />
        </CardActions>
        <CardActions>
          <Box my={2} width="100%" textAlign="center">
            <Button
              variant="contained"
              color="primary"
              style={{ width: "30%" }}
              onClick={handleSubmit}
            >
              submit
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Container>
  );
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(NewQuestion);
