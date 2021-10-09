import { useState } from "react";
import PlayerSection from "./Components/PlayerSection";
import imgArray from "./img/imgArray"
import Letters from "./Components/Letters"

let wordArray = []
let chosenWord = ""
let wrongLetters = []
let remainingTries = 6
let chosenLetters = []

function App() {

  function saveWord() {
    if (newWord.length < 3) {
      alert("Word must be at least 3 letters long!");
    } else {
      chosenWord = newWord
      wordArray.length = chosenWord.length
      for (let i=0; i<wordArray.length; i++) {
        wordArray[i] = "__"
      }
      setWord("")
      setGameOver(false)
      setHeader(`Guesser: Type in a letter, then click "Check"`)
      setClassName("guesser-header")
      setHostDisplayed({display: "none"})
      setGuesserDisplayed({display: "block"}) 
    }
  }
  function restart() {
    wordArray = []
    setWord("")
    setLetter("")
    setGameOver(true)
    setHeader(`Host: Choose a word and then click "OK"`)
    setClassName("host-header")
    setHostDisplayed({display: "block"})
    setGuesserDisplayed({display: "none"}) 
    remainingTries = 6
    wrongLetters = []
    chosenLetters = []
  }

  function lettersFunction() {
      if (chosenLetters.includes(newLetter)) {
        setLetter("")
        alert("Letter already chosen!")
        return
      }
      if (newLetter === "") {
        alert("Type in a letter!")
        return
      }
      chosenLetters.push(newLetter)
      for (let i = 0; i < chosenWord.length; i++) {
        if (chosenWord[i] === newLetter) {
          wordArray[i] = newLetter
        }
      }
      
      if (!wordArray.includes(newLetter)) {
        remainingTries --
        wrongLetters.push(newLetter)
      }

      if (remainingTries === 0) {
        setHeader("Host Wins!")
        setClassName("host-victory")
        setGameOver(true)
      }

      if (wordArray.join("") === chosenWord) {
        setHeader("Guesser Wins!")
        setClassName("guesser-victory")
        setGameOver(true)
      }

      setLetter("")
  }

  const [word, setWord] = useState("")
  const [letter, setLetter] = useState("")
  const [gameOver, setGameOver] = useState(true)
  const [header, setHeader] = useState(`Host: Choose a word and then press "OK"`)
  const [className, setClassName] = useState("host-header")
  const [hostDisplayed, setHostDisplayed] = useState({display: "block"})
  const [guesserDisplayed, setGuesserDisplayed] = useState({display: "none"})
  let notLetters = /[^a-zA-Z]/ig
  let newWord = word.replace(notLetters, '').toLowerCase()
  let newLetter = letter.replace(notLetters, '').toLowerCase()

  

  return (
    <div className="App">

      <h1 className={className}>{header}</h1>
      
      <PlayerSection 
        className="host" 
        hostDisplayed={hostDisplayed} 
        inputMaxLength="30" 
        inputValue={newWord} 
        btnClick={saveWord} 
        inputChange={setWord} 
        btnText="OK" 
      />

      <div className="guesser" style={guesserDisplayed}>
        <PlayerSection 
          gameOver={gameOver} 
          inputMaxLength="1" 
          inputValue={newLetter} 
          btnClick={lettersFunction} 
          inputChange={setLetter} 
          btnText="Check" 
        />

        <Letters 
          containerName="letters-container" 
          letterArray={wordArray}
          lettersDivName="letters"
          letterName="letter"
        />
        
        <p className="remaining">Wrong Letters: {remainingTries} remaining</p>
        
        <Letters 
          containerName="wrong-letters-container" 
          letterArray={wrongLetters}
          lettersDivName="wrong-letters"
          letterName="wrong-letter"
        />

        <img src={imgArray[6-remainingTries]} alt="hangman images" />
        <button onClick={restart}>Restart</button>

      </div>
    </div>
  );
}

export default App;
