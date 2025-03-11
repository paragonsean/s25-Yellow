"use client";
import styles from "./style.module.css";
import { useState, useEffect } from "react";
import React from "react";
import Image from "next/image"
import Toggle from "./Toggle";

export default function Profile()
{
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [password,setPassword] = useState("");
  const [toggled, setToggled] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userEmail = params.get("email");
    if (userEmail) {
      setEmail(userEmail);
      //fetchData(userEmail); // UNCOMMENT THIS WHEN GET ROUTE IS IMPLEMENTED
    }
  }, []);

  const fetchData = async (email) => {
    try {
      const response = await axios.get(`api/user/${email}`);
      setUserData(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const UpdateProfile = async () => {
    // DO NOT UPDATE EMAIL (EMAIL SHOULD BE READ-ONLY)
    try
    {
      const response = await fetch("/api/profile", 
      {
        method: "POST",
        headers: 
        {
          "Content -Type": "application/json",
        },

        body: JSON.stringify({name, location, bio, password}),
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
      alert(error.message);
    }
  };

  const updateInfo = (e) => {
    e.preventDefault();
    UpdateProfile();
  };

  const updatePassword = (e) => {
    e.preventDefault();
    // TODO: UPDATE PASSWORD
  };


  const updatePic = (e) => {  
    e.preventDefault();
    // TODO: UPDATE PICTURE
  };
  
  return (
  <div>
      <h1 className={styles.header} style={{ margin: "5% 20% 3% 20%" }}>Profile Settings for {email}</h1>

      <button type="button" className={styles.PButton}>Save Changes</button>
      <button type="button" className={styles.PButton}>Edit name</button>
      <button type="button" className={styles.PButton}>Edit date of birth</button>
      <button type="button" className={styles.PButton}>Turn on/off notifications</button>
      <button type="button" className={styles.PButton}>Manage phone number</button>
      
      <div className={styles.he} style={{display: "flex", justifyContent: "center"}}>
        <Image
          src={"/images/avatar-placeholder.jpg"}
          alt="Profile"
          width={200}
          height={200}
          className={styles.profileImage}
        />
      
        <button type="button" className={styles.PicButton} onClick={updatePic}> 
          Change Profile Picture
        </button>
      </div>
     
      <div className={styles.profileContainer}>
        <div className={styles.personalInfoContainer}>
          <h1 className={styles.header}>Personal Information</h1>
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
              <button
                type="button"
                className={styles.button}
                onClick={updateInfo}
              >
                Update Info
              </button>
              
             ___________________________________________________________________
            </form>
          </div>
        </div>

        <div className={styles.securityInfoContainer}>
            <h1 className={styles.header}>Account Security</h1>
        <div>
          <form className={styles.form}>
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

            <button type="button" className={styles.PButton}
              onClick={updatePassword}
            >
            Update Password
            </button>
            ___________________________________________________________________
          </form>
        </div>

        <div className={styles.notificationsContainer}>
          <h1 className={styles.header}>Notification Preferences</h1>
          <div>
            <form
              className={styles.form}>
              <label className= {styles.label}>
                <div>
                  Recieve updates on top destinations {() => setToggled(!toggled)}
                  <Toggle onChange={(event) => setToggled(event.target.checked)}>
                  </Toggle>
                </div>
              </label>
              ___________________________________________________________________

              <label className= {styles.label}>
                <div>
                  Get notified about hidden gems {() => setToggled(!toggled)}
                  <Toggle onChange={(event) => setToggled(event.target.checked)}>
                  </Toggle>
                </div>
              </label>
            ___________________________________________________________________

              <label className= {styles.label}>
                <div>
                  Stay informed on safety alerts {() => setToggled(!toggled)}
                  <Toggle onChange={(event) => setToggled(event.target.checked)}>
                  </Toggle>
                </div>
              </label>
              ___________________________________________________________________

              <label className= {styles.label}>
                <div>
                  Recieve community announcements {() => setToggled(!toggled)}
                  <Toggle onChange={(event) => setToggled(event.target.checked)}>
                  </Toggle>
                </div>
              </label>
              ___________________________________________________________________
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}