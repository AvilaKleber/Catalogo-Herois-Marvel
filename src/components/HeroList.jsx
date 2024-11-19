import React from 'react';
import { HeroCard } from './HeroCard';
import styles from '../styles/HeroList.module.css';

export const HeroList = ({ heroes }) => (
  <div className={styles.container}>
    {heroes.length === 0 ? (
      <p className={styles.noResultsMessage}>Nenhum herói encontrado. Tente outro nome!</p>
    ) : (
      heroes.map((hero) => (
        <HeroCard key={hero.id} hero={hero} />
      ))
    )}
  </div>
);
