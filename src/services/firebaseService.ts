import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  CollectionReference,
  DocumentData,
  Firestore,
  getFirestore,
} from 'firebase/firestore';

// Firebase configuration interface
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

// Feedback payload interface
interface FeedbackPayload {
  name?: string;
  email?: string;
  message: string;
  timestamp?: Date;
  rating?: number;
  type?: string;
  [key: string]: any;
}

// Your web app's Firebase configuration
const firebaseConfig: FirebaseConfig = {
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
const app: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);
const feedbackCollection: CollectionReference<DocumentData> = collection(db, 'feedback');

const saveFeedback = async (payload: FeedbackPayload): Promise<void> => {
  try {
    console.log('Saving feedback:', payload);
    await addDoc(feedbackCollection, {
      ...payload,
      timestamp: new Date(),
    });
    console.log('Feedback saved successfully');
  } catch (error) {
    console.error('Error saving feedback:', error);
    throw new Error('Failed to save feedback');
  }
};

export default saveFeedback;
export type { FeedbackPayload, FirebaseConfig };
