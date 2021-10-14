import * as React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export const FirebaseContext = React.createContext();

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: 'unamo-1dbf1.firebaseapp.com',
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: 'unamo-1dbf1',
    storageBucket: 'unamo-1dbf1.appspot.com',
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

export default class Firebase {
    constructor() {
        firebase.initializeApp(config);
        this.database = firebase.database();
        this.itemsRef = this.database.ref('items');
        this.connectedRef = this.database.ref('.info/connected');
        this.provider = new firebase.auth.GoogleAuthProvider();
        this.auth = firebase.auth();
    }
}
