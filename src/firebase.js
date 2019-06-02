import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDeLyV13JcASYxbD949-9LrkXcy-jzdk14",
    authDomain: "taleapp.firebaseapp.com",
    databaseURL: "https://taleapp.firebaseio.com",
    projectId: "taleapp",
    storageBucket: "taleapp.appspot.com",
    messagingSenderId: "216057693839",
    appId: "1:216057693839:web:26fe94434e76da52"
  };
firebase.initializeApp(firebaseConfig);

export default firebase;