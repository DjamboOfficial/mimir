// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "mimir-421111.firebaseapp.com",
  projectId: "mimir-421111",
  storageBucket: "mimir-421111.appspot.com",
  messagingSenderId: "6422657219",
  appId: "1:6422657219:web:7bb40d08f2d9416ba3ca76",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

/* service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read;
      allow write: if request.resource.size < 2 * 1024 * 1024 && request.resource.contentType.matches('image/.*');
    }
  }
}
*/
