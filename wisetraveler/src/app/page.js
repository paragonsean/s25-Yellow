import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}><i>Discover the World with WiseTraveler</i></h1>
      <div className={styles.topDestinations}>
        <h1>Top Destinations</h1>
        <div className={styles.destinations}>
          <div className={styles.destination}>
            <Image
              src={"/images/paris.jpg"}
              alt="Destination 1"
              width={600}
              height={400}
              className={styles.image}
            />
            <h2>Paris, France</h2>
          </div>
          <div className={styles.destination}>
            <Image
              src={"/images/seoul.jpg"}
              alt="Destination 2"
              width={600}
              height={400}
              className={styles.image}
            />
            <h2>Seoul, South Korea</h2>
          </div>
          <div className={styles.destination}>
            <Image
              src={"/images/sydney.webp"}
              alt="Destination 3"
              width={600}
              height={400}
              className={styles.image}
            />
            <h2>Sydney, Australia</h2>
          </div>
        </div>
        <button className={styles.button}>View All</button>
      </div>
      <div className={styles.hiddenGems}>
        <h1>Trending Hidden Gems</h1>
        <div className={styles.gems}>
          <div className={styles.gem}>
            <Image
              src={"/images/secretWaterfall.jpg"}
              alt="Gem 1"
              width={600}
              height={400}
              className={styles.image}
            />
            <h2>Secret Waterfall</h2>
          </div>
          <div className={styles.gem}>
            <Image
              src={"/images/mountainVillage.webp"}
              alt="Gem 2"
              width={600}
              height={400}
              className={styles.image}
            />
            <h2>Mountain Village</h2>
          </div>
          <div className={styles.gem}>
            <Image
              src={"/images/hiddenLake.jpg"}
              alt="Gem 3"
              width={600}
              height={400}
              className={styles.image}
            />
            <h2>Hidden Lake</h2>
          </div>
        </div>
        <button className={styles.button}>Explore More</button>
      </div>
      <div className={styles.safetyAlerts}>
        <h1>Safety Alerts</h1>
        <div className={styles.textBubble}>Stay safe on your next adventure with our safety alerts.</div>
        <button className={styles.button}>Get Alerts</button>
      </div>
      <div className={styles.aiPlanner}>
        <h1>AI Travel Planner</h1>
        <div className={styles.textBubble}>Get personalized travel plans and recommendations with our AI travel planner.</div>
        <button className={styles.button}>Get Started</button>
      </div>
    </div>
  );
}
