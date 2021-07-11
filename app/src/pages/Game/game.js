import React, { Component, useState, useEffect } from "react";
import "./game.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import firebase, { db } from "../../firebase";
import { useHistory } from "react-router-dom";

// game components
import KanaDisplay from "../../components/Game/kanaDisplay";
import AnswerChoices from "../../components/Game/answerChoices";

class Game extends Component {
  /* 
    For now, dummy values are being used for the translations and origin words
    Basic flow for now is that answers will be stored in the questions object,
    following this structure:

    ["english", "japanese", "kana"]

  */
  constructor(props) {
    super(props);
    this.nextStep = this.nextStep.bind(this);
    this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);

    // lifted some code from componentDidMount, so i can use
    // that for start page
    const questionText = [
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
    ];

    const question_count = 10;

    const answerCount = questionText.length;

    let temparray = [];

    let i = 0;

    while (temparray.length < 5) {
      let newans = Math.floor(Math.random() * answerCount);
      if (temparray.indexOf(newans) === -1) {
        temparray.push(newans);
      }
    }

    temparray.splice(Math.floor(Math.random() * 5), 1);

    const choicesarray = temparray.map((x) => questionText[x]);

    this.state = {
      current_image:
        "https://st4.depositphotos.com/20363444/23767/i/1600/depositphotos_237673462-stock-photo-handsome-happy-young-man-waving.jpg",
      questions: questionText,
      correct: 0,
      incorrect: 0,
      answer_history: Array(question_count).fill("unanswered"),
      translation_number: 0,
      current_choices: choicesarray,
      correct_choice: choicesarray[Math.floor(Math.random() * 4)],

      quiz_begun: false,
      quiz_complete: false,
    };
  }

  // Most of the confusing logic has been moved into nextStep; I've removed around 4 functions
  nextStep(correct) {
    // generate new answer choices
    const answerCount = this.state.questions.length;

    let temparray = [];

    let i = 0;

    while (temparray.length < 5) {
      let newans = Math.floor(Math.random() * answerCount);
      if (temparray.indexOf(newans) === -1) {
        temparray.push(newans);
      }
    }

    temparray.splice(Math.floor(Math.random() * 5), 1);

    const choicesarray = temparray.map((x) => this.state.questions[x]);

    // data for the progress bar at the top
    const temphistory = this.state.answer_history.slice();
    temphistory.splice(
      this.state.translation_number,
      1,
      correct ? "right" : "wrong"
    );


    // Update state, check if game is complete.
    if (correct) {
      this.setState((state) => {
        return {
          correct: state.correct + 1,
          translation_number: state.translation_number + 1,
          current_choices: choicesarray,
          correct_choice: choicesarray[Math.floor(Math.random() * 4)],
          answer_history: temphistory,
        };
      });
    } else {
      this.setState((state) => {
        return {
          incorrect: state.incorrect + 1,
          translation_number: state.translation_number + 1,
          current_choices: choicesarray,
          correct_choice: choicesarray[Math.floor(Math.random() * 4)],
          answer_history: temphistory,
        };
      });
    }
    if (this.state.translation_number === 10) {
      this.endGame();
    }
  }

  startGame() {
    this.setState({
      quiz_begun: true,
    });
  }

  endGame() {
    this.setState({
      quiz_begun: false,
      quiz_complete: true,
    });
  }

  render() {
    // unanswered, right, wrong
    const progresstracker = this.state.answer_history.map((value) => (
      <div className={"prog " + value}>&nbsp;</div>
    ));

    // Start screen
    if (!this.state.quiz_begun && !this.state.quiz_complete) {
      return (
        <div className="Game">
          <StartPage startGame={this.startGame} />
        </div>
      );
    } else if (this.state.quiz_complete) {
      // Showing endcard
      return (
        <div className="Game">
          <EndPage
            correct={this.state.correct}
            incorrect={this.state.incorrect}
            startGame={this.startGame}
          />
        </div>
      );
    } else {
      // Playing the game
      return (
        <div className="Game">
          <div className="progbar">{progresstracker}</div>
          <div className="question-container">
            <div className="drawing-box">
              <img src={this.state.current_image} alt="" />
            </div>
            <div className="question-box">
              <KanaDisplay
                kana={this.state.correct_choice[2]}
                text={this.state.correct_choice[1]}
              />
              <AnswerChoices
                correct={this.state.correct_choice}
                choices={this.state.current_choices}
                signalNext={this.nextStep}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}

function StartPage(props) {
  return (
    <div className="Start">
      <div className="welcome-box">
        <p>
          Ready to practice your Japanese by translating phrases into their
          English counterparts?
        </p>
        <Button
          onClick={() => {
            props.startGame();
          }}
          variant="outline-primary"
          size="lg"
          block
        >
          Start / Hajimeru / 始める
        </Button>
      </div>
    </div>
  );
}

// Communicate with DB here, whether through a function, or
// routing the user away
function EndPage(props) {
  const history = useHistory();

  let message = "Wow!";
  let submessage = "A placeholder!";

  if (props.correct > props.incorrect) {
    message = "Impressive!";
    submessage = "You got more right than wrong. Good work! 🎉";
  } else if (props.correct === props.incorrect) {
    message = "Good try.";
    submessage =
      "Nothing's wrong with a little equality, but study more phrases. (Watching anime helps! 😉)";
  } else {
    message = "Not great...";
    submessage =
      "With a bit more effort and attention, you'll get more right next time! 💪";
  }

  useEffect(() => {
    var user = firebase.auth().currentUser;
    console.log(user);

    if (user) {
      db.collection("user-points").doc(user.uid).update({
        correct: props.correct,
        incorrect: props.incorrect,
      });
    }
  }, [props]);

  return (
    <div className="Start">
      <div className="finish-box">
        <h1>{message}</h1>
        <span className="scores">
          <div className="corrects">
            Correct:
            <span>{props.correct}</span>
          </div>
          <div className="incorrects">
            Incorrect:
            <span>{props.incorrect}</span>
          </div>
        </span>
        <p>{submessage}</p>
        <Button
          onClick={(e) => {
            history.push("/leaderboard");
          }}
          variant="outline-primary"
          size="md"
        >
          Checkout the Leaderboard!
        </Button>
        <Button
          onClick={(e) => {
            window.location.reload(e);
          }}
          variant="outline-primary"
          size="md"
        >
          Play Again!
        </Button>
      </div>
    </div>
  );
}

export default Game;
