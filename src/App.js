import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CharacterDetailPage from './components/CharacterDetailPage';
import './assets/css/style.css'
export default function App() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchCharacters();
  }, [page, filter]);

  const fetchCharacters = async () => {
    try {
      console.log('Запрашиваем персонажей...');
      const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}&name=${filter}`);
      if (!response.ok) {
        throw new Error('Не удалось загрузить персонажей');
      }
      const data = await response.json();
      setCharacters(data.results);
      setTotalPages(data.info.pages);
      setErrorMessage('');
      console.log('Персонажи успешно загружены:', data.results);
    } catch (error) {
      setErrorMessage('Не удалось загрузить персонажей. Пожалуйста, попробуйте позже.');
      console.error(error);
    }
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
    setPage(1);
  };

  return (
    <Router>
      <div className="App">
        <h1>Персонажи Rick and Morty</h1>
        <div className="filters">
          <input type="text" placeholder="Фильтр по имени" value={filter} onChange={handleFilterChange} />
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        <div className="character-list">
          {characters.map(character => (
            <div key={character.id} className="character-card">
              <h2>{character.name}</h2>
              <Link to={`/characters/${character.id}`} className="detail-link">Подробнее</Link>
            </div>
          ))}
        </div>
        <div className="pagination">
          {[...Array(totalPages).keys()].map(num => (
            <button key={num + 1} onClick={() => setPage(num + 1)}>{num + 1}</button>
          ))}
        </div>
      </div>
      <Routes>
        <Route path="/characters/:id" element={<CharacterDetailPage characters={characters} />} />
      </Routes>
    </Router>
  );
}
