"use client";

import { useUser, UserProfile } from "@clerk/nextjs";
import styles from "./style.module.css";
import { useState } from "react";

export default function Profile() {
  const { user } = useUser(); // Get current user data from Clerk
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");

  // Function to update additional profile fields
  const updateProfile = async () => {
    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location, bio }),
      });

      if (response.ok) {
        alert("Profile updated successfully.");
      } else {
        alert("Unable to update profile.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Profile Settings</h1>

      {/* Clerk's User Profile Component */}
      <div className={styles.authContainer}>
        <UserProfile />
      </div>

      <form onSubmit={(e) => {
        e.preventDefault();
        updateProfile();
      }}>
        <section>
          <h2>Personal Information</h2>
          <p>
            <label className={styles.label}>
              <span>Username</span>
              <input type="text" value={user?.username || ""} disabled className={styles.input} />
            </label>
          </p>

          <p>
            <label className={styles.label}>
              <span>Email</span>
              <input type="email" value={user?.emailAddresses[0]?.emailAddress || ""} disabled className={styles.input} />
            </label>
          </p>

          <p>
            <label className={styles.label}>
              <span>Location</span>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className={styles.input} />
            </label>
          </p>

          <p>
            <label className={styles.label}>
              <span>Bio</span>
              <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} className={styles.input} />
            </label>
          </p>
        </section>

        <section>
          <h2>Account Security</h2>
          <p>
            <button type="button" onClick={() => window.open("/user-settings", "_self")} className={styles.loginButton}>
              Update Password
            </button>
          </p>
        </section>

        <section>
          <h3>Notification Preferences</h3>
          <p>
            <label className="receive-switch">
              <span>Receive updates on top destinations</span>
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
          </p>
          <p>
            <label className="gem-switch">
              <span>Get notified about hidden gems</span>
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
          </p>
        </section>

        <button type="submit" className={styles.loginButton}>Save Changes</button>
      </form>
    </div>
  );
}
