import { useState} from "react";
import x from "../assets/icon-x.svg"
import o from "../assets/icon-o.svg"
import logo from "../assets/logo.svg";
import restart from "../assets/icon-restart.svg"
import Square from "./Square";
import Modal from "./Modal";
import ScoreBoard from "./ScoreBoard";
import RestartModal from "./RestartModal";

export default function Board({ isVisbile,  showMenu, playerLetters, isCpu, playerMarker}) {
    const [xisNext, setXisNext] = useState(true); 
    const [squares, setSquares] = useState(Array(9).fill(null)); 
    const [xScore, setXScore] = useState(0); 
    const [oScore, setOScore] = useState(0); 
    const [tie, setTie] = useState(0); 
    const [restartClicked, setRestartClicked] = useState(false); 
    let winner = determineWinner(squares); 
    let msg = ""; 
  
    function handleScore() {
      if(winner && winner[0] === x) {
        setXScore(xScore + 1); 
      }
      else if(winner && winner[0] === o) {
        setOScore(oScore + 1); 
      } else {
        setTie(tie + 1); 
      }
    }
  
    function determineMessage() {
      let player1Marker = getMarker()[0]; 
  
      switch (true) {
        case isCpu && winner && player1Marker === winner[0]:
          msg = "You Won!";
          break;
        case isCpu && winner && player1Marker !== winner[0]:
          msg = "Oh no, you lost...";
          break;
  
        case !isCpu && winner && player1Marker === winner[0]:
          msg = "Player 1 Wins!";
          break;
        
        case !isCpu && winner && player1Marker !== winner[0]:
          msg = "Player 2 Wins!";
          break;
      
        default:
          msg = ""; 
          break;
      }
    }
  
  
    determineMessage();
  
    function getMarker() {
      let player1Marker = x;
      let player2Marker = o;  
      if(playerMarker === "x") {
        player2Marker = o;
        player1Marker = x; 
      } else {
        player2Marker = x; 
        player1Marker = o; 
      }
      return [player1Marker, player2Marker];  
    }
  
    function handleCpu() {
      let marker = getMarker()[1]; 
      if(isCpu && winner === null && squares.includes(null)) {
        setTimeout(() => {
          const newSquares = squares.slice();
          let randomNumber = Math.floor(Math.random() * 9); 
          while(newSquares[randomNumber] !== null) {
          randomNumber = Math.floor(Math.random() * 9); 
          }
          if(marker === x && xisNext) {
            newSquares[randomNumber] = x;
            setSquares(newSquares);
            setXisNext(!xisNext);
            document.querySelector('.square').style.pointerEvents = "none"; 
          } else if(marker === o && !xisNext) {
            newSquares[randomNumber] = o;
            setSquares(newSquares);
            setXisNext(!xisNext);
          }
        }, 250)
      }
       
    }
  
    handleCpu(); 
   
    function handlePlayer(i) {
      const newSquares = squares.slice(); 
      
      if(newSquares[i]) {
        return; 
      }
      if(xisNext) {
        newSquares[i] = x;
      } else {
        newSquares[i] = o;  
       
      }
      setXisNext(!xisNext);
      setSquares(newSquares);
    }
  
    function handleQuit() {
      if(!isVisbile) {
        document.querySelector('body').classList.remove('overlay'); 
        showMenu(!isVisbile);
      }
    }
  
    function handleRestartState() {
      setRestartClicked(!restartClicked); 
    }
  
    function handleRestart() {
      setSquares(Array(9).fill(null)); 
      setXisNext(true);
      handleRestartState(); 
    }
    
    function handleNextGame() {
      setSquares(Array(9).fill(null)); 
      setXisNext(true);
      handleScore(); 
      const squareDivs = document.querySelectorAll('.square'); 
      squareDivs.forEach((element) => {
        element.classList.remove('x-highlight');
        element.classList.remove('o-highlight');
      })
    }
    
    return(
      <div className="grid-container">
          <img className="game-logo" src={logo} alt="logo" />
          <div className="turn-indicator"> 
          {xisNext ?
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.7231 3.30608L16.6939 0.276913C16.3247 -0.0923043 15.7261 -0.0923043 15.3569 0.276913L10 5.63378L4.64314 0.276913C4.27392 -0.0923043 3.6753 -0.0923043 3.30608 0.276913L0.276913 3.30608C-0.0923043 3.6753 -0.0923043 4.27392 0.276913 4.64314L5.63378 10L0.276913 15.3569C-0.0923043 15.7261 -0.0923043 16.3247 0.276913 16.6939L3.30608 19.7231C3.6753 20.0923 4.27392 20.0923 4.64314 19.7231L10 14.3662L15.3569 19.7231C15.7261 20.0923 16.3247 20.0923 16.6939 19.7231L19.7231 16.6939C20.0923 16.3247 20.0923 15.7261 19.7231 15.3569L14.3662 10L19.7231 4.64314C20.0923 4.27392 20.0923 3.6753 19.7231 3.30608Z" fill="#A8BFC9"/>
          </svg>: 
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10ZM5.92593 10C5.92593 7.74995 7.74995 5.92593 10 5.92593C12.25 5.92593 14.0741 7.74995 14.0741 10C14.0741 12.25 12.25 14.0741 10 14.0741C7.74995 14.0741 5.92593 12.25 5.92593 10Z" fill="#A8BFC9"/>
        </svg>
        }
            <p>Turn</p>
          </div>
          <img onClick={handleRestartState} className="gray-btn" src={restart} alt="restart" />
          {squares.map((images, i) => {
            return <Square key={i} player={images} onSquareClick={() => handlePlayer(i)} id={i}/>
          })} 
          
          <ScoreBoard heading={playerLetters[0]} score={xScore}/>
          <ScoreBoard heading={'Ties'} background={'silver'} score={tie}/>
          <ScoreBoard heading={playerLetters[1]} background={'yellow'} score={oScore}/> 
          <Modal message={msg} winnerArray={winner} onQuit={handleQuit} onNextGame={handleNextGame} squares={squares}/>
  
          {restartClicked ? <RestartModal onCancel={handleRestartState} onRestart={handleRestart} /> : null }
      </div>
    )
  }

  function determineWinner(squares) {
    const winningPositions = [
      [0, 1, 2], 
      [3, 4, 5], 
      [6, 7, 8], 
      [0, 3, 6], 
      [1, 4, 7], 
      [2, 5, 8], 
      [0, 4, 8], 
      [2, 4, 6] 
    ]; 
  
    for(let i = 0; i < winningPositions.length; i++) {
      const [a, b, c] = winningPositions[i]; 
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [squares[a], winningPositions[i]]; 
      }
    }
  
    return null; 
  
  }