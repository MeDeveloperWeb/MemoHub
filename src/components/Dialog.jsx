export default function Dialog({ gameStatus, modalRef }) {
  return (
    <dialog className="result-modal" ref={modalRef}>
      {gameStatus === 'won'
        ? 'Congratulation! You Won!'
        : 'You Lost!! Try again'}

      <button type="button" onClick={() => window.location.reload()}>
        Restart
      </button>
    </dialog>
  );
}
