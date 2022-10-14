import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyAGgTq1meOy3hNRBJAj6zcnKc4z_cWGFWU",
  authDomain: "loadshedding-time-compiler.firebaseapp.com",
  databaseURL:
    "https://loadshedding-time-compiler-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "loadshedding-time-compiler",
  storageBucket: "loadshedding-time-compiler.appspot.com",
  messagingSenderId: "1020497186395",
  appId: "1:1020497186395:web:b76e3866515d969781f97e",
  measurementId: "G-J2DQETML1V",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
