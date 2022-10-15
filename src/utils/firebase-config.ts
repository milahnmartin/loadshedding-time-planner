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
  apiKey: "AIzaSyCza7Oe_qxUqsi8PcmOdrhiV8vmkeby3bM",

  authDomain: "loadheddint-time-calc.firebaseapp.com",

  databaseURL:
    "https://loadheddint-time-calc-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "loadheddint-time-calc",

  storageBucket: "loadheddint-time-calc.appspot.com",

  messagingSenderId: "932828162476",

  appId: "1:932828162476:web:aa25fefb524f4e7132f209",

  measurementId: "G-QBJCDY4QZB",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
