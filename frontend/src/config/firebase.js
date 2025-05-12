import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDJUfWfKMpJb3bB1uyzAM_OMaUF0UAd34c",
  authDomain: "scoutify-9ef5b.firebaseapp.com",
  projectId: "scoutify-9ef5b",
  storageBucket: "scoutify-9ef5b.firebasestorage.app",
  messagingSenderId: "978815911636",
  appId: "1:978815911636:web:f4942b71514a99ed98dd41",
  measurementId: "G-KY4C8ZPXC5"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 