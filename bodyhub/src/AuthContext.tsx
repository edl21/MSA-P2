import React, { createContext, useContext, useState, useEffect } from "react";

// Defining User interface
interface User {
  username: string;
  email: string;
}

// Defining the structure of the AuthContext
interface AuthContextProps {
  user: User | null;
  // Function to handle login
  login: (user: User) => void;
  // Function to handle logout
  logout: () => void;
}

// Creating the AuthContext with default values
const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: () => {},
  logout: () => {},
});

// Props for the AuthProvider component
interface AuthProviderProps {
  children: React.ReactNode;
}

// Authentication provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Initialising a user from session
  useEffect(() => {
    // Attempt to retrieve stored user data from session
    const storedUsername = sessionStorage.getItem("username");
    // If stored user data exists, update the user state
    if (storedUsername) {
      setUser({ username: storedUsername, email: "" });
    }
  }, []);

  // Function to log in a user
  const login = (user: User) => {
    // Store the username in the session storage
    sessionStorage.setItem("username", user.username);
    // Update the user state with the logged in user's information
    setUser(user);
  };

  // Function to log out a user
  const logout = () => {
    // Remove the username from session storage
    sessionStorage.removeItem("username");
    // Clear the user state
    setUser(null);
  };

  // Provide the auth state and the login/logout functions to child components
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
