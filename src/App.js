import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import "./App.css";
import ImageLink from "./components/ImageLink/ImageLink";
import Rank from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";
import { Component } from "react";
import Clarifai from "clarifai";
import FaceRecognition from "./components/FaceRecog/FaceRecog";
import clarifai_api_key from "./calrifai";
import SignIn from "./components/SignIn/SignIn";
import Register from "./Register/Register";
window.process = {};

const app = new Clarifai.App({
  apiKey: clarifai_api_key,
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      ImgUrl: "",
      box: [],
      route: "signin",
      isSignedIn: false,
      user: {
        id: "",
        email: "",
        name: "",
        entries: "",
        joined: "",
      },
    };
  }

  loadUser = (userInfo) => {
    this.setState({
      user: {
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
        entries: userInfo.entries,
        joined: userInfo.joined,
      },
    });
  };

  componentDidMount() {
    fetch("http://localhost:3000")
      .then((response) => response.json())
      .then(console.log);
  }
  locateFace = (data) => {
    let faces_found = [];
    for (let face = 0; face < data.outputs[0].data.regions.length; face++) {
      const clarifaiFace =
        data.outputs[0].data.regions[face].region_info.bounding_box;

      const image = document.getElementById("inputimage");
      const width = Number(image.width);
      const height = Number(image.height);

      faces_found.push({
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height,
        probability: data.outputs[0].data.regions[face].value,
      });
    }
    console.log(faces_found);
    return faces_found;
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onSubmit = () => {
    this.setState({ ImgUrl: this.state.input });
    app.models
      .predict(
        {
          id: "face-detection",
          name: "face-detection",
          version: app.apiKey,
          type: "visual-detector",
        },
        this.state.input
      )
      .then(
        (response) => {
          if (response) {
            fetch("http://localhost:3000/image", {
              method: "put",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: this.state.user.id,
              }),
            })
              .then((response) => response.json())
              .then((count) => {
                this.setState(
                  Object.assign(this.state.user, { entries: count })
                );
              });
          }
          this.displayFaceBox(this.locateFace(response));
          console.log(response);
        },
        (err) => {
          console.log("Error: " + err);
        }
      );
  };

  onRouteChange = (route) => {
    if (route === "nein") {
      this.setState({ isSignedIn: true });
    } else {
      this.setState({ isSignedIn: false });
    }
    this.setState({ route: route });
  };

  render() {
    return (
      <div className="App">
        <ParticlesBg type="fountain" bg={true} config={{ v: 0.1 }} />
        <Navigation
          isSignedIn={this.state.isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {this.state.route === "signin" ? (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : this.state.route === "nein" ? (
          <div>
            <Rank
              userName={this.state.user.name}
              userEntries={this.state.user.entries}
            />
            <Logo width={"30vw"} />
            <ImageLink
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
            />
            <FaceRecognition box={this.state.box} ImgUrl={this.state.ImgUrl} />
          </div>
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
