import React from "react";
import { connect } from "react-redux";
import { useState } from "react";
import { handleSaveAnswer } from "../actions/questions";
import Error from "./Error";
//material ui
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import { CardHeader } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 100,
  },
  large: {
    width: theme.spacing(19),
    height: theme.spacing(19),
    margin: "auto",
  },
  answerCard: {
    marginTop: 12,
    marginBottom: 12,
    position: "relative",
  },
  cardContent: {
    paddingTop: 8,
    "&:last-child": {
      paddingBottom: 8,
    },
  },
}));

const Question = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const {
    question,
    authedUser,
    id,
    user,
    questionCreator,
    isError,
    dispatch,
  } = props;
  if (isError) {
    return (
      <div>
        <Error />
      </div>
    );
  }
  const answeredQ = authedUser && user.answers[id];
  const avatars = {
    sarahedo: require("../images/sarah.jpg"),
    tylermcginnis: require("../images/tyler.jpg"),
    johndoe: require("../images/dan.jpg"),
  };
  let votedOptionOne = false;
  let votedOptionTwo = false;
  if (answeredQ) {
    if (question.optionOne.votes.indexOf(authedUser) !== -1) {
      votedOptionOne = true;
    }
    if (question.optionTwo.votes.indexOf(authedUser) !== -1) {
      votedOptionTwo = true;
    }
  }
  const handleSubmit = () => {
    if (value === "") {
      alert("Please choose an option to submit your answer");
    } else {
      dispatch(
        handleSaveAnswer({ authedUser, qid: question.id, answer: value })
      );
    }
  };
  const totalVotes =
    question.optionOne.votes.length + question.optionTwo.votes.length;
  const optionOneVotes = question.optionOne.votes.length;
  const optionTwoVotes = question.optionTwo.votes.length;
  const optionOnePercentage = (optionOneVotes / totalVotes) * 100;
  const optionTwoPercentage = (optionTwoVotes / totalVotes) * 100;

  return (
    <Container maxWidth="md" className={classes.container}>
      {answeredQ ? (
        <Card className={classes.card}>
          <CardHeader
            className="card-Header"
            title={`Asked by ${user.name.substr(0, user.name.indexOf(" "))}`}
            titleTypographyProps={{
              variant: "h6",
              color: "primary",
            }}
          />
          <CardContent className={classes.cardContent}>
            <Box display="flex" height="100%">
              <Box textAlign="center" width="25%" m={1} mt={9}>
                <Avatar
                  alt={user.name}
                  src={avatars[user.id]}
                  className={classes.large}
                />
              </Box>
              <Box width="75%" m={0.5}>
                <Box ml={1.5}>
                  <Typography variant="h5">Results</Typography>
                  <Card className={classes.answerCard}>
                    {votedOptionOne && <div className="badge">Your Vote</div>}
                    <CardContent className={classes.cardContent}>
                      <Typography variant="h6">
                        {question.optionOne.text}
                      </Typography>
                      <Box
                        width="100%"
                        height={30}
                        my={1}
                        style={{ background: "rgba(0,0,0,.1)" }}
                        borderRadius={4}
                      >
                        <Box
                          style={{
                            width: `${optionOnePercentage}%`,
                            backgroundColor: "#5ddcf8",
                          }}
                          height="100%"
                          display="flex"
                          justifyContent="flex-end"
                          alignItems="center"
                          borderRadius={4}
                          minWidth={32}
                          pr={1}
                        >
                          <span> {`${optionOnePercentage}%`}</span>
                        </Box>
                      </Box>
                      <Typography align="center">{`${optionOneVotes} out of ${totalVotes} votes`}</Typography>
                    </CardContent>
                  </Card>
                  <Card className={classes.answerCard}>
                    {votedOptionTwo && <div className="badge">Your Vote</div>}
                    <CardContent className={classes.cardContent}>
                      <Typography variant="h6">
                        {question.optionTwo.text}
                      </Typography>
                      <Box
                        width="100%"
                        height={30}
                        my={1}
                        style={{ background: "rgba(0,0,0,.1)" }}
                        borderRadius={4}
                      >
                        <Box
                          style={{
                            width: `${optionTwoPercentage}%`,
                            backgroundColor: "#5ddcf8",
                          }}
                          height="100%"
                          bgcolor="primary.main"
                          display="flex"
                          justifyContent="flex-end"
                          alignItems="center"
                          borderRadius={4}
                          minWidth={32}
                          pr={1}
                        >
                          <span>{`${optionTwoPercentage}%`}</span>
                        </Box>
                      </Box>
                      <Typography align="center">{`${optionTwoVotes} out of ${totalVotes} votes`}</Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Card className={classes.card}>
          <CardHeader
            className="card-Header"
            title={`${questionCreator.name.substr(
              0,
              questionCreator.name.indexOf(" ")
            )} Asked:`}
            titleTypographyProps={{
              variant: "h6",
              color: "primary",
            }}
          />
          <CardContent className={classes.cardContent}>
            <Box display="flex" height="100%">
              <Box textAlign="center" width="25%" m={1}>
                <Avatar
                  alt={questionCreator.name}
                  src={avatars[questionCreator.id]}
                  className={classes.large}
                />
              </Box>
              <Box width="75%" m={0.5}>
                <Box ml={1.5}>
                  <Typography variant="h5">Would You Rather</Typography>

                  <RadioGroup
                    name="wouldYouRather"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  >
                    <FormControlLabel
                      value="optionOne"
                      control={<Radio />}
                      label={question.optionOne.text}
                    />
                    <FormControlLabel
                      value="optionTwo"
                      control={<Radio />}
                      label={question.optionTwo.text}
                    />
                  </RadioGroup>
                </Box>
                <Box m={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ width: "100%" }}
                    onClick={handleSubmit}
                  >
                    Answer
                  </Button>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

function mapStateToProps({ authedUser, users, questions }, props) {
  const { id } = props.match.params;
  if (questions[props.match.params.id] === undefined) {
    const isError = true;
    return {
      isError,
    };
  }
  const isError = false;

  return {
    id,
    authedUser,
    question: questions[id],
    user: users[authedUser],
    questionCreator: authedUser && users[questions[id].author],
    isError,
  };
}

export default connect(mapStateToProps)(Question);
