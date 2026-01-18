import { useState } from "react";
import styles from "./signUp.module.css";
import { createUser } from "../../services/appwrite";

export default function Signup() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser({
        username: form.fullName,
        email: form.email,
        password: form.password,
      });
    } catch (error) {
      console.log("Signup error:", error);
    }
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>✖</span>
          <span>FIT<span className={styles.logoAccent}>FREAK</span></span>
        </div>
        <nav className={styles.nav}>
          <a href="#">Support</a>
          <a href="#">Contact</a>
        </nav>
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

            <button type="submit">Create Account</button>

            <div className={styles.divider}>Or continue with</div>

            <div className={styles.oauth}>
              <button type="button">Google</button>
              <button type="button">Apple</button>
            </div>

            <p className={styles.signin}>
              Already have an account? <a href="#">Sign in here</a>
            </p>
          </form>
        </section>
      </main>
    </div>
  );
}
