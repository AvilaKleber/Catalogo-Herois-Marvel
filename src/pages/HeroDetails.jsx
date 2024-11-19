import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const HeroDetails = () => {
  const { id } = useParams();
  const [hero, setHero] = useState(null);

  useEffect(() => {
    const fetchHero = async () => {
      const response = await api.get(`/characters/${id}`);
      setHero(response.data.data.results[0]);
    };
    fetchHero();
  }, [id]);

  if (!hero) return <p>Carregando...</p>;

  return (
    <div>
      <h1>{hero.name}</h1>
      <img src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`} alt={hero.name} />
      <p>{hero.description || 'Descrição não disponível.'}</p>
    </div>
  );
};

export default HeroDetails;