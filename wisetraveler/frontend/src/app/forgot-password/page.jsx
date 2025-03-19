"use client";
import styles from "./style.module.css";
import { useState } from "react";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changePassword = async () => {
    try {
      const response = await fetch(`/api/password/?email=${email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ email, password: password }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Password updated successfully.");
        window.location.href = `/Profile?email=${email}`;
      } else {
        alert("Unable to update password, try again later.");
        window.location.href = `/Profile?email=${email}`;
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    changePassword();
  };

  return (
    <div>
      <h1 className={styles.header}>Reset Your Password</h1>
      <form
        className={styles.form}
        method="POST"
        onSubmit={onSubmit}
      >
        <label className={styles.label}>
          Email
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
          New Password
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
        <button
          type="submit"
          className={styles.loginButton}
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
