"use client";
import styles from "./style.module.css";
import { useState } from "react";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const attemptLogin = async () => {
    try {
      const response = await fetch("/api/login", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful, welcome back, Traveler");
        window.location.href = `/profile?email=${email}`;
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
        className={styles.form}
        method="POST"
        onSubmit={onSubmit}
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
          className={styles.loginButton}
        >
          Log In
        </button>
      </form>
    </div>
  );
}
