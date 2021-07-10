import React, { Component, useState } from "react";
import "./styles/game.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";


class Game extends Component {
  /* 
    For now, dummy values are being used for the translations and origin words
    Basic flow for now is that answers will be stored in the questions object,
    following this structure:

    ["english", "japanese", "kana"]

    */
  constructor(props) {
    super(props);
    this.randomAnswerChoices = this.randomAnswerChoices.bind(this);
    this.updateScore = this.updateScore.bind(this)

    this.state = {
      current_image:
        "https://st4.depositphotos.com/20363444/23767/i/1600/depositphotos_237673462-stock-photo-handsome-happy-young-man-waving.jpg",
      translation_number: 0,
      questions: [
        ["Thank you", "Arigatou gozaimasu", "ありがとうございます"],
        ["Yes", "Hai", "はい"],
        ["No", "Iie", "いいえ"],
        ["Excuse me", "Sumimasen", "すみません"],

        ["Hello", "Konichiwa", "こんにちは"],
        ["Good morning", "Ohayō gozaimasu", "おはようございます"],
        ["Good evening", "Konbanwa", "こんばんは"],
        ["Good night", "O-yasumi nasai.", "おやすみなさい"],

        ["Moron", "Aho", "あほ"],
        ["Stupid", "Baka", "バカ"],
        ["Demon", "Akuma", "悪魔"],
        ["Dream", "Yume", "夢"],

        ["Thank goodness", "Yokatta", "よかった"],
        ["No way!", "Iyada", "いやだ"],
        ["Awesome", "Sugoi", "すごい"],
        ["Run", "Jikko", "実行"],

        ["Awful", "Hidoi", "ひどい"],
        ["Sorry", "Gomennasai", "ごめんなさい"],
        ["Please", "O-negai shimasu.", "おねがいします"],
        ["No good", "Dame", "駄目"],

        ["Ours", "Watashitachi no mono", "私たちのもの"],
        ["My", "Boku no", "僕の"],
        ["His", "Kare no", "彼の"],
        ["Hers", "Kanojo no", "彼女の"],
      ],
      correct: 0,
      incorrect: 0,
      current_choices: [0, 2, 1, 3],
      correct_choice: 0,
    };
  }

  randomAnswerChoices() {
    const answerCount = this.state.questions.length;

    var temparray = [];

    var i = 0;

    while (temparray.length < 5) {
      var newans = Math.floor(Math.random() * answerCount);
      if (temparray.indexOf(newans) === -1) {
        temparray.push(newans);
      }
    }

    temparray.splice(Math.floor(Math.random() * 5), 1);

    this.setState({
      current_choices: temparray,
      correct_choice: Math.floor(Math.random() * 4),
    });
  }

  updateScore(correct) {
      if (correct) {
          this.setState(state => ({
            correct: state.correct + 1,
          }))
          console.log("✅")
      }
      else {
        this.setState(state => ({
            incorrect: state.incorrect + 1,
          }))
          console.log("❌")
      }
  }

  componentDidMount() {
    this.randomAnswerChoices();
  }

  render() {
    return (
      <div className="Game">
        <div className="question-container">
          <div className="drawing-box">
            <img src={this.state.current_image} alt="" />
          </div>
          <QuestionBox
            choices={this.state.current_choices}
            answer={this.state.correct_choice}
            questionText={this.state.questions}
            nextQuestion={this.randomAnswerChoices}
            updateScore={this.updateScore}
          />
        </div>
      </div>
    );
  }
}

function QuestionBox(props) {
  const [incorrect, highlightIncorrect] = useState("outline-dark");
  const [correct, highlightCorrect] = useState("outline-dark");
  const [waiting, toggleWait] = useState(false);
  const waitTime = 2000;

  const answerChoices = props.choices.map(
    (choice) => props.questionText[choice]
  );

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const signalNext = props.nextQuestion;

  const answerSelected = (correct) => {
    if (waiting) {
      return;
    }

    props.updateScore(correct);
    toggleWait(true);
    highlightCorrect("success");
    highlightIncorrect("danger");
    sleep(waitTime).then(function () {
      highlightCorrect("outline-dark");
      highlightIncorrect("outline-dark");
      signalNext();
      toggleWait(false);
    });
  };

  const answerButtons = answerChoices.map((choice) => (
    <Button
      key={choice[0]}
      onClick={() =>
        answerSelected(
          answerChoices.indexOf(choice) === props.answer ? true : false
        )
      }
      variant={
        answerChoices.indexOf(choice) === props.answer ? correct : incorrect
      }
      size="lg"
      block
    >
      {choice[0]}
    </Button>
  ));

  return (
    <div className="question-box">
      <div className="japanese-text">
        <span className="kana">{answerChoices[props.answer][2]}</span>
        <br />
        <span className="pronunciation">{answerChoices[props.answer][1]}</span>
      </div>
      <div className="answer-choices">{answerButtons}</div>
    </div>
  );
}

export default Game;
