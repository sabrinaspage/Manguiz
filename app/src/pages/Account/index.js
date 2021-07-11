import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import firebase from "../../firebase";
import { useState } from "react";

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
  const [imageURL, setImageURL] = useState()

  var user = firebase.auth().currentUser;
  console.log(user);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setImageURL(user.photoURL)
    }
  });

  return (
    <AuthProvider>
      <NaviBar />
      <div className="account-page">
        <UserSection>
          <div className="horizontal-stack">
            <CardCollection>
              <TitleCard userTitle="Hokage" />
              <ScoreCounter correct={20} incorrect={20} />
              <LeaderboardPos rank={30} />
              <NewCharacterCard url="/choose-a-character" />
            </CardCollection>
            <div className="character-image">
              <img
                src={
                  user ? imageURL : "https://via.placeholder.com/768x1086"
                }
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
