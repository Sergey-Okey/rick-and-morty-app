import './assets/css/style.css'
import React, { useState, useEffect } from 'react';


function App() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
      setErrorMessage('');
      console.log('Персонажи успешно загружены:', data.results);
    } catch (error) {
      setErrorMessage('Не удалось загрузить персонажей. Пожалуйста, попробуйте позже.');
      console.error(error);
    }
  };

  const handleOpenModal = async character => {
    try {
      console.log('Загружаем детали персонажа...');
      const response = await fetch(character.url);
      if (!response.ok) {
        throw new Error('Не удалось загрузить детали персонажа');
      }
      const data = await response.json();
      setSelectedCharacter(data);
      console.log('Детали персонажа успешно загружены:', data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setSelectedCharacter(null);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
    setPage(1);
  };

  return (
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
            <button onClick={() => handleOpenModal(character)}>Подробнее</button>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={page === 1}>Назад</button>
        <button onClick={handleNextPage}>Вперед</button>
      </div>
      {selectedCharacter && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedCharacter.name}</h2>
            {selectedCharacter.image && <img src={selectedCharacter.image} alt={selectedCharacter.name} />}
            {selectedCharacter.gender && <p>Пол: {selectedCharacter.gender}</p>}
            {selectedCharacter.species && <p>Вид: {selectedCharacter.species}</p>}
            <button onClick={handleCloseModal}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
