import React from "react";
import { CharacterGrid } from "../../components/CharacterGrid/index";
import { CharacterCard } from "../../components/CharacterCard/index";
import firebase from "../../firebase";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ChooseACharacter = () => {
  const [characters, setCharacters] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");
  const history = useHistory();

  var user = firebase.auth().currentUser;

  useEffect(() => {
    firebase
      .firestore()
      .collection("characters")
      .onSnapshot((snapshot) => {
        const newCharacters = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCharacters(newCharacters);
      });

    if (user && photo) {
      user.updateProfile({
        photoURL: photo.image,
      });
      console.log(user.photoURL);
    }
  }, [photo]);

  const handlePageChange = () => {
    if (!photo) {
      setError("Please select a character");
      return;
    }
    if (user && user.photoURL !== null) {
      history.push("/game");
    }
  };

  return (
    <div
      style={{
        display: "block",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 className="display-3 text-center"> Choose a Character </h1>
      <CharacterGrid>
        {characters
          ? characters.map((i) => (
              <CharacterCard
                key={i.id}
                character={i}
                onClick={() => {
                  setPhoto(i);
                  setError("");
                }}
              />
            ))
          : "Loading..."}
      </CharacterGrid>
      <SelectFormat>
        {photo ? <img src={photo.image} width="auto" height="180" /> : ""}
        {error && <span style={{color: "red"}}> Please choose a new identity. </span>}
      </SelectFormat>
      <SelectFormat>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={handlePageChange}
        >
          Confirm selection
        </button>
      </SelectFormat>
    </div>
  );
};

const SelectFormat = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      { children }
    </div>
  );
};

export default ChooseACharacter;