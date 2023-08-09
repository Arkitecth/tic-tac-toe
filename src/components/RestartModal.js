
export default function RestartModal({onCancel, onRestart}) {
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
  