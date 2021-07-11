import React from "react";

export function CardCollection(props) {
  return <div className="card-collection">{props.children}</div>;
}

export function ScoreCounter(props) {
  return (
    <div className="card-box">
      <h2>Quiz Stats:</h2>
      <div className="horizontal-stack scorecounter">
        <div className="neutral">
          Taken
          <span>{(props.correct + props.incorrect) / 10}</span>
        </div>
        <div className="corrects">
          Correct
          <span>{props.correct}</span>
        </div>
        <div className="incorrects">
          Incorrect
          <span>{props.incorrect}</span>
        </div>
      </div>
    </div>
  );
}

export function TitleCard(props) {
  return (
    <div className="card-box">
      <h2>Current Title:</h2>
      <h3>{props.userTitle}</h3>
    </div>
  );
}

export function LeaderboardPos(props) {
  return (
    <div className="card-box">
      <h2>Rank:</h2>
      <h3>{"#"+props.rank}</h3>
    </div>
  );
}