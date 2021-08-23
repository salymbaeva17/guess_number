import React, {useState} from 'react';

const Game = () => {
    const [number, setNumber] = useState(Math.round(Math.random() * 10))
    const [guess, setGuess] = useState("")
    const [freeAttempt, setFreeAttempt] = useState(3)
    const [message, setMessage] = useState("")
    const [score, setScore] = useState(0)
    const [prompt, setPrompt] = useState("")

    const handleClick = () => {
        if (number === +guess) {
        setMessage("Вы выиграли!")
        setPrompt("")
        localStorage.setItem(JSON.stringify(score), score.value)
        setScore(score + 1)
    } else if (freeAttempt - 1 === 0) {
        setMessage("Вы проиграли:(")
    }
        setGuess("")
        if (freeAttempt) {
            setFreeAttempt(freeAttempt - 1)
            if (number - +guess >= 2) {
                setPrompt("Недобор")
            } else if (+guess - number >= 2) {
                setPrompt("Перебор")
            }
        }
    }
    const handleRestart = () => {
        setNumber(Math.floor(Math.random() * 10))
        setGuess("")
        setFreeAttempt(3)
        setMessage("")
    }

    const handleInput = (e) => {
        setGuess(e.target.value)

    }
    return (
        <div className="row offset-4 my-5">
            <div className="col-6">
                <h2>Угадай число от 0 до 10</h2>
                <p>{prompt}</p>
                <div className="d-flex">
                    <input type="number" className="form-control" onChange={handleInput} value={guess}/>
                    <button onClick={handleClick} disabled={!guess.trim() || message === "Вы выиграли!"}
                            className="btn btn-success ms-2">Check
                    </button>
                    <button onClick={handleRestart} className="btn btn-warning ms-2">Restart</button>
                </div>
                {
                    message.length === 0 &&
                    <div>У вас осталось {freeAttempt} {freeAttempt === 1 ? "попытка" : "попытки"}</div>
                }
                <p>{message}</p>
                <p>Ваш счёт: {score}</p>
            </div>
        </div>
    );
};

export default Game;