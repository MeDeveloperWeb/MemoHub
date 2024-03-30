import { useState } from 'react';
import Difficulty from './components/Difficulty';

function App() {
  const [difficulty, setDifficulty] = useState(null);

  return difficulty === null ? (
    <Difficulty setDifficulty={setDifficulty} />
  ) : (
    <h1>Hi</h1>
  );
}

export default App;
