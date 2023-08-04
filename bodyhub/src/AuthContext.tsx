import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  username: string;
  email: string;
  // Add other properties as needed.
}

interface AuthContextProps {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Initialize user from session storage
  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) {
      // Update the user state with the stored username
      // You can modify this to include other user information if needed
      setUser({ username: storedUsername, email: "" });
    }
  }, []);

  const login = (user: User) => {
    // Save the username to session storage
    sessionStorage.setItem("username", user.username);

    // Update user state
    setUser(user);
  };

  const logout = () => {
    // Remove the username from session storage
    sessionStorage.removeItem("username");

    // Update user state
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
