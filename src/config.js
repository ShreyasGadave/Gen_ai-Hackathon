// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDS8cvZOZhtj64YSi0BHWjSLwNLDc4T4hg",
  authDomain: "ocr-system-a9653.firebaseapp.com",
  databaseURL: "https://ocr-system-a9653-default-rtdb.firebaseio.com",
  projectId: "ocr-system-a9653",
  storageBucket: "ocr-system-a9653.firebasestorage.app",
  messagingSenderId: "65629860263",
  appId: "1:65629860263:web:660396783a88dc3a588682",
  measurementId: "G-E2XD47CHCF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// HANDLE GOOGLE LOGIN
const handleGoogleLogin = async (setError) => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log('Google Sign-In:', result.user);
        setError('');
    } catch (err) {
        console.log(err);
        setError('Google Sign-In failed');
    }
}

// HANDLE LOGIN USING EMAIL AND PASSWORD
const handleSubmit = async (e, setError) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in:', userCred.user);
        setError('');
    } catch (err) {
        console.log(err);
        setError('Invalid email or password');
    }
    e.target.reset();
}

export { auth, googleProvider, handleGoogleLogin, handleSubmit }