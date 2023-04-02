import { useState, useEffect } from "react";
import firebase, { auth } from "../service/firebase";
import "firebase/compat/auth";
import { useRouter } from "next/router";

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const authStateChanged = async (authState) => {
    if (!authState) {
      setLoading(false);
      return;
    }

    setLoading(true);

    var formattedUser = formatAuthUser(authState);

    setAuthUser(formattedUser);
    console.log(formattedUser);
    setLoading(false);
  };

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const signInWithEmailAndPassword = (email, password) =>
    auth.signInWithEmailAndPassword(email, password).then((result) => {
      router.push(router.query.redirect ?? "/");
    });

  const createUserWithEmailAndPassword = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password).then((result) => {
      router.push(router.query.redirect ?? "/");
    });

  const signInUserWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    auth.signInWithPopup(provider).then((result) => {
      console.log("Success. The user is created in firebase");
      router.push("/");
    });
  };

  const signOut = () => {
    auth.signOut().then(clear);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInUserWithGoogle,
    signOut,
  };
}
