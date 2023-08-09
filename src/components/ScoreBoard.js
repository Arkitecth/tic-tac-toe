export default function ScoreBoard({heading, background, score}) {
    return(
      <div className={`score-board ${background}`}>
        <p> {heading} </p>
        <h2>{score}</h2>
      </div>
    )
  }