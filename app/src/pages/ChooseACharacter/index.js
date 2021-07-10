import React from "react";
import { CharacterCard, CharacterGrid } from "../../components/CharacterGrid/index";
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
    <CharacterGrid>
        {characters
          ? characters.map((i) => <CharacterCard character={i} />)
          : "Loading..."}
    </CharacterGrid>
  );
};

export default ChooseACharacter;
