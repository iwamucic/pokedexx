import React, { useState, useEffect } from 'react';
import './App.css';
import PokemonCard from './components/PokemonCard';
import PokemonDetails from './components/PokemonDetails';
import Pagination from './components/Pagination';
import About from './components/About';
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [previousPageUrl, setPreviousPageUrl] = useState()
  const [loading, setLoading] = useState(true)
  const [selectedPokemon, setSelectedPokemon] = useState(null)

  useEffect(() => {
    setLoading(true);

    fetch(currentPageUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setLoading(false);
        setNextPageUrl(data.next);
        setPreviousPageUrl(data.previous);
        setPokemon(data.results.map(p => p.name));
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setLoading(false);
      });
  }, [currentPageUrl]);

  if (loading) return "Loading..."

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function goToPreviousPage() {
    setCurrentPageUrl(previousPageUrl)
  }

  async function fetchPokemonDetails(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    return data;
  }

  async function handlePokemonClick(name) {
    const details = await fetchPokemonDetails(name);
    setSelectedPokemon(details);
  }

  function handleCloseDetails() {
    setSelectedPokemon(null);
  }

  return (
    <Router>
      <div className="app-container">
        <nav>
          <Link to="/pokedexx">Home</Link>
          <Link to="/about">About</Link>
        </nav>
        <h1>My Pokedex</h1>
        <Routes>
  <Route path="/about" element={<About />} />
  <Route path="/pokedexx" element={
    <>
      <PokemonCard pokemon={pokemon} onPokemonClick={handlePokemonClick} />
      <Pagination
        goToNextPage={nextPageUrl ? goToNextPage : null}
        goToPreviousPage={previousPageUrl ? goToPreviousPage : null}
      />
      {selectedPokemon && (
        <PokemonDetails details={selectedPokemon} onClose={handleCloseDetails} />
      )}
    </>
  } />
</Routes>
      </div>
    </Router>
  );
}

export default App;
