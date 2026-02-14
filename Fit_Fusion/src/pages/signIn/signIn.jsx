import { useState, useEffect } from "react";
import styles from "./signIn.module.css";
import StatBadge from "../../components/statBadge/badge";
import { loginUser, getCurrentUser } from "../../services/appwrite";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../../context/userContext.jsx";
import { toast } from "react-toastify";
import logo from "../../assets/logo.png";
import { FiMail, FiLock } from "react-icons/fi";

export default function SignIn() {
  // State for form inputs
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  // State for loading
  const [isLoading, setIsLoading] = useState(false);

  // Get navigation function
  const navigate = useNavigate();

  // Get setUser function from context to update global user state
  const { setUser, isAuthenticated, isLoading: authLoading } = useUser();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      navigate("/");
    }
  }, [isAuthenticated, authLoading, navigate]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!form.email || !form.password) {
      toast.error("Please fill in all fields!");
      return;
    }

    setIsLoading(true);

    try {
      // Step 1: Login user
      await loginUser(form);

      // Step 2: Get current user data
      const currentUser = await getCurrentUser();

      // Step 3: Update global user state
      setUser(currentUser);

      // Step 4: Show success message
      toast.success(`Welcome back, ${currentUser.fullName}!`);

      // Step 5: Navigate to profile page
      navigate("/profile");
    } catch (error) {
      // Show error message
      console.error("Login failed:", error.message);
      toast.error(`Login failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Left Section */}
      <section className={styles.left}>
        <header className={styles.brand}>
          <img src={logo} alt="FitFreak Logo" className={styles.logo} />
        </header>

        <div className={styles.stats}>
          <StatBadge color="blue" value="5" label="Workouts" />
          <StatBadge color="pink" value="2100" label="Calories" />
          <StatBadge color="orange" value="3.5L" label="Water" />
        </div>

        <div className={styles.heading}>
          <h1>Track Your Progress.</h1>
          <h1>Achieve Your Goals.</h1>
        </div>

      </section>

      {/* Right Section */}
      <section className={styles.right}>
        <div className={styles.card}>
          <h2>Welcome Back</h2>

          <label>Email</label>
          <div className={styles.inputGroup}>
            <FiMail className={styles.inputIcon} />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleInput}
              placeholder="Enter your email"
            />
          </div>

          <label>Password</label>
          <div className={styles.inputGroup}>
            <FiLock className={styles.inputIcon} />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleInput}
              placeholder="Enter your password"
            />
          </div>



          <button 
            className={styles.primaryBtn} 
            onClick={handleSignIn}
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>


          <p className={styles.signup}>
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
