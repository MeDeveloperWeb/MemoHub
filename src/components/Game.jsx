import { useEffect, useRef, useState } from 'react';
import {
  getPokemonIdFromURL,
  getPokemonImageURL,
  getPokemons,
  pokemonCount
} from './pokemonData';
import Dialog from './Dialog';
import { capitalize, shuffleArray } from './utils';
import loading from '/loading.gif';

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

  const handleAnimation = (card) => {
    card.parentNode.classList.add('rotate');

    card.addEventListener('animationend', () =>
      card.parentNode.classList.remove('rotate')
    );
  };

  const shuffleCards = (card) => {
    // Remove the s from time. The animation duration comes to be in seconds
    // Atleast everytime I tried
    const duration = +getComputedStyle(card).animationDuration.slice(0, -1);

    setTimeout(
      () => setPokemons(shuffleArray(pokemons)),
      (duration / 2) * 1000
    );
  };

  const handleCardShuffle = ({ target }) => {
    const card = target.closest('.card');

    handleAnimation(card);
    shuffleCards(card);
  };

  return (
    <>
      <section
        className="image-container"
        title="Choose Pokemon"
        id="pokemon-cont"
      >
        {pokemons.length ? (
          <>
            <div className="header">
              <h1>Do not choose Same card twice</h1>
              <div className="score">Score: {score}</div>
            </div>
            <div className="card-container">
              {pokemons.map(({ name, url }) => {
                const id = getPokemonIdFromURL(url);
                return (
                  <figure
                    key={id}
                    className="card"
                    tabIndex={0}
                    aria-labelledby={'pokemon-cont ' + name}
                    onClick={(e) =>
                      chosenPokemons.includes(id)
                        ? (setGameStatus('lost'), modalRef.current.showModal())
                        : score === count - 1
                          ? (setGameStatus('won'), modalRef.current.showModal())
                          : (setChosenPokemons([...chosenPokemons, id]),
                            setScore(score + 1),
                            handleCardShuffle(e))
                    }
                  >
                    <img src={getPokemonImageURL(id)} alt={name} />
                    <figcaption>{capitalize(name)}</figcaption>
                  </figure>
                );
              })}
            </div>
          </>
        ) : (
          <div className="loading">
            <img
              className="loading-img"
              width="100px"
              src={loading}
              alt="Loading.."
            />
          </div>
        )}
      </section>

      <Dialog gameStatus={gameStatus} modalRef={modalRef} />
    </>
  );
}
