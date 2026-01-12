import styles from "./signIn.module.css";
import StatBadge from "../../components/statBadge/badge";

export default function SignIn() {
  return (
    <div className={styles.container}>
      {/* Left Section */}
      <section className={styles.left}>
        <header className={styles.brand}>
          <span className={styles.logo}>🏋️</span>
          <span className={styles.brandName}>FITFREAK</span>
        </header>

        <div className={styles.stats}>
          <StatBadge color="blue" value="5" label="Workouts" />
          <StatBadge color="pink" value="2100" label="Calories" />
          <StatBadge color="orange" value="3.5L" label="Water" />
        </div>

        <h1 className={styles.heading}>
          Track Your Progress.
          <span> Achieve Your Goals.</span>
        </h1>

        <p className={styles.subText}>
          Join thousands of athletes tracking workouts, nutrition, and daily
          fitness goals with FitFreak.
        </p>
      </section>

      {/* Right Section */}
      <section className={styles.right}>
        <div className={styles.card}>
          <h2>Welcome Back</h2>
          <p>Please enter your details to sign in.</p>

          <label>Email Address</label>
          <input type="email" placeholder="athlete@fitfreak.com" />

          <label>Password</label>
          <input type="password" placeholder="••••••••" />

          <span className={styles.forgot}>Forgot password?</span>

          <button className={styles.primaryBtn}>Sign In</button>

          <div className={styles.divider}>Or continue with</div>

          <div className={styles.socials}>
            <button>Google</button>
            <button>Facebook</button>
          </div>

          <p className={styles.signup}>
            Don’t have an account? <span>Sign up for free</span>
          </p>
        </div>
      </section>
    </div>
  );
}
