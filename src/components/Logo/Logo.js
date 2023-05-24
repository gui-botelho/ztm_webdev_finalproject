import Tilt from "react-parallax-tilt";
import "tachyons";

const Logo = () => {
  return (
    <div className="ma1 mt tc" style={{ width: "30vw" }}>
      <Tilt tiltReverse={true}>
        <img
          className="ma4 mt0"
          src="https://peginc.com/wp-content/uploads/2019/01/SW_LOGO_FP_2018.png"
          height={"auto"}
          alt="PegInc FanProduct license"
          style={{ maxHeight: 150 }}
        />
      </Tilt>
    </div>
  );
};

export default Logo;
