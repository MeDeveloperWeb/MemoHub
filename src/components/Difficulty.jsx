import difficultyData from './difficultyData';
import { capitalize } from './utils';

export default function Difficulty({ setDifficulty }) {
  return (
    <section className="difficulty" title="Choose Difficulty">
      <p>Choose your Game difficulty:</p>
      <ul className="button-list">
        {difficultyData.map((item) => (
          <li key={item.level}>
            <button onClick={() => setDifficulty(item)} type="button">
              {capitalize(item.level)}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
