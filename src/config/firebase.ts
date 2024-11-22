import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDHZOmC-CY_HMwGX-RpXEQhH2j-_9Q7qxk",
  authDomain: "jomovie-app.firebaseapp.com",
  projectId: "jomovie-app",
  storageBucket: "jomovie-app.appspot.com",
  messagingSenderId: "849252546743",
  appId: "1:849252546743:web:d8b5c9b9b9b9b9b9b9b9b9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);