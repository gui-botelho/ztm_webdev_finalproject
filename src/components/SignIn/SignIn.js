import React from "react";
import "./SignIn.css";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPass: "",
    };
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  onPassChange = (event) => {
    this.setState({ signInPass: event.target.value });
  };

  onSubmitSignIn = (event) => {
    event.preventDefault();

    fetch("http://localhost:3000/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPass,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          this.props.loadUser(data);
          this.props.onRouteChange("nein");
        }
      });
  };

  render() {
    return (
      <article className="br2 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-1 mw5 center  bordering">
        <main className="pa4 black-80">
          <form className="measure center">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  onChange={this.onEmailChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={this.onPassChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
                onClick={this.onSubmitSignIn}
              />
            </div>
            <div className="lh-copy mt3">
              <a
                href="#0"
                className="f6 link dim black db"
                onClick={() => this.props.onRouteChange("register")}
              >
                Register
              </a>
            </div>
          </form>
        </main>
      </article>
    );
  }
}

export default SignIn;
