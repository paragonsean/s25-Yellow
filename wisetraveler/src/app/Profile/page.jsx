"use client";
import styles from "./style.module.css";
import { useState } from "react";
import React from "react";
import Image from "next/image"

export default function Profile()
{
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [password,setPassword] = useState("");

  const UpdateProfile = async () =>
  {
    try
    {
      const response = await fetch("/api/profile", 
      {
        method: "POST",
        headers: 
        {
          "Content -Type": "application/json",
        },

        body: JSON.stringify({username, email, password}),
      });

      if (response.ok)
      {
        const data = await response.json();
        alert("Profile updated successfully.");
      }

      else
      {
        alert("Unable to update profile.");
      }
    }

    catch(error)
    {
      console.log(error);
    }
  };

  const onSubmit = (e) =>
  {
    e.preventDefault();
    UpdateProfile();
  };
  
  return (
    <div>
    <h1 className = {styles.header}>Profile Settings</h1>
    
    <Image
      src={"/images/avatar-placeholder.jpg"}
      width={300}
      height={200}
      className={styles.Image}
    />

    <button>Change Profile Picture</button>

    <form
      className = {styles.form}>
      <label className = {styles.label}>
        Username
        <input
          id="username"
          type="username"
          name="username"
          placeholder="username"
          className={styles.input}
          required
          onChange={(e) => setUsername(e.target.value)}
        /> 
        </label>
        
        <label className={styles.label}>
          Email 
          <input
            id="email"
            type="email"
            name="email"
            placeholder="email"
            className={styles.label}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className={styles.label}>
          Location
          <input
            id="location"
            type="location"
            name="location"
            placeholder="location"
            className={styles.label}
            required
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>

        <label className={styles.label}>
          Bio
          <input
            id="bio"
            type="bio"
            name="bio"
            placeholder="bio"
            className={styles.label}
            required
            onChange={(e) => setBio(e.target.value)}
          />
        </label>

        <h2 className={styles.header}>Account Security</h2>

        <label className={styles.label}>
          Current Password 
          <input
            id="password"
            type="password"
            name="password"
            placeholder="password"
            className={styles.label}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <label className={styles.label}>
          New Password 
          <input
            id="password"
            type="password"
            name="password"
            placeholder="password"
            className={styles.label}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <label className={styles.label}>
          Confirm New Password 
          <input
            id="password"
            type="password"
            name="password"
            placeholder="password"
            className={styles.label}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

      <button type="button" className={styles.updatePasswordButton}>
        Update Password
      </button>
      </form>
    </div>
  );
}