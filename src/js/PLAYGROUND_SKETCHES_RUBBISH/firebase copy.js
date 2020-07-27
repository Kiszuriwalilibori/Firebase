
// import firebase  from 'firebase';

// import app from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/database';



import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


const config = {
    apiKey: "AIzaSyDgXLfP7jDz8fFkgSexTngIupiNaabkJSc",
    authDomain: "unamo-1dbf1.firebaseapp.com",
    databaseURL: "https://unamo-1dbf1.firebaseio.com",
    projectId: "unamo-1dbf1",
    storageBucket: "unamo-1dbf1.appspot.com",
    messagingSenderId: "741997107372",
    appId: "1:741997107372:web:66630afae593423b17e709"
};
// firebase.initializeApp(config);

// export const itemsRef = firebase.database().ref('items');
// export const provider = new firebase.auth.GoogleAuthProvider();
// export const auth = firebase.auth();
// export default firebase;


//app.initializeApp(config);
firebase.initializeApp(config);
// var database = app.database();
var database = firebase.database();
export const itemsRef = database.ref('items');
// export const provider = new app.auth.GoogleAuthProvider();
export const provider = new firebase.auth.GoogleAuthProvider();
// export const auth = app.auth();
export const auth = firebase.auth();

//export default app;
export default firebase;