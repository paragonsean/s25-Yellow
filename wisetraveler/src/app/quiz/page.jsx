import styles from "./style.module.css";

export default function Quiz() {
  return (
    <div>
      <h1 className={styles.header}>Personalized Travel Quiz</h1>
      <div className={styles.quiz}>
        <p className={styles.description}>
          Answer a few questions about your travel preferences and get a
          personalized destination recommendation!
        </p>
      </div>
    </div>
  );
}
