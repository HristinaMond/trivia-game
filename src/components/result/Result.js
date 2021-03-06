import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import correctAnswerImg from '../../images/correct.png';
import inCorrectAnswerImg from '../../images/incorrect.png';
import Button from '../button/Button';
import arrowNext from '../../images/arrow-next.png';
import arrowAgain from '../../images/arrow-again.png';

const Result = (props) => {
    let [result, setResult] = useState(true);

    useEffect(() => {

        let timer = setTimeout(() => {
            setResult(!props.answer)
        }, 1000);

        return () => clearTimeout(timer);

    }, [])

    return (
        <div className="trivia-time__results">
            <h4>{props.question}</h4>

            {props.answer ?
                <>
                    <div className={props.answer ? "trivia-time__circle m-auto" : "d-none"} atr="correct">
                        {!props.winner && <img src={correctAnswerImg} alt="correct" />}
                        {props.winner && props.score}
                    </div>
                    {

                        props.winner ?
                            <Route render={({ history }) => (
                                <Button class="pink" label="Again" click={() => { history.push('/') }}>
                                    <img src={arrowAgain} className="trivia-time__image d-block p-absolute l-80" alt="arrow-again" />
                                </Button>
                            )} /> :
                            <Button class="pink" label="Next" click={props.nextclickQuestion}>
                                <img src={arrowNext} className="trivia-time__image d-block p-absolute l-80" alt="arrow-next" />
                            </Button>
                    }


                </> :
                <>
                    <div className={!props.answer ? "trivia-time__circle m-auto" : "d-none"} atr="incorrect">
                        {!result ? <img src={inCorrectAnswerImg} alt="incorrect" /> : props.score}
                    </div>
                    <Route render={({ history }) => (
                        <Button class="pink" label="Again" click={() => { history.push('/') }}>
                            <img src={arrowAgain} className="trivia-time__image d-block p-absolute l-80" alt="arrow-again" />
                        </Button>
                    )} />

                </>
            }

        </div>
    );
}

export default Result;