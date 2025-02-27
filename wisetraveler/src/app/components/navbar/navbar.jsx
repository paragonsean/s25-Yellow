import React from "react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbarBorder}>
      {/* Centered Links */}
      <div className={styles.navbarCenter}>
        <Link href="/" className={styles.navbarLinks}>Home</Link>
        <Link href="/chat" className={styles.navbarLinks}>Chat</Link>
        <Link href="/quiz" className={styles.navbarLinks}>Destination Quiz</Link>
      </div>

      {/* Authentication Buttons (Sign In & Sign Up) */}
      <SignedOut>
        <div className={styles.authButtons}>
          <SignInButton mode="modal">
            <button className={styles.navbarButton}>Sign In</button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className={styles.navbarButton}>Sign Up</button>
          </SignUpButton>
        </div>
      </SignedOut>

      {/* Profile Button - Right Aligned */}
      <SignedIn>
        <div className={styles.userProfileContainer}>
          <UserButton afterSignOutUrl="/" />
        </div>
      </SignedIn>
    </div>
  );
};

export default Navbar;
