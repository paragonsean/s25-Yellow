"use client";
import styles from "./style.module.css";
import { useState } from "react";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const attemptLogin = async () => {
    try {
      const response = await fetch("/api/login", { // [TODO: Update URI of RESTful API, depending on how backend devs implement the API]
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Login successful, welcome back, Traveler");
      } else {
        alert("Login was unsuccessful, Traveler. Please try again later");
      }

    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    attemptLogin();
  };

  return (
    <div>
      <h1 className={styles.header}>Welcome Back Traveler</h1>
      <form
        className={styles.form} /* method="post" action="[TODO: API URL]" */
      >
        <label className={styles.label}>
          Username
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            className={styles.input}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className={styles.label}>
          Password
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            className={styles.input}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="button" className={styles.forgotPasswordButton}>
          Forgot your password?
        </button>
        <button
          type="submit"
          className={styles.loginButton} /* onClick={onSubmit} */
        >
          Log In
        </button>
      </form>
    </div>
  );
}
