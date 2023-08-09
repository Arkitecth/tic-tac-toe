export default function MenuButtons({onYellowClicked, onBlueClicked}) {
    return(
      <>
       <button onClick={onYellowClicked} className="y-button">New Game (VS CPU)</button>
       <button onClick={onBlueClicked} className="green-button">New Game (VS PLAYER)</button>
      </>
     
    )
  }