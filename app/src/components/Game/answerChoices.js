import React, { Component, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "./answerChoices.css";

function AnswerChoices(props) {
  const [incorrect, highlightIncorrect] = useState("outline-dark");
  const [correct, highlightCorrect] = useState("outline-dark");
  const [waiting, toggleWait] = useState(false);

  const correctAnswer = props.correct;
  const answersArray = props.choices;

  const waitTime = 500;
  const signalNext = props.signalNext;

  function answerChosen(choice) {
    if (waiting) {
      return;
    }
    toggleWait(true);

    if (choice === correctAnswer[0]) {
      //correct answer chosen, based on English match
      highlightCorrect("success");
      setTimeout(function () {
        highlightCorrect("outline-dark");
        signalNext(true);
        toggleWait(false);
      }, 500);
    } else {
      highlightIncorrect("danger");
      highlightCorrect("success");
      setTimeout(function () {
        highlightCorrect("outline-dark");
        highlightIncorrect("outline-dark");
        signalNext(false);
        toggleWait(false);
      }, 2000);
    }
  }

  const answerButtons = answersArray.map((choice) => (
    <Button
      key={choice[0]}
      onClick={() => {
        answerChosen(choice[0]);
      }}
      variant={choice[0] === correctAnswer[0] ? correct : incorrect}
      size="lg"
      block
    >
      {choice[0]}
    </Button>
  ));

  return <div className="answer-choices">{answerButtons}</div>;
}

export default AnswerChoices;
