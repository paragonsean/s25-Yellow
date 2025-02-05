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
        <Link href="/log-in" className={styles.navbarLinks}>
          Log-In
        </Link>
        <Link href="/chat" className={styles.navbarLinks} >
          Chat
        </Link>
      </div>
    </div>
  );
};

export default Navbar;