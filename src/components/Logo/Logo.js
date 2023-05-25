import Tilt from "react-parallax-tilt";
import "tachyons";
import alien from "./alien.png";

const Logo = () => {
  return (
    <div className="ma1 mt tc" style={{ width: "20vw" }}>
      <Tilt tiltReverse={true}>
        <img
          className="ma4 mt0"
          src={alien}
          height={"auto"}
          alt="PegInc FanProduct license"
          style={{ maxHeight: 100 }}
        />
      </Tilt>
    </div>
  );
};

export default Logo;
