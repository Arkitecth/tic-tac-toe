import o from "../assets/icon-o.svg"
export default function Square({player, onSquareClick, id}) {
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
  