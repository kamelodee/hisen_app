import firebase from 'firebase';

const firebaseApp = firebase.initializeApp(
    {
        apiKey: "AIzaSyCfeSiiBTmYc2wyaFF_-KsFzpSuB99U2UY",
        authDomain: "myburger-83040.firebaseapp.com",
        databaseURL: "https://myburger-83040.firebaseio.com",
        projectId: "myburger-83040",
        storageBucket: "myburger-83040.appspot.com",
        messagingSenderId: "479897759936",
        appId: "1:479897759936:web:116f4d1fadece2e5993d25",
        measurementId: "G-K7P245Z6E3"
   }
)

const db = firebaseApp.firestore();

const auth = firebaseApp.auth();

export {db,auth}