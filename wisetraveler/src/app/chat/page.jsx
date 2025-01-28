import React from "react";
import Link from "next/link";
import styles from "./page.module.css"

export default function Chat(){
    return(
        <div className={styles.chatPage}>
            <section className={styles.sideBar}>
            <Link href="/">Home</Link>
            <button className={styles.newChatbutton}>+ New Chat</button>
            <ul className={styles.otherPages}>
                <li>Search</li>
                <li>Recomendation</li>
                <li>My trip</li>
            </ul>
            <nav>
                <p>&copy; {new Date().getFullYear()} WiseTraveler</p>
            </nav>
            </section>

            <section className={styles.chat}>
                <h1>WiseTraveler</h1>
                <ul className={styles.conversations}>

                </ul>
                <div className={styles.bottomSection}>
                    <div className={styles.inputContainer}>
                        <input type="text" />
                        <div id={styles.submit}></div>
                    </div>
                    <p>Discover the World with WiseTraveler</p>

                </div>
            </section>
            <section className={styles.map} >
                map
            </section>
        </div>
    

    );
}