import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  NextOrObserver,
  User,
} from "firebase/auth";
import { auth } from "./_config";

var provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => signInWithPopup(auth, provider);

export const signOutWithGoogle = () => signOut(auth);

export const authStateWithGoogle = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);
