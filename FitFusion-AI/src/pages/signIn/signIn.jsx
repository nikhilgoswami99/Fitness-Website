import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import styles from './signIn.module.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate loading state
    setIsLoading(true);
    
    // Form validation and submission logic 
    console.log('Sign In Form submitted:', formData);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Redirect would happen here after successful login
    }, 1500);
  };

  return (
    <div className={styles.signinContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.formSection}>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Sign in to continue your fitness journey</p>
          
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className={styles.input}
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
              />
            </div>
            
            <div className={styles.formGroup}>
              <div className={styles.passwordHeader}>
                <label htmlFor="password" className={styles.label}>Password</label>
                <a href="/forgot-password" className={styles.forgotPassword}>Forgot Password?</a>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                className={styles.input}
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
            </div>
            
            <div className={styles.formCheckbox}>
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                className={styles.checkbox}
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="rememberMe" className={styles.checkboxLabel}>
                Remember me on this device
              </label>
            </div>
            
            <button 
              type="submit" 
              className={`${styles.submitButton} ${isLoading ? styles.loading : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          <div className={styles.divider}>
            <span>OR</span>
          </div>
          
          <div className={styles.socialSignIn}>
            <button className={`${styles.socialButton} ${styles.googleButton}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </button>
            <button className={`${styles.socialButton} ${styles.facebookButton}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" fill="#1877F2"/>
              </svg>
              Sign in with Facebook
            </button>
          </div>
          
          <div className={styles.createAccount}>
            <p>Don't have an account? <Link to="/signUp" className={styles.link}>Sign Up</Link></p>
          </div>
        </div>
        
        <div className={styles.imageSection}>
          <div className={styles.imageOverlay}>
            <div className={styles.welcomeMessage}>
              <h2>Transform Your Fitness Journey</h2>
              <p>Welcome to the future of personalized training with Fit Fusion AI</p>
              <ul className={styles.featureList}>
                <li>AI-powered personalized workouts</li>
                <li>Progress tracking and analytics</li>
                <li>Nutrition guidance and meal planning</li>
                <li>Connect with fitness community</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;