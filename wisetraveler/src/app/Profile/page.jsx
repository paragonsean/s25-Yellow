"use client";
import styles from "./style.module.css";
import { useState } from "react";
import React from "react";
import Image from "next/image"

export default function Profile()
{
  const [name, setName] = useState("");
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

        body: JSON.stringify({name, email, location, bio, password}),
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
        alt="Profile"
        width={300}
        height={200}
        className={styles.Image}
      />

     <button type="button" className={styles.PButton}>Change Profile Picture</button>

      <form
        className = {styles.form}>
        <label className = {styles.label}>
          Name
          <input
            id="name"
            type="name"
            name="name"
            placeholder="First and Last"
            className={styles.input}
            required
            onChange={(e) => setName(e.target.value)}
          /> 
          </label>
        
          <label className={styles.label}>
            Email 
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Your email address"
              className={styles.input}
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
              placeholder="City, Country"
              className={styles.input}
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
              placeholder="Share about your travel experiences. #adventure #explore"
              className={styles.input}
              required
              onChange={(e) => setBio(e.target.value)}
            />
          </label>
      </form>

      <h1 className={styles.header}>Account Security</h1>
      
      <form
        className={styles.form}>

        <label className={styles.label}>
          Current Password 
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter current password"
            className={styles.input}
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
            placeholder="Enter new password"
            className={styles.input}
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
            placeholder="Re-enter new password"
            className={styles.input}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button type="button" className={styles.PButton}>
        Update Password
        </button>
      </form>

      <h1 className={styles.header}>Notification Preferences</h1>

      <form
        className={styles.form}>
        <label className= {styles.label}>
          Recieve updates on top destinations
          
        </label>

        <label className= {styles.label}>
          Get notified about hidden gems
          
        </label>

        <label className= {styles.label}>
          Stay informed on safety alerts
          
        </label>

        <label className= {styles.label}>
          Recieve community announcements
          
          <button type="checkbox" className={styles.checkbox}></button>
        </label>

        

      </form>

    </div>
  );
}