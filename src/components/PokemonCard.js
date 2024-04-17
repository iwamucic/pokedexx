import React, { useState, useEffect } from 'react';
import './PokemonCard.css';

function PokemonCard({ pokemon, onPokemonClick }) {
  const [pokemonDetails, setPokemonDetails] = useState([]);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      const details = await Promise.all(
        pokemon.map(async name => {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
          const data = await response.json();
          return data;
        })
      );
      setPokemonDetails(details);
    };

    fetchPokemonDetails();
  }, [pokemon]);

  return (
    <div className="pokemon-container">
      {pokemonDetails.map(pokemon => (
        <div
          className={`pokemon-card ${pokemon.types[0].type.name}`}
          key={pokemon.id}
          onClick={() => onPokemonClick(pokemon.name)}
        >
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <div>
            <h3>{pokemon.name}</h3>
            <p>ID: {pokemon.id}</p>
            <p>Types: {pokemon.types.map(type => type.type.name).join(', ')}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PokemonCard;


/*const PokemonCard = ({id, name, image, types}) => {
  const [pokemonTypes, setPokemonTypes] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await res.json();
      setPokemonTypes(data.types.map(type => type.type.name));
    }
    fetchPokemon();
  }, [name]);

  const style = `card-container ${pokemonTypes[0]}`;

  return (
    <div className={style}>
      <Link to={`pokemon/${name}`} className="link">
        <div className="number">
          <small>#{id}</small>
        </div>
        <img src={image} alt={name} />
        <div className="detail-wrapper">
          <h2>{name}</h2>
          <p>{pokemonTypes.join(", ")}</p>
        </div>
      </Link>
    </div>
  );
}

export default PokemonCard;
*/