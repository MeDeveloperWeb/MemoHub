import { useState } from 'react';
import Difficulty from './components/Difficulty';
import Game from './components/Game';
import './App.css';

function App() {
  const [difficulty, setDifficulty] = useState(null);
  const [gameStatus, setGameStatus] = useState('ongoing');

  return difficulty === null ? (
    <Difficulty setDifficulty={setDifficulty} />
  ) : (
    <Game
      count={difficulty.cardCount}
      setGameStatus={setGameStatus}
      gameStatus={gameStatus}
    />
  );
}

export default App;
