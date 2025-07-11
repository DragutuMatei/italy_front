// src/contexts/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./fire_config.js"; // Adjust path to your config file
import { ref, onValue } from "firebase/database";
import { db } from "./fire_config.js";
// Import the necessary auth functions you need
import {
  onAuthStateChanged,
  GoogleAuthProvider, // <-- Import GoogleAuthProvider
  signInWithPopup, // <-- Import signInWithPopup
  signOut, // <-- Import signOut
} from "firebase/auth";
import AXIOS from "./Axios_config.js";

// Create the Context
const AuthContext = createContext(null);

// Create a custom hook to use the AuthContext easily
export const useAuth = () => {
  return useContext(AuthContext);
};

// Create the Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to hold the user object
  const [loading, setLoading] = useState(true); // State to track initial loading

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const {
        accessToken,
        isAnonymous,
        proactiveRefresh,
        providerData,
        providerId,
        reloadListener,
        reloadUserInfo,
        stsTokenManager,
        tenantId,
        ...data
      } = result.user;
      console.log("data: ", data);
      await AXIOS.post("/api/saveUser", {
        uid: result.user.uid,
        userData: data,
      });
      // console.log(final);
      setUser({
        ...data,
      });
      return data;
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  // Example: Sign out
  const signUserOut = async () => {
    try {
      await signOut(auth);
      // User state will be updated by the onAuthStateChanged listener
      // console.log("User signed out successfully.");
    } catch (error) {
      console.error("Sign Out Error:", error);
      // Handle Errors here
      throw error; // Re-throw for component to handle if needed
    }
  };

  // --- Set up the Auth State Listener ---
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
  //     if (firebaseUser) {
  //       try {
  //         console.log("asdlnk");
  //         const res = await AXIOS.get(`/getUserInfo/${firebaseUser.uid}`);
  //         const customUser = res.data.user;
  //         setUser({
  //           ...firebaseUser,
  //           ...customUser,
  //         });

  //         const userRef = ref(db, `users/${firebaseUser.uid}`);
  //         const unsubscribeDb = onValue(userRef, (snapshot) => {
  //           const customUser = snapshot.val();
  //           console.log(customUser)
  //           // setUser({
  //           //   ...firebaseUser,
  //           //   ...customUser,
  //           // });
  //         });

  //         // cleanup on unmount or user change
  //         return () => unsubscribeDb();
  //       } catch (err) {
  //         console.error("Failed to fetch custom user data:", err);
  //       }
  //     } else {
  //       console.log("asdlnk3333333333");

  //       setUser(null);
  //     }

  //     setLoading(false);
  //   });

  //   return () => unsubscribe();
  // }, []);

  useEffect(() => {
    let unsubscribeDb = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // console.log("asdlnk");
          const res = await AXIOS.get(`/api/getUserInfo/${firebaseUser.uid}`);
          const customUser = res.data.user;

          setUser({
            ...firebaseUser,
            ...customUser,
          });

          const userRef = ref(db, `users/${firebaseUser.uid}`);
          unsubscribeDb = onValue(userRef, (snapshot) => {
            const liveUser = snapshot.val();
            console.log("Live user data:", liveUser);
            setUser((prevUser) => ({
              ...prevUser,
              ...liveUser,
            }));
          });
        } catch (err) {
          console.error("Failed to fetch custom user data:", err);
        }
      } else {
        console.log("No user detected");
        setUser(null);
        if (unsubscribeDb) unsubscribeDb(); // Clean up old DB listener
      }

      setLoading(false);
    });

    // ✅ Correct place to return cleanup functions
    return () => {
      unsubscribeAuth();
      if (unsubscribeDb) unsubscribeDb();
    };
  }, []);

  // --- The value provided to consumers of the context ---
  const value = {
    user,
    loading,
    signInWithGoogle, // <-- Add this
    signUserOut, // <-- Add this
  };

  // Render the children components, providing the auth context value
  return (
    <AuthContext.Provider value={value}>
      {/* Only render children once loading is complete */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Remember to wrap your app in <AuthProvider> in index.js or App.js
