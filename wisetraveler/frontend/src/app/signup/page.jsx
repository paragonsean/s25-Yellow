import styles from "./style.module.css";
import Link from "next/link";

export default function LogIn() {
  return (
    <div>
      <h1 className={styles.header}>Create an Account</h1>
      <form className={styles.form}>
        <label className={styles.label}>
          Email Address
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            className={styles.input}
            required
          />
        </label>
        <label className={styles.label}>
          Username
          <input
            type="text"
            name="text"
            placeholder="Enter Username"
            className={styles.input}
            required
          />
        </label>
        <label className={styles.label}>
          Set Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={styles.input}
            required
          />
        </label>
        <label className={styles.label}>
          Confirm Password
          <input
            type="password"
            name="password"
            placeholder=" Confirm Password"
            className={styles.input}
            required
          />
        </label>
        <label className="terms">
          <input type="checkbox" className={styles.checkbox} required />
          By signing up, you agree to our{" "}
          <a href="/TermsAndConditions">Terms and Conditions</a>
        </label>
        <button type="submit" className={styles.loginButton}>
          Join now
        </button>
        <label className="label-container">
          Already a member?
          <Link href="/login">
            <button type="button" className={styles.login}>
              Login
            </button>
          </Link>
        </label>
      </form>
    </div>
  );
}
