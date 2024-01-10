import { initializeApp } from 'firebase/app';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // eslint-disable-next-line no-undef
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'statfy.firebaseapp.com',
  databaseURL: 'https://statfy-default-rtdb.firebaseio.com',
  projectId: 'statfy',
  storageBucket: 'statfy.appspot.com',
  // eslint-disable-next-line no-undef
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  // eslint-disable-next-line no-undef
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // eslint-disable-next-line no-undef
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const feedbackCollection = collection(db, 'feedback');

const saveFeedback = async payload => {
  console.log(payload);
  await addDoc(feedbackCollection, payload);
};

export default saveFeedback;
