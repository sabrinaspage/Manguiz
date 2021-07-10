import React from "react";
import { CharacterCard } from "../../components/CharacterCard/index";
import firebase from "../../firebase";
import { useEffect, useState } from "react";

const ChooseACharacter = () => {
  const [characters, setCharacters] = useState(null);

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
  });

  return (
    <div>
        {characters
          ? characters.map((i) => <CharacterCard character={i} />)
          : "Loading..."}
    </div>
  );
};

export default ChooseACharacter;
