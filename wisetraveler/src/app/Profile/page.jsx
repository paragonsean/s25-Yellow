"use client";
import styles from "./style.module.css";
import { useState, useEffect } from "react";
import React from "react";
import Image from "next/image";
import axios from "axios";

export default function Profile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userEmail = params.get("email");
    if (userEmail) {
      setEmail(userEmail);
      fetchData(userEmail); 
    }
  }, []);

  const fetchData = async (email) => {
    try {
      const response = await axios.get(`api/user/?email=${email}`);
      console.log("API Response: " + JSON.stringify(response.data));
      setUserData(response.data.user);
    } catch (error) {
      console.error(error.message);
    }
  };

  const UpdateProfile = async () => {
    // DO NOT UPDATE EMAIL (EMAIL SHOULD BE READ-ONLY)
    try {
      const response = await fetch(`/api/updatePersonalInfo/?email=${email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ firstName, lastName, username, birthdate }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Profile updated successfully.");
        window.location.href = `/Profile?email=${email}`;
      } else {
        alert("Unable to update profile, try again later.");
        window.location.href = `/Profile?email=${email}`;
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const changePassword = async () => {
    try {
      const response = await fetch(`/api/password/?email=${email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ email, password: newPassword }),
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

  const updateInfo = (e) => {
    e.preventDefault();
    UpdateProfile();
  };

  const updatePassword = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      changePassword();
    } else {
      alert("Passwords do not match. Please try again.");
    }
  };


  const updatePic = (e) => {  
    e.preventDefault();
    // TODO: UPDATE PICTURE
  };

  return (
    <div>
      <h1 className={styles.header} style={{ margin: "5% 20% 3% 20%" }}>Profile Settings for {userData?.first_name}</h1>
      <div className={styles.profilePic}>
        <Image
          src={"/images/avatar-placeholder.jpg"}
          alt="Profile"
          width={300}
          height={200}
          className={styles.profileImage}
        />
        <button type="button" className={styles.button} onClick={updatePic}>
          Update Picture
        </button>
      </div>
      <div>
        <h1 className={styles.header}>Your Current Information</h1>
        <div className={styles.infoContainer}>
          <p>First Name: {userData?.first_name}</p>
          <br/>
          <p>Last Name: {userData?.last_name}</p>
          <br/>
          <p>Username: {userData?.username}</p>
          <br/>
          <p>Email: {userData?.email}</p>
          <br/>
          <p>Birthdate: {userData?.birth_date}</p>
        </div>
      </div>
      <div className={styles.profileContainer}>
        <div className={styles.personalInfoContainer}>
          <h1 className={styles.header}>Personal Information</h1>
          <form className={styles.form} onSubmit={updateInfo}>
            <label className={styles.label}>
              First Name
              <input
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                className={styles.input}
                required
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
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
              Birthdate
              <input
                type="text"
                name="birthdate"
                placeholder="Enter your birthdate (YYYY-MM-DD)"
                className={styles.input}
                required
                onChange={(e) => setBirthdate(e.target.value)}
              />
            </label>
            <button
              type="submit"
              className={styles.button}
            >
              Update Info
            </button>
          </form>
        </div>
        <div className={styles.securityInfoContainer}>
          <h1 className={styles.header}>Account Security</h1>
          <form className={styles.form} onSubmit={updatePassword}>
            <label className={styles.label}>
              New Password
              <input
                type="password"
                name="password"
                placeholder="Enter new password"
                className={styles.input}
                required
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
            <label className={styles.label}>
              Confirm New Password
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter new password"
                className={styles.input}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
            <button
              type="submit"
              className={styles.button}
            >
              Update Password
            </button>
          </form>
        </div>
        {/* <div className={styles.notificationsContainer}>
          <h1 className={styles.header}>Notification Preferences</h1>
          <form className={styles.form}>
            <label className={styles.label}>
              Recieve updates on top destinations
            </label>

            <label className={styles.label}>
              Get notified about hidden gems
            </label>

            <label className={styles.label}>
              Stay informed on safety alerts
            </label>

            <label className={styles.label}>
              Recieve community announcements
              <button type="checkbox" className={styles.checkbox}></button>
            </label>
          </form>
        </div> */}
      </div>
    </div>
  );
}