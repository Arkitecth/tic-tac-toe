import x from "../assets/icon-x.svg"
import o from "../assets/icon-o.svg"
import { useEffect } from "react";
export default function Modal({message, winnerArray, onQuit, onNextGame, squares}) {
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
  