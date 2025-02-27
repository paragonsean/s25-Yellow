import { SignIn } from "@clerk/nextjs";
import styles from "./style.module.css";

export default function LogIn() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.authContainer}>
        <h1 className={styles.header}>Sign In</h1>
        <div className={styles.clerkSignIn}>
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary: styles.loginButton, // Custom button styling
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
