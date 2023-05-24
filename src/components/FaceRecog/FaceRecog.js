import React from "react";
import "./FaceRecog.css";

const FaceRecognition = ({ ImgUrl, box }) => {
  const jsx_elements = box.map((item, index) => {
    return (
      <div className="elementContainer">
        <div
          key={index}
          className="bounding-box"
          style={{
            top: item.topRow,
            right: item.rightCol,
            bottom: item.bottomRow,
            left: item.leftCol,
          }}
        ></div>
        <div
          className="prob"
          style={{
            top: item.topRow,
            left: item.leftCol,
          }}
        >
          Prboability: {(item.probability * 100).toFixed(2)}%
        </div>
      </div>
    );
  });

  return (
    <div className="flex justify-center">
      <div className="absolute mt3">
        <img id="inputimage" alt="" src={ImgUrl} style={{ maxHeight: 350 }} />

        <div>{jsx_elements}</div>
      </div>
    </div>
  );
};

export default FaceRecognition;
