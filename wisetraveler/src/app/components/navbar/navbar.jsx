import React from "react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbarBorder}>
      <div className={styles.navbarLinksContainer}>
        <Link href="/" className={styles.navbarLinks}>Home</Link>
        <Link href="/chat" className={styles.navbarLinks}>Chat</Link>
        <Link href="/quiz" className={styles.navbarLinks}>Destination Quiz</Link>

        {/* Show Sign In and Sign Up when user is signed out */}
        <SignedOut>
          <SignInButton mode="modal">
            <button className={styles.navbarButton}>Sign In</button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className={styles.navbarButton}>Sign Up</button>
          </SignUpButton>
        </SignedOut>

        {/* Show User Profile when signed in */}
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
