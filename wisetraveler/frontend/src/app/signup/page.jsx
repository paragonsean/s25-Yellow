"use client";
import styles from "./style.module.css";
import Link from "next/link";
import { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [terms, setTerms] = useState(false);
  const [birthdate, setBirthdate] = useState("");

  const attemptSignUp = async () => {
    try {
      const response = await fetch("/api/signup", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, firstName, lastName, username, birthdate, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Sign up successful, welcome to WiseTraveler");
        window.location.href = `/Profile?email=${email}`;
      } else {
        alert("Sign up was unsuccessful. Please try again later");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword && terms === true) {
      attemptSignUp();
    } else {
      alert("Passwords do not match. Please try again.");
    }
  };

  return (
    <div>
      <h1 className={styles.header}>Create an Account</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <label className={styles.label}>
          Email Address
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            className={styles.input}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className={styles.label}>
          First Name
          <input
            type="text"
            name="firstName"
            placeholder="Enter your first name"
            className={styles.input}
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label className={styles.label}>
          Last Name
          <input
            type="text"
            name="lastName"
            placeholder="Enter your last name"
            className={styles.input}
            required
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label className={styles.label}>
          Username
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            className={styles.input}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className={styles.label}>
          Date of Birth
          <input
            type="text"
            name="birthdate"
            placeholder="Enter your birthdate (YYYY-MM-DD)"
            className={styles.input}
            required
            onChange={(e) => setBirthdate(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label className={styles.label}>
          Confirm Password
          <input
            type="password"
            name="confirmPassword"
            placeholder=" Confirm Password"
            className={styles.input}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <label className="terms">
          <input
            type="checkbox"
            className={styles.checkbox}
            required
            onChange={(e) => setTerms(e.target.checked)}
          />
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
