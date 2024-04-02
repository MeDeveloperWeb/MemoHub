export default function Dialog({ gameStatus, modalRef }) {
  return (
    <dialog className="result-modal" ref={modalRef}>
      <div>
        {gameStatus === 'won'
          ? 'Congratulations! You Won!'
          : 'You Lost!! Try again'}
      </div>

      <button type="button" onClick={() => window.location.reload()}>
        Restart
      </button>
    </dialog>
  );
}
