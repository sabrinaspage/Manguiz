import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { Container } from "react-bootstrap";
import NaviBar from "../../components/NaviBar";

import AuthProvider from "../../contexts/AuthContext";

import {CardCollection, ScoreCounter, TitleCard, LeaderboardPos} from "../../components/Account/cardCollection";

import UserSection from "../../components/Account/userSection";

function AccountPage() {
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
            </CardCollection>
            <div className="character-image">
              <img src="https://via.placeholder.com/768x1086"/>
            </div>
          </div>
        </UserSection>
      </div>
    </AuthProvider>
  );
}

export default AccountPage;
