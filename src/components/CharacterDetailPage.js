
import React from 'react';
import { useParams, Link } from 'react-router-dom';

const CharacterDetailPage = ({ characters }) => {
	const { id } = useParams();
	const character = characters.find(char => char.id === parseInt(id));

	if (!character) {
		return <p>Персонаж не найден</p>;
	}

	return (
		<div>
			<Link to="/" className="back-button">Назад</Link>
			<h2>Имя: {character.name}</h2>
			<p>Статус: {character.status}</p>
			<p>Вид: {character.species}</p>
			<p>Пол: {character.gender}</p>
			<p>Место рождения: {character.origin.name}</p>
			<p>Местоположение: {character.location.name}</p>
			<img src={character.image} alt={character.name} />

		</div>
	);
};

export default CharacterDetailPage;