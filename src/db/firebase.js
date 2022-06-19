import { initializeApp } from "firebase/app";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9dar256fDuFc14f8nbUwytuRhYSsahSI",
  authDomain: "todo-list-adcab.firebaseapp.com",
  databaseURL: "https://todo-list-adcab-default-rtdb.firebaseio.com",
  projectId: "todo-list-adcab",
  storageBucket: "todo-list-adcab.appspot.com",
  messagingSenderId: "559537815316",
  appId: "1:559537815316:web:25231ab591a550c125cc01",
  measurementId: "G-7QYJBC67TK",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        username: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
    localStorage.setItem("id", user.uid);
    window.location.reload();
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    let user;
    onSnapshot(collection(db, "users"), (snapshot) => {
      user = snapshot.docs.map((doc) => {
        return doc.data();
      });
      let userSignIn = user.filter((item) => item.email === email);
      localStorage.setItem("id", userSignIn[0].uid);
      window.location.reload();
    });
  } catch (err) {
    console.error(err);
    alert("Password or email does not match,please try again");
  }
};
const registerWithEmailAndPassword = async (email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      authProvider: "local",
      email,
    });
    localStorage.setItem("id", user.uid);
window.location.reload();
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  if (localStorage.getItem("id")) {
    signOut(auth);
    localStorage.removeItem("id");
  } else {
    alert("You are not sign in!");
  }
};
export {
  db,
  auth,
  signInWithGoogle,
  signInWithEmailAndPassword,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};
