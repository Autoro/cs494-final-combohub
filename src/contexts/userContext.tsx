import { auth } from "../services/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut, User } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type UserContextType = {
  user: User | null
  logIn: () => void
  logOut: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const withUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw Error("withUserContext must be called from within a UserContextProvider.");
  }

  return context;
}

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => setUser(user));

    return unsubscribe;
  }, []);

  const logIn = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider);
  }

  const logOut = () => {
    signOut(auth);
  }

  return (
    <UserContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
}