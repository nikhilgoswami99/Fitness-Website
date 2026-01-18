import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../services/appwrite";

// Create the User Context
const UserContext = createContext();

// UserProvider component to wrap the app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on mount
  useEffect(() => {
    checkUserSession();
  }, []);

  // Function to check current user session
  const checkUserSession = async () => {
    try {
      setIsLoading(true);
      const currentUser = await getCurrentUser();
      
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error checking user session:", error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to update user data
  const updateUser = (userData) => {
    setUser(userData);
    setIsAuthenticated(!!userData);
  };

  // Function to clear user data (on logout)
  const clearUser = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    setUser: updateUser,
    clearUser,
    checkUserSession,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  
  return context;
};

export default UserContext;
