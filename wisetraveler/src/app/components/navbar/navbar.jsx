import React from "react";
import Link from "next/link";
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbarBorder}>
      <div className={styles.navbarLinksContainer}>
        <Link href="/" className={styles.navbarLinks}>
          Home
        </Link>
        <Link href="/login" className={styles.navbarLinks}>
          Login
        </Link>
        <Link href="/signup" className={styles.navbarLinks}>
          Sign up{" "}
        </Link>
        <Link href="/chat" className={styles.navbarLinks}>
          Chat
        </Link>
        <Link href="/quiz" className={styles.navbarLinks}>
          Destination Quiz
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
