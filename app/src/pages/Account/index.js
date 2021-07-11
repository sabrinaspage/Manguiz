import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import firebase, { db } from "../../firebase";
import { useState, useEffect } from "react";

import NaviBar from "../../components/NaviBar";
import AuthProvider from "../../contexts/AuthContext";
import {
  CardCollection,
  ScoreCounter,
  TitleCard,
  LeaderboardPos,
  NewCharacterCard,
} from "../../components/Account/cardCollection";
import UserSection from "../../components/Account/userSection";

function AccountPage() {
  const [imageURL, setImageURL] = useState();
  const [name, setName] = useState();
  const [correct, setCorrect] = useState();
  const [incorrect, setIncorrect] = useState();

  var user = firebase.auth().currentUser;
  console.log(user);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setImageURL(user.photoURL);
      async function getUserStats(user) {
        var user_characteristics = await db
          .collection("user-points")
          .doc(user.uid)
          .get();
        return user_characteristics.data();
      }
      var userStat = getUserStats(user);
      userStat.then((stat) => {
        if (stat) {
          setName(stat.displayName);
          setCorrect(stat.correct);
          setIncorrect(stat.incorrect);
        }
      });
    }
  });

  return (
    <AuthProvider>
      <NaviBar />
      <div className="account-page">
        <UserSection>
          <div className="horizontal-stack">
            <CardCollection>
              <TitleCard userTitle={name} />
              <ScoreCounter correct={correct} incorrect={incorrect} />
              <LeaderboardPos rank={30} />
              <NewCharacterCard url="/choose-a-character" />
            </CardCollection>
            <div className="character-image">
              <img
                src={user ? imageURL : "https://via.placeholder.com/768x1086"}
                alt=""
              />
            </div>
          </div>
        </UserSection>
      </div>
    </AuthProvider>
  );
}

export default AccountPage;
