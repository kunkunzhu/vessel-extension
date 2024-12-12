/** @format */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import firebase_app from "../firebase/config";

const auth = getAuth(firebase_app);

// Define the shape of the AuthContext
interface AuthContextType {
  user: User | null; // The Firebase user object or null
}

// Create the context with an initial value of `undefined`
const AuthContext = createContext<AuthContextType>({
  user: null,
});

// Custom hook to consume the AuthContext
export const useAuthContext = () => useContext(AuthContext);

// Props for the provider component
interface AuthContextProviderProps {
  children: ReactNode;
}

// The AuthContextProvider component
export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
}
