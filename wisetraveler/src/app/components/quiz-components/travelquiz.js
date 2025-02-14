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
  const [southAfrica, setSouthAfrica] = useState(0);
  const [egypt, setEgypt] = useState(0);
  const [thailand, setThailand] = useState(0);
  const [india, setIndia] = useState(0);
  const [china, setChina] = useState(0);
  const [england, setEngland] = useState(0);
  const [italy, setItaly] = useState(0);
  const [germany, setGermany] = useState(0);
  const [mexico, setMexico] = useState(0);
  const [usa, setUsa] = useState(0);
  const [canada, setCanada] = useState(0);
  const [australia, setAustralia] = useState(0);
  const [brazil, setBrazil] = useState(0);
  const [peru, setPeru] = useState(0); 
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
    if (userChoices[0] === "") {
    }

    if (userChoices[0] === "") {
    }

    if (userChoices[0] === "") {
    }

    if (userChoices[0] === "") {
    }
  };

  const determineQuestionTwo = () => {
    if (userChoices[1] === "") {
    }

    if (userChoices[1] === "") {
    }

    if (userChoices[1] === "") {
    }

    if (userChoices[1] === "") {
    }
  };

  const determineQuestionThree = () => {
    if (userChoices[2] === "") {
    }

    if (userChoices[2] === "") {
    }
  };

  const determineQuestionFour = () => {
    if (userChoices[3] === "") {
    }

    if (userChoices[3] === "") {
    }

    if (userChoices[3] === "") {
    }

    if (userChoices[3] === "") {
    }
  };

  const determineQuestionFive = () => {
    if (userChoices[4] === "") {
    }

    if (userChoices[4] === "") {
    }

    if (userChoices[4] === "") {
    }

    if (userChoices[4] === "") {
    }
  };

  const determineQuestionSix = () => {
    if (userChoices[5] === "") {
    }

    if (userChoices[5] === "") {
    }

    if (userChoices[5] === "") {
    }

    if (userChoices[5] === "") {
    }
  };

  const determineQuestionSeven = () => {
    if (userChoices[6] === "") {
    }

    if (userChoices[6] === "") {
    }

    if (userChoices[6] === "") {
    }

    if (userChoices[6] === "") {
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
      { name: "South Africa", score: southAfrica },
      { name: "Egypt", score: egypt },
      { name: "Thailand", score: thailand },
      { name: "India", score: india },
      { name: "China", score: china },
      { name: "England", score: england },
      { name: "Italy", score: italy },
      { name: "Germany", score: germany },
      { name: "Mexico", score: mexico },
      { name: "The United States", score: usa },
      { name: "Canada", score: canada },
      { name: "Australia", score: australia },
      { name: "Brazil", score: brazil },
      { name: "Peru", score: peru },
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
