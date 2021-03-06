import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { Component } from "react";
import logo from "../media/logo.jpg";

import { auth, firestore } from "../firebase";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      show_progress: false,
      password_error: null,
      email_error: null,
    };
    this.handleChange = this.handleChange.bind();
    this.login = this.login.bind();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  login = () => {
    let valid_data = true;
    //Set email and password error to null
    this.state.email_error = null;
    this.state.password_error = null;
    if (this.state.email === "") {
      this.state.email_error = "Required Email";
      valid_data = false;
    }
    if (this.state.password === "") {
      this.state.password_error = "Required Password";
      valid_data = false;
    }

    if (valid_data) {
      this.state.show_progress = true;
    }

    this.setState({
      update: true,
    });

    if (valid_data) {
      //Login
      firestore
        .collection("USERS")
        .where("email", "==", this.state.email)
        .where("isAdmin", "==", true)
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            auth
              .signInWithEmailAndPassword(this.state.email, this.state.password)
              .then((res) => {
                console.log(res);
                this.props.history.replace("/");
              })
              .catch((err) => {
                if (err.code === "auth/wrong-password") {
                  this.state.password_error = "Incorrect Password";
                }
                this.setState({
                  show_progress: false,
                });
              });
          } else {
            this.state.email_error = "Not Allowed!";
            this.setState({
              show_progress: false,
            });
          }
        });
    } else {
    }
  };

  render() {
    return (
      <Container maxWidth="sm">
        <Box
          bgcolor="white"
          boxShadow="2"
          borderRadius="8px"
          textAlign="center"
          p="24px"
          mt="50px"
        >
          <img src={logo} height="75px" />
          <Typography variant="h5" color="textSecondary">
            ADMIN
          </Typography>
          <TextField
            label="Email"
            id="outlined-size-small"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            error={this.state.email_error != null}
            helperText={this.state.email_error}
            onChange={this.handleChange}
            color="secondary"
            size="small"
          />
          <TextField
            label="Password"
            id="outlined-size-small"
            type="Password"
            name="password"
            onChange={this.handleChange}
            error={this.state.password_error != null}
            helperText={this.state.password_error}
            variant="outlined"
            fullWidth
            margin="normal"
            color="secondary"
            size="small"
          />
          <br />
          <br />
          {this.state.show_progress ? (
            <CircularProgress size={25} thickness={6} color="primary" />
          ) : null}
          <br />
          <br />
          <Button variant="contained" color="primary" onClick={this.login}>
            Login
          </Button>
        </Box>
      </Container>
    );
  }
}

export default Login;
