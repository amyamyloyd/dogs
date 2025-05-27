import React, { useState } from 'react';
import './App.css';
import Button from './components/Button';
import BreedSelectorLayout from './components/BreedSelectorLayout';
import BreedCard from './components/BreedCard';
import { FunFactGalleryLayout } from './components/FunFactGalleryLayout';
import { AgeSelector } from './components/AgeSelector';
import { breeds as initialBreeds } from './utils/breedData';
import type { Breed, FunFact } from './utils/breedData';

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Dog Breed Fun!</h1>
      </header>
      <main className="app-main">{children}</main>
      <footer className="app-footer">
        <p>&copy; 2024 Dog Breed Fun! - Created with love for little paws.</p>
      </footer>
    </div>
  );
}

function App() {
  const [breeds] = useState<Breed[]>(initialBreeds);
  const [selectedBreedId, setSelectedBreedId] = useState<string | null>(null);
  const [showAgeSelector, setShowAgeSelector] = useState(true);
  const [userAge, setUserAge] = useState<{ years: number; months: number } | null>(null);

  const handleBreedSelect = (breedId: string) => {
    setSelectedBreedId(breedId);
  };

  const handleAgeSelection = (age: { years: number; months: number } | null) => {
    setUserAge(age);
    setShowAgeSelector(false);
  };

  const selectedBreed = breeds.find(b => b.id === selectedBreedId);
  const factsForSelectedBreed: FunFact[] = selectedBreed ? selectedBreed.funFacts : [];

  return (
    <AppLayout>
      {showAgeSelector ? (
        <AgeSelector onAgeSelected={handleAgeSelection} />
      ) : (
        <div className="content-wrapper">
          <p className="intro-text">
            Welcome, little explorer! Click on a doggy to learn cool things about them!
          </p>
          {userAge && (
            <p className="age-info-text">
              Showing content for a {userAge.years}-year, {userAge.months}-month old explorer!
            </p>
          )}
          {!userAge && (
            <p className="age-info-text">
              Age not specified (or skipped). Showing general content!
            </p>
          )}
          <BreedSelectorLayout>
            {breeds.map(breed => (
              <BreedCard
                key={breed.id}
                breed={breed}
                isSelected={breed.id === selectedBreedId}
                onClick={() => handleBreedSelect(breed.id)}
              />
            ))}
          </BreedSelectorLayout>

          {selectedBreed && (
            <div className="selected-breed-info">
              <h2>You picked {selectedBreed.name}!</h2>
              <p>Let's learn some fun facts...</p>
              <FunFactGalleryLayout facts={factsForSelectedBreed} userAge={userAge} />
            </div>
          )}
        </div>
      )}
    </AppLayout>
  );
}

export default App;
