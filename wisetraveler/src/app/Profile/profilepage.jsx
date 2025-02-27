"use client";
import e from "express";
import styles from "./style.module.css";
import { useState } from "react";
import React from "react";

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

    constructor(props)
    {
      super(props);

      this.state = 
      {
        picture: false,
        src: false
      }
    }

    handleSelectedPicture(event)
    {
      var picture = event.target.files[0];
      var src = URL.createObjectURL(picture);

      this.setState(
      {
        picture: picture,
        src: src
      });
    }

    renderPreview()
    {
      if(this.state.src)
      {
        return (
          <img src = {this.state.src}/>
        );
      }

      else
      {
        return (
          <p>
            No Preview
          </p>
        );
      }
    }
  }

    upload() 
    {
      var formData = new FormData();

      formData.append("file", this.state.picture);

      $.ajax({
        url: "/api/profile",
        method: "POST",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function(response) {
          //Code for successful upload
        }
      });
    }

    render() 
    {

      return (
        <div>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width" />
      <title>Profile Settings</title>
      
      <form>
        <h1>Profile Settings</h1>
    
      <section>
        <p>
          <button type="submit">Save Changes</button>
        </p>
      </section>
      
      <section>
        <p>
          <button type="submit">Edit name</button>
        </p>
        
        <p>
          <button type="submit">Edit date of birth</button>
        </p>
      
        <p>
          <button type="submit">Turn on/off notifications</button>
        </p>
      
        <p>
          <button type="submit">Manage phone number</button>
        </p>
      </section>
      
      <img src="c:\Users\preda\Downloads\avatar-placeholder.jpg" alt="MDN" />
      <section>
        <p>
          <input 
            type= "file"
            onChange = {this.handleSelectedPicture.bind(this)}
          />
          <br/>
          <div>
            {this.renderPreview()}
          </div>
          <hr/>
          <button> 
            onClick ={this.upload.bind(this)}
            Change profile picture</button>
        </p>
      </section>
    
      <section>
        <p>
          <label htmlFor="name">
              <span>Username</span>
              <label>
                  <br />
                  <input type="name" id="name" name="name" 
                  required
                  onChange={(e) => setUsername(e.target.value)}/>
              </label>
              </label>
          </p>
        
        <p>
          <label htmlFor="mail">
            <span>Email </span>
            </label>
            <br />
            <input type="email" id="email" name="email" 
            required
            onChange={(e) => setEmail(e.target.value)}/>
            </p>
            
            <p>
              <label htmlFor="location">
                  <span>Location </span>
                  </label>
                  <br />
                  <input type="location" id="location" name="location" 
                  required
                  onChange={(e) => setLocation(e.target.value)}/>
                  </p>
                  <p>

              <label htmlFor="bio">
                  <span>Bio </span>
              </label>
              <br />
              <input type="bio" id="bio" name="bio" 
              required
              onChange={(e) => setBio(e.target.value)}/>
        </p>
      </section>
      
      <section>
        <h2>Account Security</h2>

        <p>
          <label htmlFor="currpwd">
            <span>Current password </span>
          </label>
          <br />
          <input type="password" id="password" name="password" 
          required
          onChange={(e) => setPassword(e.target.value)}/>
        </p>

        <p>
          <label htmlFor="newpwd">
            <span>New password </span>
          </label>
          <br />
          <input type="password" id="password" name="password" 
          required
          onChange={(e) => setPassword(e.target.value)}/>
        </p>

        <p>
          <label htmlFor="confirmnewpwd">
            <span>Confirm new password </span>
            </label>
              <br />
              <input type="password" id="password" name="password"
              required
              onChange={(e) => setPassword(e.target.value)}/>
      </p>
      </section>
      
      <section>
        <p>
          <button type="submit">Update Password</button>
        </p>
      </section>
      
      <section>
        <h3>Notification Preferences</h3>
        <p>
          <label className="recieve-switch">
            <span>Recieve updates on top destinations</span>
            <input type="checkbox" />
            <span className="slider" />
            </label>
          </p>

          <p>
          <label className="gem-switch">
            <span>Get notified about hidden gems</span>
            <input type="checkbox" />
            <span className="slider" />
          </label>
        </p>

        <p>
          <label className="safety-switch">
            <span>Stay informed on safety alerts</span>
            <input type="checkbox" />
            <span className="slider" />
          </label>
        </p>

          <p>
            <label className="announcement-switch">
              <span>Recieve community announcements</span>
              <input type="checkbox" />
              <span className="slider" />
            </label>
          </p>
        </section>
      </form>
    </div>
  );
}


