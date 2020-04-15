import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";
//material ui
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Avatar from "@material-ui/core/Avatar";

const ReactReduxLogo = require("../images/React-Redux.jpeg");
const useStyles = makeStyles({
  root: {
    maxWidth: 800,
    maxHeight: 800,
  },
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
  selectUser: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
  },
});
function LogIn(props) {
  const classes = useStyles();
  const { users, authedUser, dispatch } = props;
  const avatars = {
    sarahedo: require("../images/sarah.jpg"),
    tylermcginnis: require("../images/tyler.jpg"),
    johndoe: require("../images/dan.jpg"),
  };
  let chosedUser = null;
  const updateChosedUser = (newValue) => {
    chosedUser = newValue;
  };
  const updateLoggedUser = () => {
    if (chosedUser !== null) {
      dispatch(setAuthedUser(chosedUser.id));
    } else {
      alert("please select user to login");
    }
  };
  if (authedUser) {
    return <Redirect to="/" />;
  }
  return (
    <Container maxWidth="xs">
      <Box mt={6}>
        <Card className={classes.root}>
          <Box textAlign="center">
            <CardHeader
              title="Would You Rather ..?"
              titleTypographyProps={{
                variant: "h4",
                color: "primary",
              }}
              subheader="Please Login to continue .."
            />
          </Box>
          <CardMedia
            component="img"
            alt="React Redux"
            height="360"
            image={ReactReduxLogo}
            title="React-Redux"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h4"
              color="primary"
              component="h2"
            >
              <Box textAlign="center">Login</Box>
            </Typography>
          </CardContent>
          <Box mb={2}>
            <CardActions className={classes.selectUser}>
              <Autocomplete
                id="country-select-demo"
                style={{ width: 300 }}
                options={Object.values(users)}
                getOptionLabel={(option) => option.name}
                classes={{
                  option: classes.option,
                }}
                autoHighlight
                renderOption={(option) => (
                  <React.Fragment>
                    <Avatar alt={option.name} src={avatars[option.id]} />
                    <Box ml={2}>
                      <span>{option.name}</span>
                    </Box>
                  </React.Fragment>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a user"
                    variant="outlined"
                  />
                )}
                onChange={(e, newValue) => updateChosedUser(newValue)}
              />
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={updateLoggedUser}
                >
                  LogIn
                </Button>
              </Box>
            </CardActions>
          </Box>
        </Card>
      </Box>
    </Container>
  );
}

function mapStateToProps({ users, authedUser }) {
  return {
    users,
    authedUser,
  };
}
export default connect(mapStateToProps)(LogIn);
