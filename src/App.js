import logo from "./assets/logo.svg"
import x from "./assets/icon-x.svg"
import o from "./assets/icon-o.svg"
import restart from "./assets/icon-restart.svg"
import { useState, useEffect} from "react";

function App() {
  return (
    <div className="App">
      <Menu />
    </div>
  );
}

function Menu() {
  const [show, setShow] = useState(true); 
  const [players, setPlayers] = useState(["X (P1)", "O (P2)"])
  const [player1Marker, setPlayer1Marker] = useState("x"); 
  const [cpu, setCPU] = useState(false); 
  function handleBlueClick() {
    player1Marker === 'x' ? setPlayers(["X (P1)", "O (P2)"]) : setPlayers(["X (P2)", "O (P1)"])
    setCPU(false); 
    setShow(!show); 
  }

  function handleYellowClick() {
    player1Marker === 'x' ? setPlayers(["X (You)", "O (CPU)"]) : setPlayers(["X (CPU)", "O (You)"])
    setCPU(true); 
    setShow(!show); 
  }

  function handleX() {
    setPlayers(["X (P1)", "O (P2)"])
    setPlayer1Marker('x'); 
  }
  function handleO() {
    setPlayers(["X (P2)", "O (P1)"])
    setPlayer1Marker('o'); 
   
  }
  
  if(show) {
    return(
      <div className="menu-container">
          <img src={logo} alt="logo" />
          <div className="choice-block">
            <p>Pick Player 1's Mark</p>
            <div className="selection-block">
              {/* X */}
              <svg onClick={ handleX} className="menu-x" xmlns="http://www.w3.org/2000/svg" width="198" height="54" viewBox="0 0 198 54" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M114.557 16.2897L109.71 11.4431C109.12 10.8523 108.162 10.8523 107.571 11.4431L99 20.014L90.429 11.4431C89.8383 10.8523 88.8805 10.8523 88.2897 11.4431L83.4431 16.2897C82.8523 16.8805 82.8523 17.8383 83.4431 18.429L92.014 27L83.4431 35.571C82.8523 36.1617 82.8523 37.1195 83.4431 37.7103L88.2897 42.5569C88.8805 43.1477 89.8383 43.1477 90.429 42.5569L99 33.986L107.571 42.5569C108.162 43.1477 109.12 43.1477 109.71 42.5569L114.557 37.7103C115.148 37.1195 115.148 36.1617 114.557 35.571L105.986 27L114.557 18.429C115.148 17.8383 115.148 16.8805 114.557 16.2897Z" fill="#A8BFC9"/>
              </svg>
  
              {/* O */}
              <svg onClick={ handleO } className="menu-o" xmlns="http://www.w3.org/2000/svg" width="198" height="54" viewBox="0 0 198 54" fill="none">
                <rect width="198" height="54" rx="10" fill="#A8BFC9"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M114.741 26.8706C114.741 18.1055 107.636 11 98.8706 11C90.1055 11 83 18.1055 83 26.8706C83 35.6357 90.1055 42.7412 98.8706 42.7412C107.636 42.7412 114.741 35.6357 114.741 26.8706ZM92.4048 26.8706C92.4048 23.2996 95.2996 20.4048 98.8706 20.4048C102.442 20.4048 105.336 23.2996 105.336 26.8706C105.336 30.4416 102.442 33.3364 98.8706 33.3364C95.2996 33.3364 92.4048 30.4416 92.4048 26.8706Z" fill="#1A2A33"/>
              </svg>
                
            </div>
            <p className="remember-msg">Remember: X Goes First</p>
          </div>
          <MenuButtons onYellowClicked={handleYellowClick} onBlueClicked={handleBlueClick}/>
        </div>
    )
  } else {
    return <Board isVisbile={ show } showMenu={setShow} playerLetters={players} isCpu={cpu} playerMarker={ player1Marker }/>
  }

   
 
}

function MenuButtons({onYellowClicked, onBlueClicked}) {
  return(
    <>
     <button onClick={onYellowClicked} className="y-button">New Game (VS CPU)</button>
     <button onClick={onBlueClicked} className="green-button">New Game (VS PLAYER)</button>
    </>
   
  )
}



