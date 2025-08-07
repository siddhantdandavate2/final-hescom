import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDemo_Replace_With_Real_Key",
  authDomain: "hescom-demo.firebaseapp.com",
  projectId: "hescom-demo",
  storageBucket: "hescom-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize providers
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

// Configure providers
googleProvider.addScope('email');
googleProvider.addScope('profile');

facebookProvider.addScope('email');
facebookProvider.addScope('public_profile');

export default app;