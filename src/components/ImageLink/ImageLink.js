import React from "react";

const ImageLink = ({ onInputChange, onSubmit }) => {
  return (
    <div>
      <p className="white f3">{"Face detector"}</p>
      <div>
        <input
          className="w-60"
          type="text"
          placeholder="Insert image link here"
          onInput={onInputChange}
        ></input>
        <button className="w-20 grow" onClick={onSubmit}>
          Detect
        </button>
      </div>
    </div>
  );
};

export default ImageLink;