function Board({ isVisbile,  showMenu, playerLetters, isCpu, playerMarker}) {
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
    let player1Marker = getMarker[0]; 

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

function Square({player, onSquareClick, id}) {
  let classLetter = undefined; 
  
  if(player === o) {
    classLetter = 'o'; 
  } else {
    classLetter = 'x'; 
  }
  if(player === null) {
    return(
      <div className={`square a${id}`}  onClick={onSquareClick} >
        
      </div>
    )
  } else {
    return(
      <div  className={`square a${id}`} onClick={onSquareClick}>
        <img className={`letters ${classLetter}`} src={player}  alt="player" />
      </div>
    )
  }
}


function Modal({message, winnerArray, onQuit, onNextGame, squares}) {
  function isTied() {
    if(winnerArray === null) {
      return !squares.includes(null); 
    }
    return false; 
  }

  let tied = isTied(); 
  document.querySelector('body').classList.remove('overlay'); 
  useEffect(() => {
    if(!tied && winnerArray != null) {
      highlightWinner(winnerArray[0], winnerArray[1]) 
    }
  }, [winnerArray, tied]);
  
  function highlightWinner(winnerLetter, winningIndex) {
    if(!winnerLetter) {
      return; 
    }

    document.querySelector('body').classList.add('overlay');

    const firstSquare = document.querySelector(`div.square.a${winningIndex[0]}`); 
    const secondSquare =document.querySelector(`div.square.a${winningIndex[1]}`); 
    const thirdSquare = document.querySelector(`div.square.a${winningIndex[2]}`); 

    if(winnerLetter === x) {
      firstSquare.classList.add('x-highlight');
      secondSquare.classList.add('x-highlight'); 
      thirdSquare.classList.add('x-highlight');
     
    } else {
      firstSquare.classList.add('o-highlight'); 
      secondSquare.classList.add('o-highlight');
      thirdSquare.classList.add('o-highlight'); 
    } 
    firstSquare.firstElementChild.classList.add('dark');
    secondSquare.firstElementChild.classList.add('dark');  
    thirdSquare.firstElementChild.classList.add('dark'); 
    
  }


  if(winnerArray && winnerArray[0] === x) {
    return(
      <div className="modal">
        <p>{message}</p>
        <div className="winner-display">
          <img src={x} alt="winner-img" />
          <h2 className="x-color">Takes the Round</h2>
        </div>
        <button onClick={onQuit} className="gray-btn">Quit</button>
        <button onClick={onNextGame}className="small-y-btn">Next Round</button>
      </div>
      
    )
  } else if(winnerArray && winnerArray[0] === o) {
    return(
      <div className="modal">
      <p>{message}</p>
      <div className="winner-display">
        <img src={o} alt="winner-img" />
        <h2 className="o-color">Takes the Round</h2>
      </div>
      <button onClick={onQuit} className="gray-btn">Quit</button>
      <button onClick={onNextGame}className="small-y-btn">Next Round</button>
    </div>
    )
  } else if(tied) {
    return(
      <div className="modal">
      <p></p>
      <div className="winner-display">
        <h2 className="silver-color">Round Tied</h2>
      </div>
      <button onClick={onQuit} className="gray-btn">Quit</button>
      <button onClick={onNextGame}className="small-y-btn">Next Round</button>
    </div>
    )
  
  } else {
    return null; 
  }
  
}


function RestartModal({onCancel, onRestart}) {
  return(
    <div className="modal">
    <p></p>
    <div className="winner-display">
      <h2 className="silver-color">Restart Game?</h2>
    </div>
    <button onClick={onCancel} className="gray-btn">No, Cancel</button>
    <button onClick={onRestart}className="small-y-btn">Yes, Restart</button>
  </div>
  )
}

function ScoreBoard({heading, background, score}) {
  return(
    <div className={`score-board ${background}`}>
      <p> {heading} </p>
      <h2>{score}</h2>
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

export default App;
