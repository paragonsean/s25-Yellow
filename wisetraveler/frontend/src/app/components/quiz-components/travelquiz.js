"use client";
import { useState, useEffect } from "react";
import { quiz } from "./questions";
import "./quiz.css";

const TravelQuiz = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  
  const [destinationRecommendation, setDestinationRecommendation] =
    useState("");
  const [mexico, setMexico] = useState(0);
  const [usa, setUsa] = useState(0);
  const [australia, setAustralia] = useState(0);
  const [england, setEngland] = useState(0);
  const [france, setFrance] = useState(0);
  const [germany, setGermany] = useState(0);
  const [china, setChina] = useState(0);
  const [thailand, setThailand] = useState(0);
  const [japan, setJapan] = useState(0);
  const [egypt, setEgypt] = useState(0);
  const [israel, setIsrael] = useState(0);
  const [brazil, setBrazil] = useState(0);

  const [userChoices, setUserChoices] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const { questions } = quiz;
  const { question, choices } = questions[activeQuestion];

  const onClickNext = () => {
    setSelectedAnswerIndex(null);
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      handleQuestions();
      determineRecomendation();
      setActiveQuestion(0);
      setShowResult(true);
    }
  };

  useEffect(() => {
    if (activeQuestion === questions.length - 1) {
      handleQuestions();
      determineRecomendation();
    }
  }, [userChoices]);

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index);

    setUserChoices((prevChoices) => {
      const updatedChoices = [...prevChoices];
      updatedChoices[activeQuestion] = answer;
      return updatedChoices;
    });
  };

  const determineQuestionOne = () => {
    if (userChoices[0] === "North America") {
      setUsa((prevValue) => prevValue + 3);
      setMexico((prevValue) => prevValue + 3);
    }

    if (userChoices[0] === "Europe") {
      setEngland((prevValue) => prevValue + 3);
      setGermany((prevValue) => prevValue + 3);
      setFrance((prevValue) => prevValue + 3);
    }

    if (userChoices[0] === "Asia") {
      setChina((prevValue) => prevValue + 3);
      setThailand((prevValue) => prevValue + 3);
      setJapan((prevValue) => prevValue + 3);
    }

    if (userChoices[0] === "Africa and Middle East") {
      setEgypt((prevValue) => prevValue + 3);
      setIsrael((prevValue) => prevValue + 3);
    }

    if (userChoices[0] === "Oceania") {
      setAustralia((prevValue) => prevValue + 3);
    }

    if (userChoices[0] === "South America") {
      setBrazil((prevValue) => prevValue + 3);
    }
  };

  const determineQuestionTwo = () => {
    if (userChoices[1] === "Family-friendly destinations") {
      setUsa((prevValue) => prevValue + 1);
      setJapan((prevValue) => prevValue + 1);
      setEngland((prevValue) => prevValue + 1);
      setFrance((prevValue) => prevValue + 1);
      setGermany((prevValue) => prevValue + 1);
      setAustralia((prevValue) => prevValue + 1);
    }

    if (userChoices[1] === "Suitable for solo or adult travel") {
      setEgypt((prevValue) => prevValue + 1);
      setIsrael((prevValue) => prevValue + 1);
      setBrazil((prevValue) => prevValue + 1);
      setMexico((prevValue) => prevValue + 1);
      setChina((prevValue) => prevValue + 1);
      setThailand((prevValue) => prevValue + 1);
    }
  };

  const determineQuestionThree = () => {
    if (userChoices[2] === "Warm and tropical") {
      setMexico((prevValue) => prevValue + 1);
      setThailand((prevValue) => prevValue + 1);
      setJapan((prevValue) => prevValue + 1);
      setUsa((prevValue) => prevValue + 1);
      setBrazil((prevValue) => prevValue + 1);
      setAustralia((prevValue) => prevValue + 1);
    }

    if (userChoices[2] === "Mild and temperate") {
      setEngland((prevValue) => prevValue + 1);
      setUsa((prevValue) => prevValue + 1);
      setFrance((prevValue) => prevValue + 1);
      setGermany((prevValue) => prevValue + 1);
      setChina((prevValue) => prevValue + 1);
    }

    if (userChoices[2] === "Cold or snowy") {
      setJapan((prevValue) => prevValue + 1);
      setGermany((prevValue) => prevValue + 1);
      setFrance((prevValue) => prevValue + 1);
      setUsa((prevValue) => prevValue + 1);
      setChina((prevValue) => prevValue + 1);
    }

    if (userChoices[2] === "Hot and arid") {
      setEgypt((prevValue) => prevValue + 1);
      setMexico((prevValue) => prevValue + 1);
      setUsa((prevValue) => prevValue + 1);
      setAustralia((prevValue) => prevValue + 1);
      setIsrael((prevValue) => prevValue + 1);
    }
  };

  const determineQuestionFour = () => {
    if (userChoices[3] === "Seafood and fresh ingredients") {
      setAustralia((prevValue) => prevValue + 1);
      setJapan((prevValue) => prevValue + 1);
    }

    if (userChoices[3] === "Street food and quick bites") {
      setUsa((prevValue) => prevValue + 1);
      setThailand((prevValue) => prevValue + 1);
      setBrazil((prevValue) => prevValue + 1);
    }

    if (userChoices[3] === "Fine dining and gourmet experiences") {
      setFrance((prevValue) => prevValue + 1);
      setEngland((prevValue) => prevValue + 1);
    }

    if (userChoices[3] === "Traditional or authentic dishes") {
      setIsrael((prevValue) => prevValue + 1);
      setEgypt((prevValue) => prevValue + 1);
      setGermany((prevValue) => prevValue + 1);
      setMexico((prevValue) => prevValue + 1);
      setChina((prevValue) => prevValue + 1);
    }
  };

  const determineQuestionFive = () => {
    if (userChoices[4] === "I prefer quieter, more peaceful destinations") {
      setAustralia((prevValue) => prevValue + 1);
      setThailand((prevValue) => prevValue + 1);
      setEgypt((prevValue) => prevValue + 1);
      setIsrael((prevValue) => prevValue + 1);
      setGermany((prevValue) => prevValue + 1);
      setFrance((prevValue) => prevValue + 1);
    }

    if (userChoices[4] === "I love big cities and crowded places") {
      setMexico((prevValue) => prevValue + 1);
      setUsa((prevValue) => prevValue + 1);
      setJapan((prevValue) => prevValue + 1);
      setEngland((prevValue) => prevValue + 1);
      setBrazil((prevValue) => prevValue + 1);
      setGermany((prevValue) => prevValue + 1);
      setFrance((prevValue) => prevValue + 1);
      setChina((prevValue) => prevValue + 1);
    }
  };

  const determineQuestionSix = () => {
    if (userChoices[5] === "I would prefer to visit a country that has plenty of English speakers") {
      setUsa((prevValue) => prevValue + 2);
      setEngland((prevValue) => prevValue + 2);
      setAustralia((prevValue) => prevValue + 2);
    }

    if (userChoices[5] === "I am comfortable with visiting a country that does not predominantly speak English") {
      setMexico((prevValue) => prevValue + 1);
      setFrance((prevValue) => prevValue + 1);
      setGermany((prevValue) => prevValue + 1);
      setEgypt((prevValue) => prevValue + 1);
      setIsrael((prevValue) => prevValue + 1);
      setBrazil((prevValue) => prevValue + 1);
      setThailand((prevValue) => prevValue + 1);
      setJapan((prevValue) => prevValue + 1);
      setChina((prevValue) => prevValue + 1);
    }
  };

  const determineQuestionSeven = () => {
    if (userChoices[6] === "Modern culture, architecture, and urban life") {
      setUsa((prevValue) => prevValue + 2);
      setEngland((prevValue) => prevValue + 2);
      setFrance((prevValue) => prevValue + 2);
      setMexico((prevValue) => prevValue + 1);
    }

    if (userChoices[6] === "Ancient history, ruins, and UNESCO World Heritage sites") {
      setEgypt((prevValue) => prevValue + 2);
      setIsrael((prevValue) => prevValue + 2);
      setMexico((prevValue) => prevValue + 1);
    }

    if (userChoices[6] === "Unique traditions, festivals, and a mix of old and new") {
      setChina((prevValue) => prevValue + 2);
      setJapan((prevValue) => prevValue + 2);
      setBrazil((prevValue) => prevValue + 1);
      setThailand((prevValue) => prevValue + 2);
    }

    if (userChoices[6] === "Relaxed, local culture, and connection with nature") {
      setAustralia((prevValue) => prevValue + 2);
      setGermany((prevValue) => prevValue + 1);
      setFrance((prevValue) => prevValue + 1);
    }
  };


  const handleQuestions = () => {
    determineQuestionOne();
    determineQuestionTwo();
    determineQuestionThree();
    determineQuestionFour();
    determineQuestionFive();
    determineQuestionSix();
    determineQuestionSeven();
  };

  const determineRecomendation = () => {
    const destinationScores = [
      { name: "Egypt", score: egypt },
      { name: "Thailand", score: thailand },
      { name: "China", score: china },
      { name: "England", score: england },
      { name: "Germany", score: germany },
      { name: "Mexico", score: mexico },
      { name: "The United States", score: usa },
      { name: "Australia", score: australia },
      { name: "Brazil", score: brazil },
      { name: "Japan", score: japan },
      { name: "Israel", score: israel },
      { name: "France", score: france },
    ];

    const maxScore = Math.max(
      ...destinationScores.map((destination) => destination.score)
    );

    const topDestinations = destinationScores
      .filter((destination) => destination.score === maxScore)
      .map((destination) => destination.name);

    const recommendationText =
      topDestinations.length > 1
        ? ` ${topDestinations.join(" or ")}`
        : `${topDestinations[0]}`;

    setDestinationRecommendation(recommendationText);
  };

  return (
    <div className="quiz-wrapper">
      <div className="quiz-container">
        {!showResult ? (
          <div>
            <div>
              <span className="active-question-no">{activeQuestion + 1}</span>
              <span className="total-question">
                / {questions.length}
              </span>
            </div>
            <h2>{question}</h2>
            <ul>
              {choices.map((answer, index) => (
                <li
                  onClick={() => onAnswerSelected(answer, index)}
                  key={answer}
                  className={
                    selectedAnswerIndex === index ? "selected-answer" : null
                  }
                >
                  {answer}
                </li>
              ))}
            </ul>
            <div className="flex-right">
              <button
                onClick={onClickNext}
                disabled={selectedAnswerIndex === null}
              >
                {activeQuestion === questions.length - 1 ? "Results" : "Next"}
              </button>
            </div>
          </div>
        ) : (
          <div className="result">
            <h3>WiseTraveler recommends visiting</h3>
            <p>{destinationRecommendation}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelQuiz;
