import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC3p6RxePAzCwl0LFldG_yA6XhzGeFaaW4",
    authDomain: "embed-9c76b.firebaseapp.com",
    projectId: "embed-9c76b",
    storageBucket: "embed-9c76b.appspot.com",
    messagingSenderId: "39295887574",
    appId: "1:39295887574:web:e6727b3eac4651d68dc177",
    measurementId: "G-BJRTBTDBGX"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };