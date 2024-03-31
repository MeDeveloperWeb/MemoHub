import { useEffect, useRef, useState } from 'react';
import {
  getPokemonIdFromURL,
  getPokemonImageURL,
  getPokemons,
  pokemonCount
} from './pokemonData';
import Dialog from './Dialog';

export default function Game({ count, gameStatus, setGameStatus }) {
  const [pokemons, setPokemons] = useState([]);
  // Keeps count of chosen Pokemons ids
  const [chosenPokemons, setChosenPokemons] = useState([]);

  const modalRef = useRef(null);

  const [score, setScore] = useState(0);

  useEffect(() => {
    (async () => {
      // Get random number b/w 1 and the number
      // For mor randomness in image data
      const randomOffset = Math.floor(
        Math.random() * (pokemonCount - count + 1)
      );
      setPokemons(await getPokemons(randomOffset, count));
    })();
  }, [count]);

  return (
    <>
      <section
        className="image-container"
        title="Choose Pokemon"
        id="pokemon-cont"
      >
        {pokemons.map(({ name, url }) => {
          const id = getPokemonIdFromURL(url);
          return (
            <figure
              key={id}
              tabIndex={0}
              aria-labelledby={'pokemon-cont ' + name}
              onClick={() =>
                chosenPokemons.includes(id)
                  ? (setGameStatus('lost'), modalRef.current.showModal())
                  : score === count - 1
                    ? (setGameStatus('won'), modalRef.current.showModal())
                    : (setChosenPokemons([...chosenPokemons, id]),
                      setScore(score + 1),
                      setPokemons(shuffleArray(pokemons)))
              }
            >
              <img src={getPokemonImageURL(id)} alt={name} />
              <figcaption>{name}</figcaption>
            </figure>
          );
        })}
      </section>

      <Dialog gameStatus={gameStatus} modalRef={modalRef} />
    </>
  );
}

function shuffleArray(array) {
  // stackoverflow.com/a/46545530
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}
