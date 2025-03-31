import React, { useState } from 'react';
import styles from './signUp.module.css';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'member',
    phone: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form validation and submission logic is here
    console.log('Form submitted:', formData);
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.formSection}>
          <h1 className={styles.title}>Join Fit Fusion AI</h1>
          <p className={styles.subtitle}>Get started with your personalized fitness journey today</p>
          
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className={styles.input}
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
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
              />
            </div>
            
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.label}>Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={styles.input}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className={styles.input}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="role" className={styles.label}>I am a...</label>
              <select
                id="role"
                name="role"
                className={styles.select}
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="member">Fitness Enthusiast</option>
                <option value="trainer">Personal Trainer</option>
                <option value="gym">Gym Owner</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.label}>Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className={styles.input}
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="address" className={styles.label}>Address</label>
              <textarea
                id="address"
                name="address"
                className={styles.textarea}
                value={formData.address}
                onChange={handleChange}
                rows="3"
              ></textarea>
            </div>
            
            <div className={styles.formCheckbox}>
              <input
                type="checkbox"
                id="terms"
                name="terms"
                className={styles.checkbox}
                required
              />
              <label htmlFor="terms" className={styles.checkboxLabel}>
                I agree to the <a href="/terms" className={styles.link}>Terms of Service</a> and <a href="/privacy" className={styles.link}>Privacy Policy</a>
              </label>
            </div>
            
            <button type="submit" className={styles.submitButton}>
              Create Account
            </button>
          </form>
          
          <div className={styles.accountRecovery}>
            <p>Already have an account? <Link to="/signIn" className={styles.link}>Sign In</Link></p>
            <a href="/forgot-password" className={styles.recoveryLink}>Forgot your password?</a>
          </div>
        </div>
        
        <div className={styles.benefitsSection}>
          <div className={styles.benefitsContent}>
            <h2 className={styles.benefitsTitle}>Membership Benefits</h2>
            
            <ul className={styles.benefitsList}>
              <li className={styles.benefitItem}>
                <div className={styles.benefitIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div className={styles.benefitText}>
                  <h3>AI-Powered Workouts</h3>
                  <p>Personalized training programs that adapt to your progress</p>
                </div>
              </li>
              
              <li className={styles.benefitItem}>
                <div className={styles.benefitIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                    <line x1="16" y1="8" x2="2" y2="22"></line>
                    <line x1="17.5" y1="15" x2="9" y2="15"></line>
                  </svg>
                </div>
                <div className={styles.benefitText}>
                  <h3>Nutrition Guidance</h3>
                  <p>Custom meal plans based on your fitness goals</p>
                </div>
              </li>
              
              <li className={styles.benefitItem}>
                <div className={styles.benefitIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20"></path>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <div className={styles.benefitText}>
                  <h3>Progress Tracking</h3>
                  <p>Advanced analytics to monitor your improvement</p>
                </div>
              </li>
              
              <li className={styles.benefitItem}>
                <div className={styles.benefitIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <div className={styles.benefitText}>
                  <h3>Community Support</h3>
                  <p>Connect with like-minded fitness enthusiasts</p>
                </div>
              </li>
              
              <li className={styles.benefitItem}>
                <div className={styles.benefitIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1v22"></path>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <div className={styles.benefitText}>
                  <h3>Premium Content</h3>
                  <p>Access to exclusive workout videos and tutorials</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;