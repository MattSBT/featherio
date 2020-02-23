import React, { Component } from "react";
import "./Signup.css";
import Error from "../error/Error";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      confPassword: "",
      userError: "",
      emailError: "",
      passError: "",
      passConfError: "",
      isDisabled: true,
      errorsActive: false
    };

    this.validateUsername = this.validateUsername.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.getInput = this.getInput.bind(this);
    this.matchPassword = this.matchPassword.bind(this);
    this.checkAllFields = this.checkAllFields.bind(this);
    this.changeSubmitState = this.changeSubmitState.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }
  componentDidMount() {
    //Needed to add this to get around the onBlur Bug that React currently has randomly not firing

    document
      .getElementById("password")
      .addEventListener("blur", this.validatePassword);
    document
      .getElementById("username")
      .addEventListener("blur", this.validateUsername);
    document
      .getElementById("email")
      .addEventListener("blur", this.validateEmail);
    document
      .getElementById("confPassword")
      .addEventListener("blur", this.matchPassword);
  }
  // Set state props based off of Name of the fields
  getInput(e) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value
    });
    if (name === "confPassword") {
      this.matchPassword();
    }
  }

  // Handle of Submit State Start
  checkAllFields() {
    if (
      this.state.username.length >= 1 &&
      this.state.email.length >= 1 &&
      this.state.password.length >= 1 &&
      this.state.confPassword.length >= 1 &&
      this.state.emailError === "" &&
      this.state.userError === "" &&
      this.state.passError === "" &&
      this.state.passConfError === ""
    ) {
      this.changeSubmitState(false);
    } else {
      this.changeSubmitState(true);
    }
  }
  changeSubmitState(buttonState) {
    this.setState({
      isDisabled: buttonState
    });
  }
  // Handle of Submit State End

  // Validation Start
  validateUsername() {
    this.setState({
      userError: !this.state.username ? (
        <Error message={"Must Enter a Valid Username"} />
      ) : (
        ""
      )
    });
    if (!this.state.userError) {
      this.checkAllFields();
    }
  }
  validateEmail() {
    let email = this.state.email;

    this.setState({
      emailError: !email.match(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      ) ? (
        <Error message={"Must Enter a Valid Email Address"} />
      ) : (
        ""
      )
    });
    if (!this.state.emailError) {
      this.checkAllFields();
    }
  }
  validatePassword() {
    this.setState({
      passError: !this.state.password ? (
        <Error message={"Password Cannot be blank"} />
      ) : (
        ""
      )
    });
    if (!this.state.passError) {
      this.checkAllFields();
    }
  }
  matchPassword() {
    let password = this.state.password;
    let confPassword = this.state.confPassword;

    this.setState({
      passConfError:
        password !== confPassword ? (
          <Error message={"Passwords Must Match"} />
        ) : (
          ""
        )
    });

    if (!this.state.passConfError) {
      this.checkAllFields();
    }
  }

  // Validation End

  render() {
    return (
      <div className="form">
        <form>
          <div className="field">
            <label className="label">Username</label>
            <br />
            <input
              required
              maxLength="15"
              id="username"
              type="text"
              name="username"
              onBlur={this.validateUsername}
              onChange={this.getInput}
            ></input>

            <div>{this.state.userError}</div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <br />
            <input
              required
              type="text"
              id="email"
              name="email"
              onBlur={this.validateEmail}
              onChange={this.getInput}
            ></input>

            <div>{this.state.emailError}</div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <br />
            <input
              required
              id="password"
              type="password"
              name="password"
              onBlur={this.validatePassword}
              onChange={this.getInput}
            ></input>

            <div>{this.state.passError}</div>
          </div>
          <div className="field">
            <label className="label">
              Confirm Password
              <br />
            </label>
            <input
              id="confPassword"
              required
              type="password"
              name="confPassword"
              onBlur={this.matchPassword}
              onChange={this.getInput}
            ></input>

            <div>{this.state.passConfError}</div>
          </div>
          <div className="field">
            <button
              onFocus={this.matchPassword}
              type="submit"
              disabled={this.state.isDisabled}
            >
              Create your Feather Account
            </button>
          </div>
        </form>
      </div>
    );
  }
}
