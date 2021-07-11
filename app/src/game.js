import React, { Component, useState, useEffect } from "react";
import "./styles/game.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import firebase, { db } from "./firebase";
import { useHistory } from "react-router-dom";

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
    this.correctIncrement = this.correctIncrement.bind(this);
    this.incorrectIncrement = this.incorrectIncrement.bind(this);
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

    this.state = {
      current_image:
        "https://st4.depositphotos.com/20363444/23767/i/1600/depositphotos_237673462-stock-photo-handsome-happy-young-man-waving.jpg",
      questions: questionText,
      correct: 0,
      incorrect: 0,
      answer_history: Array(question_count).fill("unanswered"),
      translation_number: 0,
      current_choices: temparray,
      correct_choice: Math.floor(Math.random() * 4),

      quiz_begun: false,
      quiz_complete: false,
    };
  }

  nextStep() {
    if (this.state.translation_number === 10) {
      this.endGame();
    } else {
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

      this.setState({
        current_choices: temparray,
        correct_choice: Math.floor(Math.random() * 4),
      });
    }
  }

  correctIncrement() {
    const temparray = this.state.answer_history.slice();
    const tempcorrect = this.state.correct + 1;
    const temptranslation_number = this.state.translation_number + 1;
    temparray.splice(this.state.translation_number, 1, "right");
    this.setState({
      correct: tempcorrect,
      answer_history: temparray,
      translation_number: temptranslation_number,
    });
  }

  incorrectIncrement() {
    const temparray = this.state.answer_history.slice();
    const tempincorrect = this.state.incorrect + 1;
    const temptranslation_number = this.state.translation_number + 1;
    temparray.splice(this.state.translation_number, 1, "wrong");
    this.setState({
      incorrect: tempincorrect,
      answer_history: temparray,
      translation_number: temptranslation_number,
    });
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

  componentDidMount() {}

  render() {
    console.log(this.state.answer_history);
    // unanswered, right, wrong
    const progresstracker = this.state.answer_history.map((value) => (
      <div className={"prog " + value}>&nbsp;</div>
    ));

    if (!this.state.quiz_begun && !this.state.quiz_complete) {
      return (
        <div className="Game">
          <StartPage startGame={this.startGame} />
        </div>
      );
    } else if (this.state.quiz_complete) {
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
      return (
        <div className="Game">
          <div className="progbar">{progresstracker}</div>
          <div className="question-container">
            <div className="drawing-box">
              <img src={this.state.current_image} alt="" />
            </div>
            <QuestionBox
              choices={this.state.current_choices}
              answer={this.state.correct_choice}
              questionText={this.state.questions}
              nextQuestion={this.nextStep}
              correct={this.correctIncrement}
              incorrect={this.incorrectIncrement}
            />
          </div>
        </div>
      );
    }
  }
}

function QuestionBox(props) {
  const [incorrect, highlightIncorrect] = useState("outline-dark");
  const [correct, highlightCorrect] = useState("outline-dark");
  const [waiting, toggleWait] = useState(false);
  const waitTime = 500;

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

  const updateScore = (correct) => {
    if (correct) {
      props.correct();
    } else {
      props.incorrect();
    }
  };

  const answerButtons = answerChoices.map((choice) => (
    <Button
      key={choice[0]}
      onClick={() => {
        updateScore(
          answerChoices.indexOf(choice) === props.answer ? true : false
        );
        answerSelected(
          answerChoices.indexOf(choice) === props.answer ? true : false
        );
      }}
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
      db
        .collection("user-points")
        .doc(user.uid)
        .update({
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
