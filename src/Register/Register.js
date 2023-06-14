import React from "react";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      NewEmail: "",
      NewPass: "",
      NewName: "",
    };
  }

  onEmailChange = (event) => {
    this.setState({ NewEmail: event.target.value });
  };

  onPassChange = (event) => {
    this.setState({ NewPass: event.target.value });
  };

  onNameChange = (event) => {
    this.setState({ NewName: event.target.value });
  };

  onSubmitSignIn = (event) => {
    event.preventDefault();

    fetch("http://localhost:3000/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.NewEmail,
        password: this.state.NewPass,
        name: this.state.NewName,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user) {
          this.props.loadUser(user);
          this.props.onRouteChange("nein");
        }
      });
  };

  render() {
    return (
      <article className="br2 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-1 mw5 center bordering">
        <main className="pa4 black-80">
          <form className="measure center">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Name
                </label>
                <input
                  onChange={this.onNameChange}
                  id="users_name"
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                />
              </div>
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
                value="Register"
                onClick={this.onSubmitSignIn}
              />
            </div>
            <div className="lh-copy mt3"></div>
          </form>
        </main>
      </article>
    );
  }
}

export default Register;
