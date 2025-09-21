// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
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

// --- NEW FUNCTION TO SEND DATA TO YOUR BACKEND ---
const sendUserDataToBackend = async (firebaseUser) => {
    // We only send the essential, non-sensitive data
    const userData = {
        firebaseUid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
    };

    try {
        const response = await fetch('http://localhost:3000/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            // Handle HTTP errors like 404 or 500
            throw new Error(`Backend error: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Backend response:', result);

    } catch (error) {
        console.error('Failed to send user data to backend:', error);
        // You might want to bubble this error up to the UI
    }
};

// HANDLE GOOGLE LOGIN
const handleGoogleLogin = async (setError) => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log('Google Sign-In Success:', result.user);
        
        // ** ADDED: Send user data to backend after successful login **
        await sendUserDataToBackend(result.user);

        setError('');
        return result.user; // Return user object on success
    } catch (err) {
        console.error('Google Sign-In failed:', err);
        setError('Google Sign-In failed. Please try again.');
    }
};

// HANDLE LOGIN USING EMAIL AND PASSWORD
const handleSubmit = async (e, setError) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        console.log('Email/Password Sign-In Success:', userCred.user);
        
        // ** ADDED: Send user data to backend after successful login **
        await sendUserDataToBackend(userCred.user);
        
        setError('');
        e.target.reset();
        return userCred.user; // Return user object on success
    } catch (err) {
        console.error('Email/Password Sign-In failed:', err);
        setError('Invalid email or password.');
    }
};

export { auth, googleProvider, handleGoogleLogin, handleSubmit };