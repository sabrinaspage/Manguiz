import React from "react";
import Button from "react-bootstrap/Button";
import "./kanaDisplay.css";

function KanaDisplay(props) {
  const kana = props.kana;
  const text = props.text;
  return (
    <div className="japanese-text">
      <span className="kana">{kana}</span>
      <br />
      <span className="pronunciation">{text}</span>
    </div>
  );
}

export default KanaDisplay;
