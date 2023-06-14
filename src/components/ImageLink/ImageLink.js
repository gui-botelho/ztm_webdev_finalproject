import React from "react";

const ImageLink = ({ onInputChange, onSubmit }) => {
  return (
    <div>
      <p className="white f3">
        {
          "This little alien will check your image and find faces in it. Insert a url and give it a try!"
        }
      </p>
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
