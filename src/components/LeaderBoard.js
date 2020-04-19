import React from "react";
import { connect } from "react-redux";
//material ui
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import { CardHeader } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingLeft: 100,
    paddingRight: 100,
  },
  card: {
    minWidth: 275,
    marginTop: 12,
    marginBottom: 12,
  },
  large: {
    width: theme.spacing(11),
    height: theme.spacing(11),
    margin: "auto",
  },
  small: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    margin: "auto",
  },
}));

const LeaderBoard = (props) => {
  const { users } = props;
  const classes = useStyles();
  const avatars = {
    sarahedo: require("../images/sarah.jpg"),
    tylermcginnis: require("../images/tyler.jpg"),
    johndoe: require("../images/dan.jpg"),
  };
  
  return (
    <Container maxWidth="md" className={classes.container}>
      {Object.keys(users).map((userId) => (
        <Card className={classes.card} key={userId}>
          <CardContent>
            <Box style={{ display: "flex" }} height="100%">
              <Box
                textAlign="center"
                style={{ width: "19%", display: "flex" }}
                m={1}
              >
                <Avatar
                  alt={users[userId].name}
                  src={avatars[userId]}
                  className={classes.large}
                />
              </Box>
              <Box mx={1}>
                <Divider orientation="vertical" />
              </Box>
              <Box style={{ width: "60%" }} m={1}>
                <Box ml={1.5}>
                  <Typography variant="h5" gutterBottom>
                    {users[userId].name.substr(
                      0,
                      users[userId].name.indexOf(" ")
                    )}
                  </Typography>
                  <Box
                    my={1}
                    mt={4}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography gutterBottom color="textSecondary">
                      Answered Questions
                    </Typography>
                    <span>{Object.keys(users[userId].answers).length}</span>
                  </Box>
                  <Box
                    my={1}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography gutterBottom color="textSecondary">
                      Created Question
                    </Typography>
                    <span color="textSecondary">
                      {users[userId].questions.length}
                    </span>
                  </Box>
                </Box>
              </Box>
              <Box mx={1}>
                <Divider orientation="vertical" />
              </Box>
              <Box textAlign="center" style={{ width: "19%" }}>
                <Card>
                  <CardHeader
                    title="Score"
                    titleTypographyProps={{ variant: "h5", color: "primary" }}
                  />
                  <Divider />
                  <CardContent>
                    <Avatar
                      style={{ backgroundColor: "#3f51b5" }}
                      className={classes.small}
                    >
                      {users[userId].questions.length +
                        Object.keys(users[userId].answers).length}
                    </Avatar>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default connect(mapStateToProps)(LeaderBoard);
