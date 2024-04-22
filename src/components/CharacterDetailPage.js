import React from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';

export default function CharacterDetailPage({ characters }) {
	const { id } = useParams();
	const navigate = useNavigate();

	const character = characters.find(char => char.id === +id);

	if (!character) {
		return <Navigate to="/" />;
	}

	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<div>
			<h2>{character.name}</h2>
			<p>Пол: {character.gender}</p>
			<p>Вид: {character.species}</p>
			<button onClick={handleGoBack}>Назад</button>
		</div>
	);
}
