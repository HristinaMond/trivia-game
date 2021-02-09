import React, { useEffect, useState } from 'react';
import { decode } from 'html-entities';
import Result from '../result/Result';
import Button from '../button/Button';


const Question = (props) => {

    let [isAnswerClicked, setIsAnswerClicked] = useState(false);
    let [questions, setQuestions] = useState(props.location.state.questions);
    let [answers, setAnswers] = useState({ q: "", a: [] })
    let [correctAnswer, setCorrectAnswer] = useState('');
    let [count, setCount] = useState(0);
    let [score, setScore] = useState(0);
    let [isCorrect, setIsCorrect] = useState(false);
    let [showQuestion, setShowQuestion] = useState(false);
    let [winner, setWinner] = useState(false);

    console.log(props.location.state.questions)
    // shows next question
    const nextQuestionHandler = () => {
        if (count !== questions.length) {
            setQuestions(questions);
            setAnswers(() => answersHandler(questions[count]));
            setIsAnswerClicked(false);
            console.log(count)
            console.log(questions.length)
        } else {
            setWinner(count === questions.length);
        }


        return count === questions.length;
    }

    // creates list of correct and incorrect answers and shuffles them
    const answersHandler = (questionList) => {

        if (questionList) {
            let incorrectAnswers = [];
            let correctAnswers = "";
            let allAnswers = [];
            let questionContainer = { q: "", a: [] };

            incorrectAnswers = [...incorrectAnswers, ...questionList.incorrect_answers]
            correctAnswers = questionList.correct_answer
            allAnswers = [...incorrectAnswers, correctAnswers]

            setCorrectAnswer(questionList.correct_answer)

            for (var i = allAnswers.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = allAnswers[i];
                allAnswers[i] = allAnswers[j];
                allAnswers[j] = temp;

            }

            questionContainer.q = questionList.question;
            questionContainer.a = [...questionContainer.a, ...allAnswers]
            setAnswers(questionContainer)
        }



    }


    const correctAnswerHandler = (event) => {

        setCount(correctAnswer === event.target.value && count <= questions.length ? count + 1 : count)
        setScore(correctAnswer === event.target.value ? score + 1 : score);
        console.log("Correct answer --question component-- " + correctAnswer + " " + " clicked answer " + event.target.value);
        setIsCorrect(correctAnswer === event.target.value);
        setIsAnswerClicked(true);
        setShowQuestion("");
        return correctAnswer === event.target.value;
    }


    useEffect(() => { setAnswers(() => questions[count] && answersHandler(questions[count])) }, [])


    return (

        <div className="trivia-time__container">
            {<div className={isAnswerClicked ? "d-none" : "trivia-time__question"}>
                {console.log("answer clicked " + isAnswerClicked)}
                {console.log("this!!!")}
                {console.log(answers)}
                {answers &&
                    <>
                        <div className="trivia-time__subtitle m-0">
                            <h2>{decode(answers.q)}</h2>
                        </div>
                        <div className="trivia-time__answer m-auto">
                            {answers.a
                                .map((value, index) => (
                                    <div key={index}>
                                        <div className={showQuestion === value ? "overlay d-flex-center" : "d-none"}>
                                            <span>{decode(value)}</span>

                                            <div className="trivia-time__btns">
                                                <Button class="cancel" value="&#10005;" label="&#10005;" click={() => setShowQuestion("")} />
                                                <Button class="select" value={decode(value)} label="&#10003;" click={(event) => correctAnswerHandler(event)} />
                                            </div>
                                        </div>

                                        <Button class="purple" value={decode(value)} label={decode(value)} click={(event) => setShowQuestion(event.target.value)} />

                                    </div>
                                ))}
                        </div>
                    </>

                }

            </div>}
            {isAnswerClicked || winner ? <Result answer={isCorrect} score={score} nextclickQuestion={nextQuestionHandler} winner={winner} /> : null}
        </div >
    );
}

export default Question;