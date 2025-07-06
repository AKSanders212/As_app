import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { environment } from '../environments/environment';  // adjust path as needed

// Creates a new Firebase app initialized through the environment.ts with Firebase
const app = initializeApp(environment.firebaseConfig);

// Setting up the Firebase database for Firebase db items and authentication
export const db = getFirestore(app);
export const auth = getAuth(app);
