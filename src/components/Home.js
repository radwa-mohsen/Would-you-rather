// import Divider from "@material-ui/core/Divider";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemText from "@material-ui/core/ListItemText";
// import Avatar from "@material-ui/core/Avatar";
// import { Typography, Button } from "@material-ui/core";
// import { setAuthedUser } from "../actions/authedUser";

import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";
import { Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

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
    width: 500,
  },
  card: {
    minWidth: 275,
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
}));
const Home = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  if (props.authedUser === null) {
    return <Redirect to="/login" />;
  }

  return (
    <React.Fragment>
      <Container maxWidth="xs">
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
                    <Card className={classes.card}>
                      <CardContent>
                        <Typography
                          className={classes.title}
                          color="textSecondary"
                          gutterBottom
                        >
                          questions cards
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">poll</Button>
                      </CardActions>
                    </Card>
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
                    <Card className={classes.card}>
                      <CardContent>
                        <Typography
                          className={classes.title}
                          color="textSecondary"
                          gutterBottom
                        >
                          questions cards
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">poll</Button>
                      </CardActions>
                    </Card>
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
  return {
    user: authedUser ? users[authedUser] : null,
    questions,
    authedUser,
  };
}
export default connect(mapStateToProps)(Home);
