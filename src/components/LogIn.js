import React, { Component } from "react";
import { connect } from "react-redux";
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
import { setAuthedUser } from "../actions/authedUser";

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
  },
});
function LogIn(props) {
  console.log("ta3ala nshof", props);
  const classes = useStyles();
  const { users, dispatch } = props;
  const avatars = {
    sarahedo: require("../images/sarah.jpg"),
    tylermcginnis: require("../images/tyler.jpg"),
    johndoe: require("../images/dan.jpg"),
  };
  const updateLoggedUser = (newValue) => {
    dispatch(setAuthedUser(newValue.id));
  };
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
                onChange={(e, newValue) => updateLoggedUser(newValue)}
              />
            </CardActions>
          </Box>
        </Card>
      </Box>
    </Container>
  );
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}
export default connect(mapStateToProps)(LogIn);
