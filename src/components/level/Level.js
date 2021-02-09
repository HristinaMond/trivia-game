import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import star from '../../images/star.png';
import Button from '../button/Button';

const Level = () => {

    let [difficultyLevel, setDifficultyLevel] = useState('easy');
    let [responseData, setResponseData] = useState({ results: [0] });
    let [filteredQuestions, setFilteredQuestions] = useState({ results: [{ question: "This is a question", answers: ["answe1"] }] });
    let [selectedAnswer, setSelectedAnswer] = useState(true);

    const difficultyLevelHandler = (event) => {

        setSelectedAnswer(event.target.value)

        // sets difficulty level
        setDifficultyLevel(difficultyLevel = event.target.value);

        // returns new filtered list by the selected difficulty
        let filter = responseData !== 0 && responseData.results.filter(question => question.difficulty === difficultyLevel);
        setFilteredQuestions(filter);

    }

    useEffect(() => {
        const loadData = async () => {

            try {
                const response = await axios.get("https://opentdb.com/api.php?amount=10");
                setResponseData(response.data)

            } catch (error) { console.log(error.message) }

        };

        loadData();

    }, [])



    return (


        <div className="trivia-time__container">

            <div className="trivia-time__headings">
                <h1 className="trivia-time__title">TriviaTime</h1>
                <h2 className="trivia-time__subtitle">Pick your level of difficulty</h2>
            </div>

            <Button class="purple" name="easy" value="easy" label="Go easy on me" click={(event) => difficultyLevelHandler(event)}>
                <img src={star} className={selectedAnswer === "easy" ? "trivia-time__image d-block" : "trivia-time__image"} alt="star" />
            </Button>
            <Button class="purple" name="medium" value="medium" label="Bring it on" click={(event) => difficultyLevelHandler(event)}>
                <img src={star} className={selectedAnswer === "medium" ? "trivia-time__image d-block" : "trivia-time__image"} alt="star" />
            </Button>
            <Button class="purple" name="hard" value="hard" label="Insanity mode" click={(event) => difficultyLevelHandler(event)}>
                <img src={star} className={selectedAnswer === "hard" ? "trivia-time__image d-block" : "trivia-time__image"} alt="star" />
            </Button>

            {/* sends filterd questions by difficulty via Link state */}
            <Link to={{
                pathname: "/play",
                state: { questions: filteredQuestions }
            }}>
                <Button class="pink" name="start" value="start" label="Play now" />
            </Link>

        </div >
    )
}


export default Level;


