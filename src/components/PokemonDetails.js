import React from 'react';
import './PokemonDetails.css';

export default function PokemonDetails({ details, onClose }) {
  return (
    <div className="pokemon-details-overlay" onClick={onClose}>
      <div className="pokemon-details-modal" onClick={(e) => e.stopPropagation()}>
        {details && (
          <div className="pokemon-details">
            <h2>{details.name}</h2>
            <p>Type(s): {details.types.map(type => type.type.name).join(', ')}</p>
            <p>Abilities: {details.abilities.map(ability => ability.ability.name).join(', ')}</p>
            <p>Height: {details.height}</p>
            <p>Weight: {details.weight}</p>
            <p>Stats:</p>
            <ul>
              {details.stats.map(stat => (
                <li key={stat.stat.name}>
                  {stat.stat.name}: {stat.base_stat}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}


/* import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link, Outlet } from "react-router-dom"

const PokemonDetails = () => {
  const { pokemonName } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      const data = await response.json();
      setPokemon(data);
    };

    fetchPokemon();
  }, [pokemonName]);

  if (!pokemon) {
    return null;
  }

  const { name, id, abilities, sprites, height, weight, stats } = pokemon;
  const hitPoints = stats.find((stat) => stat.stat.name === 'hp').base_stat;

  return (
<div>
    <nav>
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
</nav>
<Outlet />
    <div className="container">
          

        
       <h1 className="header">{name}</h1>
      <div className="details">

        <img className="image" src={sprites.front_default} alt={name} />
        <div className="info">
          <h2>Details:</h2>
          <ul>
            <li>
              <strong>ID:</strong> {id}
            </li>
            <li>
              <strong>Hit Points:</strong> {hitPoints}
            </li>
            <li>
              <strong>Height:</strong> {height / 10}m
            </li>
            <li>
              <strong>Weight:</strong> {weight / 10}kg
            </li>
          </ul>
        </div>
        <div clasame="abilities">
          <h2>Abilities:</h2>
          <ul>
            {abilities.map((ability) => (
              <li key={ability.ability.name}>{ability.ability.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
};

export default PokemonDetails;
*/