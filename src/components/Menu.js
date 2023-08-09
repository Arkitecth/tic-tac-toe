import { useState} from "react";
import logo from "../assets/logo.svg";
import MenuButtons from "./MenuButtons";
import Board from "./Board";
export default function Menu() {
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

