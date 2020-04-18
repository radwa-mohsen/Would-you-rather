import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { useState } from "react";
//material ui
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import { Link, withRouter, NavLink } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
  container: {
    paddingLeft: 100,
    paddingRight: 100,
  },
  card: {
    minWidth: 275,
    marginTop: 12,
    marginBottom: 12,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  large: {
    width: theme.spacing(11),
    height: theme.spacing(11),
    margin: "auto",
  },
  pollBtn: {
    width: "100%",
    textDecoration:'none'
  },
}));
const Home = (props) => {
  const { questions, users, user, authedUser, unansweredQuestions } = props;
  const avatars = {
    sarahedo: require("../images/sarah.jpg"),
    tylermcginnis: require("../images/tyler.jpg"),
    johndoe: require("../images/dan.jpg"),
  };
  const UnansweredQ = Object.keys(questions)
    .filter((key) => unansweredQuestions.includes(key))
    .reduce((obj, key) => {
      obj[key] = questions[key];
      return obj;
    }, {});
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  if (authedUser === null) {
    return <Redirect to="/login" />;
  }

  return (
    <React.Fragment>
      <Container maxWidth="md" fixed className={classes.container}>
        <Box className={`${classes.root} table-border`} mt={3}>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Unanswered Questions" wrapped {...a11yProps(0)} />
              <Tab label="Answered Questions" wrapped {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel
              value={value}
              index={0}
              dir={theme.direction}
              children={
                <React.Fragment>
                  <Box>
                    {Object.keys(UnansweredQ).map((unAnswerId) => {
                      const questionUser = users[questions[unAnswerId].author];
                      return (
                        <Card className={classes.card} key={unAnswerId}>
                          <CardHeader
                            className="card-Header"
                            title={`${questionUser.name.substr(
                              0,
                              questionUser.name.indexOf(" ")
                            )} Says:`}
                            titleTypographyProps={{
                              variant: "h6",
                              color: "primary",
                            }}
                          />
                          <CardContent>
                            <Box style={{ display: "flex" }} height="100%">
                              <Box
                                textAlign="center"
                                style={{ width: "19%" }}
                                m={1}
                              >
                                <Avatar
                                  alt={questionUser.name}
                                  src={avatars[questionUser.id]}
                                  className={classes.large}
                                />
                              </Box>
                              <Box mx={1}>
                                <Divider orientation="vertical" />
                              </Box>
                              <Box style={{ width: "80%" }} m={1}>
                                <Box ml={1.5} mb={2.5}>
                                  <Typography variant="h5" gutterBottom>
                                    Would You Rather
                                  </Typography>
                                  <Typography
                                    gutterBottom
                                    color="textSecondary"
                                  >
                                    {`..... ${questions[unAnswerId].optionOne.text} .....`}
                                  </Typography>
                                </Box>

                                <CardActions>
                                  <NavLink to={`questions/${unAnswerId}`} className={classes.pollBtn} >
                                    <Button
                                      variant="outlined"
                                      size="small"
                                      color="primary"
                                      className={classes.pollBtn}
                                    >
                                      poll
                                    </Button>
                                  </NavLink>
                                </CardActions>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </Box>
                </React.Fragment>
              }
            />

            <TabPanel
              value={value}
              index={1}
              dir={theme.direction}
              children={
                <React.Fragment>
                  <Box>
                    {Object.keys(user.answers).map((answerId) => {
                      const questionUser = users[questions[answerId].author];
                      return (
                        <Card className={classes.card} key={answerId}>
                          <CardHeader
                            className="card-Header"
                            title={`${questionUser.name.substr(
                              0,
                              questionUser.name.indexOf(" ")
                            )} Says:`}
                            titleTypographyProps={{
                              variant: "h6",
                              color: "primary",
                            }}
                          />
                          <CardContent>
                            <Box style={{ display: "flex" }} height="100%">
                              <Box
                                textAlign="center"
                                style={{ width: "19%" }}
                                m={1}
                              >
                                <Avatar
                                  alt={questionUser.name}
                                  src={avatars[questionUser.id]}
                                  className={classes.large}
                                />
                              </Box>
                              <Box mx={1}>
                                <Divider orientation="vertical" />
                              </Box>
                              <Box style={{ width: "80%" }} m={1}>
                                <Box ml={1.5} mb={2.5}>
                                  <Typography variant="h5" gutterBottom>
                                    Would You Rather
                                  </Typography>
                                  <Typography
                                    gutterBottom
                                    color="textSecondary"
                                  >
                                    {`..... ${questions[answerId].optionOne.text} .....`}
                                  </Typography>
                                </Box>
                                <CardActions>
                                  <Link to={`questions/${answerId}`} className={classes.pollBtn}>
                                    <Button
                                      variant="outlined"
                                      size="small"
                                      color="primary"
                                      className={classes.pollBtn}
                                    >
                                      poll
                                    </Button>
                                  </Link>
                                </CardActions>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </Box>
                </React.Fragment>
              }
            />
          </SwipeableViews>
        </Box>
      </Container>
    </React.Fragment>
  );
};
function mapStateToProps({ users, questions, authedUser }) {
  let usersInfo = {};
  for (const userId in users) {
    usersInfo = {
      ...usersInfo,
      [userId]: (({ name, avatarURL, id, answers }) => ({
        name,
        avatarURL,
        id,
        answers,
      }))(users[userId]),
    };
  }
  const unansweredQuestions = Object.keys(questions)
    .filter(
      (id) =>
        !questions[id].optionOne.votes.includes(authedUser) &&
        !questions[id].optionTwo.votes.includes(authedUser)
    )
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);
  return {
    user: authedUser ? users[authedUser] : null,
    questions,
    users: usersInfo,
    authedUser,
    unansweredQuestions,
  };
}
export default connect(mapStateToProps)(Home);
