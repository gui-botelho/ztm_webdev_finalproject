const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn === true) {
    return (
      <nav
        className="f4 link dim black underline pa2 pointer"
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
        onClick={() => {
          onRouteChange("signin");
        }}
      >
        <p className="ma3">Sign out</p>
      </nav>
    );
  } else {
    return (
      <nav
        className="f4 link dim black underline ph3 pointer"
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <p
          className="ma3"
          onClick={() => {
            onRouteChange("signin");
          }}
        >
          Sign In
        </p>
        <p
          className="ma3"
          onClick={() => {
            onRouteChange("register");
          }}
        >
          Register
        </p>
      </nav>
    );
  }
};

export default Navigation;
