import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = initializeApp({
    apiKey: 'AIzaSyDLiZs17HJ2eOQWfiiwuyCXIHW3qJTaGb8',
    authDomain: 'winecode-e8f6f.firebaseapp.com',
    //databaseURL: 'https://project-id.firebaseio.com',
    projectId: 'winecode-e8f6f',
    storageBucket: 'winecode-e8f6f.appspot.com',
    messagingSenderId: '441215028866',
    appId: '1:441215028866:web:2ae7755c70a3abfb60ae9b',
    measurementId: 'G-CB87P1432X',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(firebaseApp);