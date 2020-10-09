//const validator = require('validator')
//import validator from 'validator'
import "./styles/main.scss"
import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
// import isEmail from 'validator/lib/isEmail'
// import tripleMe from './tripleMe'
// console.log(isEmail('john@aol.com'))
// console.log(tripleMe(100))

function App() {
    const [score, setScore] = useState(0)
    const [mistakes, setMistakes] = useState(0)
    const [currentProblem, setCurrentProblem] = useState(generateProblem()) 
    const [userAnswer, setUserAnswer] = useState('')
    const [showError, setShowError] = React.useState(false)
    const answerField = React.useRef(null)
    const resetButton = React.useRef(null)

    useEffect(() => {
      if (score == 10 || mistakes == 3) {
        setTimeout(() => resetButton.current.focus(), 580)
      }
    }, [score, mistakes])

    
    function generateNumbers(max) {
        return Math.floor(Math.random() * (max + 1))
    }
    
    function generateProblem() {
        return {
            numberOne: generateNumbers(20),
            numberTwo: generateNumbers(20),
            operator: ['+', '-', 'x'][generateNumbers(2)]
        }
    }
    
      function handleSubmit(e) {
        e.preventDefault()

        answerField.current.focus()
        let corretAnswer
        if (currentProblem.operator == "+") corretAnswer = currentProblem.numberOne + currentProblem.numberTwo
        if (currentProblem.operator == "-") corretAnswer = currentProblem.numberOne - currentProblem.numberTwo
        if (currentProblem.operator == "x") corretAnswer = currentProblem.numberOne * currentProblem.numberTwo
        
        
        if (corretAnswer == parseInt(userAnswer, 10)) {
          setScore((prev) => prev + 1) 
          setCurrentProblem(generateProblem())
          setUserAnswer("")
        } else {
          setMistakes((prev) => prev + 1) 
          setShowError(true)
          setTimeout(( () => setShowError(false), 580))
        } 
      }

      function resetGame() {
        setScore(0)
        setMistakes(0)
        setUserAnswer("")
        setCurrentProblem(generateProblem())
        answerField.current.focus()
      }

      return (
      <>
        <div className="app">
            <p className="problem">{currentProblem.numberOne} {currentProblem.operator} {currentProblem.numberTwo}</p>
            <form onSubmit={handleSubmit} action="" className="answer">
                <input ref={answerField} value={userAnswer} onChange={e => setUserAnswer(e.target.value)} type="number" className="answer-field" autocomplete="off"/>
                <button className="btn">Answer</button>
            </form>
            <p className="status">You need <span className="points-needed">{10 - score}</span> more points to win, and are allowed to make <span className="mistakes-allowed">{2 - mistakes}</span> more mistakes</p>
    <ProgressBar score = {score}/>    
                </div>
    
        <div className={"overlay" + (mistakes == 3 || score == 10 ? " overlay--visible" : "")}>  
            <div className="overlay-inner">
                <p className="end-message">{score == 10 ? "Congrats! You won." : "Sorry, you lost."}</p>
                <button className="reset-button">Start Over</button>
            </div>
        </div>
      </>)
    }
    
    function ProgressBar(props) {
      return (
      <div className="progress">
                <div className="boxes">
                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>
                </div>
                <div className="progress-inner" style={{transform: `scaleX(${props.score/10})`}}></div>
            </div>
    
      )
    }
    ReactDOM.render(<App />, document.getElementById("app"))

if (module.hot) {
    module.hot.accept()
}