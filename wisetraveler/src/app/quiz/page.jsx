import styles from "./style.module.css";
import TravelQuiz from "../components/quiz-components/travelquiz";

export default function Quiz() {
  return (
    <div>
      <h1 className={styles.header}>Personalized Travel Quiz</h1>
      <div className={styles.quiz}>
        <p className={styles.description}>
          At WiseTraveler, we recognize that choosing the perfect travel
          destination can be overwhelming. To simplify your decision-making
          process, we have developed a quick and engaging quiz consisting of
          just seven questions. 
          <br/> <br/>
          This fun and insightful tool will guide you in
          discovering the ideal country to explore, tailored to your unique
          preferences and interests. Take the quiz and embark on your next
          adventure with confidence!
        </p>
        <TravelQuiz />
      </div>
    </div>
  );
}
