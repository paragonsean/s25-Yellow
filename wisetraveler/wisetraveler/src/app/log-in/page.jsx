import styles from "./style.module.css";

export default function LogIn() {
  return (
    <div>
      <h1 className={styles.header}>Welcome Back Traveler</h1>
      <form className={styles.form}>
        <label className={styles.label}>
          Username
          <input type="email" name="email" placeholder="Email" className={styles.input}/>
        </label>
        <label className={styles.label}>
          Password
          <input type="password" name="password" placeholder="Password" className={styles.input}/>
        </label>
        <button type="button" className={styles.forgotPasswordButton}>Forgot your password?</button>
        <button type="submit" className={styles.loginButton}>Log In</button>
      </form>
    </div>
  );
}
