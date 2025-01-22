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
        <Link href="/sign-in" className={styles.navbarLinks}>
          Sign In / Create Account
        </Link>
      </div>
    </div>
  );
};

export default Navbar;