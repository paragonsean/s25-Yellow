import { SignUp } from "@clerk/nextjs";
import styles from "./style.module.css";

export default function SignUpPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Create an Account</h1>
      <div className={styles.authContainer}>
        <SignUp appearance={{ elements: { formButtonPrimary: styles.loginButton } }} />
      </div>
      <p className={styles.label}>
        Already have an account?{" "}
        <a href="/sign-in" className={styles.login}>
          Log in
        </a>
      </p>
    </div>
  );
}
