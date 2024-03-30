/* eslint-disable react/prop-types */
const difficultyLevel = ['easy', 'medium', 'hard'];

export default function Difficulty({ setDifficulty }) {
  return (
    <section className="difficulty" title="Choose Difficulty">
      <p>Choose your Game difficulty:</p>
      <ul className="button-list">
        {difficultyLevel.map((item) => (
          <li key={item}>
            <button onClick={() => setDifficulty(item)} type="button">
              {capitalize(item)}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function capitalize(string) {
  return string[0].toUpperCase() + string.substring(1);
}
