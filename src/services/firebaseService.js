import { initializeApp } from 'firebase/app';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'statfy.firebaseapp.com',
  databaseURL: 'https://statfy-default-rtdb.firebaseio.com',
  projectId: 'statfy',
  storageBucket: 'statfy.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
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
