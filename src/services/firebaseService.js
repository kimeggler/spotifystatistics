import { initializeApp } from 'firebase/app';
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA4jr51WOs1U3FgSfCcDsD5eTpvgKWGQPs',
  authDomain: 'statfy.firebaseapp.com',
  databaseURL: 'https://statfy-default-rtdb.firebaseio.com',
  projectId: 'statfy',
  storageBucket: 'statfy.appspot.com',
  messagingSenderId: '414085849004',
  appId: '1:414085849004:web:0ce4a55acbccfa807d6409',
  measurementId: 'G-4YF4E1EZB6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const feedbackCollection = collection(db, 'feedback');
console.log(getDocs(feedbackCollection));

const saveFeedback = async payload => {
  await addDoc(feedbackCollection, payload);
};

export default saveFeedback;
