"use client";
import styles from "./style.module.css";
import { useState } from "react";
import React from "react";
import Image from "next/image";

export default function Itinerary()
{
  const [destination,setDestination] = useState("");
  const [language,SetLanguage] = useState("");

  const Choose = async () =>
  {
    try
    {
      const response = await fetch("/api/Itinerary",
      {
        method: "POST",
        headers:
        {
          "Content -Type": "application/json",
        },

        body: JSON.stringify({destination}),
      });
      
      if (response.ok)
      {
        const data = await response.json();
        alert("Destination is Set.");
      }
        
      else
      {
        alert("Destination is Invalid.");
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
    Choose();
  };

  return (
    <div>
      <h1 className={styles.header}>Customize Your Travel Preferences</h1>
      <div>
        <form
          className={styles.form}>
          <label className={styles.label}>
            Preferred Destination
            <input
              id="destination"
              type="destination"
              name="destination"
              placeholder="Enter Destination..."
              className={styles.input}
              required
              onChange={(e) => setDestination(e.target.value)}
            />
          </label>

          <label className={styles.label}>
            Type of Trip
          </label>

          <div style={{display: "flex"}}>
            
            <button type="button" className={styles.TripButton}> 
              Solo Trip
            </button>

            <button type="button" className={styles.TripButton}> 
              Couples Trip
            </button>

            <button type="button" className={styles.TripButton}> 
              Friends Trip
            </button>

            <button type="button" className={styles.TripButton}> 
              Family Vacation
            </button>

            <button type="button" className={styles.TripButton}> 
              Company Retreat
            </button>

            <button type="button" className={styles.TripButton}> 
              Event
            </button>

            <button type="button" className={styles.TripButton}> 
              Other
            </button>
          </div>

          <label className={styles.label}>
            Preferred Activities
          </label>

          <div style={{display: "flex"}}>

            <button type="button" className={styles.TripButton}> 
              Local Food
            </button>

            <button type="button" className={styles.TripButton}> 
              Luxury
            </button>

            <button type="button" className={styles.TripButton}> 
            Outdoors
            </button>

            <button type="button" className={styles.TripButton}> 
              Popular Attractions
            </button>

            <button type="button" className={styles.TripButton}> 
              Nightlife
            </button>

            <button type="button" className={styles.TripButton}> 
              Wildlife
            </button>

            <button type="button" className={styles.TripButton}> 
              Art
            </button>
          </div>

          <div style={{display: "flex"}}>

            <button type="button" className={styles.TripButton}> 
              Beach
            </button>

            <button type="button" className={styles.TripButton}> 
              History
            </button>

            <button type="button" className={styles.TripButton}> 
              Wellness
            </button>

            <button type="button" className={styles.TripButton}> 
              Placeholder
            </button>

            <button type="button" className={styles.TripButton}> 
              Wine
            </button>

            <button type="button" className={styles.TripButton}> 
              Museums
            </button>

            <button type="button" className={styles.TripButton}> 
              Adventure/Sports
            </button>
          </div>
        </form>
      </div>

      <h1 className={styles.header}>Your Personalized Travel Recommendations</h1>
      <form className={styles.form}>
        <div style={{display: "flex", justifyContent: "center", textAlign:"center"}}>
          <div>
            <Image
              src={"/images/Greece.webp"}
              alt="Itinerary"
              width={400}
              height={400}
              className={styles.Image}
            />
            <h2>Greece</h2>
          </div>
          
          <div>
            <Image
              src={"/images/paris.jpg"}
              alt="Itinerary"
              width={400}
              height={400}
              className={styles.Image}
            />
            <h2>Paris</h2>
          </div>

          <div>
            <Image
              src={"/images/seoul.jpg"}
              alt="Itinerary"
              width={400}
              height={400}
              className={styles.Image}
            />
            <h2>Seoul</h2>
          </div>
        </div>
      </form>

      <h1 className={styles.header}>Translation Tool</h1>
      <form className={styles.form}>
        <div style={{display: "flex"}}>

          <label className={styles.label}>
            Select Language To Translate From 

            <select
              name="selectedLang" 
              defaultValue="English"
              className={styles.LangButton}>
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
            </select>

            <input
              id = "language"
              type="language"
              name="language"
              placeholder="Enter Text..."
              className={styles.input2}
              required
              onChange={(e) => SetLanguage(e.target.value)}
              />
          </label>

          <label className={styles.label}>
            Select Language To Translate To 

            <select 
              name="selectedLang" 
              defaultValue="Spanish"
              className={styles.LangButton}>
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
            </select>

            <input
              id = "language"
              type="language"
              name="language"
              placeholder="Translation"
              className={styles.input2}
              required
              onChange={(e) => SetLanguage(e.target.value)}
            />
          </label>
        </div>
      </form>
    </div>
  );
}