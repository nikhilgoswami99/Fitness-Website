import { useState } from "react";
import styles from "./signUp.module.css";
import { createUser, loginUser, getCurrentUser } from "../../services/appwrite";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext.jsx";
import { toast } from "react-toastify";
import logo from "../../assets/logo.png";

export default function Signup() {
  // State for form inputs
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // State for loading
  const [isLoading, setIsLoading] = useState(false);

  // Get navigation function
  const navigate = useNavigate();

  // Get setUser function from context to update global user state
  const { setUser } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!form.fullName || !form.email || !form.password) {
      toast.error("Please fill in all fields!");
      return;
    }

    // Validate password length
    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters long!");
      return;
    }

    setIsLoading(true);

    try {
      // Step 1: Create new user account
      await createUser({
        username: form.fullName,
        email: form.email,
        password: form.password,
      });

      // Step 2: Automatically login the user
      await loginUser({
        email: form.email,
        password: form.password,
      });

      // Step 3: Get current user data
      const currentUser = await getCurrentUser();

      // Step 4: Update global user state
      setUser(currentUser);

      // Step 5: Show success message
      toast.success(`Welcome to FitFreak, ${form.fullName}!`);

      // Step 6: Navigate to profile page
      navigate("/profile");
    } catch (error) {
      // Show error message
      console.log("Signup error:", error);
      toast.error(`Signup failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <img src={logo} alt="FitFreak Logo" className={styles.logo} />
      </header>

      {/* Main */}
      <main className={styles.main}>
        {/* Left Section */}
        <section className={styles.hero}>
          <h1>
            Train like a <br />
            <span>Champion.</span>
          </h1>

          <p>
            Join thousands of athletes tracking their progress,
            crushing goals, and transforming their bodies with FitFreak.
          </p>

          <div className={styles.features}>
            <div className={styles.featureCard}>
              <span>📈</span>
              <div>
                <strong>Real-time Analytics</strong>
                <small>Progress</small>
              </div>
            </div>

            <div className={styles.featureCard}>
              <span>🍴</span>
              <div>
                <strong>Diet Tracking</strong>
                <small>Nutrition</small>
              </div>
            </div>
          </div>

          <div className={styles.socialProof}>
            <span>👥</span>
            <p>
              <strong>10k+ Athletes</strong>
              <br />
              Joined this month
            </p>
          </div>
        </section>

        {/* Right Section */}
        <section className={styles.card}>
          <h2>Create Account</h2>
          <p className={styles.subtitle}>
            Start your 30-day free trial. No credit card required.
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label>
              Full Name
              <input
                type="text"
                name="fullName"
                placeholder="John Doe"
                value={form.fullName}
                onChange={handleChange}
              />
            </label>

            <label>
              Email Address
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
              />
            </label>

            <label>
              Password
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
              />
            </label>

            {/* <div className={styles.checkbox}>
              <input type="checkbox" id="terms" />
              <label htmlFor="terms">
                I agree to the <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>
              </label>
            </div> */}

            <button 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>

            <p className={styles.signin}>
              Already have an account? <a href="#">Sign in here</a>
            </p>
          </form>
        </section>
      </main>
    </div>
  );
}
