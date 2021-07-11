import firebase from "firebase/app"
import "firebase/firestore";
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCCA5OGOp3j3TQBw5b87ByLtP6Xzi3MfDU",
    authDomain: "hacktoon-d85b6.firebaseapp.com",
    databaseURL: "https://hacktoon-d85b6-default-rtdb.firebaseio.com",
    projectId: "hacktoon-d85b6",
    storageBucket: "hacktoon-d85b6.appspot.com",
    messagingSenderId: "132924006034",
    appId: "1:132924006034:web:cc844b175134d5d547904b",
    measurementId: "G-EPB4GEZLH9"
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const db = app.firestore();
export default app;